'use client';

import { useEffect, useRef, useState } from 'react';
import Stats from '../components/Stats';
import HiddenAnswer from '../components/HiddenAnswer';
import { QUIZZES, QuizKey } from '../quizzes';

export default function Page() {
  const [quizKey, setQuizKey] = useState<QuizKey>('animals');
  const [quizItems, setQuizItems] = useState<string[]>([]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const shuffled = [...QUIZZES[quizKey]].sort(() => Math.random() - 0.5);
    setQuizItems(shuffled);
    setGuessed([]);
    setRevealed(false);
  }, [quizKey]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [quizKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = guess.trim().toLowerCase();
    if (
      quizItems.some((a) => a === normalized) &&
      !guessed.includes(normalized)
    ) {
      setGuessed([...guessed, normalized]);
    }
    setGuess('');
  };

  const remaining = revealed ? 0 : quizItems.length - guessed.length;

  return (
    <main>
      <h1>{quizKey.charAt(0).toUpperCase() + quizKey.slice(1)} Quiz</h1>
      <select
        value={quizKey}
        onChange={(e) => setQuizKey(e.target.value as QuizKey)}
        style={{ marginBottom: '8px' }}
      >
        {Object.keys(QUIZZES).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
      <Stats remaining={remaining} guesses={guessed.length} />
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
        {quizItems.map((item, index) => {
          const isGuessed = guessed.includes(item);
          const showItem = isGuessed || revealed;
          return (
            <div
              key={index}
              style={{
                display: 'inline-block',
                marginRight: '8px',
                marginBottom: '8px',
              }}
            >
              <HiddenAnswer
                answer={item}
                reveal={showItem}
                orientation={index % 2 === 0 ? 'horizontal' : 'vertical'}
              />
            </div>
          );
        })}
      </div>
      {revealed && <p>You gave up! Answers revealed.</p>}
    </main>
  );
}

