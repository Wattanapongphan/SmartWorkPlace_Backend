const express = require('express');
const router = express.Router();
const { getEmployees , getEmployeeById, getEmployeeLocation, getEmployeeLocationByZone } = require('../controllers/employee.controller');
const { authMiddleware } = require('../middleware/authMiddleware')

// GET all employees
router.get('/location', authMiddleware ,getEmployeeLocation);
router.get('/location/:zoneId',authMiddleware, getEmployeeLocationByZone);
router.get('/', authMiddleware , getEmployees);
router.get('/:id',authMiddleware, getEmployeeById);

module.exports = router;