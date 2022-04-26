module.exports = {
    name: 'help',
    description: 'Gives info on bot commands by putting them as fields in a discord embed thats sent to the chat',
    execute(message, args, cmd, bot, Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .addFields(
                { name: '$play (search or URL)', value: 'Adds the song, or playlist, to the queue' },
                { name: '$p (search or URL)', value: 'Same as above, shorthand' },
                { name: '$skip', value: 'Stops playback of current song and moves to next one in the queue' },
                { name: '$stop', value: 'Clears queue and forces bot out of the voice channel' },
                { name: '$clear', value: 'Deletes 100 messages from the channel that it is invoked in, ONLY use to clean up dedicated music text channel' },
            );

        message.channel.send(helpEmbed);
    }
}