const getWeatherData = require('../weather_helpers/getWeatherData');
const fetchLocationData = require('../location_helpers/fetchLocationData');
const dayjs = require('dayjs');

const fiveDay = async (cityInput) => {
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

      const dailyData = weatherData.data.daily;
      //console.log(dailyData);

      const dailyArr = dailyData.map((day) => {
        const sunrise = new Date(day.sunrise * 1000).toString();
        const sunset = new Date(day.sunset * 1000).toString();

        let sunriseFormatted = '';

        if (sunrise[16] == '0') {
          sunriseFormatted = sunrise.substring(17, 21);
        } else {
          sunriseFormatted = sunrise.substring(16, 21);
        }

        const dayObj = {
          dt: new Date(day.dt * 1000).toString().substring(0, 15),
          sunrise: sunriseFormatted,
          sunset: new Date(day.sunset * 1000).toString().substring(16, 21),
          high: Math.round(day.temp.max),
          low: Math.round(day.temp.min),
          description: day.weather[0].description,
        };

        return dayObj;
      });

      console.log(dailyArr, dailyArr.length);

      return { weather: dailyArr, location };
    }
  } catch (err) {
    console.error('Error running $fiveDay');
    console.error(err);
  }
};

module.exports = fiveDay;
