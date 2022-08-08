<template>
  <div class="card">
    <h4>{{ data.name }}</h4>
    <div class="row">
      <img
        alt="weather"
        :src="`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`"
      />
      <span class="temp">{{ data.main.temp }}&deg;C</span>
    </div>
    Feels like {{ data.main.feels_like }}&deg;C,
    {{ data.weather[0].description }}
    <div class="row">
      <span class="param wind">
        <img
          alt="wind_dir"
          src="@/assets/arrow_dark.png"
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
    <div class="row">
      <span class="param humidity">Humidity: {{ data.main.humidity }}%</span>
      <span class="param"
        >Visibility: {{ (data.visibility * 0.001).toFixed(1) }} km</span
      >
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
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  margin: 1em 0;
  padding: 1em;
}
.row {
  display: flex;
  align-items: center;
  margin: 0.25em 0;
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

.wind img {
  //opacity: 0.75;
}

.wind-speed {
  margin: 0 0.5em;
}

.humidity {
  margin-right: 1em;
}
</style>
