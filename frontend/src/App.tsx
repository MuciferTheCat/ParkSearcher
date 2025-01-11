import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Parking from './components/Parking';
import Header from './components/Header';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUsername = localStorage.getItem('username');
      const savedEmail = localStorage.getItem('email');

      if (savedToken && savedUsername && savedEmail) {
        setIsLoggedIn(true);
        setToken(savedToken);
        setUsername(savedUsername);
        setEmail(savedEmail);
      }
    } catch (error) {
      console.error('Failed to retrieve login state:', error);
    }
  }, []);
  const handleLogin = (jwtoken: string, username: string, email: string) => {
    setIsLoggedIn(true);
    setToken(jwtoken);
    setUsername(username);
    setEmail(email);

    localStorage.setItem('token', jwtoken);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setToken('');

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  };

  return (
    <Router>
      <div style={styles.app}>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div style={styles.content}>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ height: '100%', width: '1500px', margin: '0 auto' }}>
                  <Map />
                </div>
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  onLogin={handleLogin} // Update login state with user details
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <UserProfile username={username} email={email} />
                ) : (
                  <div>Please log in to access your profile.</div>
                )
              }
            />
            <Route
              path="/parking"
              element={<Parking isLoggedIn={isLoggedIn} token={token} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  app: {
    backgroundColor: '#F5F5DC',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    marginTop: '100px',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;
