import React, { useEffect, useState } from 'react';
import api from '../services/api'; 

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Get token from localStorage
        if (!token) {
          setError('Authentication token is missing.');
          return;
        }

        // Include token in the request headers
        const response = await api.get('quiz/quizzes/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuizzes(response.data);
      } catch (error) {
        setError('Error fetching quizzes.');
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <h1>Quizzes</h1>
      {error && <p>{error}</p>}
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>{quiz.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
