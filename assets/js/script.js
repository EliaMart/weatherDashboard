var weatherFormEl = document.querySelector('#weather-form')
var searchBtn = document.querySelector('#searchBtn')
var cityInputEl = document.querySelector('#city')
var cityPicked = document.querySelector('#city-picked')
var weatherContainer = document.querySelector('#weather-container')


var searchHandler = function (event) {
    event.preventDefault();

    var cityEntered = cityInputEl.value.trim();
    console.log(cityEntered);

    if (cityEntered) {
        getCityWeather(cityEntered);

        cityInputEl.value = '';


        var cityListItemEl = document.createElement('button')
        cityListItemEl.textContent = cityEntered;
        cityListItemEl.classList.add('btn', 'btn-info')
        cityPicked.appendChild(cityListItemEl);

    }

};

var latLon = 'https://api.openweathermap.org/geo/1.0/direct?q='
var oneCall = 'https://api.openweathermap.org/data/2.5/onecall?'
 var weather = 'https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=imperial&appid=${apiKey}'


var getCityWeather = function (city) {

    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=4fde54c156119a215dce015fbaeecce2&units=imperial&limit=5'

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()
            }}) .then(function (data) {
                console.log(data);
                
                // var dailyWeatherContainer = document.querySelector("#one-container")
                // var date = new Date().toLocaleDateString();
                // var main = data.main;
                // var temp = Math.floor(main.temp);
                // var humidity = main.humidity;
                // var windSpeed = data.wind.speed;
                // var icon = data.weather[0].icon
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var getUv = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=4fde54c156119a215dce015fbaeecce2'
                fetch(getUv).then(function(response){
                console.log(response)
                response.json().then(function(data){
                setUv = data.value
                    });
            })
        })
};
      





searchBtn.addEventListener('click', searchHandler);


function displayCurrentWeather(data) {
    console.log(data);
    var oneDay = document.getElementById("one-container");

    var currentWeather = data.list[0].weather[0].id
    var currentTemp = data.list.main

}