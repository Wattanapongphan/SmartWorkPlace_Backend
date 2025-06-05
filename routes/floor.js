const express = require('express');
const router = express.Router();
const { getFloors } = require('../controllers/floor.controller');

// GET all floors
router.get('/', getFloors);


module.exports = router;