module.exports = {
    name: 'help',
    execute(message, args, cmd, bot, Discord) {
        const helpMessage = new Discord.MessageEmbed()
            .setTitle('Commands')
            .addFields(
                { name: '$play URL  ($p)', value: 'Add video or playlist from the given URL to the queue.' },
                { name: '$play words  ($p)', value: 'Search for a track on YouTube.' },
                { name: '$queue  ($q)', value: 'Display the queue of the current tracks (up to 25).' },
                { name: '$nowplaying  ($np)', value: 'Display the currently playing track.' },
                { name: '$skip  ($s)', value: 'Remove the currently playing track from the queue.' },
                { name: '$voteskip  ($v)', value: 'Vote to skip the current track. Must have at least 50% of the votes.' },
                { name: '$stop  ($st)', value: 'Stop the player and clear the queue.' },
                { name: '$repeat  ($rep)', value: 'Toggle repeat mode.' },
                { name: '$shuffle  ($sh)', value: 'Shuffle queue (works best for larger queues).' },
                { name: '$restart ($res)', value: 'Restart the currently playing track.' },
            );
        message.channel.send(helpMessage);
    }
}