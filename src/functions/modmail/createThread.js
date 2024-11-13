const { ChannelType, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const colors = require('ansi-colors');
const Setup = require('../../schema/setupSchema');

/**
 * Creates a new Mod-Mail thread in the guild
 * @param {Object} guild - The guild where the thread will be created.
 * @param {Object} user - The user initiating the Mod-Mail request.
 * @returns {Promise<Object>} - The created thread/channel or error message.
 */
const createThread = async (guild, user) => {
    try {
        // Define the channel name
        const channelName = `modmail-${user.username}`;

        // Check if the channel already exists
        const existingChannel = guild.channels.cache.find(
            channel => channel.name === channelName && channel.type === ChannelType.GuildText
        );
        if (existingChannel) {
            return existingChannel;
        }

        // Retrieve setup information for Mod-Mail category from the database
        const setupData = await Setup.findOne({ guildId: guild.id });
        if (!setupData) {
            throw new Error('Mod-Mail setup data not found. Please run the setup command.');
        }

        const category = guild.channels.cache.get(setupData.categoryId);
        if (!category || category.type !== ChannelType.GuildCategory) {
            throw new Error('Mod-Mail category not found or invalid. Please run the setup command again.');
        }

        // Create a new text channel for the modmail conversation
        const modmailChannel = await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
            parent: category.id,
            permissionOverwrites: [
                {
                    id: guild.id, // Everyone role
                    deny: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: user.id, // The user who initiated modmail
                    allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
                },
            ],
        });

        console.log(colors.green(`[MODMAIL] Created new Mod-Mail channel: ${modmailChannel.name}`));

        // Ping moderators when the channel is created
        const modRole = guild.roles.cache.find(role => role.name.toLowerCase().includes('ʚɞ'));
        const mentionText = modRole ? `${modRole}` : '@here';

        // Create a close button that only mods/admins can use
        const closeButton = new ButtonBuilder()
            .setCustomId('close_ticket')
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🔒');

        const actionRow = new ActionRowBuilder().addComponents(closeButton);

        // Send an embed message to the new modmail channel
        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('New Mod-Mail Request')
            .setDescription(`A new Mod-Mail request has been initiated by ${user.tag} (${user.id}).`)
            .addFields(
                { name: 'Close Ticket', value: 'Use the command `/ticket close`, type `e.close`, or click the button below to close this Mod-Mail.' }
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setFooter({ text: 'Mod-Mail System', iconURL: guild.iconURL({ dynamic: true }) });

        await modmailChannel.send({ content: `${mentionText}`, embeds: [embed], components: [actionRow] });

        return modmailChannel;
    } catch (error) {
        console.error(colors.red('[MODMAIL] Error creating Mod-Mail channel:'), error);
        throw new Error('Failed to create Mod-Mail thread.');
    }
};

/**
 * Handles incoming messages from users in DMs and relays them to the appropriate Mod-Mail channel
 * @param {Object} user - The user who sent the DM.
 * @param {Object} message - The message sent by the user.
 * @param {Object} guild - The guild where the Mod-Mail is being handled.
 */
const handleIncomingDM = async (user, message, guild) => {
    try {
        // Check if there is an existing Mod-Mail channel
        const channelName = `modmail-${user.username}`;
        const existingChannel = guild.channels.cache.find(
            channel => channel.name === channelName && channel.type === ChannelType.GuildText
        );

        if (existingChannel) {
            // If the channel exists, send the message directly to the channel without creating a new channel
            const userEmbed = new EmbedBuilder()
                .setColor('Green')
                .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
                .setDescription(message.content)
                .setTimestamp();
            await existingChannel.send({ embeds: [userEmbed] });
        } else {
            // If no channel exists, create a new one and send the initial message
            const modmailChannel = await createThread(guild, user);
            if (modmailChannel) {
                const userEmbed = new EmbedBuilder()
                    .setColor('Green')
                    .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
                    .setDescription(message.content)
                    .setTimestamp();
                await modmailChannel.send({ embeds: [userEmbed] });
                await message.reply('Thank you for your message. A moderator will respond to you soon.').catch(console.error);
            }
        }
    } catch (error) {
        console.error(colors.red(`[MODMAIL] Error handling incoming DM from user ${user.tag}:`), error);
    }
};

/**
 * Handles messages from the modmail channel to relay them back to the user
 * @param {Object} message - The message sent by the moderator.
 */
const handleChannelMessage = async (message) => {
    try {
        if (message.channel.name.startsWith('modmail-') && !message.author.bot) {
            const userName = message.channel.name.replace('modmail-', '');
            const user = message.client.users.cache.find(u => u.username === userName);
            if (user) {
                const moderatorEmbed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setAuthor({ name: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setDescription(message.content)
                    .setTimestamp();
                await user.send({ embeds: [moderatorEmbed] });
                message.react('✅');
            } else {
                console.error(colors.red(`[MODMAIL] User with username ${userName} not found.`));
            }
        }
    } catch (error) {
        console.error(colors.red(`[MODMAIL] Error relaying message from channel ${message.channel.name}:`), error);
    }
};

module.exports = { createThread, handleIncomingDM, handleChannelMessage };
