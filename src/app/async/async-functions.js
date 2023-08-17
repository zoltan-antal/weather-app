import { processWeatherData } from '../utilities/process-weather-data';

const apiKey = '4e5aea0b731b42f3b75141558230808';
const urlBase = 'https://api.weatherapi.com';

async function getCurrentWeatherData(location) {
  const url = new URL('/v1/current.json', urlBase);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', location);

  const response = await fetch(url);
  const weatherData = await response.json();

  if ('error' in weatherData) {
    throw new Error(weatherData.error.message);
  }

  return weatherData;
}

async function getForecastWeatherData(location) {
  const url = new URL('/v1/forecast.json', urlBase);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', location);
  url.searchParams.set('days', 3);

  const response = await fetch(url);
  const weatherData = await response.json();

  if ('error' in weatherData) {
    throw new Error(weatherData.error.message);
  }

  return weatherData;
}

export default async function fetchWeatherData(location) {
  const [currentWeatherData, forecastWeatherData] = await Promise.all([
    getCurrentWeatherData(location),
    getForecastWeatherData(location),
  ]);

  const weatherData = processWeatherData(
    currentWeatherData,
    forecastWeatherData,
  );

  console.log(weatherData);
  localStorage.setItem('location', location);

  return weatherData;
}
