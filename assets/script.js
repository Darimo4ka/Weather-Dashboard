// var for DOM elemetns
var fetchButton = document.getElementById('fetch-button');
var cityName = document.getElementById('city_name');


// var for API
var APIkey = '';

// write function to get forecast for city
function getCoordinates(event){
    event.preventDefault();
    console.log("getting Coordinates");
    // create var  for city input
    var city = cityName.value.trim() 
    console.log(city);
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
    console.log(info);
    // create var for lat and log
    var lat = info.lat;
    console.log(lat)
    
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