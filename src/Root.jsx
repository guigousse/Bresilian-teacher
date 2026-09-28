import React, { useEffect, useState } from "react";
import { ChevronRight, Flame } from "lucide-react";

import App from "./App.jsx";
import { COURSES, COURSE_ORDER, setCourse } from "./courses/index.js";
import { storage, PREFS_KEY } from "./lib/storage.js";
import { defaultPrefs } from "./lib/progress.js";
import { LEVEL_XP } from "./lib/levels.js";
import { resetSpeechForCourse } from "./lib/speech.js";
import { Mascot } from "./ui/Mascot.jsx";
import { GlobalStyle } from "./ui/GlobalStyle.jsx";

/* ==================================================================
   LA RACINE — choisit la langue avant de monter l'app.
   Chaque langue a sa propre sauvegarde (parcours, série, gemmes,
   collection) ; les réglages sont communs et retiennent la dernière
   langue choisie. Changer de langue remonte l'app de zéro (key).
   ================================================================== */

function levelOf(xp) {
  let lvl = 1;
  for (let i = 0; i < LEVEL_XP.length; i++) if (xp >= LEVEL_XP[i]) lvl = i + 1;
  return lvl;
}

/* Un résumé de chaque sauvegarde, pour les cartes du menu. */
function summaries(keys) {
  const out = {};
  COURSE_ORDER.forEach((id) => {
    const c = COURSES[id];
    const saved = keys.includes(c.saveKey) ? storage.read(c.saveKey) : null;
    if (!saved) { out[id] = null; return; }
    const lessons = Object.keys(saved.lessons || {}).filter((u) => c.units.some((x) => x.id === u)).length;
    out[id] = { level: levelOf(saved.xp || 0), xp: saved.xp || 0, streak: saved.streak || 0, lessons };
  });
  return out;
}

function applyCourseChrome(c) {
  try {
    document.title = c.t.appName;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", c.themeColor);
  } catch (e) { /* ok */ }
}

export default function Root() {
  const [boot, setBoot] = useState(null);     /* { keys, prefs } une fois le stockage lu */
  const [active, setActive] = useState(null); /* id du cours monté, null = menu */

  useEffect(() => {
    const { keys } = storage.init();
    const prefs = keys.includes(PREFS_KEY) ? { ...defaultPrefs(), ...(storage.read(PREFS_KEY) || {}) } : defaultPrefs();
    setBoot({ keys, prefs });
    if (prefs.course && COURSES[prefs.course]) {
      setCourse(prefs.course);
      applyCourseChrome(COURSES[prefs.course]);
      setActive(prefs.course);
    }
  }, []);

  function choose(id) {
    /* Les réglages ont pu changer dans l'app depuis le démarrage : on relit. */
    const stored = storage.read(PREFS_KEY);
    const prefs = { ...defaultPrefs(), ...(stored || boot.prefs), course: id };
    storage.write(PREFS_KEY, prefs);
    setCourse(id);
    resetSpeechForCourse();
    applyCourseChrome(COURSES[id]);
    setActive(id);
  }

  function openMenu() {
    const { keys } = storage.init();
    setBoot((b) => ({ ...b, keys }));
    setActive(null);
    try { window.scrollTo(0, 0); } catch (e) { /* ok */ }
  }

  if (!boot) return null;
  if (active) return <App key={active} onSwitchCourse={openMenu} />;
  return <LanguageMenu stats={summaries(boot.keys)} current={boot.prefs.course} onChoose={choose} />;
}

/* --- Le menu principal ------------------------------------------------ */

export function LanguageMenu({ stats, onChoose }) {
  const returning = COURSE_ORDER.some((id) => stats[id]);
  return (
    <>
      <GlobalStyle />
      <div className="mx-auto max-w-md tiny:max-w-2xl min-h-app bg-gradient-to-b from-amber-50 via-white to-sky-50 shadow-xl flex flex-col pt-safe pb-safe-4">
        <div className="my-auto">
        <div className="px-5 pt-6 short:pt-3 tiny:pt-2 text-center">
          <div className="flex justify-center -space-x-3 tiny:hidden" aria-hidden="true">
            {COURSE_ORDER.map((id, i) => (
              <div key={id} style={{ transform: `scaleX(${i % 2 ? -1 : 1})` }}>
                <Mascot size={72} look={COURSES[id].mascot} mood="idle" className="short:w-14 short:h-14" />
              </div>
            ))}
          </div>
          <h1 className="text-2xl short:text-xl tiny:text-lg font-extrabold text-slate-800 mt-1">
            {returning ? "On apprend quoi aujourd'hui ?" : "Quelle langue veux-tu apprendre ?"}
          </h1>
          <p className="text-sm text-slate-500 mt-1 tiny:hidden">
            Des leçons courtes, une histoire à suivre, et un pays à découvrir.
          </p>
        </div>

        <div className="px-4 mt-5 short:mt-3 tiny:mt-2 space-y-3 tiny:space-y-0 tiny:grid tiny:grid-cols-2 tiny:gap-3">
          {COURSE_ORDER.map((id) => {
            const c = COURSES[id];
            const s = stats[id];
            return (
              <button key={id} onClick={() => onChoose(id)} data-course={id}
                className={`relative w-full overflow-hidden rounded-3xl bg-gradient-to-br ${c.theme.menuCard} text-white text-left shadow-lg active:scale-[.99] transition p-4 short:py-3`}>
                <div className="absolute -right-3 -bottom-3 opacity-95" aria-hidden="true">
                  <Mascot size={104} look={c.mascot} mood={s ? "idle" : "celebrate"} className="short:w-20 short:h-20 tiny:w-16 tiny:h-16" />
                </div>
                {!s && returning && (
                  <span className="absolute top-3 right-3 z-10 rounded-full bg-white text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 text-slate-800 shadow">Nouveau</span>
                )}
                <div className="relative pr-24 tiny:pr-14">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl leading-none" aria-hidden="true">{c.flag}</span>
                    <div className="min-w-0">
                      <div className="text-xl font-extrabold leading-tight">{c.label}</div>
                      <div className="text-[11px] font-semibold opacity-90 leading-tight">{c.native}</div>
                    </div>
                  </div>
                  <div className="text-xs mt-2 opacity-95 italic">{c.tagline}</div>
                  {s ? (
                    <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[11px] font-bold">
                      <span className="rounded-full bg-white/20 px-2 py-0.5">Niveau {s.level}</span>
                      <span className="rounded-full bg-white/20 px-2 py-0.5 inline-flex items-center gap-1"><Flame className="w-3 h-3" />{s.streak} j</span>
                      <span className="rounded-full bg-white/20 px-2 py-0.5">{s.lessons}/{c.units.length} chapitres</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 mt-3 rounded-full bg-white text-slate-800 text-xs font-extrabold px-3 py-1">
                      Commencer <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        </div>
        <p className="px-6 mt-5 short:mt-3 tiny:mt-2 text-center text-[11px] text-slate-400">
          Chaque langue garde sa propre progression. Pour changer, touche le drapeau en haut de l'écran d'accueil.
        </p>
      </div>
    </>
  );
}
