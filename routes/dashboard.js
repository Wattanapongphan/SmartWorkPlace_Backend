const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboard.controller');

// GET dashboard data
router.get('/', getDashboardData);


module.exports = router;