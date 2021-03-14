const fetch = require("node-fetch");
const fetchMapAPI = require('./fetchMapAPI.js')

// Get weather data from OpenWeatherMap
function getWeatherData(cityName) {
  return fetchMapAPI(cityName).then((res) => {
		city = res.placeName;
    return fetch(
      `https://api.darksky.net/forecast/${process.env.API_KEY}/${res.cityLat},${res.cityLong}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return {data, city};
      });
  });
}

module.exports = getWeatherData;