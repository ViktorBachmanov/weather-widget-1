import { Location } from "./types";

export function isWeatherDataOutdated(updatedAt: number) {
  const expirationPeriod = 10 * 60 * 1000; // 10 min

  const isOutdated = updatedAt + expirationPeriod < Date.now() ? true : false;

  return isOutdated;
}

export function fetchLocationWeather(city: string) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_API_KEY}&units=metric`
  );
}

export function updateWeatherData(locations: Location[]) {
  locations.forEach(async (location, index, locArray) => {
    let response;
    if (isWeatherDataOutdated(location.fetchedAt)) {
      try {
        response = await fetchLocationWeather(location.data.name);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        return;
      }
      if (response.ok) {
        const locationData = await response.json();
        const freshLocation: Location = {
          fetchedAt: Date.now(),
          data: locationData,
        };
        locArray[index] = freshLocation;
      }
    }
  });
}
