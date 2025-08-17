'use client';

interface TotalGuessesProps {
  total: number;
}

export default function TotalGuesses({ total }: TotalGuessesProps) {
  return <div>Guesses: {total}</div>;
}
