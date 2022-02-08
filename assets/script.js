// var for DOM elemetns
var fetchButton = document.getElementById('fetch-button');
var cityName = document.getElementById('city_name');
var city 
var forecastBox =document.getElementById('forecast');


// var for API
var APIkey = '8c3643be24c2f41670517adb84ea4032';

// write function to get forecast for city
function getCoordinates(event){
    event.preventDefault();
    console.log("getting Coordinates");
    // create var  for city input
    city = cityName.value.trim() 
    // console.log(city);
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
//    UV index
// write a function to render the forecast in browser
function renderForecast(obj){
    console.log(obj, city)
    var date = new Date(obj.current.dt * 1000)
    // console.log(date)
    var icon = obj.current.weather[0].icon
    // console.log(icon)
    var temperature = (obj.current.temp)-273.15
    // console.log(temperature)
    var humidity = obj.current.humidity
    // console.log(humidity)
    var theWindSpeed =obj.current.wind_speed
    // console.log(theWindSpeed)
    var uvIndex =obj.current.uvi
    // console.log(uvIndex)

    // create template for our data
    var template = `
        <span>forecast for ${city}, ${date}</span>
    `
    // inject the tamplete into the dom
    forecastBox.innerHTML = template
}

// add eventListener to fetchBtn
fetchButton.addEventListener('click', getCoordinates);















// var repoList = document.querySelector('ul');
// var fetchButton = document.getElementById('fetch-button');

// function getApi() {
//   // replace `octocat` with anyone else's GitHub username
//   var requestUrl = 'https://api.github.com/users/octocat/repos';

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         var listItem = document.createElement('li');
//         listItem.textContent = data[i].html_url;
//         repoList.appendChild(listItem);
//       }
//     });
// }

// fetchButton.addEventListener('click', getApi);