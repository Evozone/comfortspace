const express = require('express');
const router = express.Router();

const { googleSignUp, search, editProfile } = require('../controllers/user.js');
const auth = require('../middleware/auth.js');

router.get('/:userId', search);
router.patch('/edit', auth, editProfile);
router.post('/googleSignUp', googleSignUp);
module.exports = router;
