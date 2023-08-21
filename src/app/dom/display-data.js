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
const currentTempCElement = currentElement.querySelector('.temp_c');
const currentTempFElement = currentElement.querySelector('.temp_f');
const currentFeelslikeCElement = currentElement.querySelector('.feelslike_c');
const currentFeelslikeFElement = currentElement.querySelector('.feelslike_f');
const currentConditionTextElement =
  currentElement.querySelector('.condition-text');

const currentHumidityValueElement =
  currentElement.querySelector('.humidity .value');
const currentCloudValueElement = currentElement.querySelector('.cloud .value');
const currentUVValueElement = currentElement.querySelector('.uv .value');
const currentWindValueKphElement =
  currentElement.querySelector('.wind .value_kph');
const currentWindValueMphElement =
  currentElement.querySelector('.wind .value_mph');

const hourlyElement = document.querySelector('.main .hourly');
const dailyElement = document.querySelector('.main .daily');

const metricButton = document.querySelector('button.metric-button');
const imperialButton = document.querySelector('button.imperial-button');

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
  currentTempCElement.textContent = `${Math.round(
    weatherData.current.temp_c,
  )} ˚C`;
  currentTempFElement.textContent = `${Math.round(
    weatherData.current.temp_f,
  )} ˚F`;
  currentFeelslikeCElement.textContent = `Feels like ${Math.round(
    weatherData.current.feelslike_c,
  )}˚`;
  currentFeelslikeFElement.textContent = `Feels like ${Math.round(
    weatherData.current.feelslike_f,
  )}˚`;
  currentConditionTextElement.textContent = weatherData.current.condition.text;
  currentHumidityValueElement.textContent = `${weatherData.current.humidity} %`;
  currentCloudValueElement.textContent = `${weatherData.current.cloud} %`;
  currentUVValueElement.textContent = weatherData.current.uv;
  currentWindValueKphElement.textContent = `${weatherData.current.wind_kph} km/h ${weatherData.current.wind_dir}`;
  currentWindValueMphElement.textContent = `${weatherData.current.wind_mph} mph ${weatherData.current.wind_dir}`;
}

function createHourElement(hourData) {
  const hour = document.createElement('div');
  hour.classList.add('hour');

  const time = document.createElement('h3');
  time.classList.add('time');
  time.textContent = format(hourData.time, 'HH:mm');
  hour.appendChild(time);

  const conditionIcon = document.createElement('img');
  conditionIcon.classList.add('condition-icon');
  conditionIcon.src = `assets/weather-icons${hourData.condition.icon}`;
  conditionIcon.alt = hourData.condition.text;
  hour.appendChild(conditionIcon);

  const tempC = document.createElement('h3');
  tempC.classList.add('temp_c');
  tempC.classList.add('metric');
  tempC.textContent = `${Math.round(hourData.temp_c)}˚`;
  hour.appendChild(tempC);

  const tempF = document.createElement('h3');
  tempF.classList.add('temp_c');
  tempF.classList.add('imperial');
  tempF.textContent = `${Math.round(hourData.temp_f)}˚`;
  hour.appendChild(tempF);

  const chanceOfRain = document.createElement('div');
  chanceOfRain.classList.add('chance-of-rain');
  const chanceOfRainIcon = document.createElement('img');
  chanceOfRainIcon.classList.add('text-icon');
  chanceOfRainIcon.src =
    hourData.chance_of_rain >= 25
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
  dayOfWeek.textContent = format(dayData.date, 'EEEE');
  day.appendChild(dayOfWeek);

  const conditionIcon = document.createElement('img');
  conditionIcon.classList.add('condition-icon');
  conditionIcon.src = `assets/weather-icons${dayData.condition.icon}`;
  conditionIcon.alt = dayData.condition.text;
  day.appendChild(conditionIcon);

  const maxTempC = document.createElement('h3');
  maxTempC.classList.add('max-temp');
  maxTempC.classList.add('metric');
  maxTempC.textContent = `${Math.round(dayData.maxtemp_c)}˚`;
  day.appendChild(maxTempC);

  const maxTempF = document.createElement('h3');
  maxTempF.classList.add('max-temp');
  maxTempF.classList.add('imperial');
  maxTempF.textContent = `${Math.round(dayData.maxtemp_f)}˚`;
  day.appendChild(maxTempF);

  const minTempC = document.createElement('h3');
  minTempC.classList.add('min-temp');
  minTempC.classList.add('metric');
  minTempC.textContent = `${Math.round(dayData.mintemp_c)}˚`;
  day.appendChild(minTempC);

  const minTempF = document.createElement('h3');
  minTempF.classList.add('min-temp');
  minTempF.classList.add('imperial');
  minTempF.textContent = `${Math.round(dayData.mintemp_f)}˚`;
  day.appendChild(minTempF);

  const chanceOfRain = document.createElement('div');
  chanceOfRain.classList.add('chance-of-rain');
  const chanceOfRainIcon = document.createElement('img');
  chanceOfRainIcon.classList.add('text-icon');
  chanceOfRainIcon.src =
    dayData.daily_chance_of_rain >= 25
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

function selectUnitPreference() {
  const unitPreference = localStorage.getItem('unitPreference');

  const metricElements = document.querySelectorAll('.metric');
  const imperialElements = document.querySelectorAll('.imperial');

  if (!unitPreference || unitPreference === 'metric') {
    imperialElements.forEach((element) => {
      element.classList.add('hidden');
    });
    metricButton.classList.add('selected');
    imperialButton.classList.remove('selected');
  } else {
    metricElements.forEach((element) => {
      element.classList.add('hidden');
    });
    imperialButton.classList.add('selected');
    metricButton.classList.remove('selected');
  }
}

function revealPageElements() {
  document.querySelector('.location').classList.remove('hidden');
  document.querySelector('.current').classList.remove('hidden');
  document.querySelector('.forecast-toggle').classList.remove('hidden');
}

export default function displayWeatherData(weatherData) {
  displayLocation(weatherData);
  displayCurrentWeather(weatherData);
  displayHourlyWeather(weatherData);
  displayDailyWeather(weatherData);
  selectUnitPreference();
  revealPageElements();
}
