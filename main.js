const Discord = require('discord.js'); 
const { token, apitoken } = require("./cofig.json"); 
const axios = require("axios") 
 
const prefix = "-"; 


const client = new Discord.Client({ intents: [ 
  Discord.Intents.FLAGS.GUILDS, 
  Discord.Intents.FLAGS.GUILD_MESSAGES, 
]});

client.once('ready', (bot) => {
  console.log('********************************************************')
	console.log(`BOT: ${bot.user.username}\nStatus:${bot.presence.status}`);
  console.log('********************************************************')
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix))
    return msg.reply("Buenos dias bella personas!");

  if (msg.content.startsWith(prefix)) {
    const argumentos = msg.content.slice(prefix.length).split(/ +/);
    const comando = argumentos.shift().toLowerCase();

    if (comando == "ping") return msg.reply("pong");

    if (comando == "suma") {
      return msg.reply(
        `Su suma da: ${
          parseFloat(argumentos[0]) + parseFloat(argumentos[1])
        }`
)}
  }
});

client.login(token);
