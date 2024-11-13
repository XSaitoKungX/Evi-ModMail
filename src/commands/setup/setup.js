const { SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
const colors = require('ansi-colors');
const Setup = require('../../schema/setupSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Sets up the Mod-Mail configuration for the server'),
    async execute(interaction) {
        try {
            // Ensure the user has administrative privileges
            if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                await interaction.reply({ content: 'You need administrative permissions to run this command.', ephemeral: true });
                return;
            }

            // Create a new category for Mod-Mail threads if not existing
            let modmailCategory = interaction.guild.channels.cache.find(
                channel => channel.type === ChannelType.GuildCategory && channel.name.toLowerCase() === 'modmail'
            );

            if (!modmailCategory) {
                modmailCategory = await interaction.guild.channels.create({
                    name: 'ModMail',
                    type: ChannelType.GuildCategory,
                });
                console.log(colors.green(`[SETUP] Mod-Mail category created: ${modmailCategory.name}`));
            } else {
                console.log(colors.yellow(`[SETUP] Mod-Mail category already exists: ${modmailCategory.name}`));
            }

            // Save setup information to the database
            await Setup.findOneAndUpdate(
                { guildId: interaction.guild.id },
                { categoryId: modmailCategory.id },
                { upsert: true, new: true }
            );

            console.log(colors.green(`[SETUP] Mod-Mail setup saved to the database for guild: ${interaction.guild.id}`));

            // Send confirmation message
            await interaction.reply({ content: 'Mod-Mail setup is complete. The Mod-Mail category is ready for use.', ephemeral: true });
        } catch (error) {
            console.error(colors.red('[SETUP] Error during setup:'), error);
            try {
                await interaction.reply({ content: 'There was an error during setup. Please check the console for more details.', ephemeral: true });
            } catch (replyError) {
                console.error(colors.red('[SETUP] Error replying to interaction:'), replyError);
            }
        }
    },
};
