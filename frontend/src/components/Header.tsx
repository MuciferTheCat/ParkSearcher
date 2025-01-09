import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    isLoggedIn: boolean; // Prop to indicate if the user is logged in
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    return (
        <header style={styles.header}>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>Parking Finder</h1>
            </div>
            <nav style={styles.nav}>
                <Link to="/" style={styles.link}>
                    Home
                </Link>
                <Link to="/login" style={styles.link}>
                    Login
                </Link>
                <Link to="/register" style={styles.link}>
                    Register
                </Link>
                {isLoggedIn ? (
                    <Link to="/profile" style={styles.link}>
                        Profile
                    </Link>
                ) : (
                    <span style={{ ...styles.link, ...styles.lighter }}>Profile</span>
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
        backgroundColor: '#DBB1BC', // Light pink for the title bar
        padding: '1rem',
        textAlign: 'left',
        paddingLeft: '2rem', // Slight left alignment for the title
    },
    title: {
        margin: 0,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: '#8F95D3', // Muted blue for title text
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#D3C4E3', // Light lavender for the navigation bar
        padding: '0.5rem 1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#58504A', // Dark gray for navigation link text
        marginRight: '2rem',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        transition: 'color 0.3s ease',
    },
    lighter: {
        opacity: 0.6, // Makes the Profile link lighter
        cursor: 'not-allowed', // Indicate it’s disabled
    },
};

export default Header;
