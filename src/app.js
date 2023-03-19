function weatherForcast() {
  let weatherForecastElement = document.querySelector("#weather-forecast");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
              <div class="weather-forecast-day">${day}</div>
              <div class="weather-forecast_icon">
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png"
                />
              </div>
              <div class="weather-forecast_temp">
                <span class="weather-forecast-max-temp">12°</span>
                <span class="weather-forecast-min-temp">10°</span>
              </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  weatherForecastElement.innerHTML = forecastHTML;
}

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
