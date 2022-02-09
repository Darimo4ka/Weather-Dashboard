// var for DOM elemetns
var fetchButton = document.getElementById('fetch-button');
var cityName = document.getElementById('city_name');
var city 
var forecastBox =document.getElementById('forecast');
var uvIndex

//    creat a function to get saved information from local storage and display on your page

var getSearch=function(){

    var pastSearch=document.getElementById('past-search')

    var savedItem =JSON.parse(localStorage.getItem('cityName'))

    pastSearch.textContent=savedItem

}
// call getSearch function when you reload page:

getSearch()

//  create local storage function  city:

var saveSearch = function(cityName){
    localStorage.setItem("cityName", JSON.stringify(cityName));
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
    var reqtUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`
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
    var date = new Date(obj.current.dt * 1000)    
    // console.log(date)  should reformate the date and other vars to create cleaner look on my page
    var icon = obj.current.weather[0].icon
    // console.log(icon)
    var temperature = (obj.current.temp)-273.15
    // console.log(temperature)
    var humidity = obj.current.humidity
    // console.log(humidity)
    var theWindSpeed =obj.current.wind_speed
    // console.log(theWindSpeed)
    uvIndex =obj.current.uvi
    // console.log(uvIndex)

    // create template for our data
    var template = `
        <span>${city}, ${date}, ${icon}, ${temperature}, ${theWindSpeed}, ${humidity}, ${uvIndex}</span>
    `
    // inject the tamplete into the DOM
    forecastBox.innerHTML = template
}







// // // function to determine  UV Index safe or not safe
//      uvIndex = function(uv){


    //get from  https://www.epa.gov/sunsafety/uv-index-scale-0   
//  1-2 Low         (1 - 2.99999)   Green
//  3-5 Moderate    (3 - 5.99999)   Yellow 
//  6+  High        (6 - 7.99999)   Red


//     var index = parseFloat(uv);
//      var bgColor;        

//     if(index < 3){
//         bgColor = "green";            
//     }
//     else if(index < 6){
//             bgColor = "yellow";        
//         }
//      else {
//             bgColor = "black";    
//             }
//     return bgColor;
   
// };

    // add eventListener to fetchBtn
    fetchButton.addEventListener('click', getCoordinates);
