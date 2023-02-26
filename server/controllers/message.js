const MessageModel = require('../models/messageModel');
const ChatModel = require('../models/chatModel');

exports.addMessage = async (req, res) => {
    const { chatId, senderId, senderName, senderEmail, text, timestamp } =
        req.body;
    try {
        const result = await MessageModel.create({
            chatId,
            senderId,
            senderName,
            senderEmail,
            text,
            timestamp,
        });
        await ChatModel.findOneAndUpdate(
            { chatId },
            {
                lastMessage: text,
                lastMessageTime: timestamp,
            }
        );
        res.status(200).json({
            success: true,
            result,
            message: 'Message sent successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};

exports.getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const PAGE_SIZE = 10;
        let skip = req.query.page ? parseInt(req.query.page) : 0;
        const result = await MessageModel.find({ chatId })
            .sort({ _id: -1 })
            .skip(skip * PAGE_SIZE)
            .limit(PAGE_SIZE);
        res.status(200).json({
            success: true,
            result,
            message: 'Messages fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error.message,
        });
    }
};
