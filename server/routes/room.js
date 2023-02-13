const express = require('express');
const router = express.Router();

const { createRoom, getRooms, deleteRoom } = require('../controllers/room');
const auth = require('../middleware/auth');

router.get('/getRooms', getRooms);
router.post('/create', auth, createRoom);
router.delete('/delete/:id', auth, deleteRoom);
module.exports = router;
