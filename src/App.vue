<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <div class="container">
    <WeatherComponent v-if="mode === Mode.Weather" :locations="locations" />
    <SettingsComponent
      v-if="mode === Mode.Settings"
      :locations="locations"
      @add-location="addLocation"
      @reorder="reorder"
      @remove="remove"
      @reset="emergencyReset"
    />
    <ModeToggle :mode="mode" @toggle-mode="toggleMode" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onErrorCaptured } from "vue";
import type { Ref } from "vue";

import WeatherComponent from "./components/WeatherComponent.vue";
import SettingsComponent from "./components/SettingsComponent.vue";
import ModeToggle from "./components/ModeToggle.vue";

import { Mode, Location } from "./ts/types";
import { updateWeatherData } from "./ts/util";

console.log("setup App");

const LOCAL_CONFIG = "weather_widget_vb";

onErrorCaptured(() => {
  emergencyReset();
});

function emergencyReset() {
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
  console.log("localConfig: ", localConfig);
  return localConfig === null;
}

console.log("isInitialOpening: ", isInitialOpening());

const mode: Ref<Mode> = ref(isInitialOpening() ? Mode.Settings : Mode.Weather);

updateWeatherData(locations);

function toggleMode() {
  //mode.value = mode.value === Mode.Weather ? Mode.Settings : Mode.Weather;
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
  //locations.reverse();
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
// #app {
weather-widget {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 60px;

  //width: 20em;
  display: block;

  @media (max-width: 360px) {
    width: 100%;
  }
  @media (min-width: 361px) {
    min-width: 20em;
    max-width: 20em;
  }
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
