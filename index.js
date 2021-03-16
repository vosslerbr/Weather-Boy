const Discord = require("discord.js");
const dedent = require("dedent-js");
const now = require("./now.js");
const fiveDay = require("./fiveDay.js");
const client = new Discord.Client();

const keepAlive = require("./server");

// Once bot is ready and logged in, log to console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
	client.user.setPresence({
        status: 'available',
        activity: {
            name: 'the skies',
            type: 'WATCHING',
            url: 'https://discord.com'
        }
    });
});

// When a user posts a message, do this stuff
client.on("message", (msg) => {
  // If message is from bot itself
  if (msg.author.bot) return;

	// Help message
	if (msg.content === '$help') {
		msg.channel.send(dedent(`**Hey there!** I'm Weather Boy, and it's my job to tell you the weather. 
		To get started, *enter one of the following commands, followed by the city of your choice:*
		> **$now** - current conditions
		> **$5day** - forecast for the next 5 days`))
	}

  // Return current weather conditions
  if (msg.content.startsWith("$now")) {
    cityInput = msg.content.split("$now ")[1];
    now(cityInput).then((res) => {
      msg.channel.send(res);
    });
  }

  // Return 5 day forecast
  if (msg.content.startsWith("$5day")) {
    cityInput = msg.content.split("$5day ")[1];
    fiveDay(cityInput).then(res => {
			msg.channel.send(res);
		})
  }

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
