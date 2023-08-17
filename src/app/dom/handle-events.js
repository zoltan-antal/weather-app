import {
  getCurrentWeatherData,
  getForecastWeatherData,
} from '../api/api-calls';
import { processWeatherData } from '../utilities/process-weather-data';
import displayWeatherData from './display-data';

const locationInput = document.querySelector('.search-input');
const locationSearchForm = document.querySelector('.search');
let weatherData;

export default async function setUpEventListeners() {
  locationSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = locationInput.value;
    locationInput.value = '';
    Promise.all([
      getCurrentWeatherData(location),
      getForecastWeatherData(location),
    ])
      .then((responses) => {
        weatherData = processWeatherData(responses[0], responses[1]);
        console.log(weatherData);
        displayWeatherData(weatherData);
      })
      .catch(() => {
        alert("Couldn't fetch weather data for that location.");
      });
  });
}
