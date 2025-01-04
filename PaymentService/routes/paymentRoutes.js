const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create', paymentController.addPayment);

router.get('/getall', paymentController.getPayments);

router.get('/getone', paymentController.getPaymentById);

router.put('/deactivate', paymentController.deactivatePayment);

module.exports = router;
