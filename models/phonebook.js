const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phonebookSchema = new Schema({
    Creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Name: {
        type: String,
        required: true
    },
    Number: {
        type: String,
        required: true
    },
    Group: {
        type: String,
        required: false
    },
    Email: {
        type: String,
        required: false
    },
    Address: {
        type: String,
        required: false
    },
    Comment: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model('Phonebook', phonebookSchema);