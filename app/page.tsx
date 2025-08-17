'use client';

import { useEffect, useRef, useState } from 'react';
import Timer from '../components/Timer';

const ALL_ANIMALS = [
  'lion',
  'tiger',
  'elephant',
  'giraffe',
  'zebra',
  'bear',
  'wolf',
  'fox',
  'monkey',
  'penguin',
  'kangaroo',
  'panda',
  'otter',
  'koala',
  'rabbit',
];

export default function Page() {
  const [quizAnimals, setQuizAnimals] = useState<string[]>([]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const shuffled = [...ALL_ANIMALS].sort(() => Math.random() - 0.5);
    setQuizAnimals(shuffled.slice(0, 5));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = guess.trim().toLowerCase();
    if (
      quizAnimals.some((a) => a === normalized) &&
      !guessed.includes(normalized)
    ) {
      setGuessed([...guessed, normalized]);
    }
    setGuess('');
  };

  return (
    <main>
      <h1>Animal Quiz</h1>
      <Timer />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          autoFocus
        />
        <button
          type="button"
          onClick={() => setRevealed(true)}
          disabled={revealed}
          style={{ marginLeft: '8px' }}
        >
          Give Up
        </button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        {quizAnimals.map((animal, index) => {
          const isGuessed = guessed.includes(animal);
          const showAnimal = isGuessed || revealed;
          return (
            <span
              key={index}
              style={{
                display: 'inline-block',
                width: '100px',
                height: '30px',
                backgroundColor: showAnimal ? '#fff' : '#000',
                color: '#000',
                marginRight: '8px',
                marginBottom: '8px',
                lineHeight: '30px',
                textAlign: 'center',
                border: '1px solid #000',
              }}
            >
              {showAnimal ? animal : ''}
            </span>
          );
        })}
      </div>
      <p>
        Correct: {guessed.length} | Remaining:{' '}
        {revealed ? 0 : quizAnimals.length - guessed.length}
      </p>
      {revealed && <p>You gave up! Answers revealed.</p>}
    </main>
  );
}

