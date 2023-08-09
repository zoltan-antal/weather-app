const apiKey = '4e5aea0b731b42f3b75141558230808';
const urlBase = 'https://api.weatherapi.com';

export async function getCurrentWeatherData(location) {
  const url = new URL('/v1/current.json', urlBase);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', location);

  const response = await fetch(url);
  const weatherData = await response.json();
  return weatherData;
}

export async function getForecastWeatherData(location) {
  const url = new URL('/v1/forecast.json', urlBase);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('q', location);
  url.searchParams.set('days', 3);

  const response = await fetch(url);
  const weatherData = await response.json();
  return weatherData;
}
