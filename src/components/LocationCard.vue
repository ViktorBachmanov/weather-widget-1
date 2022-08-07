<template>
  <div class="container">
    <h4>{{ data.name }}</h4>
    <div class="row">
      <img
        alt="weather"
        :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
      />
      <span class="temp">{{ data.main.temp }}&deg;C</span>
    </div>
    Feels like {{ data.main.feels_like }}&deg;C
    <div class="row">
      <span class="param wind">
        <img
          alt="wind_dir"
          src="@/assets/arrow_dark.svg"
          :style="{ transform: `rotate(${data.wind.deg}deg)` }"
        />
        <span class="wind-speed"> {{ data.wind.speed }} m/s </span>
      </span>
      <span class="param">
        <img
          alt="pressure"
          src="@/assets/pressure.png"
          style="width: 1.25em; margin-right: 0.25em"
        />
        <span> {{ data.main.pressure }} hPa </span>
      </span>
    </div>
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
.row {
  display: flex;
  align-items: center;
}
.param {
  display: flex;
  align-items: center;
}
.temp {
  font-size: x-large;
}
.wind {
  margin-right: 1em;
}

.wind-speed {
  margin: 0 0.5em;
}
</style>
