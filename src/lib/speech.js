import { defaultPrefs } from "./progress.js";

/* ==================================================================
   VOIX — synthèse vocale portugaise, avec les contournements Android.
   ================================================================== */
export let VOICES = [];
let PREFS = defaultPrefs();
let speechPrimed = false;
let speechStatus = "unknown"; /* unknown | ok | novoice | blocked | unsupported */
const speechWatchers = new Set();
export const speechDebug = { attempts: 0, started: 0, errors: 0, lastError: "", lastLang: "", lastVoice: "", primed: false };
const NICE_NAMES = ["luciana", "google português", "google portugues", "francisca", "brenda", "camila", "fernanda",
  "joana", "raquel", "maria", "ricardo", "felipe", "daniel", "antônio", "antonio"];
const POOR_NAMES = /espeak|compact|eloquence|pico|festival|robot/i;

/* Android renvoie « pt_BR » là où la norme veut « pt-BR » : Chrome rejette la forme à underscore. */
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
  if (lang.startsWith("pt-br")) s += 100; else if (lang.startsWith("pt")) s += 55;
  if (NICE_NAMES.some((n) => name.includes(n))) s += 30;
  if (/natural|neural|enhanced|premium|siri/.test(name)) s += 25;
  if (POOR_NAMES.test(name)) s -= 60;
  if (v.localService === false) s += 10;
  return s;
}
export function ptVoices() {
  return VOICES.filter((v) => normLang(v.lang).toLowerCase().startsWith("pt"))
    .sort((a, b) => voiceScore(b) - voiceScore(a));
}
export function refreshVoices() {
  try { VOICES = window.speechSynthesis.getVoices() || []; } catch (e) { VOICES = []; }
  if (!VOICES.length || speechStatus === "unsupported") return VOICES; /* liste pas prête : on ne conclut rien */
  /* Un moteur sans voix portugaise lit quand même, mais avec l'accent de la langue du téléphone :
     on garde l'alerte tant que la voix pt n'est pas installée. */
  if (!ptVoices().length) setSpeechStatus("novoice");
  else if (speechStatus === "novoice") setSpeechStatus("unknown");
  return VOICES;
}
/* Sur Android, getVoices() est vide au chargement et « voiceschanged » n'est pas toujours émis. */
export function huntVoices(tries = 16) {
  refreshVoices();
  if (ptVoices().length || tries <= 0) return;
  setTimeout(() => huntVoices(tries - 1), 250);
}
function currentVoice() {
  const list = ptVoices();
  if (!list.length) return null;
  if (PREFS.voiceURI) { const f = list.find((v) => v.voiceURI === PREFS.voiceURI); if (f) return f; }
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
      u.lang = normLang(withVoice && v ? v.lang : "pt-BR") || "pt-BR";
      if (withVoice && v) u.voice = v;
      u.rate = opts.slow ? Math.max(0.5, PREFS.rate - 0.25) : PREFS.rate;
      u.pitch = PREFS.pitch;
      speechDebug.attempts++;
      speechDebug.lastLang = u.lang;
      speechDebug.lastVoice = withVoice && v ? `${v.name} (${v.lang})` : "aucune (langue seule)";
      u.onstart = () => {
        started = true; speechDebug.started++;
        setSpeechStatus(ptVoices().length ? "ok" : "novoice");
      };
      u.onerror = (e) => {
        speechDebug.errors++;
        speechDebug.lastError = (e && e.error) || "inconnue";
        /* « language-unavailable » / « voice-unavailable » : les données vocales
           portugaises ne sont pas installées sur l'appareil. */
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
        setSpeechStatus(ptVoices().length ? "blocked" : "novoice");
      }, 1100);
    }, 700);
  } catch (e) { /* pas de voix */ }
}
export function getVoicesList() { return VOICES; }

/* L'app pousse ici les réglages de voix pour que speak() les applique. */
export function setSpeechPrefs(p) { PREFS = p; }
