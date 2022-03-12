module.exports = {
    name: 'restart',
    description: "Restarts bot iin the event of a crash",
    execute(message, args, cmd, bot, Discord) {
        message.channel.send('Resetting...')
            .then(msg => bot.destroy())
            .then(() => bot.login(process.env.BOT_TOKEN));
    }
}