<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-list"
    viewBox="0 0 16 16"
    @mousedown="mouseDrag"
    @touchstart="touchDrag"
  >
    <path
      fill-rule="evenodd"
      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
    />
  </svg>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";

//const iconEl = ref(null);

// let locationEl: HTMLElement;
// let containerEl: HTMLElement;

// onMounted(() => {
//   const iconHtmlEl = iconEl.value! as HTMLElement;
//   locationEl = iconHtmlEl.parentElement!;
//   containerEl = locationEl.parentElement!;
// });

const emit = defineEmits(["reorder"]);

function mouseDrag(e: any) {
  e.preventDefault();

  if (e.target.tagName !== "svg") {
    return;
  }

  const iconHtmlEl: HTMLElement = e.target;
  const locationEl: HTMLElement = iconHtmlEl.parentElement!;
  const containerEl: HTMLElement = locationEl.parentElement!;

  const locationElClone = locationEl.cloneNode(true) as HTMLElement;
  //locationEl.style.visibility = "hidden";

  const locationWidth = locationEl.offsetWidth;

  locationElClone.style.width = locationWidth + "px";
  locationElClone.style.position = "absolute";
  locationElClone.style.zIndex = "1000";
  //const rect = locationElClone.getBoundingClientRect();
  moveAt(e.pageY);
  containerEl.append(locationElClone);
  //document.body.append(locationElClone);

  //containerEl.addEventListener("pointermove", onPointerMove);
  document.addEventListener("mousemove", onMouseMove);

  document.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    document.onmouseup = null;
  };

  function moveAt(pageY: number) {
    //locationElClone.style.left = x + "px";
    const y = pageY - containerEl.getBoundingClientRect().top;
    locationElClone.style.top = y + "px";

    if (y < 0) {
      emit("reorder");
    }
  }

  function onMouseMove(event: any) {
    moveAt(event.pageY);
  }
}

function touchDrag(e: any) {
  e.preventDefault();

  if (e.target.tagName !== "svg") {
    return;
  }

  const touch = e.targetTouches.item(0);

  const iconHtmlEl: HTMLElement = e.target;
  const locationEl: HTMLElement = iconHtmlEl.parentElement!;
  const containerEl: HTMLElement = locationEl.parentElement!;

  const locationElClone = locationEl.cloneNode(true) as HTMLElement;

  locationElClone.style.position = "absolute";
  locationElClone.style.zIndex = "1000";
  moveAt(touch.pageY);
  containerEl.append(locationElClone);
  //document.body.append(locationElClone);

  document.addEventListener("touchmove", handleTouchMove);

  function moveAt(pageY: number) {
    //locationElClone.style.left = x + "px";
    const y = pageY - containerEl.getBoundingClientRect().top;
    locationElClone.style.top = y + "px";
  }

  function handleTouchMove(e: any) {
    e.preventDefault();

    const touch = e.targetTouches.item(0);

    moveAt(touch.pageY);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bi {
  cursor: grab;
}
</style>
