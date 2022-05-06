module.exports = {
    // name: 'clear',
    execute(message, args, cmd, bot, Discord) {
        message.channel.bulkDelete(100);
    }
}