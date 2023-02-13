const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.googleSignUp = async (req, res) => {
    let { uid, email, name, photoURL, username } = req.body;
    try {
        const token = jwt.sign(
            { uid, email, name, photoURL, username },
            process.env.HMS_SECRET_APP,
            {
                expiresIn: '48h',
            }
        );
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            res.status(200).json({
                success: 'true',
                result: { ...oldUser._doc, token },
                message: 'User already exists',
            });
        } else {
            const user = await UserModel.create({
                uid,
                email,
                name,
                photoURL,
                username,
            });
            res.status(201).json({
                success: true,
                result: { ...user._doc, token },
                message: 'User created',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};

exports.search = async (req, res) => {
    try {
        const userId = req.params.userId;
        const keyword = req.query.search
            ? {
                  $or: [
                      { name: { $regex: req.query.search, $options: 'i' } },
                      { username: { $regex: req.query.search, $options: 'i' } },
                  ],
              }
            : {};
        const users = await UserModel.find(keyword).find({
            uid: { $ne: userId },
        });
        res.status(200).json({
            success: true,
            result: users,
            message: 'User found',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
        console.log(error);
    }
};
