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
// var cityurl = https://api.openweathermap.org/data/2.5/forecast?q='
var oneCall = 'https://api.openweathermap.org/data/2.5/onecall?'


var getCityWeather = function (city) {

    var cityCord = latLon + city + '&limit=5&appid=4fde54c156119a215dce015fbaeecce2&units=metric'
    var cityURL = oneCall + city + '&limit=5&appid=4fde54c156119a215dce015fbaeecce2&units=metric'


    fetch(cityCord)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json()
            

                    .then(function (data) {
                        console.log(data);
                    });
            }
        })
};



searchBtn.addEventListener('click', searchHandler);


function displayCurrentWeather(data) {
    console.log(data);
    var oneDay = document.getElementById("one-container");

    var currentWeather = data.list[0].weather[0].id
    var currentTemp = data.list.main

}