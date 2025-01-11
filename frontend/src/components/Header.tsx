import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
    isLoggedIn: boolean;
    onLogout: () => void; // Logout function passed from App
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout(); // Call the parent function to reset state
        navigate('/'); // Redirect to home page
    };

    return (
        <header style={styles.header}>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>Parking Finder</h1>
            </div>
            <nav style={styles.nav}>
                <Link to="/" style={styles.link}>
                    Home
                </Link>
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" style={styles.link}>
                            Login
                        </Link>
                        <Link to="/register" style={styles.link}>
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" style={styles.link}>
                            Profile
                        </Link>
                        <button onClick={handleLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    );
};

const styles = {
    header: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    titleContainer: {
        backgroundColor: '#DBB1BC',
        padding: '1rem',
        textAlign: 'left',
        paddingLeft: '2rem',
    },
    title: {
        margin: 0,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#8F95D3',
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#D3C4E3',
        padding: '0.5rem 1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#58504A',
        marginRight: '2rem',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        transition: 'color 0.3s ease',
    },
    logoutButton: {
        backgroundColor: '#8F95D3',
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        fontSize: '1.2rem',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default Header;
