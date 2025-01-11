//const Payment = require('../models/Payment');
const fetch = require('node-fetch');
//import fetch from 'node-fetch';

const getParkingSpaces = async (request, result) => {
    const { lat, lng, radius = 500 } = request.body;

    try {
        if (!lat || !lng) {
            return result.status(400).json({ error: 'Latitude and Longitude are required' });
        }

        const overpassQuery = `
            [out:json]
            [timeout:25]
            ;
            nwr
              ["amenity"="parking"]
              ["access"="yes"]
              (around:${radius},${lat},${lng});
            out center;
        `;

        const response = await fetch("https://overpass-api.de/api/interpreter", {
            method: "POST",
            body: "data=" + encodeURIComponent(overpassQuery),
        });

        if (!response.ok) {
            return result.status(500).json({ error: 'Failed to fetch data from Overpass API' });
        }

        const res = await response.json();

        const parkingSpaces = res.elements.map(el => ({
            id: el.id,
            tags: el.tags,
            center: el.center,
        }));

        result.status(200).json({ parkingSpaces });
    } catch (error) {
        console.error('Error fetching parking spaces:', error);
        result.status(500).json({ error: 'An error occurred while fetching parking spaces' });
    }
};

module.exports = { getParkingSpaces };
