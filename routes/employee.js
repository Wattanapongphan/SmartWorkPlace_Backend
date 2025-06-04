const express = require('express');
const router = express.Router();
const { getEmployees } = require('../controllers/employee.controller');

// GET all employees
router.get('/', getEmployees);

module.exports = router;