import React, { useState, useEffect } from "react";
import { BookOpen, Lock, Sparkles } from "lucide-react";
import { UNITS } from "../data/units.js";
import { BOOKS } from "../data/stories.js";
import { storyProgress, bookDone, bookPagesDone, bookScore } from "../lib/progress.js";
import { sndTap, sndCard, sndWhoosh } from "../lib/audio.js";
import { Confetti } from "./bits.jsx";
import { SouvenirArt, PaperSlip } from "./SouvenirArt.jsx";
import { SOUVENIRS, PAPERS } from "../data/souvenirs.js";

/* ==================================================================
   LA BIBLIOTHÈQUE — une étagère en bois où l'histoire de Léa se range
   livre après livre. Un livre par thématique, quatre pages chacun : il
   faut les quatre pour le refermer et le voir sur la tranche.
   ================================================================== */

/* La tranche d'un livre : toile teintée, filets dorés, titre à la
   verticale, et un sceau quand le livre a été fait sans faute. */
export function BookSpine({ book, height = 120, width = 38, tilt = 0, ribbon = false, seal = false, className = "", delay = 0, onClick }) {
  const inner = (
    <>
      <span className="absolute inset-0 fb-cloth" />
      <span className="absolute inset-y-0 left-0 w-[3px] bg-black/30" />
      <span className="absolute inset-y-0 right-0 w-[2px] bg-white/25" />
      <span className="absolute inset-x-[3px] top-2.5 h-[3px] bg-amber-200/70" />
      <span className="absolute inset-x-[3px] top-[15px] h-[1.5px] bg-amber-200/45" />
      <span className="absolute inset-x-[3px] bottom-[26px] h-[3px] bg-amber-200/70" />
      <span className="absolute inset-0 flex items-center justify-center px-0.5 pb-5">
        <span className="text-white text-[9px] font-extrabold tracking-tight whitespace-nowrap drop-shadow fb-serif"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>{book.title}</span>
      </span>
      <span className="absolute bottom-2 inset-x-0 text-center text-amber-100/90 text-[8px] font-bold tabular-nums">{book.number}</span>
      {seal && (
        <span className="absolute top-[26px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-300 border border-amber-500 grid place-items-center text-[7px]">★</span>
      )}
    </>
  );
  const cls = `relative shrink-0 rounded-[2px] bg-gradient-to-b ${book.color} shadow-[2px_2px_7px_rgba(0,0,0,.45)] ${className}`;
  const style = { height, width, transform: tilt ? `rotate(${tilt}deg)` : undefined, transformOrigin: "bottom right", animationDelay: delay ? `${delay}ms` : undefined };
  if (!onClick) return <div className={cls} style={style}><span className="absolute inset-0 overflow-hidden rounded-[2px]">{inner}</span></div>;
  return (
    <button type="button" onClick={onClick} style={style}
      className={`${cls} transition-transform duration-200 hover:-translate-y-1 active:-translate-y-2`}>
      <span className="absolute inset-0 overflow-hidden rounded-[2px]">{inner}</span>
      {ribbon && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-4 bg-red-500 rounded-b-sm shadow" />}
    </button>
  );
}

/* Une petite plante, pour que l'étagère ne soit pas qu'un casier. */
function Plant() {
  return (
    <svg width="28" height="38" viewBox="0 0 26 34" className="shrink-0">
      <path d="M13 22 q-9 -6 -9 -16 q9 2 9 16 Z" fill="#2f8a52" />
      <path d="M13 22 q9 -5 10 -15 q-9 1 -10 15 Z" fill="#37a05f" />
      <path d="M13 22 q-2 -12 2 -19 q3 9 -2 19 Z" fill="#1f7a48" />
      <path d="M6 22 h14 l-2 10 h-10 Z" fill="#c2703c" />
      <path d="M6 22 h14 l-.6 3 h-12.8 Z" fill="#e08b52" />
    </svg>
  );
}

function Shelf({ items, offset = 0, onOpenBook }) {
  return (
    <div>
      <div className="flex items-end justify-start gap-2 h-[144px] px-3">
        {items.map((entry, i) => {
          if (entry.kind === "plant") return <Plant key={`p${i}`} />;
          const { book, done, pages, score, unlocked } = entry;
          if (!unlocked) {
            return <div key={book.id} className="w-[34px] h-[86px] rounded-[2px] border-2 border-dashed border-amber-700/40 grid place-items-center">
              <Lock className="w-3.5 h-3.5 text-amber-700/40" />
            </div>;
          }
          return (
            <BookSpine key={book.id} book={book}
              className="fb-spine-in" delay={(offset + i) * 80}
              height={done ? 120 + (book.number % 3) * 8 : 108}
              width={done ? 38 : 34}
              tilt={!done && pages > 0 ? -6 : 0}
              ribbon={!done}
              seal={score.perfect}
              onClick={() => { sndTap(); onOpenBook(book.id); }} />
          );
        })}
      </div>
      <div className="h-3.5 rounded-[2px] fb-wood-light shadow-[0_3px_6px_rgba(0,0,0,.45)]" />
    </div>
  );
}

export function LibraryScreen({ progress, onOpenBook, onOpenMemories }) {
  const entries = BOOKS.map((book) => ({
    kind: "book", book,
    done: bookDone(progress, book),
    pages: bookPagesDone(progress, book),
    score: bookScore(progress, book),
    /* Un livre apparaît dès que sa première leçon est faite. */
    unlocked: !!(progress.lessons[book.chapters[0]] || {}).done,
  }));
  const shelved = entries.filter((e) => e.done).length;
  const reading = entries.find((e) => e.unlocked && !e.done);

  const rows = [entries.slice(0, 3), [...entries.slice(3, 5), { kind: "plant" }]];

  return (
    <div className="pb-28">
      <div className="px-4 py-4 border-b border-slate-100 sticky top-0 bg-white z-20">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-lg text-slate-800">Biblioteca</h2>
          <span className="text-sm font-bold text-slate-400 tabular-nums">{shelved}/{BOOKS.length}</span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">Une seule histoire, cinq livres. Chaque chapitre terminé ouvre une page de son livre.</p>
      </div>

      {/* Le livre en cours, posé de face */}
      {reading && (
        <div className="px-4 pt-5">
          <button onClick={() => { sndWhoosh(); onOpenBook(reading.book.id); }}
            className="w-full text-left rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900 p-4 shadow-lg active:translate-y-0.5 transition-transform">
            <div className="flex gap-4">
              <div className={`relative w-[80px] h-[108px] shrink-0 rounded-r-lg rounded-l-sm bg-gradient-to-br ${reading.book.color} shadow-[4px_4px_10px_rgba(0,0,0,.5)] overflow-hidden`}>
                <span className="absolute inset-y-0 left-0 w-2 bg-black/30" />
                <span className="absolute inset-x-2 top-3 h-[2px] bg-white/40" />
                <span className="absolute inset-0 grid place-items-center text-3xl pt-2">{reading.book.emoji}</span>
                <span className="absolute bottom-1.5 inset-x-1 text-center text-[8px] font-extrabold text-white/90 leading-tight">{reading.book.title}</span>
                <span className="absolute -bottom-1 right-3 w-2.5 h-5 bg-red-500 rounded-b-sm" />
              </div>
              <div className="flex-1 min-w-0 text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300">En cours de lecture</div>
                <div className="font-extrabold leading-tight mt-0.5">{reading.book.title}</div>
                <div className="text-xs text-white/70 mt-1 tabular-nums">
                  {reading.pages}/{reading.book.pages.length} pages ouvertes
                </div>
                <div className="flex gap-1 mt-2">
                  {reading.book.pages.map((pg) => (
                    <div key={pg.id} className={`h-1.5 flex-1 rounded-full ${storyProgress(progress, pg.unit).done ? "bg-amber-400" : "bg-white/20"}`} />
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 mt-3 rounded-xl bg-white text-stone-800 font-extrabold text-xs px-3 py-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> {reading.pages ? "Reprendre" : "Commencer"}
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* L'étagère */}
      <div className="px-4 pt-5">
        <div className="rounded-2xl bg-gradient-to-b from-amber-900 to-amber-950 p-2.5 shadow-xl border-4 border-amber-950/60">
          <div className="rounded-lg bg-[#3a1f0b] p-1.5 space-y-2 shadow-inner">
            {rows.map((row, i) => <Shelf key={i} items={row} offset={i * 3} onOpenBook={onOpenBook} />)}
          </div>
        </div>
        <p className="text-xs text-slate-400 text-center mt-2">
          {shelved === 0 ? "Aucun livre rangé pour l'instant : il en faut les quatre pages."
            : "Touche une tranche pour rouvrir un livre — le signet rouge marque celui en cours."}
        </p>
      </div>

      {/* La boîte à souvenirs, posée à côté de l'étagère */}
      <div className="px-4 pt-6">
        <button onClick={() => { sndTap(); onOpenMemories(); }}
          className="w-full text-left rounded-3xl p-2 shadow-lg fb-wood active:translate-y-0.5 transition-transform">
          <div className="rounded-2xl bg-gradient-to-b from-[#4a1f2a] to-[#2e1219] p-3 flex items-center gap-3">
            <div className="relative w-16 h-14 shrink-0">
              <div className="absolute left-0 top-1 w-11 h-11 rotate-[-8deg]">
                {(progress.souvenirs || []).length
                  ? <SouvenirArt kind={(SOUVENIRS.find((x) => x.id === progress.souvenirs[progress.souvenirs.length - 1]) || {}).kind} />
                  : <div className="w-full h-full rounded-lg border-2 border-dashed border-white/20" />}
              </div>
              <div className="absolute right-0 bottom-0 w-10 rotate-[7deg]">
                <PaperSlip text={(PAPERS.find((x) => x.id === (progress.papers || [])[0]) || {}).pt} blank={!(progress.papers || []).length} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-amber-100 fb-serif">Caixa de lembranças</div>
              <div className="text-xs text-amber-200/70 tabular-nums mt-0.5">
                {(progress.souvenirs || []).length}/{SOUVENIRS.length} souvenirs · {(progress.papers || []).length}/{PAPERS.length} petits papiers
              </div>
              <div className="text-[11px] text-white/40 mt-0.5">Ce qu'on trouve dans les coffres.</div>
            </div>
          </div>
        </button>
      </div>

      {/* Ce qui attend derrière */}
      {entries.some((e) => !e.unlocked) && (
        <div className="px-4 pt-6">
          <h3 className="font-extrabold text-slate-800 mb-2">La suite de l'histoire</h3>
          <div className="space-y-2">
            {entries.filter((e) => !e.unlocked).slice(0, 2).map((e) => (
              <div key={e.book.id} className="rounded-2xl border-2 border-slate-100 p-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 grid place-items-center shrink-0"><Lock className="w-4 h-4 text-slate-400" /></div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-sm text-slate-700 truncate">Livro {e.book.number} · {e.book.title}</div>
                  <div className="text-xs text-slate-400">S'ouvre avec la leçon « {(UNITS.find((u) => u.id === e.book.chapters[0]) || {}).title} »</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {shelved === BOOKS.length && (
        <div className="px-4 pt-6">
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-100 p-4 text-center">
            <div className="text-3xl">🎉</div>
            <p className="text-sm font-bold text-emerald-800 mt-1">Toute l'histoire est lue et rangée !</p>
            <p className="text-xs text-emerald-700 mt-1">« Je ne suis pas partie seule. Cherche à Manaus. » — la suite s'écrit encore.</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* --- La fin d'un livre : il se ferme et se range ------------------- */

export function BookCompleteModal({ book, shelvedBefore = [], score, onClose }) {
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => sndCard(), 1500);
    const t2 = setTimeout(() => setStamped(true), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/85 grid place-items-center px-6 overflow-y-auto py-6">
      <Confetti />
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="fb-shelve-stage">
          <div className="fb-shelve-backpanel" />
          <div className="fb-shelve-prior">
            {shelvedBefore.slice(-6).map((b, i) => (
              <BookSpine key={b.id} book={b} width={22} height={88 + (i % 3) * 5} />
            ))}
          </div>
          <div className="fb-shelve-travel">
            <div className="fb-book3d">
              <div className={`fb-b-back bg-gradient-to-br ${book.color}`} />
              <div className={`fb-b-spine bg-gradient-to-b ${book.color}`}>
                <span className="fb-b-spine-label">{book.title}</span>
              </div>
              <div className="fb-b-edge" />
              <div className="fb-b-pages" />
              <div className="fb-b-flap">
                <div className={`fb-b-flap-out bg-gradient-to-br ${book.color}`}>
                  <span className="fb-b-flap-emoji">{book.emoji}</span>
                  <span className="fb-b-flap-title">{book.title}</span>
                </div>
                <div className="fb-b-flap-in" />
              </div>
            </div>
          </div>
          <div className="fb-shelve-plank" />
        </div>

        <div className="fb-shelve-text text-center w-full">
          <h3 className="text-white text-2xl font-extrabold leading-tight">Livro terminado !</h3>
          <p className="text-white/90 text-sm mt-2">{book.title} — rangé dans ta bibliothèque.</p>

          {/* Ce qui donne envie d'ouvrir le suivant. */}
          <div className="mt-4 rounded-2xl border-2 border-amber-400/50 bg-amber-400/10 p-3 text-left">
            <div className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mb-1">A seguir</div>
            <p className="text-sm text-white leading-snug">{book.ending}</p>
          </div>

          {score && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-white/10 p-2">
                <div className="text-lg font-extrabold text-white tabular-nums">{score.firstTry}/{score.words}</div>
                <div className="text-[10px] text-white/70">du premier coup</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-2">
                <div className="text-lg font-extrabold text-white tabular-nums">{score.hints}</div>
                <div className="text-[10px] text-white/70">indice{score.hints > 1 ? "s" : ""}</div>
              </div>
              <div className="rounded-2xl bg-white/10 p-2">
                <div className="text-lg font-extrabold text-white tabular-nums">{score.pages}/{score.total}</div>
                <div className="text-[10px] text-white/70">pages</div>
              </div>
            </div>
          )}

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-purple-500/25 border border-purple-300/40 text-purple-100 font-bold text-xs px-3 py-1.5">
            + un coffre épique (ou mieux) t'attend sur l'accueil
          </div>

          {score && score.perfect && stamped && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 text-amber-950 font-extrabold text-xs px-3 py-1.5 fb-burst">
              <Sparkles className="w-3.5 h-3.5" /> Livre parfait — sceau doré
            </div>
          )}

          <button onClick={onClose}
            className="w-full mt-5 rounded-2xl bg-white text-slate-800 font-extrabold py-4 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
            Voir mon étagère
          </button>
        </div>
      </div>
    </div>
  );
}
