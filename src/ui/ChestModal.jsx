import React, { useState, useEffect } from "react";
import { Gem, Snowflake, Volume2 } from "lucide-react";
import { TIERS, PAPERS, SOUVENIRS } from "../data/souvenirs.js";
import { SOURCE_LABEL } from "../lib/chests.js";
import { speak } from "../lib/speech.js";
import { sndTap, sndChest, sndLevel, sndCard } from "../lib/audio.js";
import { Confetti, useShortScreen } from "./bits.jsx";
import { ChestArt, SouvenirArt, PaperSlip } from "./SouvenirArt.jsx";

/* ==================================================================
   L'OUVERTURE D'UN COFFRE — il brille déjà de sa rareté, il tremble
   quand on le touche, le couvercle saute, et ce qu'il contenait monte
   dans la lumière.
   ================================================================== */

function Loot({ it, index }) {
  const delay = { animationDelay: `${index * 180}ms` };
  if (it.kind === "gems") {
    return (
      <div className="fb-loot flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 py-3" style={delay}>
        <Gem className="w-7 h-7 text-sky-300" />
        <span className="text-2xl font-extrabold text-white tabular-nums">+{it.n}</span>
        <span className="text-sm text-white/70">gemmes</span>
      </div>
    );
  }
  if (it.kind === "freeze") {
    return (
      <div className="fb-loot rounded-2xl bg-sky-400/15 border border-sky-300/40 px-4 py-3" style={delay}>
        <div className="flex items-center justify-center gap-2">
          <Snowflake className="w-7 h-7 text-sky-200" />
          <span className="text-lg font-extrabold text-white">1 gel de série</span>
        </div>
        <p className="text-xs text-white/70 mt-1">Il protège ta série le jour où tu ne peux pas jouer.</p>
      </div>
    );
  }
  if (it.kind === "paper") {
    const p = PAPERS.find((x) => x.id === it.id);
    const tier = TIERS[p.rarity];
    return (
      <div className="fb-loot" style={delay}>
        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-200 mb-2">Un petit papier · {tier.label}</div>
        <div className="fb-unfold mx-auto max-w-[240px] rounded-sm bg-[#fbf4e2] px-4 py-4 shadow-lg text-left"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(120,80,30,.07) 0 1px, transparent 1px 11px)", animationDelay: `${index * 180 + 250}ms` }}>
          <div className="flex items-center justify-between gap-2">
            <span className="fb-serif italic font-bold text-xl text-stone-800">{p.pt}</span>
            <button onClick={() => speak(p.pt)} aria-label="Écouter" className="w-8 h-8 grid place-items-center rounded-lg bg-sky-50 text-sky-600 shrink-0">
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-stone-400">[{p.ph}]</div>
          <div className="text-sm font-bold text-stone-700 mt-1">{p.fr}</div>
          <p className="text-xs text-stone-500 mt-2 leading-snug">{p.note}</p>
        </div>
        <p className="text-xs text-white/60 mt-2">Rangé dans ta boîte — il arrive dans tes révisions.</p>
      </div>
    );
  }
  const s = SOUVENIRS.find((x) => x.id === it.id);
  const tier = TIERS[s.rarity];
  return (
    <div className="fb-loot" style={delay}>
      <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${s.rarity === "legendaire" ? "text-amber-300" : "text-purple-200"}`}>
        Nouveau souvenir · {tier.label}
      </div>
      <div className="mx-auto w-28 h-28 short:w-20 short:h-20 rounded-2xl bg-white/10 p-3 short:p-2 border-2" style={{ borderColor: tier.glow }}>
        <SouvenirArt kind={s.kind} />
      </div>
      <div className="text-lg font-extrabold text-white mt-2 fb-serif">{s.name}</div>
      <p className="text-xs text-white/70 mt-0.5">{s.caption}</p>
    </div>
  );
}

export function ChestModal({ chest, remaining = 0, onOpen, onNext, onShowBox, onClose }) {
  const [phase, setPhase] = useState("closed");   /* closed · shaking · open */
  const [result, setResult] = useState(null);
  const tier = TIERS[chest.tier];
  const short = useShortScreen();
  const tiny = useShortScreen(480);

  useEffect(() => { setPhase("closed"); setResult(null); }, [chest.id]);

  function open() {
    if (phase !== "closed") return;
    sndTap();
    setPhase("shaking");
    setTimeout(() => {
      const res = onOpen(chest.id);
      setResult(res);
      setPhase("open");
      sndChest();
      if (chest.tier === "legendaire" || chest.tier === "epique") setTimeout(sndLevel, 350);
      else setTimeout(sndCard, 350);
    }, 700);
  }

  const hasCollectible = result && result.loot.some((it) => it.kind === "paper" || it.kind === "souvenir");

  const chestSize = phase === "open" ? (tiny ? 84 : short ? 110 : 150) : (tiny ? 120 : short ? 150 : 190);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 flex flex-col pt-safe">
      {phase === "open" && <Confetti />}
      {/* my-auto centre quand il y a la place, et laisse défiler sinon
          (place-items-center rendrait le haut inatteignable). */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col px-6">
        <div className="my-auto w-full max-w-xs mx-auto text-center py-6 short:py-3">
          <div className="text-[11px] font-bold uppercase tracking-widest text-white/50">{SOURCE_LABEL[chest.source] || "Coffre"}</div>
          <div className={`inline-block mt-1 rounded-full px-3 py-1 text-xs font-extrabold ${tier.chip}`}>Coffre {tier.label.toLowerCase()}</div>

          <button type="button" onClick={open} aria-label="Ouvrir le coffre"
            className={`block mx-auto transition-[margin] duration-300 ${phase === "open" ? (short ? "mt-8" : "mt-12") : "mt-3"} ${phase === "closed" ? "fb-chest" : phase === "shaking" ? "fb-chest-hard" : ""}`}>
            <ChestArt tier={chest.tier} open={phase === "open"} size={chestSize} />
          </button>

          {phase === "closed" && <p className="text-white/70 text-sm mt-2">Touche le coffre pour l'ouvrir.</p>}
          {phase === "shaking" && <p className="text-white/70 text-sm mt-2">…</p>}

          {phase === "open" && result && (
            <div className="mt-2 space-y-3 short:space-y-2">
              {result.loot.map((it, i) => <Loot key={i} it={it} index={i} />)}
            </div>
          )}

          {phase === "closed" && (
            <button onClick={onClose} className="mt-5 px-4 py-2 text-xs font-bold text-white/40">Plus tard</button>
          )}
        </div>
      </div>

      {/* Les boutons restent en bas, quelle que soit la taille du butin. */}
      {phase === "open" && result && (
        <div className="shrink-0 px-6 pt-3 pb-safe-6 fb-slide-in" style={{ animationDelay: ".6s" }}>
          <div className="max-w-xs mx-auto space-y-2">
            {hasCollectible && (
              <button onClick={() => { sndTap(); onShowBox(); }}
                className="w-full rounded-2xl bg-amber-400 text-amber-950 font-extrabold py-3 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1">
                Voir ma boîte à souvenirs
              </button>
            )}
            {remaining > 0 ? (
              <button onClick={() => { sndTap(); onNext(); }}
                className="w-full rounded-2xl bg-white text-slate-800 font-extrabold py-3 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
                Coffre suivant ({remaining})
              </button>
            ) : (
              <button onClick={onClose}
                className="w-full rounded-2xl bg-white text-slate-800 font-extrabold py-3 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
                Continuer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
