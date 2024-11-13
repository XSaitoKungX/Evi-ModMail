const mongoose = require('mongoose');

const modmailSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
    guildId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    closedAt: {
        type: Date,
        default: null,
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    messages: [
        {
            senderId: String,
            content: String,
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

module.exports = mongoose.model('Modmail', modmailSchema);
