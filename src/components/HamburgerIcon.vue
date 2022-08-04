<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-list"
    viewBox="0 0 16 16"
    @mousedown="drag"
  >
    <path
      fill-rule="evenodd"
      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </svg>
</template>

<script setup lang="ts">
import { ref } from "vue";

//const iconEl = ref(null);

// let locationEl: HTMLElement;
// let containerEl: HTMLElement;

// onMounted(() => {
//   const iconHtmlEl = iconEl.value! as HTMLElement;
//   locationEl = iconHtmlEl.parentElement!;
//   containerEl = locationEl.parentElement!;
// });

function drag(e: any) {
  const iconHtmlEl: HTMLElement = e.target;
  const locationEl: HTMLElement = iconHtmlEl.parentElement!;
  const containerEl: HTMLElement = locationEl.parentElement!;

  iconHtmlEl.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    iconHtmlEl.onmouseup = null;
  };

  const locationElClone = locationEl.cloneNode(true) as HTMLElement;
  //locationEl.style.visibility = "hidden";

  locationElClone.style.position = "absolute";
  locationElClone.style.zIndex = "1000";
  //const rect = locationElClone.getBoundingClientRect();
  moveAt(e.pageX, e.pageY);
  //containerEl.append(locationElClone);
  document.body.append(locationElClone);

  //   locationElClone.ondragstart = function() {
  //   return false;
  // }

  //containerEl.addEventListener("pointermove", onPointerMove);
  document.addEventListener("mousemove", onMouseMove);

  iconHtmlEl.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    iconHtmlEl.onmouseup = null;
  };

  function moveAt(x: number, y: number) {
    locationElClone.style.left = x + "px";
    locationElClone.style.top = y + "px";
  }

  function onMouseMove(event: any) {
    moveAt(event.pageX, event.pageY);
  }
}
</script>
