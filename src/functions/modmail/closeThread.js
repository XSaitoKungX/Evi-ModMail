const { EmbedBuilder } = require('discord.js');
const colors = require('ansi-colors');

/**
 * Closes an existing Mod-Mail thread in the guild.
 * @param {Object} channel - The channel representing the Mod-Mail thread.
 * @param {Object} user - The moderator who initiates the closing of the thread.
 * @returns {Promise<void>} - Resolves when the channel is successfully closed.
 */
const closeThread = async (channel, user) => {
    try {
        // Get the user's avatar
        const userAvatar = user.displayAvatarURL({ dynamic: true });

        // Create an embed to send to the user when closing the ticket
        const closeEmbed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Ticket Closed')
            .setDescription('This Mod-Mail thread has been closed. If you have further questions, feel free to reach out again.')
            .addFields(
                { name: 'Closed by', value: `${user.tag}`, inline: false },
            )
            .setThumbnail(userAvatar)
            .setFooter({ text: 'ModMail System', iconURL: channel.client.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        // Send the embed message to the channel
        await channel.send({ embeds: [closeEmbed] });

        // Log the channel closure
        console.log(colors.yellow(`[MODMAIL] Mod-Mail channel '${channel.name}' is being closed by ${user.tag}`));

        // Archive or delete the channel
        await channel.delete('Mod-Mail thread closed by moderator');

        // Optionally, save a record of the closed thread in the database
        // Example: saveThreadToDatabase(channel, user); // This function should save the thread data if implemented

        console.log(colors.green(`[MODMAIL] Successfully closed Mod-Mail channel: ${channel.name}`));
    } catch (error) {
        console.error(colors.red('[MODMAIL] Error closing Mod-Mail channel:'), error);
        throw new Error('Failed to close Mod-Mail thread.');
    }
};

module.exports = { closeThread };
