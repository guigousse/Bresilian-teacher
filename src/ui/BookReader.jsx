import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Gem, Languages, Lightbulb, Lock, Sparkles, Volume2, X } from "lucide-react";
import { HINT_PRICE } from "../data/stories.js";
import { UNITS, PH_OF } from "../data/units.js";
import { storyProgress, storyWordsDone } from "../lib/progress.js";
import { checkAnswer, canonicalAnswer } from "../lib/answers.js";
import { speak } from "../lib/speech.js";
import { sndTap, sndSelect, sndGood, sndBad, sndQuest, sndWhoosh } from "../lib/audio.js";
import { shuffle } from "../lib/utils.js";
import { Mascot } from "./Mascot.jsx";

/* ==================================================================
   LE LIVRE — un livre par thématique, une page par chapitre. On ouvre
   une page en terminant la leçon correspondante ; on la lit, on
   retrouve ses mots, on répond à deux questions, et elle se referme
   sur une phrase qui donne envie de la suivante. Le livre entier ne se
   range dans la bibliothèque qu'une fois ses quatre pages faites.
   ================================================================== */

const unitOf = (id) => UNITS.find((u) => u.id === id);

function Ribbon({ pct }) {
  return (
    <div className="h-1.5 bg-amber-100">
      <div className="h-full bg-amber-500 transition-all duration-500" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function BookReader({ book, progress, isUnlocked, gems, onWordFound, onPageDone, onSpendGems, onStartLesson, onClose }) {
  const firstOpen = Math.max(0, book.pages.findIndex((pg) => isUnlocked(pg.unit) && !storyProgress(progress, pg.unit).done));
  const [idx, setIdx] = useState(firstOpen === -1 ? 0 : firstOpen);
  const [dir, setDir] = useState(1);
  const [active, setActive] = useState(null);
  const [input, setInput] = useState("");
  const [wrong, setWrong] = useState(0);
  const [hint, setHint] = useState(0);            /* 0 rien · 1 première lettre · 2 réponse */
  const [hintsUsed, setHintsUsed] = useState(0);
  const [peek, setPeek] = useState(null);
  const [phase, setPhase] = useState("read");     /* read · quiz */
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizPick, setQuizPick] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [justFound, setJustFound] = useState(null);
  const [showFr, setShowFr] = useState(() => {
    try { return localStorage.getItem("fb_book_fr") !== "0"; } catch (e) { return true; }
  });
  const inputRef = useRef(null);

  const page = book.pages[idx];
  const unit = unitOf(page.unit);
  const unlocked = isUnlocked(page.unit);
  const state = storyProgress(progress, page.unit);
  const found = state.found;
  const total = page.targetKeys.length;
  const wordsDone = storyWordsDone(progress, page);
  const pageDone = state.done;

  /* Les options sont mélangées une fois par page. */
  const quizRef = useRef({});
  if (!quizRef.current[page.id]) {
    quizRef.current[page.id] = page.quiz.map((q) => ({ ...q, options: shuffle(q.a), answer: q.a[0] }));
  }
  const quiz = quizRef.current[page.id];

  useEffect(() => { if (active) setTimeout(() => inputRef.current && inputRef.current.focus(), 180); }, [active]);
  useEffect(() => { setPhase("read"); setQuizIdx(0); setQuizPick(null); setQuizScore(0); setPeek(null); }, [idx]);

  function toggleFr() {
    sndTap();
    setShowFr((v) => {
      try { localStorage.setItem("fb_book_fr", v ? "0" : "1"); } catch (e) { /* ok */ }
      return !v;
    });
  }

  function turn(delta) {
    const next = idx + delta;
    if (next < 0 || next >= book.pages.length) return;
    sndWhoosh();
    setDir(delta);
    setIdx(next);
  }

  function tapWord(t) {
    if (!t || !t.item) return;
    if (found.includes(t.key) || pageDone) {
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
      const firstTry = wrong === 0 && hintsUsed === 0;
      onWordFound(page.unit, active.key, { firstTry, hints: hintsUsed });
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
      if (score === quiz.length) { sndQuest(); setPhase("read"); onPageDone(page.unit, score, quiz.length); }
      else { /* on repropose les mêmes questions : comprendre, pas deviner */
        setQuizIdx(0); setQuizPick(null); setQuizScore(0);
      }
    }, 1100);
  }

  const answer = active ? canonicalAnswer(active.item.fr) : "";
  const nextPage = book.pages[idx + 1];

  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      {/* Bandeau */}
      <div className="px-4 py-3 flex items-center gap-2 bg-white border-b border-amber-100">
        <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-xl text-slate-500 shrink-0"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex-1 min-w-0">
          <div className="font-extrabold text-slate-800 truncate">{book.title}</div>
          <div className="text-xs text-slate-400 truncate">
            Página {idx + 1}/{book.pages.length} · {page.title}
            {unlocked && !pageDone && ` · ${found.length}/${total} mots`}
          </div>
        </div>
        <button onClick={toggleFr} aria-label="Afficher la traduction" aria-pressed={showFr}
          className={`w-10 h-10 grid place-items-center rounded-2xl border-b-4 shrink-0 active:border-b-0 active:translate-y-1
            ${showFr ? "bg-amber-400 text-amber-950 border-amber-600" : "bg-white text-stone-400 border-stone-300"}`}>
          <Languages className="w-5 h-5" />
        </button>
        <button onClick={() => { sndTap(); speak(page.text); }} aria-label="Écouter la page"
          disabled={!unlocked}
          className={`w-10 h-10 grid place-items-center rounded-2xl border-b-4 shrink-0 ${unlocked ? "bg-sky-500 text-white border-sky-700 active:border-b-0 active:translate-y-1" : "bg-stone-100 text-stone-300 border-stone-200"}`}>
          <Volume2 className="w-5 h-5" />
        </button>
      </div>
      <Ribbon pct={!unlocked ? 0 : total ? (found.length / total) * 100 : 100} />

      {/* Les onglets de page : on voit tout de suite ce qui reste à ouvrir */}
      <div className="flex gap-1.5 px-4 py-2 bg-white border-b border-amber-100">
        {book.pages.map((pg, i) => {
          const done = storyProgress(progress, pg.unit).done;
          const open = isUnlocked(pg.unit);
          return (
            <button key={pg.id} onClick={() => { sndTap(); setDir(i > idx ? 1 : -1); setIdx(i); }}
              aria-label={`Page ${i + 1}`}
              className={`flex-1 h-7 rounded-lg text-[11px] font-extrabold border-b-2 transition-colors
                ${i === idx ? "bg-stone-800 text-white border-stone-900"
                  : done ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                    : open ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-stone-100 text-stone-300 border-stone-200"}`}>
              {open ? i + 1 : <Lock className="w-3 h-3 mx-auto" />}
            </button>
          );
        })}
      </div>

      {!unlocked ? (
        /* --- Page encore fermée ------------------------------------ */
        <div className="flex-1 px-6 py-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-stone-200 grid place-items-center mb-4"><Lock className="w-7 h-7 text-stone-400" /></div>
          <h3 className="font-extrabold text-stone-700 text-lg">Página {idx + 1} encore fermée</h3>
          <p className="text-sm text-stone-500 mt-2 max-w-xs">
            Elle s'ouvre quand tu termines la leçon <span className="font-bold">{unit.emoji} {unit.title}</span>.
          </p>
          {idx > 0 && (
            <p className="text-xs text-stone-400 mt-4 italic max-w-xs">« {book.pages[idx - 1].hook} »</p>
          )}
          <button onClick={() => { sndTap(); onStartLesson(page.unit); }}
            className="mt-6 rounded-2xl bg-emerald-500 text-white font-extrabold px-6 py-3 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
            Faire la leçon
          </button>
        </div>
      ) : phase === "quiz" ? (
        /* --- Les questions de compréhension ------------------------ */
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
              Pas tout à fait. Relis la page : les questions reviendront depuis le début.
            </p>
          )}

          <button onClick={() => { sndTap(); setPhase("read"); setQuizIdx(0); setQuizPick(null); setQuizScore(0); }}
            className="mt-auto w-full rounded-2xl border-2 border-stone-200 font-bold py-3 text-stone-500">
            Retourner au texte
          </button>
        </div>
      ) : (
        <>
          {/* --- La page ------------------------------------------- */}
          <div className="flex-1 min-h-0 overflow-y-auto px-3 py-4 flex flex-col">
            {/* Deux feuilles décalées derrière la page : le livre a une épaisseur. */}
            <div className="relative mx-auto w-full max-w-md flex flex-col flex-1">
              <div className="absolute inset-y-2 left-2 right-[-6px] rounded-r-xl bg-amber-100/80 shadow-sm" />
              <div className="absolute inset-y-1 left-1 right-[-3px] rounded-r-xl bg-amber-50 shadow-sm" />
              <div className="fb-paper relative flex-1 rounded-r-xl rounded-l-sm p-5 pb-12">
                <div key={page.id} className={dir > 0 ? "fb-page-next" : "fb-page-prev"}>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700/60">{page.title}</span>
                    <span className="text-[10px] font-bold text-amber-700/50">{unit.emoji}</span>
                  </div>
                  <div className="space-y-3 text-[17px] leading-[1.75] text-stone-800 fb-serif">
                    {page.paragraphs.map((_, pi) => (
                      <div key={pi}>
                        <p>
                          {page.tokens[pi].map((t, ti) => {
                            if (t.type === "text") return <span key={ti}>{t.value}</span>;
                            if (!t.item) return <span key={ti}>{t.display}</span>;
                            const isFound = found.includes(t.key) || pageDone;
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
                        {showFr && page.frTokens[pi] && (
                          <p className="mt-1 border-l-2 border-amber-300/70 pl-2.5 text-[13.5px] leading-[1.6] italic text-stone-500">
                            {page.frTokens[pi].map((t, ti) => {
                              if (t.type === "text") return <span key={ti}>{t.value}</span>;
                              if (!t.item) return <span key={ti}>{t.display}</span>;
                              if (found.includes(t.key) || pageDone) {
                                return <span key={ti} className="not-italic font-bold text-emerald-700">{t.display}</span>;
                              }
                              /* Mot pas encore retrouvé : sa traduction reste cachée,
                                 mais le cache ouvre directement la fiche du mot. */
                              const src = page.tokens[pi].find((x) => x.key === t.key);
                              return (
                                <button key={ti} type="button" onClick={() => tapWord(src)}
                                  aria-label="Traduction à retrouver"
                                  className="not-italic align-baseline rounded bg-stone-300/70 px-1.5 text-[11px] font-extrabold tracking-[.2em] text-stone-500">
                                  •••
                                </button>
                              );
                            })}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* La page finie laisse une phrase en suspens. */}
                  {pageDone && (
                    <div className="mt-6 rounded-2xl bg-stone-800 p-4 fb-slide-in">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">A seguir</div>
                      <p className="text-sm text-white leading-snug">{page.hook}</p>
                      {nextPage && !isUnlocked(nextPage.unit) && (
                        <button onClick={() => { sndTap(); onStartLesson(nextPage.unit); }}
                          className="w-full mt-3 rounded-xl bg-amber-400 text-amber-950 font-extrabold text-sm py-2.5 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1">
                          Ouvrir la page suivante
                        </button>
                      )}
                      {nextPage && isUnlocked(nextPage.unit) && (
                        <button onClick={() => turn(1)}
                          className="w-full mt-3 rounded-xl bg-white text-stone-800 font-extrabold text-sm py-2.5 border-b-4 border-stone-300 active:border-b-0 active:translate-y-1">
                          Lire la suite
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-4 inset-x-0 text-center text-[11px] text-amber-800/50 fb-serif">— {idx + 1} —</div>
              </div>
            </div>
          </div>

          {/* --- Navigation ---------------------------------------- */}
          <div className="px-4 pb-5 pt-1 flex items-center gap-3">
            <button onClick={() => turn(-1)} disabled={idx === 0} aria-label="Page précédente"
              className={`w-12 h-12 grid place-items-center rounded-2xl border-b-4 ${idx === 0 ? "bg-stone-100 border-stone-200 text-stone-300" : "bg-white border-stone-300 text-stone-600 active:border-b-0 active:translate-y-1"}`}>
              <ChevronLeft className="w-6 h-6" />
            </button>

            {wordsDone && !pageDone ? (
              <button onClick={() => { sndTap(); if (quiz.length) setPhase("quiz"); else onPageDone(page.unit, 0, 0); }}
                className="flex-1 h-12 rounded-2xl bg-emerald-500 text-white font-extrabold border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1 fb-glow">
                Questions sur la page
              </button>
            ) : pageDone ? (
              <div className="flex-1 text-center text-xs text-stone-500 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Page terminée — touche un mot pour l'écouter.
              </div>
            ) : (
              <div className="flex-1 text-center text-xs text-stone-500 px-2">
                Encore {total - found.length} mot{total - found.length > 1 ? "s" : ""} en jaune à retrouver.
              </div>
            )}

            <button onClick={() => turn(1)} disabled={idx === book.pages.length - 1} aria-label="Page suivante"
              className={`w-12 h-12 grid place-items-center rounded-2xl border-b-4 ${idx === book.pages.length - 1 ? "bg-stone-100 border-stone-200 text-stone-300" : "bg-white border-stone-300 text-stone-600 active:border-b-0 active:translate-y-1"}`}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </>
      )}

      {/* --- La fiche du mot ------------------------------------- */}
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
