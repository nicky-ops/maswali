// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Leaderboard from './Leaderboard';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('accessToken'); // Updated to check 'accessToken'
    
    // Log the token to verify it exists
    console.log('Token:', token);
    
    setIsAuthenticated(!!token); // Set isAuthenticated to true if token exists
    console.log('Is Authenticated:', !!token); // Log the authentication state
  };

  const handleTakeQuiz = () => {
    if (isAuthenticated) {
      navigate('/quizzes');
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Listen to changes in localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen bg-green-500 bg-opacity-50"
      style={{
        backgroundImage: 'url(/path/to/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="w-full max-w-2xl p-8 bg-white bg-opacity-90 shadow-2xl rounded-3xl mt-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Maswali</h1>
        <p className="mt-4 text-center text-gray-600">
          Test your programming skills with timed quizzes in various languages
        </p>

        <div className="mt-6 p-6 bg-green-100 rounded-lg border-2 border-green-500">
          <p className="text-green-900 text-lg font-semibold leading-relaxed">
            Maswali is your gateway to coding excellence! Here is  what we offer:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-green-800 text-lg font-medium">
            <li>Challenging timed quizzes in multiple programming languages</li>
            <li>Global leaderboards to compete with developers worldwide</li>
            <li>Tailored difficulty levels for beginners and experts alike</li>
            <li>An engaging platform to sharpen your coding skills daily</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleTakeQuiz}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
            >
              Take Quiz
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="w-full max-w-2xl p-8 bg-white bg-opacity-90 shadow-2xl rounded-3xl my-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Top Programmers</h2>
        <Leaderboard />
      </div>

      <footer className="w-full text-center p-4 bg-white bg-opacity-90 text-gray-600">
        <p>Enhance your coding skills with timed quizzes and compete with others!</p>
      </footer>
    </div>
  );
};

export default HomePage;
