<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import type { Ref } from "vue";

import WeatherComponent from "./components/WeatherComponent.vue";
import SettingsComponent from "./components/SettingsComponent.vue";
import ModeToggle from "./components/ModeToggle.vue";

import { Mode, Location } from "./ts/types";
import { updateWeatherData } from "./ts/util";
import { LOCAL_CONFIG } from "./ts/constants";

import { useLocations } from "./composables/locations"


onErrorCaptured(() => {
  reset();
});


const { locations, add, remove, reorder, reset } = useLocations();

function isNoStoredConfig() {
  const localConfig = localStorage.getItem(LOCAL_CONFIG);
  return localConfig === null;
}

const mode: Ref<Mode> = ref(isNoStoredConfig() ? Mode.Settings : Mode.Weather);

updateWeatherData(locations.value);

function toggleMode() {
  switch (mode.value) {
    case Mode.Weather:
      mode.value = Mode.Settings;
      break;
    case Mode.Settings:
      mode.value = Mode.Weather;
      updateWeatherData(locations.value);
      break;
  }
}

function addLocation(location: Location) {
  if (isNoStoredConfig()) {
    mode.value = Mode.Weather;
  }

  add(location);
}

</script>


<template>
  <div class="container">
    <WeatherComponent v-if="mode === Mode.Weather" :locations="locations" />
    <SettingsComponent
      v-else-if="mode === Mode.Settings"
      :locations="locations"
      @add-location="addLocation"
      @reorder="reorder"
      @remove="remove"
      @reset="reset"
    />
    <ModeToggle :mode="mode" @toggle-mode="toggleMode" />
  </div>
</template>


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
    flex: 0 0 20em;
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
