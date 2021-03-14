const Discord = require("discord.js");
const dedent = require("dedent-js");
const getWeatherData = require('./getWeatherData.js')
const convertWindBearing = require('./convertWindBearing.js')
const client = new Discord.Client();

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
    getWeatherData(cityInput).then((data) => {
      const temp = Math.round(data.currently.temperature);
      const wind = Math.round(data.currently.windSpeed);
			const windBearing = convertWindBearing(data.currently.windBearing);
      const humidity = `${Math.round(data.currently.humidity * 100)}%`;
      const daySummary = data.hourly.summary;
      const message = dedent(`> **${(
        "Currently in " + cityInput
      ).toUpperCase()}**
			> **Temp:** ${temp}\xB0
			> **Wind:** ${windBearing}, ${wind} mph
			> **Humidity:** ${humidity}
			> ${daySummary}`);

      msg.channel.send(message);
      console.log(data);
    });
  }

  // Return 5 day forecast
  if (msg.content.startsWith("$5day")) {
    cityInput = msg.content.split("$5day ")[1];
    getWeatherData(cityInput).then((data) => {
      const allDailyData = data.daily.data;
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
			
			`);

      });
			msg.channel.send(message)
    });
  }
});

client.login(process.env.TOKEN);
