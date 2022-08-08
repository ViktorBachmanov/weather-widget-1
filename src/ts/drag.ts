export default function drag(
  container: HTMLElement,
  initialIndex: number,
  emit: (prevIndex: number, currentIndex: number) => void,
  event: MouseEvent | TouchEvent
) {
  event.preventDefault();

  const locations = container.querySelectorAll(".location");
  const location = locations.item(initialIndex) as HTMLElement;

  const locationClone = location.cloneNode(true) as HTMLElement;

  const locationWidth = location.offsetWidth;

  let initialY = getEventY(event);

  console.log("location.offsetTop: ", location.offsetTop);

  const locationY =
    location.getBoundingClientRect().top -
    container.getBoundingClientRect().top;

  console.log("locationY: ", locationY);

  const offset = evalLocalY(initialY) - location.offsetTop;

  initialY -= offset;

  console.log("offset: ", offset);

  locationClone.style.width = locationWidth + "px";
  locationClone.style.position = "absolute";
  locationClone.style.zIndex = "1000";
  locationClone.style.opacity = "0.5";
  locationClone.style.margin = "0";
  moveLocationImageBeneathPointer(evalLocalY(initialY));
  container.append(locationClone);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    const y = evalLocalY(getEventY(event)) - offset;

    //console.log("y - offset = ", y);

    moveAt(y);
  };

  if (event.type === "mousedown") {
    document.addEventListener("mousemove", handleMove);

    document.onmouseup = function () {
      console.log("onmouseup");
      locationClone.remove();
      document.removeEventListener("mousemove", handleMove);
      document.onmouseup = null;
    };
  } else {
    document.addEventListener("touchmove", handleMove);

    document.ontouchend = function () {
      console.log("ontouchend");

      locationClone.remove();
      document.removeEventListener("touchmove", handleMove);
      document.ontouchend = null;
    };
  }

  let prevIndex = initialIndex;

  const coords = createCoordinatesArray(locations);
  console.log("coords: ", coords);

  let prevY = initialY;

  function moveAt(currentY: number) {
    moveLocationImageBeneathPointer(currentY);

    const isPositiveMove = currentY >= prevY ? true : false;
    prevY = currentY;

    const currentIndex = evalCurrentIndex(
      currentY,
      coords,
      prevIndex,
      isPositiveMove
    );

    if (currentIndex !== prevIndex) {
      emit(prevIndex, currentIndex);
      prevIndex = currentIndex;
    }
  }

  function moveLocationImageBeneathPointer(y: number) {
    //locationClone.style.top = y - offset + "px";
    locationClone.style.top = y + "px";
  }

  function evalLocalY(clientY: number) {
    return clientY - container.getBoundingClientRect().top;
  }

  function getEventY(event: MouseEvent | TouchEvent) {
    switch (event.type) {
      case "mousedown":
      case "mousemove":
        //console.log("mouse");
        event = event as MouseEvent;
        return event.clientY;
      case "touchstart":
      case "touchmove":
        //console.log("touch");
        event = event as TouchEvent;
        return event.targetTouches.item(0)!.clientY;
      default:
        // console.log("event.type: ", event.type);
        // console.log("default");
        return 0;
    }
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
