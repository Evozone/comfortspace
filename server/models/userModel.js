const mongoose = require('mongoose');

const socialLinksSchema = new mongoose.Schema({
    twitter: {
        type: String,
        default: '',
    },
    instagram: {
        type: String,
        default: '',
    },
});

const userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Please Enter Your Email'],
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        photoURL: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Please Enter Your Username'],
            unique: true,
        },
        socialLinks: socialLinksSchema,
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
