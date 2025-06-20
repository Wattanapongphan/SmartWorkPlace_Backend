const express = require('express');
const router = express.Router();
const { exportJson } = require('../controllers/exportjson.controller');

// Export JSON route
router.get('/excel/:zoneName', exportJson);

// Export the router
module.exports = router;
// This route will handle requests to export JSON data for a specific zone.