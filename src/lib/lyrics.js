/* ==================================================================
   PAROLES — paroles synchronisées (LRCLIB) et traduction ligne par
   ligne (MyMemory). Deux services gratuits, sans clé ni compte : l'app
   reste sans serveur. Tout ce qui a été chargé se garde dans le
   navigateur, pour que la chanson se relance sans réseau.
   ================================================================== */

const LYRICS_KEY = (id) => `fala_song_${id}`;
const TR_KEY = (pair) => `fala_tr_${pair}`;

function readLS(key) {
  try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; }
}
function writeLS(key, value) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* plein ou refusé : tant pis */ }
}

/* « [01:23.45] texte » → { t: 83.45, text } ; les lignes vides (pauses
   instrumentales) restent, pour que la ligne d'avant s'éteigne. */
export function parseLrc(lrc) {
  const out = [];
  for (const raw of (lrc || "").split(/\r?\n/)) {
    const stamps = [...raw.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)];
    if (!stamps.length) continue;
    const text = raw.replace(/\[[^\]]*\]/g, "").trim();
    for (const m of stamps) out.push({ t: Number(m[1]) * 60 + Number(m[2]), text });
  }
  return out.sort((a, b) => a.t - b.t);
}

/* Toutes les versions synchronisées que LRCLIB connaît pour la chanson :
   on choisit ensuite celle dont la durée colle au lecteur. */
export async function fetchLyricVersions(song) {
  const cached = readLS(LYRICS_KEY(song.id));
  if (cached && cached.length) return cached;
  const q = new URLSearchParams({ track_name: song.lrclib.track, artist_name: song.lrclib.artist });
  const res = await fetch(`https://lrclib.net/api/search?${q}`);
  if (!res.ok) throw new Error(`lrclib ${res.status}`);
  const list = await res.json();
  const versions = list
    .filter((x) => x.syncedLyrics)
    .map((x) => ({ id: x.id, duration: x.duration, album: x.albumName, lines: parseLrc(x.syncedLyrics) }))
    .filter((v) => v.lines.length > 3);
  if (versions.length) writeLS(LYRICS_KEY(song.id), versions);
  return versions;
}

/* La version la plus proche de la durée connue (celle de la vidéo), sinon la première. */
export function pickVersion(versions, duration) {
  if (!versions.length) return null;
  if (!duration) return versions[0];
  return [...versions].sort((a, b) => Math.abs(a.duration - duration) - Math.abs(b.duration - duration))[0];
}

/* L'indice de la ligne qu'on chante à l'instant t. */
export function lineAt(lines, t) {
  let i = -1;
  for (let k = 0; k < lines.length; k++) { if (lines[k].t <= t + 0.15) i = k; else break; }
  return i;
}

/* --- Traduction ---------------------------------------------------- */

async function translateOne(text, from, to) {
  const q = new URLSearchParams({ q: text, langpair: `${from}|${to}` });
  const res = await fetch(`https://api.mymemory.translated.net/get?${q}`);
  if (!res.ok) throw new Error(`mymemory ${res.status}`);
  const data = await res.json();
  const out = data && data.responseData && data.responseData.translatedText;
  /* Quota dépassé ou erreur : MyMemory répond 200 avec un message en majuscules. */
  if (!out || Number(data.responseStatus) !== 200 || /MYMEMORY WARNING|QUERY LENGTH LIMIT/i.test(out)) {
    throw new Error("mymemory refused");
  }
  return out;
}

/* Traduit les lignes uniques (le refrain ne coûte qu'une fois) et
   rappelle onLine à chaque ligne prête, pour que l'écran se remplisse
   au fil de l'eau. Renvoie le nombre de lignes restées sans traduction. */
export async function translateLines(texts, { from, to = "fr", onLine } = {}) {
  const pair = `${from}_${to}`;
  const memo = readLS(TR_KEY(pair)) || {};
  const todo = [];
  for (const s of new Set(texts.filter(Boolean))) {
    if (memo[s]) onLine && onLine(s, memo[s]);
    else todo.push(s);
  }
  let failed = 0;
  let next = 0;
  async function worker() {
    while (next < todo.length) {
      const s = todo[next++];
      try {
        memo[s] = await translateOne(s, from, to);
        writeLS(TR_KEY(pair), memo);
        onLine && onLine(s, memo[s]);
      } catch (e) { failed++; }
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  return failed;
}

/* --- YouTube -------------------------------------------------------- */

/* Accepte un lien youtu.be, youtube.com/watch?v=, /shorts/, /embed/ ou l'identifiant seul. */
export function youtubeId(input) {
  const s = (input || "").trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/);
  return m ? m[1] : null;
}

let ytReady = null;
export function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytReady) return ytReady;
  ytReady = new Promise((resolve, reject) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(window.YT); };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.onerror = () => { ytReady = null; reject(new Error("youtube api")); };
    document.head.appendChild(tag);
  });
  return ytReady;
}

const LINK_KEY = "fala_song_links";
export function savedLink(songId) { return (readLS(LINK_KEY) || {})[songId] || null; }
export function saveLink(songId, id) {
  const all = readLS(LINK_KEY) || {};
  if (id) all[songId] = id; else delete all[songId];
  writeLS(LINK_KEY, all);
}
