import displayWeatherData from './display-data';
import fetchWeatherData from '../async/async-functions';

export default function setUpEventListeners() {
  const locationInput = document.querySelector('.search-input');
  const locationSearchForm = document.querySelector('.search');

  const hourlyButton = document.querySelector('button.hourly-button');
  const dailyButton = document.querySelector('button.daily-button');

  const hourlyDiv = document.querySelector('.hourly');
  const dailyDiv = document.querySelector('.daily');

  const metricButton = document.querySelector('button.metric-button');
  const imperialButton = document.querySelector('button.imperial-button');

  const searchErrorDisplay = document.querySelector('.search-error');

  locationSearchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = locationInput.value;
    locationInput.value = '';

    try {
      const weatherData = await fetchWeatherData(location);
      localStorage.setItem('location', location);
      searchErrorDisplay.classList.add('invisible');
      displayWeatherData(weatherData);
    } catch (error) {
      searchErrorDisplay.classList.remove('invisible');
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

  metricButton.addEventListener('click', () => {
    const metricElements = document.querySelectorAll('.metric');
    const imperialElements = document.querySelectorAll('.imperial');

    metricElements.forEach((element) => {
      element.classList.remove('hidden');
    });

    imperialElements.forEach((element) => {
      element.classList.add('hidden');
    });

    metricButton.classList.add('selected');
    imperialButton.classList.remove('selected');

    localStorage.setItem('unitPreference', 'metric');
  });

  imperialButton.addEventListener('click', () => {
    const metricElements = document.querySelectorAll('.metric');
    const imperialElements = document.querySelectorAll('.imperial');

    imperialElements.forEach((element) => {
      element.classList.remove('hidden');
    });

    metricElements.forEach((element) => {
      element.classList.add('hidden');
    });

    imperialButton.classList.add('selected');
    metricButton.classList.remove('selected');

    localStorage.setItem('unitPreference', 'imperial');
  });
}
