//Reads events from event folder
const fs = require('fs');

module.exports = (bot, Discord) => {
    const loadDir = (dirs) => {
        const eventFiles = fs.readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const event = require(`../events/${dirs}/${file}`);
            const eventName = file.split('.')[0];
            bot.on(eventName, event.bind(null, Discord, bot));
        }
    }

    ['bot', 'guild'].forEach(e => loadDir(e))
}