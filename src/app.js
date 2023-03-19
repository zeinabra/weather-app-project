function dateFormat(timestamps) {
  let now = new Date(timestamps * 1000);
  let day = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = now.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${days[day]} ${hour}:${min}`;
}
function day(timestamps) {
  let now = new Date(timestamps * 1000);
  let day = now.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[day]}`;
}
function weatherForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#weather-forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="weather-forecast-day">${day(forecastDay.time)}
              </div>
              <div class="weather-forecast_icon">
                 <img
                  src="${forecastDay.condition.icon_url}"
                  alt="${forecastDay.condition.icon}"
                 />
              </div>
              <div class="weather-forecast-temp">
                <span class="weather-forecast-max-temp">${Math.round(
                  forecastDay.temperature.maximum
                )}°</span>
                <span class="weather-forecast-min-temp">${Math.round(
                  forecastDay.temperature.minimum
                )}°</span>
              </div>
              </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecastElement.innerHTML = forecastHTML;
}
function displayForecast(city) {
  apikey = "991tdfobabef456099349a3cfadfc7ac";
  apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}

function display(response) {
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", response.data.condition.icon_url);
  icon.setAttribute("alt", response.data.condition.icon);
  let date = document.querySelector("#date");
  date.innerHTML = dateFormat(response.data.time);
  displayForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "991tdfobabef456099349a3cfadfc7ac";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(display);
}
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

let search = document.querySelector("#search-btn");
search.addEventListener("click", handleSearch);
searchCity("paris");
