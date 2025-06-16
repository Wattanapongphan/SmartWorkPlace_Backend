const express = require('express');
const router = express.Router();
const { getZone,getselectZone } = require('../controllers/zone.controller');

// GET all floors
// router.get('/', getZone);
router.get('/:floorId?', getselectZone);


module.exports = router;