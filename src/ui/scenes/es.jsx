import React from "react";
import { Sun, Cloud, Birds, Palm, Person, TreeLine, Foam, Haze } from "../sceneKit.jsx";

/* ==================================================================
   LES VINGT PAYSAGES D'ESPAGNE — même méthode que ceux du Brésil : un
   ciel qui donne l'heure, un arrière-plan voilé, le sujet éclairé d'un
   côté et dans l'ombre de l'autre, un premier plan qui encadre, et une
   silhouette pour l'échelle.
   ================================================================== */

/* Une flèche de la Sagrada Família : un fuseau percé de baies, coiffé
   d'un pinacle en mosaïque. */
function Spire({ x, base, top, w, light = "#e9c79a", dark = "#b98d5f", tip = ["#f59e0b", "#dc2626", "#16a34a"] }) {
  const h = base - top;
  return (
    <g>
      <path d={`M${x - w / 2} ${base} C${x - w / 2} ${base - h * 0.55} ${x - w * 0.28} ${top + h * 0.18} ${x} ${top} C${x + w * 0.28} ${top + h * 0.18} ${x + w / 2} ${base - h * 0.55} ${x + w / 2} ${base} Z`} fill={light} />
      <path d={`M${x} ${top} C${x + w * 0.28} ${top + h * 0.18} ${x + w / 2} ${base - h * 0.55} ${x + w / 2} ${base} L${x + w * 0.12} ${base} Z`} fill={dark} />
      {Array.from({ length: Math.max(2, Math.floor(h / 7)) }, (_, i) => (
        <rect key={i} x={x - w * 0.12} y={top + h * 0.28 + i * 6.2} width={w * 0.24} height="2.6" rx="1" fill="#6b4a2b" opacity=".45" />
      ))}
      <circle cx={x} cy={top - 1.6} r={w * 0.22} fill={tip[0]} />
      <circle cx={x - w * 0.12} cy={top - 0.6} r={w * 0.1} fill={tip[1]} />
      <circle cx={x + w * 0.12} cy={top - 0.4} r={w * 0.1} fill={tip[2]} />
    </g>
  );
}

/* Un cyprès, sombre et effilé, comme autour de l'Alhambra. */
function Cypress({ x, y, h = 20, fill = "#1f3b2a" }) {
  return <path d={`M${x} ${y - h} C${x + 3} ${y - h * 0.6} ${x + 3.2} ${y - h * 0.2} ${x + 1.6} ${y} H${x - 1.6} C${x - 3.2} ${y - h * 0.2} ${x - 3} ${y - h * 0.6} ${x} ${y - h} Z`} fill={fill} />;
}

/* Un oranger rond, fruits compris. */
function OrangeTree({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-0.8" y="-5" width="1.6" height="5" fill="#5b4630" />
      <circle cx="0" cy="-9" r="6" fill="#2f6b3a" />
      <circle cx="-2.4" cy="-10.5" r="3.4" fill="#3d8a4a" />
      {[[-3, -8], [2.5, -11], [1, -6.5], [-1, -12.5], [3.6, -7.5]].map(([a, b], i) => <circle key={i} cx={a} cy={b} r=".9" fill="#f59e0b" />)}
    </g>
  );
}

export const ES_SCENES = {
  /* Sagrada Família — les flèches de Gaudí à l'heure dorée, grues comprises */
  es_sagrada: (
    <>
      <defs>
        <linearGradient id="es-sag-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b6aa8" /><stop offset="48%" stopColor="#e9a36b" /><stop offset="100%" stopColor="#ffd9a6" />
        </linearGradient>
        <linearGradient id="es-sag-pond" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7a676" /><stop offset="100%" stopColor="#5a6f7a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-sag-sky)" />
      <Sun cx={30} cy={50} r={9} color="#fff1cf" glow="#ff9d55" />
      <Cloud x={160} y={20} s={1} color="#f7c9a6" opacity={0.55} />
      <Cloud x={62} y={14} s={0.7} color="#f7d3b4" opacity={0.4} />

      {/* Les grues : la basilique n'est toujours pas finie */}
      <g stroke="#7a2f1f" strokeWidth="1.1" fill="none" opacity=".75">
        <path d="M150 96 V20 M150 24 H182 M150 24 H138 M150 20 L182 24 M150 20 L138 24" />
        <path d="M160 24 v14" strokeWidth=".6" />
        <path d="M56 96 V30 M56 33 H30 M56 33 H66 M56 30 L30 33" />
      </g>
      <rect x="146" y="30" width="8" height="5" fill="#7a2f1f" opacity=".7" />

      {/* Les tours des Évangélistes et de Jésus, au fond */}
      <Spire x={100} base={96} top={10} w={13} light="#f0d3aa" dark="#c79b6a" />
      <path d="M100 6 v-5 M97.4 3.4 h5.2" stroke="#f6e7c8" strokeWidth="1.3" />
      <Spire x={84} base={96} top={24} w={10} light="#e9c79a" dark="#b98d5f" />
      <Spire x={116} base={96} top={24} w={10} light="#e9c79a" dark="#b98d5f" />

      {/* Façade de la Nativité : quatre flèches à pinacles */}
      <Spire x={62} base={100} top={30} w={9} light="#d9b88f" dark="#a47a4f" />
      <Spire x={72} base={100} top={22} w={9.5} light="#dcbc92" dark="#a47a4f" />
      <Spire x={128} base={100} top={22} w={9.5} light="#dcbc92" dark="#a47a4f" />
      <Spire x={138} base={100} top={30} w={9} light="#d9b88f" dark="#a47a4f" />
      <path d="M56 100 q44 -38 88 0 Z" fill="#c9a57a" />
      <path d="M100 62 q22 16 44 38 h-44 Z" fill="#a8835a" />
      {/* Les porches, avec leur dentelle de pierre */}
      {[[76, 10], [100, 13], [124, 10]].map(([x, w], i) => (
        <g key={i}>
          <path d={`M${x - w / 2} 100 V86 q${w / 2} -${w} ${w} 0 V100 Z`} fill="#5b3f25" />
          <path d={`M${x - w / 2 + 1.5} 88 q${w / 2 - 1.5} -${w - 3} ${w - 3} 0`} stroke="#e9cfa6" strokeWidth=".6" fill="none" opacity=".7" />
        </g>
      ))}
      {[66, 70, 82, 88, 112, 118, 130, 134].map((x, i) => <circle key={i} cx={x} cy={80 - (i % 3) * 3} r="1.2" fill="#8a5a36" opacity=".6" />)}
      <path d="M96 76 q4 -6 8 0 q-4 3 -8 0" fill="#3f7d4a" />

      {/* L'étang de la plaça de Gaudí et son reflet */}
      <rect x="0" y="100" width="200" height="30" fill="url(#es-sag-pond)" />
      <g opacity=".35">
        <path d="M60 100 q40 22 80 0 Z" fill="#c9a57a" />
        <path d="M100 100 l-4 22 h8 Z M72 100 l-3 16 h6 Z M128 100 l-3 16 h6 Z" fill="#e9c79a" />
      </g>
      <Foam y={112} color="#ffe6c4" opacity={0.25} />
      <TreeLine fill="#2c4a2f" trees={[[8, 104, 9], [22, 100, 8], [36, 106, 8], [166, 102, 9], [182, 98, 10], [196, 104, 8]]} />
      <Person x={44} y={124} s={1} color="#1e293b" opacity={0.7} />
      <Person x={48} y={124} s={0.9} color="#1e293b" opacity={0.6} />
      <Birds x={132} y={40} s={0.8} color="#4a2a1a" opacity={0.45} />
    </>
  ),

  /* Park Güell — le banc de mosaïque, les pavillons et la mer au loin */
  es_guell: (
    <>
      <defs>
        <linearGradient id="es-gue-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5aa9e6" /><stop offset="100%" stopColor="#d6ecfa" />
        </linearGradient>
        <linearGradient id="es-gue-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fb7d6" /><stop offset="100%" stopColor="#4f8fb3" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-gue-sky)" />
      <Sun cx={170} cy={22} r={8} color="#fffbe6" glow="#ffe08a" />
      <Cloud x={46} y={20} s={0.9} opacity={0.8} />
      <Cloud x={120} y={30} s={0.6} opacity={0.6} />

      {/* La mer et la ville, voilées */}
      <rect x="0" y="52" width="200" height="12" fill="url(#es-gue-sea)" />
      <path d="M0 64 h200 v14 H0 Z" fill="#c9b8a2" />
      {Array.from({ length: 30 }, (_, i) => (
        <rect key={i} x={i * 7} y={61 - (i * 7 % 5)} width="5" height={4 + (i * 3 % 5)} fill={i % 3 ? "#e8dccb" : "#d4c3ad"} />
      ))}
      <g opacity=".75">
        <path d="M138 64 l2 -14 l2 14 M144 64 l1.6 -10 l1.6 10 M133 64 l1.6 -10 l1.6 10" fill="#b98d5f" />
      </g>
      <Haze y={52} h={24} color="#f3f6fa" opacity={0.35} />

      {/* Les pavillons d'entrée, en pain d'épice */}
      <g>
        <rect x="24" y="74" width="26" height="20" fill="#d8b98a" />
        <path d="M21 76 q16 -22 32 0 Z" fill="#8a5a36" />
        <path d="M23 75 q14 -18 28 0" stroke="#f5f0e6" strokeWidth="2.2" fill="none" strokeDasharray="2 1.4" />
        <path d="M37 56 v-6 q3 2 0 5 q-3 -3 0 -5" fill="#f5f0e6" />
        <circle cx="37" cy="50" r="2.6" fill="#f5f0e6" stroke="#dc2626" strokeWidth=".8" />
        <rect x="32" y="82" width="6" height="12" fill="#5b3f25" />
        <rect x="42" y="80" width="4" height="5" fill="#5b3f25" />
      </g>
      <g>
        <rect x="150" y="76" width="24" height="18" fill="#d8b98a" />
        <path d="M147 78 q15 -18 30 0 Z" fill="#a86c3f" />
        <path d="M149 77 q13 -15 26 0" stroke="#7cc4f0" strokeWidth="2" fill="none" strokeDasharray="1.6 1.2" />
        <path d="M162 62 v-8" stroke="#f5f0e6" strokeWidth="1.4" />
        <path d="M159 55 h6 M162 52 v6" stroke="#f5f0e6" strokeWidth="1.3" />
        <rect x="158" y="84" width="6" height="10" fill="#5b3f25" />
      </g>
      <Palm x={66} y={94} s={0.8} leaf="#2f7a44" dark="#1d5a31" />
      <Palm x={136} y={94} s={0.7} leaf="#2f7a44" dark="#1d5a31" />
      <TreeLine fill="#3a6b3f" trees={[[92, 92, 7], [104, 90, 8], [118, 93, 7], [8, 90, 7], [194, 92, 8]]} />

      {/* Le banc ondulé en trencadís, au premier plan */}
      <path d="M0 104 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0 V130 H0 Z" fill="#efe7d8" />
      <path d="M0 104 q20 -12 40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" strokeWidth="3" fill="none" />
      {Array.from({ length: 64 }, (_, i) => {
        const x = (i * 3.3) % 200, y = 107 + ((i * 37) % 17);
        const c = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#0ea5e9", "#a855f7", "#f472b6", "#facc15"][i % 8];
        return <rect key={i} x={x} y={y} width={2.2 + (i % 3)} height={1.6 + (i % 2)} fill={c} opacity=".85" transform={`rotate(${(i * 23) % 60 - 30} ${x} ${y})`} />;
      })}
      <path d="M0 118 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0" stroke="#fff" strokeWidth="1" fill="none" opacity=".6" />
      <Person x={96} y={100} s={1} color="#1e293b" opacity={0.75} />
      <Person x={101} y={100} s={0.95} color="#7c2d12" opacity={0.7} />
    </>
  ),

  /* Alhambra — la citadelle rouge au couchant, la Sierra Nevada enneigée */
  es_alhambra: (
    <>
      <defs>
        <linearGradient id="es-alh-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b3f7a" /><stop offset="45%" stopColor="#c7728a" /><stop offset="100%" stopColor="#ffc38a" />
        </linearGradient>
        <linearGradient id="es-alh-wall" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e0864f" /><stop offset="55%" stopColor="#c56a3c" /><stop offset="100%" stopColor="#8f4726" />
        </linearGradient>
        <linearGradient id="es-alh-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f5a38" /><stop offset="100%" stopColor="#223523" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-alh-sky)" />
      <Sun cx={30} cy={60} r={7} color="#ffe9c2" glow="#ff8a5c" />

      {/* La Sierra Nevada, enneigée, rosie par le couchant */}
      <path d="M40 58 L70 34 L84 42 L104 26 L126 40 L146 30 L176 50 L200 44 V70 H40 Z" fill="#a98bab" />
      <path d="M70 34 L76 40 L72 41 L80 44 L84 42 Z M104 26 L112 33 L106 34 L116 38 L126 40 Z M146 30 L154 37 L150 38 L162 42 Z" fill="#fde2e4" />
      <Haze y={52} h={18} color="#f5c6b3" opacity={0.35} />

      {/* La colline de la Sabika et la forteresse */}
      <path d="M0 96 q40 -30 100 -34 q70 2 100 26 V130 H0 Z" fill="url(#es-alh-hill)" />
      <path d="M22 84 L178 84 L178 70 L22 72 Z" fill="url(#es-alh-wall)" />
      {Array.from({ length: 26 }, (_, i) => <rect key={i} x={24 + i * 6} y={i % 2 ? 69 : 70} width="3" height="2.4" fill="#c56a3c" />)}
      {/* La tour de Comares et ses sœurs */}
      <rect x="48" y="52" width="16" height="32" fill="url(#es-alh-wall)" />
      {[49, 53, 57, 61].map((x) => <rect key={x} x={x} y="50" width="2.4" height="2.4" fill="#c56a3c" />)}
      <rect x="52" y="60" width="2" height="4" rx="1" fill="#3f1f10" /><rect x="58" y="60" width="2" height="4" rx="1" fill="#3f1f10" />
      <rect x="90" y="62" width="10" height="22" fill="#d07644" />
      <rect x="140" y="58" width="12" height="26" fill="url(#es-alh-wall)" />
      <rect x="143" y="64" width="2" height="3.6" rx="1" fill="#3f1f10" />
      <path d="M112 72 h22 v-6 h-22 Z" fill="#e8e1d2" />
      <path d="M114 66 q9 -8 18 0" fill="#b07a54" />
      {[116, 121, 126, 131].map((x) => <rect key={x} x={x} y="68" width="2" height="4" rx="1" fill="#6b4a2b" />)}
      {/* Cyprès du Generalife */}
      {[[12, 90, 18], [18, 92, 22], [184, 88, 20], [190, 90, 16], [76, 84, 14], [168, 84, 14]].map(([x, y, h], i) => <Cypress key={i} x={x} y={y} h={h} />)}

      {/* L'Albaicín : maisons blanches au premier plan */}
      <path d="M0 130 V112 h14 l6 -4 l6 4 h18 l4 -3 l4 3 h20 v18 Z" fill="#f4efe6" />
      <path d="M120 130 V110 h20 l5 -4 l5 4 h16 l4 -3 l4 3 h26 v20 Z" fill="#efe8dc" />
      <path d="M0 112 h14 l6 -4 l6 4 h18 l4 -3 l4 3 h20 M120 110 h20 l5 -4 l5 4 h16 l4 -3 l4 3 h26" stroke="#c2724a" strokeWidth="1.6" fill="none" />
      {[8, 30, 52, 128, 150, 172, 190].map((x, i) => <rect key={i} x={x} y={118 + (i % 2) * 3} width="3" height="4" fill="#6b4a2b" opacity=".7" />)}
      <Person x={96} y={128} s={1.1} color="#2b1d2a" opacity={0.75} />
      <Birds x={120} y={24} s={0.8} color="#3b2140" opacity={0.4} />
    </>
  ),

  /* Mezquita de Córdoba — la forêt d'arcs rouges et blancs */
  es_mezquita: (
    <>
      <defs>
        <radialGradient id="es-mez-glow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#ffd9a0" /><stop offset="55%" stopColor="#b8733f" /><stop offset="100%" stopColor="#3a1f10" />
        </radialGradient>
        <linearGradient id="es-mez-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a5a36" /><stop offset="100%" stopColor="#3a2414" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-mez-glow)" />
      <rect x="0" y="96" width="200" height="34" fill="url(#es-mez-floor)" />
      {/* Quatre rangées d'arcs, de la plus lointaine à la plus proche */}
      {[
        { y: 70, h: 22, w: 14, n: 13, o: 0.55, col: 1.2 },
        { y: 64, h: 30, w: 20, n: 10, o: 0.7, col: 1.8 },
        { y: 54, h: 42, w: 30, n: 7, o: 0.85, col: 2.6 },
        { y: 36, h: 62, w: 48, n: 5, o: 1, col: 4 },
      ].map((row, r) => {
        const x0 = 100 - (row.n * row.w) / 2;
        return (
          <g key={r} opacity={row.o}>
            {Array.from({ length: row.n }, (_, i) => {
              const x = x0 + i * row.w;
              const stripes = 9;
              return (
                <g key={i}>
                  {/* claveaux alternés, brique rouge et pierre claire */}
                  {Array.from({ length: stripes }, (_, k) => {
                    const a0 = Math.PI + (k / stripes) * Math.PI, a1 = Math.PI + ((k + 1) / stripes) * Math.PI;
                    const cx = x + row.w / 2, cy = row.y + row.w * 0.45, R = row.w * 0.5, r2 = row.w * 0.34;
                    const p = (a, rr) => `${cx + Math.cos(a) * rr} ${cy + Math.sin(a) * rr}`;
                    return <path key={k} d={`M${p(a0, R)} A${R} ${R} 0 0 1 ${p(a1, R)} L${p(a1, r2)} A${r2} ${r2} 0 0 0 ${p(a0, r2)} Z`} fill={k % 2 ? "#f1e2c4" : "#b8452e"} />;
                  })}
                  <rect x={x - row.col / 2} y={row.y + row.w * 0.45} width={row.col} height={row.h - row.w * 0.45} fill="#d9c6a4" />
                  <rect x={x - row.col / 2} y={row.y + row.w * 0.45} width={row.col / 2} height={row.h - row.w * 0.45} fill="#a8916c" />
                </g>
              );
            })}
            <rect x={x0 + row.n * row.w - row.col / 2} y={row.y + row.w * 0.45} width={row.col} height={row.h - row.w * 0.45} fill="#d9c6a4" />
          </g>
        );
      })}
      {/* Les lampes suspendues */}
      {[40, 100, 160].map((x) => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="22" stroke="#3a2414" strokeWidth=".6" />
          <path d={`M${x - 4} 22 h8 l-2 5 h-4 Z`} fill="#c99a4a" />
          <circle cx={x} cy="28" r="6" fill="#ffd27a" opacity=".25" />
        </g>
      ))}
      <path d="M0 96 L60 108 L0 130 Z M200 96 L140 108 L200 130 Z" fill="#000" opacity=".15" />
      <Person x={100} y={118} s={1.4} color="#1c0f06" opacity={0.7} />
    </>
  ),

  /* Plaza de España — le demi-cercle de brique, le canal et une barque */
  es_plazaespana: (
    <>
      <defs>
        <linearGradient id="es-pde-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f7fd1" /><stop offset="100%" stopColor="#bfe0f7" />
        </linearGradient>
        <linearGradient id="es-pde-brick" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9794f" /><stop offset="100%" stopColor="#a24b2a" />
        </linearGradient>
        <linearGradient id="es-pde-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c9fbf" /><stop offset="100%" stopColor="#2c5f7c" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-pde-sky)" />
      <Cloud x={52} y={18} s={0.9} opacity={0.85} />
      <Cloud x={150} y={14} s={0.7} opacity={0.7} />

      {/* Le bâtiment en demi-cercle et ses deux tours */}
      <path d="M8 84 Q100 50 192 84 V92 Q100 60 8 92 Z" fill="url(#es-pde-brick)" />
      <path d="M8 84 Q100 50 192 84" stroke="#f0d6b0" strokeWidth="1.4" fill="none" />
      {Array.from({ length: 24 }, (_, i) => {
        const t = i / 23, x = 12 + t * 176, y = 84 - Math.sin(t * Math.PI) * 26;
        return <path key={i} d={`M${x - 2.4} ${y + 7} v-3.2 q2.4 -3 4.8 0 v3.2 Z`} fill="#6b2d18" opacity=".75" />;
      })}
      {[[18, 40], [174, 40]].map(([x, top]) => (
        <g key={x}>
          <rect x={x - 5} y={top} width="10" height="46" fill="url(#es-pde-brick)" />
          <rect x={x - 6} y={top - 3} width="12" height="4" fill="#f0d6b0" />
          <path d={`M${x - 4} ${top - 3} q4 -10 8 0 Z`} fill="#c7663f" />
          <circle cx={x} cy={top - 11} r="1.8" fill="#f0d6b0" />
          {[8, 16, 24, 32].map((d) => <rect key={d} x={x - 1.4} y={top + d} width="2.8" height="4" rx="1.4" fill="#6b2d18" />)}
        </g>
      ))}
      <path d="M88 60 h24 v10 h-24 Z" fill="#c9683f" />
      <path d="M92 60 q8 -8 16 0" fill="#a24b2a" />

      {/* La place, le canal et les ponts à balustres de céramique */}
      <path d="M0 92 Q100 64 200 92 V130 H0 Z" fill="#e8d3b3" />
      <path d="M0 104 Q100 78 200 104 V114 Q100 90 0 114 Z" fill="url(#es-pde-water)" />
      {[[48, 96], [100, 84], [152, 96]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x - 9} ${y + 4} q9 -8 18 0 v2 h-18 Z`} fill="#f3eadb" />
          {Array.from({ length: 6 }, (_, k) => <rect key={k} x={x - 8 + k * 3} y={y - 1} width="1.6" height="3.2" fill={k % 2 ? "#1d4ed8" : "#f8fafc"} />)}
          <rect x={x - 9} y={y - 2} width="18" height="1.4" fill="#1d4ed8" />
        </g>
      ))}
      <g>
        <path d="M112 104 h14 l-2 3 h-10 Z" fill="#8a4b2a" />
        <Person x={119} y={104} s={0.9} color="#1e293b" opacity={0.8} />
        <path d="M112 106 q-5 1 -9 -2" stroke="#fff" strokeWidth=".6" fill="none" opacity=".6" />
      </g>
      {/* Bancs de céramique des provinces */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={6 + i * 22} y={122 - Math.abs(4 - i)} width="14" height="5" rx="1" fill={i % 2 ? "#f59e0b" : "#1d4ed8"} opacity=".85" />
      ))}
      <Person x={70} y={122} s={1} color="#3f1f10" opacity={0.7} />
      <Birds x={96} y={30} s={0.7} color="#1e3a5f" opacity={0.4} />
    </>
  ),

  /* La Giralda — l'ancien minaret au-dessus des orangers */
  es_giralda: (
    <>
      <defs>
        <linearGradient id="es-gir-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f5fa8" /><stop offset="100%" stopColor="#9ccaf0" />
        </linearGradient>
        <linearGradient id="es-gir-brick" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f0b27a" /><stop offset="58%" stopColor="#d88c55" /><stop offset="100%" stopColor="#a86034" />
        </linearGradient>
        <linearGradient id="es-gir-cath" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e9d8b8" /><stop offset="100%" stopColor="#b9a27c" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-gir-sky)" />
      <Sun cx={160} cy={24} r={8} color="#fffbe6" glow="#ffe08a" />
      <Cloud x={40} y={26} s={0.8} opacity={0.7} />

      {/* La cathédrale gothique, ses pinacles et arcs-boutants */}
      <path d="M0 76 H118 V112 H0 Z" fill="url(#es-gir-cath)" />
      {Array.from({ length: 14 }, (_, i) => (
        <g key={i}>
          <path d={`M${4 + i * 8} 76 l2 -9 l2 9 Z`} fill="#d9c6a4" />
          <path d={`M${3 + i * 8} 88 q3 -10 6 0`} stroke="#9c8663" strokeWidth=".8" fill="none" />
        </g>
      ))}
      <path d="M14 112 V96 q6 -10 12 0 V112 Z M40 112 V92 q7 -12 14 0 V112 Z M72 112 V96 q6 -10 12 0 V112 Z" fill="#6b5a44" opacity=".7" />
      <circle cx="47" cy="84" r="4" fill="#7d6a52" /><circle cx="47" cy="84" r="2.6" fill="#c9a24a" opacity=".7" />

      {/* La tour : fût almohade en brique, clocher Renaissance, Giraldillo */}
      <rect x="126" y="46" width="24" height="70" fill="url(#es-gir-brick)" />
      {[54, 70, 86].map((y) => (
        <g key={y}>
          <path d={`M129 ${y + 12} l4 -5 l4 5 l4 -5 l4 5 l4 -5 l2 3`} stroke="#b0673a" strokeWidth=".8" fill="none" />
          <rect x="135.5" y={y} width="5" height="8" rx="2.5" fill="#6b3a1e" />
        </g>
      ))}
      <rect x="124" y="42" width="28" height="5" fill="#f3e3c8" />
      <rect x="128" y="26" width="20" height="16" fill="#f3e3c8" />
      {[130, 136, 142].map((x) => <path key={x} d={`M${x} 40 v-9 q2 -3 4 0 v9 Z`} fill="#6b3a1e" />)}
      <rect x="131" y="18" width="14" height="8" fill="#ead2a8" />
      <rect x="134" y="11" width="8" height="7" fill="#f3e3c8" />
      <path d="M134 11 q4 -6 8 0 Z" fill="#d88c55" />
      <path d="M138 5 v-3 M136 3 q3 -3 5 0" stroke="#3f3a2a" strokeWidth="1" fill="none" />
      <path d="M137 5 l3 -2 l1 2 Z" fill="#2e2a20" />

      {/* Orangers et calèche au premier plan */}
      <rect x="0" y="112" width="200" height="18" fill="#e5cfa6" />
      {[[10, 118], [34, 120], [60, 117], [168, 119], [190, 117]].map(([x, y], i) => <OrangeTree key={i} x={x} y={y} s={1.2} />)}
      <g>
        <rect x="92" y="112" width="16" height="7" rx="1" fill="#1f2937" />
        <circle cx="96" cy="121" r="3" fill="none" stroke="#b91c1c" strokeWidth="1" />
        <circle cx="106" cy="121" r="3" fill="none" stroke="#b91c1c" strokeWidth="1" />
        <path d="M110 113 h8 l3 -4 l2 1 l-2 3 v6 M116 113 v6" stroke="#6b4a2b" strokeWidth="1.6" fill="none" />
        <Person x={98} y={112} s={0.9} color="#111827" opacity={0.85} />
      </g>
      <Birds x={96} y={20} s={0.8} color="#1e3a5f" opacity={0.4} />
    </>
  ),

  /* Plaza Mayor — arcades ocre, façade peinte de la Panadería, Philippe III */
  es_plazamayor: (
    <>
      <defs>
        <linearGradient id="es-pma-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f86c6" /><stop offset="100%" stopColor="#f3d3b0" />
        </linearGradient>
        <linearGradient id="es-pma-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8573a" /><stop offset="100%" stopColor="#9e3e28" />
        </linearGradient>
        <linearGradient id="es-pma-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9a58a" /><stop offset="100%" stopColor="#7d6b55" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-pma-sky)" />
      <Cloud x={70} y={12} s={0.8} color="#fde8d2" opacity={0.6} />

      {/* Les deux ailes en perspective */}
      <path d="M0 18 L52 44 V96 L0 116 Z" fill="url(#es-pma-wall)" />
      <path d="M200 18 L148 44 V96 L200 116 Z" fill="url(#es-pma-wall)" />
      {Array.from({ length: 4 }, (_, r) => Array.from({ length: 5 }, (_, i) => {
        const x = 4 + i * 9.5, t = x / 52, y0 = 20 + t * 26, y1 = 116 - t * 20;
        const y = y0 + (r + 0.6) * ((y1 - y0) / 5.4);
        return (
          <g key={`${r}-${i}`}>
            <rect x={x} y={y} width="4" height={6 - t * 2} fill="#3b2418" />
            <rect x={x - 0.6} y={y + 6 - t * 2} width="5.2" height=".9" fill="#1f2937" />
            <rect x={196 - x} y={y} width="4" height={6 - t * 2} fill="#3b2418" />
            <rect x={195.4 - x} y={y + 6 - t * 2} width="5.2" height=".9" fill="#1f2937" />
          </g>
        );
      }))}
      {/* La Casa de la Panadería, au fond, avec ses flèches d'ardoise */}
      <rect x="52" y="44" width="96" height="52" fill="#d0643f" />
      <rect x="64" y="50" width="72" height="34" fill="#e7b889" />
      {[[70, 56, "#8f4d8f"], [84, 58, "#2563eb"], [100, 54, "#d97706"], [116, 58, "#16a34a"], [128, 56, "#b91c1c"]].map(([x, y, c], i) => (
        <g key={i}>
          <ellipse cx={x} cy={y + 8} rx="4" ry="7" fill={c} opacity=".75" />
          <circle cx={x} cy={y + 2} r="2.4" fill="#f4d6b0" />
        </g>
      ))}
      <path d="M56 44 V30 l6 -10 l6 10 V44 Z M132 44 V30 l6 -10 l6 10 V44 Z" fill="#374151" />
      <rect x="57" y="30" width="10" height="2" fill="#6b7280" /><rect x="133" y="30" width="10" height="2" fill="#6b7280" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${54 + i * 10.6} 96 v-7 q5 -6 10 0 v7 Z`} fill="#3b2418" />
      ))}
      {/* Le pavé et la statue équestre */}
      <path d="M0 116 L52 96 H148 L200 116 V130 H0 Z" fill="url(#es-pma-ground)" />
      {Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${i * 18} 130 L${60 + i * 7} 96`} stroke="#6b5a44" strokeWidth=".4" opacity=".5" />)}
      <rect x="92" y="100" width="16" height="10" fill="#9ca3af" />
      <rect x="90" y="108" width="20" height="3" fill="#6b7280" />
      <path d="M94 100 q2 -8 8 -8 l4 -3 l2 2 l-3 2 q3 4 1 7 Z" fill="#2d3a36" />
      <path d="M97 99 l1 -3 M104 99 l1 -3" stroke="#2d3a36" strokeWidth="1.2" />
      <circle cx="100" cy="86" r="1.8" fill="#2d3a36" /><path d="M99 88 h2 v4 h-2 Z" fill="#2d3a36" />
      {[[30, 124], [40, 122], [150, 124], [164, 121], [76, 116], [128, 118]].map(([x, y], i) => (
        <Person key={i} x={x} y={y} s={1} color={["#1e293b", "#7c2d12", "#1e3a8a"][i % 3]} opacity={0.75} />
      ))}
      <g opacity=".9">
        <rect x="16" y="112" width="18" height="2" fill="#f5f0e6" /><path d="M18 112 v-6 h14 v6" stroke="#b91c1c" strokeWidth="1" fill="#fecaca" />
        <rect x="166" y="112" width="18" height="2" fill="#f5f0e6" /><path d="M168 112 v-6 h14 v6" stroke="#b91c1c" strokeWidth="1" fill="#fecaca" />
      </g>
    </>
  ),

  /* Museo del Prado — la façade de Villanueva et Velázquez devant */
  es_prado: (
    <>
      <defs>
        <linearGradient id="es-pra-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a6e" /><stop offset="55%" stopColor="#6b7fb8" /><stop offset="100%" stopColor="#f2b58a" />
        </linearGradient>
        <linearGradient id="es-pra-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#efe6d4" /><stop offset="100%" stopColor="#c9b99c" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-pra-sky)" />
      <circle cx="170" cy="20" r="4" fill="#fdf4dc" opacity=".9" />

      {/* Corps de brique et avant-corps de pierre à colonnes */}
      <rect x="8" y="48" width="184" height="50" fill="#b0583c" />
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <rect x={14 + i * 15} y="56" width="6" height="12" rx="3" fill="#3b2418" opacity=".85" />
          <rect x={14 + i * 15} y="76" width="6" height="12" fill="#3b2418" opacity=".85" />
          <rect x={15 + i * 15} y="77" width="4" height="10" fill="#f6c16b" opacity=".45" />
        </g>
      ))}
      <rect x="62" y="36" width="76" height="62" fill="url(#es-pra-stone)" />
      <path d="M58 36 h84 l-4 -6 h-76 Z" fill="#e3d6bd" />
      <rect x="62" y="40" width="76" height="4" fill="#d7c8aa" />
      {[68, 78, 88, 98, 108, 118, 128].map((x) => (
        <g key={x}>
          <rect x={x} y="44" width="4.4" height="44" fill="#f4ecdc" />
          <rect x={x + 2.6} y="44" width="1.8" height="44" fill="#cdbd9f" />
          <rect x={x - 1} y="44" width="6.4" height="2" fill="#e3d6bd" />
        </g>
      ))}
      <rect x="62" y="88" width="76" height="10" fill="#d7c8aa" />
      <path d="M92 98 v-10 q8 -8 16 0 v10 Z" fill="#3b2418" />
      <path d="M94 98 v-9 q6 -6 12 0 v9" fill="#f6c16b" opacity=".4" />

      {/* Le parvis, les arbres et la statue de Velázquez */}
      <rect x="0" y="98" width="200" height="32" fill="#c9b99c" />
      <path d="M0 110 H200" stroke="#a8977a" strokeWidth=".6" />
      <TreeLine fill="#2f4a2c" trees={[[6, 94, 10], [20, 98, 8], [182, 96, 10], [196, 92, 9]]} />
      <rect x="95" y="104" width="10" height="16" fill="#9ca3af" />
      <rect x="93" y="118" width="14" height="3" fill="#6b7280" />
      <path d="M97 104 q3 -12 6 0 Z" fill="#2d3a36" />
      <circle cx="100" cy="92" r="2" fill="#2d3a36" />
      <path d="M98 94 h4 l1 10 h-6 Z" fill="#2d3a36" />
      <path d="M102 96 l4 -2" stroke="#2d3a36" strokeWidth="1" />
      {[[40, 124], [48, 122], [150, 125], [160, 123], [130, 116]].map(([x, y], i) => (
        <Person key={i} x={x} y={y} s={1} color={i % 2 ? "#1e293b" : "#5b2a1a"} opacity={0.75} />
      ))}
      {/* Réverbères allumés */}
      {[30, 170].map((x) => (
        <g key={x}>
          <rect x={x - 0.6} y="104" width="1.2" height="18" fill="#1f2937" />
          <circle cx={x} cy="103" r="2" fill="#fde68a" /><circle cx={x} cy="103" r="5" fill="#fde68a" opacity=".2" />
        </g>
      ))}
    </>
  ),

  /* Palacio Real — la façade blanche au soleil couchant, la place de l'Orient */
  es_palacio: (
    <>
      <defs>
        <linearGradient id="es-pal-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5fa0" /><stop offset="50%" stopColor="#e89a78" /><stop offset="100%" stopColor="#ffd6a0" />
        </linearGradient>
        <linearGradient id="es-pal-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff5e4" /><stop offset="60%" stopColor="#f0dcc0" /><stop offset="100%" stopColor="#c9ae8c" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-pal-sky)" />
      <Sun cx={176} cy={56} r={8} color="#fff0d0" glow="#ff9a5c" />
      <Cloud x={40} y={22} s={1} color="#f6c8b4" opacity={0.5} />

      {/* Le palais : soubassement, étages à pilastres, balustrade à statues */}
      <rect x="10" y="44" width="180" height="56" fill="url(#es-pal-stone)" />
      <rect x="10" y="84" width="180" height="16" fill="#e6d3b5" />
      {Array.from({ length: 21 }, (_, i) => (
        <g key={i}>
          <rect x={14 + i * 8.4} y="52" width="3.8" height="9" fill="#5a4a3a" opacity=".7" />
          <path d={`M${13.6 + i * 8.4} 51.5 h4.6 l-2.3 -2.4 Z`} fill="#e6d3b5" />
          <rect x={14 + i * 8.4} y="68" width="3.8" height="10" fill="#5a4a3a" opacity=".7" />
          <rect x={14 + i * 8.4} y="88" width="3.8" height="8" rx="1.9" fill="#5a4a3a" opacity=".6" />
        </g>
      ))}
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={19 + i * 17.2} y="44" width="2" height="40" fill="#fff9ee" opacity=".7" />)}
      <rect x="8" y="40" width="184" height="4" fill="#e6d3b5" />
      {Array.from({ length: 30 }, (_, i) => <rect key={i} x={10 + i * 6.1} y="36" width="2" height="4" fill="#e6d3b5" />)}
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <rect x={12 + i * 16} y="31" width="3" height="5" fill="#d8c3a2" />
          <circle cx={13.5 + i * 16} cy="30" r="1.4" fill="#d8c3a2" />
        </g>
      ))}
      <path d="M80 40 h40 l-4 -10 h-32 Z" fill="#efe0c6" />
      <path d="M86 30 h28 l-14 -8 Z" fill="#e0caa6" />
      <rect x="96" y="30" width="8" height="10" fill="#b91c1c" opacity=".7" />
      <path d="M100 22 v-6" stroke="#6b5a44" strokeWidth=".8" />
      <path d="M100 16 h5 v3 h-5 Z" fill="#dc2626" /><path d="M100 17 h5 v1 h-5 Z" fill="#facc15" />

      {/* La place de l'Orient : haies taillées, statues de rois */}
      <rect x="0" y="100" width="200" height="30" fill="#b7a07e" />
      {[[20, 112], [60, 110], [140, 110], [180, 112]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 12} y={y} width="24" height="7" rx="3" fill="#355a32" />
          <rect x={x - 12} y={y} width="24" height="3" rx="2" fill="#467a42" />
        </g>
      ))}
      {[36, 76, 124, 164].map((x) => (
        <g key={x}>
          <rect x={x - 2} y="104" width="4" height="7" fill="#d6ccbc" />
          <circle cx={x} cy="102" r="1.8" fill="#d6ccbc" />
        </g>
      ))}
      <Person x={100} y={122} s={1} color="#1e293b" opacity={0.75} />
      <Person x={104} y={122} s={0.95} color="#7c2d12" opacity={0.7} />
      <Birds x={52} y={14} s={0.8} color="#3b2140" opacity={0.4} />
    </>
  ),

  /* Toledo — la ville sur son rocher, dans la boucle du Tage */
  es_toledo: (
    <>
      <defs>
        <linearGradient id="es-tol-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a4a8a" /><stop offset="45%" stopColor="#e8906a" /><stop offset="100%" stopColor="#ffd59a" />
        </linearGradient>
        <linearGradient id="es-tol-rock" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b98a5a" /><stop offset="100%" stopColor="#6b4a2b" />
        </linearGradient>
        <linearGradient id="es-tol-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e3b07e" /><stop offset="100%" stopColor="#4a6a70" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-tol-sky)" />
      <Sun cx={30} cy={48} r={8} color="#fff0d0" glow="#ff8a4c" />

      {/* Le rocher et la ville ocre */}
      <path d="M0 94 q30 -30 70 -34 q40 -6 70 4 q40 8 60 30 V110 H0 Z" fill="url(#es-tol-rock)" />
      {Array.from({ length: 34 }, (_, i) => {
        const x = 18 + i * 5, y = 70 + Math.abs(Math.sin(i * 0.9)) * 10 + Math.abs(i - 17) * 0.6;
        return (
          <g key={i}>
            <rect x={x} y={y} width="5" height={7 + (i % 3)} fill={i % 4 === 0 ? "#e8cf9f" : i % 3 ? "#d9b27a" : "#c99a62"} />
            <path d={`M${x - 0.4} ${y} h5.8 l-2.9 -2 Z`} fill="#a3552e" />
            <rect x={x + 1.6} y={y + 3} width="1.4" height="2" fill="#5b3a1e" opacity=".6" />
          </g>
        );
      })}
      {/* L'Alcázar : un carré à quatre tours */}
      <rect x="132" y="48" width="30" height="22" fill="#e6c89a" />
      <rect x="130" y="40" width="7" height="30" fill="#dcb987" /><rect x="157" y="40" width="7" height="30" fill="#dcb987" />
      <path d="M130 40 l3.5 -7 l3.5 7 Z M157 40 l3.5 -7 l3.5 7 Z" fill="#475569" />
      {[138, 144, 150].map((x) => <rect key={x} x={x} y="54" width="3" height="5" fill="#5b3a1e" opacity=".7" />)}
      {/* La cathédrale et sa flèche */}
      <rect x="74" y="50" width="26" height="20" fill="#ead3a6" />
      <rect x="80" y="30" width="7" height="22" fill="#e2c894" />
      <path d="M80 30 l3.5 -14 l3.5 14 Z" fill="#6b7280" />
      <path d="M81 38 h5 M81 44 h5" stroke="#b08a5a" strokeWidth=".8" />

      {/* Le Tage et le pont d'Alcántara */}
      <path d="M0 110 q60 -8 110 2 q50 10 90 0 V130 H0 Z" fill="url(#es-tol-river)" />
      <path d="M0 114 q60 -8 110 2 q50 10 90 0" stroke="#ffe0b0" strokeWidth=".8" fill="none" opacity=".5" />
      <path d="M20 108 h46 v6 h-46 Z" fill="#b08255" />
      <path d="M26 114 q10 -10 20 0 Z M48 114 q6 -6 12 0 Z" fill="#4a6a70" />
      <rect x="40" y="100" width="6" height="8" fill="#a3703f" />
      <path d="M40 100 h6 l-3 -4 Z" fill="#a3552e" />
      {/* Premier plan : oliviers et un promeneur */}
      <path d="M150 130 q20 -14 50 -12 V130 Z" fill="#3f4a2a" />
      <TreeLine fill="#5b6b3a" trees={[[160, 120, 6], [174, 116, 7], [190, 118, 6]]} />
      <Person x={152} y={124} s={1.1} color="#2b1d2a" opacity={0.75} />
      <Birds x={100} y={26} s={0.8} color="#3b2140" opacity={0.4} />
    </>
  ),

  /* Acueducto de Segovia — deux étages d'arches en granit, sans mortier */
  es_segovia: (
    <>
      <defs>
        <linearGradient id="es-seg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b6cb0" /><stop offset="100%" stopColor="#cfe6f7" />
        </linearGradient>
        <linearGradient id="es-seg-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9b89c" /><stop offset="60%" stopColor="#a8967a" /><stop offset="100%" stopColor="#7d6e58" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-seg-sky)" />
      <Cloud x={150} y={20} s={1} opacity={0.85} />
      <Cloud x={40} y={14} s={0.7} opacity={0.7} />
      {/* La sierra de Guadarrama au loin */}
      <path d="M0 70 L30 58 L56 66 L90 52 L120 64 L150 54 L200 66 V80 H0 Z" fill="#8aa0b8" opacity=".6" />

      {/* L'aqueduc : un seul mur de granit, les arches découpées dedans
          par un masque, en perspective vers la droite. */}
      {(() => {
        const n = 10, ratio = 0.9, sum = (1 - ratio ** n) / (1 - ratio), w0 = 204 / sum;
        const xs = [-2]; for (let k = 0; k < n; k++) xs.push(xs[k] + w0 * ratio ** k);
        const yt = (x) => 24 + 18 * x / 200, ym = (x) => 62 + 8 * x / 200, yb = (x) => 113 - 8 * x / 200;
        const holes = [], joints = [];
        for (let k = 0; k < n; k++) {
          const a = xs[k], b = xs[k + 1], w = b - a, p = w * 0.26, l = a + p / 2, r = b - p / 2, c = (l + r) / 2, rad = (r - l) / 2;
          const topLow = ym(c) + (yb(c) - ym(c)) * 0.16 + rad;
          holes.push(<path key={`l${k}`} d={`M${l} ${yb(c) + 2} V${topLow} A${rad} ${rad} 0 0 1 ${r} ${topLow} V${yb(c) + 2} Z`} fill="#000" />);
          const topUp = yt(c) + (ym(c) - yt(c)) * 0.34 + rad * 0.8;
          holes.push(<path key={`u${k}`} d={`M${l + p * 0.15} ${ym(c) - 2} V${topUp} A${rad - p * 0.15} ${rad * 0.8} 0 0 1 ${r - p * 0.15} ${topUp} V${ym(c) - 2} Z`} fill="#000" />);
          for (let q = 1; q < 12; q++) joints.push(<line key={`j${k}-${q}`} x1={a} y1={yt(a) + q * (yb(a) - yt(a)) / 12} x2={b} y2={yt(b) + q * (yb(b) - yt(b)) / 12} stroke="#6f614d" strokeWidth=".35" opacity=".5" />);
        }
        return (
          <>
            <defs>
              <mask id="es-seg-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="130">
                <rect x="0" y="0" width="200" height="130" fill="#fff" />
                {holes}
              </mask>
            </defs>
            <g mask="url(#es-seg-mask)">
              <path d="M-2 22 L202 40 L202 106 L-2 115 Z" fill="url(#es-seg-stone)" />
              {joints}
              <path d="M-2 60 L202 69 L202 72 L-2 64 Z" fill="#8a7a62" opacity=".7" />
              {xs.map((x, k) => <line key={k} x1={x} y1={yt(x)} x2={x} y2={yb(x)} stroke="#7d6e58" strokeWidth=".5" opacity=".5" />)}
            </g>
            <path d="M-2 20 L202 38 L202 42 L-2 25 Z" fill="#b5a386" />
          </>
        );
      })()}

      {/* La place de l'Azoguejo, maisons et passants */}
      <rect x="0" y="112" width="200" height="18" fill="#d6c7ad" />
      <path d="M0 112 h26 v-14 l6 -4 l6 4 v14 h20 v-10 h24 v10" fill="#e8d9bf" stroke="#b7784a" strokeWidth="1.2" />
      <path d="M150 112 v-12 h22 v12 M176 112 v-16 l6 -4 l6 4 v16" fill="#e2cfae" stroke="#b7784a" strokeWidth="1.2" />
      {[[70, 124], [80, 122], [118, 125], [132, 123], [100, 126]].map(([x, y], i) => (
        <Person key={i} x={x} y={y} s={1.1} color={i % 2 ? "#1e293b" : "#7c2d12"} opacity={0.75} />
      ))}
      <Birds x={120} y={12} s={0.8} color="#1e3a5f" opacity={0.4} />
    </>
  ),

  /* Santiago de Compostela — la façade de l'Obradoiro sous un ciel de pluie */
  es_santiago: (
    <>
      <defs>
        <linearGradient id="es-san-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b6b7d" /><stop offset="55%" stopColor="#a9b6c2" /><stop offset="100%" stopColor="#f0e2c4" />
        </linearGradient>
        <linearGradient id="es-san-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c7b48f" /><stop offset="55%" stopColor="#a9966f" /><stop offset="100%" stopColor="#7a6a4f" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-san-sky)" />
      <Cloud x={40} y={18} s={1.4} color="#7c8a9b" opacity={0.7} />
      <Cloud x={160} y={14} s={1.2} color="#8a98a8" opacity={0.6} />
      <path d="M150 4 l-40 60" stroke="#fff6d6" strokeWidth="14" opacity=".12" />
      {Array.from({ length: 14 }, (_, i) => <line key={i} x1={10 + i * 14} y1={30 + (i % 3) * 4} x2={6 + i * 14} y2={40 + (i % 3) * 4} stroke="#dbe4ee" strokeWidth=".5" opacity=".5" />)}

      {/* Les deux tours baroques et la façade centrale */}
      {[56, 144].map((cx) => (
        <g key={cx}>
          <rect x={cx - 11} y="34" width="22" height="66" fill="url(#es-san-stone)" />
          <rect x={cx - 9} y="20" width="18" height="16" fill="#b8a47f" />
          <rect x={cx - 6} y="10" width="12" height="11" fill="#c4b18b" />
          <path d={`M${cx - 4} 10 q4 -8 8 0 Z`} fill="#9c8a66" />
          <path d={`M${cx} 2 v-2 M${cx - 1.6} 0 h3.2`} stroke="#6b5a44" strokeWidth=".8" />
          <rect x={cx - 3} y="24" width="6" height="9" rx="3" fill="#4a3f30" />
          <rect x={cx - 3} y="46" width="6" height="12" rx="3" fill="#4a3f30" />
          {[36, 60, 80].map((y) => <rect key={y} x={cx - 12} y={y} width="24" height="1.6" fill="#8a7a5c" />)}
          {[-12, 10].map((d) => <circle key={d} cx={cx + d} cy="20" r="1.4" fill="#b8a47f" />)}
        </g>
      ))}
      <rect x="67" y="46" width="66" height="54" fill="#b8a47f" />
      <path d="M67 46 L100 22 L133 46 Z" fill="#a9966f" />
      <circle cx="100" cy="30" r="2.4" fill="#8a7a5c" />
      <rect x="84" y="52" width="32" height="30" fill="#3f3a2e" opacity=".85" />
      <path d="M84 52 h32 M100 52 v30 M84 67 h32" stroke="#c9b89c" strokeWidth=".8" />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={70 + i * 8} y="84" width="2" height="16" fill="#d0bf9a" />)}
      {/* L'escalier double et la place de l'Obradoiro */}
      <path d="M58 100 h84 l14 12 H44 Z" fill="#9c8a66" />
      <path d="M52 106 h96 M48 110 h104" stroke="#7a6a4f" strokeWidth=".6" />
      <rect x="0" y="112" width="200" height="18" fill="#a4957a" />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={i * 20} y="112" width="19.4" height="18" fill="none" stroke="#8a7c62" strokeWidth=".5" />)}
      {/* Pèlerins : sac, bâton, coquille */}
      {[[40, 126], [160, 126], [130, 124]].map(([x, y], i) => (
        <g key={i}>
          <Person x={x} y={y} s={1.3} color="#1f2937" opacity={0.85} />
          <rect x={x + 0.6} y={y - 9} width="3" height="4" rx="1" fill="#b45309" />
          <line x1={x - 2.4} y1={y - 12} x2={x - 3} y2={y + 2} stroke="#6b4a2b" strokeWidth=".7" />
        </g>
      ))}
      <g transform="translate(100 124)">
        <path d="M0 -6 C-6 -6 -8 0 0 4 C8 0 6 -6 0 -6 Z" fill="#f5e6c8" />
        {[-4, -2, 0, 2, 4].map((d) => <line key={d} x1="0" y1="3" x2={d} y2="-5" stroke="#c9a060" strokeWidth=".4" />)}
      </g>
    </>
  ),

  /* Guggenheim Bilbao — les coques de titane au bord de la ria, et Puppy */
  es_guggenheim: (
    <>
      <defs>
        <linearGradient id="es-gug-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6d83a3" /><stop offset="100%" stopColor="#d9e1ea" />
        </linearGradient>
        <linearGradient id="es-gug-ti" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f6f8" /><stop offset="45%" stopColor="#b9c2cc" /><stop offset="100%" stopColor="#7c8794" />
        </linearGradient>
        <linearGradient id="es-gug-ti2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8ecf0" /><stop offset="100%" stopColor="#95a0ac" />
        </linearGradient>
        <linearGradient id="es-gug-ria" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8aa2b6" /><stop offset="100%" stopColor="#3f5a70" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-gug-sky)" />
      <Cloud x={50} y={20} s={1.2} color="#eef2f6" opacity={0.7} />
      <path d="M0 70 q40 -14 80 -8 q60 -18 120 0 V80 H0 Z" fill="#6e8a73" opacity=".7" />

      {/* Les volumes de titane, en pétales qui se chevauchent */}
      <path d="M60 92 C58 70 70 56 86 58 C92 44 108 40 118 50 C126 38 146 42 148 58 C160 60 166 74 160 92 Z" fill="url(#es-gug-ti)" />
      <path d="M86 58 C90 70 88 84 80 92 H60 C58 72 70 58 86 58 Z" fill="url(#es-gug-ti2)" />
      <path d="M118 50 C112 64 116 80 126 92 H140 C144 76 140 60 118 50 Z" fill="#dfe5ea" />
      <path d="M148 58 C142 70 144 82 152 92" stroke="#7c8794" strokeWidth="1" fill="none" />
      {Array.from({ length: 16 }, (_, i) => <path key={i} d={`M${64 + i * 6} ${60 + Math.abs(8 - i) * 2} q2 14 0 30`} stroke="#ffffff" strokeWidth=".4" fill="none" opacity=".45" />)}
      <rect x="92" y="70" width="18" height="22" fill="#9fb4c4" opacity=".55" />
      <path d="M92 70 h18 M92 78 h18 M92 86 h18 M98 70 v22 M104 70 v22" stroke="#e8eef3" strokeWidth=".4" />
      {/* Le pont de La Salve et sa grande arche rouge */}
      <path d="M150 46 L200 40 V44 L152 50 Z" fill="#5b6b7a" />
      <path d="M170 18 q12 10 22 26" stroke="#c0392b" strokeWidth="3" fill="none" />
      <path d="M172 20 l2 22 M180 24 l1 18 M188 32 l1 10" stroke="#c0392b" strokeWidth="1" />

      {/* La ria et le reflet */}
      <rect x="0" y="92" width="200" height="22" fill="url(#es-gug-ria)" />
      <path d="M60 92 C62 104 150 104 160 92 Z" fill="#c2cbd4" opacity=".3" />
      <Foam y={100} color="#e8eef3" opacity={0.2} />
      <Foam y={108} color="#e8eef3" opacity={0.15} offset={8} />
      {/* L'araignée Maman, sur le quai */}
      <g stroke="#2b2b2b" strokeWidth="1" fill="none">
        <path d="M34 80 q-10 -10 -16 12 M34 80 q-6 -14 -8 12 M34 80 q6 -14 10 12 M34 80 q12 -10 18 12" />
      </g>
      <ellipse cx="34" cy="80" rx="4" ry="3" fill="#2b2b2b" />
      {/* Puppy, le chien de fleurs, au premier plan */}
      <rect x="0" y="114" width="200" height="16" fill="#9aa5ae" />
      <g transform="translate(150 114)">
        <path d="M-14 0 q0 -18 8 -22 q4 -10 12 -6 q10 2 8 12 q8 6 4 16 Z" fill="#3f8f4f" />
        {Array.from({ length: 40 }, (_, i) => {
          const x = -12 + (i * 7) % 30, y = -2 - ((i * 11) % 26);
          return <circle key={i} cx={x} cy={y} r="1.3" fill={["#f472b6", "#facc15", "#f97316", "#ef4444", "#a855f7", "#ffffff"][i % 6]} />;
        })}
      </g>
      <Person x={124} y={126} s={1.1} color="#1e293b" opacity={0.75} />
      <Person x={129} y={126} s={1} color="#7c2d12" opacity={0.7} />
    </>
  ),

  /* Puente Nuevo de Ronda — le pont au-dessus du gouffre du Tajo */
  es_ronda: (
    <>
      <defs>
        <linearGradient id="es-ron-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6f8fc4" /><stop offset="55%" stopColor="#f2c290" /><stop offset="100%" stopColor="#ffe3b8" />
        </linearGradient>
        <linearGradient id="es-ron-cliffL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a6a48" /><stop offset="100%" stopColor="#c99a68" />
        </linearGradient>
        <linearGradient id="es-ron-cliffR" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a5a3c" /><stop offset="100%" stopColor="#5a4230" />
        </linearGradient>
        <linearGradient id="es-ron-bridge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d8b489" /><stop offset="60%" stopColor="#c09a6c" /><stop offset="100%" stopColor="#8f6d4a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-ron-sky)" />
      <Sun cx={100} cy={40} r={9} color="#fff4d6" glow="#ffae6b" />
      <path d="M0 84 q40 -8 100 -4 q60 4 100 -2 V100 H0 Z" fill="#8e9a6a" opacity=".6" />
      <Haze y={70} h={20} color="#ffe6c4" opacity={0.35} />

      {/* Les deux falaises et le pont qui les relie */}
      <path d="M0 16 H62 L66 30 L60 52 L68 74 L62 100 L70 130 H0 Z" fill="url(#es-ron-cliffL)" />
      <path d="M200 20 H136 L132 36 L140 58 L130 80 L138 104 L128 130 H200 Z" fill="url(#es-ron-cliffR)" />
      {[[10, 30], [24, 50], [14, 76], [34, 96], [170, 40], [186, 66], [160, 90], [176, 112]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} l8 -2 l6 3`} stroke="#5a4230" strokeWidth=".7" fill="none" opacity=".6" />
      ))}
      <rect x="58" y="14" width="84" height="8" fill="#e4c89f" />
      <path d="M62 22 H138 V30 H62 Z" fill="url(#es-ron-bridge)" />
      <path d="M76 30 H124 V112 H112 V58 q-12 -18 -24 0 V112 H76 Z" fill="url(#es-ron-bridge)" />
      <path d="M88 58 q12 -18 24 0" stroke="#8f6d4a" strokeWidth="1" fill="none" />
      <rect x="96" y="34" width="8" height="10" fill="#3f2e1e" />
      <rect x="97.4" y="35.4" width="5.2" height="3" fill="#f2c290" opacity=".6" />
      <path d="M66 30 q6 10 10 12 M134 30 q-6 10 -10 12" stroke="#8f6d4a" strokeWidth="1.2" fill="none" />
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1="76" y1={40 + i * 7} x2="88" y2={40 + i * 7} stroke="#8f6d4a" strokeWidth=".4" opacity=".6" />)}
      {Array.from({ length: 10 }, (_, i) => <line key={i} x1="112" y1={40 + i * 7} x2="124" y2={40 + i * 7} stroke="#6b4f35" strokeWidth=".4" opacity=".6" />)}
      {/* Maisons blanches au bord du vide */}
      {[[4, 8], [16, 6], [28, 9], [42, 7], [150, 12], [164, 10], [178, 13], [190, 11]].map(([x, h], i) => (
        <g key={i}>
          <rect x={x} y={16 - h} width="10" height={h} fill="#f7f3ea" />
          <path d={`M${x - 0.6} ${16 - h} h11.2 l-5.6 -3 Z`} fill="#c2724a" />
          <rect x={x + 3.6} y={16 - h + 2} width="2.4" height="3" fill="#6b4a2b" opacity=".7" />
        </g>
      ))}
      {/* Le fond des gorges : rivière et jardins */}
      <path d="M70 130 q20 -12 30 -10 q14 2 28 10 Z" fill="#5a7a4a" />
      <path d="M88 130 q8 -6 14 -6 q6 0 12 6" stroke="#8ec0d8" strokeWidth="2" fill="none" />
      <Person x={70} y={14} s={0.8} color="#1e293b" opacity={0.7} />
      <Birds x={96} y={76} s={0.9} color="#3b2140" opacity={0.45} />
    </>
  ),

  /* Casas Colgadas de Cuenca — les maisons suspendues et le pont de fer */
  es_cuenca: (
    <>
      <defs>
        <linearGradient id="es-cue-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f82c8" /><stop offset="100%" stopColor="#d4ebfa" />
        </linearGradient>
        <linearGradient id="es-cue-rock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c7a47a" /><stop offset="100%" stopColor="#8f6d4a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-cue-sky)" />
      <Cloud x={160} y={18} s={0.9} opacity={0.8} />

      {/* La falaise et ses strates */}
      <path d="M40 130 V70 q4 -14 0 -20 q8 -10 6 -24 H200 V130 Z" fill="url(#es-cue-rock)" />
      {[60, 74, 88, 102, 116].map((y) => <path key={y} d={`M44 ${y} q60 -4 156 2`} stroke="#8f6d4a" strokeWidth=".7" fill="none" opacity=".5" />)}
      {/* Les maisons accrochées au bord, balcons de bois au-dessus du vide */}
      {[[46, 18, 22], [70, 14, 26], [98, 20, 18], [120, 16, 24], [148, 22, 20], [172, 12, 28]].map(([x, top, h], i) => (
        <g key={i}>
          <rect x={x} y={top} width="22" height={h + 10} fill={i % 2 ? "#f4efe4" : "#ebe1cd"} />
          <path d={`M${x - 1} ${top} h24 l-4 -5 h-16 Z`} fill="#a3552e" />
          {[0, 1].map((r) => (
            <g key={r}>
              <rect x={x - 3} y={top + 8 + r * 10} width="28" height="5" fill="#7c4a24" />
              <path d={`M${x - 3} ${top + 13 + r * 10} h28`} stroke="#4a2c14" strokeWidth=".6" />
              {Array.from({ length: 7 }, (_, k) => <line key={k} x1={x - 2 + k * 4} y1={top + 8 + r * 10} x2={x - 2 + k * 4} y2={top + 13 + r * 10} stroke="#4a2c14" strokeWidth=".4" />)}
            </g>
          ))}
        </g>
      ))}
      {/* Le pont de San Pablo, en fer rouge, au-dessus des gorges */}
      <path d="M0 64 L40 60" stroke="#b91c1c" strokeWidth="2" />
      {[4, 14, 24, 34].map((x) => <path key={x} d={`M${x} 64 L${x + 4} 96 M${x + 8} 64 L${x + 4} 96`} stroke="#b91c1c" strokeWidth=".8" />)}
      <path d="M0 68 q20 -4 40 -8" stroke="#7f1d1d" strokeWidth="1" fill="none" />
      {/* Les gorges du Huécar, arbres */}
      <path d="M0 96 q20 -6 40 0 V130 H0 Z" fill="#4f7a3f" />
      <TreeLine fill="#3d6b33" trees={[[6, 100, 8], [20, 104, 9], [34, 98, 7], [48, 120, 9], [60, 126, 8]]} />
      <Person x={20} y={63} s={0.8} color="#1e293b" opacity={0.75} />
      <Birds x={80} y={10} s={0.8} color="#1e3a5f" opacity={0.4} />
    </>
  ),

  /* Montserrat — la montagne sciée et le monastère accroché à mi-hauteur */
  es_montserrat: (
    <>
      <defs>
        <linearGradient id="es-mon-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9fc7ee" /><stop offset="100%" stopColor="#fbe9d2" />
        </linearGradient>
        <linearGradient id="es-mon-rock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e2b49a" /><stop offset="55%" stopColor="#c4917a" /><stop offset="100%" stopColor="#8f6555" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-mon-sky)" />
      <Sun cx={30} cy={26} r={8} color="#fffbe6" glow="#ffd08a" />

      {/* Les aiguilles de conglomérat, arrondies comme des doigts */}
      {[
        [8, 70, 12], [20, 50, 13], [33, 40, 12], [45, 30, 13], [58, 22, 12], [71, 16, 13], [84, 12, 12], [97, 10, 13],
        [110, 14, 12], [123, 20, 13], [136, 28, 12], [149, 36, 13], [162, 46, 12], [175, 56, 13], [188, 66, 12],
      ].map(([x, top, w], i) => (
        <g key={i}>
          <path d={`M${x - w / 2} 100 V${top + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w} 0 V100 Z`} fill="url(#es-mon-rock)" />
          <path d={`M${x + w * 0.1} 100 V${top + w / 2} a${w / 2} ${w / 2} 0 0 1 ${w * 0.4} ${w * 0.1} V100 Z`} fill="#8f6555" opacity=".35" />
        </g>
      ))}
      <Haze y={70} h={16} color="#fbe9d2" opacity={0.3} />
      {/* Le monastère et la basilique */}
      <rect x="78" y="74" width="46" height="18" fill="#efe3cf" />
      <rect x="84" y="66" width="14" height="10" fill="#e6d6bc" />
      <path d="M84 66 l7 -6 l7 6 Z" fill="#9c7a5a" />
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={81 + i * 5.2} y="80" width="2.4" height="4" fill="#6b4a2b" opacity=".7" />)}
      <rect x="112" y="68" width="8" height="8" fill="#e6d6bc" />
      {/* Le téléphérique */}
      <path d="M120 70 L200 104" stroke="#374151" strokeWidth=".6" />
      <rect x="156" y="84" width="7" height="6" rx="1" fill="#f59e0b" />
      <line x1="159.5" y1="82" x2="159.5" y2="84" stroke="#374151" strokeWidth=".6" />
      {/* Pentes boisées et premier plan */}
      <path d="M0 100 q50 -8 100 -2 q50 6 100 -2 V130 H0 Z" fill="#5f7a44" />
      <TreeLine fill="#3f5f33" trees={[[10, 104, 8], [30, 102, 7], [58, 106, 8], [150, 104, 8], [174, 102, 9], [194, 106, 7]]} />
      <path d="M0 130 q40 -16 90 -10 V130 Z" fill="#324a28" />
      <Person x={60} y={120} s={1.1} color="#1e293b" opacity={0.75} />
      <Birds x={150} y={20} s={0.8} color="#3b2140" opacity={0.4} />
    </>
  ),

  /* El Teide — le volcan au-dessus de la mer de nuages, et les tajinastes */
  es_teide: (
    <>
      <defs>
        <linearGradient id="es-tei-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b1f4a" /><stop offset="45%" stopColor="#6a4f8a" /><stop offset="80%" stopColor="#f08a6a" /><stop offset="100%" stopColor="#ffd08a" />
        </linearGradient>
        <linearGradient id="es-tei-cone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8a5a4a" /><stop offset="55%" stopColor="#5a3a32" /><stop offset="100%" stopColor="#2e1f1c" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-tei-sky)" />
      {[[14, 10], [40, 18], [66, 8], [150, 12], [176, 22], [190, 8], [120, 6], [30, 30]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 ? 0.7 : 1} fill="#fff" opacity=".85" />
      ))}
      {/* La mer de nuages, rosée */}
      <path d="M0 78 q20 -6 40 -2 q20 -8 44 -2 q24 -6 48 0 q24 -6 68 2 V96 H0 Z" fill="#f6c6b0" />
      <path d="M0 84 q30 -4 60 0 q30 -6 70 0 q40 -4 70 2" stroke="#ffe3d4" strokeWidth="2" fill="none" opacity=".6" />
      {/* Le cône du Teide et son sommet enneigé */}
      <path d="M40 96 L96 30 L104 28 L164 96 Z" fill="url(#es-tei-cone)" />
      <path d="M96 30 L104 28 L114 42 L108 40 L104 46 L98 40 L90 42 Z" fill="#f4f1ee" />
      <path d="M100 30 q2 -3 4 -2" stroke="#e6e0da" strokeWidth=".8" fill="none" />
      <path d="M96 30 L70 64 M104 28 L132 60" stroke="#3a2622" strokeWidth=".6" opacity=".5" />
      {/* L'ombre du volcan, en triangle sur les nuages */}
      <path d="M164 96 L200 80 V96 Z" fill="#6a4f8a" opacity=".25" />
      {/* Le champ de lave et les tajinastes rouges */}
      <path d="M0 96 H200 V130 H0 Z" fill="#3a2a26" />
      {Array.from({ length: 30 }, (_, i) => (
        <ellipse key={i} cx={(i * 13) % 200} cy={100 + ((i * 7) % 26)} rx={3 + (i % 4)} ry={1.4 + (i % 3) * 0.6} fill={i % 3 ? "#5a3a32" : "#7a4a3a"} />
      ))}
      {[[26, 126, 26], [40, 124, 20], [160, 126, 28], [176, 124, 22], [146, 128, 16]].map(([x, y, h], i) => (
        <g key={i}>
          <path d={`M${x} ${y} C${x - 4} ${y - h * 0.4} ${x - 2} ${y - h * 0.9} ${x} ${y - h} C${x + 2} ${y - h * 0.9} ${x + 4} ${y - h * 0.4} ${x} ${y} Z`} fill="#c0263d" />
          {Array.from({ length: 5 }, (_, k) => <circle key={k} cx={x + (k % 2 ? 1.2 : -1.2)} cy={y - h * (0.2 + k * 0.15)} r=".9" fill="#f8a5b5" />)}
        </g>
      ))}
      <Person x={100} y={122} s={1.1} color="#0f0a14" opacity={0.8} />
    </>
  ),

  /* Ciudad de las Artes y las Ciencias — l'œil de l'Hemisfèric et son reflet */
  es_valencia: (
    <>
      <defs>
        <linearGradient id="es-val-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f7ad6" /><stop offset="100%" stopColor="#c9e6fb" />
        </linearGradient>
        <linearGradient id="es-val-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5fd0d6" /><stop offset="100%" stopColor="#1a8a9a" />
        </linearGradient>
        <linearGradient id="es-val-white" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="60%" stopColor="#e9eef3" /><stop offset="100%" stopColor="#b9c4ce" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-val-sky)" />
      <Sun cx={30} cy={22} r={8} color="#fffbe6" glow="#ffe08a" />

      {/* Le Palau de les Arts : deux coques blanches et sa « plume » */}
      <path d="M118 74 C120 50 150 38 176 48 C188 54 190 66 184 74 Z" fill="url(#es-val-white)" />
      <path d="M128 74 C132 58 150 50 168 56 C176 60 178 68 174 74 Z" fill="#9fb3c4" opacity=".5" />
      <path d="M124 48 C140 28 176 22 196 34" stroke="#f4f7fa" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M124 48 C140 28 176 22 196 34" stroke="#b9c4ce" strokeWidth="1" fill="none" />
      {/* L'Hemisfèric : l'œil aux paupières de verre */}
      <path d="M36 76 Q80 44 124 76 Z" fill="url(#es-val-white)" />
      <path d="M44 76 Q80 50 116 76" stroke="#b9c4ce" strokeWidth=".8" fill="none" />
      <ellipse cx="80" cy="72" rx="16" ry="7" fill="#dfe8ef" />
      <ellipse cx="80" cy="72" rx="9" ry="6" fill="#7aa6c2" />
      <circle cx="80" cy="72" r="3.4" fill="#2b4a60" />
      {Array.from({ length: 12 }, (_, i) => <line key={i} x1={40 + i * 7} y1="76" x2={48 + i * 6} y2={62 - Math.abs(6 - i)} stroke="#c9d4de" strokeWidth=".5" />)}
      {/* Le bassin et le reflet qui complète l'œil */}
      <rect x="0" y="76" width="200" height="54" fill="url(#es-val-pool)" />
      <path d="M36 76 Q80 108 124 76 Z" fill="#e9f5f7" opacity=".55" />
      <ellipse cx="80" cy="80" rx="16" ry="7" fill="#b7d8de" opacity=".6" />
      <path d="M118 76 C120 96 150 104 176 100" stroke="#e9f5f7" strokeWidth="1" fill="none" opacity=".4" />
      <Foam y={96} color="#e9f5f7" opacity={0.3} />
      <Foam y={110} color="#e9f5f7" opacity={0.2} offset={10} />
      <Palm x={16} y={78} s={0.9} leaf="#2f7a44" dark="#1d5a31" />
      <Palm x={192} y={78} s={0.8} leaf="#2f7a44" dark="#1d5a31" />
      <Person x={140} y={76} s={0.9} color="#1e293b" opacity={0.7} />
    </>
  ),

  /* La Concha — la baie de Saint-Sébastien vue depuis la balustrade */
  es_concha: (
    <>
      <defs>
        <linearGradient id="es-con-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b8fd0" /><stop offset="100%" stopColor="#dcedfa" />
        </linearGradient>
        <linearGradient id="es-con-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3aa6b8" /><stop offset="100%" stopColor="#1f6f8a" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-con-sky)" />
      <Cloud x={150} y={16} s={1} opacity={0.85} />
      <Cloud x={60} y={24} s={0.7} opacity={0.6} />
      {/* Mont Igueldo à gauche, mont Urgull à droite, l'île de Santa Clara au milieu */}
      <path d="M0 64 q20 -26 50 -24 q14 10 18 24 Z" fill="#4f7a4a" />
      <rect x="30" y="36" width="6" height="6" fill="#efe6d4" />
      <path d="M150 64 q16 -24 36 -24 q12 6 14 24 Z" fill="#46703f" />
      <rect x="170" y="34" width="4" height="8" fill="#e6dccb" /><circle cx="172" cy="32" r="2" fill="#e6dccb" />
      <path d="M92 64 q10 -12 22 -10 q8 4 8 10 Z" fill="#557f4e" />
      <rect x="108" y="52" width="2.4" height="4" fill="#fff" />
      {/* La baie, la plage en croissant, la ville */}
      <rect x="0" y="64" width="200" height="30" fill="url(#es-con-sea)" />
      <path d="M0 86 q100 -14 200 0 V96 H0 Z" fill="#ecd4a4" />
      <path d="M0 86 q100 -14 200 0" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity=".8" />
      {Array.from({ length: 26 }, (_, i) => (
        <rect key={i} x={i * 8} y={96} width="7" height="6" fill={i % 3 ? "#f2ece0" : "#e3d6bf"} />
      ))}
      <Foam y={78} color="#ffffff" opacity={0.35} />
      {[[40, 72], [120, 70], [150, 76]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} h8 l-1.4 2 h-5.2 Z`} fill="#f8fafc" />
          <path d={`M${x + 4} ${y} v-6 l3 5 Z`} fill="#f8fafc" opacity=".9" />
        </g>
      ))}
      {/* La balustrade blanche de la promenade, au premier plan */}
      <rect x="0" y="102" width="200" height="28" fill="#c9c2b4" />
      <rect x="0" y="104" width="200" height="3" fill="#f7f5ef" />
      {Array.from({ length: 34 }, (_, i) => (
        <g key={i}>
          <path d={`M${3 + i * 6} 107 q-1.6 4 0 8 q1.6 4 0 6 h3 q-1.6 -2 0 -6 q1.6 -4 0 -8 Z`} fill="#f7f5ef" />
        </g>
      ))}
      <rect x="0" y="121" width="200" height="3" fill="#f7f5ef" />
      {[60, 140].map((x) => (
        <g key={x}>
          <rect x={x - 0.8} y="84" width="1.6" height="20" fill="#1f2937" />
          <circle cx={x} cy="83" r="2.4" fill="#f3f4f6" stroke="#1f2937" strokeWidth=".6" />
        </g>
      ))}
      <Person x={96} y={103} s={1.1} color="#1e293b" opacity={0.75} />
      <Person x={101} y={103} s={1} color="#7c2d12" opacity={0.7} />
      <Birds x={80} y={40} s={0.8} color="#1e3a5f" opacity={0.4} />
    </>
  ),

  /* Molinos de Consuegra — les géants de Don Quichotte au couchant */
  es_molinos: (
    <>
      <defs>
        <linearGradient id="es-mol-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a4a8a" /><stop offset="45%" stopColor="#e9825a" /><stop offset="100%" stopColor="#ffd08a" />
        </linearGradient>
        <linearGradient id="es-mol-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a6a48" /><stop offset="100%" stopColor="#4a3a28" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#es-mol-sky)" />
      <Sun cx={170} cy={74} r={11} color="#fff0c8" glow="#ff8a4c" />
      <Cloud x={50} y={24} s={1.1} color="#f4b89a" opacity={0.5} />

      {/* La crête du Cerro Calderico et les moulins */}
      <path d="M0 88 q30 -26 70 -30 q50 -4 80 8 q30 10 50 22 V130 H0 Z" fill="url(#es-mol-hill)" />
      {[[24, 74, 0.9, 20], [58, 62, 1.1, 5], [96, 60, 1.2, 35], [132, 66, 1, 60]].map(([x, y, s, rot], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-6 0 L-5 -22 H5 L6 0 Z" fill="#f8f4ea" />
          <path d="M1 0 L1.6 -22 H5 L6 0 Z" fill="#d9d1c0" />
          <path d="M-6.4 -22 L0 -31 L6.4 -22 Z" fill="#2f2a26" />
          <rect x="-1.4" y="-9" width="2.8" height="4" fill="#3a2a1c" />
          <circle cx="0" cy="-24" r="1.2" fill="#3a2a1c" />
          <g transform={`rotate(${rot} 0 -24)`} stroke="#3a2a1c" strokeWidth=".9">
            {[0, 90, 180, 270].map((a) => (
              <g key={a} transform={`rotate(${a} 0 -24)`}>
                <line x1="0" y1="-24" x2="0" y2="-44" />
                <path d="M0 -28 h4 v-15 h-4" fill="#efe6d4" fillOpacity=".25" strokeWidth=".5" />
                {[-31, -35, -39].map((yy) => <line key={yy} x1="0" y1={yy} x2="4" y2={yy} strokeWidth=".4" />)}
              </g>
            ))}
          </g>
        </g>
      ))}
      {/* Le château sur la crête */}
      <path d="M150 70 h22 v-8 h-4 v-3 h-3 v3 h-4 v-3 h-3 v3 h-4 v-3 h-4 Z" fill="#6b5238" />
      <rect x="156" y="58" width="6" height="12" fill="#5a4430" />
      {/* La plaine : champs de safran en fleur */}
      <path d="M0 104 q100 -12 200 0 V130 H0 Z" fill="#6b5a3c" />
      {Array.from({ length: 50 }, (_, i) => (
        <g key={i}>
          <circle cx={(i * 17) % 200} cy={108 + ((i * 7) % 20)} r="1.3" fill="#8b5cf6" />
          <line x1={(i * 17) % 200} y1={108 + ((i * 7) % 20)} x2={(i * 17) % 200} y2={110 + ((i * 7) % 20)} stroke="#dc2626" strokeWidth=".4" />
        </g>
      ))}
      <Person x={80} y={80} s={0.9} color="#1c1410" opacity={0.8} />
      <Birds x={110} y={30} s={0.8} color="#2a1a2a" opacity={0.45} />
    </>
  ),
};
