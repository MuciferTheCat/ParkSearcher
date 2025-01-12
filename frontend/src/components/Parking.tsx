import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CSSProperties } from "react";
import { ParkingDetails, ParkingProps } from "../services/types/parking";

const Parking: React.FC<ParkingProps> = ({ isLoggedIn, token }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract parking data from navigation state
  const { parkingData }: { parkingData: ParkingDetails } = location.state || {};

  const [useCurrentTime, setUseCurrentTime] = useState<boolean>(true);
  const [startTime, setStartTime] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [endTime, setEndTime] = useState<string>("");
  const [carRegistration, setCarRegistration] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  // Automatically set default end time (1 hour after start time)
  useEffect(() => {
    const current = new Date();
    const end = new Date(current.getTime() + 60 * 60 * 1000); // 1 hour later
    setEndTime(end.toISOString().slice(0, 16));
  }, []);

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleConfirmParking = async () => {
    if (!isLoggedIn) {
      setShowPrompt(true);
      return;
    }

    if (!parkingData || !parkingData.id) {
      setError("No parking place selected.");
      return;
    }

    try {
      const duration =
        (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000; // Duration in minutes
      const response = await fetch("http://localhost:5001/api/parking/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          parkplaceID: parkingData.id,
          carRegistration,
          duration,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm parking.");
      }

      navigate("/profile"); // Redirect to profile after successful parking
    } catch (err) {
      setError("Error confirming parking. Please try again.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="bg-white p-4 rounded shadow-sm w-100"
        style={{ maxWidth: "600px" }}
      >
        <h1>Confirm Parking</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        <div style={styles.details}>
          <p>
            <strong>Name:</strong> {parkingData?.tags?.name || "Unknown"}
          </p>
          <p>
            <strong>City:</strong>{" "}
            {parkingData?.tags?.["addr:city"] || "Not specified"}
          </p>
          <p>
            <strong>Street:</strong>{" "}
            {parkingData?.tags?.["addr:street"] || "Not specified"}
          </p>
          <p>
            <strong>Capacity:</strong>{" "}
            {parkingData?.tags?.capacity || "Unknown"}
          </p>
          <p>
            <strong>Fee:</strong> {parkingData?.tags?.fee || "Unknown"}
          </p>
          <p>
            <strong>Type:</strong>{" "}
            {parkingData?.tags?.parking === "underground"
              ? "Garažna hiša"
              : "Parkirišče"}
          </p>
        </div>
        <div style={styles.timeSelection}>
          <h3>Select Parking Time</h3>
          <div style={styles.timeGroup}>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="startTime"
                  checked={useCurrentTime}
                  onChange={() => setUseCurrentTime(true)}
                />
                Use Current Time
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="startTime"
                  checked={!useCurrentTime}
                  onChange={() => setUseCurrentTime(false)}
                />
                Select Start Time:
              </label>
            </div>
            {!useCurrentTime && (
              <input
                type="datetime-local"
                value={startTime}
                onChange={handleStartTimeChange}
                style={styles.input}
              />
            )}
          </div>
          <div style={styles.timeGroup}>
            <label>
              End Time:
              <input
                type="datetime-local"
                value={endTime}
                onChange={handleEndTimeChange}
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.timeGroup}>
            <label>
              Car Registration:
              <input
                type="text"
                value={carRegistration}
                onChange={(e) => setCarRegistration(e.target.value)}
                required
                style={styles.input}
              />
            </label>
          </div>
          <div style={styles.timeGroup}>
            <button onClick={handleConfirmParking} style={styles.button}>
              Confirm Parking
            </button>
          </div>
        </div>
        {showPrompt && (
          <div style={styles.promptOverlay}>
            <div style={styles.prompt}>
              <h3>You must be logged in to confirm parking</h3>
              <button
                onClick={() => navigate("/login")}
                style={styles.promptButton}
              >
                Go to Login
              </button>
              <button onClick={() => navigate("/")} style={styles.promptButton}>
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  timeSelection: {
    marginBottom: "1rem",
    textAlign: "left",
  },
  timeGroup: {
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
  },
  radioGroup: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.5rem",
    margin: "0.5rem 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#8F95D3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Parking;
