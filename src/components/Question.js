// src/components/Question.js
import React from 'react';

const Question = ({ question, options, selectedAnswer, onAnswerChange }) => {
  return (
    <div>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <div key={index}>
          <input 
            type="radio"
            id={option}
            name="answer"
            value={option}
            checked={selectedAnswer === option}
            onChange={onAnswerChange}
          />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Question;
