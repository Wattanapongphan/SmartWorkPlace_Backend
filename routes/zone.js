const express = require('express');
const router = express.Router();
const { getselectzone } = require('../controllers/zone.controller');

router.get('/', getselectzone);

module.exports = router;