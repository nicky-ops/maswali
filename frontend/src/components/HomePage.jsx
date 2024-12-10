import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../services/useAuth';

const HomePage = () => {
  const { isAuthenticated, handleTakeQuiz } = useAuth();

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">Login</Link>
            <Link to="/register" className="text-sm font-semibold leading-6 text-gray-900">Register</Link>
          </div>
        </nav>
      </header>

      <main className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}>
        <div className="w-full max-w-2xl p-8 bg-white bg-opacity-90 shadow-2xl rounded-3xl mt-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">Welcome to Our Platform</h1>
          <p className="mt-4 text-center text-gray-600">
            Test your programming skills with timed quizzes in various languages
          </p>

          <div className="mt-6 p-6 bg-green-100 rounded-lg border-2 border-green-500">
            <p className="text-green-900 text-lg font-semibold leading-relaxed">
              Our platform offers:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-green-800 text-lg font-medium">
              <li>Challenging timed quizzes in multiple programming languages</li>
              <li>Global leaderboards to compete with developers worldwide</li>
              <li>Track your progress and improve your skills</li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleTakeQuiz}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
            >
              Get Started
            </button>
            <a href="#" className="text-sm font-semibold text-gray-900">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </main>

      <footer className="w-full text-center p-4 bg-white bg-opacity-90 text-gray-600">
        <p>Enhance your coding skills with timed quizzes and compete with others!</p>
      </footer>
    </div>
  );
};

export default HomePage;