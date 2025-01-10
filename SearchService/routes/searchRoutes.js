const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
//const passport = require('passport')

router.post('/find', searchController.getParkingSpaces);

module.exports = router;
