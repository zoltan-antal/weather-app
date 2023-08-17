import {
  getCurrentWeatherData,
  getForecastWeatherData,
} from '../api/api-calls';
import { processWeatherData } from '../utilities/process-weather-data';
import displayWeatherData from './display-data';

const locationInput = document.querySelector('.search-input');
const locationSearchForm = document.querySelector('.search');
let weatherData;

async function fetchWeatherData(location) {
  Promise.all([
    getCurrentWeatherData(location),
    getForecastWeatherData(location),
  ])
    .then((responses) => {
      weatherData = processWeatherData(responses[0], responses[1]);
      console.log(weatherData);
      localStorage.setItem('location', location);
      displayWeatherData(weatherData);
    })
    .catch(() => {
      alert("Couldn't fetch weather data for that location.");
    });
}

export default function setUpEventListeners() {
  locationSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    locationInput.value = '';

    fetchWeatherData(location);
  });
}
