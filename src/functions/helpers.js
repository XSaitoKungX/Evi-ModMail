const colors = require('ansi-colors');

/**
 * Checks if a user has moderator permissions.
 * @param {Object} member - The guild member to check.
 * @returns {Boolean} - Returns true if the user has moderator permissions, otherwise false.
 */
const isModerator = (member) => {
    const hasPermission = member.permissions.has('ManageMessages') || member.permissions.has('Administrator');
    console.log(colors.cyan(`[HELPERS] Checked moderator status for ${member.user.tag}: ${hasPermission}`));
    return hasPermission;
};

/**
 * Sends a log message to a specified channel
 * @param {Object} guild - The guild where the log channel is located.
 * @param {String} channelId - The ID of the log channel.
 * @param {String} message - The message to log.
 * @returns {Promise<void>} - Resolves when the message has been set.
 */
const sendLogMessage = async (guild, channelId, message) => {
    try {
        const logChannel = guild.channels.cache.get(channelId);
        if (!logChannel) {
            console.error(colors.red(`[HELPERS] Log channel with ID ${channelId} not found.`));
            return;
        }

        await logChannel.send(message);
        console.log(colors.green(`[HELPERS] Log message sent to channel ${logChannel.name}`));
    } catch (error) {
        console.error(colors.red(`[HELPERS] Error sending log message to channel ${channelId}:`), error);
    }
};

/**
 * Formats a date object to a readalbe string.
 * @param {Date} date - The date object to format.
 * @returns {String} - The formatted date string.
 */
const formatDate = (date) => {
    const formattedDate = date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    console.log(colors.cyan(`[HELPERS] Formatted date: ${formattedDate}`));
    return formattedDate;
};

module.exports = { isModerator, sendLogMessage, formatDate };
