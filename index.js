// Import necessary modules
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { connectToDatabase } = require('./src/services/database');
const { loadEvents } = require('./src/events/eventLoader');
const { loadCommands } = require('./src/events/commandLoader');
const colors = require('ansi-colors');

// Initialize Discord Client
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
    ],
    partials: [
        Partials.Channel,
    ],
});

// Connect to the database
connectToDatabase();

// Load bot events & commands
loadEvents(client);
loadCommands(client);

// Log in the bot
client.login(process.env.DISCORD_TOKEN)

// Handle uncaught errors
process.on('unhandledRejection', (error) => {
    console.error(colors.red(`[HANDLE] Unhandled promise rejection:`), error);
});

process.on('uncaughtException', (error) => {
    console.error(colors.red(`[HANDLE] Uncaught exception:`), error);
});
