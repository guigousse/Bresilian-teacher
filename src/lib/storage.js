import { defaultProgress, migrate } from "./progress.js";

/* ==================================================================
   SAUVEGARDE — localStorage, plus un code de secours transférable.
   ================================================================== */

export const SAVE_KEY = "fala_brasil_save_v2";
export const PREFS_KEY = "fala_brasil_prefs_v2";

/* --- La sauvegarde : localStorage du navigateur.
   Elle survit à la fermeture de l'onglet, au redémarrage du téléphone et
   aux mises à jour du site. Elle ne survit pas à un effacement manuel des
   données du navigateur ni à la navigation privée — d'où le code de
   secours dans le profil, et le repli en mémoire si l'écriture est refusée.
   On n'écrit jamais par-dessus une lecture qui a échoué. --- */
export const storage = {
  ok: false,
  mode: "none", // "navigateur" | "memoire"
  mem: {},
  init() {
    try {
      const probe = "fala_probe";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      const keys = Object.keys(window.localStorage).filter((k) => k.indexOf("fala_") === 0);
      this.ok = true; this.mode = "navigateur";
      return { keys };
    } catch (e) { /* navigation privée ou stockage refusé */ }
    this.ok = true; this.mode = "memoire"; this.mem = {};
    return { keys: [] };
  },
  read(key) {
    try {
      if (this.mode === "navigateur") {
        const v = window.localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
      }
      return this.mem[key] || null;
    } catch (e) { return null; }
  },
  write(key, value) {
    try {
      if (this.mode === "navigateur") { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
      this.mem[key] = value; return true;
    } catch (e) { return false; }
  },
  label() {
    return this.mode === "navigateur" ? "mémoire du navigateur" : "mémoire temporaire";
  },
};

/* Code de sauvegarde à copier-coller, pour ne rien perdre entre deux versions */
export function encodeSave(p) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(p)))); } catch (e) { return ""; }
}
export function decodeSave(code) {
  try {
    const obj = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (typeof obj !== "object" || obj === null || typeof obj.xp !== "number") return null;
    return migrate({ ...defaultProgress(), ...obj });
  } catch (e) { return null; }
}
