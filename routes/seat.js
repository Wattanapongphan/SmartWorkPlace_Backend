const express = require('express');
const router = express.Router();
const { getseatings } = require('../controllers/seat.controller');

router.get('/seatings', getseatings);

module.exports = router;