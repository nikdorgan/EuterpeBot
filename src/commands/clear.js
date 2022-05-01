module.exports = {
    name: 'clear',
    description: "Remove 100 messages from the text channel.",
    execute(message, args, cmd, bot, Discord) {
        message.channel.bulkDelete(100);
    }
}