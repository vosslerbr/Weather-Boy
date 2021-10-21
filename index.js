// this function handles all our logic for user commands

const Discord = require('discord.js');
const dedent = require('dedent-js');
const fetchLocationData = require('./controllers/location_helpers/fetchLocationData');
const client = new Discord.Client();
require('dotenv').config();

const keepAlive = require('./server');
const now = require('./controllers/commands/now');

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
    console.log(msg.content);
    cityInput = msg.content.split('$now ')[1];
    const nowData = await now(cityInput);

    const message = `
    > **Current Temp: ${nowData.temp}**
    > **Feels Like: ${nowData.feels_like}**
    > **Humidity: ${nowData.humidity}**
    > **Wind: ${nowData.wind}**
    `;

    console.log(nowData);

    msg.channel.send(message);
  }

  // Return 5 day forecast
  // if (msg.content.startsWith('$5day')) {
  //   cityInput = msg.content.split('$5day ')[1];
  //   fiveDay(cityInput).then((res) => {
  //     msg.channel.send(res);
  //   });
  // }

  // TESTING EMBEDS
  // if (msg.content.startsWith("$test")) {
  // 	// inside a command, event listener, etc.
  // 	const exampleEmbed = new Discord.MessageEmbed()
  // 		.setColor('#ffffff')
  // 		.setTitle('Some title')
  // 		.setURL('https://discord.js.org/')
  // 		.setAuthor('Weather Boy', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
  // 		.setDescription('Some description here')
  // 		.setThumbnail('https://i.imgur.com/wSTFkRM.png')
  // 		.addFields(
  // 			{ name: 'Regular field title', value: 'Some value here' },
  // 			{ name: '\u200B', value: '\u200B' },
  // 			{ name: 'Inline field title', value: 'Some value here', inline: true },
  // 			{ name: 'Inline field title', value: 'Some value here', inline: true },
  // 		)
  // 		.addField('Inline field title', 'Some value here', true)
  // 		.setImage('https://i.imgur.com/wSTFkRM.png')
  // 		.setTimestamp()
  // 		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

  // 	msg.channel.send(exampleEmbed);
  // }
});

keepAlive();
client.login(process.env.TOKEN);
