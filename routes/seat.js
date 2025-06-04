const express = require('express');
const router = express.Router();
const { getseatings, filter} = require('../controllers/seat.controller');

router.get('/', getseatings);
router.get('/filter', filter);

module.exports = router;