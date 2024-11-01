// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultsPage() {
  const [score, setScore] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the results are available in location.state
    if (location.state && location.state.attempt) {
      const { attempt } = location.state;
      setScore(attempt.score);
      setQuizTitle(attempt.quiz);  // Assuming `quiz` is the title of the quiz in the attempt data
      setUserAnswers(attempt.user_answers);  // List of user answers for detailed results
      setLoading(false);
    } else {
      setError('No quiz attempt data found. Unable to display results.');
      setLoading(false);
    }
  }, [location.state]);

  const handleRetakeQuiz = () => {
    if (location.state?.attempt?.quiz) {
      const quizId = location.state.attempt.quiz.id;  // Adjust if quiz ID is stored differently
      navigate(`/quizzes/${quizId}`);
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
        <h2 className="text-2xl font-semibold mb-4">{quizTitle || 'Quiz'}</h2>
        <p className="text-xl mb-4">
          Your Score: <span className="font-bold">{score !== null ? `${score.toFixed(2)}%` : 'N/A'}</span>
        </p>
        {score !== null && (
          score >= 70 ? (
            <p className="text-green-600 font-semibold mb-4">Congratulations! You passed the quiz!</p>
          ) : (
            <p className="text-red-600 font-semibold mb-4">You didn`t pass this time. Keep practicing!</p>
          )
        )}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Your Answers:</h3>
          <ul>
            {userAnswers.map((answer, index) => (
              <li key={index} className="mb-2">
                <p>Question: {answer.question.text}</p>
                <p>Your Answer: {answer.selected_choice.option}: {answer.selected_choice.text}</p>
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
