'use client';

import { useEffect, useState } from 'react';

interface HiddenAnswerProps {
  answer: string;
  reveal?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export default function HiddenAnswer({
  answer,
  reveal = false,
  orientation = 'horizontal',
}: HiddenAnswerProps) {
  const letters = answer.split('');
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>(() =>
    letters.map(() => false),
  );

  useEffect(() => {
    if (reveal) {
      setRevealedLetters(letters.map(() => true));
    }
  }, [reveal, letters]);

  const revealLetter = (index: number) => {
    setRevealedLetters((prev) =>
      prev.map((val, i) => (i === index ? true : val)),
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
      }}
    >
      {letters.map((char, idx) => (
        <span
          key={idx}
          onClick={() => revealLetter(idx)}
          style={{
            display: 'inline-block',
            width: '20px',
            height: '30px',
            marginRight: orientation === 'horizontal' ? '4px' : 0,
            marginBottom: orientation === 'vertical' ? '4px' : 0,
            backgroundColor: revealedLetters[idx] ? 'transparent' : '#000',
            color: '#000',
            textAlign: 'center',
            lineHeight: '30px',
            border: '1px solid #000',
            cursor:
              reveal || revealedLetters[idx] ? 'default' : 'pointer',
          }}
        >
          {revealedLetters[idx] ? char : ''}
        </span>
      ))}
    </div>
  );
}

