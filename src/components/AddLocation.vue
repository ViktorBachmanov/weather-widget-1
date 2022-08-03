<template>
  <div>
    <label>
      <div>Add Location</div>
      <input v-model="city" />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AddLocation",
  data() {
    return {
      city: "",
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
