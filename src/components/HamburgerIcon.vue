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

let locationEl: HTMLElement;
let containerEl: HTMLElement;

onMounted(() => {
  const iconHtmlEl = iconEl.value! as HTMLElement;
  locationEl = iconHtmlEl.parentElement!;
  containerEl = locationEl.parentElement!;
});

function drag() {
  console.log("parent element: ", locationEl);

  const locationElClone = locationEl.cloneNode(true) as HTMLElement;
  locationEl.style.visibility = "hidden";

  locationElClone.style.position = "absolute";
  const rect = locationElClone.getBoundingClientRect();
  moveAt(rect.x, rect.y);
  containerEl.append(locationElClone);

  containerEl.addEventListener("pointermove", onPointerMove);

  function moveAt(x: number, y: number) {
    locationElClone.style.left = x + "px";
    locationElClone.style.top = y + "px";
  }

  function onPointerMove(event: any) {
    moveAt(event.offsetX, event.offsetY);
  }
}
</script>
