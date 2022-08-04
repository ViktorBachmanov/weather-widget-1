<template>
  <div>
    <label>
      <div>Add Location</div>
      <input v-model="city" />
    </label>

    <button :disabled="isDisabled" @click="addLocation">Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, computed } from "vue";

import { Location } from "../ts/types";

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();

const city = ref("");

const isAlreadyExist = computed(() => {
  props.locations.some((location) => {
    return location.data.name.toUpperCase() === city.value;
  });
  return false;
});

const isDisabled = computed(() => {
  return city.value === "" || isAlreadyExist.value;
});

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
