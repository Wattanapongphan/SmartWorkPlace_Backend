const express = require('express');
const router = express.Router();
const { getfloors, getselectfloor } = require('../controllers/floor.controller');

// GET all floors
router.get('/', getselectfloor);


module.exports = router;