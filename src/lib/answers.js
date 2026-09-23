/* --- Comparaison souple pour la traduction écrite par l'élève --- */

export function canonicalAnswer(fr) {
  return fr.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeAnswer(s) {
  return s
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1]
        : 1 + Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]);
    }
  }
  return d[m][n];
}

export function isCloseEnough(input, expected) {
  const a = normalizeAnswer(input), b = normalizeAnswer(expected);
  if (!a || !b) return false;
  if (a === b) return true;
  const tolerance = Math.max(1, Math.floor(b.length / 4));
  return levenshtein(a, b) <= tolerance;
}

export function checkAnswer(input, item) {
  if (!item) return false;
  const candidates = [canonicalAnswer(item.fr), item.fr, ...(item.accept || [])];
  return candidates.some((c) => isCloseEnough(input, c));
}
