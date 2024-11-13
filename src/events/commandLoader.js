const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const colors = require('ansi-colors');

module.exports.loadCommands = (client) => {
    const commands = [];
    client.commands = new Map();

    // Define the base path for commands
    const basePath = path.join(__dirname, '../commands');

    // Load commands from all subfolders
    const loadCommandFiles = (dir) => {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                loadCommandFiles(filePath);
            } else if (file.endsWith('.js')) {
                const command = require(filePath);
                commands.push(command.data.toJSON());
                client.commands.set(command.data.name, command);
                console.log(colors.cyan(`[COMMAND LOADER] Loaded command: ${command.data.name}`));
            }
        }
    };

    // Start loading commands from the base path
    loadCommandFiles(basePath);

    // Register commands with Discord API
    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    (async () => {
        try {
            console.log(colors.yellow('[COMMAND LOADER] Registering slash commands with Discord API...'));
            await rest.put(
                Routes.applicationCommands(process.env.DISCORD_ID),
                { body: commands },
            );
            console.log(colors.green('[COMMAND LOADER] Successfully registered slash commands.'));
        } catch (error) {
            console.error(colors.red('[COMMAND LOADER] Error registering slash commands:'), error);
        }
    })();
};
