import { useEffect, useState } from 'react';
import { fuzzyMatch } from '../utils/fuzzyMatch';

export function useFuzzyGuess() {
  const [useFuzzy, setUseFuzzy] = useState(false);
  const [corrected, setCorrected] = useState<string | null>(null);

  useEffect(() => {
    if (corrected) {
      const t = setTimeout(() => setCorrected(null), 3000);
      return () => clearTimeout(t);
    }
  }, [corrected]);

  function apply(guess: string, quizItems: string[], guessed: string[]) {
    const normalized = guess.trim().toLowerCase();
    if (!useFuzzy || quizItems.includes(normalized)) {
      return normalized;
    }
    const remaining = quizItems.filter((item) => !guessed.includes(item));
    const matches = fuzzyMatch(remaining, normalized, 0.8);
    if (matches.length > 0) {
      setCorrected(matches[0]);
      return matches[0];
    }
    return normalized;
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

  const CorrectedMessage = () =>
    corrected ? (
      <div style={{ marginTop: '8px' }}>Auto-corrected to: {corrected}</div>
    ) : null;

  return { apply, FuzzyToggle, CorrectedMessage };
}

