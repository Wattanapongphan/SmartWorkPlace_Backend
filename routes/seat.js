const express = require('express');
const router = express.Router();
const { getseatings, filter , gettable , updatetable , deletetable } = require('../controllers/seat.controller');

router.get('/', getseatings);
router.get('/filter', filter);
router.get('/table', gettable);
router.put('/table/:tableNumber/:emp_id', updatetable);
router.delete('/table/:tableNumber', deletetable);


module.exports = router;