/* ==================================================================
   LES COFFRES — un coffre se gagne (objectif du jour, palier de série,
   livre terminé), attend sur l'accueil, et s'ouvre quand on veut.

   Sa rareté est tirée au moment où on le gagne : il brille déjà de sa
   couleur avant d'être ouvert, et c'est cette attente qui fait le
   plaisir. Son contenu, lui, est tiré à l'ouverture, pour tenir compte
   de ce que l'élève possède déjà et de l'endroit où il en est dans
   l'histoire — un souvenir ne sort jamais avant sa page.

   Deux garanties évitent qu'une mauvaise série décourage : un coffre
   au moins rare tous les 7, au moins épique tous les 15.
   ================================================================== */

import { PAPERS, SOUVENIRS, TIER_ORDER } from "../data/souvenirs.js";
import { storyProgress, MAX_FREEZES } from "./progress.js";
import { todayKey } from "./utils.js";

export const PITY_RARE = 7;
export const PITY_EPIC = 15;

/* Chances de rareté (en %) selon ce qui a fait gagner le coffre. */
const ODDS = {
  goal:   { commun: 55, rare: 30, epique: 12, legendaire: 3 },
  streak: { commun: 0, rare: 70, epique: 25, legendaire: 5 },
  book:   { commun: 0, rare: 0, epique: 85, legendaire: 15 },
};

export const SOURCE_LABEL = {
  goal: "Objectif du jour",
  streak: "Palier de série",
  book: "Livre terminé",
};

const rank = (t) => TIER_ORDER.indexOf(t);
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

function rollTier(odds) {
  let r = Math.random() * 100;
  for (const t of TIER_ORDER) {
    r -= odds[t] || 0;
    if (r < 0) return t;
  }
  return TIER_ORDER.find((t) => odds[t]) || "commun";
}

/* Ajoute un coffre à la file. Appelée à l'intérieur d'une mise à jour
   de la progression : elle modifie p directement. */
export function grantChest(p, source) {
  const pity = { rare: 0, epic: 0, ...(p.pity || {}) };
  let tier = rollTier(ODDS[source] || ODDS.goal);
  if (rank(tier) < 1 && pity.rare + 1 >= PITY_RARE) tier = "rare";
  if (rank(tier) < 2 && pity.epic + 1 >= PITY_EPIC) tier = "epique";
  pity.rare = rank(tier) >= 1 ? 0 : pity.rare + 1;
  pity.epic = rank(tier) >= 2 ? 0 : pity.epic + 1;
  p.pity = pity;

  const chest = { id: `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, tier, source };
  p.chests = [...(p.chests || []), chest];
  return chest;
}

/* --- Ce qui peut encore sortir ------------------------------------ */

function freePapers(p, rarities) {
  const owned = new Set(p.papers || []);
  return PAPERS.filter((x) => !owned.has(x.id) && rarities.includes(x.rarity));
}

export function souvenirReachable(p, s) {
  return storyProgress(p, s.after).done;
}

function freeSouvenirs(p, rarities) {
  const owned = new Set(p.souvenirs || []);
  return SOUVENIRS.filter((x) => !owned.has(x.id) && rarities.includes(x.rarity) && souvenirReachable(p, x));
}

/* Le premier groupe non vide l'emporte : on préfère la rareté du
   coffre, on se rabat sur la précédente plutôt que de rendre un coffre
   vide. */
function firstOf(...groups) {
  for (const g of groups) if (g.length) return pick(g);
  return null;
}

function rollLoot(p, tier) {
  const r = Math.random();
  const gems = (n) => ({ kind: "gems", n });
  const paper = (x) => x && { kind: "paper", id: x.id };
  const souvenir = (x) => x && { kind: "souvenir", id: x.id };

  if (tier === "commun") {
    if (r < 0.4) return [paper(firstOf(freePapers(p, ["commun"]))) || gems(rnd(3, 6) * 5)];
    return [gems(rnd(3, 6) * 5)];
  }
  if (tier === "rare") {
    if (r < 0.55) return [paper(firstOf(freePapers(p, ["rare"]), freePapers(p, ["commun"]))) || gems(rnd(8, 12) * 5)];
    if (r < 0.75 && (p.freezes || 0) < MAX_FREEZES) return [{ kind: "freeze" }];
    return [gems(rnd(8, 12) * 5)];
  }
  if (tier === "epique") {
    const s = r < 0.65 ? souvenir(firstOf(freeSouvenirs(p, ["epique"]), freeSouvenirs(p, ["rare"]))) : null;
    if (s) return [s];
    return [paper(firstOf(freePapers(p, ["epique"]), freePapers(p, ["rare"]), freePapers(p, ["commun"])))
      || souvenir(firstOf(freeSouvenirs(p, ["epique", "rare"])))
      || gems(80)];
  }
  /* légendaire : le meilleur souvenir disponible, et des gemmes en plus */
  const s = souvenir(firstOf(freeSouvenirs(p, ["legendaire"]), freeSouvenirs(p, ["epique"]), freeSouvenirs(p, ["rare"])))
    || paper(firstOf(freePapers(p, ["epique"]), freePapers(p, ["rare"])));
  return s ? [s, gems(40)] : [gems(120)];
}

/* Ouvre un coffre de la file : tire son contenu, l'ajoute à la
   progression, et renvoie ce qu'il faut montrer. */
export function openChestIn(p, chestId) {
  const chest = (p.chests || []).find((c) => c.id === chestId);
  if (!chest) return null;
  const loot = rollLoot(p, chest.tier);
  const today = todayKey();

  loot.forEach((it) => {
    if (it.kind === "gems") p.gems += it.n;
    if (it.kind === "freeze") p.freezes = Math.min(MAX_FREEZES, (p.freezes || 0) + 1);
    if (it.kind === "souvenir") p.souvenirs = [...(p.souvenirs || []), it.id];
    if (it.kind === "paper") {
      p.papers = [...(p.papers || []), it.id];
      /* Le papier entre dans la révision dès aujourd'hui. */
      const item = PAPERS.find((x) => x.id === it.id);
      p.srs = p.srs || {};
      if (item && !p.srs[item.pt]) p.srs[item.pt] = { box: 0, due: today, right: 0, wrong: 0, last: today };
    }
  });

  p.chests = p.chests.filter((c) => c.id !== chestId);
  p.chestsOpened = (p.chestsOpened || 0) + 1;
  return { chest, loot };
}

/* Anciennes sauvegardes : le coffre du jour en attente devient un
   coffre de la file. */
export function migrateChests(p) {
  if (!Array.isArray(p.chests)) p.chests = [];
  if (!Array.isArray(p.souvenirs)) p.souvenirs = [];
  if (!Array.isArray(p.papers)) p.papers = [];
  if (p.goalChest === "ready") {
    grantChest(p, "goal");
    p.goalChest = "given";
  }
  return p;
}
