// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuizResult } from '../services/api';

function ResultsPage() {
  const [quizResult, setQuizResult] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const attemptId = queryParams.get('attemptId');

    if (attemptId) {
      fetchQuizResult(attemptId);
    } else {
      setError('No attempt ID provided.');
    }
  }, [location]);

  const fetchQuizResult = async (attemptId) => {
    try {
      const response = await getQuizResult(attemptId);
      setQuizResult(response.data);
    } catch (error) {
      setError('Error fetching quiz result. Please try again.');
      console.error('Error fetching quiz result:', error);
    }
  };

  const calculateScore = () => {
    if (quizResult?.total_questions > 0) {
      return ((quizResult.score / quizResult.total_questions) * 100).toFixed(2);
    }
    return 'N/A';
  };

  const handleReturnHome = () => {
    navigate('/');  
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!quizResult) {
    return <div>Loading...</div>;
  }

  const score = calculateScore();
  const quizTitle = quizResult.quiz_title || 'Quiz';

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{quizTitle}</h2>
        <p className="text-xl mb-4">
          Your Score: <span className="font-bold">{score}%</span>
        </p>
        <p className={score >= 70 ? "text-green-600 font-semibold mb-4" : "text-red-600 font-semibold mb-4"}>
          {score >= 70 ? "Congratulations! You passed the quiz!" : "You didn't pass this time. Keep practicing!"}
        </p>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Your Answers:</h3>
          <ul>
            {quizResult.userAnswers.map((answer, index) => (
              <li key={index} className="mb-2">
                <p>Question: {answer.question.text}</p>
                <p>Your Answer: {answer.selected_choice.option}: {answer.selected_choice.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-xl mb-4">Your Score: {score}%</p>
          <p className="mb-2">Quiz Title: {quizTitle}</p>
          <p className="mb-2">Date Taken: {new Date(quizResult.start_time).toLocaleString()}</p>
          <p className="mb-2">Total Questions: {quizResult.total_questions}</p>
          <p className="mb-2">Correct Answers: {quizResult.score}</p>
          <p className="mb-2">Time Taken: {quizResult.time_taken} seconds</p>
          
          <h2 className="text-xl font-bold mt-4 mb-2">Question Details:</h2>
          {quizResult.questions.map((question, index) => (
            <div key={question.id} className="mb-4 p-4 border rounded">
              <p className="font-bold">Question {index + 1}: {question.text}</p>
              <p className="text-green-600">Correct Answer: {question.correct_answer.text}</p>
              {question.user_answer ? (
                <p className={question.user_answer.is_correct ? "text-green-600" : "text-red-600"}>
                  Your Answer: {question.user_answer.text}
                </p>
              ) : (
                <p className="text-red-600">No answer provided</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleReturnHome}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
