const express = require('express');
const router = express.Router();
const { getEmployees , getEmployeeById } = require('../controllers/employee.controller');

// GET all employees
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);

module.exports = router;