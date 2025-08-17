import fs from 'node:fs';
import path from 'node:path';

/**
 * Loads a word list from the `word-lists` directory.
 * Each line is trimmed, lowercased, and empty lines are removed.
 *
 * @param name Basename of the word list file (without extension).
 * @returns Array of normalized words.
 */
export default function loadWordList(name: string): string[] {
  const filePath = path.join(process.cwd(), 'word-lists', `${name}.txt`);
  const content = fs.readFileSync(filePath, 'utf-8');
  return content
    .split(/\r?\n/)
    .map((line) => line.trim().toLowerCase())
    .filter(Boolean);
}
