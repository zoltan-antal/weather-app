import { getCurrentWeatherData, getForecastWeatherData } from './api/api-calls';
import {
  processCurrentWeatherData,
  processForecastWeatherData,
  processWeatherData,
} from './utilities/process-weather-data';

export default async function main() {
  const currentWeatherDataRaw = await getCurrentWeatherData('Tokyo');
  const foreCastWeatherDataRaw = await getForecastWeatherData('Tokyo');

  const weatherData = processWeatherData(
    currentWeatherDataRaw,
    foreCastWeatherDataRaw,
  );
  console.log(weatherData);
}
