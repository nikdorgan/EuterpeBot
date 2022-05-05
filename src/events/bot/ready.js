module.exports = (Discord, bot) => {
    console.log('BOT ONLINE');
    bot.user.setActivity(`music | $help`, { type: 'PLAYING' })
}