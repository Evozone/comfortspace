const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title for blog is required'],
        },
        description: {
            type: String,
            required: [true, 'Summary for blog is required'],
            maxLength: [55, 'Summary cannot exceed 55 characters'],
        },
        roomId: {
            type: String,
            required: [true, 'Room ID is required'],
            unique: true,
        },
        cover: {
            type: String,
            required: [true, 'Cover for blog is required'],
        },
        createdById: {
            type: String,
            required: [true, 'Author is required'],
            unique: false,
        },
        createdByUsername: {
            type: String,
            required: [true, 'Author is required'],
            unique: false,
        },
        createdByName: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Room', roomSchema);
