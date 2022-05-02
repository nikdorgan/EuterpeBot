module.exports = {
    name: 'help',
    description: "Show bot commands.",
    execute(message, args, cmd, bot, Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .addFields(
                { name: '$play URL/search  ($p)', value: 'Add the video or playlist to the queue.' },
                { name: '$queue  ($q)', value: 'Display the queue of the current tracks (up to 25).' },
                { name: '$nowplaying  ($np)', value: 'Display the currently playing track.' },
                { name: '$skip  ($s)', value: 'Remove the currently playing track from the queue.' },
                { name: '$stop  ($st)', value: 'Stop the player and clear the queue.' },
                { name: '$pause', value: 'Pause the player.' },
                { name: '$resume', value: 'Resume the player.' },
                { name: '$repeat  ($rep)', value: 'Change to repeat mode.' },
                { name: '$clear', value: 'Remove 100 messages from the text channel.' },
            );

        message.channel.send(helpEmbed);
    }
}