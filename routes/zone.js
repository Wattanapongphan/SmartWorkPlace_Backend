const express = require('express');
const router = express.Router();
const { getselectzone , getonlineEmployees} = require('../controllers/zone.controller');

router.get('/', getselectzone);
router.get('/online/:zoneName', getonlineEmployees);

module.exports = router;