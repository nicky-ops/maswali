import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers } from '../services/api'; // Assuming you have this function
import Leaderboard from './Leaderboard';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(token !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <nav className="p-4 bg-white shadow">
        <Link to="/" className="mr-4 hover:text-blue-500">Home</Link>
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="mr-4 hover:text-blue-500">Login</Link>
            <Link to="/register" className="mr-4 hover:text-blue-500">Register</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="mr-4 hover:text-blue-500">Profile</Link>
            <button onClick={handleLogout} className="hover:text-blue-500">Logout</button>
          </>
        )}
      </nav>
      <div className="container mx-auto p-4">
        <Leaderboard />
      </div>
    </div>
  );
};

export default HomePage;
