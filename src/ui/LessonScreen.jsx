import React, { useState, useEffect, useRef } from "react";
import { Check, Flame, Gem, Heart, Mic, Volume2, X } from "lucide-react";
import { PH_OF } from "../data/units.js";
import { speak } from "../lib/speech.js";
import { sndTap, sndSelect, sndGood, sndBad, sndWin, sndCombo, sndHeart } from "../lib/audio.js";
import { isCloseEnough, normalizeAnswer } from "../lib/answers.js";
import { Phonetic, SpeakButton } from "./bits.jsx";
import { Mascot } from "./Mascot.jsx";

const PRAISE = ["Isso aí !", "Perfeito !", "Muito bem !", "Boa !", "Mandou bem !", "Show !"];

/* ---- Reconnaissance vocale (Chrome / Android), facultative ---------- */
function listenOnce(onResult, onEnd) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { onEnd("unsupported"); return null; }
  try {
    const rec = new SR();
    rec.lang = "pt-BR";
    rec.interimResults = false;
    rec.maxAlternatives = 3;
    rec.onresult = (e) => {
      const heard = Array.from(e.results[0]).map((r) => r.transcript);
      onResult(heard);
    };
    rec.onerror = (e) => onEnd(e.error || "error");
    rec.onend = () => onEnd(null);
    rec.start();
    return rec;
  } catch (e) { onEnd("error"); return null; }
}

export function LessonScreen({ unit, exercises, onQuit, onFinish, gems, onRevive, prefs }) {
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [choice, setChoice] = useState(null);
  const [built, setBuilt] = useState([]);
  const [typed, setTyped] = useState("");
  const [picked, setPicked] = useState(null);          /* paires : mot sélectionné à gauche */
  const [matched, setMatched] = useState([]);          /* paires : déjà associées */
  const [wrongPair, setWrongPair] = useState(null);
  const [heard, setHeard] = useState(null);            /* prononciation : ce qui a été entendu */
  const [micState, setMicState] = useState("idle");
  const [state, setState] = useState("answering");
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const [streakToHeart, setStreakToHeart] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  const ex = exercises[idx];
  const pct = Math.round((idx / exercises.length) * 100);
  const showPh = prefs.showPhonetics;

  useEffect(() => {
    if (!ex) return;
    const timers = [];
    if (ex.kind === "listen" || ex.kind === "listen_type") timers.push(setTimeout(() => speak(ex.item.pt), 420));
    if (ex.kind === "type" || ex.kind === "listen_type") timers.push(setTimeout(() => inputRef.current && inputRef.current.focus(), 250));
    return () => timers.forEach(clearTimeout);
  }, [idx, ex]);

  if (!ex) return null;

  const ready =
    ex.kind === "bank" ? built.length > 0
      : ex.kind === "type" || ex.kind === "listen_type" ? typed.trim().length > 0
        : ex.kind === "pairs" ? matched.length === ex.items.length
          : ex.kind === "speak" ? true
            : choice !== null;

  function registerAnswer(correct, pt = ex.item.pt) {
    setAnswers((a) => [...a, { pt, correct, kind: ex.kind }]);
  }

  function succeed() {
    const c = combo + 1;
    setCombo(c);
    if (c >= 3 && c % 3 === 0) sndCombo(c); else sndGood(c);
    setState("right");
    /* Trois bonnes réponses d'affilée rendent un cœur : l'erreur coûte,
       mais la régularité répare. */
    const s = streakToHeart + 1;
    if (s >= 3 && hearts < 5) { setHearts((h) => Math.min(5, h + 1)); setStreakToHeart(0); sndHeart(); }
    else setStreakToHeart(s >= 3 ? 0 : s);
    setTimeout(() => speak(ex.item.pt), 260);
  }

  function fail() {
    sndBad();
    setCombo(0);
    setStreakToHeart(0);
    setMistakes((m) => m + 1);
    setShake(true);
    setTimeout(() => setShake(false), 420);
    const h = hearts - 1;
    setHearts(h);
    setState(h <= 0 ? "dead" : "wrong");
  }

  function check() {
    let correct = false;
    if (ex.kind === "bank") {
      correct = built.map((t) => t.w).join(" ").trim().toLowerCase() === ex.answer.trim().toLowerCase();
    } else if (ex.kind === "type" || ex.kind === "listen_type") {
      correct = isCloseEnough(typed, ex.answer);
    } else if (ex.kind === "pairs") {
      correct = true; /* le jeu n'avance qu'une fois toutes les paires trouvées */
    } else if (ex.kind === "speak") {
      /* Passer sans essayer ne coûte pas de cœur, mais le mot repassera. */
      if (heard === null) { registerAnswer(false); setState("wrong"); return; }
      correct = heard !== "raté";
    } else {
      correct = choice === ex.answer;
    }
    registerAnswer(correct);
    if (correct) succeed(); else fail();
  }

  function next() {
    if (idx + 1 >= exercises.length) { sndWin(); onFinish({ mistakes, answers }); return; }
    setIdx(idx + 1);
    setChoice(null); setBuilt([]); setTyped(""); setPicked(null); setMatched([]);
    setHeard(null); setMicState("idle"); setState("answering");
  }

  /* --- Mini-jeu des paires ---------------------------------------- */
  function tapPair(side, id) {
    if (matched.includes(id)) return;
    if (side === "left") { sndSelect(); setPicked(id); speak(id); return; }
    if (!picked) { sndSelect(); return; }
    if (picked === id) {
      sndGood(matched.length);
      const done = [...matched, id];
      setMatched(done);
      setPicked(null);
      setAnswers((a) => [...a, { pt: id, correct: true, kind: "pairs" }]);
      if (done.length === ex.items.length) { setState("right"); setCombo((c) => c + 1); }
    } else {
      sndBad();
      setWrongPair(id);
      setMistakes((m) => m + 1);
      setAnswers((a) => [...a, { pt: picked, correct: false, kind: "pairs" }]);
      setTimeout(() => { setWrongPair(null); setPicked(null); }, 500);
    }
  }

  /* --- Prononciation ----------------------------------------------- */
  function startMic() {
    setMicState("listening");
    setHeard(null);
    listenOnce(
      (list) => {
        const ok = list.some((h) => isCloseEnough(h, ex.item.pt) || normalizeAnswer(h).includes(normalizeAnswer(ex.item.pt)));
        setHeard(ok ? list[0] : "raté");
        setMicState("done");
      },
      (err) => {
        setMicState("done");
        setHeard((h) => (h === null ? (err ? "raté" : "raté") : h));
      }
    );
  }

  if (state === "dead") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-4">
        <Mascot mood="sad" size={120} />
        <h2 className="text-2xl font-extrabold text-slate-800">Plus de cœurs</h2>
        <p className="text-slate-500 max-w-xs">Pas grave : les mots ratés reviendront vite en révision, c'est là que ça rentre.</p>
        <button onClick={() => { sndTap(); onFinish({ mistakes, answers }); }}
          className="w-full max-w-xs rounded-2xl bg-emerald-500 text-white font-extrabold py-4 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">
          Garder mes {answers.filter((a) => a.correct).length} bonnes réponses
        </button>
        {gems >= 30 && (
          <button onClick={() => { sndTap(); onRevive(); setHearts(3); setState("answering"); }}
            className="w-full max-w-xs rounded-2xl bg-white text-sky-700 font-bold py-3 border-2 border-sky-200">
            Reprendre avec 3 cœurs — 30 <Gem className="inline w-4 h-4 -mt-1" />
          </button>
        )}
        <button onClick={() => { sndTap(); onQuit(); }} className="text-sm font-bold text-slate-400">Quitter sans garder</button>
      </div>
    );
  }

  const prompt = {
    listen: "Qu'est-ce que tu entends ?",
    listen_type: "Écris ce que tu entends",
    bank: "Construis la phrase en portugais",
    type: "Écris-le en portugais",
    article: "o ou a ?",
    pairs: "Associe chaque mot à sa traduction",
    speak: "Prononce ce mot",
  }[ex.kind] || (ex.dir === "pt_fr" ? "Que veut dire ce mot ?" : "Comment on dit ?");

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => { sndTap(); onQuit(); }} aria-label="Quitter la leçon" className="w-9 h-9 grid place-items-center rounded-xl text-slate-400"><X className="w-6 h-6" /></button>
        <div className="flex-1 h-4 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center gap-1">
          <Heart className={`w-5 h-5 fill-red-500 text-red-500 ${shake ? "fb-shake" : ""}`} />
          <span className="font-extrabold text-red-500 tabular-nums">{hearts}</span>
        </div>
      </div>

      {combo >= 3 && state === "answering" && (
        <div className="px-4">
          <div className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-bold fb-pop">
            <Flame className="w-3.5 h-3.5 fb-flame" /> {combo} d'affilée !
          </div>
        </div>
      )}

      <div key={idx} className="flex-1 px-4 pt-5 fb-in">
        <p className="text-sm font-bold text-slate-400 mb-3">{prompt}</p>

        {/* --- L'énoncé ------------------------------------------------ */}
        {ex.kind === "listen" || ex.kind === "listen_type" ? (
          <div className="flex flex-col items-center py-4 gap-2">
            <SpeakButton text={ex.item.pt} big />
            <button onClick={() => speak(ex.item.pt, { slow: true })} className="text-xs font-bold text-sky-600 rounded-full border-2 border-sky-200 px-3 py-1">Plus lentement</button>
          </div>
        ) : ex.kind === "pairs" ? null : (
          <div className="flex items-center gap-3 mb-5">
            <Mascot mood={state === "right" ? "happy" : state === "wrong" ? "sad" : "idle"} size={56} className="shrink-0" />
            <div className="relative bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 flex-1 min-w-0">
              <div className="text-xl font-extrabold text-slate-800 break-words">
                {ex.kind === "article" ? <span>___ {ex.question}</span> : ex.question}
              </div>
              {(ex.dir === "pt_fr" || ex.kind === "article" || ex.kind === "speak") && showPh && (
                <div className="text-sm mt-0.5"><Phonetic text={ex.item.ph} /></div>
              )}
              {(ex.dir === "pt_fr" || ex.kind === "article" || ex.kind === "speak") && (
                <button onClick={() => speak(ex.item.pt)} aria-label="Écouter" className="absolute -right-2 -top-3 w-8 h-8 rounded-full bg-sky-500 text-white grid place-items-center shadow"><Volume2 className="w-4 h-4" /></button>
              )}
            </div>
          </div>
        )}

        {/* --- La réponse ---------------------------------------------- */}
        {ex.kind === "bank" ? (
          <div>
            <div className="min-h-16 rounded-2xl border-2 border-dashed border-slate-300 p-2 flex flex-wrap gap-2 mb-5">
              {built.map((t) => (
                <button key={t.id} disabled={state !== "answering"} onClick={() => { sndTap(); setBuilt(built.filter((x) => x.id !== t.id)); }}
                  className="rounded-xl bg-white border-2 border-slate-200 border-b-4 px-3 py-2 font-bold text-slate-700 fb-tile-in">{t.w}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {ex.tiles.filter((t) => !built.find((b) => b.id === t.id)).map((t) => (
                <button key={t.id} disabled={state !== "answering"} onClick={() => { sndSelect(); setBuilt([...built, t]); }}
                  className="rounded-xl bg-white border-2 border-slate-200 border-b-4 px-3 py-2 font-bold text-slate-700 active:translate-y-0.5 active:border-b-2">{t.w}</button>
              ))}
            </div>
          </div>
        ) : ex.kind === "type" || ex.kind === "listen_type" ? (
          <div>
            <input ref={inputRef} value={typed} disabled={state !== "answering"}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && ready && state === "answering") check(); }}
              placeholder="Écris en portugais…" autoCapitalize="off" autoCorrect="off" spellCheck="false"
              className={`w-full rounded-2xl border-2 px-4 py-4 text-lg font-bold text-slate-800 ${shake ? "fb-shake border-red-300" : "border-slate-200"}`} />
            <p className="text-xs text-slate-400 mt-2">Les accents et les petites fautes de frappe sont tolérés.</p>
          </div>
        ) : ex.kind === "pairs" ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              {ex.left.map((l) => {
                const done = matched.includes(l.id);
                return (
                  <button key={l.id} disabled={done} onClick={() => tapPair("left", l.id)}
                    className={`w-full rounded-2xl border-2 border-b-4 px-3 py-3 font-bold text-sm transition-all
                      ${done ? "bg-emerald-50 border-emerald-200 text-emerald-400"
                        : picked === l.id ? "bg-sky-50 border-sky-400 text-sky-800" : "bg-white border-slate-200 text-slate-700"}`}>
                    {l.text}
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              {ex.right.map((r) => {
                const done = matched.includes(r.id);
                return (
                  <button key={r.id} disabled={done} onClick={() => tapPair("right", r.id)}
                    className={`w-full rounded-2xl border-2 border-b-4 px-3 py-3 font-bold text-sm transition-all
                      ${done ? "bg-emerald-50 border-emerald-200 text-emerald-400"
                        : wrongPair === r.id ? "bg-red-50 border-red-400 text-red-700 fb-shake" : "bg-white border-slate-200 text-slate-700"}`}>
                    {r.text}
                  </button>
                );
              })}
            </div>
          </div>
        ) : ex.kind === "speak" ? (
          <div className="flex flex-col items-center gap-3 py-2">
            <button onClick={startMic} disabled={micState === "listening" || state !== "answering"}
              className={`w-24 h-24 rounded-full grid place-items-center text-white shadow-lg border-b-4 transition-all
                ${micState === "listening" ? "bg-red-500 border-red-700 fb-pulse" : "bg-sky-500 border-sky-700 active:border-b-0 active:translate-y-1"}`}>
              <Mic className="w-10 h-10" />
            </button>
            <p className="text-sm text-slate-500">
              {micState === "idle" ? "Touche le micro et dis le mot"
                : micState === "listening" ? "J'écoute…"
                  : heard === "raté" ? "Je n'ai pas reconnu — réessaie ou passe" : `Entendu : « ${heard} »`}
            </p>
            {micState === "done" && <button onClick={startMic} className="text-xs font-bold text-sky-600 underline">Réessayer</button>}
          </div>
        ) : ex.kind === "article" ? (
          <div className="grid grid-cols-2 gap-3">
            {ex.options.map((opt) => {
              const selected = choice === opt, isAnswer = opt === ex.answer;
              let cls = "bg-white border-slate-200 text-slate-700";
              if (state === "answering" && selected) cls = "bg-sky-50 border-sky-400 text-sky-800";
              if (state !== "answering" && isAnswer) cls = "bg-emerald-50 border-emerald-400 text-emerald-800";
              if (state === "wrong" && selected && !isAnswer) cls = "bg-red-50 border-red-400 text-red-700";
              return (
                <button key={opt} disabled={state !== "answering"} onClick={() => { sndSelect(); setChoice(opt); }}
                  className={`rounded-2xl border-2 border-b-4 py-6 text-2xl font-extrabold transition-all active:translate-y-0.5 active:border-b-2 ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-3">
            {ex.options.map((opt) => {
              const selected = choice === opt, isAnswer = opt === ex.answer;
              let cls = "bg-white border-slate-200 text-slate-700";
              if (state === "answering" && selected) cls = "bg-sky-50 border-sky-400 text-sky-800";
              if (state !== "answering" && isAnswer) cls = "bg-emerald-50 border-emerald-400 text-emerald-800";
              if (state === "wrong" && selected && !isAnswer) cls = "bg-red-50 border-red-400 text-red-700";
              const ph = ex.dir === "fr_pt" ? PH_OF[opt] : null;
              return (
                <button key={opt} disabled={state !== "answering"}
                  onClick={() => { sndSelect(); setChoice(opt); if (ex.dir === "fr_pt") speak(opt); }}
                  className={`w-full text-left rounded-2xl border-2 border-b-4 px-4 py-3 font-bold transition-all active:translate-y-0.5 active:border-b-2 ${cls}`}>
                  <div>{opt}</div>
                  {ph && showPh && <div className="text-xs font-normal mt-0.5"><Phonetic text={ph} /></div>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className={`sticky bottom-0 px-4 py-4 border-t-2 transition-colors
        ${state === "right" ? "bg-emerald-50 border-emerald-200" : state === "wrong" ? "bg-red-50 border-red-200" : "bg-white border-slate-100"}`}>
        {state !== "answering" && (
          <div className="flex items-start gap-3 mb-3 fb-slide-in">
            <div className={`w-9 h-9 rounded-full grid place-items-center shrink-0 ${state === "right" ? "bg-emerald-500" : "bg-red-500"}`}>
              {state === "right" ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
            </div>
            <div className="leading-tight min-w-0">
              <div className={`font-extrabold ${state === "right" ? "text-emerald-700" : "text-red-700"}`}>
                {state === "right" ? PRAISE[idx % PRAISE.length] : "Réponse attendue"}
              </div>
              <div className={`text-sm font-semibold ${state === "right" ? "text-emerald-700" : "text-red-700"}`}>{ex.item.pt}</div>
              <div className="text-sm"><Phonetic text={ex.item.ph} /> <span className="text-slate-500">· {ex.item.fr}</span></div>
            </div>
            <button onClick={() => speak(ex.item.pt, { slow: true })} aria-label="Réécouter lentement" className="ml-auto w-9 h-9 rounded-xl bg-white/70 grid place-items-center text-slate-500 shrink-0"><Volume2 className="w-5 h-5" /></button>
          </div>
        )}
        <button disabled={state === "answering" && !ready} onClick={() => (state === "answering" ? check() : next())}
          className={`w-full rounded-2xl py-4 font-extrabold text-white border-b-4 transition-all active:border-b-0 active:translate-y-1
            ${state === "wrong" ? "bg-red-500 border-red-700" : state === "right" ? "bg-emerald-500 border-emerald-700"
              : ready ? "bg-emerald-500 border-emerald-700" : "bg-slate-200 border-slate-300 text-slate-400"}`}>
          {state === "answering" ? (ex.kind === "speak" && !ready ? "Passer" : "Vérifier") : "Continuer"}
        </button>
      </div>
    </div>
  );
}
