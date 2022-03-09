require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(bot, Discord);
})

bot.login(process.env.BOT_TOKEN);