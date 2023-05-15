import { ref } from "vue";

import { Location } from "../ts/types";
import { LOCAL_CONFIG } from "../ts/constants";

const persistedData = localStorage.getItem(LOCAL_CONFIG);

const initialLocations: Location[] = persistedData
  ? JSON.parse(persistedData)
  : [];

const locations = ref(initialLocations);

function reset() {
  locations.value.splice(0);
  localStorage.removeItem(LOCAL_CONFIG);
}

function save() {
  localStorage.setItem(LOCAL_CONFIG, JSON.stringify(locations.value));
}

function add(location: Location) {
  locations.value.push(location);

  // if (isInitialOpening()) {
  // mode.value = Mode.Weather;
  // save();
  // }

  save();
}

function remove(index: number) {
  locations.value.splice(index, 1);

  save();
}

function reorder(prevIndex: number, currentIndex: number) {
  const movedLocation = locations.value[prevIndex];
  locations.value.splice(prevIndex, 1);
  locations.value.splice(currentIndex, 0, movedLocation);

  save();
}

export function useLocations() {
  return {
    locations,
    add,
    remove,
    reorder,
    reset,
  };
}
