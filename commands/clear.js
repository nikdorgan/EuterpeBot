module.exports = {
    name: 'clear',
    description: "Uses bulkDelete to remove 100 channel messages",
    execute(message, args, cmd, bot, Discord) {
        message.channel.bulkDelete(100);
    }
}