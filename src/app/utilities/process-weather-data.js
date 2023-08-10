const iconRootPath = '//cdn.weatherapi.com/weather/64x64';

function reduceForecastDay(raw) {
  return {
    date: raw.date,
    maxtemp_c: raw.day.maxtemp_c,
    maxtemp_f: raw.day.maxtemp_f,
    mintemp_c: raw.day.mintemp_c,
    mintemp_f: raw.day.mintemp_f,
    daily_chance_of_rain: raw.day.daily_chance_of_rain,
    condition: {
      text: raw.day.condition.text,
      icon: raw.day.condition.icon.replace(iconRootPath, ''),
    },
  };
}

function reduceForecastHour(raw) {
  return {
    time: raw.time,
    temp_c: raw.temp_c,
    temp_f: raw.temp_f,
    is_day: raw.is_day,
    condition: {
      text: raw.condition.text,
      icon: raw.condition.icon.replace(iconRootPath, ''),
    },
    chance_of_rain: raw.chance_of_rain,
  };
}

function selectForecastHours(raw) {
  const currentTime = raw.location.localtime;

  let hoursLeft = 24;
  const forecastHours = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const forecastday of raw.forecast.forecastday) {
    // eslint-disable-next-line no-restricted-syntax
    for (const hour of forecastday.hour) {
      if (hoursLeft <= 0) {
        break;
      }

      if (hour.time > currentTime) {
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
      localtime: raw.location.localtime,
    },
    current: {
      temp_c: raw.current.temp_c,
      temp_f: raw.current.temp_f,
      is_day: raw.current.is_day,
      condition: {
        text: raw.current.condition.text,
        icon: raw.current.condition.icon.replace(iconRootPath, ''),
      },
      wind_kph: raw.current.wind_kph,
      wind_mph: raw.current.wind_mph,
      wind_dir: raw.current.wind_dir,
      humidity: raw.current.humidity,
      feelslike_c: raw.current.feelslike_c,
      feelslike_f: raw.current.feelslike_f,
      uv: raw.current.uv,
    },
  };
}

export function processForecastWeatherData(raw) {
  return {
    days: {
      0: reduceForecastDay(raw.forecast.forecastday[0]),
      1: reduceForecastDay(raw.forecast.forecastday[1]),
      2: reduceForecastDay(raw.forecast.forecastday[2]),
    },
    hours: selectForecastHours(raw),
  };
}

export function processWeatherData(currentRaw, forecastRaw) {
  return {
    ...processCurrentWeatherData(currentRaw),
    ...processForecastWeatherData(forecastRaw),
  };
}
