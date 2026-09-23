import React from "react";
import { Lock } from "lucide-react";
import { RARITY } from "../data/cards.js";

/* ------------------------------------------------------------------ */
/*  Illustrations vectorielles des cartes postales (une scène par lieu) */
/* ------------------------------------------------------------------ */

export function SceneArt({ scene, className = "" }) {
  const W = 200, H = 100;
  let content = null;

  switch (scene) {
    case "mountain": // Cristo Redentor
      content = (<>
        <polygon points="0,100 45,38 95,100" fill="#fff" opacity=".3" />
        <polygon points="55,100 125,22 195,100" fill="#fff" opacity=".55" />
        <ellipse cx="125" cy="26" rx="9" ry="2.5" fill="#fff" opacity=".8" />
        <line x1="107" y1="14" x2="143" y2="14" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" opacity=".95" />
        <rect x="121.5" y="8" width="7" height="18" rx="3" fill="#fff" opacity=".95" />
        <circle cx="125" cy="5" r="4.2" fill="#fff" opacity=".95" />
      </>);
      break;
    case "cablecar": // Pão de Açúcar
      content = (<>
        <circle cx="168" cy="16" r="9" fill="#fff" opacity=".45" />
        <ellipse cx="45" cy="82" rx="55" ry="30" fill="#fff" opacity=".3" />
        <ellipse cx="135" cy="60" rx="48" ry="42" fill="#fff" opacity=".55" />
        <line x1="15" y1="34" x2="150" y2="18" stroke="#fff" strokeWidth="1.5" opacity=".7" />
        <line x1="78" y1="26" x2="78" y2="33" stroke="#fff" strokeWidth="1.5" opacity=".9" />
        <rect x="72" y="33" width="12" height="8" rx="1.5" fill="#fff" opacity=".95" />
      </>);
      break;
    case "beach": // Copacabana
      content = (<>
        <circle cx="100" cy="22" r="13" fill="#fff" opacity=".5" />
        <path d="M0,50 Q15,42 30,50 T60,50 T90,50 T120,50 T150,50 T180,50 T200,50" stroke="#fff" strokeWidth="2" fill="none" opacity=".55" />
        <path d="M0,64 Q15,56 30,64 T60,64 T90,64 T120,64 T150,64 T180,64 T200,64" stroke="#fff" strokeWidth="2" fill="none" opacity=".4" />
        <rect x="0" y="70" width="200" height="30" fill="#fff" opacity=".18" />
        <path d="M0,88 Q12,78 24,88 T48,88 T72,88 T96,88 T120,88 T144,88 T168,88 T192,88" stroke="#fff" strokeWidth="3" fill="none" opacity=".85" />
        <line x1="18" y1="90" x2="18" y2="70" stroke="#fff" strokeWidth="2.5" opacity=".8" />
        <path d="M18,70 Q6,64 4,72 M18,70 Q30,64 32,72 M18,70 Q10,60 18,58 M18,70 Q26,60 18,58" stroke="#fff" strokeWidth="2" fill="none" opacity=".8" />
      </>);
      break;
    case "waterfall": // Cataratas do Iguaçu
      content = (<>
        <polygon points="0,32 200,26 200,40 0,46" fill="#fff" opacity=".45" />
        {[22, 45, 68, 92, 116, 140, 164, 182].map((x, i) => (
          <line key={i} x1={x} y1="30" x2={x + (i % 2 ? 4 : -4)} y2="86" stroke="#fff" strokeWidth="4" opacity={i % 2 ? ".55" : ".8"} strokeLinecap="round" />
        ))}
        <ellipse cx="100" cy="90" rx="95" ry="9" fill="#fff" opacity=".3" />
        <polygon points="10,28 22,10 34,28" fill="#fff" opacity=".55" />
        <polygon points="150,24 164,8 178,24" fill="#fff" opacity=".55" />
      </>);
      break;
    case "jungle": // Amazônia
      content = (<>
        {[[20, 34, 20], [55, 28, 26], [92, 32, 24], [130, 26, 28], [168, 34, 20]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#fff" opacity={i % 2 ? ".35" : ".5"} />
        ))}
        <rect x="97" y="40" width="6" height="30" fill="#fff" opacity=".7" />
        <circle cx="100" cy="30" r="22" fill="#fff" opacity=".8" />
        <rect x="0" y="82" width="200" height="18" fill="#fff" opacity=".2" />
      </>);
      break;
    case "rivers": // Encontro das Águas
      content = (<>
        <path d="M0,20 L200,20 L200,100 L0,100 Z" fill="#fff" opacity=".18" />
        <path d="M0,30 Q50,20 100,32 T200,28 L200,100 L0,100 Z" fill="#fff" opacity=".25" />
        <path d="M0,55 Q50,42 100,56 T200,50" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".65" />
        <path d="M0,72 Q50,60 100,74 T200,68" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".45" />
        <path d="M0,88 Q50,78 100,90 T200,84" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".3" />
      </>);
      break;
    case "colonial": // Pelourinho
      content = (<>
        {[[0, 56, 30], [26, 44, 34], [56, 60, 28], [82, 40, 38], [116, 58, 26], [140, 46, 32], [170, 60, 30]].map(([x, y, w], i) => (
          <g key={i} opacity={0.55 + (i % 3) * 0.15}>
            <rect x={x} y={y + 20} width={w} height={100 - y - 20} fill="#fff" />
            <polygon points={`${x - 2},${y + 20} ${x + w / 2},${y} ${x + w + 2},${y + 20}`} fill="#fff" />
          </g>
        ))}
        <rect x="86" y="14" width="10" height="24" fill="#fff" opacity=".9" />
        <polygon points="84,14 91,4 98,14" fill="#fff" opacity=".9" />
        <line x1="91" y1="4" x2="91" y2="-2" stroke="#fff" strokeWidth="1.5" opacity=".9" />
      </>);
      break;
    case "canyon": // Chapada Diamantina
      content = (<>
        <polygon points="0,90 20,55 60,55 75,90" fill="#fff" opacity=".3" />
        <polygon points="55,95 90,40 145,40 170,95" fill="#fff" opacity=".5" />
        <polygon points="130,98 160,60 200,60 200,98" fill="#fff" opacity=".35" />
        <line x1="112" y1="42" x2="106" y2="90" stroke="#fff" strokeWidth="2.5" opacity=".7" strokeLinecap="round" />
        <ellipse cx="106" cy="92" rx="10" ry="3" fill="#fff" opacity=".3" />
      </>);
      break;
    case "dunes": // Lençóis Maranhenses
      content = (<>
        <path d="M0,60 Q30,42 60,58 T120,56 T200,50 L200,100 L0,100 Z" fill="#fff" opacity=".3" />
        <path d="M0,78 Q35,60 70,76 T140,72 T200,68 L200,100 L0,100 Z" fill="#fff" opacity=".5" />
        <ellipse cx="70" cy="82" rx="16" ry="6" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".55" />
        <ellipse cx="140" cy="88" rx="12" ry="4.5" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".45" />
      </>);
      break;
    case "dolphins": // Fernando de Noronha
      content = (<>
        <path d="M0,70 Q20,62 40,70 T80,70 T120,70 T160,70 T200,70" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".5" />
        <path d="M0,84 Q20,76 40,84 T80,84 T120,84 T160,84 T200,84" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".35" />
        <path d="M60,68 Q80,30 105,50 Q112,42 118,46 Q108,58 96,58 Q86,72 68,76 Z" fill="#fff" opacity=".9" />
        <polygon points="150,80 170,64 180,80" fill="#fff" opacity=".4" />
      </>);
      break;
    case "church": // Ouro Preto
      content = (<>
        <polygon points="0,90 30,68 60,90" fill="#fff" opacity=".3" />
        <polygon points="140,90 170,68 200,90" fill="#fff" opacity=".3" />
        <rect x="60" y="46" width="14" height="44" fill="#fff" opacity=".85" />
        <rect x="126" y="46" width="14" height="44" fill="#fff" opacity=".85" />
        <ellipse cx="67" cy="42" rx="8" ry="9" fill="#fff" opacity=".85" />
        <ellipse cx="133" cy="42" rx="8" ry="9" fill="#fff" opacity=".85" />
        <polygon points="80,52 100,26 120,52" fill="#fff" opacity=".9" />
        <rect x="97" y="12" width="6" height="16" fill="#fff" opacity=".9" />
        <line x1="93" y1="16" x2="107" y2="16" stroke="#fff" strokeWidth="2.5" opacity=".9" />
        <rect x="80" y="52" width="40" height="38" fill="#fff" opacity=".7" />
      </>);
      break;
    case "modernist": // Brasília
      content = (<>
        <ellipse cx="100" cy="88" rx="90" ry="6" fill="#fff" opacity=".25" />
        <path d="M55,80 Q55,30 100,26 Q100,55 100,80 Z" fill="#fff" opacity=".55" />
        <path d="M145,80 Q145,30 100,26 Q100,55 100,80 Z" fill="#fff" opacity=".8" />
        {[70, 82, 94, 106, 118, 130].map((x, i) => (
          <line key={i} x1={x} y1="80" x2={x} y2="90" stroke="#fff" strokeWidth="2" opacity=".7" />
        ))}
      </>);
      break;
    case "skyline": // Avenida Paulista
      content = (<>
        {[[0, 46, 22], [24, 30, 26], [52, 52, 20], [74, 20, 24], [100, 40, 30], [132, 28, 22], [156, 46, 24], [182, 34, 18]].map(([x, y, w], i) => (
          <rect key={i} x={x} y={y} width={w} height={100 - y} fill="#fff" opacity={0.35 + (i % 4) * 0.15} />
        ))}
      </>);
      break;
    case "wildlife": // Pantanal
      content = (<>
        {[10, 30, 50, 150, 170, 190].map((x, i) => (
          <path key={i} d={`M${x},100 Q${x + 3},80 ${x - 2},60`} stroke="#fff" strokeWidth="2" fill="none" opacity=".45" />
        ))}
        <path d="M40,20 q6,-6 12,0 M150,14 q6,-6 12,0" stroke="#fff" strokeWidth="2" fill="none" opacity=".6" />
        <g opacity=".9">
          <ellipse cx="105" cy="76" rx="30" ry="16" fill="#fff" />
          <circle cx="140" cy="62" r="12" fill="#fff" />
          <polygon points="132,52 136,42 140,52" fill="#fff" />
          <polygon points="142,52 146,42 150,52" fill="#fff" />
          <path d="M78,80 Q64,70 70,58" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
      </>);
      break;
    case "kite": // Jericoacoara
      content = (<>
        <circle cx="170" cy="18" r="9" fill="#fff" opacity=".5" />
        <path d="M0,80 Q40,64 80,80 T160,78 T200,74 L200,100 L0,100 Z" fill="#fff" opacity=".4" />
        <polygon points="60,22 72,34 60,46 48,34" fill="#fff" opacity=".9" />
        <line x1="60" y1="46" x2="45" y2="76" stroke="#fff" strokeWidth="1.5" opacity=".8" />
        <path d="M45,76 l-4,4 l6,2 l-4,4 l6,2" stroke="#fff" strokeWidth="1.5" fill="none" opacity=".8" />
      </>);
      break;
    case "carnival": // Olinda
      content = (<>
        {[[-10, 20, 20], [70, 8, 22], [150, 18, 22], [210, 24, 20]].map(([a, b, c], i) => (
          <path key={i} d={`M100,40 Q${100 + a},${20 - b} ${100 + a * 1.4},${c}`} stroke="#fff" strokeWidth="4" fill="none" opacity=".55" strokeLinecap="round" />
        ))}
        <circle cx="100" cy="55" r="24" fill="#fff" opacity=".9" />
        <circle cx="91" cy="50" r="3" fill="#059669" />
        <circle cx="109" cy="50" r="3" fill="#059669" />
        <path d="M88,64 Q100,72 112,64" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {[[30, 20], [170, 30], [50, 75], [150, 80], [20, 55]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#fff" opacity=".6" />
        ))}
      </>);
      break;
    case "sailboat": // Paraty
      content = (<>
        <path d="M0,66 Q20,58 40,66 T80,66 T120,66 T160,66 T200,66" stroke="#fff" strokeWidth="2.5" fill="none" opacity=".55" />
        {[[10, 44, 16], [140, 40, 34], [172, 46, 20]].map(([x, y, w], i) => (
          <rect key={i} x={x} y={y} width={w} height={100 - y - 30} fill="#fff" opacity=".3" />
        ))}
        <path d="M70,70 Q100,80 130,70 L122,80 L78,80 Z" fill="#fff" opacity=".9" />
        <line x1="100" y1="70" x2="100" y2="34" stroke="#fff" strokeWidth="2" opacity=".9" />
        <polygon points="100,36 100,68 80,68" fill="#fff" opacity=".85" />
      </>);
      break;
    case "reef": // Bonito
      content = (<>
        <path d="M0,26 Q20,18 40,26 T80,26 T120,26 T160,26 T200,26" stroke="#fff" strokeWidth="2" fill="none" opacity=".5" />
        {[[40, 50], [160, 40], [95, 70], [140, 78]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#fff" opacity=".4" />
        ))}
        {[[45, 55, 1], [110, 40, -1], [155, 68, 1], [75, 82, -1]].map(([x, y, dir], i) => (
          <g key={i} opacity=".85">
            <ellipse cx={x} cy={y} rx="14" ry="7" fill="#fff" />
            <polygon points={`${x - 14 * dir},${y} ${x - 22 * dir},${y - 5} ${x - 22 * dir},${y + 5}`} fill="#fff" />
          </g>
        ))}
      </>);
      break;
    case "fishpools": // Porto de Galinhas
      content = (<>
        <line x1="0" y1="24" x2="200" y2="24" stroke="#fff" strokeWidth="1.5" opacity=".4" />
        <circle cx="170" cy="16" r="8" fill="#fff" opacity=".5" />
        <ellipse cx="55" cy="66" rx="45" ry="24" fill="none" stroke="#fff" strokeWidth="2" opacity=".5" />
        <ellipse cx="140" cy="72" rx="40" ry="22" fill="none" stroke="#fff" strokeWidth="2" opacity=".4" />
        <g opacity=".85">
          <ellipse cx="50" cy="64" rx="9" ry="4.5" fill="#fff" />
          <polygon points="41,64 34,60 34,68" fill="#fff" />
        </g>
        <g opacity=".7">
          <ellipse cx="135" cy="74" rx="7" ry="3.5" fill="#fff" />
          <polygon points="142,74 148,71 148,77" fill="#fff" />
        </g>
      </>);
      break;
    case "snowvillage": // Gramado
      content = (<>
        {[[130, 20, 14], [155, 30, 10]].map(([x, y, s], i) => (
          <polygon key={i} points={`${x},${y} ${x - s},${y + s * 1.6} ${x + s},${y + s * 1.6}`} fill="#fff" opacity=".55" />
        ))}
        <g opacity=".9">
          <polygon points="30,50 55,28 80,50" fill="#fff" />
          <rect x="35" y="50" width="40" height="34" fill="#fff" />
        </g>
        <g opacity=".7">
          <polygon points="95,58 115,40 135,58" fill="#fff" />
          <rect x="99" y="58" width="32" height="26" fill="#fff" />
        </g>
        {[[15, 20], [70, 10], [110, 24], [150, 60], [175, 15], [40, 70]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#fff" opacity=".6" />
        ))}
      </>);
      break;
    default:
      content = <circle cx="100" cy="50" r="30" fill="#fff" opacity=".4" />;
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className={className}>
      {content}
    </svg>
  );
}

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
      <SceneArt scene={card.scene} className={small ? "h-16 w-full shrink-0" : big ? "h-52 w-full shrink-0" : "h-28 w-full shrink-0"} />
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

