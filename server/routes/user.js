const express = require('express');
const router = express.Router();

const { googleSignUp, search } = require('../controllers/user.js');
router.get('/:userId', search);
router.post('/googleSignUp', googleSignUp);
module.exports = router;
