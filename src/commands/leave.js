module.exports = {
    name: 'leave',
    description: "Remove 100 messages from the text channel.",
    execute(message, args, cmd, bot, Discord) {
        const voiceChannel = message.member.voice.channel;
        voiceChannel.leave();
    }
}