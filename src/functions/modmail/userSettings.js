const UserSettings = require('../../schema/userSettingSchema');
const colors = require('ansi-colors');

/**
 * Saves or updates user settings in the database.
 * @param {String} userId - The ID of the user whose settings are to be saved.
 * @param {Object} settings - An object containing the user settings to be saved.
 * @param {Promise<Object>} - The saved user settings.
 */

const saveUserSettings = async (userId, settings) => {
    try {
        const updatedSettings = await UserSettings.findOneAndUpdate(
            { userId: userId },
            { $set: settings },
            { new: true, upsert: true }
        );

        console.log(colors.green(`[USER SETTINGS] Successfully saved settings for user: ${userId}`));
        return updatedSettings;
    } catch (error) {
        console.error(colors.red(`[USER SETTINGS] Error saving settings for user ${userId}:`), error);
        throw new Error('Failed to save user settings.');
    }
};

/**
 * Retrieves user settings from the database.
 * @param {String} userId - The ID of the user whose settings are to be retrieved.
 * @returns {Promise<Object|null>} - The retrieved user settings or null if not found.
 */

const getUserSettings = async (userId) => {
    try {
        const userSettings = await UserSettings.findOne({ userId: userId });
        if (userSettings) {
            console.log(colors.blue(`[USER SETTINGS] Retrieved settings for user: ${userId}`));
        } else {
            console.log(colors.yellow(`[USER SETTINGS] No settings found for user: ${userId}`));
        }

        return userSettings;
    } catch (error) {
        console.error(colros.red(`[USER SETTINGS] Error retrieving settings for user ${userId}:`), error);
        throw new Error('Failed to retrieve user settings.');
    }
};

module.exports = { saveUserSettings, getUserSettings };
