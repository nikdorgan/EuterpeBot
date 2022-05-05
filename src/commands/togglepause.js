module.exports = {
    description: "Pause/Resume the player.",
    execute(serverQueue) {
        try {
            serverQueue.connection.dispatcher.pause(true);
            serverQueue.connection.dispatcher.resume();
        }
        catch (err) { console.log(err); }
    }
}