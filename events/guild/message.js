require('dotenv').config();
module.exports = (Discord, bot, message) => {
    const prefix = process.env.PREFIX;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(command) command.execute(bot, message, args, cmd, Discord);
}