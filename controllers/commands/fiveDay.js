const dedent = require("dedent-js");
const getWeatherData = require('./getWeatherData.js')
const convertWindBearing = require('./convertWindBearing.js')

function fiveDay(cityInput) {
	return getWeatherData(cityInput).then((allData) => {
      const allDailyData = allData.data.daily.data;
      const fiveDayData = [];

      for (let i = 1; i < 6; i++) {
        fiveDayData.push(allDailyData[i]);
      }

      console.log(fiveDayData);

      const message = fiveDayData.map((item) => {
        console.log(new Date(item.time * 1000).toUTCString());

        const date = new Date(item.time * 1000)
          .toUTCString()
          .replace(" 05:00:00 GMT", "");
        const summary = item.summary;
        const high = Math.round(item.temperatureHigh);
        const low = Math.round(item.temperatureLow);
				const windSpeed = Math.round(item.windSpeed);
				const windBearing = convertWindBearing(item.windBearing);

        return dedent(`> **${date}**
			> **High:** ${high}\xB0
			> **Low:** ${low}\xB0
			> **Wind:** ${windBearing}, ${windSpeed} mph
			> ${summary}
			> ---------------------------------------
			`);
      });
      return message;
    });

}

		module.exports = fiveDay;