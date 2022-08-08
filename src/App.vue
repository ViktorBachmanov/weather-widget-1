<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <WeatherComponent v-if="mode === Mode.Weather" :locations="locations" />
  <SettingsComponent
    v-if="mode === Mode.Settings"
    :locations="locations"
    @add-location="addLocation"
    @reorder="reorder"
    @remove="remove"
  />
  <ModeToggle :mode="mode" @toggle-mode="toggleMode" />
</template>

<script setup lang="ts">
import { reactive, ref, computed, onErrorCaptured } from "vue";
import type { Ref } from "vue";

import WeatherComponent from "./components/WeatherComponent.vue";
import SettingsComponent from "./components/SettingsComponent.vue";
import ModeToggle from "./components/ModeToggle.vue";

import { Mode, Location } from "./ts/types";
import { isWeatherDataOutdated } from "./ts/util";

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
  localStorage.setItem(LOCAL_CONFIG, JSON.stringify(locations));
});

const persistedData = localStorage.getItem(LOCAL_CONFIG);

const initialLocations: Location[] = persistedData
  ? JSON.parse(persistedData)
  : [];

const locations: Location[] = reactive([...initialLocations]);

const isInitialOpening = computed(
  () => localStorage.getItem(LOCAL_CONFIG) === null
);

const mode: Ref<Mode> = ref(
  isInitialOpening.value ? Mode.Settings : Mode.Weather
);

function toggleMode() {
  mode.value = mode.value === Mode.Weather ? Mode.Settings : Mode.Weather;
}

function addLocation(location: Location) {
  locations.push(location);
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
// #app {
weather-widget {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;

  max-width: 20em;
  display: block;
}
</style>
