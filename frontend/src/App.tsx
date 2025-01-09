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
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const handleLogin = (authToken: string, userId: string) => {
    setToken(authToken);
    setUserId(userId);
  };

  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div style={{ height: '500px', width: '500px', margin: '0 auto' }}>
                <Map />
              </div>
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/profile"
            element={<UserProfile userId="123" token="fake-token" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;