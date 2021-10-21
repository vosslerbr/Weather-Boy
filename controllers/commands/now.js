const dedent = require('dedent-js');
const getWeatherData = require('../weather_helpers/getWeatherData');
const convertWindBearing = require('../weather_helpers/convertWindBearing');
const fetchLocationData = require('../location_helpers/fetchLocationData');

const now = async (cityInput) => {
  try {
    // object: {name, state, lat, lon}
    const locationData = await fetchLocationData(cityInput);
    const weatherData = await getWeatherData(locationData.lat, locationData.lon);

    return weatherData;
  } catch (err) {
    console.error('Error running $now');
    console.error(err);
  }
};

module.exports = now;
