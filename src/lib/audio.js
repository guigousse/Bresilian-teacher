/* ==================================================================
   SONS — tout est synthétisé à la volée (aucun fichier à télécharger,
   l'app reste légère et fonctionne hors ligne), plus un retour
   haptique sur les téléphones qui le permettent.
   ================================================================== */

let audioCtx = null;
let muted = false;
let hapticsOn = true;

export function setAudioPrefs({ sound, haptics }) {
  if (typeof sound === "boolean") muted = !sound;
  if (typeof haptics === "boolean") hapticsOn = haptics;
}

export function getAudioCtx() { return audioCtx; }

function ctx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  audioCtx = audioCtx || new AC();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

/* Une note : forme d'onde, durée, et une petite enveloppe pour que ça
   ne claque pas. */
function note(freq, { at = 0, dur = 0.3, type = "sine", vol = 0.14, glide = 0 } = {}) {
  const c = ctx();
  if (!c || muted) return;
  const o = c.createOscillator(), g = c.createGain();
  o.type = type;
  const t = c.currentTime + at;
  o.frequency.setValueAtTime(freq, t);
  if (glide) o.frequency.exponentialRampToValueAtTime(Math.max(40, glide), t + dur);
  o.connect(g); g.connect(c.destination);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t); o.stop(t + dur + 0.02);
}

export function blip(freqs, type = "sine", vol = 0.14) {
  freqs.forEach((f, i) => note(f, { at: i * 0.08, dur: 0.3, type, vol }));
}

export function buzz(pattern) {
  if (!hapticsOn) return;
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch (e) { /* ok */ }
}

/* --- La palette ---------------------------------------------------- */

export const sndTap = () => { note(440, { dur: 0.06, vol: 0.05 }); buzz(8); };
export const sndSelect = () => note(620, { dur: 0.07, vol: 0.06, type: "triangle" });

/* La bonne réponse monte ; plus la série est longue, plus elle monte haut. */
export function sndGood(combo = 0) {
  const step = Math.min(combo, 6);
  const base = 523 * Math.pow(2 ** (1 / 12), step * 2);
  note(base, { dur: 0.16, type: "triangle", vol: 0.13 });
  note(base * 1.5, { at: 0.07, dur: 0.22, type: "triangle", vol: 0.1 });
  buzz(12);
}

export const sndBad = () => { note(200, { dur: 0.22, type: "sawtooth", vol: 0.08, glide: 120 }); buzz([18, 40, 18]); };
export const sndWin = () => [523, 659, 784, 1046].forEach((f, i) => note(f, { at: i * 0.09, dur: 0.32, type: "triangle", vol: 0.13 }));
export const sndLevel = () => { [523, 659, 784, 1046, 1318].forEach((f, i) => note(f, { at: i * 0.08, dur: 0.4, type: "square", vol: 0.09 })); buzz([20, 60, 20, 60, 40]); };
export const sndCard = () => [392, 523, 659, 880, 1046].forEach((f, i) => note(f, { at: i * 0.07, dur: 0.35, type: "triangle", vol: 0.11 }));
export const sndChest = () => { [330, 494, 659, 988].forEach((f, i) => note(f, { at: i * 0.1, dur: 0.5, type: "sine", vol: 0.12 })); buzz([30, 50, 60]); };
export const sndQuest = () => { [784, 1046].forEach((f, i) => note(f, { at: i * 0.1, dur: 0.3, type: "triangle", vol: 0.12 })); buzz(25); };
export const sndStreak = () => { note(300, { dur: 0.5, type: "sine", vol: 0.1, glide: 900 }); buzz([15, 30, 15]); };
export const sndWhoosh = () => note(900, { dur: 0.25, type: "sine", vol: 0.05, glide: 200 });
export const sndCombo = (n) => { note(660 + n * 60, { dur: 0.12, type: "square", vol: 0.07 }); buzz(10); };
export const sndHeart = () => { note(392, { dur: 0.3, type: "sine", vol: 0.1, glide: 260 }); buzz([12, 30, 12]); };
