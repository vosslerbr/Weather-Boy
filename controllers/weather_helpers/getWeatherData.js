const axios = require('axios');
const convertWindBearing = require('./convertWindBearing');

// Get weather data from openWeatherMap
const getWeatherData = async (lat, lon) => {
  try {
    // API Key
    const apiKey = process.env.API_KEY;

    // axios config
    const config = {
      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/onecall?',
      params: {
        lat: lat,
        lon: lon,
        exclude: 'minutely',
        units: 'imperial',
        appid: apiKey,
      },
    };

    const response = await axios(config);
    console.log(response);

    return response;
  } catch (err) {
    console.error('Error fetching weather data');
    console.error(err);
    return `There was a problem fetching weather data. Please try again.`;
  }
};

module.exports = getWeatherData;
