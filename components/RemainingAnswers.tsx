'use client';

interface RemainingAnswersProps {
  remaining: number;
}

export default function RemainingAnswers({ remaining }: RemainingAnswersProps) {
  return <div>Remaining: {remaining}</div>;
}
