const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
    Creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Number: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Blacklist', blacklistSchema);