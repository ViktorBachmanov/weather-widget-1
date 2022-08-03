<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <AddLocation />
  <div v-if="isInitialOpening">There is initial opening</div>
</template>

<script setup lang="ts">
// import { defineComponent } from "vue";
// //import HelloWorld from "./components/HelloWorld.vue";
import AddLocation from "./components/AddLocation.vue";

// export default defineComponent({
//   name: "App",
//   components: {
//     //HelloWorld,
//     AddLocation,
//   },

// });

import { reactive, ref, computed } from "vue";
import type { Ref } from "vue";
//import { LOCAL_CONFIG } from "./ts/constants";

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

//type Mode = 'weather' | 'settings';

const isInitialOpening = computed(
  () => localStorage.getItem(LOCAL_CONFIG) === null
);

const mode: Ref<"weather" | "settings"> = ref(
  isInitialOpening ? "settings" : "weather"
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
