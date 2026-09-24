import React, { useState, useEffect, useCallback } from "react";

import { UNITS, ALL_ITEMS } from "./data/units.js";
import { BOOKS, bookOf, pageOf, PAGE_BONUS_XP, PAGE_BONUS_GEMS, BOOK_BONUS_XP, BOOK_BONUS_GEMS } from "./data/stories.js";
import { CARDS, CARD_PRICE, RARITY } from "./data/cards.js";

import { levelInfo, LEVEL_GEMS } from "./lib/levels.js";
import {
  defaultProgress, defaultPrefs, migrate, storyProgress, storyWordsDone, bookDone, freshBadges,
  rollOverDay, markActivity, recordAnswer, dueItems, weakItems, seenItems,
  crownOf, MAX_CROWN, bumpQuest, ensureQuests, goalOf, chestReward, MAX_FREEZES,
  XP_PER_CORRECT, STREAK_MILESTONES,
} from "./lib/progress.js";
import { storage, SAVE_KEY, PREFS_KEY } from "./lib/storage.js";
import { makeSession } from "./lib/exercises.js";
import { speak, refreshVoices, huntVoices, primeSpeech, watchSpeech, getSpeechStatus, setSpeechPrefs } from "./lib/speech.js";
import { sndTap, sndLevel, sndCard, sndChest, setAudioPrefs } from "./lib/audio.js";

import { VoiceSettings } from "./ui/VoiceSettings.jsx";
import { HomeScreen } from "./ui/HomeScreen.jsx";
import { LibraryScreen, BookCompleteModal } from "./ui/Library.jsx";
import { BookReader } from "./ui/BookReader.jsx";
import { ShopScreen, CardModal } from "./ui/ShopScreen.jsx";
import { LessonScreen } from "./ui/LessonScreen.jsx";
import { ResultScreen } from "./ui/ResultScreen.jsx";
import { ProfileScreen } from "./ui/ProfileScreen.jsx";
import { StatsScreen } from "./ui/StatsScreen.jsx";
import { ChestModal } from "./ui/ChestModal.jsx";
import { TabBar } from "./ui/TabBar.jsx";
import { GlobalStyle } from "./ui/GlobalStyle.jsx";

export default function App() {
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [progress, setProgress] = useState(defaultProgress());
  const [prefs, setPrefsState] = useState(defaultPrefs());
  const [view, setView] = useState("path");
  const [session, setSession] = useState(null);
  const [result, setResult] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [revealed, setRevealed] = useState(null);
  const [openedCard, setOpenedCard] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  const [closedBook, setClosedBook] = useState(null);
  const [chest, setChest] = useState(null);
  const [speechState, setSpeechState] = useState(getSpeechStatus());
  const [soundWarnHidden, setSoundWarnHidden] = useState(false);

  const setPrefs = useCallback((p) => {
    setSpeechPrefs(p);
    setAudioPrefs({ sound: p.sound !== false, haptics: p.haptics !== false });
    setPrefsState(p);
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { keys } = await storage.init();
      if (!alive) return;
      setStorageWarning(storage.mode === "memoire");
      let p = defaultProgress();
      if (keys.includes(SAVE_KEY)) {
        const saved = await storage.read(SAVE_KEY);
        if (saved) p = migrate(saved);
      }
      rollOverDay(p);
      if (keys.includes(PREFS_KEY)) {
        const sp = await storage.read(PREFS_KEY);
        if (sp) setPrefs({ ...defaultPrefs(), ...sp });
      }
      setProgress(p);
      setReady(true);
    })();

    huntVoices();
    const h = () => refreshVoices();
    try { window.speechSynthesis.addEventListener("voiceschanged", h); } catch (e) { /* ok */ }
    window.addEventListener("pointerdown", primeSpeech, { once: true });
    return () => {
      alive = false;
      window.removeEventListener("pointerdown", primeSpeech);
      try { window.speechSynthesis.removeEventListener("voiceschanged", h); } catch (e) { /* ok */ }
    };
  }, [setPrefs]);

  useEffect(() => watchSpeech(setSpeechState), []);
  useEffect(() => { if (ready && storage.ok) storage.write(SAVE_KEY, progress); }, [progress, ready]);
  useEffect(() => { if (ready && storage.ok) storage.write(PREFS_KEY, prefs); }, [prefs, ready]);

  /* --- Démarrage d'une session ------------------------------------ */

  const startLesson = useCallback((unitId) => {
    if (unitId === "review") {
      const due = dueItems(progress, 40);
      const pool = due.length >= 6 ? due : (seenItems(progress).length >= 6 ? seenItems(progress) : ALL_ITEMS.slice(0, 12));
      setSession({
        unit: { id: "review", title: "Révision", emoji: "🔁", items: pool, color: "from-sky-400 to-indigo-500" },
        exercises: makeSession({ items: pool, count: 12, crown: 2, weak: weakItems(progress) }),
        mode: "review",
      });
    } else if (unitId === "weak") {
      const pool = weakItems(progress, 20);
      const items = pool.length >= 4 ? pool : dueItems(progress, 20);
      setSession({
        unit: { id: "weak", title: "Mots fragiles", emoji: "🩹", items, color: "from-orange-400 to-rose-500" },
        exercises: makeSession({ items, count: 10, crown: 1, weak: items }),
        mode: "weak",
      });
    } else {
      const u = UNITS.find((x) => x.id === unitId);
      const crown = crownOf(progress, unitId);
      setSession({
        unit: u,
        exercises: makeSession({ items: u.items, count: 12, crown, weak: weakItems(progress).filter((w) => u.items.includes(w)) }),
        mode: "unit",
        crown,
      });
    }
    setView("lesson");
  }, [progress]);

  /* --- Fin de session --------------------------------------------- */

  function finishLesson({ mistakes, answers }) {
    const u = session.unit;
    const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    const right = answers.filter((a) => a.correct).length;
    const gained = Math.max(20, right * XP_PER_CORRECT - mistakes * 5);
    const gemsGained = stars * 5 + (session.mode === "unit" ? 5 : 0);

    const before = levelInfo(progress.xp).level;
    const afterInfo = levelInfo(progress.xp + gained);
    const levelUps = Math.max(0, afterInfo.level - before);
    const levelGems = levelUps * LEVEL_GEMS;

    let earnedBadges = [];
    let crownUp = false;
    let goalReached = false;
    let streakMilestone = 0;
    const streakBefore = progress.streak;

    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      rollOverDay(p);
      const goalBefore = p.xpToday >= goalOf(prefs);

      p.xp += gained; p.xpToday += gained; p.gems += gemsGained + levelGems;
      markActivity(p, { xp: gained, right, wrong: mistakes });
      if (p.streak !== streakBefore && STREAK_MILESTONES[p.streak]) {
        streakMilestone = p.streak;
        p.gems += STREAK_MILESTONES[p.streak];
      }

      /* La mémoire des mots se met à jour réponse par réponse. */
      answers.forEach((a) => recordAnswer(p, a.pt, a.correct));

      if (session.mode === "unit") {
        const prevL = p.lessons[u.id] || { stars: 0 };
        p.lessons[u.id] = { done: true, stars: Math.max(prevL.stars, stars), plays: (prevL.plays || 0) + 1 };
        /* Une session propre fait gagner une couronne, jusqu'à la maîtrise. */
        if (mistakes <= 3 && crownOf(p, u.id) < MAX_CROWN) {
          p.crowns[u.id] = crownOf(p, u.id) + 1;
          crownUp = true;
        }
      }

      bumpQuest(p, "xp", gained);
      bumpQuest(p, "right", right);
      if (session.mode === "unit") bumpQuest(p, "lessons", 1);
      if (session.mode !== "unit") bumpQuest(p, "review", right);
      if (mistakes === 0) bumpQuest(p, "perfect", 1);
      answers.forEach((a) => { if (a.kind === "listen" || a.kind === "listen_type") bumpQuest(p, "listen", 1); });
      answers.forEach((a) => { if (a.kind === "type" || a.kind === "listen_type") bumpQuest(p, "type", 1); });

      if (!goalBefore && p.xpToday >= goalOf(prefs) && !p.goalChest) {
        p.goalChest = "ready";
        goalReached = true;
      }

      earnedBadges = freshBadges(p);
      p.badges = [...p.badges, ...earnedBadges.map((b) => b.id)];
      return p;
    });

    if (levelUps > 0) setTimeout(sndLevel, 500);
    setResult({
      xpGained: gained, gemsGained, stars, mistakes, right, total: answers.length,
      levelUps, levelGems, newLevel: afterInfo.level, newTitle: afterInfo.title,
      newBadges: earnedBadges, crownUp, unit: u, goalReached,
      streakMilestone, streakGems: STREAK_MILESTONES[streakMilestone] || 0,
    });
    setView("result");
  }

  /* --- Quêtes, coffres, gels --------------------------------------- */

  function claimQuest(quest) {
    sndCard();
    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      const q = ensureQuests(p);
      if (q.claimed.includes(quest.id)) return prev;
      q.claimed.push(quest.id);
      p.gems += quest.gems;
      p.questsDone = (p.questsDone || 0) + 1;
      const fresh = freshBadges(p);
      p.badges = [...p.badges, ...fresh.map((b) => b.id)];
      return p;
    });
  }

  function openChest() {
    const reward = chestReward(progress);
    sndChest();
    setChest(reward);
    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      p.goalChest = "opened";
      if (reward.kind === "freeze") p.freezes = Math.min(MAX_FREEZES, (p.freezes || 0) + 1);
      else p.gems += reward.gems;
      return p;
    });
  }

  function buyFreeze(price) {
    if (progress.gems < price || (progress.freezes || 0) >= MAX_FREEZES) return;
    sndCard();
    setProgress((prev) => ({ ...prev, gems: prev.gems - price, freezes: Math.min(MAX_FREEZES, (prev.freezes || 0) + 1) }));
  }

  function buyCard() {
    const owned = progress.cards || [];
    const available = CARDS.filter((c) => !owned.includes(c.id));
    if (progress.gems < CARD_PRICE || available.length === 0) return;

    const total = available.reduce((s, c) => s + RARITY[c.r].weight, 0);
    let roll = Math.random() * total, chosen = available[available.length - 1];
    for (const c of available) { roll -= RARITY[c.r].weight; if (roll <= 0) { chosen = c; break; } }

    sndCard();
    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      p.gems -= CARD_PRICE;
      p.cards = [...(p.cards || []), chosen.id];
      const fresh = freshBadges(p);
      p.badges = [...p.badges, ...fresh.map((b) => b.id)];
      return p;
    });
    setRevealed(chosen);
    setTimeout(() => speak(chosen.pt), 700);
  }

  /* --- Les livres ----------------------------------------------------
     Un mot retrouvé se note avec la manière dont il l'a été : du premier
     coup, ou après des essais et des indices. La page ne se ferme pas
     pour autant — il faut encore répondre aux questions. */

  function markWordFound(chapterId, key, { firstTry = false, hints = 0 } = {}) {
    const page = pageOf(chapterId);
    if (!page) return;
    if (storyProgress(progress, chapterId).found.includes(key)) return;

    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      p.story = p.story || {};
      const c = { found: [], firstTry: [], hints: 0, quiz: null, done: false, ...(p.story[chapterId] || {}) };
      if (c.found.includes(key)) return prev;
      c.found = [...c.found, key];
      if (firstTry) c.firstTry = [...c.firstTry, key];
      c.hints = (c.hints || 0) + hints;
      p.story[chapterId] = c;
      recordAnswer(p, key, firstTry);
      bumpQuest(p, "story", 1);
      const fresh = freshBadges(p);
      p.badges = [...p.badges, ...fresh.map((b) => b.id)];
      return p;
    });
  }

  function spendGems(n) {
    setProgress((prev) => ({ ...prev, gems: Math.max(0, prev.gems - n) }));
  }

  /* Les questions justes ferment la page. Si c'était la dernière du
     livre, le livre se referme et va se ranger sur l'étagère. */
  function finishPageQuiz(chapterId, score, total) {
    const page = pageOf(chapterId);
    const book = bookOf(chapterId);
    if (!page || !book) return;
    if (storyProgress(progress, chapterId).done) return;
    if (!storyWordsDone(progress, page)) return;

    const others = book.chapters.filter((c) => c !== chapterId);
    const bookCloses = others.every((c) => storyProgress(progress, c).done);

    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      p.story = p.story || {};
      const c = { found: [], firstTry: [], hints: 0, quiz: null, done: false, ...(p.story[chapterId] || {}) };
      c.quiz = { score, total, passed: true };
      c.done = true;
      p.story[chapterId] = c;
      const xp = PAGE_BONUS_XP + (bookCloses ? BOOK_BONUS_XP : 0);
      p.gems += PAGE_BONUS_GEMS + (bookCloses ? BOOK_BONUS_GEMS : 0);
      p.xp += xp; p.xpToday += xp;
      markActivity(p, { xp });
      const fresh = freshBadges(p);
      p.badges = [...p.badges, ...fresh.map((b) => b.id)];
      return p;
    });

    if (!bookCloses) { sndCard(); return; }
    sndLevel();
    const shelvedBefore = BOOKS.filter((b) => b.id !== book.id && bookDone(progress, b));
    const parts = book.pages.map((pg) => storyProgress(progress, pg.unit));
    const st = storyProgress(progress, chapterId);
    const firstTry = parts.reduce((n, s) => n + s.firstTry.length, 0) + st.firstTry.length;
    const hints = parts.reduce((n, s) => n + (s.hints || 0), 0);
    setClosedBook({
      book, shelvedBefore,
      score: { pages: book.pages.length, total: book.pages.length, words: book.targetTotal, firstTry, hints,
        perfect: firstTry >= book.targetTotal && !hints },
    });
  }

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-emerald-50">
        <div className="text-center">
          <div className="text-5xl mb-2" style={{ animation: "fb-pop .6s ease-out" }}>🦜</div>
          <div className="font-extrabold text-emerald-700">Fala, Brasil!</div>
        </div>
      </div>
    );
  }

  const fullScreen = view === "lesson" || view === "result" || view === "story";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <GlobalStyle />
      <div className="mx-auto max-w-md bg-white min-h-screen shadow-xl relative overflow-hidden">
        {view === "path" && (
          <HomeScreen progress={progress} prefs={prefs} onStart={startLesson}
            onSettings={() => setShowSettings(true)} storageWarning={storageWarning}
            speechState={speechState} soundWarnHidden={soundWarnHidden}
            onHideSoundWarn={() => setSoundWarnHidden(true)}
            onClaimQuest={claimQuest} onOpenChest={openChest} onStats={() => setView("stats")}
            onOpenBook={(id) => { setActiveBook(id); setView("story"); }} />
        )}
        {view === "stats" && <StatsScreen progress={progress} prefs={prefs} onBack={() => setView("path")} onStart={startLesson} />}
        {view === "library" && (
          <LibraryScreen progress={progress} onOpenBook={(id) => { setActiveBook(id); setView("story"); }} />
        )}
        {view === "story" && activeBook && (
          <BookReader book={BOOKS.find((b) => b.id === activeBook)}
            progress={progress}
            isUnlocked={(chapterId) => !!(progress.lessons[chapterId] || {}).done}
            gems={progress.gems}
            onWordFound={markWordFound}
            onPageDone={finishPageQuiz}
            onSpendGems={spendGems}
            onStartLesson={(chapterId) => { setActiveBook(null); startLesson(chapterId); }}
            onClose={() => { setActiveBook(null); setView("library"); }} />
        )}
        {view === "shop" && (
          <ShopScreen progress={progress} onBuy={buyCard} onBuyFreeze={buyFreeze}
            onOpenCard={(c, i) => setOpenedCard({ card: c, index: i })} />
        )}
        {view === "profile" && (
          <ProfileScreen progress={progress} prefs={prefs} storageWarning={storageWarning}
            onReset={() => { setProgress(defaultProgress()); setView("path"); }}
            onImport={(p) => setProgress(p)} onStats={() => setView("stats")} />
        )}
        {view === "lesson" && session && (
          <LessonScreen unit={session.unit} exercises={session.exercises} prefs={prefs} gems={progress.gems}
            onRevive={() => setProgress((p) => ({ ...p, gems: p.gems - 30 }))}
            onQuit={() => { setSession(null); setView("path"); }} onFinish={finishLesson} />
        )}
        {view === "result" && result && (
          <ResultScreen result={result} onHome={() => { setSession(null); setResult(null); setView("path"); }} />
        )}

        {!fullScreen && <TabBar view={view} setView={setView} cardCount={(progress.cards || []).length} />}
        {showSettings && <VoiceSettings prefs={prefs} setPrefs={setPrefs} onClose={() => setShowSettings(false)} />}
        {revealed && (
          <CardModal card={revealed} index={CARDS.findIndex((c) => c.id === revealed.id)} revealMode
            onClose={() => { sndTap(); setRevealed(null); }} />
        )}
        {openedCard && (
          <CardModal card={openedCard.card} index={openedCard.index}
            onClose={() => { sndTap(); setOpenedCard(null); }} />
        )}
        {closedBook && (
          <BookCompleteModal book={closedBook.book} shelvedBefore={closedBook.shelvedBefore} score={closedBook.score}
            onClose={() => { sndTap(); setClosedBook(null); setActiveBook(null); setView("library"); }} />
        )}
        {chest && <ChestModal reward={chest} onClose={() => { sndTap(); setChest(null); }} />}
      </div>
    </div>
  );
}
