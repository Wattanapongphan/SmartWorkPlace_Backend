var express = require('express');
var router = express.Router();
const {AddFloors,AddZones} = require('../controllers/post_collections')

/* GET home page. */
router.post('/floors',AddFloors)
router.post('/zones',AddZones)

module.exports = router;
