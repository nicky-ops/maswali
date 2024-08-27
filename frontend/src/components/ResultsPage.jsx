import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResultsPage() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      if (location.state && location.state.attemptId) {
        try {
          const response = await axios.get(`/api/attempts/${location.state.attemptId}/results/`);
          setResults(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch quiz results');
          setLoading(false);
        }
      } else {
        setError('No quiz attempt data found. Unable to display results.');
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.state]);

  const handleRetakeQuiz = () => {
    if (results?.quiz?.id) {
      navigate(`/quizzes/${results.quiz.id}`);
    } else {
      setError('Unable to retake quiz. Quiz ID not found.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) return <div className="container mx-auto mt-8">Loading results...</div>;
  if (error) return (
    <div className="container mx-auto mt-8">
      <p className="text-red-500">{error}</p>
      <button
        onClick={handleBackToHome}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </div>
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{results?.quiz?.title || 'Quiz'}</h2>
        <p className="text-xl mb-4">
          Your Score: <span className="font-bold">{results?.score !== null ? `${results.score.toFixed(2)}%` : 'N/A'}</span>
        </p>
        {results?.score !== null && (
          results.score >= 70 ? (
            <p className="text-green-600 font-semibold mb-4">Congratulations! You passed the quiz!</p>
          ) : (
            <p className="text-red-600 font-semibold mb-4">You didn't pass this time. Keep practicing!</p>
          )
        )}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Your Answers:</h3>
          <ul>
            {results?.questions.map((question, index) => (
              <li key={index} className="mb-4 p-4 border rounded">
                <p className="font-semibold">{question.text}</p>
                {question.user_answer ? (
                  <p className={question.user_answer.is_correct ? "text-green-600" : "text-red-600"}>
                    Your Answer: {question.user_answer.text}
                  </p>
                ) : (
                  <p className="text-gray-500">Not answered</p>
                )}
                {!question.user_answer?.is_correct && (
                  <p className="text-green-600">
                    Correct Answer: {question.correct_answer.text}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleRetakeQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Retake Quiz
          </button>
          <button
            onClick={handleBackToHome}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;