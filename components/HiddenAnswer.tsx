'use client';

import { useEffect, useState } from 'react';

interface HiddenAnswerProps {
  answer: string;
  reveal?: boolean;
  offset?: {
    horizontal?: number;
    vertical?: number;
  };
  hintActive?: boolean;
  onHintConsumed?: () => void;
}

export default function HiddenAnswer({
  answer,
  reveal = false,
  offset,
  hintActive = false,
  onHintConsumed,
}: HiddenAnswerProps) {
  const letters = answer.split('');
  const [revealedLetters, setRevealedLetters] = useState<boolean[]>(() =>
    letters.map(() => false),
  );

  useEffect(() => {
    setRevealedLetters(answer.split('').map(() => reveal));
  }, [answer, reveal]);

  useEffect(() => {
    if (reveal) {
      setRevealedLetters(answer.split('').map(() => true));
    }
  }, [reveal, answer]);

  const revealLetter = (index: number) => {
    if (!hintActive || revealedLetters[index]) return;
    setRevealedLetters((prev) =>
      prev.map((val, i) => (i === index ? true : val)),
    );
    if (onHintConsumed) onHintConsumed();
  };

  const horizontalOffset = offset?.horizontal ?? 0;
  const verticalOffset = offset?.vertical ?? 0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
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
            marginRight: horizontalOffset,
            marginBottom: verticalOffset,
            backgroundColor: revealedLetters[idx] ? 'transparent' : '#000',
            color: '#000',
            textAlign: 'center',
            lineHeight: '30px',
            border: revealedLetters[idx] ? 'none' : '1px solid #000',
            cursor:
              reveal || revealedLetters[idx]
                ? 'default'
                : hintActive
                ? 'pointer'
                : 'default',
          }}
        >
          {revealedLetters[idx] ? char : ''}
        </span>
      ))}
    </div>
  );
}

