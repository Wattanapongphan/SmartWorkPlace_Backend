const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

/* GET users listing. */
router.get('/', employeeController.getAllEmployees);

module.exports = router;
