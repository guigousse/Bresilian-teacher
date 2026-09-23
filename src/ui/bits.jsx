import React from "react";
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

export function SpeakButton({ text, big }) {
  return (
    <button onClick={() => speak(text)} onDoubleClick={() => speak(text, { slow: true })} aria-label="Écouter"
      className={`shrink-0 grid place-items-center rounded-2xl bg-sky-500 text-white shadow-md border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 transition-all ${big ? "w-20 h-20" : "w-11 h-11"}`}>
      <Volume2 className={big ? "w-9 h-9" : "w-5 h-5"} />
    </button>
  );
}
