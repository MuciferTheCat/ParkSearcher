import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Map from './components/Map';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Parking from './components/Parking';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="container-fluid d-flex flex-column align-items-center p-4">
        <div className="bg-white p-4 rounded shadow-sm mx-auto w-100" style={{ maxWidth: '1200px' }}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
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

export default App;
