const express = require('express');
const router = express.Router();
const { getfloors } = require('../controllers/floor.controller');

// GET all floors
router.get('/', getfloors);


module.exports = router;