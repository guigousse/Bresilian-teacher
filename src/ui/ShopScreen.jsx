import React, { useState } from "react";
import { ExternalLink, Gem, Package, RotateCcw, Snowflake, Sparkles, Volume2 } from "lucide-react";
import { CARDS, CARD_PRICE, RARITY } from "../data/cards.js";
import { LEVEL_GEMS } from "../lib/levels.js";
import { FREEZE_PRICE, MAX_FREEZES } from "../lib/progress.js";
import { speak } from "../lib/speech.js";
import { sndTap } from "../lib/audio.js";
import { Confetti, StatPill } from "./bits.jsx";
import { Postcard } from "./cards.jsx";

/*  ÉCRAN : BOUTIQUE                                                   */
/* ================================================================== */

export function ShopScreen({ progress, onBuy, onBuyFreeze, onOpenCard }) {
  const owned = progress.cards || [];
  const remaining = CARDS.length - owned.length;
  const canBuy = progress.gems >= CARD_PRICE && remaining > 0;

  return (
    <div className="pb-28">
      <div className="px-4 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white z-20">
        <h2 className="font-extrabold text-lg text-slate-800">Loja · Boutique</h2>
        <StatPill icon={<Gem className="w-4 h-4 text-sky-500" />} value={progress.gems} tone="bg-sky-50 text-sky-700" />
      </div>

      <div className="px-4 pt-5">
        <div className="rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white p-5 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-6 text-8xl opacity-20">💌</div>
          <div className="flex items-center gap-2 text-xs font-bold bg-white/25 rounded-full px-3 py-1 w-fit">
            <Sparkles className="w-3.5 h-3.5" /> Carte mystère
          </div>
          <h3 className="text-2xl font-extrabold mt-3 leading-tight">Une carte postale<br />tirée au hasard</h3>
          <p className="text-sm text-white/90 mt-2">
            20 lieux du Brésil à collectionner, chacun avec une phrase à glisser dans une conversation.
            {remaining > 0 ? ` Il t'en manque ${remaining}.` : " Album complet !"}
          </p>
          <button disabled={!canBuy} onClick={() => onBuy()}
            className={`w-full mt-4 rounded-2xl py-4 font-extrabold border-b-4 transition-all
              ${canBuy ? "bg-white text-orange-600 border-orange-200 active:border-b-0 active:translate-y-1" : "bg-white/40 text-white/70 border-white/20"}`}>
            {remaining === 0 ? "Tout est collectionné" : `Ouvrir une carte — ${CARD_PRICE} gemmes`}
          </button>
          {!canBuy && remaining > 0 && (
            <p className="text-xs text-white/90 mt-2 text-center">
              Il te manque {CARD_PRICE - progress.gems} gemmes. Une leçon en rapporte 5 à 15, un passage de niveau {LEVEL_GEMS}.
            </p>
          )}
        </div>

        <div className="mt-5 rounded-2xl border-2 border-sky-200 bg-sky-50 p-4 flex items-center gap-3">
          <Snowflake className="w-8 h-8 text-sky-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-slate-800">Gel de série</div>
            <div className="text-xs text-slate-500">
              Protège ta série un jour sans révision. {progress.freezes || 0}/{MAX_FREEZES} en réserve.
            </div>
          </div>
          <button disabled={progress.gems < FREEZE_PRICE || (progress.freezes || 0) >= MAX_FREEZES}
            onClick={() => onBuyFreeze(FREEZE_PRICE)}
            className={`rounded-xl px-3 py-2 text-sm font-extrabold border-b-4 shrink-0 transition-all
              ${progress.gems >= FREEZE_PRICE && (progress.freezes || 0) < MAX_FREEZES
                ? "bg-sky-500 text-white border-sky-700 active:border-b-0 active:translate-y-1"
                : "bg-slate-200 text-slate-400 border-slate-300"}`}>
            {FREEZE_PRICE} 💎
          </button>
        </div>

        <div className="flex items-center justify-between mt-7 mb-3">
          <h3 className="font-extrabold text-slate-800 flex items-center gap-2"><Package className="w-5 h-5 text-slate-400" /> Mon album</h3>
          <span className="text-sm font-bold text-slate-400 tabular-nums">{owned.length}/{CARDS.length}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CARDS.map((c, i) => {
            const isOwned = owned.includes(c.id);
            return (
              <button key={c.id} type="button" disabled={!isOwned}
                onClick={() => { sndTap(); onOpenCard(c, i); }}
                className={`text-left rounded-2xl ${isOwned ? "active:scale-95 transition-transform" : "cursor-default"}`}>
                <Postcard card={c} owned={isOwned} small />
              </button>
            );
          })}
        </div>
        {owned.length > 0 && (
          <p className="text-xs text-slate-400 text-center mt-4">Touche une carte pour la voir en grand et la retourner.</p>
        )}
      </div>
    </div>
  );
}

export function CardBack({ card, index, onFlipBack }) {
  const rar = RARITY[card.r];
  return (
    <div className={`rounded-2xl overflow-hidden border-2 ${rar.ring} bg-white h-full flex flex-col shadow-lg`}>
      <div className="px-4 pt-3 pb-2 border-b border-slate-100 shrink-0">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${rar.chip}`}>{rar.label}</span>
          <div className="flex items-center gap-2">
            {index != null && <span className="text-[10px] font-bold text-slate-400 tabular-nums">Nº {index + 1}/{CARDS.length}</span>}
            {onFlipBack && (
              <button onClick={(e) => { e.stopPropagation(); onFlipBack(); }} aria-label="Revenir au recto"
                className="w-7 h-7 grid place-items-center rounded-lg bg-slate-100 text-slate-500"><RotateCcw className="w-3.5 h-3.5" /></button>
            )}
          </div>
        </div>
        <div className="mt-1.5 font-extrabold text-lg text-slate-800 leading-tight">{card.name}</div>
        <div className="text-xs text-slate-500">{card.place}, Brasil</div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3" onClick={(e) => e.stopPropagation()}>
        <p className="text-[13px] text-slate-500 italic leading-relaxed">{card.note}</p>

        {card.numbers && card.numbers.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5">
            {card.numbers.map((n, i) => (
              <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 px-2 py-1.5">
                <div className="text-[13px] font-extrabold text-slate-800 leading-tight">{n.v}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{n.k}</div>
              </div>
            ))}
          </div>
        )}
        {card.history && (
          <section>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 mb-1">Histoire</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">{card.history}</p>
          </section>
        )}
        {card.culture && (
          <section>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-fuchsia-600 mb-1">Culture</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">{card.culture}</p>
          </section>
        )}
        {card.facts && card.facts.length > 0 && (
          <section>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 mb-1">À savoir</h4>
            <ul className="space-y-1">
              {card.facts.map((f, i) => (
                <li key={i} className="text-[13px] text-slate-600 leading-relaxed flex gap-2">
                  <span className="text-emerald-400 shrink-0">•</span><span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
        {card.visit && (
          <section>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600 mb-1">Si tu y vas</h4>
            <p className="text-[13px] text-slate-600 leading-relaxed">{card.visit}</p>
          </section>
        )}
        {card.links && card.links.length > 0 && (
          <section>
            <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Pour aller plus loin</h4>
            <div className="flex flex-wrap gap-1.5">
              {card.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-xl border-2 border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 active:translate-y-0.5">
                  {l.label} <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">Ces liens ouvrent le navigateur : il faut une connexion.</p>
          </section>
        )}
      </div>

      <button onClick={(e) => { e.stopPropagation(); speak(card.pt); }}
        className="m-3 mt-0 flex items-center gap-2 rounded-2xl bg-sky-50 px-3 py-2 text-left shrink-0">
        <span className="w-8 h-8 rounded-xl bg-sky-500 text-white grid place-items-center shrink-0"><Volume2 className="w-4 h-4" /></span>
        <span className="min-w-0">
          <span className="block font-bold text-slate-800 text-sm truncate">{card.pt}</span>
          <span className="block text-xs text-slate-400 truncate">{card.fr}</span>
        </span>
      </button>
    </div>
  );
}

export function CardModal({ card, index, owned = true, revealMode = false, onClose }) {
  const [flipped, setFlipped] = useState(false);
  if (!card) return null;
  const rar = RARITY[card.r];
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 grid place-items-center px-6" onClick={onClose}>
      {revealMode && <Confetti />}
      <div className="w-full max-w-xs" onClick={(e) => e.stopPropagation()}
        style={revealMode ? { animation: "fb-pop .5s ease-out" } : undefined}>
        {revealMode && (
          <div className={`text-center text-xs font-bold rounded-full px-3 py-1 w-fit mx-auto mb-3 ${rar.chip}`}>{rar.label}</div>
        )}
        <div className="fb-flip-outer" style={{ height: "min(66vh, 480px)" }}>
          <div className={`fb-flip-inner h-full ${flipped ? "flipped" : ""}`}>
            <div className="fb-flip-face h-full" style={{ pointerEvents: flipped ? "none" : "auto" }}
              onClick={() => { sndTap(); setFlipped(true); }}>
              <Postcard card={card} owned={owned} big />
            </div>
            <div className="fb-flip-face fb-flip-back h-full" style={{ pointerEvents: flipped ? "auto" : "none" }}>
              <CardBack card={card} index={index} onFlipBack={() => { sndTap(); setFlipped(false); }} />
            </div>
          </div>
        </div>
        <p className="text-white/70 text-xs text-center mt-3">
          {flipped ? "Fais défiler pour tout lire · ↺ pour revenir au recto" : "Touche la carte pour la retourner"}
        </p>
        <button onClick={onClose}
          className="w-full mt-3 rounded-2xl bg-white text-slate-800 font-extrabold py-4 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
          {revealMode ? "Ajouter à l'album" : "Fermer"}
        </button>
      </div>
    </div>
  );
}

