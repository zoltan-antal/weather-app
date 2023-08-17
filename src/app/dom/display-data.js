import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

require.context('../../assets', true, /.*/);

const locationElement = document.querySelector('.main .location');
const locationTownElement = locationElement.querySelector('.town');
const locationAddressElement = locationElement.querySelector('.address');
const locationLocalDateElement = locationElement.querySelector('.local-date');
const locationLocalTimeElement = locationElement.querySelector('.local-time');

const currentElement = document.querySelector('.main .current');
const currentConditionIconElement =
  currentElement.querySelector('.condition-icon');
const currentTempElement = currentElement.querySelector('.temp');
const currentFeelslikeElement = currentElement.querySelector('.feelslike');
const currentConditionTextElement =
  currentElement.querySelector('.condition-text');

const currentHumidityValueElement =
  currentElement.querySelector('.humidity .value');
const currentCloudValueElement = currentElement.querySelector('.cloud .value');
const currentUVValueElement = currentElement.querySelector('.uv .value');
const currentWindValueElement = currentElement.querySelector('.wind .value');

const hourlyElement = document.querySelector('.main .hourly');
const dailyElement = document.querySelector('.main .daily');

function displayLocation(weatherData) {
  locationTownElement.textContent = weatherData.location.name;
  locationAddressElement.textContent = weatherData.location.region
    ? `${weatherData.location.region}, ${weatherData.location.country}`
    : weatherData.location.country;
  locationLocalDateElement.textContent = format(
    utcToZonedTime(
      weatherData.location.utc_time,
      weatherData.location.timezone,
    ),
    'd MMM y',
  );
  locationLocalTimeElement.textContent = format(
    utcToZonedTime(
      weatherData.location.utc_time,
      weatherData.location.timezone,
    ),
    'HH:mm',
  );
}

function displayCurrentWeather(weatherData) {
  currentConditionIconElement.src = `assets/weather-icons${weatherData.current.condition.icon}`;
  currentConditionIconElement.alt = weatherData.current.condition.text;
  currentTempElement.textContent = `${weatherData.current.temp_c} ˚C`;
  currentFeelslikeElement.textContent = `Feels like ${weatherData.current.feelslike_c}˚`;
  currentConditionTextElement.textContent = weatherData.current.condition.text;
  currentHumidityValueElement.textContent = `${weatherData.current.humidity} %`;
  currentCloudValueElement.textContent = `${weatherData.current.cloud} %`;
  currentUVValueElement.textContent = weatherData.current.uv;
  currentWindValueElement.textContent = `${weatherData.current.wind_kph} km/h ${weatherData.current.wind_dir}`;
}

function createHourElement(hourData) {
  const hour = document.createElement('div');
  hour.classList.add('hour');

  const time = document.createElement('h3');
  time.classList.add('time');
  time.textContent = format(new Date(hourData.time), 'HH:mm');
  hour.appendChild(time);

  const conditionIcon = document.createElement('img');
  conditionIcon.classList.add('condition-icon');
  conditionIcon.src = `assets/weather-icons${hourData.condition.icon}`;
  conditionIcon.alt = hourData.condition.text;
  hour.appendChild(conditionIcon);

  const temp = document.createElement('h3');
  temp.classList.add('temp');
  temp.textContent = `${hourData.temp_c}˚`;
  hour.appendChild(temp);

  const chanceOfRain = document.createElement('div');
  chanceOfRain.classList.add('chance-of-rain');
  const chanceOfRainIcon = document.createElement('img');
  chanceOfRainIcon.classList.add('text-icon');
  chanceOfRainIcon.src =
    Number(hourData.chance_of_rain) >= 25
      ? 'assets/icons/water.svg'
      : 'assets/icons/water-outline.svg';
  chanceOfRain.appendChild(chanceOfRainIcon);
  const chanceOfRainValue = document.createElement('h3');
  chanceOfRainValue.classList.add('value');
  chanceOfRainValue.textContent = `${hourData.chance_of_rain}%`;
  chanceOfRain.appendChild(chanceOfRainValue);
  hour.appendChild(chanceOfRain);

  return hour;
}

function createDayElement(dayData) {
  const day = document.createElement('div');
  day.classList.add('day');

  const dayOfWeek = document.createElement('h3');
  dayOfWeek.classList.add('day-of-week');
  dayOfWeek.textContent = format(new Date(dayData.date), 'EEEE');
  day.appendChild(dayOfWeek);

  const conditionIcon = document.createElement('img');
  conditionIcon.classList.add('condition-icon');
  conditionIcon.src = `assets/weather-icons${dayData.condition.icon}`;
  conditionIcon.alt = dayData.condition.text;
  day.appendChild(conditionIcon);

  const maxTemp = document.createElement('h3');
  maxTemp.classList.add('max-temp');
  maxTemp.textContent = `${dayData.maxtemp_c}˚`;
  day.appendChild(maxTemp);

  const minTemp = document.createElement('h3');
  minTemp.classList.add('min-temp');
  minTemp.textContent = `${dayData.mintemp_c}˚`;
  day.appendChild(minTemp);

  const chanceOfRain = document.createElement('div');
  chanceOfRain.classList.add('chance-of-rain');
  const chanceOfRainIcon = document.createElement('img');
  chanceOfRainIcon.classList.add('text-icon');
  chanceOfRainIcon.src =
    Number(dayData.daily_chance_of_rain) >= 25
      ? 'assets/icons/water.svg'
      : 'assets/icons/water-outline.svg';
  chanceOfRain.appendChild(chanceOfRainIcon);
  const chanceOfRainValue = document.createElement('h3');
  chanceOfRainValue.classList.add('value');
  chanceOfRainValue.textContent = `${dayData.daily_chance_of_rain}%`;
  chanceOfRain.appendChild(chanceOfRainValue);
  day.appendChild(chanceOfRain);

  return day;
}

function displayHourlyWeather(weatherData) {
  while (hourlyElement.firstChild) {
    hourlyElement.removeChild(hourlyElement.lastChild);
  }

  weatherData.hours.forEach((hour) => {
    const hourElement = createHourElement(hour);
    hourlyElement.appendChild(hourElement);
  });
}

function displayDailyWeather(weatherData) {
  while (dailyElement.firstChild) {
    dailyElement.removeChild(dailyElement.lastChild);
  }

  weatherData.days.forEach((day) => {
    const dayElement = createDayElement(day);
    dailyElement.appendChild(dayElement);
  });

  dailyElement.firstChild.querySelector('.day-of-week').textContent = 'Today';
}

export default function displayWeatherData(weatherData) {
  displayLocation(weatherData);
  displayCurrentWeather(weatherData);
  displayHourlyWeather(weatherData);
  displayDailyWeather(weatherData);
}
