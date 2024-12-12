const express = require('express');
const router = express.Router();
const userController = require('../controllers/parkingController');

router.post('/create', userController.addParking);

router.post('/end', userController.concludeParking);

module.exports = router;
