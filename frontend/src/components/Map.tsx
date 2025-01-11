import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getParkingSpaces } from '../services/api/searchService';

interface ParkingPlace {
  id: string;
  center?: { lat: number; lon: number }; // Center is optional
  tags: Record<string, string>;
}

const Map: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(46.056946); // Default to Ljubljana
  const [longitude, setLongitude] = useState<number>(14.505751); // Default to Ljubljana
  const [radius, setRadius] = useState<number>(500); // Default radius
  const [parkingPlaces, setParkingPlaces] = useState<ParkingPlace[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const fetchedParkingPlaces = await getParkingSpaces(latitude, longitude, radius);
      setParkingPlaces(fetchedParkingPlaces);
      setError(null);
    } catch (err) {
      setError('Failed to fetch parking spaces. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      {/* Form to input latitude, longitude, and radius */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Latitude:</label>
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(Number(e.target.value))}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Longitude:</label>
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(Number(e.target.value))}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Radius (meters):</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Search Parking Places
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {/* Map */}
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ width: '100%', height: '500px', marginTop: '20px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {parkingPlaces
          .filter((place) => place.center) // Filter out places without a center
          .map((place) => (
            <Marker key={place.id} position={[place.center!.lat, place.center!.lon]}>
              <Popup>
                <b>Name:</b> {place.tags.name || 'Unknown Parking Place'}
                <br />
                <b>Access:</b> {place.tags.access || 'Unknown'}
                <br />
                <b>Fee:</b> {place.tags.fee || 'Unknown'}
                <br />
                <b>Type:</b> {place.tags.parking || 'Unknown'}
                <br />
                <b>Capacity:</b> {place.tags.capacity || 'Unknown'}
                <br />
                <Link
                  to={`/parking`}
                  state={{
                    parkingData: place, // Pass the entire parking data object
                  }}
                >
                  <button style={styles.button}>Start Parking</button>
                </Link>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    color: '#333',
    backgroundColor: '#fff',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#8F95D3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  startParkingButton: {
    padding: '0.4rem 1rem', // Adjust padding for smaller font
    fontSize: '0.9rem', // Slightly smaller font
    backgroundColor: '#8F95D3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '1rem', // Add gap between text and button
  },
  error: {
    color: 'red',
  },
};

export default Map;
