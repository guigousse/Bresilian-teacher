/* ==================================================================
   EXERCICES — fabrique les questions d'une session.

   Un même mot doit être rencontré de plusieurs façons pour être su :
   le reconnaître (QCM), l'entendre sans le voir, l'écrire, le
   reconstruire dans une phrase, le prononcer. La difficulté monte avec
   la couronne de l'unité : on commence par reconnaître, on finit par
   produire de mémoire.
   ================================================================== */

import { ALL_ITEMS } from "../data/units.js";
import { shuffle, pick } from "./utils.js";

/* Les types disponibles à chaque niveau de couronne (0 = découverte). */
const LADDER = [
  ["mcq_pt_fr", "mcq_fr_pt", "listen", "pairs"],
  ["mcq_pt_fr", "mcq_fr_pt", "listen", "pairs", "bank"],
  ["mcq_fr_pt", "listen", "listen_type", "bank", "pairs"],
  ["listen_type", "type", "bank", "mcq_fr_pt", "article"],
  ["type", "listen_type", "bank", "article", "speak"],
  ["type", "listen_type", "bank", "speak", "article"],
];

export function kindsForCrown(crown) {
  return LADDER[Math.min(crown, LADDER.length - 1)];
}

/* Le mot commence-t-il par un article défini ? (o/a, indispensable en
   portugais et jamais deviné par un francophone.) */
function articleOf(pt) {
  const m = /^(o|a)\s+/i.exec(pt);
  return m ? m[1].toLowerCase() : null;
}

/* Les mauvaises réponses viennent d'abord du chapitre en cours : avec
   360 mots au catalogue, tirer au hasard dans tout le vocabulaire
   donnerait « tchau » contre « l'hôpital » — un choix qu'on fait sans
   rien savoir. On ne complète avec le reste que s'il manque du monde. */
function mcq(item, pool, dir) {
  const field = dir === "pt_fr" ? "fr" : "pt";
  const uniq = (arr) => arr
    .filter((x) => x[field] !== item[field])
    .filter((x, idx, self) => self.findIndex((y) => y[field] === x[field]) === idx);
  const near = pick(uniq(pool), 3);
  const far = near.length < 3
    ? pick(uniq(ALL_ITEMS).filter((x) => !near.some((n) => n[field] === x[field])), 3 - near.length)
    : [];
  const others = [...near, ...far].map((x) => x[field]);
  return {
    kind: "mcq", dir, item,
    question: dir === "pt_fr" ? item.pt : item.fr,
    answer: item[field],
    options: shuffle([item[field], ...others]),
  };
}

function listen(item, pool) {
  return { ...mcq(item, pool, "pt_fr"), kind: "listen" };
}

function listenType(item) {
  return { kind: "listen_type", item, question: null, answer: item.pt };
}

function type(item) {
  return { kind: "type", item, question: item.fr, answer: item.pt };
}

function bank(item) {
  const words = item.pt.split(" ");
  const noise = pick(
    ALL_ITEMS.flatMap((x) => x.pt.split(" ")).filter((w) => !words.includes(w)),
    Math.min(3, Math.max(2, 5 - words.length))
  );
  return {
    kind: "bank", item, question: item.fr, answer: item.pt,
    tiles: shuffle([...words, ...noise]).map((w, i) => ({ w, id: `${w}-${i}` })),
  };
}

function article(item) {
  return { kind: "article", item, question: item.pt.replace(/^(o|a)\s+/i, ""), answer: articleOf(item.pt), options: ["o", "a"] };
}

function speak(item) {
  return { kind: "speak", item, question: item.pt, answer: item.pt };
}

/* Un mini-jeu d'association : cinq paires à relier le plus vite possible. */
function pairs(pool) {
  const chosen = pick(pool.filter((x) => x.pt.split(" ").length <= 3), 5);
  const set = chosen.length >= 4 ? chosen : pick(pool, Math.min(5, pool.length));
  return {
    kind: "pairs", item: set[0], items: set,
    left: shuffle(set.map((it) => ({ id: it.pt, text: it.pt }))),
    right: shuffle(set.map((it) => ({ id: it.pt, text: it.fr }))),
  };
}

function build(kind, item, pool) {
  switch (kind) {
    case "mcq_pt_fr": return mcq(item, pool, "pt_fr");
    case "mcq_fr_pt": return mcq(item, pool, "fr_pt");
    case "listen": return listen(item, pool);
    case "listen_type": return listenType(item);
    case "type": return type(item);
    case "bank": return item.pt.split(" ").length >= 2 ? bank(item) : type(item);
    case "article": return articleOf(item.pt) ? article(item) : mcq(item, pool, "fr_pt");
    case "speak": return speakSupported() ? speak(item) : listen(item, pool);
    case "pairs": return pairs(pool);
    default: return mcq(item, pool, "pt_fr");
  }
}

export function speakSupported() {
  return typeof window !== "undefined" &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/* Construit une session. `weak` place les mots fragiles en premier pour
   que la session serve d'abord à réparer ce qui ne tient pas. */
export function makeSession({ items, count = 12, crown = 0, weak = [] }) {
  const kinds = kindsForCrown(crown);
  const ordered = [...weak.filter((w) => items.includes(w)), ...shuffle(items)];
  const seen = new Set();
  const queue = ordered.filter((it) => (seen.has(it.pt) ? false : seen.add(it.pt)));
  const out = [];
  let i = 0, pairsUsed = 0;

  while (out.length < count) {
    const kind = kinds[out.length % kinds.length];
    if (kind === "pairs") {
      /* Le jeu de paires compte pour cinq mots : une seule fois par session. */
      if (pairsUsed || items.length < 4) { out.push(build("mcq_pt_fr", queue[i % queue.length], items)); i++; continue; }
      pairsUsed = 1;
      out.push(build("pairs", queue[i % queue.length], items));
      continue;
    }
    out.push(build(kind, queue[i % queue.length], items));
    i++;
  }
  return out.map((e, idx) => ({ ...e, key: idx }));
}

/* Ancienne signature, gardée pour la révision libre. */
export function makeExercises(items, count = 10) {
  return makeSession({ items, count, crown: 1 });
}
