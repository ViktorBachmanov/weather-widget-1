export default function drag(
  container: HTMLElement,
  initialIndex: number,
  initialY: number,
  emit: (prevIndex: number, currentIndex: number) => void
) {
  const locations = container.querySelectorAll(".location");
  const location = locations.item(initialIndex) as HTMLElement;

  const locationClone = location.cloneNode(true) as HTMLElement;

  const locationWidth = location.offsetWidth;

  locationClone.style.width = locationWidth + "px";
  locationClone.style.position = "absolute";
  locationClone.style.zIndex = "1000";
  moveLocationImageBeneathPointer(initialY);
  container.append(locationClone);

  const handleMouseMove = (event: MouseEvent) => {
    moveAt(event);
  };

  document.addEventListener("mousemove", handleMouseMove);

  document.onmouseup = function () {
    locationClone.remove();
    document.removeEventListener("mousemove", handleMouseMove);
    document.onmouseup = null;
  };

  let prevIndex = initialIndex;

  const coords = createCoordinatesArray(locations);
  console.log("coords: ", coords);

  function moveAt(event: MouseEvent) {
    moveLocationImageBeneathPointer(event.clientY);

    const isPositiveMove = event.movementY >= 0 ? true : false;

    const localY = event.clientY - container.getBoundingClientRect().top;

    const currentIndex = evalCurrentIndex(
      localY,
      coords,
      prevIndex,
      isPositiveMove
    );

    if (currentIndex !== prevIndex) {
      emit(prevIndex, currentIndex);
      prevIndex = currentIndex;
    }
  }

  function moveLocationImageBeneathPointer(clientY: number) {
    const y = clientY - container.getBoundingClientRect().top;
    locationClone.style.top = y + "px";
  }
}

/*********** helper functions **************/

function evalCurrentIndex(
  y: number,
  coords: number[],
  prevIndex: number,
  isPositiveMove: boolean
): number {
  // if (prevIndex === 0 && !isPositiveMove) {
  //   return 0;
  // }

  // if (prevIndex === coords.length - 1 && isPositiveMove) {
  //   return coords.length - 1;
  // }

  let index: number = prevIndex;

  if (isPositiveMove) {
    // if(index === coords.length - 1) {
    //   return index;
    // }

    for (; index < coords.length - 1; index++) {
      if (y < coords[index + 1]) {
        return index;
      }
    }

    return index;
  } else {
    // if(index === 0) {
    //   return index;
    // }

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
