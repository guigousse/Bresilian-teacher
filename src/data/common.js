/* ==================================================================
   COMMUN À TOUTES LES LANGUES — raretés des coffres, des souvenirs et
   des cartes postales.
   ================================================================== */

export const TIERS = {
  commun:     { label: "Commun",     glow: "#d6b98c", ring: "border-stone-300",   chip: "bg-stone-100 text-stone-600",   text: "text-stone-600" },
  rare:       { label: "Rare",       glow: "#38bdf8", ring: "border-sky-400",     chip: "bg-sky-100 text-sky-700",       text: "text-sky-600" },
  epique:     { label: "Épique",     glow: "#a855f7", ring: "border-purple-400",  chip: "bg-purple-100 text-purple-700", text: "text-purple-600" },
  legendaire: { label: "Légendaire", glow: "#f59e0b", ring: "border-amber-400",   chip: "bg-amber-100 text-amber-800",   text: "text-amber-600" },
};
export const TIER_ORDER = ["commun", "rare", "epique", "legendaire"];

/* Raretés des cartes postales (les clés viennent du portugais). */
export const RARITY = {
  comum: { label: "Commune", weight: 62, ring: "border-slate-200", chip: "bg-slate-100 text-slate-600" },
  rara: { label: "Rare", weight: 30, ring: "border-sky-300", chip: "bg-sky-100 text-sky-700" },
  lendaria: { label: "Légendaire", weight: 8, ring: "border-amber-400", chip: "bg-amber-100 text-amber-700" },
};

