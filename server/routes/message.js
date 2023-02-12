const express = require('express');
const router = express.Router();
const { addMessage, getMessages } = require('../controllers/message.js');

router.post('/', addMessage);
router.get('/:chatId', getMessages);
module.exports = router;
