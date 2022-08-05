<template>
  <div class="container">
    <h4>{{ data.name }}</h4>
    <div class="icon-n-temp">
      <img
        alt="weather"
        :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
      />
      <span class="temp">{{ data.main.temp }}&deg;C</span>
    </div>
    Feels like {{ data.main.feels_like }}&deg;C
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
  data: any;
}

const props = defineProps<Props>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon-n-temp {
  display: flex;
  align-items: center;
}
.temp {
  font-size: x-large;
}
</style>
