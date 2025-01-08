// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UserProfile from './components/user/UserProfile';
import Map from './components/map/Map';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navigation Header */}
        <header style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          <nav>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
            <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
          </nav>
        </header>

        {/* Main Application Routes */}
        <main style={{ padding: '10px' }}>
          <Routes>
            <Route path="/" element={<Map />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile userId="123" token="sample_token" />} />
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
