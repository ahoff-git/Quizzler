'use client';

import { useEffect, useState } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

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

  const start = () => setRunning(true);
  const stop = () => setRunning(false);

  return (
    <div>
      <div>Time: {seconds}s</div>
      <button onClick={start} disabled={running}>
        Start
      </button>
      <button onClick={stop} disabled={!running}>
        Stop
      </button>
    </div>
  );
}
