// this function handles all our logic for user commands

const Discord = require('discord.js');
const dedent = require('dedent-js');
const fetchLocationData = require('./controllers/location_helpers/fetchLocationData');
const client = new Discord.Client();
require('dotenv').config();

const keepAlive = require('./server');
const now = require('./controllers/commands/now');
const fiveDay = require('./controllers/commands/fiveDay');
const alerts = require('./controllers/commands/alerts');

// Once bot is ready and logged in, log to console
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setPresence({
    status: 'available',
    activity: {
      name: 'the skies',
      type: 'WATCHING',
      url: 'https://discord.com',
    },
  });
});

// When a user posts a message, do something
client.on('message', async (msg) => {
  // If message is from bot itself, just return
  if (msg.author.bot) return;

  // Help message
  if (msg.content === '$help') {
    msg.channel.send(
      dedent(`**Hey there!** I'm Weather Boy, and it's my job to tell you the weather.
		To get started, *enter one of the following commands, followed by the city of your choice:*
		> **$now** - current conditions
		> **$5day** - forecast for the next 5 days`)
    );
  }

  // Return current weather conditions
  if (msg.content.startsWith('$now')) {
    // get city name from message after $now
    const cityInput = msg.content.split('$now ')[1];

    // weather data for location
    // {weather: {}, location: {}}
    const nowData = await now(cityInput);

    if (typeof nowData === 'string') {
      // if nowData is a string, it must be the error so just send that
      msg.channel.send(nowData);
    } else {
      // otherwise, destructure the data and send an embed
      const { name, country, state } = nowData.location;
      const { temp, feels_like, humidity, wind } = nowData.weather;

      const nowEmbed = new Discord.MessageEmbed()
        .setColor('#86afec')
        .setTitle('Currently')
        .setAuthor(
          'Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png',
          'https://vosslerbr.github.io/Weather-Boy/'
        )
        .setDescription(`Here is the the current weather for ${name}, ${country ? country : state}`)
        .addField('Temp', `${temp}°`, true)
        .addField('Feels Like', `${feels_like}°`, true)
        .addField('Humidity', `${humidity}%`, true)
        .addField('Wind', wind, true)
        .setTimestamp()
        .setFooter(
          'Brought to you by Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png'
        );
      msg.channel.send(nowEmbed);
    }
  }

  // Return 5 day forecast
  if (msg.content.startsWith('$5day')) {
    cityInput = msg.content.split('$5day ')[1];
    const fiveDayData = await fiveDay(cityInput);

    if (typeof fiveDayData === 'string') {
      // if fiveDayData is a string, it must be the error so just send that
      msg.channel.send(fiveDayData);
    } else {
      // otherwise, destructure the data and send an embed
      const { name, country, state } = fiveDayData.location;

      const weather = fiveDayData.weather;

      const nowEmbed = new Discord.MessageEmbed()
        .setColor('#86afec')
        .setTitle('5 Day Forecast')
        .setAuthor(
          'Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png',
          'https://vosslerbr.github.io/Weather-Boy/'
        )
        .setDescription(`Here is the the 5 Day Forecast for ${name}, ${country ? country : state}`)
        .addField(
          weather[0].dt,
          [`**High:** ${weather[0].high}°`, `**Low:** ${weather[0].low}°`, weather[0].description],
          false
        )
        .addField(
          weather[1].dt,
          [`**High:** ${weather[1].high}°`, `**Low:** ${weather[1].low}°`, weather[1].description],
          false
        )
        .addField(
          weather[2].dt,
          [`**High:** ${weather[2].high}°`, `**Low:** ${weather[2].low}°`, weather[2].description],
          false
        )
        .addField(
          weather[3].dt,
          [`**High:** ${weather[3].high}°`, `**Low:** ${weather[3].low}°`, weather[3].description],
          false
        )
        .addField(
          weather[4].dt,
          [`**High:** ${weather[4].high}°`, `**Low:** ${weather[4].low}°`, weather[4].description],
          false
        )

        .setTimestamp()
        .setFooter(
          'Brought to you by Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png'
        );
      msg.channel.send(nowEmbed);
    }
  }

  // Return current weather conditions
  if (msg.content.startsWith('$alerts')) {
    // get city name from message after $now
    const cityInput = msg.content.split('$alerts ')[1];

    // weather data for location
    // {weather: {}, location: {}}
    const alertData = await alerts(cityInput);

    if (typeof alertData == 'string') {
      msg.channel.send(alertData);
    }

    if (alertData.alerts) {
      const { name, country, state } = alertData.location;
      const alertEmbed = new Discord.MessageEmbed()
        .setColor('#ff4f4f')
        .setTitle('Alerts')
        .setAuthor(
          'Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png',
          'https://vosslerbr.github.io/Weather-Boy/'
        )
        .setDescription(`Current alerts for ${name}, ${country ? country : state}`)
        .addField('Issued by', alertData.alerts[0].sender, false)
        .addField('Event', alertData.alerts[0].event, false)
        .addField('Message', alertData.alerts[0].description, false)

        .setTimestamp()
        .setFooter(
          'Brought to you by Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png'
        );
      msg.channel.send(alertEmbed);
    } else if (alertData.msg) {
      const { name, country, state } = alertData.location;
      const alertEmbed = new Discord.MessageEmbed()
        .setColor('#ff4f4f')
        .setTitle('Alerts')
        .setAuthor(
          'Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png',
          'https://vosslerbr.github.io/Weather-Boy/'
        )
        .setDescription(`Current alerts for ${name}, ${country ? country : state}`)
        .addField('Message', alertData.msg, false)

        .setTimestamp()
        .setFooter(
          'Brought to you by Weather Boy',
          'https://res.cloudinary.com/djdctouse/image/upload/v1615908384/weatherboy/Ellipse_1_bepaua.png'
        );
      msg.channel.send(alertEmbed);
    }
  }

  const thunderbird = client.emojis.cache.find((emoji) => emoji.name === 'thunderbird');

  if (msg.content === '$thunderbird' || msg.content === `${thunderbird}`) {
    msg.react(`${thunderbird}`);
    msg.channel.send(`${thunderbird}`);
  }
});

keepAlive();
client.login(process.env.TOKEN);
