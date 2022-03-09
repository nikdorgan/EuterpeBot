module.exports = {
    name: 'clear',
    description: "Removes bot messages",
    execute(bot, message, args, Discord){
        messsage.channel.bulkDelete(messages);
    }
}