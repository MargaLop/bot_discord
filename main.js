const { Client, Intents } = require('discord.js');
const { token } = require('./cofig.json');


const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

client.once('ready', (bot) => {
	console.log(`BOT: ${bot.user.username}\nStatus:${bot.presence.status}`);
});

client.on("messageCreate", (msg) =>{
  if(msg.author.bot) 
   return console.log(`Mensaje del Bot ${msg.author.username}`);

  // console.log(msg)
  msg.reply('Buenos dias bella persona!')
});

client.login(token);
