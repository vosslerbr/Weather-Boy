// fetch location data
// return the location name, state or country, lat, & long
// return error if needed
const axios = require('axios');

const fetchLocationData = async (cityName) => {
  try {
    // API Key
    const apiKey = process.env.API_KEY;

    // axios config
    const config = {
      method: 'get',
      url: 'http://api.openweathermap.org/geo/1.0/direct?',
      params: {
        q: cityName,
        limit: 5,
        appid: apiKey,
      },
    };

    const response = await axios(config);
    const locationData = response.data;

    // if no location data, throw error
    if (!locationData.length) {
      throw Error(`Not a valid location`);
    }

    if (!locationData[0].state) {
      // if no state, must be an international city
      // return city and country
      const dataObj = {
        name: locationData[0].name,
        country: locationData[0].country,
        lat: locationData[0].lat,
        lon: locationData[0].lon,
      };
      return dataObj;
    } else {
      // otherwise return city and state
      const dataObj = {
        name: locationData[0].name,
        state: locationData[0].state,
        lat: locationData[0].lat,
        lon: locationData[0].lon,
      };
      return dataObj;
    }
  } catch (err) {
    console.error('Error fetching location data');
    console.error(err);
    return `That's not a valid location! Please try again 🤠`;
  }
};

module.exports = fetchLocationData;
