const Parking = require("../models/Parking");

module.exports = {
  getParking: async ({ id }) => {
    return await Parking.findById(id);
  },
  getAllParkings: async () => {
    return await Parking.find();
  },
};