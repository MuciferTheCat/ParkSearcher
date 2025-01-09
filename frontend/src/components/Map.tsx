// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import { getParkingSpaces, ParkingSpace } from '../../services/api/searchService';

// // Fix Leaflet marker icon issues
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
// });

// const Map: React.FC = () => {
//     const [parkingSpaces, setParkingSpaces] = useState<ParkingSpace[]>([]);
//     const [error, setError] = useState<string | null>(null);

//     const ljubljanaCenter = { lat: 46.056946, lng: 14.505751 }; // Coordinates for Ljubljana city center

//     useEffect(() => {
//         const fetchParkingSpaces = async () => {
//             try {
//                 const data = await getParkingSpaces(ljubljanaCenter.lat, ljubljanaCenter.lng, 1000);
//                 setParkingSpaces(data);
//                 console.log(data);
//             } catch (err) {
//                 setError('Failed to fetch parking spaces');
//             }
//         };

//         fetchParkingSpaces();
//     }, []);

//     return (
//         <div>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <MapContainer center={[ljubljanaCenter.lat, ljubljanaCenter.lng]} zoom={15} style={{ height: '500px', width: '100%' }}>
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 {parkingSpaces.map((parking) => (
//                     <Marker key={parking.id} position={[parking.center.lat, parking.center.lon]}>
//                         <Popup>
//                             <b>ID:</b> {parking.id}
//                             <br />
//                             <b>Tags:</b> {JSON.stringify(parking.tags)}
//                         </Popup>
//                     </Marker>
//                 ))}
//             </MapContainer>
//         </div>
//     );
// };

import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const Map: React.FC = () => {
    const ljubljanaCenter = { lat: 46.056946, lng: 14.505751 };

    return (
        <MapContainer center={[ljubljanaCenter.lat, ljubljanaCenter.lng]} zoom={13} style={{ height: '500px' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
};

export default Map;
