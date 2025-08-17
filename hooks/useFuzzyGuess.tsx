import { useEffect, useState } from 'react';
import { fuzzyMatch } from '../utils/fuzzyMatch';

export function useFuzzyGuess() {
  const [useFuzzy, setUseFuzzy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(t);
    }
  }, [message]);

  function apply(
    guess: string,
    quizItems: string[],
    guessed: string[]
  ): { accepted: string; correction?: string; isClose?: boolean } {
    const normalize = (s: string) => s.trim().toLowerCase();
    const normalized = normalize(guess);
    const normalizedItems = quizItems.map(normalize);
    if (!useFuzzy || normalizedItems.includes(normalized)) {
      return { accepted: normalized };
    }
    const remaining = normalizedItems.filter((item) => !guessed.includes(item));
    const matches = fuzzyMatch(remaining, normalized, 0.7);
    if (matches.length > 0) {
      return { accepted: matches[0], correction: matches[0] };
    }
    const closeMatches = fuzzyMatch(remaining, normalized, 0.6);
    if (closeMatches.length > 0) {
      return { accepted: normalized, isClose: true };
    }
    return { accepted: normalized };
  }

  function showMessage(msg: string) {
    setMessage(msg);
  }

  const FuzzyToggle = () => (
    <label style={{ marginLeft: '8px' }}>
      <input
        type="checkbox"
        checked={useFuzzy}
        onChange={(e) => setUseFuzzy(e.target.checked)}
      />{' '}
      Use fuzzy search
    </label>
  );

  const GuessMessage = () =>
    message ? <div style={{ marginTop: '8px' }}>{message}</div> : null;

  return { apply, FuzzyToggle, GuessMessage, showMessage };
}

