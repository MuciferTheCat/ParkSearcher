import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../../services/api/userService';
import { User } from '../../services/types/user';

interface UserProfileProps {
    userId: string;
    token: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, token }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile(userId, token);
                setUser(userData);
                setError(null);
            } catch (err) {
                setError('Failed to load user profile.');
            }
        };

        fetchUserProfile();
    }, [userId, token]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{user.username}'s Profile</h2>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;