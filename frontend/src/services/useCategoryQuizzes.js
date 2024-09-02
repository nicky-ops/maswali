import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import useAuth from '../services/useAuth';

const useCategoryQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [category, setCategory] = useState(null);
  const [error, setError] = useState('');
  const { categoryId } = useParams();
  const { isAuthenticated } = useAuth(); // Use the useAuth hook
  const navigate = useNavigate();

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

  const handleStartQuiz = (quizId) => {
    if (isAuthenticated) {
      navigate(`/quizzes/${quizId}`);
    } else {
      navigate('/login');
    }
  };

  return { quizzes, category, error, handleStartQuiz };
};

export default useCategoryQuizzes;
