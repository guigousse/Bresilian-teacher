import React from "react";
import { ArrowLeft, Flame, Gem, Target, Volume2, Zap } from "lucide-react";
import { UNITS } from "../data/units.js";
import { levelInfo } from "../lib/levels.js";
import {
  masteryBreakdown, accuracyOf, reviewForecast, activeDays, weakItems,
  crownOf, MAX_CROWN, totalCrowns, srsOf, masteryOf, goalOf, dueCount,
} from "../lib/progress.js";
import { speak } from "../lib/speech.js";
import { sndTap } from "../lib/audio.js";
import { Phonetic } from "./bits.jsx";
import { PH_OF } from "../data/units.js";

/* Une seule teinte, du clair au foncé : la couleur ne dit que « combien ».
   Le gris n'est pas une valeur, c'est l'absence d'activité. */
const HEAT = ["#f1f5f9", "#a7f3d0", "#6ee7b7", "#34d399", "#059669"];
const STATE_COLORS = { fragile: "#f97316", solide: "#0ea5e9", acquis: "#059669", neuf: "#94a3b8", jamais: "#e2e8f0" };

function StatTile({ icon, value, label, tone = "text-slate-800" }) {
  return (
    <div className="rounded-2xl border-2 border-slate-100 p-3">
      <div className="flex items-center gap-1.5 text-slate-400">{icon}<span className="text-[11px] font-bold">{label}</span></div>
      <div className={`text-2xl font-extrabold tabular-nums mt-0.5 ${tone}`}>{value}</div>
    </div>
  );
}

export function StatsScreen({ progress, prefs, onBack, onStart }) {
  const li = levelInfo(progress.xp);
  const mastery = masteryBreakdown(progress);
  const acc = accuracyOf(progress);
  const forecast = reviewForecast(progress, 7);
  const days = activeDays(progress, 56);
  const weak = weakItems(progress, 8);
  const due = dueCount(progress);
  const totalWords = Object.values(mastery).reduce((a, b) => a + b, 0);
  const maxForecast = Math.max(1, ...forecast);
  const maxDay = Math.max(1, ...days.map((d) => d.xp));
  const goal = goalOf(prefs);
  const daysHitGoal = days.filter((d) => d.xp >= goal).length;

  const order = [
    { key: "acquis", label: "Acquis" },
    { key: "solide", label: "Solides" },
    { key: "fragile", label: "Fragiles" },
    { key: "neuf", label: "Tout neufs" },
    { key: "jamais", label: "Jamais vus" },
  ];

  return (
    <div className="pb-28">
      <div className="px-4 py-4 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white z-20">
        <button onClick={onBack} className="w-9 h-9 grid place-items-center rounded-xl text-slate-500 shrink-0"><ArrowLeft className="w-5 h-5" /></button>
        <div>
          <h2 className="font-extrabold text-lg text-slate-800">Ma progression</h2>
          <p className="text-xs text-slate-400">Ce que tu sais vraiment, et ce qui s'efface.</p>
        </div>
      </div>

      <div className="px-4 pt-5 grid grid-cols-2 gap-3">
        <StatTile icon={<Zap className="w-3.5 h-3.5" />} label="XP total" value={progress.xp} tone="text-amber-600" />
        <StatTile icon={<Target className="w-3.5 h-3.5" />} label="Réussite" value={`${acc.pct}%`} tone="text-emerald-600" />
        <StatTile icon={<Flame className="w-3.5 h-3.5" />} label="Meilleure série" value={`${progress.best || progress.streak} j`} tone="text-orange-600" />
        <StatTile icon={<span className="text-xs">👑</span>} label="Couronnes" value={`${totalCrowns(progress)}/${UNITS.length * MAX_CROWN}`} tone="text-sky-600" />
      </div>

      {/* Où en est la mémoire */}
      <div className="px-4 pt-7">
        <h3 className="font-extrabold text-slate-800">Mes {totalWords} mots</h3>
        <p className="text-xs text-slate-400 mb-3">Un mot devient « acquis » quand il tient plusieurs révisions espacées d'affilée.</p>
        <div className="flex gap-[2px] h-5 rounded-lg overflow-hidden">
          {order.map((o) => {
            const n = mastery[o.key] || 0;
            if (!n) return null;
            return <div key={o.key} title={`${o.label} : ${n}`} style={{ width: `${(n / totalWords) * 100}%`, background: STATE_COLORS[o.key] }} />;
          })}
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-3">
          {order.map((o) => (
            <div key={o.key} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: STATE_COLORS[o.key] }} />
              <span className="text-slate-500 flex-1">{o.label}</span>
              <span className="font-bold text-slate-700 tabular-nums">{mastery[o.key] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ce qui revient dans les prochains jours */}
      <div className="px-4 pt-7">
        <h3 className="font-extrabold text-slate-800">À réviser cette semaine</h3>
        <p className="text-xs text-slate-400 mb-3">
          {due > 0 ? `${due} mot${due > 1 ? "s sont" : " est"} à revoir aujourd'hui.` : "Rien à revoir aujourd'hui."}
        </p>
        <div className="flex items-end gap-2 h-24">
          {forecast.map((n, i) => {
            const label = i === 0 ? "Auj." : ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][(new Date().getDay() + i) % 7];
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${label} : ${n} mot${n > 1 ? "s" : ""}`}>
                <span className="text-[10px] font-bold text-slate-500 tabular-nums">{n || ""}</span>
                <div className="w-full rounded-t-[4px] bg-amber-400 transition-all" style={{ height: `${Math.max(n ? 6 : 2, (n / maxForecast) * 62)}px` }} />
                <span className="text-[9px] text-slate-400">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Régularité */}
      <div className="px-4 pt-7">
        <h3 className="font-extrabold text-slate-800">Mes huit dernières semaines</h3>
        <p className="text-xs text-slate-400 mb-3">{daysHitGoal} jour{daysHitGoal > 1 ? "s" : ""} où l'objectif a été atteint.</p>
        <div className="flex gap-[3px]">
          {Array.from({ length: 8 }, (_, w) => (
            <div key={w} className="flex flex-col gap-[3px] flex-1">
              {Array.from({ length: 7 }, (_, d) => {
                const day = days[w * 7 + d];
                if (!day) return <div key={d} className="aspect-square" />;
                const lvl = day.xp === 0 ? 0 : day.xp >= goal ? 4 : day.xp >= goal * 0.6 ? 3 : day.xp >= goal * 0.3 ? 2 : 1;
                return <div key={d} className="aspect-square rounded-[3px]" style={{ background: HEAT[lvl] }} title={`${day.day} — ${day.xp} XP`} />;
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1 mt-2 text-[10px] text-slate-400">
          <span>moins</span>
          {HEAT.map((c) => <span key={c} className="w-2.5 h-2.5 rounded-[2px]" style={{ background: c }} />)}
          <span>plus</span>
        </div>
      </div>

      {/* Ce qui résiste */}
      {weak.length > 0 && (
        <div className="px-4 pt-7">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-slate-800">Mots qui résistent</h3>
            <button onClick={() => { sndTap(); onStart("weak"); }} className="rounded-xl bg-orange-500 text-white text-xs font-bold px-3 py-1.5 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1">
              Les travailler
            </button>
          </div>
          <div className="rounded-2xl border-2 border-slate-100 divide-y divide-slate-100 overflow-hidden">
            {weak.map((it) => {
              const s = srsOf(progress, it.pt);
              const m = masteryOf(s.box);
              return (
                <div key={it.pt} className="flex items-center gap-3 px-3 py-2">
                  <button onClick={() => speak(it.pt)} aria-label="Écouter" className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 grid place-items-center shrink-0"><Volume2 className="w-4 h-4" /></button>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-slate-800 truncate">{it.pt}</div>
                    <div className="text-xs text-slate-500 truncate">{it.fr} · <Phonetic text={PH_OF[it.pt]} /></div>
                  </div>
                  <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0 ${m.tone}`}>{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Couronnes par unité */}
      <div className="px-4 pt-7">
        <h3 className="font-extrabold text-slate-800 mb-2">Maîtrise par palier</h3>
        <div className="space-y-1.5">
          {UNITS.map((u) => {
            const c = crownOf(progress, u.id);
            return (
              <div key={u.id} className="flex items-center gap-2">
                <span className="text-lg shrink-0">{u.emoji}</span>
                <span className="text-sm font-semibold text-slate-600 flex-1 truncate">{u.title}</span>
                <span className="flex gap-0.5 shrink-0">
                  {Array.from({ length: MAX_CROWN }, (_, i) => (
                    <span key={i} className={`w-2 h-2 rounded-full ${i < c ? "bg-amber-400" : "bg-slate-200"}`} />
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 pt-7">
        <div className="rounded-2xl bg-slate-50 border-2 border-slate-100 p-3 text-xs text-slate-500 flex gap-2">
          <Gem className="w-4 h-4 text-slate-400 shrink-0" />
          <p>
            Niveau {li.level} · {li.title}. Les révisions reviennent à intervalles de plus en plus longs :
            un mot juste aujourd'hui revient demain, puis dans deux jours, quatre, neuf… jusqu'à tenir tout seul.
          </p>
        </div>
      </div>
    </div>
  );
}
