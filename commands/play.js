const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const ytpl = require('ytpl');
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop'],
    description: 'The actual music feature',
    async execute(message, args, cmd, bot, Discord) {
        //Checks to make sure user can actually use the bot
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to use this feature.');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the permission to use this feature.');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the permission to use this feature.');

        //Queue structure that holds the songs inputted by the users
        const serverQueue = queue.get(message.guild.id);

        //play and p are aliases to add song to the queue
        if (cmd === 'play' || cmd === 'p') {

            if (!args.length) return message.channel.send('Please input a video.');
            let song = {};
            let playlist;

            //checks for valid URL, then stores video info as song if valid
            if (ytdl.validateURL(args[0])) {
                const songInfo = await ytdl.getInfo(args[0]);
                song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
            } else if (ytpl.validateID(args[0])) {
                playlist = await ytpl(args[0]);

                const songInfo = await ytdl.getInfo(playlist.items[0].url);
                song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
            } else {

                const videoFinder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));

                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send('Error finding video.');
                }
            }


            //Builds a queue for the serverqueue to use and joins channel
            if (!serverQueue) {

                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);

                if (playlist) {
                    playlist.items.forEach(async (i) => {
                        const songInfo = await ytdl.getInfo(i.url);

                        testSong = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
                        queueConstructor.songs.push(testSong);
                    })
                }

                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error connecting.');
                    throw err;
                }

            } else {
                serverQueue.songs.push(song);

                if (playlist) {
                    playlist.items.forEach(async (i) => {
                        const songInfo = await ytdl.getInfo(i.url);

                        testSong = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
                        serverQueue.songs.push(testSong);
                    })
                }

                return message.channel.send(`${song.title} added to queue.`);
            }



        }

        else if (cmd === 'skip') skipSong(message, serverQueue);
        else if (cmd === 'stop') stopSong(message, serverQueue);

    }
}

//This code actually plays the song using ytdl core
const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);

    //Leave channel and remove queue if theres no more songs
    if (!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, { filter: 'audioonly', highWaterMark: 1 << 25 });

    songQueue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0]);
        });

    await songQueue.textChannel.send(`Now Playing: **${song.title}**`)
}

//Skip gets rid of top item in queue, stop wipes queue entirely
const skipSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use this feature.');

    if (!serverQueue) {
        return message.channel.send(`There currently are no songs in the queue`);
    }

    serverQueue.connection.dispatcher.end();
}

const stopSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute this command!');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}