var weatherFormEl = document.querySelector('#weather-form')
var searchBtn = document.querySelector('#searchBtn')
var cityInputEl = document.querySelector('#city')
var cityPicked = document.querySelector('#city-picked')
var weatherContainer = document.querySelector('#weather-container')


 function searchHandler (event) {
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


function getCityWeather (city) {

    var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=4fde54c156119a215dce015fbaeecce2&units=imperial'

    fetch(apiURL)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                return response.json()
            }}) .then(function (data) {
                console.log(data);
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                var getUv = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely,hourly&appid=4fde54c156119a215dce015fbaeecce2'
                
                
                fetch(getUv).then(function(response){
                console.log(response)
                response.json().then(function(data){
                console.log(data);
                // setUv = data.value
                displayCurrentWeather(data);
                    });
            })

        })
};
      

searchBtn.addEventListener('click', searchHandler);


function displayCurrentWeather(data) {

    var currentWeatherContainer = document.querySelector("#one-container")
    var name = cityInputEl.value;
    var date = new Date().toLocaleDateString();
    var temp = (data.daily[0].temp.day);
    console.log(temp);
    var humidity = data.daily[0].humidity;
    var windSpeed = data.daily[0].wind_speed;
    var icon = data.daily[0].weather[0].icon
    console.log(icon)
    var UV = data.daily[0].uvi;

    document.querySelector('.card-title').innerText =  name + date;
    // document.getElementById('#weather-icon').src = 'http://openweathermap.org/img/w/' + icon + '.png';
    document.querySelector('.card-text-T').innerText = 'Temp: ' + temp + ' \u00B0F'; 
    document.querySelector('.card-text-W').innerText = 'Wind: ' + windSpeed + ' MPH';
    document.querySelector('.card-text-H').innerText = 'Humidity: ' + humidity + '%';
    document.querySelector('.card-text-U').innerText = 'UV Index: ' + UV;

};

