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
