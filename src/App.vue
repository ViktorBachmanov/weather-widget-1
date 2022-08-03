<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <WeatherComponent v-if="mode === Mode.Weather" />
  <SettingsComponent v-if="mode === Mode.Settings" />
  <ModeToggle :mode="mode" @toggle-mode="toggleMode" />
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import type { Ref } from "vue";

import WeatherComponent from "./components/WeatherComponent.vue";
import SettingsComponent from "./components/SettingsComponent.vue";
import ModeToggle from "./components/ModeToggle.vue";

import { Mode } from "./ts/constants";

console.log("Setup App");

const LOCAL_CONFIG = "weather_widget_vb";

addEventListener("beforeunload", () => {
  localStorage.setItem(LOCAL_CONFIG, JSON.stringify(locations));
});

interface Location {
  city: string;
  fetched_at: number;
}

const locations: Array<Location> = reactive([]);

const isInitialOpening = computed(
  () => localStorage.getItem(LOCAL_CONFIG) === null
);

const mode: Ref<Mode> = ref(
  isInitialOpening.value ? Mode.Settings : Mode.Weather
);

function toggleMode() {
  mode.value = mode.value === Mode.Weather ? Mode.Settings : Mode.Weather;
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
  margin-top: 60px;
}
</style>
