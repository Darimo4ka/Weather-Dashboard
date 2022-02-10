# 06 Server-Side APIs: Weather Dashboard

## Description 

Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL.  As an example I developed weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Used [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities.  `localStorage` to store any persistent data.

## User Story

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

## Usage

```
By pressing link you will open weather dashboard with form inputs
WHEN you  search for a city you presented with current and future conditions for that city and that city is added to the search history
WHEN you view current weather conditions for that city
THEN you presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
UV index is presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN you  view future weather conditions for that city you can see  5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN you click on a city in the search history you again presented with current and future conditions for that city
```

- - -
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
