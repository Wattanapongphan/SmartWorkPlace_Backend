const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')
const { getbuildings } = require('../controllers/building.controller');

// GET all buildings
router.get('/',authMiddleware, getbuildings);

module.exports = router;