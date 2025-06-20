const express = require('express');
const router = express.Router();
const { exportJson , exportJsonToPdf } = require('../controllers/exportjson.controller');

// Export JSON route
router.get('/excel/:zoneName', exportJson);
router.get('/pdf', exportJsonToPdf );

// Export the router
module.exports = router;
// This route will handle requests to export JSON data for a specific zone.