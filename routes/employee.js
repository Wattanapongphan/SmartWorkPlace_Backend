var express = require('express');
var router = express.Router();
const {getEmployees,AddEmployees} = require('../controllers/employee')

/* GET users listing. */
router.get('/',getEmployees);
router.post('/',AddEmployees);


module.exports = router;
