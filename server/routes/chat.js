const express = require('express');
const router = express.Router();
const { createChat, userChats } = require('../controllers/chat.js');

router.post('/', createChat);
router.get('/:userId', userChats);
module.exports = router;
