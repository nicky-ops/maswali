import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from './Leaderboard'; // Ensure the correct path to your Leaderboard component

const HomePage = () => {
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
        <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to the Homepage</h1>
        <p className="mt-4 text-center text-gray-600">
          Explore our features and enjoy your stay.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/quiz" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300">
            Start Quiz
          </Link>
        </div>
      </div>

      <div className="w-full max-w-2xl p-8 bg-white bg-opacity-90 shadow-2xl rounded-3xl my-2">
        <h2 className="text-2xl font-bold text-center text-gray-800">Leaderboard</h2>
        <Leaderboard />
      </div>
    </div>
  );
};

export default HomePage;