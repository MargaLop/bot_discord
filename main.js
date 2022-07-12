const { Client, Intents } = require('discord.js');
const { token } = require('./cofig.json');

const prefix = "-";


const client = new Client({ 
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] 
});

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
  }
});
client.login(token);
