const express = require('express');
const router = express.Router();
const { getEmployees , getEmployeeById, getEmployeeLocation, getEmployeeLocationByZone } = require('../controllers/employee.controller');

// GET all employees
router.get('/location', getEmployeeLocation);
router.get('/location/:zoneId', getEmployeeLocationByZone);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);

module.exports = router;