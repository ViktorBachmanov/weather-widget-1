<script setup lang="ts">
import { Mode } from "../ts/types";

interface Props {
  mode: Mode;
}

defineProps<Props>();
</script>


<template>
  <div @click="$emit('toggleMode')" class="button">
    <img
      alt="settings"
      src="@/assets/icons8-setting-24.png"
      v-if="mode === Mode.Weather"
    />
    <img
      alt="close"
      src="@/assets/icons8-close-24.png"
      v-else
      style="max-width: 24px; padding: 3px; box-sizing: border-box"
    />
  </div>
</template>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.button {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  padding: 0.5em;
}
</style>
