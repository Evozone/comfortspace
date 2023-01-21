const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title for blog is required'],
        },
        content: {
            type: String,
            required: [true, 'Content for blog is required'],
        },
        cover: String,
        authorId: {
            type: String,
            required: [true, 'Author is required'],
            unique: true,
        },
        authorName: {
            type: String,
            required: [true, 'Author is required'],
        },
        authorUsername: {
            type: String,
            required: [true, 'Author is required'],
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Blog', blogSchema);
