import animals from './animals';
import countries from './countries';
import foods from './foods';

export const QUIZZES = {
  animals,
  countries,
  foods,
};

export type QuizKey = keyof typeof QUIZZES;
