const { createThread, handleIncomingDM, handleChannelMessage } = require('../../functions/modmail/createThread');
const Setup = require('../../schema/setupSchema');
const { ChannelType } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    execute(message) {
        // Ignore messages from bots
        if (message.author.bot) return;

        // Handle Direct Messages (DMs)
        if (message.channel.type === ChannelType.DM) {
            // React to the DM with a check mark
            message.react('✅').catch(console.error);

            // Retrieve ModMail setup information from the database
            const firstGuild = message.client.guilds.cache.first();
            if (!firstGuild) {
                message.reply('Mod-Mail is not set up yet. Please contact an administrator.').catch(console.error);
                return;
            }

            Setup.findOne({ guildId: firstGuild.id })
                .then((setupData) => {
                    if (!setupData) {
                        message.reply('Mod-Mail is not set up yet. Please contact an administrator.').catch(console.error);
                        return;
                    }

                    const guild = message.client.guilds.cache.get(setupData.guildId);
                    if (!guild) {
                        return;
                    }

                    // Relay the incoming DM to the modmail channel or create a new one
                    handleIncomingDM(message.author, message, guild);
                })
                .catch((dbError) => {
                    message.reply('There was an issue accessing the Mod-Mail configuration. Please try again later.').catch(console.error);
                });

            return;
        }

        // Handle messages from modmail channels (messages from moderators)
        if (message.channel.name.startsWith('modmail-') && !message.author.bot) {
            handleChannelMessage(message);
            return;
        }

        // Handle prefix-based commands
        const prefix = process.env.PREFIX || 'e.';
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();

        const command = message.client.commands.get(commandName);
        if (!command) {
            return;
        }

        try {
            command.execute(message, args);
        } catch (error) {
            message.reply('There was an issue executing this command. Please try again later.').catch(console.error);
        }
    },
};
