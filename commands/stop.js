module.exports = {
    name: 'leave',
    description: 'Stops playback and leaves channel',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You must be in a channel to use this feature');
        await voiceChannel.leave();
        await message.channel.send('Stopping...');
    }
}