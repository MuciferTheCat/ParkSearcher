import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Parking {
    parkplaceID: string;
    carRegistration: string;
    duration: number;
    endTime: string;
    startTime: string;
}

interface UserProfileProps {
    username: string;
    email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, email }) => {
    const [activeParking, setActiveParking] = useState<Parking | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActiveParking = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/parking/get', {
                    method: 'GET',
                    credentials: 'include', // Include cookies for authentication
                });

                if (response.ok) {
                    const data = await response.json();
                    setActiveParking(data);
                } else {
                    setActiveParking(null);
                }
            } catch (err) {
                setError('Failed to fetch active parking data.');
            }
        };

        fetchActiveParking();
    }, []);

    const calculateRemainingDuration = (endTime: string): string => {
        const now = new Date();
        const end = new Date(endTime);
        const remainingTime = Math.max(0, end.getTime() - now.getTime());
        const minutes = Math.floor(remainingTime / 60000);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours} hrs ${remainingMinutes} mins`;
    };

    return (
        <div style={styles.container}>
            <h1>Welcome, {username}</h1>
            <p>Email: {email}</p>
            {error && <p style={styles.error}>{error}</p>}

            <Tabs defaultActiveKey="parkings" id="profile-tabs" className="mb-3">
                {/* Parkings Tab */}
                <Tab eventKey="parkings" title="Parkings">
                    <h3>Active Parking</h3>
                    {activeParking ? (
                        <div style={styles.parkingDetails}>
                            <p><strong>Parking Place:</strong> {activeParking.parkplaceID}</p>
                            <p><strong>Car Registration:</strong> {activeParking.carRegistration}</p>
                            <p><strong>Duration:</strong> {activeParking.duration} mins</p>
                            <p><strong>Remaining Time:</strong> {calculateRemainingDuration(activeParking.endTime)}</p>
                        </div>
                    ) : (
                        <p>No active parking session found.</p>
                    )}
                </Tab>

                {/* Placeholder for Other Tabs */}
                <Tab eventKey="payments" title="Payments">
                    <h3>Payments</h3>
                    <p>Payment information will be displayed here...</p>
                </Tab>
            </Tabs>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'left',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    error: {
        color: 'red',
    },
    parkingDetails: {
        padding: '1rem',
        marginBottom: '1rem',
        backgroundColor: '#e8e8e8',
        borderRadius: '5px',
    },
};

export default UserProfile;
