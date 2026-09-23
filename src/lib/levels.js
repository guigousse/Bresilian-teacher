/*  NIVEAUX                                                            */
/* ================================================================== */

export const LEVEL_TITLES = ["Iniciante", "Turista", "Viajante", "Mochileiro", "Praieiro", "Sambista",
  "Carioca", "Baiano", "Sertanejo", "Malandro", "Poeta", "Brasileiro de coração"];
export const LEVEL_GEMS = 60;

/* XP cumulés requis : 0, 100, 250, 450, 700, 1000, 1350… */
export const LEVEL_XP = (() => {
  const t = [0]; let step = 100, acc = 0;
  for (let i = 1; i < 30; i++) { acc += step; t.push(acc); step += 50; }
  return t;
})();

export function levelInfo(xp) {
  let lvl = 1;
  for (let i = 0; i < LEVEL_XP.length; i++) if (xp >= LEVEL_XP[i]) lvl = i + 1;
  const floor = LEVEL_XP[lvl - 1];
  const ceil = LEVEL_XP[lvl] != null ? LEVEL_XP[lvl] : floor;
  const span = Math.max(1, ceil - floor);
  return {
    level: lvl,
    title: LEVEL_TITLES[Math.min(lvl - 1, LEVEL_TITLES.length - 1)],
    into: xp - floor,
    span,
    toNext: Math.max(0, ceil - xp),
    pct: Math.min(100, Math.round(((xp - floor) / span) * 100)),
  };
}
