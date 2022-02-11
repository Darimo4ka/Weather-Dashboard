// var for DOM elemetns
var fetchButton = document.getElementById('fetch-button');
var cityName = document.getElementById('city_name');
var city
var forecastBox =document.getElementById('forecast');
var uvIndex
var searchedCities = [];


var getSearch=function(){

    var pastSearch=document.getElementById('past-search')

    var savedItem =JSON.parse(localStorage.getItem('searchedCities'))

    pastSearch.textContent=savedItem

}
// call getSearch function when you reload page:

getSearch()

//  create local storage function  city:

var saveSearch = function(cityName){
    searchedCities.push(cityName)
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
};

// var for API
var APIkey = '8c3643be24c2f41670517adb84ea4032';

// write function to get forecast for city
function getCoordinates(event){
    event.preventDefault();
    console.log("getting Coordinates");
    // create var  for city input
    city = cityName.value.trim() 
    // console.log(city);

    // call function to save to local storage:
    saveSearch(city)

// call getSearch function when you enter search city:
    getSearch()
    
    var requestUrl =`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIkey}`
    fetch(requestUrl)
        .then(function (response) {
        return response.json();
        })
        .then(function (data){
            // console.log(data[0]);
            getForecast(data);
        })
}

// create function to make API call with coordinates
function getForecast(info){
    // console.log(info[0]);
    // create var for lat and log
    var lat = info[0].lat;
    // console.log(lat)
    var lon = info[0].lon;
    // console.log(lon)  
    var reqtUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`
    fetch(reqtUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            renderForecast(data)
        })
}
// write a function to render the forecast in browser
function renderForecast(obj){
    console.log(obj, city)
    var dateObj = new Date(obj.current.dt * 1000) 
    var date = dateObj.toLocaleString()   
    // console.log(date)  should reformate the date and other vars to create cleaner look on my page
    var icon = obj.current.weather[0].icon
    // console.log(icon)
    var temperature = (obj.current.temp)
    // console.log(temperature)
    var humidity = obj.current.humidity
    // console.log(humidity)
    var theWindSpeed =obj.current.wind_speed
    // console.log(theWindSpeed)
     var uvIndex =obj.current.uvi
    // console.log(uvIndex)

    // create template for our data
    var template = `
        <h2> ${city} - ${date}   <span> <img src="http://openweathermap.org/img/wn/${icon}@2x.png" ></span></h2>
         <p>Temp: ${temperature} &#176C </p>
         <p>Wind: ${theWindSpeed} m/s </p>
         <p>Humidity: ${humidity} % </p>
        <span>UV: ${uv} </span>
       `
    var uvEl = document.createElement("span");
    uvEl.setAttribute("class", "uv")
    if (uv < 3){
        uvEl.style["background-color"] = "green"
    }
    else if (uv >= 3 && uv < 6){
        uvEl.style["background-color"] = "yellow"
    }
    else {
        uvEl.style["background-color"] = "red"
    }
    
    // inject the tamplete into the DOM
    forecastBox.innerHTML = template

    // call uv function when you pulling data for the city
    // uvIndex()
}







//  // function to determine  UV Index safe or not safe
//      uvIndex = function(uv){


// //     get from  https://www.epa.gov/sunsafety/uv-index-scale-0   
// //  1-2 Low         (1 - 2.99999)   blue
// //  3-5 Moderate    (3 - 5.99999)   Yellow 
// //  6+  High        (6 - 7.99999)   Red


//     var index = parseFloat(uv);
//     var bgColor;        

//     if(index < 3){
//             bgColor = "blue";            
//     }
//     else if(index < 6){
//             bgColor = "yellow";        
//         }
//      else {
//             bgColor = "red";    
//             }
//     return bgColor;
   
// };

    // add eventListener to fetchBtn
    fetchButton.addEventListener('click', getCoordinates);
