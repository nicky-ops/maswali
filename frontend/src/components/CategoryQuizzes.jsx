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
        setQuizzes(response.data.quizzes); // Assuming quizzes are nested under category
      } catch (error) {
        setError('Error fetching quizzes. Please try again.');
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchCategoryQuizzes();
  }, [categoryId]);

  if (!category) return <div>Loading...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Quizzes in {category.name}</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white p-4 rounded shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p>Time Limit: {quiz.time_limit} seconds</p>
            <Link 
              to={`/quizzes/${quiz.id}`} 
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 inline-block"
            >
              Start Quiz
            </Link>
          </div>
        ))}
      </div>
      <Link to="/quizzes" className="mt-4 inline-block text-blue-500 hover:text-blue-700">Back to Categories</Link>
    </div>
  );
}

export default CategoryQuizzes;