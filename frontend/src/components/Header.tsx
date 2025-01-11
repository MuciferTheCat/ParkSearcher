import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

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
        <Navbar expand="lg" className="shadow-sm rounded mb-4 mx-auto w-100" style={{ backgroundColor: '#DBB1BC', maxWidth: '1200px' }}>
            <Container>
                <Navbar.Brand
                    href="/"
                    className="fw-bold"
                    style={{
                        color: '#58504A',
                        fontSize: '2rem', // Adjusted title size
                        letterSpacing: '1px',
                    }}
                >
                    Parking Finder
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/" className="fw-bold" style={{ color: '#58504A' }}>
                            Home
                        </Nav.Link>
                        {!isLoggedIn ? (
                            <>
                                <Nav.Link as={Link} to="/login" className="fw-bold" style={{ color: '#8F95D3' }}>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register" className="fw-bold" style={{ color: '#8F95D3' }}>
                                    Register
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/profile" className="fw-bold" style={{ color: '#58504A' }}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link
                                    as="button"
                                    onClick={handleLogout}
                                    className="btn text-white fw-bold ms-2"
                                    style={{ backgroundColor: '#8F95D3' }}
                                >
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
