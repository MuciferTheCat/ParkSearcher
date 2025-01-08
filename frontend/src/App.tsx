// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/user/Register';
import Login from './components/user/Login';
import UserProfile from './components/user/UserProfile';
import Map from './components/map/Map';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = (authToken: string, userId: string) => {
    setToken(authToken);
    setUserId(userId);
  };

  return (
    <Router>
      <div>
        {/* Navigation Header */}
        <header style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          <nav>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to={`/profile/${userId}`} style={{ marginRight: '10px' }}>Profile</Link>
          </nav>
        </header>

        {/* Main Application Routes */}
        <main style={{ padding: '10px' }}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Map />} />

            {/* User Registration and Login */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* User Profile */}
            <Route
              path="/profile/:id"
              element={
                userId && token ? (
                  <UserProfile userId={userId} token={token} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer style={{ padding: '10px', textAlign: 'center', backgroundColor: '#f8f9fa', borderTop: '1px solid #ddd' }}>
          <p>&copy; 2025 ParkSearcher. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
