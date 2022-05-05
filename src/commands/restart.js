module.exports = {
    description: "Test",
    execute(videoPlayer, serverQueue, message) {
        try { videoPlayer(message.guild, serverQueue.songs[0]); }
        catch (err) { console.log(err); }
    }
}