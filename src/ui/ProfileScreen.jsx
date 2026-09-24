import React, { useState, useEffect } from "react";
import { AlertTriangle, Award, BookOpen, Check, Copy, Flame, Gem, Trophy, Volume2 } from "lucide-react";
import { ALL_ITEMS, PH_OF } from "../data/units.js";
import { levelInfo, LEVEL_GEMS } from "../lib/levels.js";
import { BADGES, doneCount } from "../lib/progress.js";
import { storage, encodeSave, decodeSave } from "../lib/storage.js";
import { speak, ptVoices, watchSpeech, getSpeechStatus, primeSpeech, speechDebug, getVoicesList } from "../lib/speech.js";
import { sndGood, getAudioCtx } from "../lib/audio.js";
import { Phonetic } from "./bits.jsx";

/*  ÉCRAN : PROFIL                                                     */
/* ================================================================== */

const BUILD_ID = typeof __BUILD_ID__ !== "undefined" ? __BUILD_ID__ : "dev";

export function SoundDiagnostic() {
  const [, setTick] = useState(0);
  const [copied, setCopied] = useState(false);
  const refresh = () => setTick((t) => t + 1);

  useEffect(() => {
    const unwatch = watchSpeech(refresh);
    const id = setInterval(refresh, 800);
    return () => { unwatch(); clearInterval(id); };
  }, []);

  const hasSynth = typeof window !== "undefined" && !!window.speechSynthesis;
  const pts = ptVoices();
  const report = [
    `Build       : ${BUILD_ID}`,
    `Navigateur  : ${typeof navigator !== "undefined" ? navigator.userAgent : "?"}`,
    `Synthèse    : ${hasSynth ? "disponible" : "ABSENTE"}`,
    `Voix totales: ${getVoicesList().length}`,
    `Voix pt     : ${pts.length}${pts.length ? " — " + pts.slice(0, 3).map((v) => `${v.name} [${v.lang}]`).join(", ") : ""}`,
    `Statut      : ${getSpeechStatus()}`,
    `Essais      : ${speechDebug.attempts} · démarrés ${speechDebug.started} · erreurs ${speechDebug.errors}`,
    `Dern. erreur: ${speechDebug.lastError || "aucune"}`,
    `Dern. voix  : ${speechDebug.lastVoice || "—"} · langue ${speechDebug.lastLang || "—"}`,
    `Audio bips  : ${getAudioCtx() ? getAudioCtx().state : "pas encore créé"}`,
  ].join("\n");

  return (
    <div className="mt-8">
      <h3 className="font-extrabold text-slate-800 mb-1">Diagnostic du son</h3>
      <p className="text-xs text-slate-400 mb-3">Si le portugais reste muet, lance les deux tests puis envoie ce rapport.</p>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => { sndGood(); refresh(); }}
          className="rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-700 text-sm">
          1. Tester un bip
        </button>
        <button onClick={() => { primeSpeech(); speak("Bom dia, tudo bem?"); refresh(); }}
          className="rounded-2xl bg-sky-500 text-white font-bold py-3 text-sm border-b-4 border-sky-700 active:border-b-0 active:translate-y-1">
          2. Tester la voix
        </button>
      </div>
      <p className="text-[11px] text-slate-400 mt-2">
        Le bip marche mais pas la voix → il manque la voix portugaise sur le téléphone. Rien ne marche → c'est le volume média ou le mode silencieux.
      </p>

      <pre className="mt-3 rounded-2xl bg-slate-900 text-slate-100 text-[10px] leading-relaxed p-3 overflow-x-auto whitespace-pre-wrap break-all">{report}</pre>
      <button onClick={() => {
        try { navigator.clipboard.writeText(report); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch (e) { /* ok */ }
      }} className="w-full mt-2 rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-600 flex items-center justify-center gap-2">
        <Copy className="w-4 h-4" /> {copied ? "Rapport copié" : "Copier le rapport"}
      </button>
    </div>
  );
}

export function ProfileScreen({ progress, onReset, onImport, prefs, storageWarning, onStats }) {
  const [confirm, setConfirm] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [importMsg, setImportMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const words = Object.keys(progress.learned);
  const li = levelInfo(progress.xp);
  const code = encodeSave(progress);

  function copy() {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch (e) { setCopied(false); }
  }
  function doImport() {
    const p = decodeSave(importCode);
    if (!p) { setImportMsg("Ce code n'est pas lisible. Vérifie qu'il est copié en entier."); return; }
    onImport(p); setImportMsg("Progression restaurée."); setImportCode("");
  }

  return (
    <div className="pb-tabbar">
      <div className="px-4 py-4 border-b border-slate-100 sticky top-0 bg-white z-20 pt-[max(1rem,env(safe-area-inset-top))]">
        <h2 className="font-extrabold text-lg text-slate-800">Mon profil</h2>
      </div>

      <div className="px-4 pt-5">
        <div className="rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-400 to-emerald-500 p-5 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-3xl bg-white/25 grid place-items-center text-3xl">🦜</div>
            <div>
              <div className="text-xs font-bold opacity-90">Niveau {li.level}</div>
              <div className="text-2xl font-extrabold">{li.title}</div>
              <div className="text-xs opacity-90 tabular-nums">{progress.xp} XP au total</div>
            </div>
          </div>
          <div className="h-2.5 rounded-full bg-white/30 mt-4 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${li.pct}%` }} />
          </div>
          <div className="text-[11px] mt-1 opacity-90">{li.toNext} XP avant le niveau {li.level + 1} — et {LEVEL_GEMS} gemmes à la clé</div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-3 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto" />
            <div className="font-extrabold text-orange-700 text-lg tabular-nums">{progress.streak}</div>
            <div className="text-[10px] font-bold text-orange-600">jours</div>
          </div>
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-100 p-3 text-center">
            <BookOpen className="w-5 h-5 text-emerald-500 mx-auto" />
            <div className="font-extrabold text-emerald-700 text-lg tabular-nums">{words.length}</div>
            <div className="text-[10px] font-bold text-emerald-600">mots</div>
          </div>
          <div className="rounded-2xl bg-violet-50 border-2 border-violet-100 p-3 text-center">
            <Trophy className="w-5 h-5 text-violet-500 mx-auto" />
            <div className="font-extrabold text-violet-700 text-lg tabular-nums">{doneCount(progress)}</div>
            <div className="text-[10px] font-bold text-violet-600">leçons</div>
          </div>
          <div className="rounded-2xl bg-sky-50 border-2 border-sky-100 p-3 text-center">
            <Gem className="w-5 h-5 text-sky-500 mx-auto" />
            <div className="font-extrabold text-sky-700 text-lg tabular-nums">{progress.gems}</div>
            <div className="text-[10px] font-bold text-sky-600">gemmes</div>
          </div>
        </div>

        <h3 className="font-extrabold text-slate-800 mt-7 mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-amber-500" /> Trophées</h3>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const has = progress.badges.includes(b.id);
            return (
              <div key={b.id} title={b.desc} className={`rounded-2xl p-2 text-center border-2 ${has ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-100 opacity-50"}`}>
                <div className="text-2xl">{has ? b.emoji : "🔒"}</div>
                <div className="text-[10px] font-bold text-slate-600 leading-tight mt-1">{b.label}</div>
              </div>
            );
          })}
        </div>

        {/* Sauvegarde */}
        <h3 className="font-extrabold text-slate-800 mt-7 mb-2">Sauvegarde</h3>
        <div className={`rounded-2xl border-2 p-3 mb-3 flex items-center gap-2 ${storageWarning ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}>
          {storageWarning ? <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" /> : <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
          <div className={`text-xs ${storageWarning ? "text-amber-800" : "text-emerald-800"}`}>
            {storageWarning
              ? "Rien ne s'enregistre ici : tout sera perdu en fermant. Garde le code ci-dessous."
              : `Enregistrement automatique après chaque leçon — ${storage.label()}.`}
          </div>
        </div>
        <button onClick={() => setShowCode(!showCode)} className="w-full rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-600">
          {showCode ? "Masquer le code" : "Code de secours (changer d'appareil)"}
        </button>
        {showCode && (
          <div className="mt-3">
            <textarea readOnly value={code} rows={4}
              className="w-full rounded-2xl border-2 border-slate-200 p-3 font-mono text-[10px] text-slate-600 break-all" />
            <button onClick={copy} className="w-full mt-2 rounded-2xl bg-slate-800 text-white font-bold py-3 flex items-center justify-center gap-2">
              <Copy className="w-4 h-4" /> {copied ? "Copié" : "Copier le code"}
            </button>
            <div className="mt-4">
              <label className="block text-sm font-bold text-slate-600 mb-1">Restaurer depuis un code</label>
              <textarea value={importCode} onChange={(e) => setImportCode(e.target.value)} rows={3} placeholder="Colle ton code ici"
                autoCapitalize="off" autoCorrect="off" spellCheck="false"
                className="w-full rounded-2xl border-2 border-slate-200 p-3 font-mono text-base text-slate-700 break-all" />
              <button onClick={doImport} disabled={!importCode.trim()}
                className={`w-full mt-2 rounded-2xl font-bold py-3 ${importCode.trim() ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                Restaurer
              </button>
              {importMsg && <p className="text-xs mt-2 text-slate-600">{importMsg}</p>}
            </div>
          </div>
        )}

        <button onClick={onStats} className="w-full mt-7 rounded-2xl bg-slate-800 text-white font-extrabold py-3">
          Voir ma progression en détail
        </button>

        <SoundDiagnostic />

        {words.length > 0 && (
          <>
            <h3 className="font-extrabold text-slate-800 mt-7 mb-3">Mon carnet de mots</h3>
            <div className="rounded-2xl border-2 border-slate-100 divide-y divide-slate-100 overflow-hidden">
              {words.map((pt) => {
                const it = ALL_ITEMS.find((x) => x.pt === pt);
                return (
                  <div key={pt} className="flex items-center gap-3 px-3 py-2">
                    <button onClick={() => speak(pt)} aria-label="Écouter" className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 grid place-items-center shrink-0"><Volume2 className="w-4 h-4" /></button>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-800 truncate">{pt}</div>
                      {prefs.showPhonetics && <div className="text-xs truncate"><Phonetic text={PH_OF[pt]} /></div>}
                      <div className="text-xs text-slate-500 truncate">{it ? it.fr : ""}</div>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {[1, 2, 3].map((n) => <div key={n} className={`w-2 h-2 rounded-full ${n <= Math.min(3, progress.learned[pt]) ? "bg-emerald-500" : "bg-slate-200"}`} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-8">
          {!confirm ? (
            <button onClick={() => setConfirm(true)} className="w-full rounded-2xl border-2 border-slate-200 text-slate-500 font-bold py-3">Effacer ma progression</button>
          ) : (
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700 font-semibold mb-3">Tout sera remis à zéro : XP, niveau, gemmes, cartes postales.</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirm(false)} className="flex-1 rounded-xl bg-white border-2 border-slate-200 font-bold py-2.5 text-slate-600">Annuler</button>
                <button onClick={onReset} className="flex-1 rounded-xl bg-red-500 text-white font-bold py-2.5">Tout effacer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

