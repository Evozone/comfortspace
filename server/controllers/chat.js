const ChatModel = require('../models/chatModel');

exports.createChat = async (req, res) => {
    try {
        const chat = await ChatModel.findOne({
            chatId: req.body.chatId,
        });
        if (chat) {
            return res.status(200).json({
                success: true,
                result: chat,
                message: 'Chat already exists',
            });
        }
        const result = await ChatModel.create({
            userOne: req.body.userOneInfo,
            userTwo: req.body.userTwoInfo,
            chatId: req.body.chatId,
            lastMessageTime: req.body.lastMessageTime,
        });
        res.status(200).json({
            success: true,
            result,
            message: 'Chat created',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

exports.userChats = async (req, res) => {
    try {
        const keyword = req.params.userId
            ? {
                  $or: [
                      { chatId: { $regex: req.params.userId, $options: 'i' } },
                  ],
              }
            : {};
        const chat = await ChatModel.find(keyword);
        res.status(200).json({
            success: true,
            result: chat,
            message: 'Chats found',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};
