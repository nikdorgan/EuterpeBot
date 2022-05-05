module.exports = {
    description: "Display the currently playing track.",
    execute(serverQueue, message) {
        try { message.channel.send(`Currently Playing: **${serverQueue.songs[0].title}**`) }
        catch (err) { console.log(err); }
    }
}