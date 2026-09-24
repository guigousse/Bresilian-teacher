import React, { useState, useEffect } from "react";
import { Check, Eye, EyeOff, Volume2, X } from "lucide-react";
import { PRON_KEYS } from "../data/units.js";
import { speak, ptVoices, refreshVoices, huntVoices, voiceScore, watchSpeech, getSpeechStatus } from "../lib/speech.js";
import { GOAL_OPTIONS, goalOf } from "../lib/progress.js";

/*  RÉGLAGES DE VOIX                                                   */
/* ================================================================== */

export function VoiceSettings({ prefs, setPrefs, onClose }) {
  const [voices, setVoices] = useState(ptVoices());
  const [status, setStatus] = useState(getSpeechStatus());
  const isAndroid = typeof navigator !== "undefined" && /android/i.test(navigator.userAgent || "");
  useEffect(() => {
    huntVoices(); setVoices(ptVoices());
    const h = () => { refreshVoices(); setVoices(ptVoices()); };
    try { window.speechSynthesis.addEventListener("voiceschanged", h); } catch (e) { /* ok */ }
    const unwatch = watchSpeech(setStatus);
    const poll = setInterval(() => setVoices(ptVoices()), 600);
    setTimeout(() => clearInterval(poll), 5000);
    return () => {
      unwatch(); clearInterval(poll);
      try { window.speechSynthesis.removeEventListener("voiceschanged", h); } catch (e) { /* ok */ }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/40 flex items-end justify-center">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-5 pb-safe-6 max-h-sheet overflow-y-auto overscroll-contain" style={{ animation: "fb-up .25s ease-out" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-lg text-slate-800">Voix et prononciation</h3>
          <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-xl text-slate-400"><X className="w-6 h-6" /></button>
        </div>

        <div className={`rounded-2xl px-3 py-2 mb-4 text-xs font-bold flex items-center gap-2
          ${status === "ok" ? "bg-emerald-50 text-emerald-700"
            : status === "unknown" ? "bg-slate-100 text-slate-500" : "bg-amber-50 text-amber-800"}`}>
          {status === "ok" ? <Check className="w-4 h-4 shrink-0" /> : <Volume2 className="w-4 h-4 shrink-0" />}
          <span>
            {status === "ok" && `Le son fonctionne${voices[0] ? ` · ${voices[0].name}` : ""}`}
            {status === "unknown" && `${voices.length} voix portugaise${voices.length > 1 ? "s" : ""} détectée${voices.length > 1 ? "s" : ""} — teste le son ci-dessous`}
            {status === "novoice" && "Aucune voix portugaise installée sur cet appareil"}
            {status === "blocked" && "Le son n'est pas parti : vérifie le volume média, puis retente"}
            {status === "unsupported" && "Ce navigateur ne gère pas la synthèse vocale"}
          </span>
        </div>

        <label className="block text-sm font-bold text-slate-600 mb-1">Voix portugaise</label>
        {voices.length === 0 ? (
          <div className="text-sm text-slate-600 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 space-y-2">
            <p className="font-bold text-amber-900">Comment installer la voix portugaise</p>
            {isAndroid ? (
              <ol className="list-decimal ml-4 space-y-1">
                <li>Paramètres → Gestion générale (ou Accessibilité) → Synthèse vocale.</li>
                <li>Moteur préféré : Synthèse vocale de Google → icône ⚙.</li>
                <li>Installer les données vocales → Português (Brasil) → télécharger.</li>
                <li>Reviens dans l'app et rouvre cette fenêtre.</li>
              </ol>
            ) : (
              <p>
                Android : Paramètres → Synthèse vocale → moteur Google → installer « português (Brasil) ».
                iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Portugais (Brésil), version Améliorée ou Premium.
              </p>
            )}
            <p className="text-xs">En attendant, la phonétique française sous chaque mot te permet de continuer sans le son.</p>
          </div>
        ) : (
          <select value={prefs.voiceURI || (voices[0] && voices[0].voiceURI) || ""}
            onChange={(e) => setPrefs({ ...prefs, voiceURI: e.target.value })}
            className="w-full rounded-2xl border-2 border-slate-200 px-3 py-3 font-semibold text-slate-700 bg-white">
            {voices.map((v) => (<option key={v.voiceURI} value={v.voiceURI}>{v.name} — {v.lang}{voiceScore(v) >= 120 ? " ⭐" : ""}</option>))}
          </select>
        )}

        <div className="mt-5">
          <div className="flex justify-between text-sm font-bold text-slate-600 mb-1"><span>Débit</span><span className="tabular-nums">{prefs.rate.toFixed(2)}×</span></div>
          <input type="range" min="0.5" max="1.2" step="0.02" value={prefs.rate}
            onChange={(e) => setPrefs({ ...prefs, rate: Number(e.target.value) })} className="w-full accent-emerald-500" />
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm font-bold text-slate-600 mb-1"><span>Hauteur de voix</span><span className="tabular-nums">{prefs.pitch.toFixed(2)}</span></div>
          <input type="range" min="0.7" max="1.4" step="0.02" value={prefs.pitch}
            onChange={(e) => setPrefs({ ...prefs, pitch: Number(e.target.value) })} className="w-full accent-emerald-500" />
        </div>

        <button onClick={() => speak("Bom dia! Eu queria um café, por favor.")}
          className="w-full mt-5 rounded-2xl bg-sky-500 text-white font-extrabold py-3 border-b-4 border-sky-700 active:border-b-0 active:translate-y-1">
          Écouter un exemple
        </button>
        <h4 className="font-extrabold text-slate-800 mt-6 mb-2">Objectif du jour</h4>
        <div className="grid grid-cols-2 gap-2">
          {GOAL_OPTIONS.map((g) => {
            const active = goalOf(prefs) === g.xp;
            return (
              <button key={g.xp} onClick={() => setPrefs({ ...prefs, dailyGoal: g.xp })}
                className={`rounded-2xl border-2 p-3 text-left transition-all ${active ? "border-emerald-400 bg-emerald-50" : "border-slate-200"}`}>
                <div className={`font-extrabold text-sm ${active ? "text-emerald-700" : "text-slate-700"}`}>{g.label}</div>
                <div className="text-[11px] text-slate-500">{g.xp} XP · {g.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => setPrefs({ ...prefs, sound: prefs.sound === false })}
            className="rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-600 text-sm">
            Sons {prefs.sound === false ? "coupés" : "activés"}
          </button>
          <button onClick={() => setPrefs({ ...prefs, haptics: prefs.haptics === false })}
            className="rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-600 text-sm">
            Vibrations {prefs.haptics === false ? "coupées" : "activées"}
          </button>
        </div>

        <button onClick={() => setPrefs({ ...prefs, showPhonetics: !prefs.showPhonetics })}
          className="w-full mt-3 rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-600 flex items-center justify-center gap-2">
          {prefs.showPhonetics ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          Phonétique {prefs.showPhonetics ? "affichée" : "masquée"}
        </button>

        <h4 className="font-extrabold text-slate-800 mt-6 mb-2">Lire le portugais brésilien</h4>
        <div className="rounded-2xl border-2 border-slate-100 divide-y divide-slate-100">
          {PRON_KEYS.map((r) => (
            <div key={r.k} className="flex gap-3 px-3 py-2">
              <div className="font-mono font-bold text-sky-600 text-sm w-24 shrink-0">{r.k}</div>
              <div className="text-sm text-slate-600">{r.v}</div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-5 mb-2 rounded-2xl bg-emerald-500 text-white font-extrabold py-4 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">C'est bon</button>
      </div>
    </div>
  );
}

