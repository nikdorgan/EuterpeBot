module.exports = {
    name: 'help',
    description: 'Gives info on bot',
    execute(message, args) {
        message.channel.send('PREFIX: $');
        message.channel.send('COMMANDS: ');
        message.channel.send('help - Lists bot commands');
        message.channel.send('clear - Clears messages in the channel and turns off server tracker');
    }
}