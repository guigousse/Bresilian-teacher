import React, { useState, useEffect } from "react";
import { BookOpen, Lock, Sparkles } from "lucide-react";
import { UNITS } from "../data/units.js";
import { STORIES } from "../data/stories.js";
import { storyProgress, storyScore } from "../lib/progress.js";
import { sndTap, sndCard, sndWhoosh } from "../lib/audio.js";
import { Confetti } from "./bits.jsx";

/* ==================================================================
   LA BIBLIOTHÈQUE — une étagère en bois où l'histoire de Léa se range
   chapitre après chapitre. Les livres terminés se voient sur la
   tranche, celui qu'on lit garde un signet qui dépasse, et les autres
   ne sont que des emplacements vides à remplir.
   ================================================================== */

/* La tranche d'un livre : toile teintée, filets dorés, titre à la
   verticale, et un sceau quand le chapitre a été fait sans faute. */
export function BookSpine({ unit, number, height = 96, width = 30, tilt = 0, ribbon = false, seal = false, className = "", delay = 0, onClick }) {
  const inner = (
    <>
      <span className="absolute inset-0 fb-cloth" />
      <span className="absolute inset-y-0 left-0 w-[3px] bg-black/30" />
      <span className="absolute inset-y-0 right-0 w-[2px] bg-white/25" />
      <span className="absolute inset-x-[3px] top-2 h-[2.5px] bg-amber-200/70" />
      <span className="absolute inset-x-[3px] top-[13px] h-[1.5px] bg-amber-200/45" />
      <span className="absolute inset-x-[3px] bottom-[22px] h-[2.5px] bg-amber-200/70" />
      <span className="absolute inset-0 flex items-center justify-center px-0.5 pb-4">
        <span className="text-white text-[8px] font-extrabold tracking-tight whitespace-nowrap drop-shadow fb-serif"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{unit.title}</span>
      </span>
      <span className="absolute bottom-1.5 inset-x-0 text-center text-amber-100/90 text-[7px] font-bold tabular-nums">{number}</span>
      {seal && (
        <span className="absolute top-[22px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-300 border border-amber-500 grid place-items-center text-[6px]">★</span>
      )}
      {ribbon && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-red-500 rounded-b-sm shadow" />}
    </>
  );
  const cls = `relative shrink-0 rounded-[2px] overflow-visible bg-gradient-to-b ${unit.color} shadow-[2px_2px_6px_rgba(0,0,0,.45)] ${className}`;
  const style = { height, width, transform: tilt ? `rotate(${tilt}deg)` : undefined, transformOrigin: "bottom right", animationDelay: delay ? `${delay}ms` : undefined };
  if (!onClick) return <div className={cls} style={style}><span className="absolute inset-0 overflow-hidden rounded-[2px]">{inner}</span></div>;
  return (
    <button type="button" onClick={onClick} style={style}
      className={`${cls} transition-transform duration-200 hover:-translate-y-1 active:-translate-y-2`}>
      <span className="absolute inset-0 overflow-hidden rounded-[2px]">{inner}</span>
      {ribbon && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-4 bg-red-500 rounded-b-sm shadow" />}
    </button>
  );
}

/* Une petite plante, pour que l'étagère ne soit pas qu'un casier. */
function Plant() {
  return (
    <svg width="26" height="34" viewBox="0 0 26 34" className="shrink-0">
      <path d="M13 22 q-9 -6 -9 -16 q9 2 9 16 Z" fill="#2f8a52" />
      <path d="M13 22 q9 -5 10 -15 q-9 1 -10 15 Z" fill="#37a05f" />
      <path d="M13 22 q-2 -12 2 -19 q3 9 -2 19 Z" fill="#1f7a48" />
      <path d="M6 22 h14 l-2 10 h-10 Z" fill="#c2703c" />
      <path d="M6 22 h14 l-.6 3 h-12.8 Z" fill="#e08b52" />
    </svg>
  );
}

function Shelf({ items, onOpenBook, offset = 0 }) {
  return (
    <div>
      <div className="flex items-end justify-start gap-1.5 h-[116px] px-3">
        {items.map((entry, i) => {
          if (entry.kind === "plant") return <Plant key={`p${i}`} />;
          const { story, unit, idx, st, score } = entry;
          if (!entry.unlocked) {
            return <div key={story.id} className="w-[26px] h-[64px] rounded-[2px] border-2 border-dashed border-amber-700/40 grid place-items-center">
              <Lock className="w-3 h-3 text-amber-700/40" />
            </div>;
          }
          return (
            <BookSpine key={story.id} unit={unit} number={idx + 1}
              className="fb-spine-in" delay={(offset + i) * 70}
              height={90 + (idx % 3) * 9} width={st.done ? 30 : 27}
              tilt={entry.last && !st.done ? -7 : 0}
              ribbon={!st.done && st.found.length > 0}
              seal={score.perfect}
              onClick={() => { sndTap(); onOpenBook(story.id); }} />
          );
        })}
      </div>
      <div className="h-3 rounded-[2px] bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 shadow-[0_3px_6px_rgba(0,0,0,.45)]" />
    </div>
  );
}

export function LibraryScreen({ progress, onOpenBook }) {
  const entries = STORIES.map((story, idx) => {
    const unit = UNITS.find((u) => u.id === story.id);
    const st = storyProgress(progress, story.id);
    return { kind: "book", story, unit, idx, st, score: storyScore(progress, story), unlocked: !!(progress.lessons[story.id] || {}).done };
  });
  const shelved = entries.filter((e) => e.st.done).length;
  const reading = entries.find((e) => e.unlocked && !e.st.done);

  /* Trois rangs de quatre, plus une plante quand il reste de la place. */
  const rows = [entries.slice(0, 4), entries.slice(4, 8), entries.slice(8, 10)];
  rows.forEach((row) => { if (row.length) row[row.length - 1] = { ...row[row.length - 1], last: true }; });
  rows[2] = [...rows[2], { kind: "plant" }];

  return (
    <div className="pb-28">
      <div className="px-4 py-4 border-b border-slate-100 sticky top-0 bg-white z-20">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg text-slate-800">Biblioteca</h2>
          <span className="text-sm font-bold text-slate-400 tabular-nums">{shelved}/{STORIES.length}</span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">Une seule histoire, dix chapitres. Chaque livre terminé se range sur l'étagère.</p>
      </div>

      {/* Le livre en cours, posé de face */}
      {reading && (
        <div className="px-4 pt-5">
          <button onClick={() => { sndWhoosh(); onOpenBook(reading.story.id); }}
            className="w-full text-left rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900 p-4 shadow-lg active:translate-y-0.5 transition-transform">
            <div className="flex gap-4">
              <div className={`relative w-[74px] h-[100px] shrink-0 rounded-r-lg rounded-l-sm bg-gradient-to-br ${reading.unit.color} shadow-[4px_4px_10px_rgba(0,0,0,.5)] overflow-hidden`}>
                <span className="absolute inset-y-0 left-0 w-2 bg-black/30" />
                <span className="absolute inset-x-2 top-3 h-[2px] bg-white/40" />
                <span className="absolute inset-0 grid place-items-center text-3xl pt-2">{reading.unit.emoji}</span>
                <span className="absolute bottom-1.5 inset-x-1 text-center text-[8px] font-extrabold text-white/90 leading-tight">{reading.unit.title}</span>
                <span className="absolute -bottom-1 right-3 w-2.5 h-5 bg-red-500 rounded-b-sm" />
              </div>
              <div className="flex-1 min-w-0 text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300">En cours de lecture</div>
                <div className="font-extrabold leading-tight mt-0.5">{reading.story.title}</div>
                <div className="text-xs text-white/70 mt-1">
                  {reading.st.found.length}/{reading.story.targetKeys.length} mots retrouvés
                  {reading.st.found.length === reading.story.targetKeys.length && " · questions à faire"}
                </div>
                <div className="h-1.5 rounded-full bg-white/20 overflow-hidden mt-2">
                  <div className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{ width: `${(reading.st.found.length / reading.story.targetKeys.length) * 100}%` }} />
                </div>
                <div className="inline-flex items-center gap-1 mt-3 rounded-xl bg-white text-stone-800 font-extrabold text-xs px-3 py-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> {reading.st.found.length ? "Reprendre" : "Commencer"}
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* L'étagère */}
      <div className="px-4 pt-5">
        <div className="rounded-2xl bg-gradient-to-b from-amber-900 to-amber-950 p-2.5 shadow-xl border-4 border-amber-950/60">
          <div className="rounded-lg bg-[#3a1f0b] p-1.5 space-y-2 shadow-inner">
            {rows.map((row, i) => <Shelf key={i} items={row} offset={i * 4} onOpenBook={onOpenBook} />)}
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
          {shelved === 0 ? "Aucun livre rangé pour l'instant : termine-en un pour le voir ici."
            : "Touche une tranche pour rouvrir un chapitre — le signet rouge marque celui en cours."}
        </p>
      </div>

      {/* Les chapitres verrouillés, expliqués */}
      {entries.some((e) => !e.unlocked) && (
        <div className="px-4 pt-6">
          <h3 className="font-extrabold text-slate-800 mb-2">La suite de l'histoire</h3>
          <div className="space-y-2">
            {entries.filter((e) => !e.unlocked).slice(0, 3).map((e) => (
              <div key={e.story.id} className="rounded-2xl border-2 border-slate-100 p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 grid place-items-center shrink-0"><Lock className="w-4 h-4 text-slate-400" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-slate-700 truncate">Capítulo {e.idx + 1} · {e.unit.title}</div>
                  <div className="text-xs text-slate-400">Se débloque en terminant la leçon {e.idx + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {shelved === STORIES.length && (
        <div className="px-4 pt-6">
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-100 p-4 text-center">
            <div className="text-3xl">🎉</div>
            <p className="text-sm font-bold text-emerald-800 mt-1">Toute l'histoire est lue et rangée !</p>
            <p className="text-xs text-emerald-700 mt-1">Léa est rentrée de voyage — les chapitres restent ouverts à la relecture.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- La fin d'un chapitre : le livre se ferme et se range ---------- */

export function BookCompleteModal({ story, shelvedBefore = [], score, onClose }) {
  const unit = UNITS.find((u) => u.id === story.id);
  const number = STORIES.indexOf(story) + 1;
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => sndCard(), 1500);
    const t2 = setTimeout(() => setStamped(true), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 grid place-items-center px-6 overflow-y-auto py-6">
      <Confetti />
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="fb-shelve-stage">
          <div className="fb-shelve-backpanel" />
          <div className="fb-shelve-prior">
            {shelvedBefore.slice(-6).map((b, i) => (
              <BookSpine key={b.unit.id} unit={b.unit} number={b.number} width={20} height={84 + (i % 3) * 5} />
            ))}
          </div>
          <div className="fb-shelve-travel">
            <div className="fb-book3d">
              <div className={`fb-b-back bg-gradient-to-br ${unit.color}`} />
              <div className={`fb-b-spine bg-gradient-to-b ${unit.color}`}>
                <span className="fb-b-spine-label">{unit.title}</span>
              </div>
              <div className="fb-b-edge" />
              <div className="fb-b-pages" />
              <div className="fb-b-flap">
                <div className={`fb-b-flap-out bg-gradient-to-br ${unit.color}`}>
                  <span className="fb-b-flap-emoji">{unit.emoji}</span>
                  <span className="fb-b-flap-title">{unit.title}</span>
                </div>
                <div className="fb-b-flap-in" />
              </div>
            </div>
          </div>
          <div className="fb-shelve-plank" />
        </div>

        <div className="fb-shelve-text text-center w-full">
          <h3 className="text-white text-2xl font-extrabold leading-tight">Livro terminado !</h3>
          <p className="text-white/90 text-sm mt-2">Capítulo {number} rangé dans ta bibliothèque. Le palier suivant est débloqué !</p>

          {score && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-white/10 p-2">
                <div className="text-lg font-extrabold text-white tabular-nums">{score.firstTry}/{score.total}</div>
                <div className="text-[10px] text-white/70">du premier coup</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-2">
                <div className="text-lg font-extrabold text-white tabular-nums">{score.hints}</div>
                <div className="text-[10px] text-white/70">indice{score.hints > 1 ? "s" : ""}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-2">
                <div className="text-lg font-extrabold text-white tabular-nums">
                  {score.quiz ? `${score.quiz.score}/${score.quiz.total}` : "–"}
                </div>
                <div className="text-[10px] text-white/70">questions</div>
              </div>
            </div>
          )}

          {score && score.perfect && stamped && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-amber-950 font-extrabold text-xs px-3 py-1.5 fb-burst">
              <Sparkles className="w-3.5 h-3.5" /> Chapitre parfait — sceau doré
            </div>
          )}

          <button onClick={onClose}
            className="w-full mt-5 rounded-2xl bg-white text-slate-800 font-extrabold py-4 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
            Voir mon étagère
          </button>
        </div>
      </div>
    </div>
  );
}

/* Gardé pour compatibilité : l'ancien nom de l'écran de lecture. */
export { BookReader as StoryScreen } from "./BookReader.jsx";
