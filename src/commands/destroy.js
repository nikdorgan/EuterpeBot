require('dotenv').config();

module.exports = {
    name: 'destroy',
    execute(message, args, cmd, bot, Discord) {
        message.channel.send("Attempting a restart...").then(msg => {
            //msg.react('🆗');
            setTimeout(function () {
                msg.edit("I should be back up now!");
            }, 10000);
        })
            .then(bot.destroy())
            .then(bot.login(process.env.BOT_TOKEN));
    }
}