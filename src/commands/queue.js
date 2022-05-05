module.exports = {
    description: 'Display the queue of the current tracks (up to 25).',
    execute(serverQueue, message, Discord) {
        try {
            let position = 0;
            const queueMessage = new Discord.MessageEmbed().setTitle('Queue')
            serverQueue.songs.forEach(song => {
                position++;
                queueMessage.addFields({ name: 'Song ' + position + ': ', value: song.title });
            })
            message.channel.send(queueMessage);
        } catch (err) { console.log(err); }
    }
}