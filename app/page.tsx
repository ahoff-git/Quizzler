'use client';

import { useState } from 'react';
import QuizSelector from './components/QuizSelector';
import { quizzes } from './data/quizzes';

export default function Page() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <h1>Welcome to Quizzler</h1>
      <QuizSelector quizzes={quizzes} onSelect={setSelected} />
      {selected && <p>Selected quiz: {selected}</p>}
    </div>
  );
}
