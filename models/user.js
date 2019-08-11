const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    ID: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Nickname: {
        type: String,
        required: true
    },
    Comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.Model('User', userSchema);