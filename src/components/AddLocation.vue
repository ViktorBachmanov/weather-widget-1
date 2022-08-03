<template>
  <div>
    <label>
      <div>Add Location</div>
      <input v-model="city" />
    </label>

    <button>Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

import { Location } from "../ts/types";

const city = ref("");

const emit = defineEmits<{
  (e: "addLocation", location: Location): void;
}>();

async function addLocation() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${process.env.VUE_APP_API_KEY}`
  );

  if (response.ok) {
    const location = await response.json();
    emit("addLocation", location);
  } else if (response.status === 404) {
    console.log("Not found");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
