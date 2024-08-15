import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UserProfile from './components/UserProfile';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('accessToken') !== null;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(token !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-white shadow">
          <Link to="/" className="mr-4 hover:text-blue-500">User List</Link>
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
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;