<template>
  <div class="container">
    <WeatherComponent v-if="mode === Mode.Weather" :locations="locations" />
    <SettingsComponent
      v-if="mode === Mode.Settings"
      :locations="locations"
      @add-location="addLocation"
      @reorder="reorder"
      @remove="remove"
      @reset="reset"
    />
    <ModeToggle :mode="mode" @toggle-mode="toggleMode" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onErrorCaptured } from "vue";
import type { Ref } from "vue";

import WeatherComponent from "./components/WeatherComponent.vue";
import SettingsComponent from "./components/SettingsComponent.vue";
import ModeToggle from "./components/ModeToggle.vue";

import { Mode, Location } from "./ts/types";
import { updateWeatherData } from "./ts/util";

const LOCAL_CONFIG = "weather_widget_vb";

onErrorCaptured(() => {
  reset();
});

function reset() {
  locations.splice(0);
  localStorage.removeItem(LOCAL_CONFIG);
}

addEventListener("beforeunload", () => {
  if (locations.length) {
    saveConfig();
  }
});

function saveConfig() {
  localStorage.setItem(LOCAL_CONFIG, JSON.stringify(locations));
}

const persistedData = localStorage.getItem(LOCAL_CONFIG);

const initialLocations: Location[] = persistedData
  ? JSON.parse(persistedData)
  : [];

const locations: Location[] = reactive([...initialLocations]);

function isInitialOpening() {
  const localConfig = localStorage.getItem(LOCAL_CONFIG);
  return localConfig === null;
}

const mode: Ref<Mode> = ref(isInitialOpening() ? Mode.Settings : Mode.Weather);

updateWeatherData(locations);

function toggleMode() {
  switch (mode.value) {
    case Mode.Weather:
      mode.value = Mode.Settings;
      break;
    case Mode.Settings:
      mode.value = Mode.Weather;
      updateWeatherData(locations);
      break;
  }
}

function addLocation(location: Location) {
  locations.push(location);

  if (isInitialOpening()) {
    mode.value = Mode.Weather;
    saveConfig();
  }
}

function reorder(prevIndex: number, currentIndex: number) {
  const movedLocation = locations[prevIndex];
  locations.splice(prevIndex, 1);
  locations.splice(currentIndex, 0, movedLocation);
}

function remove(index: number) {
  locations.splice(index, 1);
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
weather-widget {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  display: block;

  @media (max-width: 360px) {
    width: 100%;
  }
  @media (min-width: 361px) {
    min-width: 20em;
    max-width: 20em;
  }

  margin: 1em auto;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  margin-top: 0;
  margin-left: 1em;
}

h4 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
</style>
