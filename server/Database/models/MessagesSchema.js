const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    zoom_id: {
        type: String,
        required: [true, 'required']
    },
    sender: {
        id: String,
        user_name: String,
    },
    tags: {
        type: [String]
    },
    messages_id: {
        user_name: String,
    },
    messages: {
        type: [String],
    },

}, { timestamps: true });

const Message = mongoose.model('messages', messageSchema);

module.exports = Message;