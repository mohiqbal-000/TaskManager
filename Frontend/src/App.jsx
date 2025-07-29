import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css'; // Make sure this exists

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") setDarkMode(true);
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  // Load user safely from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.username) {
          setLoggedInUser(parsedUser);
        }
      }
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      localStorage.removeItem("user");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLoggedInUser(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
        <h1 className="logo">🗂️ Task Manager</h1>
        <div className="nav-links">
          <Link to="/task">📋 Task List</Link>
          <Link to="/create">➕ Add Task</Link>
          {loggedInUser && <span className="username">👤 {loggedInUser.username}</span>}
          {loggedInUser ? (
            <button onClick={handleLogout}>🚪 Logout</button>
          ) : (
            <>
              <Link to="/login">🔑 Login</Link>
              <Link to="/register">📝 Register</Link>
            </>
          )}
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      </nav>

      <div className={`content ${darkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/task" />} />
          <Route path="/task" element={<TaskList />} />
          <Route path="/create" element={<AddTask />} />
          <Route path="/update/:id" element={<EditTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
