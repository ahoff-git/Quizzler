import Image from 'next/image';

interface PokemonTypeIconsProps {
  types: string[];
}

export default function PokemonTypeIcons({ types }: PokemonTypeIconsProps) {
  return (
    <div style={{ display: 'inline-flex', gap: '4px', marginLeft: '4px' }}>
      {types.map((type) => (
        <Image
          key={type}
          src={`/type-icons/${type}.svg`}
          alt={`${type} type icon`}
          width={20}
          height={20}
        />
      ))}
    </div>
  );
}
