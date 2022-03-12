module.exports = {
    name: 'help',
    description: 'Gives info on bot commands',
    execute(message, args, cmd, bot, Discord) {
        message.channel.send('PREFIX: $');
        message.channel.send('COMMANDS: ');
        message.channel.send('clear - Clears messages in the channel and turns off server tracker');
        message.channel.send('help - Lists bot commands');





        // at the top of your file
        const { MessageEmbed } = require('discord.js');

        // inside a command, event listener, etc.
        const helpEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .addFields(
                { name: '$play (search or URL)', value: 'Adds the song to the queue' },
                { name: '$p (search or URL)', value: 'Same as above, shorthand' },
                { name: '$skip', value: 'Stops playback of current song and moves to next one in the queue' },
                { name: '$stop', value: 'Clears queue and forces bot out of the voice channel' },
                { name: '$clear', value: 'Deletes 100 messages from the channel that it is invoked in, ONLY use to clean up dedicated music text channel' },
                { name: '$info', value: 'Shows some background info on the bot itself' }
            );

        channel.send({ embeds: [helpEmbed] });
    }
}