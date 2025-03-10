import React, { useEffect, useState } from "react";
import { Tabs, Tab, Container, Modal, Button, Form } from "react-bootstrap";
import { getActiveParking } from '../services/api/parkingService';
import { fetchPayments } from "../services/api/paymentService";
import {
  endActiveParking,
  updateParkingDuration,
} from "../services/api/parkingService";
import { Payment } from "../services/types/payment";
import { Parking } from "../services/types/parking";
import { UserProfileProps } from "../services/types/user";

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  email,
  token,
}) => {
  const [activeParking, setActiveParking] = useState<Parking | null>(null);
  const [newEndTime, setNewEndTime] = useState<string>("");
  const [isEditingTime, setIsEditingTime] = useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveParking = async () => {
    try {
      const data = await getActiveParking();
      setActiveParking(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch active parking data.");
      }
    }
  };

  const fetchUserPayments = async () => {
    try {
      const fetchedPayments = await fetchPayments(token);
      setPayments(fetchedPayments);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch payments. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchActiveParking();
    fetchUserPayments();
  }, [token]);

  useEffect(() => {
    if (activeParking) {
      const now = new Date();
      const end = new Date(activeParking.endTime);
      const remainingTime = end.getTime() - now.getTime();

      if (remainingTime > 0) {
        const timeout = setTimeout(() => {
          setActiveParking(null);
          alert("Your parking session has ended.");
        }, remainingTime);

        return () => clearTimeout(timeout);
      } else {
        setActiveParking(null);
        alert("Your parking session has ended.");
      }
    }
  }, [activeParking]);

  const calculateRemainingDuration = (endTime: string): string => {
    const now = new Date();
    const end = new Date(endTime);
    const remainingTime = Math.max(0, end.getTime() - now.getTime());
    const minutes = Math.floor(remainingTime / 60000);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours} hrs ${remainingMinutes} mins`;
  };

  const handleEndParking = async () => {
    try {
      await endActiveParking(token);
      setActiveParking(null);
      alert("Parking ended successfully.");
    } catch (err) {
      alert("Failed to end parking. Please try again.");
    }
  };

  const handleUpdateDuration = async () => {
    if (!newEndTime) {
      alert("Please select a new end time.");
      return;
    }

    const selectedEndTime = new Date(newEndTime);
    const now = new Date();

    if (selectedEndTime <= now) {
      alert("End time cannot be before the current time.");
      return;
    }

    const duration = Math.ceil(
      (selectedEndTime.getTime() -
        new Date(activeParking!.startTime).getTime()) /
      60000
    );

    try {
      const updatedParking = await updateParkingDuration(token, { duration });
      if (updatedParking) {
        await fetchActiveParking();
        setIsEditingTime(false);
        setNewEndTime("");
        alert("Parking duration updated successfully.");
      } else {
        alert("Failed to update parking duration. Please try again.");
      }
    } catch (err) {
      alert("Error updating parking duration. Please try again.");
    }
  };

  const handlePaymentClick = (payment: Payment) => {
    setSelectedPayment(payment);
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
  };

  return (
    <Container
      className="mt-5"
      style={{ padding: "2rem", borderRadius: "8px" }}
    >
      <div className="bg-white p-4 rounded shadow-sm">
        <h1 className="text-center" style={{ color: "#8F95D3" }}>
          Welcome, {username}
        </h1>
        <p className="text-center" style={{ color: "#58504A" }}>
          {email}
        </p>
        {error && <p className="text-danger">{error}</p>}
        <Tabs
          defaultActiveKey="parkings"
          id="profile-tabs"
          className="mb-3"
          style={{ borderBottom: "2px solid #DBB1BC" }}
        >
          <Tab eventKey="parkings" title="Parkings" tabClassName="custom-tab">
            <h3 style={{ color: "#8F95D3" }}>Active Parking</h3>
            {activeParking ? (
              <div className="p-3 bg-light rounded">
                <p>
                  <strong>Parking Place:</strong> {activeParking.parkplaceID}
                </p>
                <p>
                  <strong>Car Registration:</strong>{" "}
                  {activeParking.carRegistration}
                </p>
                <p>
                  <strong>Duration:</strong> {activeParking.duration} mins
                </p>
                <p>
                  <strong>Remaining Time:</strong>{" "}
                  {calculateRemainingDuration(activeParking.endTime)}
                </p>
                {isEditingTime ? (
                  <>
                    <Form.Group controlId="formEndTime" className="mt-3">
                      <Form.Label>New End Time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={newEndTime}
                        onChange={(e) => setNewEndTime(e.target.value)}
                      />
                    </Form.Group>
                    <Button
                      style={{
                        backgroundColor: "#89daff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                      }}
                      className="mt-4"
                      onClick={handleUpdateDuration}
                    >
                      Confirm Changes
                    </Button>
                  </>
                ) : (
                  <Button
                    style={{
                      backgroundColor: "#8f95d3",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                    }}
                    className="mt-4"
                    onClick={() => setIsEditingTime(true)}
                  >
                    Change Time
                  </Button>
                )}
                <Button
                  style={{
                    backgroundColor: "#ff4d4d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                  }}
                  className="mt-4 ms-2"
                  onClick={handleEndParking}
                >
                  End Parking
                </Button>
              </div>
            ) : (
              <p>No active parking session found.</p>
            )}
          </Tab>
          <Tab eventKey="payments" title="Payments" tabClassName="custom-tab">
            <h3 style={{ color: "#8F95D3" }}>Your Payments</h3>
            {error && <p className="text-danger">{error}</p>}
            {payments && payments.length > 0 ? (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {payments.map((payment) => (
                  <li
                    key={payment.id}
                    style={{
                      backgroundColor: payment.isActive ? "#ffffff" : "#e9ecef",
                      color: payment.isActive ? "#000000" : "#6c757d",
                      padding: "1rem",
                      border: "1px solid #dee2e6",
                      borderRadius: "5px",
                      marginBottom: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handlePaymentClick(payment)}
                  >
                    <b>Payment ID:</b> {payment.id}
                    <br />
                    <b>Status:</b> {payment.isActive ? "Active" : "Completed"}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payments found.</p>
            )}
          </Tab>
        </Tabs>
      </div>

      {selectedPayment && (
        <Modal show onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <b>Email:</b> {selectedPayment.email}
            </p>
            <p>
              <b>Amount:</b> {(selectedPayment.amount / 100).toFixed(2)} EUR
            </p>
            <p>
              <b>Date:</b> {new Date(selectedPayment.date).toLocaleString()}
            </p>
            <p>
              <b>Status:</b> {selectedPayment.isActive ? "Active" : "Completed"}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default UserProfile;
