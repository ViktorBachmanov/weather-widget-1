<template>
  <button @click="emit('toggleMode')">{{ nextMode }}</button>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

import { Mode } from "../ts/constants";

interface Props {
  mode: Mode;
}

const props = defineProps<Props>();

const nextMode = computed(() =>
  props.mode === Mode.Settings ? "Weather" : "Settings"
);

const emit = defineEmits(["toggleMode"]);

// function toggle() {
//   emit('toggleMode');
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
