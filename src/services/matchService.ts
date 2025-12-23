// src/services/matchService.ts

const normalize = (v?: string) =>
  v?.toLowerCase().trim() || '';

export const calculateMatchScore = (a: any, b: any) => {
  let score = 0;

  if (normalize(a.category) === normalize(b.category)) score += 3;
  if (normalize(a.brand) === normalize(b.brand)) score += 2;
  if (normalize(a.color) === normalize(b.color)) score += 2;

  const wordsA = normalize(a.characteristics).split(' ');
  const wordsB = normalize(b.characteristics).split(' ');
  const commonWords = wordsA.filter(w => wordsB.includes(w));

  if (commonWords.length >= 2) score += 4;

  return score;
};
