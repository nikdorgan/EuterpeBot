require('dotenv').config();

module.exports = (Discord, bot, message) => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = bot.commands.get(cmd) || bot.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        command.execute(message, args, cmd, bot, Discord);
    } catch (err) {
        message.channel.send("There was an error trying to execute this command.");
        console.log(err);
        return;
    }
}