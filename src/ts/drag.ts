export default function drag(
  container: HTMLElement,
  index: number,
  yStart: number
) {
  const locations = container.querySelectorAll(".location");
  const location = locations.item(index) as HTMLElement;

  const locationClone = location.cloneNode(true) as HTMLElement;

  const locationWidth = location.offsetWidth;

  locationClone.style.width = locationWidth + "px";
  locationClone.style.position = "absolute";
  locationClone.style.zIndex = "1000";
  moveAt(yStart);
  container.append(locationClone);

  const handleMouseMove = (event: MouseEvent) => {
    moveAt(event.clientY);
  };

  document.addEventListener("mousemove", handleMouseMove);

  document.onmouseup = function () {
    document.removeEventListener("mousemove", handleMouseMove);
    document.onmouseup = null;
  };

  function moveAt(clientY: number) {
    const y = clientY - container.getBoundingClientRect().top;
    locationClone.style.top = y + "px";
  }
}
