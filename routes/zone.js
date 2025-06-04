const express = require('express');
const router = express.Router();
const { getZones} = require('../controllers/zone.controller');

router.get('/', getZones);

module.exports = router;