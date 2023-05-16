<script setup lang="ts">
import { Location } from "../ts/types";

import LocationCard from "./LocationCard.vue";

interface Props {
  locations: Location[];
}

defineProps<Props>();
</script>


<template>
  <div class="weather">
    <h3>Weather</h3>

    <LocationCard
      v-for="location in locations"
      :key="location.data.id"
      :data="location.data"
    />
  </div>
</template>

<style scoped lang="scss">
.weather {
  width: 100%;
  padding: 1em;
}
</style>
