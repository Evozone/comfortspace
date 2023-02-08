const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
            required: true,
        },
        senderName: {
            type: String,
            required: true,
        },
        senderEmail: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        timestamp: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Message', messageSchema);
