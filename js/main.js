//Importing the cities variable from cities.js file
import { cities } from 'js/cities.js';
let dt = new Date();
let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
};
let today = dt.toLocaleDateString("en-US", options);
let hours = dt.getHours();
//Function to change background image as per day cycle
function bgChange(){
    let bgchange = document.getElementById("bg-change");
    let bgDawn = "bg-dawn";
    let bgDay = "bg-day";
    let bgDusk = "bg-dusk"
    let bgNight = "bg-night";
    if(hours >= 17 && hours < 18){
        bgchange.classList.remove(bgDay);
        bgchange.classList.add(bgDusk);
    }else if(hours >= 18 || hours < 5){
        bgchange.classList.remove(bgDusk);
        bgchange.classList.add(bgNight);
    }else if(hours >= 5 && hours < 6){
        bgchange.classList.remove(bgNight);
        bgchange.classList.add(bgDawn);
    }else{
        bgchange.classList.remove(bgDawn);
        bgchange.classList.add(bgDay);
    }
}
bgChange();
const selectCity = document.getElementById("select-city");
//Function to retrieve city names and display them as options
function getCities(){
    let ct = 0;
    let citiesKey = [];
    for (let key in cities){
        let citiesData = cities[key]; // citiesData stores each country name along with their cities
        citiesKey[ct] = citiesData; //citiesKey is an array to store only the cities
        for (let i = 0; i < 2; i++){ //Nested Loops through the first two cities of each country.
            let option = document.createElement('option');
            option.value = citiesData[i].name;
            option.text = citiesData[i].name + ", " + key;
            selectCity.appendChild(option);
        }
        ct++;
    }
    return citiesKey;
}

const fetchStat = document.getElementById("fetchStat");
//Function that fetches weather forecast data from the 7timer API based on lat long coordinates and updates the forecast display
let contain = document.getElementById("contain");
let cityName = document.getElementById("cityName");
let date = document.querySelectorAll(".w-date");
let wstat = document.querySelectorAll(".w-stat");
let tempH = document.querySelectorAll(".wtemp-h");
let tempL = document.querySelectorAll(".wtemp-l");
let img = document.querySelectorAll(".wimg");
let longitude = 88.3639;
let latitude = 22.5726;

function getWeatherData(longitude,latitude){
    fetch(`https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`)
    .then(response => response.json())
    .then(data =>{
        fetchStat.style.display = "none";
        contain.style.display = "block";
        //Looping through data.dataseries array of objects from api
        for (let i = 0; i < data.dataseries.length; i++){
            let ds = data.dataseries[i];
            wstat[i].textContent = ds.weather;
            tempH[i].textContent = ds.temp2m.max + "°C";
            tempL[i].textContent = ds.temp2m.min + "°C";
            //Storing the returned value from the readableDate function in the dateValue variable.
            let dateValue = readableDate(ds.date); //dateValue is a string. api send date as 20231115
            let dateObject = new Date(dateValue); // output example : Tue May 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
            let d = dateObject.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
            date[i].textContent = d;
            // (ds.weather === "clear" && hours >= 18 || hours < 5)
            if (ds.weather === "clear"){
                img[i].src = "images/clear.svg";
            }
            if (ds.weather === "cloudy"){
                img[i].src = "images/cloud.svg";
            }
            if (ds.weather === "fog"){
                img[i].src = "images/fog.svg";
            }
            if (ds.weather === "ishower") {
                img[i].src = "images/ishower.svg";
            }
            if (ds.weather === "oshower") {
                img[i].src = "images/ishower.svg";
            }
            if (ds.weather === "lightrain") {
                img[i].src = "images/lightrain.svg";
            }
            if (ds.weather === "lightsnow") {
                img[i].src = "images/lightsnow.svg";
            }
            if (ds.weather === "snow") {
                img[i].src = "images/snow.svg";
            }
            if (ds.weather === "mcloudy"){
                img[i].src = "images/cloudy.svg";
            }
            if (ds.weather === "pcloudy") {
                img[i].src = "images/cloudy.svg";
            }
            if (ds.weather === "rain") {
                img[i].src = "images/rain.svg";
            }
            if (ds.weather === "rainsnow") {
                img[i].src = "images/rainsnow.svg";
            }
            if (ds.weather === "ts") {
                img[i].src = "images/tsrain.svg";
            }
            if (ds.weather === "tstorm") {
                img[i].src = "images/tstorm.svg";
            }
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

getWeatherData(longitude,latitude);
const citiesData = getCities();

// Function to fetch weather data and dynamically update background
let wDate = document.getElementById("wDate");
let tempMx = document.getElementById("wtempH");
let tempMn = document.getElementById("wtempL");
let wImg = document.getElementById("wImg");
let wStat = document.getElementById("wStat");
async function fetchWeather(longitude, latitude){
    try{
      const response = await fetch(`https://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=civillight&output=json`);
      const weatherData = await response.json();
      fetchStat.style.display = "none";
      contain.style.display = "block";
      // Extract required information
      const tempMax = weatherData.dataseries[0].temp2m.max; // Temperature at 2 meters
      const tempMin = weatherData.dataseries[0].temp2m.min;
      const weatherStatus = weatherData.dataseries[0].weather;

      if(weatherStatus === 'clear'){
        wDate.textContent = today;
        wStat.textContent = "clear";
        wImg.src = "images/clear.svg";
        bgWeather.src = "images/clear.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'cloudy'){
        wDate.textContent = today;
        wStat.textContent = "cloudy";
        wImg.src = "images/cloudy.svg";
        bgWeather.src = "images/cloudy.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'fog'){
        wDate.textContent = today;
        wStat.textContent = "fog";
        wImg.src = "images/fog.svg";
        bgWeather.src = "images/fog.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'ishower'){
        wDate.textContent = today;
        wStat.textContent = "ishower";
        wImg.src = "images/ishower.svg";
        bgWeather.src = "images/ishower.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'oshower'){
        wDate.textContent = today;
        wStat.textContent = "ishower";
        wImg.src = "images/ishower.svg";
        bgWeather.src = "images/ishower.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'lightrain'){
        wDate.textContent = today;
        wStat.textContent = "lightrain";
        wImg.src = "images/lightrain.svg";
        bgWeather.src = "images/lightrain.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'lightsnow'){
        wDate.textContent = today;
        wStat.textContent = "lightsnow";
        wImg.src = "images/lightsnow.svg";
        bgWeather.src = "images/lightsnow.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'snow'){
        wDate.textContent = today;
        wStat.textContent = "snow";
        wImg.src = "images/snow.svg";
        bgWeather.src = "images/snow.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'mcloudy'){
        wDate.textContent = today;
        wStat.textContent = "mcloudy";
        wImg.src = "images/cloudy.svg";
        bgWeather.src = "images/cloudy.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'rain'){
        wDate.textContent = today;
        wStat.textContent = "rain";
        wImg.src = "images/rain.svg";
        bgWeather.src = "images/rain.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'rainsnow'){
        wDate.textContent = today;
        wStat.textContent = "rainsnow";
        wImg.src = "images/rainsnow.svg";
        bgWeather.src = "images/rainsnow.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'ts'){
        wDate.textContent = today;
        wStat.textContent = "tsrain";
        wImg.src = "images/tsrain.svg";
        bgWeather.src = "images/tsrain.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }else if (weatherStatus === 'ts'){
        wDate.textContent = today;
        wStat.textContent = "tstorm";
        wImg.src = "images/tstorm.svg";
        bgWeather.src = "images/tstorm.jpg";
        tempMx.textContent = tempMax + "°C";
        tempMn.textContent = tempMin + "°C";
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

fetchWeather(longitude,latitude);
//Function for getting the weather forecast information from selected option
selectCity.addEventListener('change',function(){
    fetchStat.style.display = "block";
     //Storing the clicked option in a varible
     let cityValue = selectCity.value;
     cityName.textContent = cityValue;
     //Looping through the array citiesData to compare the value clicked (option) with the one stored in citiesData
     for (let i=0; i < citiesData.length; i++){
        let cityGroup = citiesData[i];
        for (let j=0; j < cityGroup.length; j++){
        //If the condition is true, we call the citiesLonlat function to use the 7timer API and retrieve the weather forecast for the longitude and latitude of the selected city
            if(cityValue===cityGroup[j].name){
                getWeatherData(cityGroup[j].lon, cityGroup[j].lat);
                fetchWeather(cityGroup[j].lon, cityGroup[j].lat);
                break;
            }
        }
     }
})

//This function converts a date number (e.g., 20231115) into a string format separated by hyphens (e.g., 2023-11-15)
function readableDate(dateNumber){
    let d = dateNumber.toString();
    let year = d.substring(0, 4);
    let month = d.substring(4, 6);
    let day = d.substring(6, 8);
    let date = year + "-" + month + "-" + day;
    return date;
}