const Parking = require('../models/Parking');

exports.addParking = async (request, result) => {
    const { parkplaceID, email, duration, carRegistration } = request.body;
  
    try {
      if (await Parking.findOne({ email })) {
        return result.status(400).json({ message: 'This user is already parked somewhere' });
      }

      if (await Parking.findOne({ carRegistration })) {
        return result.status(400).json({ message: 'This car is already parked somewhere' });
      }

      const new_parking = new Parking({parkplaceID, email, carRegistration });
      await new_parking.save();
  
      result.status(201).json({ message: 'New parkig session created successfully' });
    } catch (err) {
        result.status(500).json({ message: 'Server error:', error: err });
    }
}; 

exports.concludeParking = async (req, res) => {
  const { email } = req.body;

  try {
    const finishedParking = await Parking.findOneAndUpdate({ email }, { endTime: Date.now() }, { new: true });

    if (!finishedParking) {
      return res.status(404).json({ message: 'Parking session not found' });
    }

    res.status(200).json({ message: 'Parking succesfully concluded' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};