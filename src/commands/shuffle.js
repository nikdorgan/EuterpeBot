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

//The CLASSIC Fisher-Yates Shuffle
const shuffle = (serverQueue) => {
    let currentIndex = serverQueue.songs.length;
    let newIndex, temp;

    while (currentIndex) {
        newIndex = Math.floor(Math.random() * currentIndex--);

        if (newIndex === 0) {
            continue;
        }

        temp = serverQueue.songs[currentIndex];
        serverQueue.songs[currentIndex] = serverQueue.songs[newIndex];
        serverQueue.songs[newIndex] = temp;
    }

    return serverQueue;
}