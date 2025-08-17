'use client';

import { useEffect, useState } from 'react';

interface TimerProps {
  running: boolean;
  resetKey: number;
}

export default function Timer({ running, resetKey }: TimerProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [resetKey]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (running) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running]);

  return <div>Time: {seconds}s</div>;
}
