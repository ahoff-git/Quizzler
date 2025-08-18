'use client';

import { useEffect, useRef, useState } from 'react';
import Stats from '../components/Stats';
import HiddenAnswer from '../components/HiddenAnswer';
import { useGuessFeedback } from '../hooks/useGuessFeedback';
import PokemonTypeIcons from '../components/PokemonTypeIcons';
import { QUIZZES, QuizKey, pokemonData } from '../quizzes';

export default function Page() {
  const [quizKey, setQuizKey] = useState<QuizKey>('pokemon');
  const [quizItems, setQuizItems] = useState<string[]>([]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [hintActive, setHintActive] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showTypes, setShowTypes] = useState(false);
  const [reduceGuessed, setReduceGuessed] = useState(false);
  const { handleGuess, FuzzyToggle, GuessMessage } = useGuessFeedback(
    quizItems,
    guessed,
    setGuessed
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const { items, shuffle } = QUIZZES[quizKey];
    const uniqueItems = Array.from(new Set(items));
    const randomized = shuffle
      ? uniqueItems.sort(() => Math.random() - 0.5)
      : uniqueItems;
    setQuizItems(randomized);
    setGuessed([]);
    setRevealed(false);
    setTimerRunning(false);
    setTimerResetKey((k) => k + 1);
    setGuess('');
    setHintActive(false);
    setHintsUsed(0);
    setShowTypes(false);
    setReduceGuessed(false);
  }, [quizKey]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [quizKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!timerRunning) {
      setTimerRunning(true);
    }
    handleGuess(guess);
    setGuess('');
  };

  useEffect(() => {
    if (revealed || guessed.length === quizItems.length) {
      setTimerRunning(false);
    }
  }, [revealed, guessed, quizItems]);

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
      <Stats
        remaining={remaining}
        guesses={guessed.length}
        hints={hintsUsed}
        running={timerRunning}
        resetKey={timerResetKey}
        key={quizKey}
      />
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          autoFocus
        />
        <button type="submit" style={{ marginLeft: '8px' }}>
          Guess
        </button>
        <button
          type="button"
          onClick={() => {
            setHintActive(true);
            setHintsUsed((h) => h + 1);
          }}
          disabled={hintActive || revealed}
          style={{ marginLeft: '8px' }}
        >
          Hint
        </button>
          <button
            type="button"
            onClick={() => setRevealed(true)}
            disabled={revealed}
            style={{ marginLeft: '8px' }}
          >
            Give Up
          </button>
          {quizKey === 'pokemon' && (
            <label style={{ marginLeft: '8px' }}>
              <input
                type="checkbox"
                checked={showTypes}
                onChange={(e) => setShowTypes(e.target.checked)}
              />{' '}
              Show types
            </label>
          )}
          <label style={{ marginLeft: '8px' }}>
            <input
              type="checkbox"
              checked={reduceGuessed}
              onChange={(e) => setReduceGuessed(e.target.checked)}
            />{' '}
            Reduce guessed answers
          </label>
          <FuzzyToggle />
        </form>
      <GuessMessage />
      <div className="answers-grid" style={{ marginTop: '1rem' }}>
        {quizItems.map((item, index) => {
          const isGuessed = guessed.includes(item);
          if (reduceGuessed && isGuessed && !revealed) {
            const prevGuessed =
              index === 0 || guessed.includes(quizItems[index - 1]);
            const nextGuessed =
              index === quizItems.length - 1 || guessed.includes(quizItems[index + 1]);
            if (prevGuessed && nextGuessed) {
              return null;
            }
          }
          const showItem = isGuessed || revealed;
          const types =
            quizKey === 'pokemon'
              ? pokemonData.find((p) => p.name === item)?.types ?? []
              : [];
          const number =
            quizKey === 'pokemon'
              ? pokemonData.findIndex((p) => p.name === item) + 1
              : undefined;
          return (
            <div
              key={item}
              style={{
                display: 'inline-block',
                marginRight: '8px',
                marginBottom: '8px',
              }}
            >
              {quizKey === 'pokemon' && (
                <span style={{ marginRight: '4px' }}>
                  {`#${String(number).padStart(3, '0')}`}
                </span>
              )}
              <HiddenAnswer
                answer={item}
                reveal={showItem}
                hintActive={hintActive}
                onHintConsumed={() => setHintActive(false)}
              />
              {quizKey === 'pokemon' && (showItem || showTypes) && (
                <PokemonTypeIcons types={types} />
              )}
            </div>
          );
        })}
      </div>
      {revealed && <p>You gave up! Answers revealed.</p>}
    </main>
  );
}

