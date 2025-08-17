export function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

/**
 * Performs fuzzy matching between an input word and a list of words.
 * It returns the words whose similarity to the input is greater than or
 * equal to the provided confidence threshold.
 *
 * Similarity is calculated as:
 * `1 - levenshteinDistance / max(word.length, input.length)`
 *
 * @param words List of candidate words to check against the input word.
 * @param input The word to compare to.
 * @param threshold Confidence threshold between 0 and 1.
 * @returns Words that meet or exceed the threshold.
 */
export function fuzzyMatch(
  words: string[],
  input: string,
  threshold: number
): string[] {
  const normalize = (s: string) => s.trim().toLowerCase();
  const target = normalize(input);

  return words.filter((word) => {
    const normalized = normalize(word);
    const distance = levenshtein(normalized, target);
    const similarity = 1 - distance / Math.max(normalized.length, target.length);
    return similarity >= threshold;
  });
}
