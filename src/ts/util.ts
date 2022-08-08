import { Location } from "./types";

export function isWeatherDataOutdated(updatedAt: number) {
  const expirationPeriod = 10 * 60 * 1000; // 10 min

  const isOutdated = updatedAt + expirationPeriod < Date.now() ? true : false;

  console.log("fetchedAt: ", new Date(updatedAt).toLocaleTimeString("ru-Ru"));

  console.log("isWeatherDataOutdated: ", isOutdated);

  return isOutdated;
}

export function fetchLocationWeather(city: string) {
  //try {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.VUE_APP_API_KEY}&units=metric`
  );
  // } catch (error) {
  //   console.error("There has been a problem with your fetch operation:", error);
  // }
}

export function updateWeatherData(locations: Location[]) {
  console.log("updateWeatherData");
  locations.forEach(async (location, index, locArray) => {
    let response;
    console.log("location ", location.data.name);
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
        console.log(`update ${location.data.name}`);
        locArray[index] = freshLocation;
      }
    }
  });
}
