module.exports = {
    description: "Stop the player and clear the queue.",
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