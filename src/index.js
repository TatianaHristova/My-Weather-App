function updateWeatherInfo(response) {
  let cityElement = document.querySelector("#currentCity");
  let descriptionElement = document.querySelector("#description");
  let emojiElement = document.querySelector("#current-emoji");
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  let timeElement = document.querySelector("#date-info");
  let date = new Date(response.data.time * 1000);
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  emojiElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-emoji" />`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;
  timeElement.innerHTML = formatDate(date);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  console;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function searchForCity(city) {
  let apiKey = "be370966b8473f0115f0d32afo601c3t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherInfo);
}

function handleSubmitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchForCity(searchInput.value);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
<div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-emoji">☀️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15°</strong>
              </div>
              <div class="weather-forecast-temperature">8°</div>
            </div>
          </div>
          `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmitCity);

searchForCity("Paris");
displayForecast();
