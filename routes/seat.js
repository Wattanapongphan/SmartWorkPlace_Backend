const express = require('express');
const router = express.Router();
const { getseatings, filter,gettable} = require('../controllers/seat.controller');

router.get('/', getseatings);
router.get('/filter', filter);
router.get('/table', gettable);


module.exports = router;