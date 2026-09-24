import React, { useState } from "react";
import { ArrowLeft, Lock, Volume2, X } from "lucide-react";
import { TIERS, PAPERS, SOUVENIRS } from "../data/souvenirs.js";
import { souvenirReachable } from "../lib/chests.js";
import { srsOf, masteryOf } from "../lib/progress.js";
import { speak } from "../lib/speech.js";
import { sndTap } from "../lib/audio.js";
import { SouvenirArt, PaperSlip } from "./SouvenirArt.jsx";

/* ==================================================================
   LA BOÎTE À SOUVENIRS — deux compartiments : les objets de l'histoire
   de Dalva, et les petits papiers épinglés, chacun portant une
   expression brésilienne. Ce qui manque reste en creux, pour qu'on
   sache ce qu'il reste à trouver.
   ================================================================== */

const TILTS = [-4, 3, -2, 5, -5, 2, -3, 4, 1];

function SouvenirSheet({ s, onClose }) {
  const tier = TIERS[s.rarity];
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="w-full max-w-md bg-[#fbf6ea] rounded-t-3xl sm:rounded-3xl p-5 pb-7" onClick={(e) => e.stopPropagation()}
        style={{ animation: "fb-up .28s ease-out" }}>
        <div className="flex justify-between items-start">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${tier.chip}`}>{tier.label}</span>
          <button onClick={onClose} aria-label="Fermer" className="w-8 h-8 grid place-items-center rounded-xl text-stone-400"><X className="w-5 h-5" /></button>
        </div>
        <div className="mx-auto w-36 h-36 fb-pop" style={{ animation: "fb-pop .45s ease-out" }}><SouvenirArt kind={s.kind} /></div>
        <h3 className="text-center text-xl font-extrabold text-stone-800 fb-serif mt-1">{s.name}</h3>
        <p className="text-center text-xs text-stone-500 mt-1">{s.caption}</p>

        <div className="mt-4 rounded-2xl bg-white border border-stone-200 p-4">
          <div className="flex gap-2 items-start">
            <p className="flex-1 fb-serif text-[16px] leading-relaxed text-stone-800">{s.pt}</p>
            <button onClick={() => speak(s.pt)} aria-label="Écouter"
              className="w-9 h-9 grid place-items-center rounded-xl bg-sky-500 text-white shrink-0"><Volume2 className="w-4 h-4" /></button>
          </div>
          <p className="mt-2 border-l-2 border-amber-300 pl-2.5 text-[13.5px] italic text-stone-500 leading-snug">{s.fr}</p>
        </div>
      </div>
    </div>
  );
}

function PaperSheet({ p, progress, onClose }) {
  const tier = TIERS[p.rarity];
  const s = srsOf(progress, p.pt);
  const m = masteryOf(s.box);
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="w-full max-w-md p-5 pb-8" onClick={(e) => e.stopPropagation()}>
        <div className="fb-unfold relative rounded-sm bg-[#fbf4e2] px-5 pt-6 pb-5 shadow-2xl"
          style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(120,80,30,.07) 0 1px, transparent 1px 12px)" }}>
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow" style={{ background: tier.glow }} />
          <button onClick={onClose} aria-label="Fermer" className="absolute top-2 right-2 w-8 h-8 grid place-items-center rounded-xl text-stone-400"><X className="w-5 h-5" /></button>
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${tier.chip}`}>{tier.label}</span>
          <div className="flex items-center gap-2 mt-2">
            <span className="fb-serif italic font-bold text-2xl text-stone-800 leading-tight">{p.pt}</span>
            <button onClick={() => speak(p.pt)} aria-label="Écouter"
              className="w-9 h-9 grid place-items-center rounded-xl bg-sky-500 text-white shrink-0"><Volume2 className="w-4 h-4" /></button>
          </div>
          <div className="text-xs text-stone-400">[{p.ph}]</div>
          <div className="text-base font-extrabold text-stone-700 mt-2">{p.fr}</div>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">{p.note}</p>
          <div className="mt-4 pt-3 border-t border-dashed border-stone-300 text-xs text-stone-500">
            Dans tes révisions · <span className="font-bold">{m.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MemoryBox({ progress, onBack }) {
  const [openS, setOpenS] = useState(null);
  const [openP, setOpenP] = useState(null);
  const ownedS = new Set(progress.souvenirs || []);
  const ownedP = new Set(progress.papers || []);

  return (
    <div className="pb-28 min-h-screen bg-stone-50">
      <div className="px-4 py-3 flex items-center gap-3 bg-white border-b border-stone-100 sticky top-0 z-20">
        <button onClick={onBack} aria-label="Retour" className="w-9 h-9 grid place-items-center rounded-xl text-slate-500"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex-1 min-w-0">
          <h2 className="font-extrabold text-lg text-slate-800 leading-tight">Caixa de lembranças</h2>
          <p className="text-xs text-slate-400">Tout ce qu'on trouve dans les coffres, en plus des gemmes.</p>
        </div>
      </div>

      <div className="px-4 pt-5">
        {/* La boîte : bois dehors, velours dedans */}
        <div className="rounded-3xl p-2.5 shadow-xl fb-wood">
          <div className="rounded-2xl bg-gradient-to-b from-[#4a1f2a] to-[#2e1219] p-3 shadow-inner">

            <div className="flex items-baseline justify-between px-1">
              <h3 className="font-extrabold text-amber-100 fb-serif">Lembranças</h3>
              <span className="text-xs font-bold text-amber-200/70 tabular-nums">{ownedS.size}/{SOUVENIRS.length}</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5 mt-2">
              {SOUVENIRS.filter((s) => ownedS.has(s.id) || souvenirReachable(progress, s)).map((s) => {
                const tier = TIERS[s.rarity];
                if (ownedS.has(s.id)) {
                  return (
                    <button key={s.id} onClick={() => { sndTap(); setOpenS(s); }}
                      className="rounded-xl bg-[#fbf6ea] p-2 border-b-4 active:translate-y-0.5 transition-transform"
                      style={{ borderBottomColor: tier.glow }}>
                      <div className="aspect-square"><SouvenirArt kind={s.kind} /></div>
                      <div className="text-[10px] font-bold text-stone-700 leading-tight mt-1 line-clamp-2 min-h-[2.4em]">{s.name}</div>
                    </button>
                  );
                }
                /* Trouvable dès maintenant : un creux, et sa rareté. */
                return (
                  <div key={s.id} className="rounded-xl border-2 border-dashed border-white/15 p-2 grid place-items-center text-center aspect-[4/5]">
                    <div>
                      <div className="text-2xl font-extrabold text-white/25">?</div>
                      <div className="text-[9px] font-bold mt-1" style={{ color: tier.glow }}>{tier.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            {(() => {
              const later = SOUVENIRS.filter((s) => !ownedS.has(s.id) && !souvenirReachable(progress, s)).length;
              return later > 0 && (
                <div className="mt-2.5 rounded-xl border-2 border-dashed border-white/10 px-3 py-2 flex items-center gap-2 text-white/35">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[11px]">{later} souvenir{later > 1 ? "s" : ""} plus loin dans l'histoire</span>
                </div>
              );
            })()}

            <div className="h-px bg-white/10 my-4" />

            <div className="flex items-baseline justify-between px-1">
              <h3 className="font-extrabold text-amber-100 fb-serif">Papeizinhos</h3>
              <span className="text-xs font-bold text-amber-200/70 tabular-nums">{ownedP.size}/{PAPERS.length}</span>
            </div>
            <div className="grid grid-cols-3 gap-x-2.5 gap-y-4 mt-3">
              {PAPERS.map((p, i) => (
                ownedP.has(p.id) ? (
                  <button key={p.id} onClick={() => { sndTap(); setOpenP(p); }} className="active:scale-95 transition-transform">
                    <PaperSlip text={p.pt} tilt={TILTS[i % TILTS.length]} tier={p.rarity} />
                  </button>
                ) : (
                  <div key={p.id}><PaperSlip blank tilt={TILTS[i % TILTS.length]} /></div>
                )
              ))}
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-3 px-4">
          Les souvenirs n'apparaissent qu'une fois la page de l'histoire lue. Les petits papiers trouvés rejoignent tes révisions.
        </p>
      </div>

      {openS && <SouvenirSheet s={openS} onClose={() => setOpenS(null)} />}
      {openP && <PaperSheet p={openP} progress={progress} onClose={() => setOpenP(null)} />}
    </div>
  );
}
