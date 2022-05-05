module.exports = {
    description: 'Display the queue of the current tracks (up to 25).',
    execute(serverQueue, message, Discord) {
        try {
            let ctr = 0;
            const queueEmbed = new Discord.MessageEmbed().setTitle('Queue')
            serverQueue.songs.forEach((i) => {
                ctr++;
                queueEmbed.addFields({ name: 'Song ' + ctr + ': ', value: i.title });
            })
            message.channel.send(queueEmbed);
        }
        catch (err) { console.log(err); }
    }
}