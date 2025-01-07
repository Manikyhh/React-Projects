// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import Question from './components/Question';
import Result from './components/Result';

const questions = [
  {
    question: 'What is the capital of Karnataka?',
    options: ['Mysore', 'Bengaluru', 'Belagavi', 'Haveri'],
    correctAnswer: 'Bengaluru',
  },
  {
    question: 'Who is the CEO of Tesla?',
    options: ['Elon Musk', 'Jeff Bezos', 'Bill Gates', 'Mark Zuckerberg'],
    correctAnswer: 'Elon Musk',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    question: 'Who is the author of the book "To Kill a Mockingbird"?',
    options: ['F. Scott Fitzgerald ', 'Harper Lee', 'Jane Austen', 'J.K. Rowling'],
    correctAnswer: 'Harper Lee',
  },

  {
    question: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Au', 'Hg', 'Pb'],
    correctAnswer: 'Au',
  },
  {
    question: 'What is the name of the largest planet in our solar system?',
    options: [' Earth', 'Saturn ', 'Jupiter', 'Uranus'],
    correctAnswer: 'Jupiter',
  },
];

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      setAnswers([...answers, selectedAnswer]);
      setSelectedAnswer('');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer) {
      setAnswers([...answers, selectedAnswer]);
    }
    setIsQuizCompleted(true);
  };

  const score = answers.reduce(
    (acc, answer, index) =>
      answer === questions[index].correctAnswer ? acc + 1 : acc,
    0);
return (
    <div className="app-container">
      <h1>React Quiz App</h1>
      {isQuizCompleted ? (
        <Result score={score} totalQuestions={questions.length} />
      ) : (
        <div className="question-container">
          {currentQuestionIndex < questions.length ? (
            <>
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                selectedAnswer={selectedAnswer}
                onAnswerChange={handleAnswerChange}
              />
              <div className="button-container">
                <button
                  className="next-button"
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer} // Disable the Next button if no answer is selected
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div>
              <button className="submit-button" onClick={handleSubmitQuiz}>
                Submit Quiz
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
