/* ==================================================================
   LIVRES — mise en forme commune à toutes les langues : on découpe
   chaque paragraphe en texte et en mots à retrouver, on relie chaque
   page à son chapitre, et on dérive les sections du parcours.

   Syntaxe dans les textes : {{texte affiché|clé exacte}} marque un mot
   testable ; la clé doit exister dans le vocabulaire de la langue.
   ================================================================== */

const STORY_TOKEN_RE = /\{\{([^}|]+)(?:\|([^}]+))?\}\}/g;

export function parseStoryParagraph(text, allItems) {
  const tokens = [];
  let last = 0, m;
  STORY_TOKEN_RE.lastIndex = 0;
  while ((m = STORY_TOKEN_RE.exec(text))) {
    if (m.index > last) tokens.push({ type: "text", value: text.slice(last, m.index) });
    const display = m[1];
    const key = (m[2] || m[1]).toLowerCase();
    const item = allItems.find((it) => it.pt.toLowerCase() === key);
    tokens.push({ type: "word", display, key, item });
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push({ type: "text", value: text.slice(last) });
  return tokens;
}

const strip = (s) => s.replace(/\{\{([^}|]+)(\|[^}]+)?\}\}/g, "$1");

/* Prépare les livres d'une langue et renvoie tout ce que l'app en tire. */
export function prepareBooks(books, allItems) {
  books.forEach((book, bi) => {
    book.number = bi + 1;
    book.chapters = book.pages.map((p) => p.unit);
    book.pages.forEach((page, pi) => {
      page.id = `${book.id}.${page.unit}`;
      page.book = book.id;
      page.number = pi + 1;
      page.tokens = page.paragraphs.map((t) => parseStoryParagraph(t, allItems));
      page.frTokens = (page.fr || []).map((t) => parseStoryParagraph(t, allItems));
      page.targetKeys = [];
      page.tokens.forEach((tokens) => tokens.forEach((t) => {
        if (t.type === "word" && t.item && !page.targetKeys.includes(t.key)) page.targetKeys.push(t.key);
      }));
      /* Le texte nu, pour la lecture à voix haute. */
      page.text = page.paragraphs.map((p) => strip(p).replace(/^—\s*/, "")).join(" ");
    });
    book.targetTotal = book.pages.reduce((n, p) => n + p.targetKeys.length, 0);
  });

  /* Les sections du parcours sont les livres vus depuis le chemin. */
  const sections = books.map((b) => ({
    id: b.id, title: b.title, subtitle: b.subtitle, emoji: b.emoji, color: b.color,
    chapters: b.chapters, book: b,
  }));
  const bookOfMap = Object.fromEntries(books.flatMap((b) => b.chapters.map((c) => [c, b])));
  const pageOfMap = Object.fromEntries(books.flatMap((b) => b.pages.map((p) => [p.unit, p])));
  return {
    books, sections,
    allChapters: sections.flatMap((s) => s.chapters),
    bookOf: (unitId) => bookOfMap[unitId],
    pageOf: (unitId) => pageOfMap[unitId],
  };
}

export const PAGE_BONUS_XP = 25;
export const PAGE_BONUS_GEMS = 15;
export const BOOK_BONUS_XP = 60;
export const BOOK_BONUS_GEMS = 50;
export const HINT_PRICE = 10;
