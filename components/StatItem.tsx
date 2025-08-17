'use client';

interface StatItemProps {
  label: string;
  value: number;
}

export default function StatItem({ label, value }: StatItemProps) {
  return (
    <div>
      {label}: {value}
    </div>
  );
}
