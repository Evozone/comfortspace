const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        uid: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Please Enter Your Email'],
            unique: true,
        },
        name: {
            type: String,
            required: [true, 'Please Enter Your Name'],
            maxLength: [30, 'Name cannot exceed 30 characters'],
            minLength: [4, 'Name should have more than 4 characters'],
        },
        photoURL: {
            type: String,
        },
        token: {
            type: String,
        },
        username: {
            type: String,
            required: [true, 'Please Enter Your Username'],
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
