const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    parkplaceID: {
      type: String,
      required: true,
    },  
    email: {
      type: String,
      required: true,
      unique: true,
    },
    carRegistration: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    price: {
      type: Number,
      default: 0,
    }
  });

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;