module.exports = {
    description: "Toggles repeat mode.",
    execute(serverQueue, message) {
        try {
            if (serverQueue.loop === false) {
                serverQueue.loop = true;
                message.channel.send(`Now Looping: **${serverQueue.songs[0].title}**`);
            } else {
                serverQueue.loop = false;
                message.channel.send(`Unlooping: **${serverQueue.songs[0].title}**`);
            }
        }
        catch (err) { console.log(err); }
    }
}