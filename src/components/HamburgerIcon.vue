<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-list"
    viewBox="0 0 16 16"
    ref="iconEl"
    @pointerdown="drag"
  >
    <path
      fill-rule="evenodd"
      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </svg>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const iconEl = ref(null);

let parentEl: HTMLElement;

onMounted(() => {
  const iconHtmlEl = iconEl.value! as HTMLElement;
  parentEl = iconHtmlEl.parentElement!;
});

function drag() {
  console.log("parent element: ", parentEl);
}
</script>
