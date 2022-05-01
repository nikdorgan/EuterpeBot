const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop', 'queue', 'q'],
    description: "The actual music feature",
    async execute(message, args, cmd, bot, Discord) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("Please join a voice channel to use this command.");

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send("You do not have permission to use this command.");
        if (!permissions.has('SPEAK')) return message.channel.send("You do not have permission to use this command.");

        const serverQueue = queue.get(message.guild.id);

        if (cmd === 'play' || cmd === 'p') {

            if (!args.length) return message.channel.send("Please input a link or search query with this command.");
            let song = {};
            let playlist;


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
            } else {
                const videoFinder = async (query) => {
                    const video_result = await ytSearch(query);
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await videoFinder(args.join(' '));

                if (video) {
                    song = { title: video.title, url: video.url }
                } else {
                    message.channel.send("There was an error trying to find this video.");
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

                //pushes playlist songs on queue then clears playlist
                if (playlist) {
                    playlist.items.forEach(async (i) => {
                        const songInfo = await ytdl.getInfo(i.url);

                        playlistSong = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }

                        if (song.title !== playlistSong.title) {
                            queueConstructor.songs.push(playlistSong);
                        }
                    })
                    playlist = null;
                }

                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send("There was an error trying to connect to the voice channel.");
                    throw err;
                }
            } else {
                serverQueue.songs.push(song);

                if (playlist) {
                    playlist.items.forEach(async (i) => {
                        const songInfo = await ytdl.getInfo(i.url);

                        playlistSong = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }

                        if (song.title !== playlistSong.title) {
                            serverQueue.songs.push(playlistSong);
                        }
                    })
                    message.channel.send(`**${playlist.title}** added to queue.`);
                    return playlist = null;
                }

                return message.channel.send(`**${song.title}** added to queue.`);
            }
        }

        else if (cmd === 'skip') skipSong(serverQueue);
        else if (cmd === 'stop') stopSong(serverQueue);
        else if (cmd === 'queue' || cmd === 'q') queueSong(message, Discord, serverQueue);
    }
}


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
            songQueue.songs.shift();
            videoPlayer(guild, songQueue.songs[0]);
        });

    await songQueue.textChannel.send(`Now Playing: **${song.title}**`)
}


const skipSong = (serverQueue) => {
    if (!serverQueue) return;

    serverQueue.connection.dispatcher.end();
}


const stopSong = (serverQueue) => {
    if (!serverQueue) return;

    serverQueue.songs = [];
    playlist = null;
    serverQueue.connection.dispatcher.end();
}


const queueSong = (message, Discord, serverQueue) => {
    const songQueue = queue.get(message.guild.id);

    if (!serverQueue) return;

    const queueEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Queue')

    let ctr = 0;
    songQueue.songs.forEach((i) => {
        ctr++;
        queueEmbed.addFields(
            { name: 'Song ' + ctr + ': ', value: i.title },
        );
    })

    message.channel.send(queueEmbed);
}