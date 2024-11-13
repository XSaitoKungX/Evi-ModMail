const fs = require('fs');
const path = require('path');
const colors = require('ansi-colors');

module.exports.loadEvents = (client) => {
    const events = [];

    // Load events from the main directory
    const eventFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js') && file !== 'eventLoader.js' && file !== 'commandLoader.js');

    for (const file of eventFiles) {
        const event = require(path.join(__dirname, file));
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        events.push(event.name);
        console.log(colors.cyan(`[EVENT LOADER] Loaded event: ${event.name}`));
    }

    // Load client and guild events from subfolders
    ['client', 'guild', 'other'].forEach(folder => {
        const folderPath = path.join(__dirname, folder);
        if (fs.existsSync(folderPath)) {
            const folderFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
            for (const file of folderFiles) {
                const event = require(path.join(folderPath, file));
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...args));
                } else {
                    client.on(event.name, (...args) => event.execute(...args));
                }
                events.push(event.name);
                console.log(colors.cyan(`[EVENT LOADER] Loaded event: ${event.name} (Folder: ${folder})`));
            }
        }
    });

    console.log(colors.green(`[EVENT LOADER] Successfully loaded ${events.length} events.`));
};