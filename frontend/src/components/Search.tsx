import React, { useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getParkingSpaces } from "../services/api/searchService";
import { ParkingSpace } from "../services/types/search";

const Map: React.FC = () => {
  const [latitude, setLatitude] = useState<number>(46.056946); // Default to Ljubljana
  const [longitude, setLongitude] = useState<number>(14.505751); // Default to Ljubljana
  const [radius, setRadius] = useState<number>(500); // Default radius
  const [parkingPlaces, setParkingPlaces] = useState<ParkingSpace[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await getParkingSpaces(latitude, longitude, radius);
      setParkingPlaces(response);
      setError(null);
    } catch (err) {
      setError("Failed to fetch parking spaces. Please try again.");
    }
  };

  return (
    <div>
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
};

export default Map;
