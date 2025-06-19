const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')
const { getseatings, filter , gettable , updatetable , deletetable } = require('../controllers/seat.controller');

// router.get('/', getseatings);
router.get('/filter', filter);
// router.get('/table', gettable);


// ใช้จริง
router.get('/table/:zoneName',authMiddleware, gettable);
router.put('/table/:zoneName/:tableNumber',authMiddleware, updatetable); // zoneName
router.delete('/table/:zoneName/:tableNumber',authMiddleware, deletetable);


module.exports = router;