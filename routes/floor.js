const express = require('express');
const router = express.Router();
const { getSelectFloors } = require('../controllers/floor.controller');

// GET all floors
router.get('/', getSelectFloors);


module.exports = router;