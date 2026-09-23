import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Gem, Lightbulb, Volume2, X } from "lucide-react";
import { HINT_PRICE } from "../data/stories.js";
import { PH_OF } from "../data/units.js";
import { checkAnswer, canonicalAnswer } from "../lib/answers.js";
import { speak } from "../lib/speech.js";
import { sndTap, sndSelect, sndGood, sndBad, sndQuest, sndWhoosh } from "../lib/audio.js";
import { shuffle } from "../lib/utils.js";
import { Mascot } from "./Mascot.jsx";

/* ==================================================================
   LE LIVRE — on lit page par page, on écoute, on retrouve les mots du
   palier, et on termine par deux questions sur l'histoire : traduire
   des mots isolés ne prouve pas qu'on a compris ce qu'on lisait.
   ================================================================== */

function Ribbon({ pct }) {
  return (
    <div className="h-1.5 bg-amber-100">
      <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function BookReader({ story, number, unit, state, gems, onWordFound, onQuizDone, onSpendGems, onClose }) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(0);
  const [hint, setHint] = useState(0);            /* 0 rien · 1 première lettre · 2 réponse */
  const [hintsUsed, setHintsUsed] = useState(0);  /* combien d'indices pour ce mot-là */
  const [peek, setPeek] = useState(null);         /* traduction affichée sur un mot déjà trouvé */
  const [phase, setPhase] = useState("read");     /* read · quiz */
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizPick, setQuizPick] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [justFound, setJustFound] = useState(null);
  const inputRef = useRef(null);

  const found = state.found || [];
  const total = story.targetKeys.length;
  const pages = story.pages;
  const wordsDone = story.targetKeys.every((k) => found.includes(k));
  const pageIdx = Math.min(page, pages.length - 1);
  const isLast = pageIdx === pages.length - 1;

  /* Les options du quiz sont mélangées une fois pour toutes. */
  const quiz = useRef(story.quiz.map((q) => ({ ...q, options: shuffle(q.a), answer: q.a[0] }))).current;

  useEffect(() => { if (active) setTimeout(() => inputRef.current && inputRef.current.focus(), 180); }, [active]);

  function turn(delta) {
    const next = pageIdx + delta;
    if (next < 0 || next >= pages.length) return;
    sndWhoosh();
    setDir(delta);
    setPage(next);
    setPeek(null);
  }

  function tapWord(t) {
    if (!t.item) return;
    if (found.includes(t.key) || state.done) {
      speak(t.item.pt);
      setPeek(peek === t.key ? null : t.key);
      return;
    }
    sndTap();
    setActive(t); setInput(""); setWrong(0); setHint(0); setHintsUsed(0);
    setTimeout(() => speak(t.item.pt), 220);
  }

  function submit() {
    if (!active || !input.trim()) return;
    if (checkAnswer(input, active.item)) {
      sndGood(2);
      const firstTry = wrong === 0 && hint === 0;
      onWordFound(active.key, { firstTry, hints: hintsUsed });
      setJustFound({ key: active.key, firstTry });
      setTimeout(() => setJustFound(null), 1200);
      setActive(null);
    } else {
      sndBad();
      setWrong((w) => w + 1);
    }
  }

  /* Le premier indice devient gratuit après trois essais : on ne fait
     pas payer quelqu'un qui cherche vraiment. */
  function buyHint(level) {
    if (level === 1) {
      const free = wrong >= 3;
      if (!free && gems < HINT_PRICE) return;
      if (!free) onSpendGems(HINT_PRICE);
    } else {
      if (gems < HINT_PRICE * 2) return;
      onSpendGems(HINT_PRICE * 2);
    }
    sndSelect();
    setHint(level);
    setHintsUsed((n) => n + 1);
  }

  function answerQuiz(opt) {
    if (quizPick) return;
    sndSelect();
    setQuizPick(opt);
    const ok = opt === quiz[quizIdx].answer;
    if (ok) { sndGood(1); setQuizScore((s) => s + 1); } else sndBad();
    setTimeout(() => {
      if (quizIdx + 1 < quiz.length) { setQuizIdx(quizIdx + 1); setQuizPick(null); return; }
      const score = quizScore + (ok ? 1 : 0);
      if (score === quiz.length) { sndQuest(); onQuizDone(score, quiz.length); }
      else { /* on repropose les mêmes questions : comprendre, pas deviner */
        setQuizIdx(0); setQuizPick(null); setQuizScore(0);
      }
    }, 1100);
  }

  const answer = active ? canonicalAnswer(active.item.fr) : "";

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Bandeau */}
      <div className="px-4 py-3 flex items-center gap-3 bg-white border-b border-amber-100">
        <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-xl text-slate-500 shrink-0"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-slate-800 truncate">{story.title}</div>
          <div className="text-xs text-slate-400">
            {state.done ? "Relecture libre" : `${found.length}/${total} mots · page ${pageIdx + 1}/${pages.length}`}
          </div>
        </div>
        <button onClick={() => { sndTap(); speak(story.pageText[pageIdx]); }}
          aria-label="Écouter la page"
          className="w-10 h-10 grid place-items-center rounded-2xl bg-sky-500 text-white border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 shrink-0">
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
      <Ribbon pct={total ? (found.length / total) * 100 : 100} />

      {phase === "read" ? (
        <>
          {/* La page */}
          <div className="flex-1 px-3 py-4 flex min-h-0">
            {/* Deux feuilles décalées derrière la page : le livre a une épaisseur. */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-y-2 left-2 right-[-6px] rounded-r-xl bg-amber-100/80 shadow-sm" />
              <div className="absolute inset-y-1 left-1 right-[-3px] rounded-r-xl bg-amber-50 shadow-sm" />
              <div className="fb-paper relative h-full rounded-r-xl rounded-l-sm p-5 pb-12">
              <div key={pageIdx} className={dir > 0 ? "fb-page-next" : "fb-page-prev"}>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700/60">Capítulo {number}</span>
                  <span className="text-[10px] font-bold text-amber-700/50">{unit.emoji}</span>
                </div>
                <div className="space-y-3 text-[17px] leading-[1.75] text-stone-800 fb-serif">
                  {pages[pageIdx].map((pi) => (
                    <p key={pi}>
                      {story.tokens[pi].map((t, ti) => {
                        if (t.type === "text") return <span key={ti}>{t.value}</span>;
                        if (!t.item) return <span key={ti}>{t.display}</span>;
                        const isFound = found.includes(t.key) || state.done;
                        const shining = justFound && justFound.key === t.key;
                        return (
                          <span key={ti} className="relative inline-block">
                            <button type="button" onClick={() => tapWord(t)}
                              className={`font-bold rounded px-1 transition-colors ${shining ? "fb-found" : ""}
                                ${isFound ? "bg-emerald-100 text-emerald-800 underline decoration-emerald-300 decoration-2 underline-offset-2"
                                  : "bg-amber-200 text-amber-900 shadow-[inset_0_-2px_0_rgba(180,83,9,.35)]"}`}>
                              {t.display}
                            </button>
                            {peek === t.key && (
                              <span className="absolute left-1/2 -translate-x-1/2 -top-8 z-10 whitespace-nowrap rounded-lg bg-stone-800 px-2 py-1 text-[11px] font-bold text-white fb-slide-in">
                                {t.item.fr}
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </p>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-4 inset-x-0 text-center text-[11px] text-amber-800/50 fb-serif">— {pageIdx + 1} —</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-4 pb-5 pt-1 flex items-center gap-3">
            <button onClick={() => turn(-1)} disabled={pageIdx === 0} aria-label="Page précédente"
              className={`w-12 h-12 grid place-items-center rounded-2xl border-b-4 ${pageIdx === 0 ? "bg-stone-100 border-stone-200 text-stone-300" : "bg-white border-stone-300 text-stone-600 active:border-b-0 active:translate-y-1"}`}>
              <ChevronLeft className="w-6 h-6" />
            </button>

            {isLast && wordsDone && !state.done ? (
              <button onClick={() => { sndTap(); if (quiz.length) setPhase("quiz"); else onQuizDone(0, 0); }}
                className="flex-1 h-12 rounded-2xl bg-emerald-500 text-white font-extrabold border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 fb-glow">
                Questions sur l'histoire
              </button>
            ) : isLast ? (
              <div className="flex-1 text-center text-xs text-stone-500 px-2">
                {state.done ? "Chapitre terminé — touche un mot pour l'écouter."
                  : `Encore ${total - found.length} mot${total - found.length > 1 ? "s" : ""} en jaune à retrouver.`}
              </div>
            ) : (
              <div className="flex-1 text-center text-xs text-stone-500">Touche les mots en jaune, puis tourne la page.</div>
            )}

            <button onClick={() => turn(1)} disabled={isLast} aria-label="Page suivante"
              className={`w-12 h-12 grid place-items-center rounded-2xl border-b-4 ${isLast ? "bg-stone-100 border-stone-200 text-stone-300" : "bg-white border-stone-300 text-stone-600 active:border-b-0 active:translate-y-1"}`}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      ) : (
        /* --- Les questions de compréhension --- */
        <div className="flex-1 px-4 py-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Mascot mood={quizPick ? (quizPick === quiz[quizIdx].answer ? "happy" : "sad") : "think"} size={64} />
            <div className="flex-1 rounded-2xl rounded-bl-sm bg-white border-2 border-stone-200 px-3 py-2">
              <div className="text-[11px] font-bold text-stone-400">Question {quizIdx + 1}/{quiz.length}</div>
              <div className="font-extrabold text-stone-800 leading-tight">{quiz[quizIdx].q}</div>
            </div>
          </div>

          <div className="space-y-2.5">
            {quiz[quizIdx].options.map((opt) => {
              const picked = quizPick === opt;
              const isAnswer = opt === quiz[quizIdx].answer;
              let cls = "bg-white border-stone-200 text-stone-700";
              if (quizPick && isAnswer) cls = "bg-emerald-50 border-emerald-400 text-emerald-800";
              else if (picked && !isAnswer) cls = "bg-red-50 border-red-400 text-red-700";
              return (
                <button key={opt} disabled={!!quizPick} onClick={() => answerQuiz(opt)}
                  className={`w-full text-left rounded-2xl border-2 border-b-4 px-4 py-3 font-semibold transition-all active:translate-y-0.5 ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>

          {quizPick && quizPick !== quiz[quizIdx].answer && (
            <p className="text-sm text-stone-500 mt-4 fb-slide-in">
              Pas tout à fait. Relis le passage : les questions reviendront depuis le début.
            </p>
          )}

          <button onClick={() => { sndTap(); setPhase("read"); setQuizIdx(0); setQuizPick(null); setQuizScore(0); }}
            className="mt-auto w-full rounded-2xl border-2 border-stone-200 font-bold py-3 text-stone-500">
            Retourner au texte
          </button>
        </div>
      )}

      {/* --- La fiche du mot --- */}
      {active && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 flex items-end justify-center" onClick={() => setActive(null)}>
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5" onClick={(e) => e.stopPropagation()} style={{ animation: "fb-up .25s ease-out" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-extrabold text-xl text-stone-800 truncate">{active.item.pt}</span>
                <button onClick={() => speak(active.item.pt)} aria-label="Écouter"
                  className="w-8 h-8 grid place-items-center rounded-lg bg-sky-50 text-sky-600 shrink-0"><Volume2 className="w-4 h-4" /></button>
              </div>
              <button onClick={() => setActive(null)} className="w-8 h-8 grid place-items-center rounded-xl text-stone-400 shrink-0"><X className="w-5 h-5" /></button>
            </div>

            <p className="text-sm text-stone-500 mb-2">Qu'est-ce que ça veut dire, en français ?</p>
            <input ref={inputRef} value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className={`w-full rounded-2xl border-2 px-4 py-3 font-semibold text-stone-700 ${wrong ? "border-red-300 bg-red-50" : "border-stone-200"}`}
              placeholder="Écris la traduction…" />

            {wrong > 0 && <p className="text-red-500 text-sm mt-2">Pas tout à fait — réessaie.</p>}

            {hint === 1 && (
              <p className="text-sm text-amber-700 mt-2 fb-slide-in">
                Ça commence par <span className="font-extrabold">« {answer.slice(0, 1).toUpperCase()} »</span> · {answer.split(" ").length} mot{answer.split(" ").length > 1 ? "s" : ""}
                {PH_OF[active.item.pt] && <span className="text-stone-400"> · se dit [{PH_OF[active.item.pt]}]</span>}
              </p>
            )}
            {hint === 2 && (
              <p className="text-sm text-emerald-700 mt-2 fb-slide-in">
                Réponse : <span className="font-extrabold">{active.item.fr}</span> — recopie-la pour valider.
              </p>
            )}

            {hint < 2 && (
              <div className="flex gap-2 mt-3">
                {hint < 1 && (
                  <button onClick={() => buyHint(1)}
                    className={`flex-1 rounded-xl border-2 py-2 text-xs font-bold flex items-center justify-center gap-1
                      ${wrong >= 3 || gems >= HINT_PRICE ? "border-amber-200 text-amber-700" : "border-stone-200 text-stone-300"}`}>
                    <Lightbulb className="w-3.5 h-3.5" />
                    {wrong >= 3 ? "Indice (offert)" : <>Indice · {HINT_PRICE} <Gem className="w-3 h-3" /></>}
                  </button>
                )}
                <button onClick={() => buyHint(2)}
                  className={`flex-1 rounded-xl border-2 py-2 text-xs font-bold flex items-center justify-center gap-1
                    ${gems >= HINT_PRICE * 2 ? "border-stone-200 text-stone-500" : "border-stone-200 text-stone-300"}`}>
                  Donner la réponse · {HINT_PRICE * 2} <Gem className="w-3 h-3" />
                </button>
              </div>
            )}

            <button onClick={submit}
              className="w-full mt-4 rounded-2xl bg-emerald-500 text-white font-extrabold py-3 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
