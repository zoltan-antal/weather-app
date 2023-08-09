import { getCurrentWeatherData, getForecastWeatherData } from './api/api-calls';

export default async function main() {
  const currentWeatherData = await getCurrentWeatherData('Budapest');
  const foreCastWeatherData = await getForecastWeatherData('Budapest');
  console.log(currentWeatherData);
  console.log(foreCastWeatherData);
}
