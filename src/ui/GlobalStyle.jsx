import React from "react";

/* Toutes les animations de l'app, au même endroit. */
export function GlobalStyle() {
  return (
    <style>{`
        @keyframes fb-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        @keyframes fb-pop { 0% { transform: scale(.4); opacity: 0; } 60% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fb-up { from { transform: translateY(40px); opacity: .6; } to { transform: translateY(0); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
        .fb-flip-outer { perspective: 1600px; cursor: pointer; }
        .fb-flip-inner { position: relative; transition: transform .6s cubic-bezier(.4,.15,.2,1); transform-style: preserve-3d; }
        .fb-flip-inner.flipped { transform: rotateY(180deg); }
        .fb-flip-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .fb-flip-back { position: absolute; inset: 0; transform: rotateY(180deg); }

        /* --- Fermeture du livre et rangement sur l'étagère --- */
        .fb-shelve-stage { position: relative; width: 260px; height: 280px; perspective: 1000px; }
        .fb-shelve-backpanel { position: absolute; left: 6px; right: 6px; top: 110px; bottom: 34px;
          background: linear-gradient(180deg, #78350f, #451a03); border-radius: 6px; box-shadow: inset 0 6px 14px rgba(0,0,0,.5); }
        .fb-shelve-plank { position: absolute; left: 0; right: 0; top: 242px; height: 12px; border-radius: 3px;
          background: linear-gradient(180deg, #d97706, #92400e); box-shadow: 0 4px 10px rgba(0,0,0,.45);
          animation: fb-shelf-bump 2.3s ease-out forwards; }
        .fb-shelve-prior { position: absolute; left: 14px; width: 150px; top: 150px; height: 92px;
          display: flex; align-items: flex-end; justify-content: flex-end; gap: 4px; }
        .fb-shelve-travel { position: absolute; left: 50%; top: 92px; width: 0; height: 0;
          transform-style: preserve-3d; animation: fb-shelve 2.3s cubic-bezier(.5,.02,.3,1) forwards; }

        .fb-book3d { position: absolute; transform-style: preserve-3d; }
        .fb-book3d > div { position: absolute; }
        .fb-b-back { width: 118px; height: 158px; margin: -79px 0 0 -59px; border-radius: 2px 5px 5px 2px;
          transform: rotateY(180deg) translateZ(9px); }
        .fb-b-spine { width: 18px; height: 158px; margin: -79px 0 0 -9px; transform: rotateY(-90deg) translateZ(59px);
          display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 8px rgba(0,0,0,.35); }
        .fb-b-spine-label { writing-mode: vertical-rl; transform: rotate(180deg); color: #fff; font-size: 8px;
          font-weight: 800; white-space: nowrap; letter-spacing: .02em; }
        .fb-b-edge { width: 18px; height: 158px; margin: -79px 0 0 -9px; transform: rotateY(90deg) translateZ(59px);
          background: repeating-linear-gradient(90deg, #fff, #fff 2px, #e2e8f0 2px, #e2e8f0 3px); }
        .fb-b-pages { width: 112px; height: 150px; margin: -75px 0 0 -54px; transform: translateZ(6px);
          background: linear-gradient(180deg, #fffdf7, #f1f5f9); border-radius: 1px 4px 4px 1px;
          box-shadow: inset 6px 0 10px rgba(0,0,0,.08); }
        .fb-b-flap { width: 118px; height: 158px; margin: -79px 0 0 -59px; transform-style: preserve-3d;
          transform-origin: left center; animation: fb-book-close 1.15s cubic-bezier(.4,.1,.25,1) forwards; }
        .fb-b-flap-out, .fb-b-flap-in { position: absolute; inset: 0; border-radius: 2px 5px 5px 2px;
          backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .fb-b-flap-out { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
          box-shadow: inset 8px 0 12px rgba(0,0,0,.25); }
        .fb-b-flap-emoji { font-size: 34px; line-height: 1; }
        .fb-b-flap-title { color: #fff; font-size: 11px; font-weight: 800; text-align: center; padding: 0 10px; }
        .fb-b-flap-in { transform: rotateY(180deg); background: linear-gradient(180deg, #fffdf7, #eef2f7); }

        @keyframes fb-book-close {
          0%   { transform: translateZ(9px) rotateY(-152deg); }
          70%  { transform: translateZ(9px) rotateY(-8deg); }
          85%  { transform: translateZ(9px) rotateY(-16deg); }
          100% { transform: translateZ(9px) rotateY(0deg); }
        }
        @keyframes fb-shelve {
          0%, 46%  { transform: translate3d(0, 0, 0) rotateY(10deg) scale(1); }
          72%      { transform: translate3d(14px, 48px, 0) rotateY(52deg) scale(.82); }
          100%     { transform: translate3d(42px, 104px, 0) rotateY(86deg) scale(.6); }
        }
        @keyframes fb-shelf-bump {
          0%, 86%  { transform: translateY(0); }
          92%      { transform: translateY(2px); }
          100%     { transform: translateY(0); }
        }
        .fb-shelve-text { opacity: 0; animation: fb-shelve-text .45s ease-out 2.15s forwards; }
        @keyframes fb-shelve-text { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

        /* --- Mascotte et retours visuels --- */
        .fb-bob { animation: fb-bob 2.6s ease-in-out infinite; }
        @keyframes fb-bob { 0%,100% { transform: translateY(0) rotate(-1deg); } 50% { transform: translateY(-5px) rotate(1deg); } }
        .fb-flap { transform-origin: 62px 62px; animation: fb-flap .5s ease-in-out infinite; }
        @keyframes fb-flap { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-24deg); } }
        .fb-cheer { animation: fb-cheer .6s ease-in-out infinite; }
        @keyframes fb-cheer { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-10px) rotate(3deg); } }
        .fb-shake { animation: fb-shake .4s ease-in-out; }
        @keyframes fb-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-7px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(3px); } }
        .fb-pulse { animation: fb-pulse 1.8s ease-in-out infinite; }
        @keyframes fb-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
        .fb-float { animation: fb-float 3s ease-in-out infinite; }
        @keyframes fb-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .fb-slide-in { animation: fb-slide-in .35s cubic-bezier(.2,.8,.3,1) backwards; }
        @keyframes fb-slide-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        .fb-in { animation: fb-in .3s ease-out backwards; }
        @keyframes fb-in { from { opacity: 0; transform: translateX(28px) scale(.97); } to { opacity: 1; transform: none; } }
        .fb-glow { animation: fb-glow 1.6s ease-in-out infinite; }
        @keyframes fb-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,.55); } 50% { box-shadow: 0 0 0 12px rgba(251,191,36,0); } }
        .fb-flame { animation: fb-flame 1.1s ease-in-out infinite; transform-origin: bottom center; }
        @keyframes fb-flame { 0%,100% { transform: scale(1) rotate(-2deg); } 50% { transform: scale(1.12) rotate(2deg); } }
        .fb-chest { animation: fb-chest-shake 1.4s ease-in-out infinite; transform-origin: bottom center; }
        @keyframes fb-chest-shake { 0%,70%,100% { transform: rotate(0deg); } 78% { transform: rotate(-6deg); } 86% { transform: rotate(6deg); } 94% { transform: rotate(-3deg); } }
        .fb-burst { animation: fb-burst .7s cubic-bezier(.2,.9,.3,1) forwards; }
        @keyframes fb-burst { 0% { transform: scale(.3); opacity: 0; } 55% { transform: scale(1.25); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .fb-node-pop { animation: fb-pop .45s cubic-bezier(.2,.9,.3,1) backwards; }
        .fb-ring { transition: stroke-dashoffset .9s cubic-bezier(.3,.8,.3,1); }
        .fb-tile-in { animation: fb-pop .25s ease-out backwards; }
    `}</style>
  );
}
