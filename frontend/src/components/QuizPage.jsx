import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function QuizPage() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizAttemptId, setQuizAttemptId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/quizzes/${quizId}/`);
        setQuiz(response.data);
        setCountdown(response.data.time_limit);
      } catch (error) {
        setError('Error fetching quiz. Please try again.');
      }
    };

    fetchQuiz();
  }, [quizId]);

  const startQuiz = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/quiz/attempts/', { quiz: quizId });
      const attemptObject = response.data.find(obj => obj.id !== undefined);

      if (attemptObject) {
        setQuizAttemptId(attemptObject.id);
        setIsQuizStarted(true);
      } else {
        throw new Error('Quiz attempt ID is missing from the response.');
      }
    } catch (error) {
      setError('Error starting quiz. Please try again.');
    }
  };

  if (!quiz) return <div>Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!isQuizStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">{quiz.title}</h1>
          <p className="text-lg mb-4 text-center">Time limit: {quiz.time_limit} seconds</p>
          <p className="text-md mb-4 text-center text-gray-600">Number of Questions: {quiz.questions.length}</p>
          <p className="text-md mb-4 text-center text-gray-600">Category: {quiz.category.name}</p>
          <button
            onClick={startQuiz}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition-all duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionChange = (choiceId) => {
    setSelectedOption(choiceId);
  };

  const handleNextQuestion = () => {
    const updatedAnswers = [...userAnswers, { questionId: currentQuestion.id, selectedOption }];
    setUserAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit the quiz answers to the backend
      // navigate to the results page
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <div className="mb-4">
        <span className="font-bold">Time Remaining: {countdown}s</span>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{currentQuestion.text}</h2>
        {currentQuestion.choices.map((choice) => (
          <div key={choice.id} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="option"
                value={choice.id}
                checked={selectedOption === choice.id}
                onChange={() => handleOptionChange(choice.id)}
                className="form-radio"
              />
              <span className="ml-2">{choice.option}: {choice.text}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        disabled={selectedOption === null}
      >
        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
}

export default QuizPage;
