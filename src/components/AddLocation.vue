<template>
  <div>
    <label>
      <div>Add Location</div>
      <input v-model="city" />
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const city = ref("");
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
