// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function QuizList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('quiz/categories/');
        setCategories(response.data);
      } catch (error) {
        setError('Error fetching categories. Please try again.');
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-green-500 bg-opacity-50"
      style={{
        backgroundImage: 'url(/path/to/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="w-full max-w-4xl p-8 bg-white bg-opacity-90 shadow-2xl rounded-3xl mt-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Quiz Categories</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{category.name}</h2>
              <Link 
                to={`/quiz-category/${category.id}`} 
                className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
              >
                View Quizzes
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuizList;