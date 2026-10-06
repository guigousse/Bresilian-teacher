import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Music, Play, Pause, Youtube, Smartphone, Languages, BookText, Volume2, X, RotateCcw, Search } from "lucide-react";
import { sndTap, sndWhoosh } from "../lib/audio.js";
import { speak } from "../lib/speech.js";
import {
  fetchLyricVersions, pickVersion, lineAt, translateLines,
  youtubeId, loadYouTubeApi, savedLink, saveLink,
} from "../lib/lyrics.js";
import { Phonetic } from "./bits.jsx";
import { course } from "../courses/index.js";

/* ==================================================================
   MÚSICA — écouter une chanson avec les paroles qui défilent et la
   traduction française sous chaque ligne. Deux façons d'écouter :
   la vidéo YouTube dans l'app (synchro exacte), ou la chanson lancée
   ailleurs — Apple Music, Spotify — avec une horloge qu'on démarre en
   même temps et qu'on recale en touchant la ligne chantée.
   ================================================================== */

export function MusicScreen({ onOpenSong }) {
  const songs = course().songs || [];
  return (
    <div className="pb-tabbar">
      <div className="px-4 py-4 border-b border-slate-100 sticky top-0 bg-white z-20 pt-[max(1rem,env(safe-area-inset-top))]">
        <h2 className="font-extrabold text-lg text-slate-800">Música</h2>
        <p className="text-xs text-slate-400 mt-0.5">Les paroles défilent avec la chanson, la traduction en dessous.</p>
      </div>
      <div className="p-4 space-y-3">
        {songs.map((s) => (
          <button key={s.id} onClick={() => { sndWhoosh(); onOpenSong(s.id); }}
            className={`w-full text-left rounded-3xl bg-gradient-to-br ${s.color} p-4 shadow-lg text-white active:translate-y-0.5 transition-transform`}>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 grid place-items-center text-3xl shrink-0">{s.emoji}</div>
              <div className="min-w-0 flex-1">
                <div className="font-extrabold text-lg leading-tight fb-serif">{s.title}</div>
                <div className="text-sm text-white/85">{s.artist} · {s.year}</div>
              </div>
              <Play className="w-7 h-7 shrink-0" />
            </div>
          </button>
        ))}
        {!songs.length && (
          <div className="rounded-3xl border-2 border-dashed border-slate-200 p-6 text-center text-slate-400">
            <Music className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm font-bold">Pas encore de chanson pour {course().langTheFr}.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Le lecteur ------------------------------------------------------ */

function fmt(t) {
  const s = Math.max(0, Math.floor(t));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/* L'horloge du mode « j'écoute ailleurs » : un temps de base et l'instant
   où on l'a lancée. */
function useClock() {
  const [base, setBase] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [, tick] = useState(0);
  useEffect(() => {
    if (startedAt == null) return undefined;
    const h = setInterval(() => tick((n) => n + 1), 200);
    return () => clearInterval(h);
  }, [startedAt]);
  const now = startedAt == null ? base : base + (Date.now() - startedAt) / 1000;
  return {
    time: now,
    playing: startedAt != null,
    play: () => { setStartedAt(Date.now()); },
    pause: () => { setBase(now); setStartedAt(null); },
    seek: (t) => { setBase(Math.max(0, t)); setStartedAt((s) => (s == null ? null : Date.now())); },
  };
}

function SourcePicker({ song, onYoutube, onClock }) {
  const [link, setLink] = useState("");
  const id = youtubeId(link);
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(song.search)}`;
  return (
    <div className="p-4 space-y-3">
      <div className="rounded-2xl border-2 border-slate-100 p-4">
        <div className="flex items-center gap-2 font-extrabold text-slate-800"><Youtube className="w-5 h-5 text-red-500" />Écouter ici, avec YouTube</div>
        <p className="text-xs text-slate-500 mt-1">Synchro parfaite. Trouve la vidéo, copie son lien et colle-le ici.</p>
        <a href={searchUrl} target="_blank" rel="noreferrer"
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-700">
          <Search className="w-4 h-4" />Chercher « {song.title} » sur YouTube
        </a>
        <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Colle le lien de la vidéo"
          inputMode="url" autoCapitalize="off" autoCorrect="off"
          className="mt-2 w-full rounded-xl border-2 border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-sky-400" />
        <button disabled={!id} onClick={() => { sndTap(); onYoutube(id); }}
          className="mt-2 w-full rounded-xl bg-red-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-extrabold py-2.5">
          {link && !id ? "Lien non reconnu" : "Lancer la vidéo"}
        </button>
      </div>
      <button onClick={() => { sndTap(); onClock(); }} className="w-full text-left rounded-2xl border-2 border-slate-100 p-4">
        <div className="flex items-center gap-2 font-extrabold text-slate-800"><Smartphone className="w-5 h-5 text-pink-500" />J'écoute sur Apple Music</div>
        <p className="text-xs text-slate-500 mt-1">
          Lance la chanson dans Apple Music (ou Spotify), puis ▶ ici au même moment.
          Si ça se décale, touche la ligne qu'elle chante : les paroles se recalent.
        </p>
      </button>
    </div>
  );
}

function YouTubeBox({ videoId, onPlayer }) {
  const host = useRef(null);
  useEffect(() => {
    let player = null, alive = true;
    loadYouTubeApi().then((YT) => {
      if (!alive || !host.current) return;
      const el = document.createElement("div");
      host.current.appendChild(el);
      player = new YT.Player(el, {
        videoId, width: "100%", height: "100%",
        playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
        events: { onReady: () => alive && onPlayer(player) },
      });
    }).catch(() => alive && onPlayer(null, true));
    return () => {
      alive = false;
      try { player && player.destroy(); } catch (e) { /* ok */ }
      if (host.current) host.current.innerHTML = "";
      onPlayer(null);
    };
  }, [videoId, onPlayer]);
  return <div ref={host} className="aspect-video w-full bg-black [&>iframe]:w-full [&>iframe]:h-full" />;
}

function WordsSheet({ song, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 pb-safe-6 max-h-sheet overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()} style={{ animation: "fb-up .28s ease-out" }}>
        <div className="flex justify-between items-start">
          <h3 className="font-extrabold text-lg text-slate-800 fb-serif">{song.title}</h3>
          <button onClick={onClose} aria-label="Fermer" className="w-10 h-10 -mr-2 -mt-1 grid place-items-center rounded-xl text-slate-400"><X className="w-5 h-5" /></button>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mt-1">{song.about}</p>
        {song.tip && <p className="mt-3 rounded-2xl bg-amber-50 border border-amber-200 p-3 text-[13px] text-amber-900 leading-snug">💡 {song.tip}</p>}
        <h4 className="mt-4 mb-2 text-xs font-extrabold uppercase tracking-wide text-slate-400">Mots à repérer</h4>
        <ul className="divide-y divide-slate-100">
          {song.words.map((w) => (
            <li key={w.pt} className="flex items-center gap-3 py-2">
              <button onClick={() => speak(w.pt)} aria-label="Écouter" className="w-9 h-9 grid place-items-center rounded-xl bg-sky-500 text-white shrink-0"><Volume2 className="w-4 h-4" /></button>
              <div className="min-w-0">
                <div className="font-bold text-slate-800">{w.pt} <Phonetic text={w.ph} className="text-xs" /></div>
                <div className="text-sm text-slate-500">{w.fr}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SongPlayer({ song, onClose }) {
  const [source, setSource] = useState(() => (savedLink(song.id) ? { kind: "youtube", id: savedLink(song.id) } : null));
  const [player, setPlayer] = useState(null);
  const [ytError, setYtError] = useState(false);
  const [ytTime, setYtTime] = useState(0);
  const [ytPlaying, setYtPlaying] = useState(false);
  const [ytDuration, setYtDuration] = useState(0);
  const clock = useClock();

  const [versions, setVersions] = useState(null);
  const [versionIdx, setVersionIdx] = useState(null);
  const [lyricsError, setLyricsError] = useState(false);
  const [tr, setTr] = useState({});
  const [trFailed, setTrFailed] = useState(0);
  const [trTry, setTrTry] = useState(0);
  const [showTr, setShowTr] = useState(true);
  const [showWords, setShowWords] = useState(false);

  const onPlayer = useCallback((p, err) => { setPlayer(p); if (err) setYtError(true); }, []);

  /* Les paroles synchronisées */
  useEffect(() => {
    let alive = true;
    setLyricsError(false);
    fetchLyricVersions(song).then((v) => { if (alive) setVersions(v); })
      .catch(() => { if (alive) { setVersions([]); setLyricsError(true); } });
    return () => { alive = false; };
  }, [song]);

  const version = versions && (versionIdx != null ? versions[versionIdx] : pickVersion(versions, ytDuration));
  const lines = version ? version.lines : [];

  /* La traduction, ligne par ligne, au fil de l'eau */
  useEffect(() => {
    if (!lines.length) return undefined;
    let alive = true;
    translateLines(lines.map((l) => l.text), {
      from: course().speech.prefix,
      onLine: (s, fr) => alive && setTr((m) => (m[s] ? m : { ...m, [s]: fr })),
    }).then((n) => alive && setTrFailed(n));
    return () => { alive = false; };
  }, [version, trTry]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Le temps de la vidéo */
  useEffect(() => {
    if (!player) return undefined;
    const h = setInterval(() => {
      try {
        setYtTime(player.getCurrentTime() || 0);
        setYtPlaying(player.getPlayerState() === 1);
        const d = player.getDuration();
        if (d) setYtDuration((x) => x || d);
      } catch (e) { /* lecteur détruit */ }
    }, 200);
    return () => clearInterval(h);
  }, [player]);

  const yt = source && source.kind === "youtube";
  const time = yt ? ytTime : clock.time;
  const playing = yt ? ytPlaying : clock.playing;
  const active = lineAt(lines, time);

  function seek(t) {
    if (yt) { try { player && player.seekTo(t, true); player && player.playVideo(); } catch (e) { /* ok */ } }
    else { clock.seek(t); if (!clock.playing) clock.play(); }
  }
  function toggle() {
    sndTap();
    if (yt) { try { ytPlaying ? player.pauseVideo() : player.playVideo(); } catch (e) { /* ok */ } }
    else clock.playing ? clock.pause() : clock.play();
  }

  /* La ligne chantée reste au milieu — sauf si on fait défiler à la main. */
  const scroller = useRef(null);
  const handScroll = useRef(0);
  useEffect(() => {
    const box = scroller.current;
    if (!box || active < 0 || Date.now() - handScroll.current < 4000) return;
    const el = box.querySelector(`[data-line="${active}"]`);
    if (el) box.scrollTo({ top: el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2, behavior: "smooth" });
  }, [active]);
  const markHand = () => { handScroll.current = Date.now(); };

  function chooseYoutube(id) { saveLink(song.id, id); setYtError(false); setSource({ kind: "youtube", id }); }
  function changeSource() {
    sndTap();
    saveLink(song.id, null);
    if (clock.playing) clock.pause();
    clock.seek(0);
    setSource(null); setYtDuration(0); setYtTime(0); setVersionIdx(null);
  }

  return (
    <div className="h-app flex flex-col bg-white">
      {/* En-tête */}
      <div className="px-3 py-2 flex items-center gap-2 border-b border-slate-100 pt-[max(.5rem,env(safe-area-inset-top))]">
        <button onClick={() => { sndTap(); onClose(); }} aria-label="Retour" className="w-10 h-10 grid place-items-center rounded-xl text-slate-500"><ArrowLeft className="w-5 h-5" /></button>
        <div className="min-w-0 flex-1">
          <div className="font-extrabold text-slate-800 truncate leading-tight">{song.title}</div>
          <div className="text-xs text-slate-400 truncate">{song.artist}</div>
        </div>
        <button onClick={() => { sndTap(); setShowTr((v) => !v); }} aria-label="Afficher la traduction" aria-pressed={showTr}
          className={`w-10 h-10 grid place-items-center rounded-xl ${showTr ? "bg-sky-100 text-sky-600" : "text-slate-400"}`}><Languages className="w-5 h-5" /></button>
        <button onClick={() => { sndTap(); setShowWords(true); }} aria-label="Mots de la chanson"
          className="w-10 h-10 grid place-items-center rounded-xl text-slate-500"><BookText className="w-5 h-5" /></button>
      </div>

      {!source && <div className="flex-1 overflow-y-auto"><SourcePicker song={song} onYoutube={chooseYoutube} onClock={() => setSource({ kind: "clock" })} /></div>}

      {source && (
        <>
          {/* Le lecteur */}
          {yt && !ytError && <YouTubeBox videoId={source.id} onPlayer={onPlayer} />}
          {yt && ytError && <p className="p-3 text-sm text-rose-600 bg-rose-50">La vidéo ne se charge pas (pas de réseau ?).</p>}
          <div className="px-4 py-2 flex items-center gap-3 border-b border-slate-100">
            <button onClick={toggle} aria-label={playing ? "Pause" : "Lecture"}
              className={`w-11 h-11 grid place-items-center rounded-full text-white shadow ${course().theme.tabLine}`}>
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <span className="font-mono text-sm text-slate-500 tabular-nums">{fmt(time)}</span>
            {!yt && (
              <div className="flex gap-1">
                <button onClick={() => clock.seek(clock.time - 1)} className="px-2 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-600">−1 s</button>
                <button onClick={() => clock.seek(clock.time + 1)} className="px-2 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-600">+1 s</button>
              </div>
            )}
            <div className="flex-1" />
            {versions && versions.length > 1 && (
              <button onClick={() => { sndTap(); setVersionIdx((i) => ((i ?? versions.indexOf(version)) + 1) % versions.length); }}
                className="text-[11px] font-bold text-slate-400 underline">version {versions.indexOf(version) + 1}/{versions.length}</button>
            )}
            <button onClick={changeSource} aria-label="Changer de source" className="w-9 h-9 grid place-items-center rounded-xl text-slate-400"><RotateCcw className="w-4 h-4" /></button>
          </div>
          {!yt && <p className="px-4 py-1.5 text-[11px] text-slate-400 bg-slate-50">Ça se décale ? Touche la ligne qu'elle chante.</p>}

          {/* Les paroles */}
          <div ref={scroller} onTouchMove={markHand} onWheel={markHand}
            className="relative flex-1 overflow-y-auto overscroll-contain px-5 py-[40vh]">
            {versions == null && <p className="text-center text-slate-400 text-sm">Chargement des paroles…</p>}
            {versions && !lines.length && (
              <p className="text-center text-slate-500 text-sm">
                {lyricsError ? "Impossible de charger les paroles — vérifie ta connexion." : "Pas de paroles synchronisées trouvées pour cette chanson."}
              </p>
            )}
            {lines.map((l, i) => {
              if (!l.text) return <div key={i} data-line={i} className="h-6" />;
              const now = i === active, past = i < active;
              return (
                <button key={i} data-line={i} onClick={() => seek(l.t)}
                  className={`block w-full text-left py-2 transition-all duration-300 ${now ? "scale-[1.02] origin-left" : past ? "opacity-35" : "opacity-60"}`}>
                  <span className={`block fb-serif leading-snug ${now ? "text-[22px] font-extrabold text-slate-900" : "text-[19px] font-bold text-slate-700"}`}>{l.text}</span>
                  {showTr && (
                    <span className={`block mt-0.5 italic leading-snug ${now ? "text-[15px] text-sky-700" : "text-[14px] text-slate-500"}`}>
                      {tr[l.text] || "…"}
                    </span>
                  )}
                </button>
              );
            })}
            {trFailed > 0 && showTr && (
              <button onClick={() => { setTrFailed(0); setTrTry((n) => n + 1); }}
                className="mt-6 mx-auto block text-xs font-bold text-sky-600 underline">
                {trFailed} ligne{trFailed > 1 ? "s" : ""} sans traduction — réessayer
              </button>
            )}
          </div>
        </>
      )}

      {showWords && <WordsSheet song={song} onClose={() => setShowWords(false)} />}
    </div>
  );
}
