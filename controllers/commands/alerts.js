const getWeatherData = require('../weather_helpers/getWeatherData');
const fetchLocationData = require('../location_helpers/fetchLocationData');

const alerts = async (cityInput) => {
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

      console.log(weatherData);

      if (weatherData.data.alerts) {
        console.log('HAS ALERTS');
        console.log(weatherData.data.alerts);

        const alerts = weatherData.data.alerts.map((alert) => {
          return {
            sender: alert.sender_name,
            event: alert.event,
            description: alert.description,
          };
        });

        return { alerts, location };
      } else {
        console.log('NO ALERTS');
        return { msg: 'There are no active alerts.', location };
      }
    }
  } catch (err) {
    console.error('Error running $alerts');
    console.error(err);
  }
};

module.exports = alerts;
