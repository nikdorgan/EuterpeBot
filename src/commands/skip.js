module.exports = {
    description: "Remove the currently playing track from the queue.",
    execute(serverQueue) {
        try { serverQueue.connection.dispatcher.end(); }
        catch (err) { console.log(err); }
    }
}