var weatherFormEl = document.querySelector('#weather-form')
var searchBtn = document.querySelector('#searchBtn')
var cityInputEl = document.querySelector('#city')
var cityPicked = document.querySelector('#city-picked')
var weatherContainer = document.querySelector('#weather-container')
var UVElement = document.getElementById("UVIndex")
let city 
let searchHistory = [];


// function getStorage () {
//     var storedHistory = localStorage.getItem('search');
//     if (storedHistory) {
//         searchHistory = JSON.parse(storedHistory);
//     }
// }

function searchHandler (event) {
    event.preventDefault();

    city = cityInputEl.value.trim();
    console.log(city);

    if (city) {
        getCityWeather(city);
        searchHistory.push(city)

        cityInputEl.value = '';

        renderSearch();
    }

    localStorage.setItem('search', JSON.stringify(searchHistory));


};

function renderSearch () {

        var cityListItemEl = document.createElement('button')
        cityListItemEl.classList.add('btn', 'btn-info', 'mt-3')
        cityListItemEl.setAttribute('style', "display: block")

    
        cityListItemEl.setAttribute('data-city', city);
        cityListItemEl.textContent = city;
        cityPicked.append(cityListItemEl);
        
        cityListItemEl.addEventListener('click', getCityWeather(cityListItemEl.value))


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
        // getStorage();
};
      

searchBtn.addEventListener('click', searchHandler);


function displayCurrentWeather(data) {

    var name = city;
    console.log(name);
    var date = new Date().toLocaleDateString();
    var temp = (data.current.temp);
    var humidity = data.current.humidity;
    var windSpeed = data.current.wind_speed;
    var icon = data.current.weather[0].icon
    var iconDescription = data.current.weather[0].description
    var UV = data.current.uvi;
    var wicon = document.getElementById('current-icon')

    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"
    wicon.setAttribute('src', iconUrl);
    wicon.setAttribute('alt', iconDescription);
    document.getElementById('current-icon'). innerText = iconUrl


    document.querySelector('.card-title').innerHTML =  name + ' ' + date;
    document.querySelector('.card-text-T').innerText = 'Temp: ' + temp + '\u00B0F'; 
    document.querySelector('.card-text-W').innerText = 'Wind: ' + windSpeed + ' MPH';
    document.querySelector('.card-text-H').innerText = 'Humidity: ' + humidity + '%';
    document.querySelector('.card-text-U').textContent = 'UV Index: ' + UV;



    // if (UV <= 2 ) {
    //     UVElement.setAttribute("class", "bg-success text-white");

    //  }else if (UV > 3 && UV < 5) {        
    //         UVElement.setAttribute("class", "bg-warning text-white")  
    // } else {
    //         UVElement.setAttribute("class", "bg-danger text-white")
    // };


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




