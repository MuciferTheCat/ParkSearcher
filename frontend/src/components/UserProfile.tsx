import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';

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
                    credentials: 'include',
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
        <Container className="mt-5">
            <div className="bg-white p-4 rounded shadow-sm">
                <h1 className="text-center">Welcome, {username}</h1>
                <p className="text-center">{email}</p>
                {error && <p className="text-danger">{error}</p>}
                <Tabs defaultActiveKey="parkings" id="profile-tabs" className="mb-3">
                    <Tab eventKey="parkings" title="Parkings">
                        <h3>Active Parking</h3>
                        {activeParking ? (
                            <div className="p-3 bg-light rounded">
                                <p><strong>Parking Place:</strong> {activeParking.parkplaceID}</p>
                                <p><strong>Car Registration:</strong> {activeParking.carRegistration}</p>
                                <p><strong>Duration:</strong> {activeParking.duration} mins</p>
                                <p><strong>Remaining Time:</strong> {calculateRemainingDuration(activeParking.endTime)}</p>
                            </div>
                        ) : (
                            <p>No active parking session found.</p>
                        )}
                    </Tab>
                    <Tab eventKey="payments" title="Payments">
                        <h3>Payments</h3>
                        <p>Payment information will be displayed here...</p>
                    </Tab>
                </Tabs>
            </div>
        </Container>
    );
};

export default UserProfile;
