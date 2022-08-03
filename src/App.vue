<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <AddLocation />
</template>

<script lang="ts">
import { defineComponent } from "vue";
//import HelloWorld from "./components/HelloWorld.vue";
import AddLocation from "./components/AddLocation.vue";

export default defineComponent({
  name: "App",
  components: {
    //HelloWorld,
    AddLocation,
  },
});
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
