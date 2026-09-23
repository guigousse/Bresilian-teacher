import React from "react";
import { Lock } from "lucide-react";
import { RARITY } from "../data/cards.js";
import { SceneArt } from "./SceneArt.jsx";

export function Postcard({ card, owned = true, small = false, big = false }) {
  if (!owned) {
    return (
      <div className={`rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 ${small ? "aspect-[4/3]" : "aspect-[3/4]"} grid place-items-center`}>
        <Lock className={small ? "w-5 h-5 text-slate-300" : "w-8 h-8 text-slate-300"} />
      </div>
    );
  }
  const rar = RARITY[card.r];
  return (
    <div className={`rounded-2xl overflow-hidden border-2 ${rar.ring} bg-gradient-to-br ${card.grad} text-white relative flex flex-col ${small ? "" : "shadow-lg"} ${big ? "h-full" : ""}`}>
      <div className="absolute top-1.5 right-1.5 bg-white/85 rounded-md px-1 py-0.5 text-[8px] font-bold text-slate-700 border border-white z-10">BRASIL</div>
      {/* L'illustration porte son propre ciel : le dégradé de la carte ne
          sert plus qu'au bandeau de texte. */}
      {/* Le cadre garde les proportions du dessin : rien n'est rogné. */}
      <div className="relative w-full shrink-0 aspect-[20/13]">
        <SceneArt scene={card.scene} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
      <div className={`${small ? "px-1.5 py-1.5" : "px-3 py-2"} text-center`}>
        <div className={`font-extrabold leading-tight ${small ? "text-[10px]" : "text-lg"}`}>{card.name}</div>
        <div className={`opacity-90 ${small ? "text-[8px]" : "text-xs"}`}>{card.place}</div>
      </div>
      {big && (
        <div className="px-4 pb-2 flex-1 min-h-0 flex items-center justify-center text-center">
          <p className="text-[13px] leading-relaxed text-white/90">{card.note}</p>
        </div>
      )}
      {!small && (
        <div className="bg-white/15 px-4 py-2 text-center mt-auto">
          <div className="font-bold text-sm">{card.pt}</div>
          <div className="text-xs opacity-90">{card.fr}</div>
        </div>
      )}
    </div>
  );
}

