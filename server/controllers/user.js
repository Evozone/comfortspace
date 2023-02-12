const UserModel = require('../models/userModel');

exports.googleSignUp = async (req, res) => {
    let { uid, email, name, photoURL, token, signInTime, username } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) {
            res.status(200).json({
                success: 'true',
                result: oldUser,
                message: 'User already exists',
            });
        } else {
            const result = await UserModel.create({
                uid,
                email,
                name,
                photoURL,
                token,
                signInTime,
                username,
            });
            res.status(201).json({
                success: true,
                result,
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
