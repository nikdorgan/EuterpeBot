module.exports = {
    name: 'help',
    description: "Lists bot commands",
    execute(message, args, cmd, bot, Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .addFields(
                { name: '$play (search or URL)', value: 'Adds the song or playlist to the queue' },
                { name: '$p (search or URL)', value: 'Same as above, shorthand' },
                { name: '$skip', value: 'Stops playback of current song and moves to next one in the queue' },
                { name: '$stop', value: 'Clears queue and forces bot out of the voice channel' },
                { name: '$queue', value: 'Lists songs currently in the queue (up to 25)' },
                { name: '$clear', value: 'Deletes 100 messages from the channel that it is invoked in' },
            );

        message.channel.send(helpEmbed);
    }
}