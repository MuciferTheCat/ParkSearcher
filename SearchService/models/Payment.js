const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({  
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;