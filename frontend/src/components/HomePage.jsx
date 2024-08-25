import React from 'react';
import { Link } from 'react-router-dom';
import Leaderboard from './Leaderboard';

const HomePage = () => {
  const categories = ['Python', 'JavaScript', 'C'];

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
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link 
              key={category}
              to={`/quizzes/${category.toLowerCase()}`} 
              className="px-4 py-2 bg-green-600 text-white text-center rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
            >
              {category}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <Link to="/profile" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300">
            My Profile
          </Link>
          <Link to="/quizzes" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300">
            All Quizzes
          </Link>
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