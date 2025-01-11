const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const passport = require('passport')

router.post('/create', passport.authenticate('jwt', { session: false }), parkingController.addParking);

router.put('/update', passport.authenticate('jwt', { session: false }), parkingController.updateParking);

router.get('/get', passport.authenticate('jwt', { session: false }), parkingController.getParking);

router.delete('/end', passport.authenticate('jwt', { session: false }), parkingController.concludeParking);

module.exports = router;
