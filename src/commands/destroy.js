require('dotenv').config();

module.exports = {
    name: 'destroy',
    execute(message, args, cmd, bot, Discord) {
        bot.destroy().then(bot.login(process.env.BOT_TOKEN));
    }
}