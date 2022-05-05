module.exports = {
    description: "Test",
    execute(serverQueue, voiceChannel) {
        try {
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        }
        catch (err) {
            voiceChannel.leave();
            console.log(err);
        }
    }
}