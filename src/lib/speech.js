import { defaultPrefs } from "./progress.js";
import { course } from "../courses/index.js";

/* ==================================================================
   VOIX — synthèse vocale dans la langue du cours actif, avec les
   contournements Android.
   ================================================================== */
export let VOICES = [];
let PREFS = defaultPrefs();
let speechPrimed = false;
let speechStatus = "unknown"; /* unknown | ok | novoice | blocked | unsupported */
const speechWatchers = new Set();
export const speechDebug = { attempts: 0, started: 0, errors: 0, lastError: "", lastLang: "", lastVoice: "", primed: false };
const POOR_NAMES = /espeak|compact|eloquence|pico|festival|robot/i;

/* Android renvoie « pt_BR » ou « es_ES » là où la norme veut « pt-BR » :
   Chrome rejette la forme à underscore. */
export function normLang(l) { return (l || "").replace(/_/g, "-"); }

function setSpeechStatus(s) {
  if (speechStatus === s) return;
  speechStatus = s;
  speechWatchers.forEach((fn) => { try { fn(s); } catch (e) { /* ok */ } });
}
export function watchSpeech(fn) { speechWatchers.add(fn); return () => speechWatchers.delete(fn); }
export function getSpeechStatus() { return speechStatus; }

export function voiceScore(v) {
  const name = (v.name || "").toLowerCase();
  const lang = normLang(v.lang).toLowerCase();
  let s = 0;
  const sp = course().speech;
  if (lang.startsWith(sp.region)) s += 100; else if (lang.startsWith(sp.prefix)) s += 55;
  /* Variante voisine (es-MX pour l'Argentine) plutôt que la plus lointaine */
  if (sp.near && sp.near.some((r) => lang.startsWith(r))) s += 30;
  if (sp.nice.some((n) => name.includes(n))) s += 30;
  if (/natural|neural|enhanced|premium|siri/.test(name)) s += 25;
  if (POOR_NAMES.test(name)) s -= 60;
  if (v.localService === false) s += 10;
  return s;
}
/* Les voix de la langue du cours, les meilleures d'abord. */
export function langVoices() {
  const prefix = course().speech.prefix;
  return VOICES.filter((v) => normLang(v.lang).toLowerCase().startsWith(prefix))
    .sort((a, b) => voiceScore(b) - voiceScore(a));
}
export function refreshVoices() {
  try { VOICES = window.speechSynthesis.getVoices() || []; } catch (e) { VOICES = []; }
  if (!VOICES.length || speechStatus === "unsupported") return VOICES; /* liste pas prête : on ne conclut rien */
  /* Un moteur sans voix de la langue lit quand même, mais avec l'accent de la langue du
     téléphone : on garde l'alerte tant que la bonne voix n'est pas installée. */
  if (!langVoices().length) setSpeechStatus("novoice");
  else if (speechStatus === "novoice") setSpeechStatus("unknown");
  return VOICES;
}
/* Sur Android, getVoices() est vide au chargement et « voiceschanged » n'est pas toujours émis. */
export function huntVoices(tries = 16) {
  refreshVoices();
  if (langVoices().length || tries <= 0) return;
  setTimeout(() => huntVoices(tries - 1), 250);
}
function currentVoice() {
  const list = langVoices();
  if (!list.length) return null;
  const uri = voicePref(PREFS);
  if (uri) { const f = list.find((v) => v.voiceURI === uri); if (f) return f; }
  return list[0];
}
/* Réveille le moteur pendant un geste utilisateur, sans rien faire prononcer :
   un énoncé vide ou à volume nul bloque la file d'attente de certains moteurs Android. */
export function primeSpeech() {
  if (speechPrimed) return;
  speechPrimed = true;
  speechDebug.primed = true;
  try {
    const s = window.speechSynthesis;
    if (!s) return;
    s.cancel();
    if (s.paused) s.resume();
    refreshVoices();
  } catch (e) { /* ok */ }
}

export function speak(text, opts = {}) {
  const s = typeof window !== "undefined" ? window.speechSynthesis : null;
  if (!s) { setSpeechStatus("unsupported"); return; }
  try {
    if (!VOICES.length) refreshVoices();
    const v = currentVoice();
    let started = false;

    const utter = (withVoice) => {
      const u = new SpeechSynthesisUtterance(text);
      const fallback = course().speech.lang;
      u.lang = normLang(withVoice && v ? v.lang : fallback) || fallback;
      if (withVoice && v) u.voice = v;
      u.rate = opts.slow ? Math.max(0.5, PREFS.rate - 0.25) : PREFS.rate;
      u.pitch = PREFS.pitch;
      speechDebug.attempts++;
      speechDebug.lastLang = u.lang;
      speechDebug.lastVoice = withVoice && v ? `${v.name} (${v.lang})` : "aucune (langue seule)";
      u.onstart = () => {
        started = true; speechDebug.started++;
        setSpeechStatus(langVoices().length ? "ok" : "novoice");
      };
      u.onerror = (e) => {
        speechDebug.errors++;
        speechDebug.lastError = (e && e.error) || "inconnue";
        /* « language-unavailable » / « voice-unavailable » : les données vocales
           de la langue ne sont pas installées sur l'appareil. */
        if (/language|voice/.test(speechDebug.lastError)) setSpeechStatus("novoice");
        else if (speechDebug.lastError === "not-allowed") setSpeechStatus("blocked");
      };
      return u;
    };
    const fire = (u) => { try { if (s.paused) s.resume(); s.speak(u); } catch (e) { /* ok */ } };

    if (s.speaking || s.pending) {
      /* Android perd l'énoncé si speak() suit cancel() sans laisser respirer le moteur. */
      s.cancel();
      setTimeout(() => fire(utter(true)), 120);
    } else {
      fire(utter(true));
    }

    /* Repli : si rien n'a démarré, on retente avec la langue seule (objet voix périmé,
       moteur endormi), puis on signale l'échec à l'interface. */
    setTimeout(() => {
      if (started || s.speaking) return;
      s.cancel();
      setTimeout(() => { if (!started && !s.speaking) fire(utter(false)); }, 150);
      setTimeout(() => {
        if (started || s.speaking) return;
        setSpeechStatus(langVoices().length ? "blocked" : "novoice");
      }, 1100);
    }, 700);
  } catch (e) { /* pas de voix */ }
}
export function getVoicesList() { return VOICES; }

/* L'app pousse ici les réglages de voix pour que speak() les applique. */
export function setSpeechPrefs(p) { PREFS = p; }

/* La voix choisie se retient par langue ; l'ancien réglage unique
   (voiceURI) était celui du portugais. */
export function voicePref(prefs) {
  const id = course().id;
  if (prefs && prefs.voices && prefs.voices[id]) return prefs.voices[id];
  return id === "pt" && prefs ? prefs.voiceURI : null;
}
export function withVoicePref(prefs, uri) {
  return { ...prefs, voices: { ...(prefs.voices || {}), [course().id]: uri } };
}

/* Au changement de langue, l'état de la voix est à refaire. */
export function resetSpeechForCourse() {
  try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) { /* ok */ }
  speechStatus = "unknown";
  speechWatchers.forEach((fn) => { try { fn("unknown"); } catch (e) { /* ok */ } });
  huntVoices();
}
