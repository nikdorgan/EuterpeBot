module.exports = {
    name: 'join',
    aliases: ['j'],
    description: "Make EuterpeBot join your current voice channel.",
    execute(message, args, cmd, bot, Discord) {
        const voiceChannel = message.member.voice.channel;
        voiceChannel.join();
    }
}