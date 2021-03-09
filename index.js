const Discord = require('discord.js');
const fetch = require('node-fetch');
const fetchMapAPI = require('./mapbox.js')
const client = new Discord.Client();

function getWeatherData(cityName) {

  return fetchMapAPI(cityName)
    .then(res => {
      //console.log('Map Response:', res)
      return fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${res.cityLat}&lon=${res.cityLong}&exclude=minutely,hourly&appid=${process.env.API_KEY}&units=imperial`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return data;
      });
    })
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
  if (msg.author.bot) return;

  if (msg.content.startsWith('$now')) {
    cityInput = msg.content.split('$now ')[1];
    getWeatherData(cityInput).then((data) => {
      msg.channel.send(
        `Currently in ${cityInput}, it's ${Math.round(
          data.current.temp
        )} degrees`
      );
      //console.log(data)
    });
  }

  if (msg.content.startsWith('$7day')) {
    cityInput = msg.content.split('$7day ')[1];
    getWeatherData(cityInput).then((data) => {
      // msg.channel.send(
      //   `5day in ${cityInput}, it's ${Math.round(
      //     data.current.temp
      //   )} degrees`
      // );
      data.daily.map(item => {
				console.log(item) 
			})
    });
  }

  
});

client.login(process.env.TOKEN);
