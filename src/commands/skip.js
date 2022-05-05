module.exports = {
    description: "Test",
    execute(serverQueue) {
        try { serverQueue.connection.dispatcher.end(); }
        catch (err) { console.log(err); }
    }
}