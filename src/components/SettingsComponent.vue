<template>
  <div class="settings">
    <h3>Settings</h3>

    <div class="container" ref="container">
      <div
        v-for="(location, index) in locations"
        :key="location.data.id"
        class="location"
      >
        <img
          src="../assets/icons8-menu-24.png"
          alt="hamburger"
          @mousedown="dragMouse(index, $event)"
          @touchstart="dragTouch(index, $event)"
          class="hamburger"
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
import { MouseDrag, TouchDrag } from "../ts/DragClass";

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
      setError("The city is present already in the list");
    }
    return result;
  });
});

const isDisabled = computed(() => {
  return !city.value || isAlreadyExist.value;
});

const emit = defineEmits<{
  (e: "addLocation", location: Location): void;
  (e: "reorder", prevIndex: number, currentIndex: number): void;
  (e: "remove", index: number): void;
  (e: "reset"): void;
}>();

async function addLocation() {
  if (isDisabled.value) {
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
    setError(`The city "${city.value}" is not found`);
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
  const unwatch = watch(city, () => {
    error.value = "";
    unwatch();
  });
}

function dragMouse(index: number, event: MouseEvent) {
  if (container.value) {
    new MouseDrag(container.value, index, reorder, event);
  }
}

function dragTouch(index: number, event: TouchEvent) {
  if (container.value) {
    new TouchDrag(container.value, index, reorder, event);
  }
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
  position: relative;
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
    $highlight: #818cf8;

    font-size: 100%;
    outline: 0;
    border-radius: 0.2em;
    border: 1px solid $highlight;

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
  padding-top: 0.5em;
  min-height: 2.25em;
}
</style>
