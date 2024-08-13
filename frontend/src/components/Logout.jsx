// src/components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default Logout;