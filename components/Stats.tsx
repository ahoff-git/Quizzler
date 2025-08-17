'use client';

import Timer from './Timer';
import RemainingAnswers from './RemainingAnswers';
import TotalGuesses from './TotalGuesses';

interface StatsProps {
  remaining: number;
  guesses: number;
}

export default function Stats({ remaining, guesses }: StatsProps) {
  return (
    <div>
      <Timer />
      <RemainingAnswers remaining={remaining} />
      <TotalGuesses total={guesses} />
    </div>
  );
}
