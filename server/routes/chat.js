const express = require('express');
const router = express.Router();

const { createChat, userChats } = require('../controllers/chat');
const auth = require('../middleware/auth');

router.post('/', createChat);
router.get('/', auth, userChats);
module.exports = router;
