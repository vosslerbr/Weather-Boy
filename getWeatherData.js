const fetch = require('node-fetch');

// Get weather data from DarkSky
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
        console.log(data.daily);
        return { data, city };
      });
  });
}

module.exports = getWeatherData;
