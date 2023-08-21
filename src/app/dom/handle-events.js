import displayWeatherData from './display-data';
import fetchWeatherData from '../async/async-functions';

const locationInput = document.querySelector('.search-input');
const locationSearchForm = document.querySelector('.search');

const hourlyButton = document.querySelector('.hourly-button');
const dailyButton = document.querySelector('.daily-button');

const hourlyDiv = document.querySelector('.hourly');
const dailyDiv = document.querySelector('.daily');

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

  hourlyButton.addEventListener('click', () => {
    hourlyDiv.classList.remove('hidden');
    dailyDiv.classList.add('hidden');

    hourlyButton.classList.add('selected');
    dailyButton.classList.remove('selected');
  });

  dailyButton.addEventListener('click', () => {
    dailyDiv.classList.remove('hidden');
    hourlyDiv.classList.add('hidden');

    dailyButton.classList.add('selected');
    hourlyButton.classList.remove('selected');
  });
}
