module.exports = {
    description: "Display the currently playing track.",
    execute(serverQueue, message) {
        try {
            shuffle(serverQueue);
            message.channel.send(`Queue shuffled...`);
        }
        catch (err) { console.log(err); }
    }
}

const shuffle = (serverQueue) => {
    let currentIndex = serverQueue.songs.length;
    let newIndex;
    let temp;

    while (currentIndex !== 0) {
        newIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        if (newIndex === 0) {
            continue;
        }

        temp = serverQueue.songs[currentIndex];
        serverQueue.songs[currentIndex] = serverQueue.songs[newIndex];
        serverQueue.songs[newIndex] = temp;
    }

    return serverQueue;
}