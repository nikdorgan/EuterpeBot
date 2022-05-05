require('dotenv').config();

module.exports = {
    name: 'destroy',
    async execute(message, args, cmd, bot, Discord) {
        message.channel.send("Restarting...").then(msg => { setTimeout(function () { msg.edit("Restart successful...") }, 10000) })
            .then(bot.destroy())
            .then(bot.login(process.env.BOT_TOKEN));
    }
}