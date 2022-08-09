<template>
  <div class="settings">
    <h3>Settings</h3>

    <!-- <div style="min-height: 900px; min-width: 200px"></div> -->

    <div class="container" ref="container">
      <div
        v-for="(location, index) in locations"
        :key="location.data.id"
        class="location"
      >
        <!-- <img src="../assets/list.svg" alt="hamburger icon" /> -->
        <img
          src="../assets/icons8-menu-24.png"
          alt="hamburger"
          @mousedown="new MouseDrag(container!, index, reorder, $event)"
          @touchstart="new TouchDrag(container!, index, reorder, $event)"
          class="hamburger"
        />
        <!-- <HamburgerIcon
          @mousedown="drag(container!, index, reorder, $event)"
          @touchstart="drag(container!, index, reorder, $event)"
        /> -->
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

    <div id="add-location">
      <label style="text-align: left; font-size: 110%">
        <div style="margin-bottom: 0.25em">Add Location</div>
        <input
          v-model="city"
          @keyup.enter="addLocation"
          placeholder="Enter city"
        />
      </label>

      <img
        alt="enter"
        src="@/assets/icons8-enter-key-30.png"
        @click="addLocation"
        id="enter"
        :class="{ disabled: isDisabled }"
      />
    </div>

    <div class="error">{{ error }}</div>

    <button @click="emit('reset')">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, computed, watch } from "vue";

import { Location } from "../ts/types";
import { fetchLocationWeather } from "../ts/util";
//import drag from "../ts/drag";
import { MouseDrag, TouchDrag } from "../ts/DragClass";

console.log("setup Settings component");

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();

const city = ref("");

const error = ref("");

const container = ref<HTMLElement | null>(null);

const isAlreadyExist = computed(() => {
  return props.locations.some((location) => {
    const result =
      location.data.name.toUpperCase() === city.value.toUpperCase();
    if (result) {
      //error.value = "This city already presented";
      setError("The city is already presented");
    }
    return result;
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
  if (isDisabled.value) {
    console.log("isDisabled");
    return;
  }

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
  //setTimeout(() => (error.value = " "), 3000);
  const unwatch = watch(city, () => {
    error.value = "";
    unwatch();
  });
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.settings {
  width: 100%;
  padding: 1em;
}
.container {
  min-width: 12em;
  //max-width: 15em;
  position: relative;
  //border: 1px solid blue;
  // padding: 1em 0.5em;
}
.location {
  background-color: #e5e7eb;
  margin: 0.5em 0;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}
.hamburger {
  cursor: grab;
  padding: 0.5em;
}
.trash {
  width: 1.5em;
  margin: 0.5em;
  margin-left: auto;
  cursor: pointer;
  opacity: 0.62;
}

#add-location {
  display: flex;
  align-items: flex-end;

  input {
    font-size: 100%;
    outline: 0;
    border-radius: 0.2em;
    border: 1px solid #f0abfc;

    $highlight: #c6538c;

    &:focus {
      border-color: $highlight;
      box-shadow: 0 0 2px 2px $highlight;
    }
  }
}

#enter {
  margin-left: 0.25em;
  cursor: pointer;

  &.disabled {
    opacity: 0.5;
  }
}

.error {
  color: rgb(196, 30, 30);
  padding: 0.25em;
  //min-height: 25px;
  min-height: 2em;
}
</style>
