const UserModal=require("../models/userModel")
exports.googleSignUp = async (req, res) => {
    let { uid, email, name,photoURL,token,signInTime,username } =req.body;
    try {
        const oldUser = await UserModal.findOne({ email });

        if (oldUser) {
            res.status(200).json({ result: oldUser});
        } else {
            const result = await UserModal.create({
                uid,
                email,
                name,
                photoURL,
                token,
                signInTime,
                username
            });
            // console.log(result)
            res.status(201).json({ success:true });
        }
    } catch (error) {
        res.status(500).json({ success:false});
        console.log(error);
    }
};