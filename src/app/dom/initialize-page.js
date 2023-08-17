import fetchWeatherData from '../async/async-functions';
import displayWeatherData from './display-data';

export default async function initializePage() {
  const location = localStorage.getItem('location');

  console.log(location);

  if (!location) {
    return;
  }

  const weatherData = await fetchWeatherData(location);
  displayWeatherData(weatherData);
}
