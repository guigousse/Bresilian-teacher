import React from "react";
import {
  AlertTriangle, BarChart3, Check, Flame, Gem, Lock, RotateCcw, Settings, Sparkles, Volume2, X,
} from "lucide-react";
import { UNITS } from "../data/units.js";
import { STORIES } from "../data/stories.js";
import { levelInfo } from "../lib/levels.js";
import {
  booksDone, storyProgress, crownOf, MAX_CROWN, CROWN_LABELS, goalOf,
  ensureQuests, questDone, dueCount, weakItems, masteryBreakdown,
} from "../lib/progress.js";
import { sndTap } from "../lib/audio.js";
import { MascotSays } from "./Mascot.jsx";

/* Anneau de progression de l'objectif du jour. */
function GoalRing({ pct, children, size = 66 }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth="6" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round"
          className="fb-ring" strokeDasharray={c} strokeDashoffset={c - (c * Math.min(100, pct)) / 100} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

function SoundWarning({ status, onSettings, onHide }) {
  if (status !== "novoice" && status !== "blocked" && status !== "unsupported") return null;
  const isAndroid = typeof navigator !== "undefined" && /android/i.test(navigator.userAgent || "");
  return (
    <div className="mx-4 mt-4 rounded-2xl bg-sky-50 border-2 border-sky-200 p-3">
      <div className="flex gap-2">
        <Volume2 className="w-5 h-5 text-sky-500 shrink-0" />
        <div className="text-xs text-sky-900 flex-1">
          {status === "unsupported" && "Ce navigateur ne sait pas lire le portugais à voix haute. Essaie avec Chrome ou Safari à jour."}
          {status === "blocked" && "Le son n'est pas parti. Vérifie le volume média du téléphone, puis retouche le bouton haut-parleur."}
          {status === "novoice" && (isAndroid
            ? "Aucune voix portugaise installée. Paramètres → Synthèse vocale → moteur Google → installer Português (Brasil)."
            : "Aucune voix portugaise n'est installée sur cet appareil. Ajoute le portugais (Brésil) dans les réglages de synthèse vocale.")}
        </div>
        <button onClick={onHide} aria-label="Masquer" className="w-6 h-6 grid place-items-center rounded-lg text-sky-400 shrink-0 self-start">
          <X className="w-4 h-4" />
        </button>
      </div>
      <button onClick={onSettings} className="w-full mt-2 rounded-xl bg-sky-500 text-white font-bold text-xs py-2 active:translate-y-0.5">
        Tester le son et choisir une voix
      </button>
    </div>
  );
}

/* Un palier sur le chemin : pastille ronde, couronnes en dessous. */
function PathNode({ unit, index, crown, unlocked, reason, onStart }) {
  const side = index % 4 === 1 ? "ml-16" : index % 4 === 3 ? "mr-16 self-end" : "";
  const done = crown >= MAX_CROWN;
  return (
    <div className={`flex flex-col items-center ${side} fb-node-pop`} style={{ animationDelay: `${index * 45}ms` }}>
      <button disabled={!unlocked} onClick={() => { sndTap(); onStart(unit.id); }}
        className={`relative w-[76px] h-[76px] rounded-full grid place-items-center text-3xl transition-all
          ${unlocked ? `bg-gradient-to-br ${unit.color} text-white shadow-lg border-b-[6px] border-black/25 active:border-b-0 active:translate-y-1.5`
            : "bg-slate-100 text-slate-300 border-b-[6px] border-slate-200"}`}>
        {unlocked ? unit.emoji : <Lock className="w-7 h-7" />}
        {done && (
          <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-white grid place-items-center text-sm shadow">👑</span>
        )}
      </button>
      <div className="mt-1.5 text-center max-w-[130px]">
        <div className={`text-[13px] font-extrabold leading-tight ${unlocked ? "text-slate-800" : "text-slate-400"}`}>{unit.title}</div>
        {unlocked ? (
          <div className="flex items-center justify-center gap-0.5 mt-0.5">
            {Array.from({ length: MAX_CROWN }, (_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full ${i < crown ? "bg-amber-400" : "bg-slate-200"}`} />
            ))}
            <span className="ml-1 text-[10px] font-bold text-slate-400">{CROWN_LABELS[Math.min(crown, MAX_CROWN)]}</span>
          </div>
        ) : (
          <div className="text-[10px] text-slate-400 mt-0.5">{reason}</div>
        )}
      </div>
    </div>
  );
}

export function HomeScreen({
  progress, prefs, onStart, onSettings, storageWarning, speechState,
  soundWarnHidden, onHideSoundWarn, onClaimQuest, onOpenChest, onStats,
}) {
  const li = levelInfo(progress.xp);
  const goal = goalOf(prefs);
  const goalPct = Math.round((progress.xpToday / goal) * 100);
  const goalHit = progress.xpToday >= goal;
  const due = dueCount(progress);
  const weak = weakItems(progress).length;
  const quests = ensureQuests(progress);
  const mastery = masteryBreakdown(progress);
  const chestReady = progress.goalChest === "ready";

  const mood = chestReady ? "celebrate" : goalHit ? "sleep" : due > 0 ? "think" : "idle";
  const hello = chestReady ? "Objectif atteint ! Ton coffre t'attend."
    : goalHit ? "Objectif du jour bouclé. Repose-toi, ou continue !"
      : due > 0 ? `${due} mot${due > 1 ? "s" : ""} à revoir avant de les oublier.`
        : progress.streak > 0 ? `Série de ${progress.streak} jour${progress.streak > 1 ? "s" : ""} — on continue ?`
          : "Bom dia ! On commence par dix minutes ?";

  return (
    <div className="pb-28">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="flex items-center justify-between px-4 py-2.5">
          <button onClick={onStats} className="flex items-center gap-2 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-yellow-400 grid place-items-center text-lg shrink-0">🦜</div>
            <div className="leading-tight text-left min-w-0">
              <div className="text-[13px] font-extrabold text-emerald-900 truncate">Niveau {li.level} · {li.title}</div>
              <div className="text-[11px] text-emerald-700 tabular-nums">{progress.xp} XP · {mastery.acquis} mots acquis</div>
            </div>
          </button>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className={`flex items-center gap-1 rounded-full px-2 py-1 bg-orange-50 text-orange-700 ${progress.streak > 0 ? "" : "opacity-60"}`}>
              <Flame className={`w-4 h-4 text-orange-500 ${progress.streak > 0 ? "fb-flame" : ""}`} />
              <span className="text-sm font-bold tabular-nums">{progress.streak}</span>
            </div>
            <div className="flex items-center gap-1 rounded-full px-2 py-1 bg-sky-50 text-sky-700">
              <Gem className="w-4 h-4 text-sky-500" /><span className="text-sm font-bold tabular-nums">{progress.gems}</span>
            </div>
            <button onClick={onSettings} aria-label="Réglages" className="w-8 h-8 grid place-items-center rounded-full text-slate-400"><Settings className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="px-4 pb-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800 mb-1">
            <span>Niveau {li.level + 1} dans {li.toNext} XP</span>
            <span className="tabular-nums">{progress.xpToday}/{goal} XP aujourd'hui</span>
          </div>
          <div className="h-2.5 rounded-full bg-emerald-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-yellow-400 transition-all duration-700" style={{ width: `${li.pct}%` }} />
          </div>
        </div>
      </header>

      {!soundWarnHidden && <SoundWarning status={speechState} onSettings={onSettings} onHide={onHideSoundWarn} />}

      {storageWarning && (
        <div className="mx-4 mt-4 rounded-2xl bg-amber-50 border-2 border-amber-200 p-3 flex gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="text-xs text-amber-800">
            Ni l'app ni le navigateur n'acceptent d'enregistrer ici (navigation privée ?). Copie ton code de sauvegarde depuis le profil.
          </div>
        </div>
      )}

      {/* Zé et l'objectif du jour */}
      <div className="px-4 pt-4">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-4 shadow-lg">
          <div className="rounded-2xl bg-white/95 p-3">
            <MascotSays mood={mood} text={hello} size={78} />
          </div>
          <div className="flex items-center gap-3 mt-3">
            <GoalRing pct={goalPct}>
              <div className="text-center leading-none">
                <div className="text-[15px] font-extrabold text-white tabular-nums">{Math.min(100, goalPct)}%</div>
              </div>
            </GoalRing>
            <div className="flex-1 min-w-0 text-white">
              <div className="font-extrabold leading-tight">Objectif du jour</div>
              <div className="text-xs text-emerald-50">{progress.xpToday} / {goal} XP · {goalHit ? "atteint !" : `encore ${goal - progress.xpToday} XP`}</div>
            </div>
            {chestReady ? (
              <button onClick={onOpenChest} className="rounded-2xl bg-amber-400 text-amber-950 font-extrabold px-3 py-2 text-sm border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 fb-glow">
                🎁 Coffre
              </button>
            ) : (
              <div className="text-3xl opacity-40">🎁</div>
            )}
          </div>
        </div>
      </div>

      {/* Révisions dues : le cœur de la mémorisation */}
      <div className="px-4 pt-4 grid grid-cols-2 gap-3">
        <button onClick={() => { sndTap(); onStart("review"); }} disabled={due === 0}
          className={`rounded-2xl p-3 text-left border-b-4 transition-all active:border-b-0 active:translate-y-1
            ${due > 0 ? "bg-sky-500 text-white border-sky-700" : "bg-slate-100 text-slate-400 border-slate-200"}`}>
          <div className="flex items-center gap-1.5 font-extrabold"><RotateCcw className="w-4 h-4" /> Réviser</div>
          <div className="text-xs mt-0.5 opacity-90">{due > 0 ? `${due} mot${due > 1 ? "s" : ""} à revoir` : "Rien à revoir, bravo"}</div>
        </button>
        <button onClick={() => { sndTap(); onStart("weak"); }} disabled={weak < 4}
          className={`rounded-2xl p-3 text-left border-b-4 transition-all active:border-b-0 active:translate-y-1
            ${weak >= 4 ? "bg-orange-500 text-white border-orange-700" : "bg-slate-100 text-slate-400 border-slate-200"}`}>
          <div className="flex items-center gap-1.5 font-extrabold">🩹 Mots fragiles</div>
          <div className="text-xs mt-0.5 opacity-90">{weak >= 4 ? `${weak} mots résistent` : "Rien ne coince"}</div>
        </button>
      </div>

      {/* Quêtes du jour */}
      <div className="px-4 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-extrabold text-slate-800 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500" /> Missões do dia</h3>
          <button onClick={onStats} className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <BarChart3 className="w-3.5 h-3.5" /> Mes stats
          </button>
        </div>
        <div className="space-y-2">
          {quests.list.map((q) => {
            const have = quests.counts[q.metric] || 0;
            const done = questDone(quests, q);
            const claimed = quests.claimed.includes(q.id);
            return (
              <div key={q.id} className={`rounded-2xl border-2 p-3 flex items-center gap-3 ${claimed ? "bg-slate-50 border-slate-100" : done ? "bg-amber-50 border-amber-200" : "border-slate-100"}`}>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold ${claimed ? "text-slate-400 line-through" : "text-slate-700"}`}>{q.label}</div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mt-1.5">
                    <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${Math.min(100, (have / q.goal) * 100)}%` }} />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 tabular-nums">{Math.min(have, q.goal)}/{q.goal}</div>
                </div>
                {claimed ? (
                  <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                ) : done ? (
                  <button onClick={() => onClaimQuest(q)} className="rounded-xl bg-amber-400 text-amber-950 font-extrabold text-xs px-3 py-2 border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 shrink-0">
                    +{q.gems} 💎
                  </button>
                ) : (
                  <div className="text-xs font-bold text-slate-300 shrink-0">+{q.gems} 💎</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Le chemin */}
      <div className="px-4 pt-7">
        <h3 className="font-extrabold text-slate-800 mb-1">Mon parcours</h3>
        <p className="text-xs text-slate-400 mb-4">Chaque palier se rejoue : à chaque couronne, les exercices deviennent plus exigeants.</p>
        <div className="flex flex-col gap-5">
          {UNITS.map((u, i) => {
            const prevLessonDone = i === 0 || (progress.lessons[UNITS[i - 1].id] || {}).done;
            const prevStoryDone = i === 0 || storyProgress(progress, UNITS[i - 1].id).done;
            const unlocked = prevLessonDone && prevStoryDone;
            return (
              <PathNode key={u.id} unit={u} index={i} crown={crownOf(progress, u.id)} unlocked={unlocked}
                reason={prevLessonDone ? "Termine le livre précédent" : "Termine la leçon précédente"}
                onStart={onStart} />
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-3 text-center">
          <div className="text-sm font-bold text-emerald-800">{booksDone(progress)}/{STORIES.length} livres rangés</div>
          <div className="text-xs text-emerald-700 mt-0.5">L'histoire de Léa continue dans l'onglet Biblioteca.</div>
        </div>
      </div>
    </div>
  );
}
