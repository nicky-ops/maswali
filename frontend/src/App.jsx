import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Homepage from './components/HomePage';  
import UserDetail from './components/UserDetail';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import UserProfile from './components/UserProfile';
import QuizList from './components/QuizList';
import CategoryQuizzes from './components/CategoryQuizzes';
import QuizPage from './components/QuizPage.jsx'; 
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
    window.location.href = '/login'; 
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-white shadow">
          <Link to="/" className="mr-4 hover:text-blue-500">Home</Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className="mr-4 hover:text-blue-500">Profile</Link>
              <button onClick={handleLogout} className="hover:text-blue-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:text-blue-500">Login</Link>
              <Link to="/register" className="mr-4 hover:text-blue-500">Signup</Link>
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
          <Route path="/quiz-category/:categoryId" element={
            <ProtectedRoute>
              <CategoryQuizzes />
            </ProtectedRoute>
          } />
          <Route path="/quizzes/:quizId" element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          } />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* Add a default route to handle unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <footer className="bg-white shadow mt-8">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <p>&copy; 2024 Maswali Quiz app. All rights reserved.</p>
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
