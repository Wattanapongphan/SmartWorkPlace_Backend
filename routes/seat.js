var express = require('express');
var router = express.Router();
const {getseats} = require('../controllers/seat')

/* GET users listing. */
router.get('/',getseats);

module.exports = router;
