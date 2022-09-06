const Discord = require('discord.js');
const { token, apitoken } = require("./cofig.json");
const axios = require("axios")

const prefix = "!";


const client = new Discord.Client({ intents: [
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MESSAGES,
]});


client.once("ready", (bot) => {
    console.log("********************************************************")
	  console.log(`BOT: ${bot.user.username}\nStatus:${bot.presence.status}`);
    console.log("********************************************************")
});

const exampleEmbed = (
  temp,
  maxTemp,
  minTemp,
  pressure,
  humidity,
  wind,
  cloudness,
  icon,
  author,
  profile,
  cityName,
  country
) =>
new Discord.RichEmbed()
  .setColor('#0099ff')
  .setAuthor(`Hello, ${author}`, profile)
  .setTitle(`There is ${temp}\u00B0 C in ${cityName}, ${country}`)
  .addField(`Maximum Temperature:`, `${maxTemp}\u00B0 C`, true)
  .addField(`Minimum Temperature:`, `${minTemp}\u00B0 C`, true)
  .addField(`Humidity:`, `${humidity} %`, true)
  .addField(`Wind Speed:`, `${wind} m/s`, true)
  .addField(`Pressure:`, `${pressure} hpa`, true)
  .addField(`Cloudiness:`, `${cloudness}`, true)
  .setThumbnail(`http://openweathermap.org/img/w/${icon}.png`);


const helpEmbed = () =>
new Discord.RichEmbed()
    .setColor('#0099ff')
    .addField("Use '#w (City Name)' to get weather information", "For Example '#w london'", true)
    .addBlankField()
    .addField("Use '#ping' or '#beep'", 'Try it.', true)
    .addBlankField()
    .addField("Use '#server-info' to get informatin about server", "For Example '#server-info'", true)
    .addBlankField()
    .addField("Use '#user-info' to get informatin about your profile", "For Example '#user-info'", true)
    .addBlankField();


client.on("msgCreate", (msg) => {
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

    else if (msg.content == prefix + "help") 
      return msg.channel.send(helpEmbed())

    else if (msg.content == prefix + "beep")
      return msg.reply("Beep-Boop!")

    else if (msg.content == prefix + "server-info") 
      return msg.channel.send("Guild name: " + msg.guild.name + "\nTotal members: " + msg.guild.memberCount);
    
  
    else if (msg.content == prefix + "user-info") 
      return msg.channel.send("Your username: " + msg.author.username + "\nYour ID: " + msg.author.id);

    else if (command === "w" || "weather") {
      axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=${apitoken}`)
          .then(response => {
              let apiData = response;
              let currentTemp = Math.ceil(apiData.data.main.temp)
              let maxTemp = apiData.data.main.temp_max;
              let minTemp = apiData.data.main.temp_min;
              let humidity = apiData.data.main.humidity;
              let wind = apiData.data.wind.speed;
              let author = msg.author.username
              let profile = msg.author.displayAvatarURL
              let icon = apiData.data.weather[0].icon
              let cityName = args
              let country = apiData.data.sys.country
              let pressure = apiData.data.main.pressure;
              let cloudness = apiData.data.weather[0].description;
              msg.channel.send(exampleEmbed(currentTemp, maxTemp, minTemp, pressure, humidity, wind, cloudness, icon, author, profile, cityName, country));
          }).catch(err => {
              msg.reply(`Enter a vailid city name`)
          })
    }
  }
});

client.login(token);
