const express = require('express');
const router = express.Router();

const { createRoom, getRooms, deleteRoom } = require('../controllers/room');
const auth = require('../middleware/auth');

router.get('/', getRooms);
router.post('/', auth, createRoom);
router.delete('/:id', auth, deleteRoom);
module.exports = router;
