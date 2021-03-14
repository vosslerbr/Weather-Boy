const Discord = require('discord.js');
const fetch = require('node-fetch');
const dedent = require("dedent-js");
const fetchMapAPI = require('./mapbox.js')
const client = new Discord.Client();

// Get weather data from OpenWeatherMap
function getWeatherData(cityName) {

	return fetchMapAPI(cityName)
		.then(res => {
			return fetch(
				`https://api.darksky.net/forecast/${process.env.API_KEY}/${res.cityLat},${res.cityLong}`
			)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					return data;
				});
		})
}

// Once bot is ready and logged in, log to console
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

// When a user posts a message, do this stuff
client.on('message', (msg) => {
	// If message is from bot itself
	if (msg.author.bot) return;

	// Return current weather conditions
	if (msg.content.startsWith('$now')) {
		cityInput = msg.content.split('$now ')[1];
		getWeatherData(cityInput).then((data) => {
			const temp = Math.round(data.currently.temperature);
			const wind = Math.round(data.currently.windSpeed);
			const humidity = `${Math.round(data.currently.humidity * 100)}%`;
			const daySummary = data.hourly.summary;
			const message = dedent(`> **${('Currently in ' + cityInput).toUpperCase()}**
			> **Temp:** ${temp} degrees
			> **Wind:** bearing, ${wind}
			> **Humidity:** ${humidity}
			> ${daySummary}`)

			msg.channel.send(
				message
			);
			console.log(data)
		});
	}

	// Return 7 day forecast
	if (msg.content.startsWith('$7day')) {
		cityInput = msg.content.split('$7day ')[1];
		getWeatherData(cityInput).then((data) => {
			// msg.channel.send(
			//   `5day in ${cityInput}, it's ${Math.round(
			//     data.current.temp
			//   )} degrees`
			// );
			console.log(data.temp.day)
			data.daily.map(item => {
				console.log(new Date(item.dt * 1000).toUTCString())
			})
		});
	}


});

client.login(process.env.TOKEN);
