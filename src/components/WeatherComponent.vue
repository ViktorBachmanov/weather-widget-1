<template>
  <div>
    <h3>Weather</h3>

    <div>
      <LocationCard
        v-for="location in locations"
        :key="location.data.id"
        :data="location.data"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import { Location } from "../ts/types";

import LocationCard from "./LocationCard.vue";

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();

console.log("setup Weather component");

// function updateWeatherData() {
//   locations.forEach((location) => {
//     if (isWeatherDataOutdated(location.fetchedAt)) {
//       //fetch()
//     }
//   });
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
