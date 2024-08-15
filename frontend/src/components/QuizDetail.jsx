import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function QuizDetail() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizDetail = async () => {
      try {
        const response = await api.get(`quizzes/${id}/`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz details:', error);
      }
    };

    fetchQuizDetail();
  }, [id]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      {/* Add more details and quiz-taking functionality here */}
    </div>
  );
}

export default QuizDetail;