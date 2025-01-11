import React from 'react';

interface UserProfileProps {
    username: string;
    email: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, email }) => {
    return (
        <div style={styles.container}>
            <h1>User Profile</h1>
            <div style={styles.info}>
                <h2>{username}'s Profile</h2>
                <p><strong>Email:</strong> {email}</p>
            </div>
            <div style={styles.tabs}>
                <button style={styles.tab}>Active Parkings</button>
                <button style={styles.tab}>Receipts</button>
            </div>
            <div style={styles.content}>
                <p>Placeholder for Active Parkings or Receipts data...</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem',
        textAlign: 'center',
    },
    info: {
        marginBottom: '2rem',
    },
    tabs: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem',
    },
    tab: {
        padding: '0.5rem 1rem',
        backgroundColor: '#D3C4E3',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    content: {
        textAlign: 'left',
        marginTop: '1rem',
    },
};

export default UserProfile;
