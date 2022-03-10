const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop'],
    description: 'Advanced music bot',
    async execute(message, args, cmd, bot, Discord) {

        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to use this feature.');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the permission to use this feature.');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the permission to use this feature.');

        const serverQueue = queue.get(message.guild.id);

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.channel.send('Please input a video.');
            let song = {};

            if (ytdl.validateURL(args[0])) {
                const songInfo = await ytdl.getInfo(args[0]);
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

            if (!serverQueue) {

                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: []
                }

                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);

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
                return message.channel.send(`${song.title} added to queue.`);
            }
        }

        else if (cmd === 'skip') skipSong(message, serverQueue);
        else if (cmd === 'stop') stopSong(message, serverQueue);
    }

}

const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);

    if (!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    songQueue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0]);
        });
    await songQueue.textChannel.send(`Now Playing: **${song.title}**`)
}

const skipSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use this feature.');
    if (!serverQueue) {
        return message.channel.send(`There currently are no songs in the queue`);
    }
    try{
        serverQueue.connection.dispatcher.end();
    } catch {
        return;
    }
}

const stopSong = (message, serverQueue) => {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to use this feature.');
    serverQueue.songs = [];

    try{
        serverQueue.connection.dispatcher.end();
    } catch {
        return;
    }
}