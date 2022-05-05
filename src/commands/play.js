const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const ytSearch = require('yt-search');
const queue = new Map();

const nowplaying = require('./nowplaying.js');
const displayQueue = require('./displayqueue.js');
const skip = require('./skip.js');
const voteSkip = require('./voteskip.js');

module.exports = {
    name: 'play',
    aliases: ['p', 'queue', 'q', 'nowplaying', 'np', 'skip', 's', 'voteskip', 'v', 'stop', 'st', 'pause', 'resume', 'leave', 'lv', 'repeat', 'rep', 'restart'],
    description: "Every command involving the player queue is here.",
    async execute(message, args, cmd, bot, Discord) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("Please join a voice channel to use this command.");

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('SPEAK')) return message.channel.send("You do not have permission to use this command.");

        const serverQueue = queue.get(message.guild.id);

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.channel.send("Please input a link or search query with this command.");
            let song = {};
            let playlist;


            //Handles the video searching
            //The if block checks for valid video URL, stores video info as song to pass to the queue if so
            //The else-if block checks for valid playlist URL, stores all contained video URLs and passes first song info to queue
            //The else block is for when user inputs video title instead of URL, searches title and uses first resulting song
            if (ytdl.validateURL(args[0])) {
                const songInfo = await ytdl.getInfo(args[0]);
                song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
            } else if (ytpl.validateID(args[0])) {
                playlist = await ytpl(args[0]);
                const songInfo = await ytdl.getInfo(playlist.items[0].url);
                song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
                message.channel.send("Queueing playlist videos (this may take a moment)...");
            } else {
                const videoFinder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }
                const video = await videoFinder(args.join(' '));
                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    return message.channel.send("There was an error trying to find this video.");
                }
            }


            //Handles the queueing of the video(s) found above
            if (!serverQueue) {
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    loop: false,
                    votes: 0,
                    songs: []
                }
                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);

                //pushes playlist songs on queue then clears playlist
                if (playlist) {
                    for (const i of playlist.items) {
                        const songInfo = await ytdl.getInfo(i.url);
                        playlistSong = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
                        if (song.title !== playlistSong.title) {
                            queueConstructor.songs.push(playlistSong);
                        }
                    }
                    playlist = null;
                }

                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    return message.channel.send("There was an error trying to connect to the voice channel.");
                }
            } else {
                serverQueue.songs.push(song);

                if (playlist) {
                    for (const i of playlist.items) {
                        const songInfo = await ytdl.getInfo(i.url);
                        playlistSong = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
                        if (song.title !== playlistSong.title) {
                            serverQueue.songs.push(playlistSong);
                        }
                    }
                    message.channel.send(`**${playlist.title}** added to queue.`);
                    return playlist = null;
                }

                return message.channel.send(`**${song.title}** added to queue.`);
            }
        }


        else if (cmd === 'queue' || cmd === 'q') return displayQueue.execute(serverQueue, message, Discord);
        else if (cmd === 'nowplaying' || cmd === 'np') return nowplaying.execute(serverQueue, message);
        else if (cmd === 'skip' || cmd === 's') return skip.execute(serverQueue);
        else if (cmd === 'voteskip' || cmd === 'v') return voteSkip.execute(serverQueue, voiceChannel, message);
        else if (cmd === 'stop' || cmd === 'st' || cmd === 'leave' || cmd === 'lv') stopSong(serverQueue, voiceChannel);
        else if (cmd === 'pause' || cmd === 'resume') togglePause(serverQueue);
        else if (cmd === 'repeat' || cmd === 'rep') toggleRepeat(serverQueue, message);
        else if (cmd === 'restart') restartSong(serverQueue, message);
    }
}

//Handles the actual playing of the video
const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);
    if (!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly', highWaterMark: 1 << 25 });
    songQueue.connection.play(stream, { seek: 0, volume: 0.5 })
        .on('finish', () => {
            if (songQueue.loop === false) songQueue.songs.shift();
            songQueue.votes = 0;
            videoPlayer(guild, songQueue.songs[0]);
        });
    await songQueue.textChannel.send(`Now Playing: **${song.title}**`)
}

const stopSong = (serverQueue, voiceChannel) => {
    try {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
    }
    catch (err) {
        voiceChannel.leave();
        console.log(err);
    }
}

const togglePause = (serverQueue) => {
    try {
        serverQueue.connection.dispatcher.pause(true);
        serverQueue.connection.dispatcher.resume();
    }
    catch (err) { console.log(err); }
}

const toggleRepeat = (serverQueue, message) => {
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

const restartSong = (serverQueue, message) => {
    try { videoPlayer(message.guild, serverQueue.songs[0]); }
    catch (err) { console.log(err); }
}