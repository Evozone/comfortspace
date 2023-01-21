const express = require('express');
const router = express.Router();

const { googleSignUp } = require('../controllers/user.js');
router.post('/googleSignUp', googleSignUp);
module.exports = router;
