const express = require('express');
const { registerPlayer } = require('../controllers/playerController');

const router = express.Router();

router.post('/register', registerPlayer);

module.exports = router;
