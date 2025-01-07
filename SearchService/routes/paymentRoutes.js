const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const passport = require('passport')

router.post('/create', passport.authenticate('jwt', { session: false }), paymentController.addPayment);

router.get('/getall', passport.authenticate('jwt', { session: false }), paymentController.getPayments);

router.get('/getone', passport.authenticate('jwt', { session: false }), paymentController.getPaymentById);

router.put('/deactivate', passport.authenticate('jwt', { session: false }), paymentController.deactivatePayment);

module.exports = router;
