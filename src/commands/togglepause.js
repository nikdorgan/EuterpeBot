module.exports = {
    description: "Test",
    execute(serverQueue) {
        try {
            serverQueue.connection.dispatcher.pause(true);
            serverQueue.connection.dispatcher.resume();
        }
        catch (err) { console.log(err); }
    }
}