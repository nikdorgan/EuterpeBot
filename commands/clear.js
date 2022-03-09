module.exports = {
    name: 'clear',
    description: "Removes channel messages",
    execute(bot, message, args, Discord) {
        message.channel.bulkDelete(100);
    }
}