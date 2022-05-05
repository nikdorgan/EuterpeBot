module.exports = {
    description: "Test",
    execute(serverQueue, voiceChannel, message) {
        try {
            serverQueue.votes++;
            message.channel.send(`Votes To Skip: **${serverQueue.votes} / ${voiceChannel.members.size - 1}** `)

            if (serverQueue.votes >= (voiceChannel.members.size - 1) / 2) {
                serverQueue.votes = 0;
                serverQueue.connection.dispatcher.end();
                message.channel.send(`Skipping...`);
            }
        }
        catch (err) { console.log(err); }
    }
}