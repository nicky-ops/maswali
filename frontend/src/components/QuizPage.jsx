import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

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
        const response = await api.get(`api/quiz/quizzes/${quizId}/`);
        setQuiz(response.data);
        setCountdown(response.data.time_limit);
      } catch (error) {
        setError('Error fetching quiz. Please try again.');
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    let timer;
    if (isQuizStarted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0 && isQuizStarted) {
      submitQuiz();
    }

    return () => clearInterval(timer);
  }, [countdown, isQuizStarted]);

  const handleOptionChange = (choiceId) => {
    setSelectedOption(choiceId);
  };

  const submitQuiz = async () => {
    try {
      const response = await api.post(`api/quiz/quizzes/${quizId}/submit/`, {
        user_answers: userAnswers,
      });

      const { score } = response.data;
      const totalQuestions = quiz.questions.length;
      const finalScore = (score / totalQuestions) * 100;

      navigate(`/results?score=${finalScore}&attemptId=${quizAttemptId}`);
    } catch (error) {
      setError('Error submitting quiz. Please try again.');
      console.error('Error submitting quiz:', error.response ? error.response.data : error);
    }
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      setUserAnswers([...userAnswers, {
        question_id: quiz.questions[currentQuestionIndex].id,
        selected_choice_id: selectedOption,
      }]);

      if (currentQuestionIndex < quiz.questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedOption(null);
      } else {
        submitQuiz();
      }
    }
  };

  const startQuiz = async () => {
    try {
      const response = await api.post('api/quiz/attempts/', { quiz: quizId });
      setQuizAttemptId(response.data.id);
      setIsQuizStarted(true);
    } catch (error) {
      setError('Error starting quiz. Please try again.');
      console.error('Error starting quiz:', error.response ? error.response.data : error);
    }
  };

  if (!quiz) return <div>Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

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

  const currentQuestion = quiz.questions[currentQuestionIndex];

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