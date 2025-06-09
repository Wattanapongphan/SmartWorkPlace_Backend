const express = require('express');
const router = express.Router();
const { getseatings, filter , gettable , updatetable , deletetable } = require('../controllers/seat.controller');

router.get('/', getseatings);
router.get('/filter', filter);

// ใช้จริง
router.get('/table/:zoneName', gettable);
router.put('/table/:zoneName/:tableNumber/:emp_id', updatetable);
router.delete('/table/:zoneName/:tableNumber', deletetable);


module.exports = router;