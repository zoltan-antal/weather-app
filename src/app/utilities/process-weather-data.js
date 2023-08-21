import { zonedTimeToUtc } from 'date-fns-tz';

const iconRootPath = '//cdn.weatherapi.com/weather/64x64';

function reduceForecastDay(raw) {
  return {
    date: new Date(raw.date),
    maxtemp_c: Number(raw.day.maxtemp_c),
    maxtemp_f: Number(raw.day.maxtemp_f),
    mintemp_c: Number(raw.day.mintemp_c),
    mintemp_f: Number(raw.day.mintemp_f),
    daily_chance_of_rain: Number(raw.day.daily_chance_of_rain),
    condition: {
      text: raw.day.condition.text,
      icon: raw.day.condition.icon.replace(iconRootPath, ''),
    },
  };
}

function reduceForecastHour(raw) {
  return {
    time: new Date(raw.time),
    temp_c: Number(raw.temp_c),
    temp_f: Number(raw.temp_f),
    is_day: Number(raw.is_day),
    condition: {
      text: raw.condition.text,
      icon: raw.condition.icon.replace(iconRootPath, ''),
    },
    chance_of_rain: Number(raw.chance_of_rain),
  };
}

function selectForecastHours(raw) {
  const currentTime = zonedTimeToUtc(
    new Date(raw.location.localtime),
    raw.location.tz_id,
  );

  let hoursLeft = 24;
  const forecastHours = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const forecastday of raw.forecast.forecastday) {
    // eslint-disable-next-line no-restricted-syntax
    for (const hour of forecastday.hour) {
      if (hoursLeft <= 0) {
        break;
      }

      if (
        zonedTimeToUtc(new Date(hour.time), raw.location.tz_id) > currentTime
      ) {
        forecastHours[24 - hoursLeft] = reduceForecastHour(hour);
        hoursLeft -= 1;
      }
    }
  }

  return forecastHours;
}

export function processCurrentWeatherData(raw) {
  return {
    location: {
      name: raw.location.name,
      region: raw.location.region,
      country: raw.location.country,
      utc_time: zonedTimeToUtc(
        new Date(raw.location.localtime),
        raw.location.tz_id,
      ),
      timezone: raw.location.tz_id,
    },
    current: {
      temp_c: Number(raw.current.temp_c),
      temp_f: Number(raw.current.temp_f),
      is_day: Number(raw.current.is_day),
      condition: {
        text: raw.current.condition.text,
        icon: raw.current.condition.icon.replace(iconRootPath, ''),
      },
      wind_kph: Number(raw.current.wind_kph),
      wind_mph: Number(raw.current.wind_mph),
      wind_dir: raw.current.wind_dir,
      humidity: Number(raw.current.humidity),
      cloud: Number(raw.current.cloud),
      feelslike_c: Number(raw.current.feelslike_c),
      feelslike_f: Number(raw.current.feelslike_f),
      uv: Number(raw.current.uv),
    },
  };
}

export function processForecastWeatherData(raw) {
  return {
    days: [
      reduceForecastDay(raw.forecast.forecastday[0]),
      reduceForecastDay(raw.forecast.forecastday[1]),
      reduceForecastDay(raw.forecast.forecastday[2]),
    ],
    hours: selectForecastHours(raw),
  };
}

export function processWeatherData(currentRaw, forecastRaw) {
  return {
    ...processCurrentWeatherData(currentRaw),
    ...processForecastWeatherData(forecastRaw),
  };
}
