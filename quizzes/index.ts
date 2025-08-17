import animals from './animals';
import countries from './countries';
import foods from './foods';
import pokemonData from './pokemon';

export const QUIZZES = {
  animals,
  countries,
  foods,
  pokemon: pokemonData.map((p) => p.name),
};

export type QuizKey = keyof typeof QUIZZES;

export { pokemonData };
