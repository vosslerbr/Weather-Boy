const Discord = require("discord.js");
const dedent = require("dedent-js");
const getWeatherData = require('./getWeatherData.js')
const convertWindBearing = require('./convertWindBearing.js')
const client = new Discord.Client();

const keepAlive = require("./server")

// Once bot is ready and logged in, log to console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// When a user posts a message, do this stuff
client.on("message", (msg) => {
  // If message is from bot itself
  if (msg.author.bot) return;

  // Return current weather conditions
  if (msg.content.startsWith("$now")) {
    cityInput = msg.content.split("$now ")[1];
    getWeatherData(cityInput).then((allData) => {
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

      msg.channel.send(message);
      console.log(cityArray, 'array');
			console.log(trimmedCityArray, 'trimmed')
    });
  }

  // Return 5 day forecast
  if (msg.content.startsWith("$5day")) {
    cityInput = msg.content.split("$5day ")[1];
    getWeatherData(cityInput).then((allData) => {
      const allDailyData = allData.data.daily.data;
			const fiveDayData = [];

			for(let i = 1; i < 6; i++) {
				fiveDayData.push(allDailyData[i]);
			}


			console.log(fiveDayData);

      const message = fiveDayData.map((item) => {
        console.log(new Date(item.time * 1000).toUTCString());


				const date = new Date(item.time * 1000).toUTCString().replace(' 05:00:00 GMT','');
				const summary = item.summary;
				const high = Math.round(item.temperatureHigh);
				const low = Math.round(item.temperatureLow);

				return dedent(`> **${date}**
			> **High:** ${high}\xB0
			> **Low:** ${low}\xB0
			> ${summary}
			> ---------------------------------------
			`);

      });
			msg.channel.send(message)
    });
  }
});

keepAlive()
client.login(process.env.TOKEN);
