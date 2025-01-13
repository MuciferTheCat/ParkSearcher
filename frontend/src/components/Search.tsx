import React, { useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getParkingSpaces } from "../services/api/searchService";
import { ParkingSpace } from "../services/types/search";

const Map: React.FC = () => {
  const [city, setCity] = useState<string>("Ljubljana");
  const [latitude, setLatitude] = useState<number>(46.056946);
  const [longitude, setLongitude] = useState<number>(14.505751);
  const [radius, setRadius] = useState<number>(500);
  const [parkingPlaces, setParkingPlaces] = useState<ParkingSpace[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [useGeolocation, setUseGeolocation] = useState<boolean>(false);

  const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  };

  const geocodeCity = async (city: string): Promise<{ lat: number; lon: number } | null> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`
      );

      if (!response.ok) {
        setError("Failed to geocode city name");
        return null;
      }

      const data = await response.json();

      if (!data || data.length === 0) {
        setError("City not found");
        return null;
      }

      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    } catch (err) {
      setError("Failed to geocode city name");
      return null;
    }
  };

  const handleGeolocationClick = async () => {
    try {
      const position = await getUserLocation();
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setUseGeolocation(true);

      const response = await getParkingSpaces(
        position.coords.latitude,
        position.coords.longitude,
        radius,
        true
      );
      setParkingPlaces(response);
      setError(null);
    } catch (err) {
      setError("Failed to get your location. Please try manual input.");
      setUseGeolocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!useGeolocation) {
        const coordinates = await geocodeCity(city);
        if (!coordinates) return;

        setLatitude(coordinates.lat);
        setLongitude(coordinates.lon);

        const response = await getParkingSpaces(
          coordinates.lat,
          coordinates.lon,
          radius,
          useGeolocation
        );
        setParkingPlaces(response);
        setError(null);
      } else {
        const response = await getParkingSpaces(
          latitude,
          longitude,
          radius,
          useGeolocation
        );
        setParkingPlaces(response);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch parking spaces. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.searchOptions}>
          <button
            type="button"
            onClick={handleGeolocationClick}
            style={styles.locationButton}
          >
            Use My Location
          </button>
          <span style={styles.divider}>or</span>
          <div style={styles.inputGroup}>
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setUseGeolocation(false);
              }}
              style={styles.input}
              disabled={useGeolocation}
            />
          </div>
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
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ width: "100%", height: "800px", marginTop: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {parkingPlaces
          .filter((place) => place.center)
          .map((place) => (
            <Marker
              key={place.id}
              position={[place.center!.lat, place.center!.lon]}
            >
              <Popup>
                <b>Name:</b> {place.tags.name || "Unknown Parking Place"}
                <br />
                <b>City:</b> {place.tags["addr:city"] || "Not specified"}
                <br />
                <b>Fee:</b>{" "}
                {place.tags.charge
                  ? `${place.tags.charge} EUR`
                  : place.tags.fee === "yes"
                    ? "Yes"
                    : place.tags.fee === "no"
                      ? "No"
                      : "Unknown"}
                <br />
                <b>Type:</b>{" "}
                {place.tags.parking === "underground"
                  ? "Garažna hiša"
                  : "Parkirišče"}
                <br />
                <b>Capacity:</b> {place.tags.capacity || "Unknown"}
                <br />
                <Link
                  to={`/parking`}
                  state={{
                    parkingData: place,
                  }}
                >
                  <button style={styles.startParkingButton}>
                    Start Parking
                  </button>
                </Link>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  form: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    color: "#333",
    backgroundColor: "#fff",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#8F95D3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "auto",
    alignSelf: "center",
  },
  startParkingButton: {
    padding: "0.4rem 1rem",
    fontSize: "0.9rem",
    backgroundColor: "#8F95D3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "1rem",
  },
  error: {
    color: "red",
  },
  searchOptions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  locationButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#d3c4e3',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  divider: {
    color: '#666',
    padding: '0 0.5rem',
  }
};

export default Map;
