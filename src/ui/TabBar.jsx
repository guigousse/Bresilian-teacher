import React from "react";
import { BookOpen, Map, ShoppingBag, User } from "lucide-react";
import { sndTap } from "../lib/audio.js";

/*  NAVIGATION                                                         */
/* ================================================================== */

export function TabBar({ view, setView, cardCount }) {
  const tabs = [
    { id: "path", label: "Parcours", icon: Map },
    { id: "library", label: "Biblioteca", icon: BookOpen },
    { id: "shop", label: "Boutique", icon: ShoppingBag, badge: cardCount },
    { id: "profile", label: "Profil", icon: User },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-md bg-white border-t-2 border-slate-100 flex">
        {tabs.map((t) => {
          const Icon = t.icon, active = view === t.id;
          return (
            <button key={t.id} onClick={() => { sndTap(); setView(t.id); }}
              className={`flex-1 py-3 flex flex-col items-center gap-0.5 relative ${active ? "text-emerald-600" : "text-slate-400"}`}>
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-bold">{t.label}</span>
              {active && <span className="absolute top-0 left-6 right-6 h-1 rounded-full bg-emerald-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

