import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header style={styles.header}>
            <div style={styles.titleContainer}>
                <h1 style={styles.title}>ParkSearcher</h1>
            </div>
            <nav style={styles.nav}>
                <Link to="/" style={styles.link}>
                    Home
                </Link>
                <Link to="/login" style={styles.link}>
                    Login
                </Link>
                <Link to="/profile" style={styles.link}>
                    Profile
                </Link>
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
        backgroundColor: '#DBB1BC', // Light Pink for the title bar
        padding: '1rem',
        textAlign: 'left',
        paddingLeft: '2rem', // Slight left alignment for the title
    },
    title: {
        margin: 0,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
        //textTransform: 'uppercase',
        color: 'black', // Muted Blue for title text
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#D3C4E3', // Light Lavender for the navigation bar
        padding: '0.5rem 1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#58504A', // Dark Gray for navigation link text
        marginRight: '2rem',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        transition: 'color 0.3s ease',
    },
    linkHover: {
        color: '#89DAFF', // Bright Blue for hover effect
    },
};

export default Header;
