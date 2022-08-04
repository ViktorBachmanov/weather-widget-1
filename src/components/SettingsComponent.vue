<template>
  <div class="settings">
    <h3>Settings</h3>

    <div class="container">
      <div
        v-for="location in locations"
        :key="location.data.name"
        class="location"
      >
        <!-- <img src="../assets/list.svg" alt="hamburger icon" /> -->
        <HamburgerIcon />
        {{ location.data.name }}
      </div>
    </div>

    <p></p>

    <label>
      <div>Add Location</div>
      <input v-model="city" />
    </label>

    <button :disabled="isDisabled" @click="fetchLocationWeather">Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, computed } from "vue";

import { Location } from "../ts/types";

import HamburgerIcon from "./HamburgerIcon.vue";

console.log("setup Settings component");

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();

const city = ref("");

const isAlreadyExist = computed(() => {
  return props.locations.some((location) => {
    return location.data.name.toUpperCase() === city.value.toUpperCase();
  });
});

const isDisabled = computed(() => {
  return city.value === "" || isAlreadyExist.value;
});

const emit = defineEmits<{
  (e: "addLocation", location: Location): void;
}>();

async function fetchLocationWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${process.env.VUE_APP_API_KEY}`
  );

  if (response.ok) {
    const locationData = await response.json();
    const location: Location = {
      fetchedAt: Date.now(),
      data: locationData,
    };
    emit("addLocation", location);
    city.value = "";
  } else if (response.status === 404) {
    console.log("Not found");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.settings {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container {
  min-width: 12em;
  max-width: 15em;
  position: relative;
}
.location {
  background-color: #e5e7eb;
  margin: 0.5em;
}
</style>
