<template>
  <div>
    <h3>Settings</h3>
    <AddLocation :locations="locations" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

import { Location } from "../ts/types";

import AddLocation from "./AddLocation.vue";

console.log("setup Settings component");

interface Props {
  locations: Location[];
}

const props = defineProps<Props>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
