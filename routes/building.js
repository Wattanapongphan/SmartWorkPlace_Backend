const express = require('express');
const router = express.Router();
const { getbuildings } = require('../controllers/building.controller');

// GET all buildings
router.get('/', getbuildings);

module.exports = router;