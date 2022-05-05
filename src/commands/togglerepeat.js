module.exports = {
    description: 'Toggles repeat mode.',
    execute(serverQueue, message) {
        try {
            if (!serverQueue.loop) message.channel.send(`Now Looping: **${serverQueue.songs[0].title}**`);
            else message.channel.send(`Unlooping: **${serverQueue.songs[0].title}**`);
            serverQueue.loop = !serverQueue.loop;
        }
        catch (err) { console.log(err); }
    }
}