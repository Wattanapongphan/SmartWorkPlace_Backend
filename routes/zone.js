const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')
const { getZone,getselectZone } = require('../controllers/zone.controller');

// GET all floors
// router.get('/', getZone);
router.get('/:floorId?',authMiddleware, getselectZone);


module.exports = router;