module.exports = {
    // This command is for testing purposes, this is not supposed to be in the functional version
    // name: 'clear',
    execute(message, args, cmd, bot, Discord) {
        message.channel.bulkDelete(100);
    }
}