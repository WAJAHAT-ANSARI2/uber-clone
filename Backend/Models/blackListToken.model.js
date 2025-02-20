const mongoose = require('mongoose');

const clacklistTokenSchema = new mongoose.Schema({
    token: {
        type: string,
        required: true,
        unique: true
    },
    createdAt: {
        type: Data,
        default: Date.now,
        expires: 86400
    }
});
module.exports = mongoose.model('blacklistToken', blacklistTokenSchema);