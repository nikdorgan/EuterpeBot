require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '$';
const fs = require('fs');
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
bot.commands = new Discord.Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.on('guildCreate', guild => {
    guild.systemChannel.send(`Hello, and thank you for using SwagBot! To get started, join a voice channel and type $play <YouTube URL>. Or, type $help for a list of commands you can use!`);
});

bot.on('ready', () => {
    console.log('BOT ONLINE')
});

bot.on('message', message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    const args = message.content.slice(PREFIX.length).split(/ +/);

    switch (args[0]) {
        case 'help':
            bot.commands.get('help').execute(message, args);
            break;

        case 'clear':
            message.channel.bulkDelete(100);
            break;
    }
})

bot.login(process.env.BOT_TOKEN);