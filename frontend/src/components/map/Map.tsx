// src/components/map/Map.tsx

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getParkingSpaces, ParkingSpace } from '../../services/api/searchService';

// Fixes Leaflet marker icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapProps {
    userId?: string;
    token?: string;
}

const Map: React.FC<MapProps> = ({ userId, token }) => {
    const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>([]);
    const [error, setError] = useState<string | null>(null);

    const initialPosition = { lat: 46.053757, lng: 14.470413 };

    useEffect(() => {
        const fetchParkingSpaces = async () => {
            try {
                const data = await getParkingSpaces(initialPosition.lat, initialPosition.lng, 1000);
                setParkingSpaces(data);
            } catch (err) {
                setError('Failed to fetch parking spaces');
            }
        };

        fetchParkingSpaces();
    }, []);

    return (
        <div>
            {userId && token && <p>Welcome, User {userId}!</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <MapContainer center={[initialPosition.lat, initialPosition.lng]} zoom={15} style={{ height: '500px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {parkingSpaces.map((parking) => (
                    <Marker key={parking.id} position={[parking.center.lat, parking.center.lon]}>
                        <Popup>
                            <b>ID:</b> {parking.id}
                            <br />
                            <b>Tags:</b> {JSON.stringify(parking.tags)}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
