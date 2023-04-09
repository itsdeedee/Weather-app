let currentDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
let min = currentDate.getMinutes();

let h4 = document.querySelector("#time");
h4.innerHTML = `${day} ${hour}:${min}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast">${formatDay(forecastDay.time)}</div>
        <img 
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
              alt="clear"
              width="42"
            />
            <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temperature.maximum
            )}°</span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temperature.minimum
            )}° </span>
              </div>
              </div>
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "bdc1aa3oa00cd461t2421e4af03336bc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function searchCity(city) {
  let apiKey = "bdc1aa3oa00cd461t2421e4af03336bc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let temperature = document.querySelector("#temp");
  celsiusTemperature = response.data.temperature.current;
  temperature.innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getForecast(response.data.coordinates);
}
function toSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-form-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", toSubmit);

function DisplayCurrentWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;

  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}
function currentPosition(position) {
  let apiKey = "bdc1aa3oa00cd461t2421e4af03336bc";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  axios.get(url).then(DisplayCurrentWeather);
}

let button = document.querySelector("#currentButton");
button.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(currentPosition);
});

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  Celink.classList.remove("active");
  Felink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  Celink.classList.add("active");
  Felink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let Felink = document.querySelector("#felink");
Felink.addEventListener("click", displayFahrenheitTemperature);

let Celink = document.querySelector("#celink");
Celink.addEventListener("click", displayCelsiusTemperature);
