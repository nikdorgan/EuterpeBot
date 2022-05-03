module.exports = {
    name: 'help',
    description: "Show bot commands.",
    execute(message, args, cmd, bot, Discord) {
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Commands')
            .addFields(
                { name: '$play URL  ($p)', value: 'Play music from the given URL.' },
                { name: '$play words  ($p)', value: 'Search for a track on YouTube.' },
                { name: '$queue  ($q)', value: 'Display the queue of the current tracks (up to 25).' },
                { name: '$nowplaying  ($np)', value: 'Display the currently playing track.' },
                { name: '$skip  ($s)', value: 'Remove the currently playing track from the queue.' },
                { name: '$voteskip  ($v)', value: 'Vote to skip the current track. Must have at least 50% of the votes.' },
                { name: '$stop  ($st)', value: 'Stop the player and clear the queue.' },
                { name: '$pause', value: 'Pause the player.' },
                { name: '$resume', value: 'Resume the player.' },
                { name: '$join  ($j)', value: 'Make EuterpeBot join your current voice channel.' },
                { name: '$leave  ($lv)', value: 'Make EuterpeBot leave the current voice channel.' },
                { name: '$repeat  ($rep)', value: 'Toggles repeat mode.' },
                { name: '$clear', value: 'Remove 100 messages from the text channel.' },
            );

        message.channel.send(helpEmbed);
    }
}