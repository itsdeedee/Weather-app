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

function searchCity(city) {
  let apiKey = "bdc1aa3oa00cd461t2421e4af03336bc";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
}
function toSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-form-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", toSubmit);

let Celink = document.querySelector("#celink");
Celink.addEventListener("click", celciusUnit);

function celciusUnit() {
  let Temp = document.querySelector("#temp");
  Temp.innerHTML = "4";
}

function fahrenhietUnit() {
  let Temp = document.querySelector("#temp");
  Temp.innerHTML = "35";
}
let Felink = document.querySelector("#felink");
Felink.addEventListener("click", fahrenhietUnit);

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
