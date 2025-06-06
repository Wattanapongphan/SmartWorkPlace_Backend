const express = require('express');
const router = express.Router();
const { getSeats, filter , getTotalSeats} = require('../controllers/seat.controller');

router.get('/', getSeats);
router.get('/filter', filter);
router.get('/table', getTotalSeats);

module.exports = router;