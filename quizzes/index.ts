import animals from './animals';
import countries from './countries';
import foods from './foods';
import pokemonData from './pokemon';

interface QuizConfig {
  items: string[];
  shuffle: boolean;
}

export const QUIZZES: Record<string, QuizConfig> = {
  animals: { items: animals, shuffle: true },
  countries: { items: countries, shuffle: true },
  foods: { items: foods, shuffle: true },
  pokemon: { items: pokemonData.map((p) => p.name), shuffle: false },
};

export type QuizKey = keyof typeof QUIZZES;

export { pokemonData };
