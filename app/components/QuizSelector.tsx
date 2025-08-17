'use client';

import React from 'react';
import { Quiz } from '../data/quizzes';

interface QuizSelectorProps {
  quizzes: Quiz[];
  onSelect: (quizId: string) => void;
}

export default function QuizSelector({ quizzes, onSelect }: QuizSelectorProps) {
  return (
    <select defaultValue="" onChange={(e) => onSelect(e.target.value)}>
      <option value="" disabled>
        Choose a quiz
      </option>
      {quizzes.map((quiz) => (
        <option key={quiz.id} value={quiz.id}>
          {quiz.title}
        </option>
      ))}
    </select>
  );
}
