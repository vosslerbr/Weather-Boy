const getWeatherData = require('../weather_helpers/getWeatherData');
const fetchLocationData = require('../location_helpers/fetchLocationData');
const convertWindBearing = require('../weather_helpers/convertWindBearing');

const now = async (cityInput) => {
  try {
    // object: {name, state, lat, lon} OR {name, country, lat, lon}
    const locationData = await fetchLocationData(cityInput);

    const location = {
      name: locationData.name,
    };

    if (locationData.country) {
      location.country = locationData.country;
    } else {
      location.state = locationData.state;
    }

    // if location data returns a string, it must be the error string
    if (typeof locationData === 'string') {
      return locationData;
    } else {
      const weatherData = await getWeatherData(locationData.lat, locationData.lon);

      const wind = await convertWindBearing(weatherData.data.current.wind_deg);

      const weatherObject = {
        temp: Math.round(weatherData.data.current.temp),
        feels_like: Math.round(weatherData.data.current.feels_like),
        humidity: Math.round(weatherData.data.current.humidity),
        wind: `${wind} ${Math.round(weatherData.data.current.wind_speed)} mph`,
      };

      return { weather: weatherObject, location };
    }
  } catch (err) {
    console.error('Error running $now');
    console.error(err);
  }
};

module.exports = now;
