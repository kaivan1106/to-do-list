// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Updated imports
import Auth from './components/Auth';  // Correct import of Auth.js
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is already authenticated by checking the token in localStorage
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    // Store token and set authentication state
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    // Remove token and update authentication state
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth page for login and signup */}
          <Route path="/auth" element={isAuthenticated ? <Navigate to="/tasks" /> : <Auth onLogin={handleLogin} />} />
          
          {/* Task list page */}
          <Route path="/tasks" element={isAuthenticated ? <TaskList onLogout={handleLogout} /> : <Navigate to="/auth" />} />

          {/* Default redirect to auth page */}
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
