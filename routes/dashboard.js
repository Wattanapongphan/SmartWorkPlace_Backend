const express = require('express');
const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware')
const { getDashboardData } = require('../controllers/dashboard.controller');

// GET dashboard data
router.get('/',authMiddleware, getDashboardData);


module.exports = router;