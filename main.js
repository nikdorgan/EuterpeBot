const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
  require(`./handlers/${handler}`)(bot, Discord);
})

ffmpeg_options = {
  'options': '-vn',
  "before_options": "-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5"
}

bot.login(process.env.BOT_TOKEN);