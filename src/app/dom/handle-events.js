import displayWeatherData from './display-data';
import fetchWeatherData from '../async/async-functions';

const locationInput = document.querySelector('.search-input');
const locationSearchForm = document.querySelector('.search');

export default function setUpEventListeners() {
  locationSearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    locationInput.value = '';

    try {
      const weatherData = await fetchWeatherData(location);
      displayWeatherData(weatherData);
    } catch (error) {
      alert("Couldn't fetch weather data for that location.");
    }
  });
}
