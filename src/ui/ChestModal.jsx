import React, { useState, useEffect } from "react";
import { Confetti } from "./bits.jsx";

/* Le coffre du jour : il tremble, s'ouvre, laisse sortir la récompense. */
export function ChestModal({ reward, onClose }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOpen(true), 550); return () => clearTimeout(t); }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 grid place-items-center px-6">
      {open && <Confetti />}
      <div className="w-full max-w-xs text-center">
        <div className={`text-7xl ${open ? "fb-burst" : "fb-chest"}`}>{open ? "🎉" : "🎁"}</div>
        {open ? (
          <div className="fb-slide-in">
            <h3 className="text-white text-2xl font-extrabold mt-3">{reward.label}</h3>
            <p className="text-white/80 text-sm mt-1">
              {reward.kind === "freeze"
                ? "Un gel protège ta série le jour où tu ne peux pas jouer."
                : "Objectif du jour atteint — à demain pour le prochain coffre."}
            </p>
            <button onClick={onClose}
              className="w-full mt-6 rounded-2xl bg-white text-slate-800 font-extrabold py-4 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
              Merci !
            </button>
          </div>
        ) : (
          <p className="text-white/70 text-sm mt-4">Ouverture du coffre…</p>
        )}
      </div>
    </div>
  );
}
