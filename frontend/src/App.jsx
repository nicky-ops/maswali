import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Homepage from './components/Homepage';  
import UserDetail from './components/UserDetail';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UserProfile from './components/UserProfile';
import QuizList from './components/QuizList';
import QuizDetail from './components/QuizDetail';
import Leaderboard from './components/Leaderboard'; 
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(token !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-white shadow">
          <Link to="/" className="mr-4 hover:text-blue-500">Home</Link>
          <Link to="/quizzes" className="mr-4 hover:text-blue-500">Quizzes</Link>
          <Link to="/leaderboard" className="mr-4 hover:text-blue-500">Leaderboard</Link>
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
          <Route path="/" element={<Homepage />} />
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
          <Route path="/quizzes" element={
            <ProtectedRoute>
              <QuizList />
            </ProtectedRoute>
          } />
          <Route path="/quizzes/:id" element={
            <ProtectedRoute>
              <QuizDetail />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } />
          {/* Add a default route to handle unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <footer className="bg-white shadow mt-8">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <p>&copy; 2024 Your Quiz App. All rights reserved.</p>
            <div>
              <Link to="/privacy" className="mr-4 hover:text-blue-500">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-500">Terms of Service</Link>
            </div>
          </div>
        </footer>
    </Router>
  );
}

export default App;
