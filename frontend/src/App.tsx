import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  // const [token, setToken] = useState<string | null>(null);
  // const [userId, setUserId] = useState<string | null>(null);

  // const handleLogin = (authToken: string, userId: string) => {
  //   setToken(authToken);
  //   setUserId(userId);
  // };

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <Router>
      <div style={styles.app}>
        <Header isLoggedIn={isLoggedIn} />
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
                  onLogin={() => setIsLoggedIn(true)} // Set login state to true after successful login
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <UserProfile userId="123" token="fake-token" />
                ) : (
                  <div>Please log in to access your profile.</div>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const styles = {
  app: {
    backgroundColor: '#F5F5DC', // Soft beige background
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    marginTop: '100px', // Space for fixed header
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default App;