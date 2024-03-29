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
  'before_options': '-reconnect 1 -reconnect_at_eof 1 -reconnect_on_network_error 1 -reconnect_streamed 1 -reconnect_delay_max 5'
}

bot.login(process.env.BOT_TOKEN);