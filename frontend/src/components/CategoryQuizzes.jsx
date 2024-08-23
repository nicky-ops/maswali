import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function CategoryQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState('');
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategoryQuizzes = async () => {
      try {
        const response = await api.get(`quiz/categories/${categoryId}/`);
        setCategory(response.data);
        setQuizzes(response.data.quizzes); 
      } catch (error) {
        setError('Error fetching quizzes. Please try again.');
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchCategoryQuizzes();
  }, [categoryId]);

  if (!category) return <div className="text-center mt-8">Loading...</div>;

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
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Quizzes in {category.name}</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{quiz.title}</h2>
              <p className="text-gray-600 mb-4">Time Limit: {quiz.time_limit} seconds</p>
              <Link 
                to={`/quizzes/${quiz.id}`} 
                className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300"
              >
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link 
            to="/quizzes" 
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryQuizzes;