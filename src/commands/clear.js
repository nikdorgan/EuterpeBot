module.exports = {
    name: 'clear',
    description: "Removes 100 channel messages",
    execute(message, args, cmd, bot, Discord) {
        message.channel.bulkDelete(100);
    }
}