var searchFormEl = document.querySelector("#search-form");
var searchFormCityInputEl = document.querySelector("#search-form-city-input");
var weatherDayCityEl = document.querySelector("#weather-day-city");
var weatherDayTempEl = document.querySelector("#weather-day-temp");
var weatherDayWindEl = document.querySelector("#weather-day-wind");
var weatherDayHumidityEl = document.querySelector("#weather-day-humidity");
var weatherDayUvIndexEl = document.querySelector ("#weather-day-uv-index");
var foreacastContainerEl = document.querySelector("#forecast-container");
var weatherDayIconEl = document.querySelector("#weather-day-icon");
var buttonContainerEl = document.querySelector("button-container")

var baseUrl = "https://api.openweathermap.org/";
var apiKey = "68c335c7245e8ec4a518653c27fb8724";

function populate5day(data){
    data.forEach(function(day, index){
        if (index === 0 || index > 5) {
            return;
        }
        var temp = day.temp.day;
        var windSpeed = day.wind_speed;
        var humidity = day.humidity;
        var icon = day.weather[0].icon;
        var div = document.createElement("div");
        div.classList = "card-weather col-md-2 col-sm-12 bg-dark text-light me-3";
        div.innerHTML = 
    `  <h4>3/31/2021</h4>
        <img src="https://openweathermap.org/img/wn/$(icon).png" />
        <dl>
          <dt>Temp: </dt>
          <dd>$(temp)</dd>
          <dt>Wind: </dt>
          <dd>$(windSpeed)</dd>
          <dt>Humidity: </dt>
          <dd>$(humidity)</dd>
        </dl> 
        `;
        foreacastContainerEl.appendChild(div);
    })
}

function getCityDayWeather(city){
 var url = "$(baseurl)geo/1.0/direct?q=$(city)&limit=1&appid=$(apiKey)";

 fetch(url)
 .then(function (response){
     return response.JSON();
 })
 .then(function (data) {
 var cityObject = data[0];
 var lat = cityObject.lat;
 var lon = cityObject.lon;

 var currentWeatherUrl = "${baseUrl}data/2/5/onecall?lat=$(lat)&lon=(lon)&appid=$(apiKey)";

 fetch(currentWeatherUrl)
    .then(function(response){
        return response.JSON();
    })
    .then(function (data){
        console.log(data);
        var current = data.current;
        var temp = current.temp;
        var windSpeed = current.wind_speed;
        var humidity = current.humidity;
        var uviIndex = current.uvi;
        var icon = current.weather[0].icon;

        weatherDayCityEl.textContent = city;
        weatherDayTempEl.textContent = temp;
        weatherDayWindEl.textContent = windSpeed;
        weatherDayHumidityEl.textContent = humidity;
        weatherDayUvIndexEl.textContent = uviIndex;
        weatherDayIconEl.src = 'https://openweathermap.org/img/wn/${icon}'

        populate(data.daily)

   })
 });
}
function populateButtons(city){
    var button = document.createElement('button')
    button.classList = "btn btn-secondary col-12"
    button.textContent = city
    button.setAttribute("data-city", city)
    buttonContainerEl.appendChild
}
function handleFormSubmit (evt){
    searchFormEl.addEventListener("submit", function(evt){
        evt.preventDefault();
        window.alert("foo");
    })
}
function addEventListeners() {
    searchFormEl.addEventListener("submit", function(evt){
      
    })
}

// init();

// function getWeatherApi(searchParam, format) {
//   var baseUrl = `https://api.openweathermap.org/data/2.5/onecalll?lat={lat}&lon={lon}&appid={68c335c7245e8ec4a518653c27fb8724}`;
// }
