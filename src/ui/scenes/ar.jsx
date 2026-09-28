import React from "react";
import { Sun, Cloud, Birds, Person, TreeLine, Foam, Haze } from "../sceneKit.jsx";

/* ==================================================================
   LES VINGT PAYSAGES D'ARGENTINE — même méthode que les autres : un
   ciel qui donne l'heure, un arrière-plan voilé, le sujet éclairé d'un
   côté et dans l'ombre de l'autre, un premier plan qui encadre, et une
   silhouette pour l'échelle.
   ================================================================== */

/* Un cardón, le grand cactus candélabre des vallées du Nord-Ouest. */
function Cardon({ x, y, s = 1, fill = "#4d6b3a" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill={fill}>
      <rect x="-1.6" y="-18" width="3.2" height="18" rx="1.6" />
      <path d="M-1.4 -8 h-3 a1.4 1.4 0 0 1 -1.4 -1.4 v-5 a1.4 1.4 0 0 1 2.8 0 v3.6 h1.6 Z" />
      <path d="M1.4 -11 h3 a1.4 1.4 0 0 0 1.4 -1.4 v-4 a1.4 1.4 0 0 0 -2.8 0 v2.6 h-1.6 Z" />
      <path d="M0 -17 v15" stroke="#2f4a24" strokeWidth=".4" opacity=".6" />
    </g>
  );
}

/* Un peuplier de Lombardie, l'álamo qui borde les vignes de Mendoza. */
function Alamo({ x, y, h = 22, fill = "#3f6b2e" }) {
  return (
    <g>
      <rect x={x - 0.5} y={y - 3} width="1" height="3" fill="#4a3a28" />
      <path d={`M${x} ${y - h} C${x + 3.4} ${y - h * 0.6} ${x + 3} ${y - 4} ${x + 1.6} ${y - 2} H${x - 1.6} C${x - 3} ${y - 4} ${x - 3.4} ${y - h * 0.6} ${x} ${y - h} Z`} fill={fill} />
    </g>
  );
}

/* Un sapin sombre des forêts patagoniennes. */
function Conifer({ x, y, h = 14, fill = "#1f3d2c" }) {
  return <path d={`M${x} ${y - h} L${x + h * 0.32} ${y} H${x - h * 0.32} Z`} fill={fill} />;
}

/* Un couple de tango, en silhouette : lui penché, elle la jambe tendue. */
function TangoCouple({ x, y, s = 1, color = "#1c1917", dress = "#b91c1c" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="-1.8" cy="-11" r="1.5" fill={color} />
      <path d="M-1.8 -9.4 L-2.4 -3 L-3.6 2 M-2.4 -3 L-0.8 2 M-1.8 -8 L1.4 -7" stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="1.8" cy="-10.4" r="1.3" fill={color} />
      <path d="M1.8 -9 L2.2 -4 L0 -1 L3.6 -1 Z" fill={dress} />
      <path d="M2 -2 L2.4 2 M2.8 -2 L6 1" stroke={color} strokeWidth=".9" strokeLinecap="round" />
    </g>
  );
}

export const AR_SCENES = {
  /* Iguazú — la gorge du Diable dans la brume, arc-en-ciel compris */
  ar_iguazu: (
    <>
      <defs>
        <linearGradient id="ar-igu-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fb7e8" /><stop offset="100%" stopColor="#d8f0f4" />
        </linearGradient>
        <linearGradient id="ar-igu-fall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="100%" stopColor="#cfe8ea" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-igu-sky)" />
      <Cloud x={40} y={18} s={1.1} opacity={0.8} />
      <Cloud x={150} y={12} s={0.8} opacity={0.7} />
      {/* La forêt au sommet des falaises */}
      <TreeLine fill="#2f7a3a" trees={[[4, 44, 9], [18, 40, 10], [34, 43, 9], [50, 39, 10], [66, 42, 9], [84, 38, 10], [102, 41, 9], [120, 38, 10], [138, 42, 9], [156, 39, 10], [174, 42, 9], [192, 40, 10]]} />
      <TreeLine fill="#1f5e2c" trees={[[10, 48, 7], [42, 47, 7], [76, 46, 7], [112, 46, 7], [148, 47, 7], [184, 47, 7]]} />
      {/* Les falaises en fer à cheval, en deux gradins */}
      <path d="M0 48 H200 V96 H0 Z" fill="#5d4c3a" />
      <path d="M0 48 H200 V53 H0 Z" fill="#3e5a2e" />
      <path d="M0 72 Q100 66 200 72 V76 Q100 70 0 76 Z" fill="#3e5a2e" />
      {/* Les chutes du haut : des rideaux de largeurs inégales */}
      {[[2, 20], [26, 9], [40, 22], [66, 12], [82, 26], [112, 10], [126, 24], [154, 14], [172, 26]].map(([x, w], i) => (
        <g key={i}>
          <path d={`M${x} 51 q${w / 2} -2 ${w} 0 V${71 - (i % 2) * 1.5} q${-w / 2} 3 ${-w} 0 Z`} fill="url(#ar-igu-fall)" />
          {[0.2, 0.45, 0.7, 0.9].map((f) => <path key={f} d={`M${x + w * f} 52 q.8 9 0 18`} stroke="#9fcfd6" strokeWidth=".45" fill="none" opacity=".8" />)}
        </g>
      ))}
      {/* Les touffes de forêt entre les rideaux */}
      {[22, 36, 63, 79, 109, 123, 151, 169, 198].map((x, i) => <ellipse key={x} cx={x} cy={54 + (i % 3)} rx="3.4" ry="2.6" fill="#2f7a3a" />)}
      {/* Les chutes du bas, plus larges, plus blanches */}
      {[[0, 36], [44, 30], [82, 44], [134, 28], [168, 32]].map(([x, w], i) => (
        <g key={i}>
          <path d={`M${x} 74 q${w / 2} -2 ${w} 0 V96 H${x} Z`} fill="url(#ar-igu-fall)" />
          {[0.15, 0.35, 0.55, 0.75, 0.92].map((f) => <path key={f} d={`M${x + w * f} 75 q-.8 10 0 20`} stroke="#9fcfd6" strokeWidth=".5" fill="none" opacity=".8" />)}
        </g>
      ))}
      {/* La brume et l'arc-en-ciel */}
      <Haze y={84} h={20} opacity={0.75} />
      {["#ef4444", "#f59e0b", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6"].map((c, i) => (
        <path key={c} d={`M${40 + i * 1.6} 104 A${62 - i * 1.6} ${52 - i * 1.6} 0 0 1 ${164 - i * 1.6} 104`} stroke={c} strokeWidth="1.6" fill="none" opacity=".45" />
      ))}
      <path d="M0 100 q100 -6 200 0 V130 H0 Z" fill="#7aa7a0" />
      <Foam y={106} opacity={0.6} />
      {/* La passerelle */}
      <path d="M0 114 L120 108" stroke="#57534e" strokeWidth="2.2" />
      <path d="M0 110 L120 104.4" stroke="#78716c" strokeWidth=".7" />
      {[10, 30, 50, 70, 90, 110].map((x) => <line key={x} x1={x} y1={114 - x * 0.05} x2={x} y2={110 - x * 0.047} stroke="#78716c" strokeWidth=".6" />)}
      <Person x={96} y={108} s={0.9} opacity={0.85} />
      <Person x={104} y={108} s={0.8} color="#b45309" opacity={0.85} />
      <path d="M150 130 q10 -20 30 -22 q-6 10 -4 22 Z" fill="#1f5e2c" />
      <path d="M186 130 q2 -18 14 -24 V130 Z" fill="#2f7a3a" />
    </>
  ),

  /* Perito Moreno — le front du glacier au-dessus du lac turquoise */
  ar_moreno: (
    <>
      <defs>
        <linearGradient id="ar-mor-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7aa6d6" /><stop offset="100%" stopColor="#dde9f3" />
        </linearGradient>
        <linearGradient id="ar-mor-ice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4fbff" /><stop offset="55%" stopColor="#9fd3ec" /><stop offset="100%" stopColor="#3f8fc0" />
        </linearGradient>
        <linearGradient id="ar-mor-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6fb9c8" /><stop offset="100%" stopColor="#3a7f95" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-mor-sky)" />
      <Cloud x={60} y={16} s={1.2} opacity={0.7} />
      {/* Les montagnes derrière */}
      <path d="M0 58 L22 30 L36 42 L58 18 L78 40 L96 26 L116 44 L140 22 L160 38 L182 24 L200 36 V70 H0 Z" fill="#6f7f8f" />
      <path d="M58 18 L66 28 L60 30 L54 26 Z M140 22 L148 30 L142 32 L136 28 Z M22 30 L28 38 L20 38 Z M182 24 L188 32 L180 32 Z" fill="#f8fafc" />
      <Haze y={46} h={14} opacity={0.3} />
      {/* La langue de glace qui descend vers le lac */}
      <path d="M40 62 Q100 44 200 50 V74 H30 Z" fill="#e3f1f8" />
      {Array.from({ length: 22 }, (_, i) => (
        <path key={i} d={`M${34 + i * 7.6} ${66 - (i % 3)} l2.4 -4 l2.2 4`} fill="#c7e3f1" />
      ))}
      {/* Le front : des aiguilles bleues */}
      <path d="M20 74 L24 66 L28 72 L32 64 L37 71 L41 62 L46 70 L51 61 L56 70 L61 63 L66 69 L71 60 L76 68 L81 62 L86 70 L91 61 L97 69 L102 63 L108 70 L113 62 L119 69 L124 61 L130 68 L135 63 L141 70 L146 62 L152 69 L158 64 L164 70 L170 63 L176 69 L182 64 L188 70 L194 65 L200 68 V96 H20 Z" fill="url(#ar-mor-ice)" />
      {[34, 52, 70, 88, 108, 126, 146, 166, 186].map((x) => <path key={x} d={`M${x} 70 v24`} stroke="#2f7fae" strokeWidth="1" opacity=".35" />)}
      <path d="M0 94 H200 V130 H0 Z" fill="url(#ar-mor-lake)" />
      {/* Icebergs */}
      <path d="M40 104 l6 -4 l8 1 l3 4 Z" fill="#e0f2fe" />
      <path d="M120 110 l4 -3 l6 0 l2 3 Z" fill="#bae6fd" />
      <path d="M160 100 l3 -2 l4 1 l1 2 Z" fill="#e0f2fe" />
      <Foam y={98} opacity={0.4} w={1} />
      {/* Les passerelles, à gauche */}
      <path d="M0 108 L16 100 L16 130 H0 Z" fill="#4b5b3a" />
      <path d="M0 106 L18 98" stroke="#7c5b3a" strokeWidth="1.6" />
      <Person x={8} y={102} s={0.8} color="#b91c1c" />
      <Person x={13} y={100} s={0.8} />
    </>
  ),

  /* Fitz Roy — l'« amanecer rojo », le granit embrasé à l'aube */
  ar_fitzroy: (
    <>
      <defs>
        <linearGradient id="ar-fr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b4a8a" /><stop offset="50%" stopColor="#e87d6f" /><stop offset="100%" stopColor="#ffd3a4" />
        </linearGradient>
        <linearGradient id="ar-fr-rock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f08a4b" /><stop offset="100%" stopColor="#b8452e" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-fr-sky)" />
      <Cloud x={150} y={20} s={1} color="#ffc3a8" opacity={0.6} />
      <Cloud x={120} y={30} s={0.8} color="#ffb59a" opacity={0.5} />
      {/* Les aiguilles */}
      <path d="M40 80 L52 46 L58 52 L66 30 L72 40 L78 22 L84 34 L90 10 L100 36 L106 26 L114 44 L122 34 L130 52 L140 44 L156 80 Z" fill="url(#ar-fr-rock)" />
      <path d="M90 10 L100 36 L94 44 L92 30 Z M78 22 L84 34 L80 40 Z M66 30 L72 40 L68 44 Z" fill="#8f3322" opacity=".6" />
      <path d="M52 62 L60 56 L70 64 L82 54 L96 62 L110 52 L124 62 L138 56 L148 66 L150 80 H48 Z" fill="#f8fafc" opacity=".9" />
      {/* Les contreforts sombres */}
      <path d="M0 84 L30 62 L50 74 L70 70 L100 80 L130 70 L160 76 L180 64 L200 72 V100 H0 Z" fill="#3a3346" />
      {/* La lagune et ses reflets */}
      <path d="M0 96 H200 V110 H0 Z" fill="#4aa3b8" />
      <path d="M80 96 L90 104 L100 96 Z" fill="#e0876a" opacity=".35" />
      <Foam y={100} opacity={0.25} w={0.8} />
      {/* La moraine au premier plan */}
      <path d="M0 108 Q60 100 110 108 T200 106 V130 H0 Z" fill="#5b4e44" />
      {[[20, 116, 4], [48, 120, 3], [140, 118, 5], [170, 122, 3]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.6} fill="#443a33" />)}
      <Person x={118} y={112} s={1} color="#1c1917" />
      <Person x={126} y={113} s={0.9} color="#1c1917" />
    </>
  ),

  /* Caminito — les maisons de tôle peintes, un couple de tango */
  ar_caminito: (
    <>
      <defs>
        <linearGradient id="ar-cam-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4fa3e0" /><stop offset="100%" stopColor="#bfe3f7" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-cam-sky)" />
      <Cloud x={160} y={16} s={0.9} />
      {/* Les façades, de gauche à droite */}
      {[
        [0, 36, 34, "#e11d48", "#fde047"], [34, 28, 30, "#2563eb", "#f97316"], [64, 40, 26, "#facc15", "#16a34a"],
        [90, 30, 32, "#16a34a", "#e11d48"], [122, 38, 26, "#f97316", "#2563eb"], [148, 26, 30, "#7c3aed", "#facc15"], [178, 34, 22, "#0ea5e9", "#ef4444"],
      ].map(([x, top, w, wall, trim], i) => (
        <g key={i}>
          <rect x={x} y={top} width={w} height={110 - top} fill={wall} />
          {Array.from({ length: Math.floor(w / 2.4) }, (_, k) => <line key={k} x1={x + 1 + k * 2.4} y1={top} x2={x + 1 + k * 2.4} y2="110" stroke="#000" strokeOpacity=".12" strokeWidth=".6" />)}
          <rect x={x} y={top} width={w} height="3" fill={trim} />
          <rect x={x + w * 0.2} y={top + 10} width={w * 0.24} height="12" fill="#1e293b" />
          <rect x={x + w * 0.56} y={top + 10} width={w * 0.24} height="12" fill="#1e293b" />
          <rect x={x + w * 0.18} y={top + 9} width={w * 0.28} height="2" fill={trim} />
          <rect x={x + w * 0.54} y={top + 9} width={w * 0.28} height="2" fill={trim} />
          <path d={`M${x + 2} ${top + 30} h${w - 4}`} stroke={trim} strokeWidth="1.2" />
          {Array.from({ length: Math.floor((w - 4) / 3) }, (_, k) => <line key={k} x1={x + 3 + k * 3} y1={top + 30} x2={x + 3 + k * 3} y2={top + 36} stroke={trim} strokeWidth=".6" />)}
          <path d={`M${x + 2} ${top + 36} h${w - 4}`} stroke={trim} strokeWidth="1" />
        </g>
      ))}
      {/* Le linge et une plante au balcon */}
      <path d="M36 50 q14 4 26 0" stroke="#1f2937" strokeWidth=".4" fill="none" />
      {[40, 46, 52, 57].map((x, i) => <rect key={x} x={x} y="50.6" width="3" height="4" fill={["#fff", "#fde047", "#fb7185", "#fff"][i]} />)}
      {/* Le pavé */}
      <path d="M0 108 H200 V130 H0 Z" fill="#8a7f72" />
      {Array.from({ length: 30 }, (_, i) => <rect key={i} x={(i * 13) % 200} y={110 + ((i * 5) % 18)} width="8" height="3" rx="1" fill="#6f655a" opacity=".6" />)}
      <TangoCouple x={96} y={116} s={1.5} />
      <Person x={150} y={118} s={1} color="#334155" />
      <Person x={30} y={119} s={1.05} color="#78350f" />
    </>
  ),

  /* Teatro Colón — la façade éclairée au crépuscule */
  ar_colon: (
    <>
      <defs>
        <linearGradient id="ar-col-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e2a5a" /><stop offset="60%" stopColor="#6d4a8a" /><stop offset="100%" stopColor="#e8958a" />
        </linearGradient>
        <linearGradient id="ar-col-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f3e3c3" /><stop offset="100%" stopColor="#cdb58c" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-col-sky)" />
      {[[20, 14], [60, 8], [170, 12], [140, 22]].map(([x, y]) => <circle key={x} cx={x} cy={y} r=".7" fill="#fff" opacity=".7" />)}
      {/* Toits mansardés */}
      <path d="M26 42 L36 30 H164 L174 42 Z" fill="#4b5a6b" />
      <path d="M86 30 Q100 16 114 30 Z" fill="#5b6b7c" />
      <rect x="98" y="14" width="4" height="6" fill="#5b6b7c" />
      {/* Façade */}
      <rect x="22" y="42" width="156" height="66" fill="url(#ar-col-wall)" />
      <rect x="22" y="42" width="156" height="4" fill="#b8a07a" />
      <rect x="22" y="70" width="156" height="3" fill="#b8a07a" />
      {/* Colonnes */}
      {[62, 76, 90, 110, 124, 138].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="47" width="4" height="23" fill="#fbf1dc" />
          <rect x={x - 3} y="46" width="6" height="2" fill="#e4d2ae" />
        </g>
      ))}
      {/* Fenêtres éclairées */}
      {[34, 46, 150, 162].map((x) => <rect key={x} x={x} y="50" width="6" height="14" rx="3" fill="#ffd27a" />)}
      {[69, 83, 117, 131].map((x) => <rect key={x} x={x - 3} y="52" width="6" height="12" rx="3" fill="#ffcf6e" />)}
      <rect x="95" y="50" width="10" height="16" rx="5" fill="#ffe29a" />
      {/* Arcades du rez-de-chaussée */}
      {[40, 64, 88, 112, 136, 160].map((x) => <path key={x} d={`M${x - 7} 106 V88 a7 7 0 0 1 14 0 V106 Z`} fill="#ffc46b" />)}
      {[40, 64, 88, 112, 136, 160].map((x) => <path key={x} d={`M${x - 7} 106 V88 a7 7 0 0 1 14 0`} fill="none" stroke="#a88d63" strokeWidth="1" />)}
      {/* Rue et réverbères */}
      <path d="M0 106 H200 V130 H0 Z" fill="#2b2a3a" />
      <path d="M0 116 H200" stroke="#fef3c7" strokeWidth=".6" strokeDasharray="6 5" opacity=".6" />
      {[12, 188].map((x) => (
        <g key={x}>
          <line x1={x} y1="112" x2={x} y2="80" stroke="#1f1f2e" strokeWidth="1.4" />
          <circle cx={x} cy="79" r="3" fill="#ffe7a6" />
          <circle cx={x} cy="79" r="7" fill="#ffe7a6" opacity=".2" />
        </g>
      ))}
      <Person x={70} y={112} s={1} color="#0f0f1a" />
      <Person x={76} y={112} s={0.95} color="#0f0f1a" />
      <Person x={130} y={113} s={1} color="#0f0f1a" />
    </>
  ),

  /* Ushuaia — le phare des Éclaireurs sur le canal Beagle */
  ar_ushuaia: (
    <>
      <defs>
        <linearGradient id="ar-ush-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8aa4bc" /><stop offset="100%" stopColor="#e2e8ee" />
        </linearGradient>
        <linearGradient id="ar-ush-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b6f86" /><stop offset="100%" stopColor="#23394a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-ush-sky)" />
      <Cloud x={50} y={20} s={1.3} color="#f1f5f9" opacity={0.8} />
      <Cloud x={160} y={30} s={1} color="#e2e8f0" opacity={0.7} />
      {/* Les montagnes enneigées de l'autre rive */}
      <path d="M0 70 L20 50 L34 58 L56 36 L74 54 L94 42 L112 58 L134 40 L156 56 L178 44 L200 54 V78 H0 Z" fill="#5a6b7a" />
      <path d="M56 36 L64 46 L58 48 L50 44 Z M134 40 L142 50 L136 52 L128 48 Z M94 42 L100 50 L92 50 Z M178 44 L184 52 L176 52 Z M20 50 L26 58 L18 58 Z" fill="#f8fafc" />
      <Haze y={62} h={12} opacity={0.35} />
      <path d="M0 76 H200 V130 H0 Z" fill="url(#ar-ush-sea)" />
      <Foam y={88} opacity={0.25} w={0.8} />
      <Foam y={104} opacity={0.2} w={0.8} offset={9} />
      {/* L'îlot et le phare */}
      <path d="M92 100 Q110 88 132 92 Q146 96 150 102 Z" fill="#3b3a36" />
      <path d="M100 96 Q112 90 126 92" stroke="#57534e" strokeWidth="2" fill="none" />
      <path d="M113 94 L114.5 58 H121.5 L123 94 Z" fill="#f8fafc" />
      {[62, 72, 82].map((y) => <path key={y} d={`M${114.4 - (y - 58) * 0.04} ${y} H${121.6 + (y - 58) * 0.04} V${y + 5} H${114.2 - (y - 58) * 0.04} Z`} fill="#dc2626" />)}
      <rect x="113.6" y="54" width="8.8" height="4" fill="#1f2937" />
      <path d="M113 54 L118 49 L123 54 Z" fill="#dc2626" />
      <circle cx="118" cy="56" r="1.4" fill="#fde68a" />
      {/* Des lions de mer sur les rochers */}
      <path d="M130 96 q4 -4 8 -1 q-3 1 -8 1 Z M136 98 q4 -3 7 0 Z" fill="#6b4f3a" />
      {/* Un bateau */}
      <path d="M30 104 h24 l-3 5 h-18 Z" fill="#b91c1c" />
      <rect x="36" y="98" width="10" height="6" fill="#f8fafc" />
      <Birds x={160} y={70} s={0.8} color="#334155" />
    </>
  ),

  /* Península Valdés — la queue d'une baleine franche au couchant */
  ar_valdes: (
    <>
      <defs>
        <linearGradient id="ar-val-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f5c92" /><stop offset="55%" stopColor="#f09a6a" /><stop offset="100%" stopColor="#ffd8a0" />
        </linearGradient>
        <linearGradient id="ar-val-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d6e8a" /><stop offset="100%" stopColor="#173447" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-val-sky)" />
      <Sun cx={150} cy={70} r={10} color="#fff1cf" glow="#ff9d55" />
      {/* Les falaises beiges */}
      <path d="M0 64 Q30 58 60 66 L60 76 H0 Z" fill="#c8a57a" />
      <path d="M0 70 Q30 66 60 72 V76 H0 Z" fill="#a8845a" />
      <path d="M0 74 H200 V130 H0 Z" fill="url(#ar-val-sea)" />
      {[78, 82, 87, 93, 100].map((y, i) => <rect key={y} x={150 - 10 + i * 1.8} y={y} width={20 - i * 3.6} height="1.2" rx=".6" fill="#ffc98a" opacity={0.6 - i * 0.09} />)}
      <Foam y={84} opacity={0.3} w={0.8} />
      <Foam y={100} opacity={0.25} w={0.8} offset={12} />
      {/* La queue qui sort de l'eau */}
      <path d="M86 106 C88 96 90 88 92 80 C84 76 74 72 66 64 C78 66 88 70 96 74 C104 70 114 66 126 64 C118 72 108 76 100 80 C102 88 104 96 106 106 Z" fill="#1c2733" />
      <path d="M92 80 C88 90 88 98 86 106 H90 C91 96 92 88 94 81 Z" fill="#2f3f4f" />
      {[72, 80, 110, 118].map((x, i) => <line key={x} x1={x} y1={67 + (i % 2) * 2} x2={x + (x < 96 ? 2 : -2)} y2={74 + (i % 2) * 2} stroke="#bfe3f7" strokeWidth=".6" opacity=".7" />)}
      <path d="M78 106 q18 -6 36 0" stroke="#fff" strokeWidth="1.6" fill="none" opacity=".7" />
      {/* Le dos d'une autre baleine */}
      <path d="M140 110 q14 -6 28 0 Z" fill="#1c2733" />
      <path d="M150 104 l2 -3 l2 3" stroke="#e0f2fe" strokeWidth=".8" fill="none" />
      <Birds x={40} y={30} s={0.8} color="#3b2f2a" />
    </>
  ),

  /* Humahuaca — la montagne aux sept couleurs de Purmamarca */
  ar_humahuaca: (
    <>
      <defs>
        <linearGradient id="ar-hum-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e6fd0" /><stop offset="100%" stopColor="#9fcdf2" />
        </linearGradient>
        <clipPath id="ar-hum-clip"><path d="M10 96 L42 40 L64 52 L92 30 L126 50 L150 38 L190 96 Z" /></clipPath>
      </defs>
      <rect width="200" height="130" fill="url(#ar-hum-sky)" />
      <Cloud x={160} y={16} s={0.8} opacity={0.8} />
      {/* La montagne rayée */}
      <g clipPath="url(#ar-hum-clip)">
        {["#b4533a", "#d97706", "#7c3a4a", "#9aa35a", "#c2703d", "#8d5b8a", "#e0a45a", "#a63d2e", "#6f8a5a", "#d9825b"].map((c, i) => (
          <path key={c} d={`M0 ${34 + i * 7} Q60 ${22 + i * 8} 110 ${36 + i * 6} T200 ${30 + i * 7} V130 H0 Z`} fill={c} />
        ))}
        <path d="M92 30 L126 50 L150 38 L190 96 H100 Z" fill="#000" opacity=".15" />
      </g>
      {/* Les collines ocre au premier plan */}
      <path d="M0 96 Q50 86 100 94 T200 92 V130 H0 Z" fill="#c9965e" />
      <path d="M0 112 Q60 104 120 112 T200 110 V130 H0 Z" fill="#b07a44" />
      {/* L'église d'adobe blanchie */}
      <rect x="130" y="92" width="26" height="14" fill="#f8f4ea" />
      <path d="M128 92 L143 84 L158 92 Z" fill="#8b5a3a" />
      <rect x="150" y="80" width="8" height="26" fill="#f1ebdd" />
      <path d="M149 80 L154 74 L159 80 Z" fill="#8b5a3a" />
      <rect x="152.6" y="84" width="2.8" height="4" fill="#3a2a1c" />
      <rect x="140" y="98" width="5" height="8" fill="#6b4a2b" />
      <Cardon x={40} y={112} s={1.5} />
      <Cardon x={70} y={108} s={1} />
      <Cardon x={180} y={116} s={1.3} />
      <Person x={112} y={112} s={0.9} color="#7c2d12" />
    </>
  ),

  /* Tren a las Nubes — le viaduc de La Polvorilla, les nuages dessous */
  ar_nubes: (
    <>
      <defs>
        <linearGradient id="ar-nub-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f5fb8" /><stop offset="100%" stopColor="#a8d1f0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-nub-sky)" />
      {/* Montagnes arides */}
      <path d="M0 56 L30 34 L54 48 L84 28 L110 46 L140 30 L170 44 L200 34 V90 H0 Z" fill="#a67c52" />
      <path d="M84 28 L110 46 L96 60 Z M140 30 L170 44 L150 58 Z" fill="#7a5a3a" opacity=".5" />
      {/* Les flancs du ravin */}
      <path d="M0 50 L30 58 L40 130 H0 Z" fill="#8a6440" />
      <path d="M200 50 L170 58 L160 130 H200 Z" fill="#7a5636" />
      {/* Les nuages sous le pont */}
      <Cloud x={70} y={104} s={2} opacity={0.95} />
      <Cloud x={130} y={100} s={2.2} opacity={0.95} />
      <Cloud x={100} y={118} s={2.6} opacity={1} />
      {/* Le viaduc en treillis */}
      <rect x="28" y="56" width="144" height="3" fill="#44403c" />
      {[40, 64, 88, 112, 136, 160].map((x) => (
        <g key={x} stroke="#57534e" strokeWidth=".9" fill="none">
          <path d={`M${x - 3} 59 L${x - 7} 104 M${x + 3} 59 L${x + 7} 104`} />
          {[66, 76, 86, 96].map((y) => <path key={y} d={`M${x - 3 - (y - 59) * 0.09} ${y} L${x + 3 + (y + 10 - 59) * 0.09} ${y + 10} M${x + 3 + (y - 59) * 0.09} ${y} L${x - 3 - (y + 10 - 59) * 0.09} ${y + 10}`} strokeWidth=".4" />)}
        </g>
      ))}
      {/* Le train */}
      <rect x="70" y="47" width="18" height="9" rx="1.5" fill="#b91c1c" />
      <rect x="89" y="48" width="16" height="8" rx="1" fill="#dc2626" />
      <rect x="106" y="48" width="16" height="8" rx="1" fill="#dc2626" />
      {[92, 96, 100, 109, 113, 117].map((x) => <rect key={x} x={x} y="50" width="2.6" height="2.6" fill="#fde68a" />)}
      <rect x="72" y="49" width="5" height="3" fill="#fde68a" />
      <path d="M72 45 q-4 -8 -12 -10" stroke="#f1f5f9" strokeWidth="2.5" fill="none" opacity=".7" strokeLinecap="round" />
      <Birds x={150} y={20} s={0.8} />
    </>
  ),

  /* Mendoza — les rangs de vigne, les peupliers, l'Aconcagua enneigé */
  ar_mendoza: (
    <>
      <defs>
        <linearGradient id="ar-men-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b8fd0" /><stop offset="100%" stopColor="#f6d6a8" />
        </linearGradient>
        <linearGradient id="ar-men-mtn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a8fb0" /><stop offset="100%" stopColor="#a58a7a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-men-sky)" />
      {/* La cordillère */}
      <path d="M0 62 L24 44 L44 52 L70 30 L92 46 L120 20 L146 42 L170 32 L200 48 V72 H0 Z" fill="url(#ar-men-mtn)" />
      <path d="M120 20 L132 32 L126 34 L118 30 L110 32 Z M70 30 L78 38 L70 40 L64 36 Z M170 32 L178 40 L170 40 Z" fill="#fbfdff" />
      <Haze y={56} h={16} color="#fbe3c0" opacity={0.4} />
      {/* La plaine */}
      <path d="M0 70 H200 V130 H0 Z" fill="#a98a5a" />
      {/* Peupliers en lisière */}
      {[6, 14, 22, 30, 38, 150, 158, 166, 174, 182, 190].map((x, i) => <Alamo key={x} x={x} y={74} h={20 + (i % 3) * 3} />)}
      {/* Les rangs de vigne qui convergent */}
      {Array.from({ length: 13 }, (_, i) => {
        const bx = -40 + i * 23; const tx = 70 + i * 5;
        return (
          <g key={i}>
            <path d={`M${tx} 74 L${bx} 130`} stroke="#4d7c2a" strokeWidth={1.2 + i % 2} />
            <path d={`M${tx} 74 L${bx} 130`} stroke="#6b9a3a" strokeWidth="4" strokeDasharray="2 3" opacity=".8" />
          </g>
        );
      })}
      {[[40, 118], [150, 112], [96, 122]].map(([x, y]) => (
        <g key={x}>
          {[0, 1, 2].map((k) => <circle key={k} cx={x + k * 1.4} cy={y + (k % 2) * 1.4} r="1.3" fill="#4c1d95" />)}
        </g>
      ))}
      <Person x={120} y={96} s={0.9} color="#3f2a1c" />
    </>
  ),

  /* Obelisco — l'avenue 9 de Julio à la nuit tombante */
  ar_obelisco: (
    <>
      <defs>
        <linearGradient id="ar-obe-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23305e" /><stop offset="55%" stopColor="#7a5a9a" /><stop offset="100%" stopColor="#f2a27a" />
        </linearGradient>
        <linearGradient id="ar-obe-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f5efe2" /><stop offset="100%" stopColor="#c6b89c" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-obe-sky)" />
      {/* Les immeubles des deux côtés */}
      {[[0, 50, 22], [22, 60, 18], [40, 44, 16], [144, 48, 18], [162, 58, 16], [178, 42, 22]].map(([x, top, w], i) => (
        <g key={i}>
          <rect x={x} y={top} width={w} height={96 - top} fill={i % 2 ? "#2d2f4a" : "#363a58"} />
          {Array.from({ length: Math.floor((96 - top) / 6) }, (_, r) => Array.from({ length: Math.floor(w / 5) }, (_, c) => (
            (r + c + i) % 3 ? <rect key={`${r}-${c}`} x={x + 2 + c * 5} y={top + 3 + r * 6} width="2" height="2.6" fill="#ffd98a" opacity=".85" /> : null
          )))}
        </g>
      ))}
      {/* L'obélisque */}
      <path d="M95 96 L96.4 22 L100 16 L103.6 22 L105 96 Z" fill="url(#ar-obe-stone)" />
      <rect x="99" y="30" width="2" height="3" fill="#3a3a4a" />
      <path d="M92 96 h16 v4 h-16 Z" fill="#b8ab90" />
      {/* L'avenue */}
      <path d="M0 96 H200 V130 H0 Z" fill="#2a2a38" />
      <path d="M100 100 L60 130 M100 100 L140 130 M100 100 L100 130 M100 100 L20 130 M100 100 L180 130" stroke="#f8fafc" strokeWidth=".6" strokeDasharray="4 4" opacity=".5" />
      {/* Les phares des voitures */}
      {[[40, 118, "#fde68a"], [70, 110, "#fde68a"], [130, 112, "#f87171"], [162, 120, "#f87171"], [88, 124, "#fde68a"]].map(([x, y, c], i) => (
        <g key={i}><circle cx={x} cy={y} r="1.3" fill={c} /><circle cx={x + 3} cy={y} r="1.3" fill={c} /><circle cx={x + 1.5} cy={y} r="5" fill={c} opacity=".12" /></g>
      ))}
      {/* Les jacarandas du terre-plein */}
      <TreeLine fill="#8b5cf6" opacity={0.75} trees={[[60, 94, 6], [72, 95, 5], [128, 95, 5], [140, 94, 6]]} />
    </>
  ),

  /* Casa Rosada — le palais rose et la place de Mai */
  ar_rosada: (
    <>
      <defs>
        <linearGradient id="ar-ros-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5aa0e0" /><stop offset="100%" stopColor="#dcebf6" />
        </linearGradient>
        <linearGradient id="ar-ros-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f4b6b0" /><stop offset="100%" stopColor="#d98a86" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-ros-sky)" />
      <Cloud x={40} y={18} s={1} />
      {/* Le palais */}
      <rect x="20" y="44" width="160" height="50" fill="url(#ar-ros-wall)" />
      <rect x="20" y="44" width="160" height="3" fill="#c7736f" />
      <rect x="20" y="66" width="160" height="2" fill="#c7736f" />
      <path d="M84 44 V36 H116 V44 Z" fill="#e8a39e" />
      <path d="M82 36 L100 26 L118 36 Z" fill="#d98a86" />
      <rect x="99" y="16" width="1.2" height="10" fill="#57534e" />
      <path d="M100.2 16 h9 v2.2 h-9 Z" fill="#74acdf" /><path d="M100.2 18.2 h9 v2.2 h-9 Z" fill="#fff" /><path d="M100.2 20.4 h9 v2.2 h-9 Z" fill="#74acdf" />
      <circle cx="104.7" cy="19.3" r=".7" fill="#f6b40e" />
      {Array.from({ length: 14 }, (_, i) => 26 + i * 11).map((x) => (
        <g key={x}>
          <rect x={x} y="50" width="5" height="11" rx="2.5" fill="#7a3a3a" opacity=".7" />
          <rect x={x} y="72" width="5" height="12" rx="2.5" fill="#7a3a3a" opacity=".7" />
        </g>
      ))}
      <path d="M92 94 V78 a8 8 0 0 1 16 0 V94 Z" fill="#5a2a2a" />
      <rect x="90" y="64" width="20" height="2" fill="#f1f5f9" />
      {/* Les palmiers et la pyramide de Mai */}
      <path d="M0 94 H200 V130 H0 Z" fill="#bdb3a3" />
      <path d="M0 100 H200" stroke="#a89f90" strokeWidth=".6" />
      <path d="M97 116 L99 84 H101 L103 116 Z" fill="#f5efe2" />
      <circle cx="100" cy="82" r="2.4" fill="#f5efe2" />
      <rect x="94" y="116" width="12" height="4" fill="#d6ccba" />
      {/* Les foulards peints au sol */}
      {[[40, 112], [60, 120], [140, 114], [160, 122], [120, 124], [74, 108]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l4 -3 l4 3 l-4 1.4 Z`} fill="#fff" opacity=".9" />
      ))}
      <Person x={30} y={106} s={1} color="#334155" />
      <Person x={172} y={110} s={1} color="#334155" />
      <Birds x={150} y={30} s={0.7} />
    </>
  ),

  /* San Telmo — la place Dorrego, les étals du dimanche, le tango */
  ar_santelmo: (
    <>
      <defs>
        <linearGradient id="ar-stl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f09a5a" /><stop offset="100%" stopColor="#ffe0b0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-stl-sky)" />
      {/* Les maisons coloniales */}
      {[[0, 34, 46, "#e9d8b8"], [46, 42, 38, "#d9a86c"], [84, 30, 40, "#c9d8c0"], [124, 40, 36, "#e6c3a0"], [160, 32, 40, "#d8b8c8"]].map(([x, top, w, c], i) => (
        <g key={i}>
          <rect x={x} y={top} width={w} height={96 - top} fill={c} />
          <rect x={x} y={top} width={w} height="3" fill="#8a6a4a" opacity=".5" />
          {[0.18, 0.58].map((f) => (
            <g key={f}>
              <rect x={x + w * f} y={top + 10} width={w * 0.22} height="16" fill="#3f4a3a" />
              <path d={`M${x + w * f - 1} ${top + 26} h${w * 0.22 + 2}`} stroke="#1f2937" strokeWidth="1" />
              {[0, 1, 2, 3].map((k) => <line key={k} x1={x + w * f + k * w * 0.07} y1={top + 26} x2={x + w * f + k * w * 0.07} y2={top + 30} stroke="#1f2937" strokeWidth=".4" />)}
            </g>
          ))}
        </g>
      ))}
      {/* Les guirlandes */}
      <path d="M0 40 Q50 52 100 42 T200 44" stroke="#3f3f46" strokeWidth=".4" fill="none" />
      {Array.from({ length: 16 }, (_, i) => <circle key={i} cx={6 + i * 12.4} cy={44 + Math.sin(i) * 3} r="1.2" fill="#fde68a" />)}
      {/* Les étals */}
      {[[14, "#dc2626"], [52, "#2563eb"], [150, "#16a34a"], [186, "#f59e0b"]].map(([x, c]) => (
        <g key={x}>
          <path d={`M${x - 14} 86 L${x} 78 L${x + 14} 86 Z`} fill={c} />
          <path d={`M${x - 14} 86 L${x} 78 L${x + 14} 86`} stroke="#fff" strokeWidth=".5" fill="none" strokeDasharray="2 2" />
          <rect x={x - 12} y="92" width="24" height="6" fill="#7c5a3a" />
          <line x1={x} y1="86" x2={x} y2="98" stroke="#57534e" strokeWidth=".8" />
          {[-8, -3, 2, 7].map((d) => <rect key={d} x={x + d} y="89" width="3" height="3" fill={["#fbbf24", "#94a3b8", "#1f2937", "#e11d48"][(d + 8) % 4]} />)}
        </g>
      ))}
      {/* Les pavés */}
      <path d="M0 96 H200 V130 H0 Z" fill="#7a6e62" />
      {Array.from({ length: 40 }, (_, i) => <rect key={i} x={(i * 11) % 200} y={98 + ((i * 7) % 30)} width="7" height="2.6" rx="1" fill="#62574c" opacity=".6" />)}
      {/* Le bandonéoniste et le couple */}
      <g transform="translate(78 110)">
        <circle cx="0" cy="-12" r="1.6" fill="#1c1917" />
        <path d="M0 -10 V-3 M0 -3 L-2 2 M0 -3 L2 2" stroke="#1c1917" strokeWidth="1.3" strokeLinecap="round" />
        <rect x="-5" y="-9" width="3" height="4" fill="#111827" />
        <rect x="2" y="-9" width="3" height="4" fill="#111827" />
        <path d="M-2 -8 h4 M-2 -7 h4 M-2 -6 h4" stroke="#b91c1c" strokeWidth=".5" />
      </g>
      <TangoCouple x={110} y={116} s={1.6} />
      <Person x={160} y={120} s={1.1} color="#44403c" />
      <Person x={40} y={122} s={1.1} color="#44403c" />
    </>
  ),

  /* Puerto Madero — le pont de Calatrava et les docks de brique */
  ar_madero: (
    <>
      <defs>
        <linearGradient id="ar-mad-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a6ab0" /><stop offset="60%" stopColor="#f2a57a" /><stop offset="100%" stopColor="#ffd9a8" />
        </linearGradient>
        <linearGradient id="ar-mad-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6a7fa8" /><stop offset="100%" stopColor="#2c3a5a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-mad-sky)" />
      {/* Les tours de verre */}
      {[[118, 24, 14], [134, 16, 12], [150, 30, 16], [168, 20, 12], [182, 34, 18]].map(([x, top, w], i) => (
        <g key={i}>
          <rect x={x} y={top} width={w} height={70 - top} fill={i % 2 ? "#5a7090" : "#6a86a8"} />
          <rect x={x} y={top} width={w * 0.4} height={70 - top} fill="#ffd9a8" opacity=".25" />
          {Array.from({ length: Math.floor((70 - top) / 4) }, (_, r) => <line key={r} x1={x} y1={top + r * 4} x2={x + w} y2={top + r * 4} stroke="#2c3a5a" strokeWidth=".3" opacity=".5" />)}
        </g>
      ))}
      {/* Les docks en brique */}
      {[0, 30, 60, 90].map((x) => (
        <g key={x}>
          <rect x={x} y="54" width="30" height="20" fill="#a0432e" />
          <path d={`M${x} 54 l15 -6 l15 6`} fill="#7a2f22" />
          {[4, 12, 20].map((d) => <rect key={d} x={x + d} y="60" width="5" height="8" rx="2.5" fill="#f4c27a" opacity=".85" />)}
        </g>
      ))}
      <rect x="0" y="72" width="200" height="3" fill="#57534e" />
      {/* L'eau du dock */}
      <path d="M0 75 H200 V130 H0 Z" fill="url(#ar-mad-water)" />
      {/* Le pont : tablier courbe et mât incliné */}
      <path d="M10 92 Q100 82 190 92" stroke="#f8fafc" strokeWidth="3" fill="none" />
      <path d="M86 90 L118 30" stroke="#f8fafc" strokeWidth="3.4" strokeLinecap="round" />
      {Array.from({ length: 9 }, (_, i) => <line key={i} x1={118 - i * 3.4} y1={30 + i * 6.4} x2={60 - i * 5} y2={88 - i * 0.2} stroke="#e2e8f0" strokeWidth=".4" />)}
      {/* Reflets */}
      <path d="M10 100 Q100 92 190 100" stroke="#f8fafc" strokeWidth="1.2" fill="none" opacity=".3" />
      <path d="M86 98 L110 120" stroke="#f8fafc" strokeWidth="1.4" opacity=".2" />
      <Foam y={110} opacity={0.2} w={0.6} />
      <Person x={130} y={87} s={0.7} color="#1f2937" />
      <Person x={70} y={87} s={0.7} color="#1f2937" />
    </>
  ),

  /* Bariloche — le lac Nahuel Huapi, les forêts, le Tronador */
  ar_bariloche: (
    <>
      <defs>
        <linearGradient id="ar-bar-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d82d0" /><stop offset="100%" stopColor="#bfe0f5" />
        </linearGradient>
        <linearGradient id="ar-bar-lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f78b8" /><stop offset="100%" stopColor="#153f6e" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-bar-sky)" />
      <Cloud x={50} y={18} s={1} />
      {/* Le Tronador enneigé */}
      <path d="M60 58 L90 26 L104 36 L120 22 L150 58 Z" fill="#f8fafc" />
      <path d="M90 26 L104 36 L98 58 H82 Z M120 22 L150 58 H126 Z" fill="#cbd5e1" />
      <path d="M0 64 L24 46 L46 56 L70 44 L96 58 L130 46 L160 56 L184 42 L200 50 V72 H0 Z" fill="#4a6b5a" />
      <Haze y={56} h={12} opacity={0.3} />
      {/* Les presqu'îles boisées */}
      <path d="M0 70 H200 V130 H0 Z" fill="url(#ar-bar-lake)" />
      <path d="M0 72 Q30 64 70 74 Q40 78 0 80 Z" fill="#244a34" />
      <path d="M200 76 Q160 66 120 76 Q160 82 200 84 Z" fill="#1f3d2c" />
      <path d="M80 86 Q96 80 112 86 Z" fill="#2d5a3c" />
      {[[8, 72], [16, 70], [26, 70], [36, 71], [48, 72], [132, 75], [144, 72], [156, 71], [168, 72], [180, 73], [192, 74], [92, 84], [100, 82], [106, 84]].map(([x, y], i) => <Conifer key={i} x={x} y={y} h={7 + (i % 3) * 2} />)}
      <Foam y={96} opacity={0.2} w={0.8} />
      <Foam y={112} opacity={0.15} w={0.8} offset={8} />
      {/* Premier plan : une rive, un chalet */}
      <path d="M0 108 Q40 100 80 110 L80 130 H0 Z" fill="#2f4a2a" />
      <rect x="22" y="98" width="16" height="10" fill="#8b5a3a" />
      <path d="M20 98 L30 90 L40 98 Z" fill="#7f1d1d" />
      <rect x="28" y="102" width="4" height="6" fill="#3a2a1c" />
      <Conifer x={50} y={108} h={18} />
      <Conifer x={60} y={110} h={14} />
      <Conifer x={8} y={108} h={16} />
      <path d="M130 104 l14 0 l-2 3 h-10 Z" fill="#f8fafc" />
      <path d="M137 104 v-8 l5 7" fill="#e2e8f0" stroke="#94a3b8" strokeWidth=".4" />
    </>
  ),

  /* Salinas Grandes — le blanc à perte de vue et les bassins turquoise */
  ar_salinas: (
    <>
      <defs>
        <linearGradient id="ar-sal-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f4fb0" /><stop offset="100%" stopColor="#86c1f0" />
        </linearGradient>
        <linearGradient id="ar-sal-salt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8eef4" /><stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-sal-sky)" />
      <Sun cx={170} cy={20} r={7} color="#fffbe8" glow="#fff4c2" />
      {/* Montagnes lointaines */}
      <path d="M0 64 L20 54 L40 60 L66 48 L90 58 L118 50 L146 58 L170 50 L200 58 V68 H0 Z" fill="#8a7a8e" />
      <path d="M0 64 L30 60 L60 64 L96 60 L130 64 L170 60 L200 64 V68 H0 Z" fill="#a89aa6" opacity=".7" />
      <path d="M0 66 H200 V130 H0 Z" fill="url(#ar-sal-salt)" />
      {/* Les craquelures hexagonales, en perspective */}
      {Array.from({ length: 7 }, (_, r) => {
        const y = 70 + r * r * 1.4 + r * 4; const s = 0.4 + r * 0.28;
        return Array.from({ length: Math.ceil(12 / s) }, (_, c) => (
          <path key={`${r}-${c}`} d={`M${c * 18 * s - (r % 2) * 9 * s} ${y} l${6 * s} ${-2 * s} l${6 * s} ${2 * s} l0 ${3 * s} l${-6 * s} ${2 * s} l${-6 * s} ${-2 * s} Z`} fill="none" stroke="#c9d6e2" strokeWidth={0.3 + r * 0.1} />
        ));
      })}
      {/* Les bassins */}
      {[[40, 90, 18, 4], [66, 92, 18, 4], [92, 94, 18, 4], [30, 104, 24, 6], [62, 106, 24, 6], [94, 108, 24, 6]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#3fb8c8" opacity=".85" />
      ))}
      <path d="M126 116 l1.2 -4 l2.4 0 l1.2 4" fill="#b45309" opacity=".5" />
      <Person x={150} y={100} s={1.2} color="#1f2937" />
      <Person x={158} y={101} s={1.1} color="#9f1239" />
      <ellipse cx="154" cy="102" rx="8" ry="1" fill="#94a3b8" opacity=".35" />
    </>
  ),

  /* Ischigualasto — le Champignon de pierre sous la pleine lune */
  ar_ischigualasto: (
    <>
      <defs>
        <linearGradient id="ar-isc-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2f5a" /><stop offset="60%" stopColor="#8a6a8a" /><stop offset="100%" stopColor="#e8b38a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-isc-sky)" />
      <Sun cx={150} cy={30} r={9} color="#f8f4e0" glow="#e8e0c0" />
      {[[20, 12], [44, 24], [80, 10], [110, 18], [184, 14]].map(([x, y]) => <circle key={x} cx={x} cy={y} r=".7" fill="#fff" opacity=".8" />)}
      {/* Les falaises rouges au fond (Talampaya) */}
      <path d="M0 70 L0 50 L30 48 L34 56 L70 54 L74 60 L110 58 L112 66 L200 64 V80 H0 Z" fill="#a8523a" />
      <path d="M0 50 L30 48 L34 56 L0 58 Z" fill="#8a3f2c" />
      {/* Le désert gris et ocre */}
      <path d="M0 78 Q50 70 100 78 T200 76 V130 H0 Z" fill="#b8a48c" />
      <path d="M0 96 Q60 88 120 96 T200 94 V130 H0 Z" fill="#9c8670" />
      {[0, 1, 2, 3].map((i) => <path key={i} d={`M${20 + i * 44} ${100 + i % 2 * 4} q10 -4 20 0`} stroke="#86705a" strokeWidth=".8" fill="none" />)}
      {/* Le Champignon */}
      <path d="M92 104 C94 96 92 90 95 84 C97 80 103 80 105 84 C108 90 106 96 108 104 Z" fill="#8a7460" />
      <path d="M84 80 C84 70 116 70 116 80 C116 86 84 86 84 80 Z" fill="#b89a7a" />
      <path d="M84 80 C84 86 116 86 116 80 C110 84 90 84 84 80 Z" fill="#8a6a50" />
      <path d="M100 84 C101 92 100 98 102 104 H108 C106 96 108 90 105 84 Z" fill="#6f5a48" />
      {/* Le Sous-marin, à droite */}
      <path d="M150 90 L150 76 L156 74 L158 70 L162 70 L162 76 L180 80 L186 90 Z" fill="#9a7e66" />
      <Person x={60} y={108} s={1} color="#1c1917" />
      <Person x={66} y={108} s={0.9} color="#1c1917" />
    </>
  ),

  /* Quebrada de las Conchas — l'Amphithéâtre de grès rouge */
  ar_cafayate: (
    <>
      <defs>
        <linearGradient id="ar-caf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d7ad0" /><stop offset="100%" stopColor="#a8d4f5" />
        </linearGradient>
        <linearGradient id="ar-caf-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c2553a" /><stop offset="50%" stopColor="#e07a4a" /><stop offset="100%" stopColor="#9c3f2a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-caf-sky)" />
      <Cloud x={100} y={14} s={0.8} />
      {/* Les parois qui se referment */}
      <path d="M0 0 H70 Q60 30 72 60 Q64 90 80 130 H0 Z" fill="url(#ar-caf-wall)" />
      <path d="M200 0 H130 Q140 30 128 60 Q136 90 120 130 H200 Z" fill="url(#ar-caf-wall)" />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <path d={`M0 ${10 + i * 12} Q${40 + i} ${6 + i * 12} ${66 - (i % 3) * 2} ${14 + i * 12}`} stroke="#8a3322" strokeWidth=".8" fill="none" opacity=".5" />
          <path d={`M200 ${12 + i * 12} Q${160 - i} ${8 + i * 12} ${134 + (i % 3) * 2} ${16 + i * 12}`} stroke="#8a3322" strokeWidth=".8" fill="none" opacity=".5" />
        </g>
      ))}
      <path d="M70 0 Q60 30 72 60 Q64 90 80 130 H90 Q74 90 80 60 Q70 30 78 0 Z" fill="#7a2c1e" opacity=".5" />
      {/* Le sol de sable rose */}
      <path d="M60 112 Q100 104 140 112 V130 H60 Z" fill="#d9a07a" />
      {/* Le musicien et son public */}
      <g transform="translate(100 118)">
        <circle cx="0" cy="-10" r="1.5" fill="#1c1917" />
        <path d="M0 -8.5 V-3 M0 -3 L-2 2 M0 -3 L2 2" stroke="#1c1917" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="2.4" cy="-4" rx="2.4" ry="1.8" fill="#a16207" />
        <path d="M3.6 -5 L8 -9" stroke="#78350f" strokeWidth=".7" />
      </g>
      {/* Notes de musique */}
      <path d="M108 104 v-5 l3 -1 v5" stroke="#fff" strokeWidth=".7" fill="none" opacity=".8" />
      <circle cx="107.4" cy="104" r=".9" fill="#fff" opacity=".8" />
      <circle cx="110.4" cy="103" r=".9" fill="#fff" opacity=".8" />
      <Person x={86} y={122} s={0.9} color="#44403c" />
      <Person x={118} y={122} s={0.9} color="#44403c" />
      <Birds x={90} y={30} s={0.7} color="#3b2f2a" />
    </>
  ),

  /* Córdoba — l'église des jésuites et le cloître */
  ar_cordoba: (
    <>
      <defs>
        <linearGradient id="ar-cor-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a9ad6" /><stop offset="100%" stopColor="#f2dcb8" />
        </linearGradient>
        <linearGradient id="ar-cor-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e2c28e" /><stop offset="100%" stopColor="#b8925e" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-cor-sky)" />
      <Cloud x={160} y={20} s={0.9} />
      {/* Les deux tours */}
      {[64, 124].map((x) => (
        <g key={x}>
          <rect x={x} y="30" width="14" height="64" fill="url(#ar-cor-stone)" />
          <rect x={x + 4} y="36" width="6" height="9" rx="3" fill="#5a3a22" />
          <path d={`M${x - 1} 30 Q${x + 7} 16 ${x + 15} 30 Z`} fill="#a8764a" />
          <line x1={x + 7} y1="12" x2={x + 7} y2="22" stroke="#57534e" strokeWidth=".8" />
          <line x1={x + 4.6} y1="15" x2={x + 9.4} y2="15" stroke="#57534e" strokeWidth=".8" />
        </g>
      ))}
      {/* La façade entre les tours */}
      <rect x="78" y="44" width="46" height="50" fill="#d6b27a" />
      <path d="M78 44 Q101 26 124 44 Z" fill="#c49c66" />
      <circle cx="101" cy="42" r="4" fill="#5a3a22" opacity=".8" />
      <path d="M92 94 V72 a9 9 0 0 1 18 0 V94 Z" fill="#4a2e1a" />
      <path d="M92 72 a9 9 0 0 1 18 0" fill="none" stroke="#8a6440" strokeWidth="1.4" />
      {/* Le cloître à gauche et à droite */}
      {[0, 150].map((x0) => (
        <g key={x0}>
          <rect x={x0} y="62" width="50" height="32" fill="#e8d2a8" />
          <rect x={x0} y="60" width="50" height="3" fill="#a8764a" />
          {[6, 18, 30, 42].map((d) => <path key={d} d={`M${x0 + d - 4} 94 V78 a4 4 0 0 1 8 0 V94 Z`} fill="#8a6440" opacity=".6" />)}
        </g>
      ))}
      <path d="M0 94 H200 V130 H0 Z" fill="#c9b08a" />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1={i * 22} y1="94" x2={i * 22 - 20} y2="130" stroke="#b39a74" strokeWidth=".6" />)}
      <TreeLine fill="#4d7c3a" trees={[[20, 96, 8], [34, 98, 6], [176, 96, 8], [188, 98, 6]]} />
      <Person x={70} y={112} s={1.1} color="#1e3a8a" />
      <Person x={78} y={113} s={1} color="#7f1d1d" />
      <Person x={140} y={116} s={1.1} color="#1f2937" />
    </>
  ),

  /* Esteros del Iberá — le marais à l'aube, un capybara, un caïman */
  ar_ibera: (
    <>
      <defs>
        <linearGradient id="ar-ibe-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0a86a" /><stop offset="100%" stopColor="#ffe6b8" />
        </linearGradient>
        <linearGradient id="ar-ibe-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9a27a" /><stop offset="100%" stopColor="#5a6a4a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#ar-ibe-sky)" />
      <Sun cx={60} cy={58} r={10} color="#fff4d0" glow="#ffb26b" />
      {/* Lisière lointaine */}
      <TreeLine fill="#6a7a4a" opacity={0.8} trees={[[10, 66, 6], [26, 64, 8], [44, 66, 6], [120, 64, 7], [140, 62, 9], [160, 65, 6], [180, 63, 8], [196, 66, 6]]} />
      <path d="M0 68 H200 V130 H0 Z" fill="url(#ar-ibe-water)" />
      {[72, 76, 81, 87, 94].map((y, i) => <rect key={y} x={60 - 9 + i * 1.6} y={y} width={18 - i * 3.2} height="1.2" rx=".6" fill="#fff4d0" opacity={0.55 - i * 0.08} />)}
      {/* Îles flottantes et joncs */}
      <path d="M110 84 Q140 76 176 84 Q150 88 110 86 Z" fill="#6b8a3a" />
      {Array.from({ length: 30 }, (_, i) => <line key={i} x1={112 + i * 2.2} y1="84" x2={112 + i * 2.2 + (i % 3 - 1)} y2={78 - (i % 4) * 2} stroke="#4d6b2a" strokeWidth=".6" />)}
      {Array.from({ length: 22 }, (_, i) => <line key={i} x1={i * 3} y1="122" x2={i * 3 + (i % 3 - 1) * 1.5} y2={104 - (i % 5) * 3} stroke="#3f5a24" strokeWidth=".8" />)}
      {/* Nénuphars */}
      {[[80, 104], [96, 112], [130, 108], [150, 118], [72, 118]].map(([x, y], i) => (
        <g key={i}><ellipse cx={x} cy={y} rx="5" ry="1.6" fill="#3f7a3a" /><circle cx={x + 1} cy={y - 0.6} r="1" fill="#f9a8d4" /></g>
      ))}
      {/* Le capybara sur la rive flottante */}
      <g transform="translate(140 84) scale(1.5) translate(0 -1)">
        <path d="M-10 0 C-10 -8 6 -9 8 -4 C10 -6 13 -5 13 -2 C13 0 10 0 8 0 Z" fill="#8a5a3a" />
        <circle cx="10" cy="-4" r=".6" fill="#1c1917" />
        <path d="M-7 0 v2 M-3 0 v2 M3 0 v2 M6 0 v2" stroke="#6b4428" strokeWidth="1" />
        <path d="M8 -6 l1 -1.4 l1 1.4" fill="#6b4428" />
      </g>
      {/* Le caïman : les yeux et le dos qui affleurent */}
      <path d="M150 104 q12 -2 24 0" stroke="#3a4a2a" strokeWidth="2" fill="none" />
      <circle cx="152" cy="102.6" r="1" fill="#3a4a2a" /><circle cx="155" cy="102.4" r="1" fill="#3a4a2a" />
      <circle cx="152" cy="102.4" r=".35" fill="#facc15" /><circle cx="155" cy="102.2" r=".35" fill="#facc15" />
      {/* Un héron blanc */}
      <g transform="translate(40 96)">
        <path d="M0 0 C-4 -2 -5 -6 -2 -7 C0 -7.6 1 -9 1 -12 C1 -14 3 -14 3.4 -13 L6 -12.6 L3.4 -12.2 C3 -9 3 -7 3 -5 C3 -2 2 0 0 0 Z" fill="#f8fafc" />
        <path d="M-1 0 v6 M1 0 v6" stroke="#57534e" strokeWidth=".5" />
      </g>
      <Birds x={120} y={30} s={0.8} color="#3b2f2a" />
    </>
  ),
};
