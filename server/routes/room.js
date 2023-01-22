const express = require('express');
const router = express.Router();

const { createRoom, getRooms, deleteRoom } = require('../controllers/room.js');
router.get('/getRooms', getRooms);
router.post('/create', createRoom);
router.delete('/delete/:id', deleteRoom);
module.exports = router;
