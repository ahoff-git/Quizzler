'use client';

interface HintsUsedProps {
  total: number;
}

export default function HintsUsed({ total }: HintsUsedProps) {
  return <div>Hints: {total}</div>;
}

