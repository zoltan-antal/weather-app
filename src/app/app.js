import { getCurrentWeatherData, getForecastWeatherData } from './api/api-calls';
import { processWeatherData } from './utilities/process-weather-data';

export default async function main() {
  // const currentWeatherDataRaw = await getCurrentWeatherData('Tokyo');
  // const foreCastWeatherDataRaw = await getForecastWeatherData('Tokyo');

  // const weatherData = processWeatherData(
  //   currentWeatherDataRaw,
  //   foreCastWeatherDataRaw,
  // );
  // console.log(weatherData);

  const locationInput = document.getElementById('location-input');
  const locationSearchButton = document.getElementById('location-search');
  let weatherData;

  locationSearchButton.addEventListener('click', () => {
    const location = locationInput.value;
    locationInput.value = '';

    Promise.all([
      getCurrentWeatherData(location),
      getForecastWeatherData(location),
    ])
      // .catch((err) => {
      //   throw err;
      // })
      .then((responses) => {
        weatherData = processWeatherData(responses[0], responses[1]);
        console.log(weatherData);
      })
      .catch(() => {
        alert("Couldn't fetch weather data for that location.");
      });
  });
}
