abstract class Drag {
  private container: HTMLElement;
  private emit: (prevIndex: number, currentIndex: number) => void;

  private locations: NodeListOf<Element>;
  protected locationClone: HTMLElement;
  private offset: number;
  private prevY: number;
  private prevIndex: number;
  private coords: number[];

  constructor(
    container: HTMLElement,
    initialIndex: number,
    emit: (prevIndex: number, currentIndex: number) => void,
    startEvent: MouseEvent | TouchEvent
  ) {
    this.container = container;
    this.emit = emit;

    this.prevIndex = initialIndex;

    startEvent.preventDefault();

    this.locations = container.querySelectorAll(".location");
    const location = this.locations.item(initialIndex) as HTMLElement;
    this.locationClone = location.cloneNode(true) as HTMLElement;

    let initialY = this.getEventY(startEvent);

    this.offset = this.evalLocalY(initialY) - location.offsetTop;

    initialY -= this.offset;

    this.prevY = initialY;

    const locationWidth = location.offsetWidth;

    this.locationClone.style.width = locationWidth + "px";
    this.locationClone.style.position = "absolute";
    this.locationClone.style.zIndex = "1000";
    this.locationClone.style.opacity = "0.5";
    this.locationClone.style.margin = "0";
    this.moveLocationImageBeneathPointer(this.evalLocalY(initialY));
    this.container.append(this.locationClone);

    this.coords = createCoordinatesArray(this.locations);

    this.handleMove = this.handleMove.bind(this);

    this.setListeners();

    this.locationClone.style.cursor = "grabbing";
    const hamburgerClone = this.locationClone.querySelector(
      ".hamburger"
    ) as HTMLElement;
    hamburgerClone!.style.cursor = "grabbing";
    document.body.style.cursor = "grabbing";
  }

  abstract getEventY(event: MouseEvent | TouchEvent): number;

  //abstract getEventTarget(event: MouseEvent | TouchEvent): HTMLElement;

  abstract setListeners(): void;

  evalLocalY(clientY: number) {
    return clientY - this.container.getBoundingClientRect().top;
  }

  moveLocationImageBeneathPointer(y: number) {
    this.locationClone.style.top = y + "px";
  }

  handleMove(event: MouseEvent | TouchEvent) {
    const y = this.evalLocalY(this.getEventY(event)) - this.offset;

    this.moveAt(y);
  }

  moveAt(currentY: number) {
    this.moveLocationImageBeneathPointer(currentY);

    const isPositiveMove = currentY >= this.prevY ? true : false;
    this.prevY = currentY;

    const currentIndex = evalCurrentIndex(
      currentY,
      this.coords,
      this.prevIndex,
      isPositiveMove
    );

    if (currentIndex !== this.prevIndex) {
      this.emit(this.prevIndex, currentIndex);
      this.prevIndex = currentIndex;
    }
  }
}

/////////////////////////////////////////////

export class MouseDrag extends Drag {
  getEventY(event: MouseEvent) {
    return event.clientY;
  }

  setListeners() {
    document.addEventListener("mousemove", this.handleMove);

    document.addEventListener(
      "mouseup",
      () => {
        this.locationClone.remove();
        document.removeEventListener("mousemove", this.handleMove);
        document.body.style.removeProperty("cursor");
      },
      { once: true }
    );
  }
}

/////////////////////////////////////////////

export class TouchDrag extends Drag {
  getEventY(event: TouchEvent) {
    return event.targetTouches.item(0)!.clientY;
  }

  setListeners() {
    document.addEventListener("touchmove", this.handleMove);

    document.addEventListener(
      "touchend",
      () => {
        this.locationClone.remove();
        document.removeEventListener("touchmove", this.handleMove);
        document.body.style.removeProperty("cursor");
      },
      { once: true }
    );
  }
}

/*********** helper functions **************/

function evalCurrentIndex(
  y: number,
  coords: number[],
  prevIndex: number,
  isPositiveMove: boolean
): number {
  let index: number = prevIndex;

  if (isPositiveMove) {
    for (; index < coords.length - 1; index++) {
      if (y < coords[index + 1]) {
        return index;
      }
    }

    return index;
  } else {
    for (; index > 0; index--) {
      if (y > coords[index - 1]) {
        return index;
      }
    }

    return index;
  }
}

function createCoordinatesArray(locations: NodeList) {
  const coords: number[] = [];

  locations.forEach((location) => {
    const locationEl = location as HTMLElement;
    coords.push(locationEl.offsetTop);
  });

  return coords;
}
