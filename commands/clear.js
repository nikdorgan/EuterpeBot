module.exports = {
    name: 'clear',
    description: "Removes bot messages",
    execute(bot, message, args, Discord){
        message.channel.bulkDelete(messages);
    }
}