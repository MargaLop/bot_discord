const Discord = require('discord.js');
const { token, apitoken } = require("./cofig.json");
const axios = require("axios");

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

const embed = Object.freeze({
exampleEmbed:(
  temp,
  maxTemp,
  minTemp,
  pressure,
  humidity,
  wind,
  cloudness,
  icon,
  author,
  cityName,
  country
) =>
new Discord.MessageEmbed()
  .setColor('#6DC4FF')
  .setAuthor(`Hola, ${author}`, profile)
  .setTitle(`Hay ${temp}\u00B0 C en ${cityName}, ${country}`)
  .addField(`🌡 Maximas Temperaturas:`, `${maxTemp}\u00B0 Cº`, true)
  .addField(`🌡 Minimas Temperaturas:`, `${minTemp}\u00B0 Cº`, true)
  .addField(`💧 Humedad:`, `${humidity} %`, true)
  .addField(`💨 Viento:`, `${wind} m/s`, true)
  .addField(`📊 Precipitaciones:`, `${pressure} hpa`, true)
  .addField(`⛅️ Nubes:`, `${cloudness}`, true) 
  .setUrl(`http://openweathermap.org/img/w/${icon}.png`)
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;
  
  if (msg.content.startsWith(prefix)) {
    const argumentos = msg.content.slice(prefix.length).split(/ +/);
    const comando = argumentos.shift().toLowerCase();
    const argWeather = argumentos[0]


    if (comando == "w" || "weather") {
      axios 
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${argWeather}&units=metric&appid=${apitoken}`)
          .then(response => {
              let apiData = response;
              let currentTemp = Math.ceil(apiData.data.main.temp);
              let maxTemp = apiData.data.main.temp_max;
              let minTemp = apiData.data.main.temp_min;
              let humidity = apiData.data.main.humidity;
              let wind = apiData.data.wind.speed;
              let author = msg.author.username;
              let icon = apiData.data.weather[0].icon;
              let cityName = argWeather;
              let country = apiData.data.sys.country;
              let pressure = apiData.data.main.pressure;
              let cloudness = apiData.data.weather[0].description;

              console.log(currentTemp)
              console.log(maxTemp)
              console.log(minTemp)
              console.log(humidity)
              console.log(wind)
              console.log(author)
              console.log(icon)
              console.log(cityName)
              console.log(country )
              console.log(pressure)
              console.log(cloudness)
              msg.reply(embed.exampleEmbed(currentTemp, maxTemp, minTemp, pressure, humidity, wind, cloudness, icon, author, profile, cityName, country));
            }).catch(err => {
              msg.reply("Introduce una ciudad validad")
          })
    }
  }
});

client.login(token);
