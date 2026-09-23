import React, { useEffect, useState } from "react";
import { Gem, Sparkles, Star, Target, Zap } from "lucide-react";
import { sndTap } from "../lib/audio.js";
import { Confetti } from "./bits.jsx";
import { Mascot } from "./Mascot.jsx";

/* Un compteur qui grimpe : la récompense se regarde arriver. */
function Rolling({ value, className = "" }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const start = performance.now(), dur = 700;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span className={`tabular-nums ${className}`}>{shown}</span>;
}

export function ResultScreen({ result, onHome }) {
  const {
    xpGained, gemsGained, stars, mistakes, right, total,
    levelUps, levelGems, newLevel, newTitle, newBadges, crownUp, unit, goalReached,
  } = result;
  const accuracy = total ? Math.round((right / total) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-10">
      <Confetti />
      <Mascot mood="celebrate" size={130} />
      <h2 className="text-3xl font-extrabold text-emerald-700 mt-1">Muito bem!</h2>
      <p className="text-slate-500 mt-1 mb-5">
        {mistakes === 0 ? "Aucune erreur, chapeau." : `${mistakes} erreur${mistakes > 1 ? "s" : ""} — ces mots reviendront en révision.`}
      </p>

      <div className="flex gap-1 mb-5">
        {[1, 2, 3].map((s) => (
          <Star key={s} className={`w-10 h-10 ${s <= stars ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
            style={s <= stars ? { animation: `fb-pop .4s ease-out ${s * 0.12}s backwards` } : {}} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 w-full max-w-xs mb-4">
        <div className="rounded-2xl bg-yellow-50 border-2 border-yellow-200 p-3">
          <Zap className="w-5 h-5 text-yellow-500 mx-auto" />
          <div className="text-xl font-extrabold text-yellow-700">+<Rolling value={xpGained} /></div>
          <div className="text-[10px] font-bold text-yellow-600">XP</div>
        </div>
        <div className="rounded-2xl bg-sky-50 border-2 border-sky-200 p-3">
          <Gem className="w-5 h-5 text-sky-500 mx-auto" />
          <div className="text-xl font-extrabold text-sky-700">+<Rolling value={gemsGained + levelGems} /></div>
          <div className="text-[10px] font-bold text-sky-600">gemmes</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-200 p-3">
          <Target className="w-5 h-5 text-emerald-500 mx-auto" />
          <div className="text-xl font-extrabold text-emerald-700"><Rolling value={accuracy} />%</div>
          <div className="text-[10px] font-bold text-emerald-600">réussite</div>
        </div>
      </div>

      {crownUp && (
        <div className="w-full max-w-xs mb-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-white p-4 fb-burst">
          <div className="text-3xl">👑</div>
          <div className="font-extrabold">Nouvelle couronne</div>
          <div className="text-sm text-white/90">{unit.title} — les prochains exercices monteront d'un cran.</div>
        </div>
      )}

      {goalReached && (
        <div className="w-full max-w-xs mb-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 fb-slide-in">
          <div className="text-3xl">🎁</div>
          <div className="font-extrabold">Objectif du jour atteint</div>
          <div className="text-sm text-white/90">Un coffre t'attend sur l'accueil.</div>
        </div>
      )}

      {levelUps > 0 && (
        <div className="w-full max-w-xs mb-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4" style={{ animation: "fb-pop .5s ease-out .2s backwards" }}>
          <div className="text-3xl">🏅</div>
          <div className="font-extrabold text-lg">Niveau {newLevel} · {newTitle}</div>
          <div className="text-sm text-white/90">+{levelGems} gemmes de récompense</div>
        </div>
      )}

      {newBadges.length > 0 && (
        <div className="w-full max-w-xs mb-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-4">
          <div className="flex items-center justify-center gap-2 font-extrabold mb-2"><Sparkles className="w-5 h-5" /> Nouveau trophée</div>
          {newBadges.map((b) => <div key={b.id} className="text-sm">{b.emoji} {b.label}</div>)}
        </div>
      )}

      <button onClick={() => { sndTap(); onHome(); }}
        className="w-full max-w-xs rounded-2xl bg-emerald-500 text-white font-extrabold py-4 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
        Continuer
      </button>
    </div>
  );
}
