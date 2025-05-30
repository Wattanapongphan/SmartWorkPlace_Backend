var express = require('express');
var router = express.Router();
const {getFloors,getZones} = require('../controllers/get_collections')

/* GET home page. */
router.get('/floors',getFloors)
router.get('/zones',getZones)

module.exports = router;
