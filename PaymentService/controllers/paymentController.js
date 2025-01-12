const Payment = require('../models/Payment');

exports.addPayment = async (request, result) => {
  const { amount } = request.body;
  email = request.user.email

  try {
    isActive = true 
    if (amount == 0){
      isActive = false
    }

    date = new Date();

    const new_payment = new Payment({email, amount, date, isActive});
    await new_payment.save();

    console.log('New payment created successfully')
    result.status(201).json({ message: 'New payment created successfully' });
  } catch (err) {
    console.log('Server error')
    result.status(500).json({ message: 'Server error:', error: err });
  }
};

exports.deactivatePayment = async (request, result) => {
  const { id } = request.body;

  try {
    const currentPayment = await Payment.findById(id);

    if (!currentPayment) {
      console.log('No payment with this id');
      return result.status(404).json({ message: 'No payment with this id' });
    }

    if (!currentPayment.isActive) {
      console.log('This payment is already settled');
      return result.status(404).json({ message: 'This payment is already settled' });
    }

    currentPayment.isActive = false;
    await currentPayment.save();

    console.log('Payment settled successfully');
    result.status(200).json({ message: 'Payment settled successfully' });
  } catch (err) {
    console.log('Server error');
    result.status(500).json({ message: 'Server error:', error: err });
  }
};

exports.getPayments = async (request, result) => {
  //const { email } = request.body;
  email = request.user.email

  try {
    console.log('Start');
    const paymentEntries = await Payment.find({ email });

    console.log('Found');

    if (!paymentEntries) {
      console.log('No payments found for this email');
      return result.status(404).json({ message: 'No payments found for this email' });
    }

    console.log('Checked');

    console.log('Payments found successfully');
    return result.status(200).json(paymentEntries);
  } catch (err) {
    console.log('Server error');
    result.status(500).json({ message: 'Server error:', error: err });
  }
};

exports.getPaymentById = async (request, result) => {
  const { id } = request.body;

  try {
    const currentPayment = await Payment.findById(id);

    if (!currentPayment) {
      console.log('No payment with this id');
      return result.status(404).json({ message: 'No payment with this id' });
    }

    console.log('Payment found successfully');
    return result.status(200).json(currentPayment);
  } catch (err) {
    console.log('Server error');
    result.status(500).json({ message: 'Server error:', error: err });
  }
};