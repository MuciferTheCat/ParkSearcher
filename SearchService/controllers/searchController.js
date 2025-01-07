//const Payment = require('../models/Payment');
const axios = require('axios');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const getParkingSpaces = async (req, res) => {
    try {
        const { address, lat, lng, radius = 5000 } = req.query;

        let latitude = lat;
        let longitude = lng;

        if (address) {
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_API_KEY}`;
            const geocodeResponse = await axios.get(geocodeUrl);

            if (geocodeResponse.data.status !== 'OK') {
                return res.status(400).json({ error: 'Failed to geocode address' });
            }

            const location = geocodeResponse.data.results[0].geometry.location;
            latitude = location.lat;
            longitude = location.lng;
        }

        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Invalid coordinates or address' });
        }

        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=parking&key=${GOOGLE_API_KEY}`;
        const placesResponse = await axios.get(placesUrl);

        if (placesResponse.data.status !== 'OK') {
            return res.status(400).json({ error: 'Failed to fetch parking spaces' });
        }

        // Step 3: Process results
        const parkingSpaces = placesResponse.data.results.map(place => ({
            name: place.name,
            address: place.vicinity,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            rating: place.rating || 'N/A',
        }));

        // Step 4: Send response to frontend
        res.status(200).json({ parkingSpaces });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching parking spaces' });
    }
};

module.exports = { getParkingSpaces };