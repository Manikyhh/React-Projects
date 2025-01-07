// src/components/Result.js
import React from 'react';

const Result = ({ score, totalQuestions }) => {
  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>Your score: {score} out of {totalQuestions}</p>
    </div>
  );
};

export default Result;
