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
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Quiz Categories</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
            <Link 
              to={`/quiz-category/${category.id}`} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              View Quizzes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;