'use client';

import Timer from './Timer';
import RemainingAnswers from './RemainingAnswers';
import TotalGuesses from './TotalGuesses';

interface StatsProps {
  remaining: number;
  guesses: number;
  running: boolean;
  resetKey: number;
}

export default function Stats({ remaining, guesses, running, resetKey }: StatsProps) {
  return (
    <div>
      <Timer running={running} resetKey={resetKey} />
      <RemainingAnswers remaining={remaining} />
      <TotalGuesses total={guesses} />
    </div>
  );
}
