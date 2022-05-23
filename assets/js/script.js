var weatherFormEl = document.querySelector('#weather-form')
var searchBtn = document.querySelector('#searchBtn')
var cityInputEl = document.querySelector('#city')
var cityPicked = document.querySelector('#city-picked')
var weatherContainer = document.querySelector('#weather-container')
let city 


function searchHandler (event) {
    event.preventDefault();

    city = cityInputEl.value.trim();
    console.log(city);

    if (city) {
        getCityWeather(city);

        cityInputEl.value = '';

        var cityListItemEl = document.createElement('button')
        cityListItemEl.textContent = city;
        cityListItemEl.classList.add('btn', 'btn-info', 'mt-3')
        cityListItemEl.setAttribute('style', "display: block")
        cityPicked.appendChild(cityListItemEl);

    }

    // localStorage.getItem(data);

};

function getCityWeather () {

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
                displayCurrentWeather(data);
                fiveDayForecast(data);
                    });
            })

        })
};
      

searchBtn.addEventListener('click', searchHandler);


function displayCurrentWeather(data) {

    var name = city;
    console.log(name);
    var date = new Date().toLocaleDateString();
    var temp = (data.current.temp);
    console.log(temp);
    var humidity = data.current.humidity;
    var windSpeed = data.current.wind_speed;
    var icon = data.current.weather[0].icon
    console.log(icon)
    var iconDescription = data.current.weather[0].description
    var UV = data.current.uvi;

    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"


    document.querySelector('.card-title').innerText =  name + ' ' + date;
    var currentIcon = document.createElement('img');
    currentIcon.setAttribute('src', iconUrl);
    currentIcon.setAttribute('alt', iconDescription);
    document.getElementById('weather-icon').appendChild(currentIcon);
    document.querySelector('.card-text-T').innerText = 'Temp: ' + temp + '\u00B0F'; 
    document.querySelector('.card-text-W').innerText = 'Wind: ' + windSpeed + ' MPH';
    document.querySelector('.card-text-H').innerText = 'Humidity: ' + humidity + '%';
    document.querySelector('.card-text-U').innerText = 'UV Index: ' + UV;



    if (UV <= 2 ) {
        var UVElement = document.getElementById("UVIndex")
        console.log(UVElement);
        UVElement.setAttribute("class", "bg-success text-white");

     }else if (UV > 3 && UV < 5) {        
            UVElement.setAttribute("class", "bg-warning text-white")  
    } else {
        UVElement.setAttribute("class", "bg-danger text-white")
    };


    // localStorage.setItem(data);

};

function fiveDayForecast (data) {
    let test = data;
    console.log(test);

    let boxes = document.querySelectorAll(".weather")

    for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML="";

        var fiveDayInfo ={
            fiveTemp: data.daily[i].temp.day,
            fiveHumidity: data.daily[i].humidity,
            fiveWind: data.daily[i].wind_speed,
            fiveDate: new Date(data.daily[i].dt * 1000),
            fiveIcon: data.daily[i].weather[0].icon,
            fiveDescription: data.daily[i].weather.description,
        }

        var iconFiveUrl = "https://openweathermap.org/img/w/" + fiveDayInfo.fiveIcon + ".png";
        var iconFiveDescription = fiveDayInfo.fiveDescription


        var fiveDayDate = document.createElement("p");
        fiveDayDate.setAttribute("class", "text-white");
        fiveDayDate.innerHTML = fiveDayInfo.fiveDate.toDateString();
        boxes[i].appendChild(fiveDayDate);

        var fiveDayIcon = document.createElement("img");
        fiveDayIcon.setAttribute('src', iconFiveUrl);
        fiveDayIcon.setAttribute('alt', iconFiveDescription);
        boxes[i].appendChild(fiveDayIcon);


        var fiveDayTemp = document.createElement("p");
        fiveDayTemp.setAttribute("class", "text-white");
        fiveDayTemp.innerHTML = "Temperature: " + fiveDayInfo.fiveTemp + ' \u00B0F';
        boxes[i].appendChild(fiveDayTemp);


        var fiveDayHumidity = document.createElement('p')
        fiveDayHumidity.setAttribute("class", "text-white");
        fiveDayHumidity.innerHTML = "Humidity: " + fiveDayInfo.fiveHumidity + "%";
        boxes[i].appendChild(fiveDayHumidity);


        var fiveDayWind = document.createElement('p')
        fiveDayWind.setAttribute("class", "text-white");
        fiveDayWind.innerHTML = "Wind: " + fiveDayInfo.fiveWind + " MPH";
        boxes[i].appendChild(fiveDayWind);

    


        
    };
    
};




