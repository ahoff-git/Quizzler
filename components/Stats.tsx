'use client';

import Timer from './Timer';
import RemainingAnswers from './RemainingAnswers';
import TotalGuesses from './TotalGuesses';
import HintsUsed from './HintsUsed';

interface StatsProps {
  remaining: number;
  guesses: number;
  hints: number;
  running: boolean;
  resetKey: number;
}

export default function Stats({
  remaining,
  guesses,
  hints,
  running,
  resetKey,
}: StatsProps) {
  return (
    <div>
      <Timer running={running} resetKey={resetKey} />
      <RemainingAnswers remaining={remaining} />
      <TotalGuesses total={guesses} />
      <HintsUsed total={hints} />
    </div>
  );
}
