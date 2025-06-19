const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')
const { getFloors } = require('../controllers/floor.controller');

// GET all floors
router.get('/',authMiddleware, getFloors);


module.exports = router; 