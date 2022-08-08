<template>
  <div>
    <h3>Settings</h3>

    <!-- <div style="min-height: 900px; min-width: 200px"></div> -->

    <div id="container" ref="container">
      <div
        v-for="(location, index) in locations"
        :key="location.data.id"
        class="location"
      >
        <!-- <img src="../assets/list.svg" alt="hamburger icon" /> -->
        <HamburgerIcon
          @mousedown="drag(container!, index, reorder, $event)"
          @touchstart="drag(container!, index, reorder, $event)"
        />
        {{ location.data.name }}
        <img
          alt="trash"
          src="@/assets/icons8-trash-24-1.png"
          class="trash"
          @click="remove(index)"
        />
      </div>
    </div>

    <p></p>

    <label>
      <div>Add Location</div>
      <input v-model="city" />
    </label>

    <button :disabled="isDisabled" @click="addLocation">Add</button>

    <div class="error">{{ error }}</div>

    <p></p>
    <button @click="emit('reset')">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, computed } from "vue";

import { Location } from "../ts/types";
import { fetchLocationWeather } from "../ts/util";
import drag from "../ts/drag";

import HamburgerIcon from "./HamburgerIcon.vue";

console.log("setup Settings component");

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();

const city = ref("");

const error = ref(" ");

const container = ref<HTMLElement | null>(null);

const isAlreadyExist = computed(() => {
  return props.locations.some((location) => {
    const result =
      location.data.name.toUpperCase() === city.value.toUpperCase();
    if (result) {
      //error.value = "This city already presented";
      setError("The city is already presented");
    }
  });
});

const isDisabled = computed(() => {
  return city.value === "" || isAlreadyExist.value;
});

const emit = defineEmits<{
  (e: "addLocation", location: Location): void;
  (e: "reorder", prevIndex: number, currentIndex: number): void;
  (e: "remove", index: number): void;
  (e: "reset"): void;
}>();

async function addLocation() {
  // const response = await fetch(
  //   `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${process.env.VUE_APP_API_KEY}&units=metric`
  // );

  let response;
  try {
    response = await fetchLocationWeather(city.value);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return;
  }

  if (response.ok) {
    const locationData = await response.json();
    const location: Location = {
      fetchedAt: Date.now(),
      data: locationData,
    };
    emit("addLocation", location);
    city.value = "";
  } else if (response.status === 404) {
    //console.log("Not found");
    //error.value = `City "${city.value}" not found`;
    setError(`City "${city.value}" not found`);
  }
}

function reorder(prevIndex: number, currentIndex: number) {
  emit("reorder", prevIndex, currentIndex);
}

function remove(index: number) {
  emit("remove", index);
}

function setError(message: string) {
  error.value = message;
  setTimeout(() => (error.value = " "), 3000);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .settings {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// }
#container {
  min-width: 12em;
  max-width: 15em;
  position: relative;
  border: 1px solid blue;
  padding: 1em 0.5em;
}
.location {
  background-color: #e5e7eb;
  margin: 0.5em 0;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
.trash {
  width: 1.5em;
  margin: 0.5em;
  margin-left: auto;
  cursor: pointer;
  opacity: 0.62;
}

.error {
  color: red;
}
</style>
