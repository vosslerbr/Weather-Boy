const fetch = require('node-fetch');

// Use the MapBox API to fetch the user's latitude and longitude from city name input
function fetchMapAPI(cityName) {
  // API Key and URL
  const apiKey = process.env.MAPBOX_KEY;
  const apiUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

  //Fetch API
  return fetch(`${apiUrl}${cityName}.json?types=place&access_token=${apiKey}&types=place&limit=1`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data)
      // Set latitude and longitude of user based on return object for city
      const cityLat = data.features["0"].center[1];
      const cityLong = data.features["0"].center[0];
      const placeName = data.features["0"].place_name;
      return ({
        cityLat,
        cityLong,
        placeName
      })
      
    })
    .catch(err => {
      console.err(err)
    })
}

module.exports = fetchMapAPI;
