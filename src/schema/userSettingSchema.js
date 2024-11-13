const mongoose = require('mongoose');

const userSettingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    preferredLanguage: {
        type: String,
        enum: ['en', 'de'],
        default: 'en',
    },
    notificationsEnabled: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserSetting', userSettingSchema);
