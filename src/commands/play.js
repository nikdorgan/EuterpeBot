const nowplaying = require('./nowplaying');
const displayQueue = require('./queue');
const skip = require('./skip');
const voteSkip = require('./voteskip');
const stop = require('./stop');
const togglePause = require('./togglepause');
const toggleRepeat = require('./togglerepeat');
const restart = require('./restart');
const shuffle = require('./shuffle');
const playdl = require('play-dl');
const ytSearch = require('yt-search');
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'queue', 'q', 'nowplaying', 'np', 'skip', 's', 'voteskip', 'v', 'stop', 'st', 'pause', 'resume', 'repeat', 'rep', 'shuffle', 'sh', 'restart'],
    description: 'Every command involving the player queue is called here.',
    async execute(message, args, cmd, bot, Discord) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('Please join a voice channel to use this command.');

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('SPEAK')) return message.channel.send('You do not have permission to use this command.');

        const serverQueue = queue.get(message.guild.id);

        if (cmd === 'play' || cmd === 'p') {
            if (!args.length) return message.channel.send('Please input a link or search query with this command.');
            let song = {};
            let playlist;

            if (playdl.yt_validate(args[0]) === 'video') {
                const songInfo = await playdl.video_info(args[0]);
                song = { title: songInfo.video_details.title, url: songInfo.video_details.url }
            } else if (playdl.yt_validate(args[0]) === 'playlist') {
                playlist = await playdl.playlist_info(args[0], { incomplete: true });
                song = { title: playlist.videos[0].title, url: playlist.videos[0].url }
            } else {
                const videoFinder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }
                const songInfo = await videoFinder(args.join(' '));
                if (songInfo) {
                    song = { title: songInfo.title, url: songInfo.url }
                } else {
                    return message.channel.send('There was an error trying to find this video.');
                }
            }

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

                if (playlist) {
                    for (const i of playlist.videos) {
                        playlistSong = { title: i.title, url: i.url }
                        if (song.title !== playlistSong.title) queueConstructor.songs.push(playlistSong);
                    }
                    playlist = null;
                }

                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    return message.channel.send('There was an error trying to connect to the voice channel.');
                }
            } else {
                serverQueue.songs.push(song);

                if (playlist) {
                    for (const i of playlist.videos) {
                        playlistSong = { title: i.title, url: i.url }
                        if (song.title !== playlistSong.title) serverQueue.songs.push(playlistSong);
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
        else if (cmd === 'stop' || cmd === 'st') return stop.execute(serverQueue, voiceChannel);
        else if (cmd === 'pause' || cmd === 'resume') return togglePause.execute(serverQueue);
        else if (cmd === 'repeat' || cmd === 'rep') return toggleRepeat.execute(serverQueue, message);
        else if (cmd === 'shuffle' || cmd === 'sh') return shuffle.execute(serverQueue, message);
        else if (cmd === 'restart') return restart.execute(videoPlayer, serverQueue, message);
    }
}

const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);
    if (!song) {
        songQueue.voiceChannel.leave();
        return queue.delete(guild.id);
    }
    const stream = await playdl.stream(song.url, { quality: 2, discordPlayerCompatibility: true });
    songQueue.connection.play(stream.stream)
        .on('finish', () => {
            if (!songQueue.loop) songQueue.songs.shift();
            songQueue.votes = 0;
            videoPlayer(guild, songQueue.songs[0]);
        });
    await songQueue.textChannel.send(`Now Playing: **${song.title}**`)
}