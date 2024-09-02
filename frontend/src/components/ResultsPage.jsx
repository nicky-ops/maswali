import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultsPage() {
    const [results, setResults] = useState({
        quiz: { title: "Python Setup Quiz" },
        score: 80,
        questions: [
            {
                text: "What is the command to create a Python package?",
                user_answer: { text: "python setup.py sdist", is_correct: true },
                correct_answer: { text: "python setup.py sdist" },
            },
            {
                text: "How do you deactivate a virtual environment in Python?",
                user_answer: { text: "deactivate", is_correct: true },
                correct_answer: { text: "deactivate" },
            },
            {
                text: "Which of the following is a tool for managing project dependencies in Python?",
                user_answer: { text: "pip", is_correct: true },
                correct_answer: { text: "pip" },
            },
            {
                text: "How do you check the installed version of Python in your system?",
                user_answer: { text: "python --version", is_correct: true },
                correct_answer: { text: "python --version" },
            },
        ],
    });

    const navigate = useNavigate();

    const handleRetakeQuiz = () => {
        navigate(`/quizzes/1`);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{results.quiz.title}</h2>
                <p className="text-xl mb-4">
                    Your Score: <span className="font-bold">{results.score}%</span>
                </p>
                {results.score >= 70 ? (
                    <p className="text-green-600 font-semibold mb-4">Congratulations! You passed the quiz!</p>
                ) : (
                    <p className="text-red-600 font-semibold mb-4">You didn't pass this time. Keep practicing!</p>
                )}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Your Answers:</h3>
                    <ul>
                        {results.questions.map((question, index) => (
                            <li key={index} className="mb-4 p-4 border rounded">
                                <p className="font-semibold">{question.text}</p>
                                <p className={question.user_answer.is_correct ? "text-green-600" : "text-red-600"}>
                                    Your Answer: {question.user_answer.text}
                                </p>
                                {!question.user_answer.is_correct && (
                                    <p className="text-green-600">
                                        Correct Answer: {question.correct_answer.text}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex space-x-4 mt-6">
                    <button onClick={handleRetakeQuiz} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Retake Quiz
                    </button>
                    <button onClick={handleBackToHome} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResultsPage;
