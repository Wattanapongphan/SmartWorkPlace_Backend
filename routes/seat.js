const express = require('express');
const router = express.Router();
const { seatings, filterseatings } = require('../controllers/seat.controller');

router.get('/seatings', seatings);
router.get('/filter', filterseatings);

module.exports = router;