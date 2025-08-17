import animals from './animals';
import countries from './countries';
import foods from './foods';
import pokemon from './pokemon';

export const QUIZZES = {
  animals,
  countries,
  foods,
  pokemon,
};

export type QuizKey = keyof typeof QUIZZES;
