const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

router.post('/create', parkingController.addParking);

router.put('/update', parkingController.updateParking);

router.get('/get', parkingController.getParking);

router.post('/end', parkingController.concludeParking);

module.exports = router;
