// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function QuizPage() {
  const { quizId } = useParams();  // Get quiz ID from the URL params
  const [quiz, setQuiz] = useState(null);  // Store quiz data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);  // Track current question index
  const [selectedOption, setSelectedOption] = useState(null);  // Track selected answer for the current question
  const [countdown, setCountdown] = useState(0);  // Countdown timer for the quiz
  const [error, setError] = useState('');  // Error handling
  const [isQuizStarted, setIsQuizStarted] = useState(false);  // Track if the quiz has started
  const [userAnswers, setUserAnswers] = useState([]);  // Store user answers for the entire quiz
  const [quizAttemptId, setQuizAttemptId] = useState(null);  // Track the quiz attempt ID
  const navigate = useNavigate();  // Navigation hook

  // Fetch the quiz details from the backend
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await api.get(`quiz/quizzes/${quizId}/`);
        setQuiz(response.data);  // Store quiz data in state
        setCountdown(response.data.time_limit);  // Initialize timer
      } catch (error) {
        setError('Error fetching quiz. Please try again.');
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle countdown timer
  useEffect(() => {
    let timer;
    if (isQuizStarted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0 && isQuizStarted) {
      submitQuiz();  // Auto-submit when time runs out
    }

    return () => clearInterval(timer);
  }, [countdown, isQuizStarted]);

  // Handle the change of selected answer
  const handleOptionChange = (choiceId) => {
    setSelectedOption(choiceId);
  };

  // Submit the user's answers to the backend
  const submitQuiz = async () => {
    try {
      const response = await api.post(`/quiz/quizzes/${quizId}/submit/`, {
        user_answers: userAnswers,
      });
  
      const { score } = response.data;
      const totalQuestions = quiz.questions.length;
      const finalScore = (score / totalQuestions) * 100;
  
      console.log("Navigating to results with attemptId:", quizAttemptId);
      navigate(`/results?score=${finalScore}&attemptId=${quizAttemptId}`);
    } catch (error) {
      setError('Error submitting quiz. Please try again.');
      console.error('Error submitting quiz:', error.response ? error.response.data : error);
    }
  };

  // Handle the next question
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setUserAnswers([...userAnswers, {
        question_id: quiz.questions[currentQuestionIndex].id,
        selected_choice_id: selectedOption,
      }]);

      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);  // Move to the next question
        setSelectedOption(null);  // Reset selected option
      } else {
        submitQuiz();  // Submit quiz if it is the last question
      }
    }
  };

  // Start the quiz and initialize the quiz attempt
  const startQuiz = async () => {
    try {
      const response = await api.get('quiz/attempts/', { quiz: quizId });
      console.log('Start Quiz Response:', response.data);
  
      // Find the correct object with the desired ID
      const attemptObject = response.data.find(obj => obj.id !== undefined);
  
      if (attemptObject) {
        setQuizAttemptId(attemptObject.id);
        setIsQuizStarted(true);
      } else {
        throw new Error('Quiz attempt ID is missing from the response.');
      }
    } catch (error) {
      setError('Error starting quiz. Please try again.');
      console.error('Error:', error.message);
    }
  };

  if (!quiz) return <div>Loading...</div>;  // Loading state while fetching quiz data
  if (error) return <p className="text-red-500">{error}</p>;  // Display any errors

  // Before starting the quiz
  if (!isQuizStarted) {
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
        <p>Time limit: {quiz.time_limit} seconds</p>
        <button
          onClick={startQuiz}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];  // Get the current question

  // Quiz question and choices display
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <div className="mb-4">
        <span className="font-bold">Time Remaining: {countdown}s</span>  {/* Countdown display */}
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
                onChange={() => handleOptionChange(choice.id)}  // Select an answer
                className="form-radio"
              />
              <span className="ml-2">{choice.option}: {choice.text}</span>
            </label>
          </div>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}  // Handle question navigation
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        disabled={selectedOption === null}  // Disable button if no option selected
      >
        {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Finish'}
      </button>
    </div>
  );
}

export default QuizPage;
