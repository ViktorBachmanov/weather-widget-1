<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <WeatherComponent v-if="mode === 'weather'" />
  <SettingsComponent v-if="mode === 'settings'" />
</template>

<script setup lang="ts">
import WeatherComponent from "./components/WeatherComponent.vue";
import SettingsComponent from "./components/SettingsComponent.vue";

import { reactive, ref, computed } from "vue";
import type { Ref } from "vue";

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

const mode: Ref<"weather" | "settings"> = ref(
  isInitialOpening.value ? "settings" : "weather"
);
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
