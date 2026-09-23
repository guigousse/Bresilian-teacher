/* ==================================================================
   PROGRESSION — état de l'élève, répétition espacée, quêtes, séries.

   Le principe : tout ce qui décide « où en est l'élève » vit ici, et
   les écrans ne font que l'afficher. La mémoire des mots est gérée par
   des boîtes de Leitner (plus une réponse est solide, plus la révision
   est repoussée loin), ce qui donne à l'app une raison honnête de
   rappeler l'élève chaque jour : ses mots arrivent à échéance.
   ================================================================== */

import { UNITS, ALL_ITEMS } from "../data/units.js";
import { STORIES } from "../data/stories.js";
import { CARDS } from "../data/cards.js";
import { levelInfo } from "./levels.js";
import { todayKey, daysBetween } from "./utils.js";

/* --- Répétition espacée ------------------------------------------ */

/* Jours d'attente avant la prochaine révision, par boîte. Une réponse
   juste fait monter d'une boîte, une erreur fait redescendre d'une. */
export const SRS_INTERVALS = [0, 1, 2, 4, 9, 18, 35];
export const SRS_MAX_BOX = SRS_INTERVALS.length - 1;

export const MASTERY_LEVELS = [
  { min: 0, key: "neuf", label: "Tout neuf", tone: "bg-slate-100 text-slate-500" },
  { min: 1, key: "fragile", label: "Fragile", tone: "bg-orange-100 text-orange-700" },
  { min: 3, key: "solide", label: "Solide", tone: "bg-sky-100 text-sky-700" },
  { min: 5, key: "acquis", label: "Acquis", tone: "bg-emerald-100 text-emerald-700" },
];

export function masteryOf(box) {
  let out = MASTERY_LEVELS[0];
  for (const m of MASTERY_LEVELS) if (box >= m.min) out = m;
  return out;
}

function addDays(dayKey, n) {
  const [y, m, d] = dayKey.split("-").map(Number);
  const date = new Date(y, m - 1, d + n);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function srsOf(p, pt) {
  return (p.srs && p.srs[pt]) || { box: 0, due: null, right: 0, wrong: 0, last: null };
}

/* Enregistre une réponse et replace le mot dans la file de révision. */
export function recordAnswer(p, pt, correct) {
  const today = todayKey();
  const cur = srsOf(p, pt);
  const box = correct ? Math.min(SRS_MAX_BOX, cur.box + 1) : Math.max(0, cur.box - 1);
  p.srs = p.srs || {};
  p.srs[pt] = {
    box,
    due: addDays(today, correct ? SRS_INTERVALS[box] : 0),
    right: cur.right + (correct ? 1 : 0),
    wrong: cur.wrong + (correct ? 0 : 1),
    last: today,
  };
  p.learned[pt] = (p.learned[pt] || 0) + 1;
}

/* Mots dont la révision est due, les plus en retard d'abord. */
export function dueItems(p, limit = 999) {
  const today = todayKey();
  const out = [];
  for (const it of ALL_ITEMS) {
    const s = srsOf(p, it.pt);
    if (!s.due) continue;
    const late = daysBetween(s.due, today);
    if (late >= 0) out.push({ item: it, late, box: s.box });
  }
  out.sort((a, b) => (b.late - a.late) || (a.box - b.box));
  return out.slice(0, limit).map((x) => x.item);
}

export function dueCount(p) { return dueItems(p).length; }

/* Les mots qui résistent : peu solides et déjà ratés. */
export function weakItems(p, limit = 12) {
  return ALL_ITEMS
    .map((it) => ({ item: it, s: srsOf(p, it.pt) }))
    .filter((x) => x.s.last && x.s.wrong > 0 && x.s.box <= 2)
    .sort((a, b) => (b.s.wrong - a.s.wrong) || (a.s.box - b.s.box))
    .slice(0, limit)
    .map((x) => x.item);
}

/* Mots déjà rencontrés, pour les sessions de révision libre. */
export function seenItems(p) {
  return ALL_ITEMS.filter((it) => srsOf(p, it.pt).last);
}

/* Combien de révisions tombent sur chacun des prochains jours. */
export function reviewForecast(p, days = 7) {
  const today = todayKey();
  const buckets = Array.from({ length: days }, () => 0);
  for (const it of ALL_ITEMS) {
    const s = srsOf(p, it.pt);
    if (!s.due) continue;
    const inDays = daysBetween(today, s.due);
    if (inDays <= 0) buckets[0]++;
    else if (inDays < days) buckets[inDays]++;
  }
  return buckets;
}

export function masteryBreakdown(p) {
  const out = { neuf: 0, fragile: 0, solide: 0, acquis: 0, jamais: 0 };
  for (const it of ALL_ITEMS) {
    const s = srsOf(p, it.pt);
    if (!s.last) { out.jamais++; continue; }
    out[masteryOf(s.box).key]++;
  }
  return out;
}

export function accuracyOf(p) {
  let r = 0, w = 0;
  Object.values(p.srs || {}).forEach((s) => { r += s.right || 0; w += s.wrong || 0; });
  return { right: r, wrong: w, pct: r + w ? Math.round((r / (r + w)) * 100) : 0 };
}

/* --- Couronnes : une unité se rejoue, de plus en plus dur ---------- */

export const MAX_CROWN = 5;
export const CROWN_LABELS = ["Découverte", "Reconnaissance", "Écoute", "Écriture", "Production", "Maîtrise"];

export function crownOf(p, unitId) { return (p.crowns && p.crowns[unitId]) || 0; }
export function totalCrowns(p) { return UNITS.reduce((n, u) => n + crownOf(p, u.id), 0); }

/* --- Objectif quotidien ------------------------------------------- */

export const GOAL_OPTIONS = [
  { xp: 20, label: "Tranquille", desc: "≈ 3 min par jour" },
  { xp: 50, label: "Régulier", desc: "≈ 7 min par jour" },
  { xp: 80, label: "Sérieux", desc: "≈ 12 min par jour" },
  { xp: 120, label: "Intense", desc: "≈ 18 min par jour" },
];

export function goalOf(prefs) { return prefs.dailyGoal || 50; }

/* --- Quêtes du jour ------------------------------------------------ */

export const QUEST_POOL = [
  { id: "xp", label: "Gagner {goal} XP", metric: "xp", goals: [40, 60, 90], gems: 15 },
  { id: "right", label: "{goal} bonnes réponses", metric: "right", goals: [15, 25, 35], gems: 15 },
  { id: "lessons", label: "Terminer {goal} leçon(s)", metric: "lessons", goals: [1, 2, 3], gems: 20 },
  { id: "review", label: "Réviser {goal} mots", metric: "review", goals: [8, 12, 20], gems: 20 },
  { id: "perfect", label: "Une leçon sans faute", metric: "perfect", goals: [1], gems: 25 },
  { id: "listen", label: "Écouter {goal} mots", metric: "listen", goals: [8, 12], gems: 10 },
  { id: "story", label: "Retrouver {goal} mots dans un livre", metric: "story", goals: [4, 6], gems: 20 },
  { id: "type", label: "Écrire {goal} mots en portugais", metric: "type", goals: [5, 8], gems: 20 },
];

/* Un tirage stable pour la journée : même jour, mêmes quêtes. */
function daySeed(day) {
  let h = 0;
  for (let i = 0; i < day.length; i++) h = (h * 31 + day.charCodeAt(i)) % 100000;
  return h;
}

export function rollQuests(day) {
  const seed = daySeed(day);
  const pool = [...QUEST_POOL];
  const out = [];
  for (let i = 0; i < 3 && pool.length; i++) {
    const q = pool.splice((seed * (i + 3)) % pool.length, 1)[0];
    const goal = q.goals[(seed + i) % q.goals.length];
    out.push({ id: q.id, metric: q.metric, goal, gems: q.gems, label: q.label.replace("{goal}", goal) });
  }
  return out;
}

export function ensureQuests(p) {
  const day = todayKey();
  if (!p.quests || p.quests.day !== day) {
    p.quests = { day, list: rollQuests(day), counts: {}, claimed: [] };
  }
  return p.quests;
}

/* Incrémente un compteur de quête (xp, right, lessons, review…). */
export function bumpQuest(p, metric, n = 1) {
  const q = ensureQuests(p);
  q.counts[metric] = (q.counts[metric] || 0) + n;
}

export function questDone(q, quest) { return (q.counts[quest.metric] || 0) >= quest.goal; }

/* --- Série et gel -------------------------------------------------- */

/* Les paliers de série et leur prime. La récompense grandit avec la
   régularité, pas avec le temps passé dans l'app : c'est revenir qui
   compte, pas rester. */
export const STREAK_MILESTONES = { 3: 20, 7: 40, 14: 60, 30: 100, 50: 150, 100: 250, 200: 400, 365: 600 };
export const FREEZE_PRICE = 80;
export const MAX_FREEZES = 2;

/* Applique le changement de jour : remise à zéro du compteur du jour,
   consommation d'un gel si un seul jour a été manqué. */
export function rollOverDay(p) {
  const today = todayKey();
  if (p.today !== today) {
    p.today = today;
    p.xpToday = 0;
    p.goalChest = null;
  }
  if (p.lastDay) {
    const gap = daysBetween(p.lastDay, today);
    if (gap > 1) {
      const missed = gap - 1;
      if (missed === 1 && (p.freezes || 0) > 0) {
        p.freezes -= 1;
        p.freezeUsed = today;
      } else {
        p.streak = 0;
      }
    }
  }
  ensureQuests(p);
  return p;
}

/* Enregistre une journée d'activité (série, historique, objectif). */
export function markActivity(p, { xp = 0, right = 0, wrong = 0 }) {
  const today = todayKey();
  if (p.lastDay !== today) {
    p.streak = p.lastDay && daysBetween(p.lastDay, today) === 1 ? p.streak + 1 : 1;
    p.lastDay = today;
    p.best = Math.max(p.best || 0, p.streak);
  }
  p.days = p.days || {};
  const d = p.days[today] || { xp: 0, right: 0, wrong: 0 };
  d.xp += xp; d.right += right; d.wrong += wrong;
  p.days[today] = d;
  const keys = Object.keys(p.days);
  if (keys.length > 140) delete p.days[keys[0]];
}

export function activeDays(p, days = 56) {
  const out = [];
  const today = todayKey();
  for (let i = days - 1; i >= 0; i--) {
    const key = addDays(today, -i);
    out.push({ day: key, ...(p.days && p.days[key] ? p.days[key] : { xp: 0, right: 0, wrong: 0 }) });
  }
  return out;
}

/* --- Trophées ------------------------------------------------------ */

export function doneCount(p) { return Object.values(p.lessons).filter((l) => l.done).length; }
export function booksDone(p) { return Object.values(p.story || {}).filter((s) => s.done).length; }
export function storyProgress(p, unitId) { return (p.story && p.story[unitId]) || { found: [], done: false }; }

export const BADGES = [
  { id: "first", label: "Primeira aula", desc: "Terminer une leçon", emoji: "🌱", test: (p) => doneCount(p) >= 1 },
  { id: "three", label: "Em ritmo", desc: "3 leçons terminées", emoji: "🚀", test: (p) => doneCount(p) >= 3 },
  { id: "perfect", label: "Sem erro", desc: "Une leçon sans faute", emoji: "💎", test: (p) => Object.values(p.lessons).some((l) => l.stars === 3) },
  { id: "lvl5", label: "Nível 5", desc: "Atteindre le niveau 5", emoji: "⚡", test: (p) => levelInfo(p.xp).level >= 5 },
  { id: "lvl10", label: "Nível 10", desc: "Atteindre le niveau 10", emoji: "🔥", test: (p) => levelInfo(p.xp).level >= 10 },
  { id: "words50", label: "50 mots", desc: "50 mots rencontrés", emoji: "📚", test: (p) => Object.keys(p.learned).length >= 50 },
  { id: "solid30", label: "Memória boa", desc: "30 mots acquis", emoji: "🧠", test: (p) => masteryBreakdown(p).acquis >= 30 },
  { id: "streak3", label: "3 jours", desc: "3 jours d'affilée", emoji: "🗓️", test: (p) => p.streak >= 3 },
  { id: "streak7", label: "Uma semana", desc: "7 jours d'affilée", emoji: "🔥", test: (p) => p.streak >= 7 },
  { id: "streak30", label: "Um mês", desc: "30 jours d'affilée", emoji: "🌟", test: (p) => (p.best || p.streak) >= 30 },
  { id: "crown5", label: "Primeira coroa", desc: "Une unité maîtrisée", emoji: "👑", test: (p) => UNITS.some((u) => crownOf(p, u.id) >= MAX_CROWN) },
  { id: "crownAll", label: "Rei do português", desc: "Toutes les unités maîtrisées", emoji: "🏅", test: (p) => UNITS.every((u) => crownOf(p, u.id) >= MAX_CROWN) },
  { id: "quest10", label: "Missões", desc: "10 quêtes terminées", emoji: "🎯", test: (p) => (p.questsDone || 0) >= 10 },
  { id: "card1", label: "Primeiro cartão", desc: "Acheter une carte", emoji: "💌", test: (p) => (p.cards || []).length >= 1 },
  { id: "card10", label: "Colecionador", desc: "10 cartes postales", emoji: "🗂️", test: (p) => (p.cards || []).length >= 10 },
  { id: "cardAll", label: "Álbum completo", desc: "Les 20 cartes", emoji: "🏆", test: (p) => (p.cards || []).length >= CARDS.length },
  { id: "allLessons", label: "Brasileiro", desc: "Toutes les leçons", emoji: "🇧🇷", test: (p) => doneCount(p) >= UNITS.length },
  { id: "book1", label: "Primeiro livro", desc: "Terminer un livre", emoji: "📖", test: (p) => booksDone(p) >= 1 },
  { id: "allBooks", label: "Bibliotecário", desc: "Tous les livres terminés", emoji: "🎓", test: (p) => booksDone(p) >= STORIES.length },
];

export function freshBadges(p) {
  return BADGES.filter((b) => !p.badges.includes(b.id) && b.test(p));
}

/* --- État par défaut et migration ---------------------------------- */

export function defaultProgress() {
  return {
    v: 3,
    xp: 0, gems: 50, streak: 0, best: 0, lastDay: null, today: null, xpToday: 0,
    lessons: {}, learned: {}, badges: [], cards: [], story: {},
    srs: {}, crowns: {}, days: {}, quests: null, questsDone: 0,
    freezes: 1, freezeUsed: null, goalChest: null,
  };
}

export function defaultPrefs() {
  return { voiceURI: null, rate: 0.88, pitch: 1.05, showPhonetics: true, dailyGoal: 50, haptics: true };
}

/* Les anciennes sauvegardes n'ont ni mémoire des mots ni couronnes :
   on reconstruit une mémoire plausible à partir des mots déjà croisés. */
export function migrate(saved) {
  const p = { ...defaultProgress(), ...saved };
  if (!p.srs || Object.keys(p.srs).length === 0) {
    p.srs = {};
    const today = todayKey();
    Object.entries(p.learned || {}).forEach(([pt, n]) => {
      const box = Math.max(1, Math.min(3, n));
      p.srs[pt] = { box, due: today, right: n, wrong: 0, last: today };
    });
  }
  if (!p.crowns) p.crowns = {};
  /* Une leçon terminée dans l'ancienne version vaut une première couronne. */
  Object.entries(p.lessons || {}).forEach(([id, l]) => {
    if (l.done && p.crowns[id] === undefined) p.crowns[id] = 1;
  });
  if (!p.days) p.days = {};
  if (typeof p.freezes !== "number") p.freezes = 1;
  if (typeof p.best !== "number") p.best = p.streak || 0;
  p.v = 3;
  return p;
}

/* --- Récompenses --------------------------------------------------- */

export const XP_PER_CORRECT = 10;

export function chestReward(p) {
  const roll = Math.random();
  if (roll < 0.15 && (p.freezes || 0) < MAX_FREEZES) return { kind: "freeze", label: "1 gel de série", gems: 0 };
  const gems = 15 + Math.floor(Math.random() * 4) * 5;
  return { kind: "gems", label: `${gems} gemmes`, gems };
}

