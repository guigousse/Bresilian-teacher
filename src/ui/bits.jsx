import React, { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";
import { speak } from "../lib/speech.js";

/* ================================================================== */
/*  PETITS COMPOSANTS                                                  */
/* ================================================================== */

export function Phonetic({ text, className = "" }) {
  if (!text) return null;
  return <span className={`font-mono text-sky-600 ${className}`}>[{text}]</span>;
}

export function Confetti() {
  const bits = Array.from({ length: 44 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 1.4, dur: 2 + Math.random() * 1.8,
    size: 6 + Math.random() * 10, rot: Math.random() * 360,
    color: ["#009B3A", "#FEDF00", "#002776", "#FF5C8A", "#00C2CB", "#FF8A00"][i % 6],
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {bits.map((b, i) => (
        <span key={i} className="absolute block rounded-sm" style={{
          left: `${b.left}%`, top: "-20px", width: b.size, height: b.size * 0.6,
          background: b.color, transform: `rotate(${b.rot}deg)`,
          animation: `fb-fall ${b.dur}s linear ${b.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}

export function StatPill({ icon, value, tone }) {
  return <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${tone}`}>{icon}<span className="text-sm font-bold tabular-nums">{value}</span></div>;
}

/* Vrai quand l'écran est peu haut (petit téléphone, iPhone avec les
   barres de Safari, paysage) : de quoi réduire les illustrations. */
export function useShortScreen(limit = 700) {
  const query = `(max-height: ${limit}px)`;
  const get = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia(query).matches;
  const [short, setShort] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query);
    const on = () => setShort(mq.matches);
    mq.addEventListener ? mq.addEventListener("change", on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener("change", on) : mq.removeListener(on));
  }, [query]);
  return short;
}

/* Hauteur du clavier qui recouvre l'écran (iPhone) quand un champ est
   actif : on s'en sert pour remonter les fiches posées en bas. Sur
   Android la page se réduit d'elle-même et la valeur reste à 0. */
export function useKeyboardInset() {
  const [inset, setInset] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return undefined;
    const on = () => {
      const el = document.activeElement;
      const typing = el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA");
      setInset(typing ? Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop)) : 0);
    };
    vv.addEventListener("resize", on);
    vv.addEventListener("scroll", on);
    window.addEventListener("focusin", on);
    window.addEventListener("focusout", on);
    on();
    return () => {
      vv.removeEventListener("resize", on);
      vv.removeEventListener("scroll", on);
      window.removeEventListener("focusin", on);
      window.removeEventListener("focusout", on);
    };
  }, []);
  return inset;
}

export function SpeakButton({ text, big }) {
  return (
    <button onClick={() => speak(text)} onDoubleClick={() => speak(text, { slow: true })} aria-label="Écouter"
      className={`shrink-0 grid place-items-center rounded-2xl bg-sky-500 text-white shadow-md border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 transition-all ${big ? "w-20 h-20 short:w-16 short:h-16" : "w-11 h-11"}`}>
      <Volume2 className={big ? "w-9 h-9" : "w-5 h-5"} />
    </button>
  );
}
