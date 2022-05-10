var weatherFormEl = document.querySelector('#weather-form')
var searchBtn = document.querySelector('#searchBtn')
var cityInputEl = document.querySelector('#city')
var cityPicked = document.querySelector('#city-picked')
var weatherContainer = document.querySelector('#weather-container')
var fiveDayWeatherEl = document.querySelector('#five-day-weather')

var searchHandler = function (event) {
    event.preventDefault();

    var cityEntered = cityInputEl.value.trim();
    console.log(cityEntered);

    if (cityEntered) {
        getCityWeather(cityEntered);

        // weatherContainer.textContent = '';
        // cityInputEl.value = '';
    }

    var cityListItemEl = document.createElement('button')
    cityListItemEl.textContent = cityEntered;

    cityPicked.appendChild = cityListItemEl;

};

var getCityWeather = function (city) {

    var apiURL = 'http://api.openweathermap.org/data/2.5/onecall?' + city + '&appid=4fde54c156119a215dce015fbaeecce2&units=metric'

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
            });
        }
    
})
};



// var display

searchBtn.addEventListener('click', searchHandler);