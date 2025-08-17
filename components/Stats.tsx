'use client';

import Timer from './Timer';
import StatItem from './StatItem';

interface StatsProps {
  remaining: number;
  guesses: number;
  hints?: number;
  running?: boolean;
  resetKey?: number;
}

export default function Stats({
  remaining,
  guesses,
  hints = 0,
  running = false,
  resetKey = 0,
}: StatsProps) {
  return (
    <div>
      <Timer running={running} resetKey={resetKey} />
      <StatItem label="Remaining" value={remaining} />
      <StatItem label="Guesses" value={guesses} />
      <StatItem label="Hints" value={hints} />
    </div>
  );
}
