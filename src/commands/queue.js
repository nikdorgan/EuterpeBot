module.exports = {
    description: "Test",
    execute(serverQueue, message, Discord) {
        try {
            const queueEmbed = new Discord.MessageEmbed()
                .setTitle('Queue')
            let ctr = 0;
            serverQueue.songs.forEach((i) => {
                ctr++;
                queueEmbed.addFields(
                    { name: 'Song ' + ctr + ': ', value: i.title },
                );
            })
            message.channel.send(queueEmbed);
        }
        catch (err) { console.log(err); }
    }
}