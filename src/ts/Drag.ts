export default class Drag {
  private container: HTMLElement;
  private locationClone: HTMLElement;

  constructor(container: HTMLElement, index: number, yStart: number) {
    this.container = container;

    const locations = container.querySelectorAll(".location");
    const location = locations.item(index) as HTMLElement;
    //const containerEl: HTMLElement = locationEl.parentElement!;

    this.locationClone = location.cloneNode(true) as HTMLElement;

    const locationWidth = location.offsetWidth;

    this.locationClone.style.width = locationWidth + "px";
    this.locationClone.style.position = "absolute";
    this.locationClone.style.zIndex = "1000";
    this.moveAt(yStart);
    container.append(this.locationClone);

    const handleMouseMove = (event: MouseEvent) => {
      this.moveAt(event.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.onmouseup = function () {
      document.removeEventListener("mousemove", handleMouseMove);
      document.onmouseup = null;
    };
  }

  moveAt(clientY: number) {
    const y = clientY - this.container.getBoundingClientRect().top;
    this.locationClone.style.top = y + "px";
  }
}
