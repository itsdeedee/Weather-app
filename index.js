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

let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${hour}:${min}`;

function searchCity(city) {
  let apiKey = "667d9f573c8af4c33457be5d561a9148";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}
function displayTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function celciusUnit() {
  let Temp = document.querySelector("#temp");
  Temp.innerHTML = "☁️ 4";
}
let Celink = document.querySelector("#celink");
Celink.addEventListener("click", celciusUnit);

function fahrenhietUnit() {
  let Temp = document.querySelector("#temp");
  Temp.innerHTML = "☁️ 35";
}
let Felink = document.querySelector("#felink");
Felink.addEventListener("click", fahrenhietUnit);

function toSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-form-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", toSubmit);

function DisplayCurrentWeather(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
}
function currentPosition(position) {
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(DisplayCurrentWeather);
}

let button = document.querySelector("#currentButton");
button.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(currentPosition);
});
