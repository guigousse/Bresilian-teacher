import React, { useState, useEffect } from "react";
import { ArrowLeft, BookOpen, Lock, Volume2, X } from "lucide-react";
import { UNITS } from "../data/units.js";
import { STORIES } from "../data/stories.js";
import { storyProgress } from "../lib/progress.js";
import { checkAnswer } from "../lib/answers.js";
import { speak } from "../lib/speech.js";
import { sndTap, sndGood, sndBad, sndCard } from "../lib/audio.js";
import { Confetti } from "./bits.jsx";

/*  ÉCRAN : BIBLIOTECA (livres à débloquer)                            */
/* ================================================================== */

export function BookSpine({ unit, number, height = 96, width = 30, onClick }) {
  const inner = (
    <>
      <span className="absolute inset-x-0 top-2 h-[3px] bg-white/45" />
      <span className="absolute inset-x-0 top-[13px] h-[2px] bg-white/25" />
      <span className="absolute inset-x-0 bottom-[22px] h-[3px] bg-white/45" />
      <span className="absolute inset-y-0 left-0 w-[3px] bg-black/25" />
      <span className="absolute inset-y-0 right-0 w-[2px] bg-white/20" />
      <span className="absolute inset-0 flex items-center justify-center px-0.5 pb-3">
        <span className="text-white text-[8px] font-extrabold tracking-tight whitespace-nowrap drop-shadow"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{unit.title}</span>
      </span>
      <span className="absolute bottom-1 inset-x-0 text-center text-white/80 text-[7px] font-bold tabular-nums">{number}</span>
    </>
  );
  const cls = `relative shrink-0 rounded-[2px] overflow-hidden bg-gradient-to-b ${unit.color} shadow-md`;
  if (!onClick) return <div className={cls} style={{ height, width }}>{inner}</div>;
  return (
    <button type="button" onClick={onClick} style={{ height, width }}
      className={`${cls} active:translate-y-0.5 transition-transform`}>{inner}</button>
  );
}

function Bookshelf({ progress, onOpenBook }) {
  const rows = [STORIES.slice(0, 5), STORIES.slice(5, 10)];
  return (
    <div className="rounded-2xl bg-gradient-to-b from-amber-800 to-amber-950 p-2.5 shadow-lg">
      {rows.map((row, ri) => (
        <div key={ri} className={ri === 0 ? "mb-2" : ""}>
          <div className="flex items-end justify-center gap-2 h-[112px] px-1">
            {row.map((s) => {
              const unit = UNITS.find((u) => u.id === s.id);
              const idx = STORIES.indexOf(s);
              const st = storyProgress(progress, s.id);
              if (!st.done) {
                return <div key={s.id} className="w-[30px] h-[72px] rounded-[2px] border-2 border-dashed border-amber-600/50" />;
              }
              return (
                <BookSpine key={s.id} unit={unit} number={idx + 1} height={92 + (idx % 3) * 9}
                  onClick={() => { sndTap(); onOpenBook(s.id); }} />
              );
            })}
          </div>
          <div className="h-2.5 rounded-[2px] bg-gradient-to-b from-amber-500 to-amber-700 shadow-md" />
        </div>
      ))}
    </div>
  );
}

export function LibraryScreen({ progress, onOpenBook }) {
  const shelved = STORIES.filter((s) => storyProgress(progress, s.id).done).length;
  const toRead = STORIES.filter((s) => !storyProgress(progress, s.id).done);

  return (
    <div className="pb-28">
      <div className="px-4 py-4 border-b border-slate-100 sticky top-0 bg-white z-20">
        <h2 className="font-extrabold text-lg text-slate-800">Biblioteca</h2>
        <p className="text-xs text-slate-400 mt-0.5">Une seule histoire, un livre par palier : termine ses mots en surbrillance pour ranger le livre.</p>
      </div>

      <div className="px-4 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-extrabold text-slate-800 flex items-center gap-2"><BookOpen className="w-5 h-5 text-slate-400" /> Minha estante</h3>
          <span className="text-sm font-bold text-slate-400 tabular-nums">{shelved}/{STORIES.length}</span>
        </div>
        <Bookshelf progress={progress} onOpenBook={onOpenBook} />
        <p className="text-xs text-slate-400 text-center mt-2">
          {shelved === 0 ? "Aucun livre rangé pour l'instant : termine-en un pour le voir ici." : "Touche une tranche pour relire un chapitre."}
        </p>

        {toRead.length > 0 ? (
          <>
            <h3 className="font-extrabold text-slate-800 mt-7 mb-3">À lire</h3>
            <div className="grid grid-cols-2 gap-3">
              {toRead.map((s) => {
                const unit = UNITS.find((u) => u.id === s.id);
                const idx = STORIES.indexOf(s);
                const lessonsDone = !!(progress.lessons[s.id] || {}).done;
                const st = storyProgress(progress, s.id);
                return (
                  <button key={s.id} type="button" disabled={!lessonsDone} onClick={() => { sndTap(); onOpenBook(s.id); }}
                    className={`text-left rounded-2xl p-4 aspect-[3/4] flex flex-col justify-between transition-all relative overflow-hidden
                      ${lessonsDone ? `bg-gradient-to-br ${unit.color} text-white shadow-lg active:scale-95`
                        : "bg-slate-100 text-slate-400"}`}>
                    {lessonsDone && <span className="absolute inset-y-0 left-0 w-1.5 bg-black/25" />}
                    <div className="text-3xl">{lessonsDone ? unit.emoji : <Lock className="w-6 h-6" />}</div>
                    <div>
                      <div className="text-[10px] font-bold opacity-80">Capítulo {idx + 1}</div>
                      <div className="font-extrabold leading-tight text-sm">{unit.title}</div>
                      <div className="text-[11px] mt-1 opacity-80">
                        {lessonsDone ? `${st.found.length}/${s.targetKeys.length} mots` : `Termine la leçon ${idx + 1}`}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="mt-7 rounded-2xl bg-emerald-50 border-2 border-emerald-100 p-4 text-center">
            <div className="text-3xl">🎉</div>
            <p className="text-sm font-bold text-emerald-800 mt-1">Toute l'histoire est lue et rangée !</p>
            <p className="text-xs text-emerald-700 mt-1">Léa est rentrée de voyage — tu peux relire n'importe quel chapitre depuis l'étagère.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ÉCRAN : LIVRE (histoire à lire et compléter)                       */
/* ================================================================== */

export function StoryScreen({ story, found, onWordFound, onClose }) {
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(false);
  const total = story.targetKeys.length;
  const foundCount = found.length;

  function openWord(t) {
    if (!t.item) return;
    if (found.includes(t.key)) { speak(t.item.pt); return; }
    sndTap();
    setActive(t); setInput(""); setWrong(false);
  }

  function submit() {
    if (!active || !input.trim()) return;
    if (checkAnswer(input, active.item)) {
      sndGood();
      onWordFound(active.key);
      setActive(null);
    } else {
      sndBad();
      setWrong(true);
    }
  }

  return (
    <div className="pb-28">
      <div className="px-4 py-4 flex items-center gap-3 border-b border-slate-100 sticky top-0 bg-white z-20">
        <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-xl text-slate-500 shrink-0"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-slate-800 truncate">{story.title}</div>
          <div className="text-xs text-slate-400">{foundCount}/{total} mots trouvés</div>
        </div>
      </div>
      <div className="h-1.5 bg-slate-100">
        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${total ? (foundCount / total) * 100 : 100}%` }} />
      </div>

      <div className="px-5 py-6 space-y-4 text-[17px] leading-relaxed text-slate-700">
        {story.tokens.map((tokens, pi) => (
          <p key={pi}>
            {tokens.map((t, ti) => {
              if (t.type === "text") return <span key={ti}>{t.value}</span>;
              if (!t.item) return <span key={ti}>{t.display}</span>;
              const isFound = found.includes(t.key);
              return (
                <button key={ti} type="button" onClick={() => openWord(t)}
                  className={`font-bold rounded-md px-1 mx-0.5 transition-colors ${isFound ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}`}>
                  {t.display}
                </button>
              );
            })}
          </p>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-end justify-center" onClick={() => setActive(null)}>
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()} style={{ animation: "fb-up .25s ease-out" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-extrabold text-xl text-slate-800 truncate">{active.item.pt}</span>
                <button onClick={() => speak(active.item.pt)} className="w-8 h-8 grid place-items-center rounded-lg bg-sky-50 text-sky-600 shrink-0"><Volume2 className="w-4 h-4" /></button>
              </div>
              <button onClick={() => setActive(null)} className="w-8 h-8 grid place-items-center rounded-xl text-slate-400 shrink-0"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-slate-500 mb-2">Qu'est-ce que ça veut dire, en français ?</p>
            <input autoFocus value={input}
              onChange={(e) => { setInput(e.target.value); setWrong(false); }}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className={`w-full rounded-2xl border-2 px-4 py-3 font-semibold text-slate-700 ${wrong ? "border-red-300 bg-red-50" : "border-slate-200"}`}
              placeholder="Écris la traduction..." />
            {wrong && <p className="text-red-500 text-sm mt-2">Pas tout à fait — réessaie !</p>}
            <button onClick={submit} className="w-full mt-4 rounded-2xl bg-emerald-500 text-white font-extrabold py-3 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function BookCompleteModal({ story, shelvedBefore = [], onClose }) {
  const unit = UNITS.find((u) => u.id === story.id);
  const number = STORIES.indexOf(story) + 1;

  useEffect(() => {
    const t = setTimeout(() => sndCard(), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 grid place-items-center px-6">
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

        <div className="fb-shelve-text text-center">
          <h3 className="text-white text-2xl font-extrabold leading-tight">Livro terminado !</h3>
          <p className="text-white/90 text-sm mt-2">
            Capítulo {number} rangé dans ta bibliothèque. Le palier suivant est débloqué !
          </p>
          <button onClick={onClose}
            className="w-full mt-5 rounded-2xl bg-white text-slate-800 font-extrabold py-4 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
            Voir mon étagère
          </button>
        </div>
      </div>
    </div>
  );
}

