const dedent = require("dedent-js");
const getWeatherData = require('./getWeatherData.js')
const convertWindBearing = require('./convertWindBearing.js')

function now(cityInput) {
	return getWeatherData(cityInput).then((allData) => {
			const fullCity = allData.city;
			const cityArray = fullCity.split(',');
			let trimmedCityArray = [];
			let trimmedCity = fullCity;

			if (cityArray.length > 2) {
				trimmedCityArray = cityArray.pop();
				trimmedCity = cityArray.join(',')	
			}

			

      const temp = Math.round(allData.data.currently.temperature);
      const wind = Math.round(allData.data.currently.windSpeed);
			const windBearing = convertWindBearing(allData.data.currently.windBearing);
      const humidity = `${Math.round(allData.data.currently.humidity * 100)}%`;
      const daySummary = allData.data.hourly.summary;
			
      const message = dedent(`> **${(
        "Currently in " + trimmedCity
      ).toUpperCase()}**
			> **Temp:** ${temp}\xB0
			> **Wind:** ${windBearing}, ${wind} mph
			> **Humidity:** ${humidity}
			> ${daySummary}`);

      return message;
    });

}

		module.exports = now;
