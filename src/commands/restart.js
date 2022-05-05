module.exports = {
    description: 'Restart the currently playing track.',
    execute(videoPlayer, serverQueue, message) {
        try { videoPlayer(message.guild, serverQueue.songs[0]); }
        catch (err) { console.log(err); }
    }
}