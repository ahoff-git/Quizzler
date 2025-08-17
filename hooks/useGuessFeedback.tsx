import { Dispatch, SetStateAction, useCallback } from 'react';
import { useFuzzyGuess } from './useFuzzyGuess';

export function useGuessFeedback(
  quizItems: string[],
  guessed: string[],
  setGuessed: Dispatch<SetStateAction<string[]>>
) {
  const { apply: applyFuzzy, FuzzyToggle, GuessMessage, showMessage } =
    useFuzzyGuess();

  const handleGuess = useCallback(
    (rawGuess: string) => {
      const { accepted, correction } = applyFuzzy(rawGuess, quizItems, guessed);
      let msg = '';
      if (correction) {
        msg += `Auto-corrected to: ${correction}. `;
      }
      if (quizItems.includes(accepted)) {
        if (guessed.includes(accepted)) {
          msg += 'Already guessed!';
        } else {
          setGuessed([...guessed, accepted]);
          msg += 'Correct!';
        }
      } else {
        msg += 'Wrong answer!';
      }
      showMessage(msg.trim());
    },
    [applyFuzzy, guessed, quizItems, setGuessed, showMessage]
  );

  return { handleGuess, FuzzyToggle, GuessMessage };
}

