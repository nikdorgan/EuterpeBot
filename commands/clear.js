module.exports = {
    name: 'clear',
    description: "Removes channel messages",
    execute(message, args, cmd, bot, Discord) {
        message.channel.bulkDelete(100);
    }
}