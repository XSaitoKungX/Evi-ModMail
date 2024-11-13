const colors = require('ansi-colors');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;

        try {
            // Handle close ticket interaction
            if (interaction.customId === 'close_ticket') {
                const channel = interaction.channel;

                // Check if the user has the appropriate permissions (mod/admin)
                const member = await interaction.guild.members.fetch(interaction.user.id);
                if (!member.permissions.has(PermissionFlagsBits.ManageChannels)) {
                    await interaction.reply({ content: 'You do not have permission to close this ticket.', ephemeral: true });
                    return;
                }

                // Confirm and close the channel
                await interaction.reply({ content: 'Closing this ticket...', ephemeral: true });
                await channel.delete('Mod-Mail ticket closed by moderator');

                console.log(colors.green(`[MODMAIL] Mod-Mail channel '${channel.name}' closed by ${interaction.user.tag}`));
            }
        } catch (error) {
            console.error(colors.red('[EVENT] Error handling interactionCreate:'), error);
        }
    },
};
