import React from "react";

/* ==================================================================
   LES VINGT PAYSAGES DES CARTES POSTALES

   Chaque carte est une petite illustration construite en plans : un
   ciel qui donne l'heure, un arrière-plan estompé pour la profondeur,
   le monument ou le paysage au centre avec sa lumière et son ombre,
   et un premier plan sombre qui encadre. Tout est vectoriel : rien à
   télécharger, net à toutes les tailles, et lisible même en vignette.
   ================================================================== */

const VB = { w: 200, h: 130 };

/* --- Petites pièces réutilisables --------------------------------- */

function Sun({ cx, cy, r = 11, color = "#ffd98a", glow = "#ffb86b", rays = false }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 2.6} fill={glow} opacity=".16" />
      <circle cx={cx} cy={cy} r={r * 1.7} fill={glow} opacity=".22" />
      <circle cx={cx} cy={cy} r={r} fill={color} />
      {rays && [0, 45, 90, 135].map((a) => (
        <line key={a} x1={cx - r * 2.2} y1={cy} x2={cx + r * 2.2} y2={cy} stroke={color} strokeWidth=".8"
          opacity=".35" transform={`rotate(${a} ${cx} ${cy})`} />
      ))}
    </g>
  );
}

function Cloud({ x, y, s = 1, color = "#ffffff", opacity = 0.75 }) {
  return (
    <g opacity={opacity} transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="14" ry="5" fill={color} />
      <ellipse cx="-7" cy="1.5" rx="9" ry="4" fill={color} />
      <ellipse cx="7" cy="1" rx="10" ry="4.5" fill={color} />
      <ellipse cx="1" cy="-3" rx="7" ry="4.5" fill={color} />
    </g>
  );
}

function Birds({ x, y, s = 1, color = "#1f2937", opacity = 0.5 }) {
  return (
    <g opacity={opacity} transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round">
      <path d="M0 0 q3 -3 6 0 q3 -3 6 0" />
      <path d="M12 6 q2.4 -2.4 4.8 0 q2.4 -2.4 4.8 0" />
      <path d="M-9 7 q2 -2 4 0 q2 -2 4 0" />
    </g>
  );
}

function Palm({ x, y, s = 1, trunk = "#5b4630", leaf = "#166534", dark = "#0f4429" }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 q-3 -14 1 -28" stroke={trunk} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M1 -28 q-14 -5 -19 3 q10 -1 19 0" fill={leaf} />
      <path d="M1 -28 q14 -6 20 2 q-11 -1 -20 1" fill={leaf} />
      <path d="M1 -28 q-9 -12 -2 -18 q5 8 4 18" fill={dark} />
      <path d="M1 -28 q11 -10 16 -4 q-9 1 -16 5" fill={dark} />
      <circle cx="1" cy="-28" r="1.8" fill="#854d0e" />
    </g>
  );
}

/* Une lisière de forêt. Les positions sont écrites à la main plutôt que
   calculées : une rangée régulière se voit tout de suite et fait faux. */
function TreeLine({ trees, fill, opacity = 1 }) {
  return (
    <g opacity={opacity}>
      {trees.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * (0.72 + (i % 3) * 0.12)} fill={fill} />
      ))}
    </g>
  );
}

/* Un banc d'écume pour les mers */
function Foam({ y, color = "#ffffff", opacity = 0.7, offset = 0 }) {
  return (
    <path d={`M${-10 + offset} ${y} q12 -3 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0`}
      stroke={color} strokeWidth="1.6" fill="none" opacity={opacity} strokeLinecap="round" />
  );
}

/* --- Les scènes ---------------------------------------------------- */

const SCENES = {
  /* Cristo Redentor — le crépuscule sur la baie */
  mountain: (
    <>
      <defs>
        <linearGradient id="sc-mnt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b2a6d" /><stop offset="55%" stopColor="#b5568b" /><stop offset="100%" stopColor="#ffa06a" />
        </linearGradient>
        <linearGradient id="sc-mnt-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8d5f86" /><stop offset="100%" stopColor="#2a3566" />
        </linearGradient>
        <linearGradient id="sc-mnt-rock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d4534" /><stop offset="60%" stopColor="#14332a" /><stop offset="100%" stopColor="#0d241d" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-mnt-sky)" />
      <Sun cx={158} cy={54} r={9} color="#ffe6b0" glow="#ff9f5a" />
      <Cloud x={40} y={26} s={1.1} color="#f7c3a8" opacity={0.5} />
      <Cloud x={120} y={18} s={0.8} color="#f7c3a8" opacity={0.4} />
      <path d="M0 66 h200 v64 H0 Z" fill="url(#sc-mnt-sea)" />
      <path d="M118 66 q10 -3 22 0 q-11 3 -22 0 M124 72 q9 -2 18 0 q-9 2 -18 0 M130 78 q7 -2 14 0 q-7 2 -14 0" fill="#ffd9a8" opacity=".45" />
      {/* Pain de Sucre au loin */}
      <path d="M168 66 q4 -20 12 -21 q9 1 12 21 Z" fill="#2c2f57" opacity=".85" />
      <path d="M150 66 q3 -11 8 -12 q6 1 8 12 Z" fill="#2c2f57" opacity=".7" />
      {/* Corcovado */}
      <path d="M8 130 q24 -66 62 -84 q40 16 58 84 Z" fill="url(#sc-mnt-rock)" />
      <path d="M70 46 q22 12 40 52 q-26 -20 -40 -52 Z" fill="#2a6a4d" opacity=".55" />
      {/* Le socle et la statue */}
      <rect x="62" y="40" width="16" height="8" rx="1" fill="#6b6a63" />
      <rect x="64" y="34" width="12" height="7" fill="#8a887f" />
      <g>
        <path d="M66 34 h8 l-1.5 -13 h-5 Z" fill="#efeee7" />
        <path d="M70 34 h4 l-1.5 -13 h-2.5 Z" fill="#c9c7bd" />
        <rect x="56" y="21" width="28" height="2.6" rx="1.3" fill="#efeee7" />
        <rect x="70" y="21" width="14" height="2.6" rx="1.3" fill="#d4d2c8" />
        <circle cx="70" cy="18.5" r="2.6" fill="#efeee7" />
        <circle cx="71" cy="18.5" r="1.6" fill="#d4d2c8" />
      </g>
      <Birds x={126} y={40} s={0.9} color="#2b2350" opacity={0.55} />
      {/* Premier plan : feuillage */}
      <path d="M0 130 q16 -20 36 -10 q-8 -14 8 -22 q-2 20 -14 32 Z" fill="#0b1f18" opacity=".9" />
      <path d="M200 130 q-20 -14 -38 -6 q10 -12 -4 -22 q4 18 16 28 Z" fill="#0b1f18" opacity=".85" />
    </>
  ),

  /* Pão de Açúcar — le téléphérique à l'heure dorée */
  cablecar: (
    <>
      <defs>
        <linearGradient id="sc-cab-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f9a03f" /><stop offset="55%" stopColor="#ffd08a" /><stop offset="100%" stopColor="#ffe9c4" />
        </linearGradient>
        <linearGradient id="sc-cab-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3f7fa6" /><stop offset="100%" stopColor="#1c4a70" />
        </linearGradient>
        <linearGradient id="sc-cab-rock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7d6a58" /><stop offset="45%" stopColor="#584a3e" /><stop offset="100%" stopColor="#3b322b" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-cab-sky)" />
      <Sun cx={44} cy={40} r={12} color="#fff3d0" glow="#ff8c42" rays />
      <Cloud x={140} y={26} s={1} color="#ffe2bd" opacity={0.65} />
      <rect x="0" y="78" width="200" height="52" fill="url(#sc-cab-sea)" />
      <path d="M30 78 q14 -3 28 0 q-14 3 -28 0 M36 86 q11 -3 22 0 q-11 3 -22 0 M42 94 q9 -2 18 0 q-9 2 -18 0" fill="#ffd9a0" opacity=".5" />
      <Foam y={82} opacity={0.35} />
      <Foam y={92} opacity={0.25} offset={9} />
      {/* Morro da Urca puis le Pain de Sucre */}
      <path d="M8 78 q10 -26 26 -27 q17 1 25 27 Z" fill="url(#sc-cab-rock)" opacity=".92" />
      <path d="M22 51 q9 -3 16 4 q-10 2 -16 -4 Z" fill="#2f6b45" opacity=".8" />
      <path d="M116 78 q10 -48 34 -50 q25 2 34 50 Z" fill="url(#sc-cab-rock)" />
      <path d="M150 28 q18 12 28 50 q-16 -26 -28 -50 Z" fill="#8b7765" opacity=".55" />
      <path d="M132 40 q12 -6 24 2 q-13 3 -24 -2 Z" fill="#2f6b45" opacity=".75" />
      <ellipse cx="150" cy="78" rx="34" ry="4" fill="#123a5c" opacity=".35" />
      {/* Le câble et la cabine */}
      <path d="M30 46 Q92 30 150 26" stroke="#3f3a33" strokeWidth="1.1" fill="none" />
      <g transform="translate(84 33)">
        <line x1="6" y1="0" x2="6" y2="4" stroke="#3f3a33" strokeWidth="1.2" />
        <rect x="0" y="4" width="13" height="9" rx="2" fill="#d9534f" />
        <rect x="1.5" y="6" width="10" height="4" rx="1" fill="#ffe9c4" opacity=".9" />
        <rect x="0" y="11.5" width="13" height="1.6" fill="#a63d3a" />
      </g>
      {/* Bateaux */}
      <path d="M52 100 h12 l-2 3 h-8 Z" fill="#f8fafc" opacity=".9" />
      <path d="M58 100 v-6 l5 6 Z" fill="#f8fafc" opacity=".85" />
      <path d="M96 112 h9 l-1.6 2.4 h-6 Z" fill="#e2e8f0" opacity=".8" />
      <Birds x={66} y={30} s={0.8} color="#6b4a2f" opacity={0.5} />
    </>
  ),

  /* Copacabana — la plage et son trottoir en vagues */
  beach: (
    <>
      <defs>
        <linearGradient id="sc-bch-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f8fd0" /><stop offset="70%" stopColor="#8fd3ef" /><stop offset="100%" stopColor="#d8f2fb" />
        </linearGradient>
        <linearGradient id="sc-bch-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f6f8f" /><stop offset="60%" stopColor="#1b9bb8" /><stop offset="100%" stopColor="#57c6d4" />
        </linearGradient>
        <linearGradient id="sc-bch-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2dcae" /><stop offset="100%" stopColor="#e2c489" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-bch-sky)" />
      <Sun cx={164} cy={24} r={10} color="#fffbe8" glow="#ffe9a8" />
      <Cloud x={46} y={20} s={1.1} opacity={0.85} />
      <Cloud x={118} y={30} s={0.7} opacity={0.6} />
      {/* Collines au fond */}
      <path d="M0 58 q16 -16 30 -2 q10 -12 22 2 Z" fill="#2f6b52" opacity=".55" />
      <path d="M150 58 q14 -20 26 -6 q8 -8 24 6 Z" fill="#2f6b52" opacity=".6" />
      <rect x="0" y="56" width="200" height="34" fill="url(#sc-bch-sea)" />
      <Foam y={62} opacity={0.4} />
      <Foam y={72} opacity={0.55} offset={11} />
      <Foam y={82} opacity={0.75} offset={4} />
      <path d="M0 88 q30 6 62 2 q40 -5 70 2 q34 5 68 -2 v40 H0 Z" fill="url(#sc-bch-sand)" />
      <path d="M0 88 q30 6 62 2 q40 -5 70 2 q34 5 68 -2 v4 q-34 7 -68 2 q-30 -7 -70 -2 q-32 4 -62 -2 Z" fill="#ffffff" opacity=".75" />
      {/* Le trottoir portugais, noir et blanc */}
      <rect x="0" y="112" width="200" height="18" fill="#f8fafc" />
      <path d="M-10 121 q12 -9 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" stroke="#111827" strokeWidth="5.5" fill="none" />
      <path d="M-10 112 q12 -9 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0" stroke="#111827" strokeWidth="3" fill="none" opacity=".8" />
      {/* Parasols et palmiers */}
      <Palm x={24} y={112} s={1.15} />
      <Palm x={182} y={110} s={0.95} />
      <g transform="translate(96 104)">
        <line x1="0" y1="0" x2="0" y2="-11" stroke="#8a6a4a" strokeWidth="1.4" />
        <path d="M-11 -10 q11 -7 22 0 Z" fill="#ef4444" />
        <path d="M-11 -10 q5.5 -3.5 11 0 Z" fill="#fca5a5" />
      </g>
      <g transform="translate(130 106)">
        <line x1="0" y1="0" x2="0" y2="-9" stroke="#8a6a4a" strokeWidth="1.2" />
        <path d="M-9 -8 q9 -6 18 0 Z" fill="#f59e0b" />
      </g>
      <circle cx="112" cy="100" r="2.6" fill="#0f172a" opacity=".65" />
      <circle cx="118" cy="101" r="2.2" fill="#0f172a" opacity=".5" />
    </>
  ),

  /* Iguaçu — la gorge, la brume et l'arc-en-ciel */
  waterfall: (
    <>
      <defs>
        <linearGradient id="sc-wf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7cc6e8" /><stop offset="100%" stopColor="#d9f0e2" />
        </linearGradient>
        <linearGradient id="sc-wf-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="70%" stopColor="#e6f6ff" /><stop offset="100%" stopColor="#bfe3f2" />
        </linearGradient>
        <linearGradient id="sc-wf-jungle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f7a46" /><stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-wf-sky)" />
      <Cloud x={150} y={16} s={0.9} opacity={0.75} />
      <Birds x={30} y={20} s={0.9} color="#334155" opacity={0.45} />
      {/* Arc-en-ciel dans la brume */}
      <g fill="none" strokeWidth="2.4" opacity=".55">
        <path d="M58 96 a44 44 0 0 1 88 0" stroke="#ef4444" />
        <path d="M62 96 a40 40 0 0 1 80 0" stroke="#f59e0b" />
        <path d="M66 96 a36 36 0 0 1 72 0" stroke="#fde047" />
        <path d="M70 96 a32 32 0 0 1 64 0" stroke="#4ade80" />
        <path d="M74 96 a28 28 0 0 1 56 0" stroke="#60a5fa" />
      </g>
      {/* Plateaux de forêt de part et d'autre */}
      <path d="M0 40 h70 q6 10 0 18 H0 Z" fill="url(#sc-wf-jungle)" />
      <path d="M200 36 h-66 q-8 12 0 22 h66 Z" fill="url(#sc-wf-jungle)" />
      <TreeLine fill="#166534" trees={[[4, 38, 7], [17, 33, 9], [31, 39, 6], [44, 34, 8], [58, 38, 7]]} />
      <TreeLine fill="#166534" trees={[[144, 34, 8], [157, 30, 6], [170, 35, 9], [184, 31, 7], [197, 35, 8]]} />
      {/* Les chutes */}
      <g>
        {[[16, 58, 10], [30, 58, 8], [44, 58, 9], [58, 58, 7], [134, 58, 8], [148, 58, 10], [162, 58, 8], [176, 58, 9]].map(([x, y, w], i) => (
          <path key={i} d={`M${x} ${y} h${w} l${-1.5} 40 h${-w + 3} Z`} fill="url(#sc-wf-water)" opacity={0.92} />
        ))}
        <path d="M70 58 h58 l-6 44 H76 Z" fill="url(#sc-wf-water)" />
        <path d="M84 58 h12 l-3 44 h-8 Z" fill="#ffffff" opacity=".8" />
        <path d="M106 58 h10 l-2.5 44 h-7 Z" fill="#ffffff" opacity=".7" />
      </g>
      {/* Brume et bassin */}
      <ellipse cx="100" cy="106" rx="70" ry="13" fill="#ffffff" opacity=".7" />
      <ellipse cx="60" cy="112" rx="40" ry="9" fill="#ffffff" opacity=".5" />
      <ellipse cx="146" cy="110" rx="36" ry="8" fill="#ffffff" opacity=".45" />
      <rect x="0" y="114" width="200" height="16" fill="#a7d8e8" />
      <Foam y={118} color="#ffffff" opacity={0.8} />
      {/* Feuilles au premier plan */}
      <path d="M0 130 q22 -8 30 -26 q4 20 -10 26 Z" fill="#14532d" />
      <path d="M200 130 q-24 -6 -32 -24 q-4 18 12 24 Z" fill="#14532d" />
    </>
  ),

  /* Amazonie — la canopée, le fleuve et l'ara */
  jungle: (
    <>
      <defs>
        <linearGradient id="sc-jgl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfe9d8" /><stop offset="100%" stopColor="#8fc9a4" />
        </linearGradient>
        <linearGradient id="sc-jgl-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8a6a3a" /><stop offset="100%" stopColor="#5c4423" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-jgl-sky)" />
      <Sun cx={40} cy={20} r={9} color="#fff8dc" glow="#ffe9a8" />
      {/* Crête lointaine, estompée par la brume */}
      <TreeLine fill="#7fb694" opacity={0.7} trees={[
        [4, 44, 11], [21, 40, 14], [38, 45, 9], [52, 38, 13], [70, 44, 11],
        [86, 41, 10], [103, 46, 13], [121, 39, 12], [138, 45, 10], [156, 41, 14], [176, 45, 11], [194, 40, 12],
      ]} />
      <rect x="0" y="44" width="200" height="12" fill="#ffffff" opacity=".4" />
      {/* Le fleuve qui serpente */}
      <path d="M0 74 q34 6 56 16 q22 10 30 24 q6 10 4 16 H52 q-4 -14 -18 -24 Q16 94 0 92 Z" fill="url(#sc-jgl-river)" />
      <path d="M14 82 q26 6 42 18 M34 80 q26 10 40 26" stroke="#b08a4e" strokeWidth="1.1" fill="none" opacity=".45" />
      {/* Canopée, en deux plans irréguliers */}
      <TreeLine fill="#2f8a52" trees={[
        [92, 62, 15], [112, 58, 18], [134, 64, 14], [152, 57, 17], [172, 63, 15], [192, 58, 16],
        [8, 64, 13], [26, 60, 11],
      ]} />
      <TreeLine fill="#166534" trees={[
        [0, 96, 20], [18, 104, 16], [40, 98, 14], [122, 92, 22], [146, 100, 18], [168, 94, 20], [192, 101, 17],
      ]} />
      {/* Arbre émergent : un tronc penché et un houppier irrégulier */}
      <path d="M64 96 q4 -26 2 -44" stroke="#6b4f2a" strokeWidth="5" fill="none" />
      <path d="M66 58 q-10 -4 -14 -12 M66 62 q10 -3 15 -10" stroke="#6b4f2a" strokeWidth="2.4" fill="none" />
      <ellipse cx="66" cy="48" rx="24" ry="12" fill="#1f7a48" />
      <ellipse cx="50" cy="45" rx="13" ry="8" fill="#2a8c55" />
      <ellipse cx="80" cy="44" rx="14" ry="9" fill="#2a8c55" />
      <ellipse cx="66" cy="40" rx="11" ry="7" fill="#35a163" />
      {/* L'ara en vol */}
      <g transform="translate(140 30) rotate(-12)">
        <path d="M0 0 q10 -3 18 2 q-9 4 -18 -2 Z" fill="#dc2626" />
        <path d="M2 0 q-8 -8 -2 -14 q6 6 4 14 Z" fill="#facc15" />
        <path d="M4 1 q-4 9 -14 11 q6 -7 10 -12 Z" fill="#2563eb" />
        <circle cx="19" cy="0.5" r="3" fill="#dc2626" />
        <path d="M21 0 q5 1 3 3 q-3 0 -4 -2 Z" fill="#1f2937" />
        <circle cx="19.5" cy="-0.6" r=".7" fill="#0f172a" />
      </g>
      {/* Nénuphars sur le fleuve */}
      <ellipse cx="34" cy="100" rx="8" ry="3" fill="#3fa96a" />
      <ellipse cx="52" cy="110" rx="6.5" ry="2.6" fill="#48b877" />
      <ellipse cx="22" cy="114" rx="7" ry="2.8" fill="#3fa96a" />
      {/* Feuilles au premier plan */}
      <path d="M0 130 q24 -10 28 -36 q12 24 -8 36 Z" fill="#0f3d24" />
      <path d="M200 130 q-26 -8 -30 -34 q-12 22 8 34 Z" fill="#0f3d24" />
    </>
  ),

  /* Encontro das Águas — les deux fleuves qui refusent de se mêler */
  rivers: (
    <>
      <defs>
        <linearGradient id="sc-riv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9d9e8" /><stop offset="100%" stopColor="#e8f0e4" />
        </linearGradient>
        <linearGradient id="sc-riv-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b2a22" /><stop offset="100%" stopColor="#1b120f" />
        </linearGradient>
        <linearGradient id="sc-riv-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c19a5b" /><stop offset="100%" stopColor="#8a6531" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-riv-sky)" />
      <Cloud x={40} y={18} s={1} opacity={0.8} />
      <Cloud x={150} y={14} s={0.8} opacity={0.65} />
      {/* Rive boisée au loin */}
      <rect x="0" y="38" width="200" height="10" fill="#2f6b45" />
      <TreeLine fill="#1f5233" trees={[
        [5, 39, 5], [19, 36, 7], [33, 40, 4], [47, 37, 6], [62, 40, 5], [78, 36, 7], [94, 39, 5],
        [110, 37, 6], [126, 40, 4], [142, 36, 7], [158, 39, 5], [174, 37, 6], [190, 40, 5],
      ]} />
      <rect x="0" y="46" width="200" height="4" fill="#0f172a" opacity=".12" />
      {/* Les deux eaux */}
      <rect x="0" y="48" width="200" height="82" fill="url(#sc-riv-light)" />
      <path d="M0 48 h104 q-10 20 4 40 q-14 22 -2 42 H0 Z" fill="url(#sc-riv-dark)" />
      {/* La frontière tourbillonnante */}
      <path d="M104 48 q-10 20 4 40 q-14 22 -2 42" stroke="#e8c98d" strokeWidth="1.6" fill="none" opacity=".7" />
      <path d="M100 62 q8 4 2 10 q-8 -3 -2 -10 Z" fill="#c19a5b" opacity=".75" />
      <path d="M112 86 q9 4 2 11 q-9 -4 -2 -11 Z" fill="#c19a5b" opacity=".6" />
      <path d="M96 104 q9 5 1 12 q-8 -5 -1 -12 Z" fill="#c19a5b" opacity=".5" />
      {/* Reflets */}
      <path d="M18 66 q18 -3 34 0 M26 82 q16 -3 30 0 M14 100 q20 -3 36 0" stroke="#6b5a4a" strokeWidth="1.1" fill="none" opacity=".6" />
      <path d="M140 60 q18 -3 34 0 M132 78 q20 -3 38 0 M146 98 q16 -3 32 0" stroke="#e0bd80" strokeWidth="1.1" fill="none" opacity=".6" />
      {/* Barque */}
      <g transform="translate(120 70)">
        <path d="M0 0 q10 6 22 0 l-3 5 h-16 Z" fill="#7c3f1d" />
        <rect x="9" y="-8" width="2" height="8" fill="#5b2f14" />
        <path d="M11 -8 q8 2 6 6 h-6 Z" fill="#f8fafc" opacity=".9" />
      </g>
    </>
  ),

  /* Pelourinho — la rue colorée de Salvador */
  colonial: (
    <>
      <defs>
        <linearGradient id="sc-col-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4aa3d9" /><stop offset="100%" stopColor="#ffe3c0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-col-sky)" />
      <Cloud x={150} y={18} s={0.85} opacity={0.75} />
      <Birds x={40} y={16} s={0.8} color="#475569" opacity={0.45} />
      {/* Guirlandes */}
      <path d="M0 26 q50 16 100 4 q50 -12 100 6" stroke="#94a3b8" strokeWidth=".8" fill="none" opacity=".7" />
      {[14, 34, 54, 74, 94, 114, 134, 154, 174, 194].map((x, i) => (
        <path key={i} d={`M${x} ${30 + Math.sin(i) * 3} l4 0 l-2 6 Z`} fill={["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#ec4899"][i % 5]} opacity=".9" />
      ))}
      {/* Église baroque au fond */}
      <g>
        <rect x="84" y="40" width="34" height="46" fill="#f3e8d8" />
        <path d="M84 40 h34 l-17 -12 Z" fill="#e7d6bf" />
        <rect x="78" y="34" width="10" height="52" fill="#efe0cb" />
        <rect x="114" y="34" width="10" height="52" fill="#e3d2bb" />
        <path d="M78 34 h10 l-5 -8 Z" fill="#b45309" />
        <path d="M114 34 h10 l-5 -8 Z" fill="#92400e" />
        <rect x="99" y="18" width="1.8" height="10" fill="#b45309" />
        <rect x="96" y="21" width="8" height="1.6" fill="#b45309" />
        <rect x="96" y="56" width="10" height="16" rx="5" fill="#7c3f1d" />
      </g>
      {/* La rue : façades colorées */}
      {[
        [0, 58, 26, "#f5b301", "#c88a00"], [26, 52, 22, "#4fa3d9", "#2b7fb5"],
        [48, 62, 20, "#ef6f6c", "#c74d4a"], [124, 54, 24, "#7bc47f", "#4f9a57"],
        [148, 60, 22, "#f19ecb", "#c9749f"], [170, 50, 30, "#5fc3c9", "#3b9aa0"],
      ].map(([x, y, w, face, shade], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={130 - y} fill={face} />
          <rect x={x + w - 4} y={y} width="4" height={130 - y} fill={shade} />
          <path d={`M${x - 2} ${y} h${w + 4} l-2 -5 h-${w} Z`} fill="#b45309" />
          {[0, 1].map((r) => (
            <g key={r}>
              <rect x={x + 4} y={y + 8 + r * 16} width="6" height="9" fill="#1f2937" opacity=".75" />
              <rect x={x + 13} y={y + 8 + r * 16} width="6" height="9" fill="#1f2937" opacity=".6" />
            </g>
          ))}
        </g>
      ))}
      {/* Pavés */}
      <rect x="0" y="104" width="200" height="26" fill="#9aa2ad" />
      {Array.from({ length: 22 }, (_, i) => (
        <g key={i}>
          <rect x={(i % 11) * 19 + (i > 10 ? 9 : 0)} y={106 + Math.floor(i / 11) * 9} width="15" height="6.5" rx="1.6" fill="#b6bcc6" />
        </g>
      ))}
      {/* Tambour */}
      <g transform="translate(96 108)">
        <ellipse cx="0" cy="0" rx="9" ry="3.6" fill="#f8fafc" />
        <path d="M-9 0 v7 q9 4 18 0 v-7 Z" fill="#dc2626" />
        <path d="M-9 3 q9 4 18 0" stroke="#fef3c7" strokeWidth="1" fill="none" />
      </g>
    </>
  ),

  /* Chapada Diamantina — les plateaux au couchant */
  canyon: (
    <>
      <defs>
        <linearGradient id="sc-cyn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b3a7e" /><stop offset="45%" stopColor="#e0673f" /><stop offset="100%" stopColor="#ffc46b" />
        </linearGradient>
        <linearGradient id="sc-cyn-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9c4221" /><stop offset="100%" stopColor="#5a2415" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-cyn-sky)" />
      <Sun cx={104} cy={62} r={13} color="#fff1c9" glow="#ff7a3c" />
      <Cloud x={40} y={26} s={1.1} color="#f7b48a" opacity={0.55} />
      <Cloud x={160} y={20} s={0.8} color="#f7b48a" opacity={0.45} />
      <Birds x={54} y={40} s={0.9} color="#5b2415" opacity={0.45} />
      {/* Plateaux successifs, du plus lointain au plus proche */}
      <path d="M0 78 h44 l6 -12 h34 l6 12 h50 l8 -10 h52 v14 H0 Z" fill="#c07a52" opacity=".55" />
      <path d="M0 92 h30 l8 -14 h40 l6 14 h36 l10 -12 h70 v18 H0 Z" fill="#a85c34" opacity=".8" />
      <path d="M0 130 v-24 h54 l10 -16 h44 l8 16 h84 v24 Z" fill="url(#sc-cyn-near)" />
      {/* Strates */}
      <path d="M0 112 h54 M64 104 h44 M116 112 h84 M0 120 h60 M112 120 h88" stroke="#7c3313" strokeWidth="1.2" opacity=".55" />
      {/* Cascade */}
      <path d="M78 90 q2 18 -2 34" stroke="#f8fafc" strokeWidth="3" fill="none" opacity=".85" />
      <ellipse cx="75" cy="126" rx="10" ry="3" fill="#f8fafc" opacity=".45" />
      {/* Végétation sèche */}
      {[10, 26, 130, 150, 176].map((x, i) => (
        <g key={i} transform={`translate(${x} ${118 - (i % 2) * 4})`}>
          <path d="M0 0 v-8 M0 -8 l-3 -3 M0 -8 l3 -3" stroke="#3f2a16" strokeWidth="1.2" fill="none" />
        </g>
      ))}
    </>
  ),

  /* Lençóis Maranhenses — dunes blanches et lagunes turquoise */
  dunes: (
    <>
      <defs>
        <linearGradient id="sc-dun-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#57b4e0" /><stop offset="100%" stopColor="#dff1fb" />
        </linearGradient>
        <linearGradient id="sc-dun-lagoon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#12b3c4" /><stop offset="100%" stopColor="#0891a8" />
        </linearGradient>
        <linearGradient id="sc-dun-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf6e4" /><stop offset="100%" stopColor="#ecd9b0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-dun-sky)" />
      <Sun cx={158} cy={22} r={9} color="#fffdf0" glow="#ffe9a8" />
      <Cloud x={50} y={20} s={1} opacity={0.85} />
      <Cloud x={110} y={14} s={0.7} opacity={0.6} />
      {/* Dunes lointaines */}
      <path d="M0 60 q28 -14 56 -2 q30 13 58 -4 q32 -16 86 2 v20 H0 Z" fill="#f4e7c8" />
      {/* Lagune du fond */}
      <path d="M112 74 q22 -7 44 1 q-20 8 -44 -1 Z" fill="url(#sc-dun-lagoon)" opacity=".9" />
      {/* Dunes médianes */}
      <path d="M0 80 q34 -16 68 -2 q30 12 64 -4 q34 -16 68 4 v52 H0 Z" fill="url(#sc-dun-sand)" />
      {/* Grande lagune */}
      <path d="M22 100 q34 -12 70 1 q-32 14 -70 -1 Z" fill="url(#sc-dun-lagoon)" />
      <path d="M34 99 q22 -5 44 2" stroke="#8ee7f2" strokeWidth="1.4" fill="none" opacity=".8" />
      <path d="M40 104 q18 -3 34 2" stroke="#8ee7f2" strokeWidth="1" fill="none" opacity=".55" />
      {/* Dune de premier plan avec crête */}
      <path d="M0 130 v-16 q40 -18 82 -4 q40 13 76 -6 q22 -10 42 -2 v28 Z" fill="#fbf3de" />
      <path d="M0 114 q40 -18 82 -4 q40 13 76 -6" stroke="#e3cfa4" strokeWidth="1.4" fill="none" />
      {/* Rides de sable */}
      <path d="M12 122 q20 -4 40 0 M64 126 q22 -4 44 0 M124 120 q20 -4 40 1" stroke="#e9d9b5" strokeWidth="1" fill="none" />
      {/* Petite lagune au premier plan */}
      <ellipse cx="150" cy="118" rx="18" ry="5" fill="url(#sc-dun-lagoon)" opacity=".85" />
      <Birds x={40} y={36} s={0.8} color="#475569" opacity={0.4} />
    </>
  ),

  /* Fernando de Noronha — les Dois Irmãos et les dauphins */
  dolphins: (
    <>
      <defs>
        <linearGradient id="sc-dol-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6a87c" /><stop offset="50%" stopColor="#ffd9a8" /><stop offset="100%" stopColor="#bfe8f2" />
        </linearGradient>
        <linearGradient id="sc-dol-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b7f9e" /><stop offset="55%" stopColor="#15a8bf" /><stop offset="100%" stopColor="#57cfd8" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-dol-sky)" />
      <Sun cx={40} cy={34} r={11} color="#fff4d6" glow="#ff9d5c" />
      <Cloud x={140} y={22} s={0.9} color="#ffe6cd" opacity={0.7} />
      {/* Les deux frères */}
      <g>
        <path d="M118 66 q8 -40 20 -41 q13 1 18 41 Z" fill="#3f5d52" />
        <path d="M138 25 q10 8 18 41 q-12 -20 -18 -41 Z" fill="#587a6b" />
        <path d="M152 66 q6 -26 14 -27 q9 1 12 27 Z" fill="#456357" />
        <path d="M166 39 q7 6 12 27 q-8 -14 -12 -27 Z" fill="#5f8271" />
        <path d="M122 46 q10 -4 18 2 q-11 3 -18 -2 Z" fill="#2f7a48" opacity=".7" />
      </g>
      <rect x="0" y="66" width="200" height="64" fill="url(#sc-dol-sea)" />
      <ellipse cx="146" cy="68" rx="36" ry="4" fill="#0b5f77" opacity=".4" />
      <path d="M20 70 q12 -3 24 0 q-12 3 -24 0 M26 78 q10 -2 20 0 q-10 2 -20 0" fill="#ffd9a8" opacity=".5" />
      <Foam y={74} opacity={0.35} />
      <Foam y={88} opacity={0.3} offset={8} />
      {/* Dauphin qui saute */}
      <g transform="translate(64 78) rotate(-18)">
        <path d="M0 0 q16 -16 40 -6 q-6 8 -16 10 q-14 3 -24 -4 Z" fill="#dbeafe" />
        <path d="M0 0 q16 -16 40 -6 q-10 3 -22 3 q-11 1 -18 3 Z" fill="#93a8c4" />
        <path d="M40 -6 q7 -4 10 -1 q-3 4 -10 1 Z" fill="#cbd5e1" />
        <path d="M18 -12 q4 -8 9 -2 q-5 2 -9 2 Z" fill="#cbd5e1" />
        <path d="M-2 0 q-8 2 -10 7 q7 0 12 -4 Z" fill="#93a8c4" />
        <circle cx="42" cy="-6" r="1" fill="#0f172a" />
      </g>
      {/* Ailerons plus loin */}
      <path d="M118 96 q4 -7 8 0 Z" fill="#94a3b8" />
      <path d="M134 102 q3.4 -6 7 0 Z" fill="#94a3b8" opacity=".85" />
      <ellipse cx="122" cy="97" rx="10" ry="2" fill="#ffffff" opacity=".35" />
      <ellipse cx="137" cy="103" rx="8" ry="1.6" fill="#ffffff" opacity=".3" />
      {/* Plage au premier plan */}
      <path d="M0 122 q40 -8 80 -2 q44 7 120 -4 v14 H0 Z" fill="#f6e3bd" />
      <Foam y={121} opacity={0.75} />
    </>
  ),

  /* Ouro Preto — le baroque sur la colline */
  church: (
    <>
      <defs>
        <linearGradient id="sc-chu-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7cb3e0" /><stop offset="100%" stopColor="#ffe6c4" />
        </linearGradient>
        <linearGradient id="sc-chu-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f7a52" /><stop offset="100%" stopColor="#2f5436" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-chu-sky)" />
      <Cloud x={34} y={18} s={1} opacity={0.8} />
      <Cloud x={160} y={26} s={0.75} opacity={0.6} />
      {/* Montagnes */}
      <path d="M0 56 q26 -24 52 -6 q22 -18 46 4 q26 -20 54 2 q22 -14 48 4 v20 H0 Z" fill="#7b95a8" opacity=".55" />
      <path d="M0 130 v-56 q50 -16 100 -2 q50 14 100 -4 v62 Z" fill="url(#sc-chu-hill)" />
      {/* Maisons coloniales sur la pente */}
      {[[8, 84], [30, 90], [54, 86], [140, 88], [164, 84], [182, 92]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="18" height="14" fill="#f5ead8" />
          <path d={`M${x - 2} ${y} h22 l-11 -7 Z`} fill="#b24a3a" />
          <rect x={x + 3} y={y + 4} width="4" height="5" fill="#4b5563" opacity=".7" />
          <rect x={x + 11} y={y + 4} width="4" height="5" fill="#4b5563" opacity=".6" />
        </g>
      ))}
      {/* L'église */}
      <g>
        <rect x="76" y="62" width="48" height="40" fill="#fdf6e8" />
        <rect x="68" y="56" width="14" height="46" fill="#f7ecd9" />
        <rect x="118" y="56" width="14" height="46" fill="#ecdfc8" />
        <path d="M68 56 q7 -12 14 0 Z" fill="#1f6f8b" />
        <path d="M118 56 q7 -12 14 0 Z" fill="#175a72" />
        <rect x="74.4" y="44" width="1.4" height="6" fill="#7c5c2c" />
        <rect x="124.4" y="44" width="1.4" height="6" fill="#7c5c2c" />
        <path d="M76 62 q24 -18 48 0 Z" fill="#f2e5cd" />
        <rect x="99" y="34" width="2" height="10" fill="#7c5c2c" />
        <rect x="95.5" y="37" width="9" height="1.8" fill="#7c5c2c" />
        <path d="M84 102 v-16 q16 -12 32 0 v16 Z" fill="#8c5a2b" />
        <path d="M92 102 v-11 q8 -7 16 0 v11 Z" fill="#6b4220" />
        <rect x="72" y="66" width="6" height="8" rx="3" fill="#9ca3af" opacity=".8" />
        <rect x="122" y="66" width="6" height="8" rx="3" fill="#9ca3af" opacity=".7" />
      </g>
      {/* La rue pavée qui descend vers nous */}
      <path d="M86 102 L46 130 H154 L114 102 Z" fill="#9aa2ad" />
      <path d="M86 102 L46 130 h8 L92 102 Z" fill="#aab1ba" />
      {[106, 112, 119, 127].map((y, r) => (
        <path key={r} d={`M${84 - (y - 102) * 1.45} ${y} H${116 + (y - 102) * 1.45}`}
          stroke="#7d848e" strokeWidth="1.2" opacity=".7" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${92 + ((i % 3) - 1) * (14 + Math.floor(i / 3) * 9)} ${107 + Math.floor(i / 3) * 7} h${6 + Math.floor(i / 3) * 2}`}
          stroke="#8b929c" strokeWidth="2.4" strokeLinecap="round" />
      ))}
      <Birds x={150} y={42} s={0.8} color="#475569" opacity={0.4} />
    </>
  ),

  /* Brasília — la cathédrale de Niemeyer */
  modernist: (
    <>
      <defs>
        <linearGradient id="sc-mod-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e5fa8" /><stop offset="60%" stopColor="#6fa8dc" /><stop offset="100%" stopColor="#ffd9a0" />
        </linearGradient>
        <linearGradient id="sc-mod-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b7a8c" /><stop offset="100%" stopColor="#3aa8bd" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-mod-sky)" />
      <Sun cx={170} cy={30} r={8} color="#fff6dd" glow="#ffd08a" />
      <Cloud x={44} y={22} s={0.9} opacity={0.5} />
      {/* Esplanade */}
      <rect x="0" y="96" width="200" height="34" fill="#cbb994" />
      <rect x="0" y="96" width="200" height="3" fill="#a8946f" />
      {/* Le vitrail, tendu entre les nervures : la silhouette se resserre
          à mi-hauteur puis s'ouvre, comme deux mains qui se lèvent. */}
      <path d="M58 96 Q74 58 66 22 L134 22 Q126 58 142 96 Z" fill="url(#sc-mod-glass)" opacity=".95" />
      <path d="M58 96 Q74 58 66 22 L100 22 Q100 58 100 96 Z" fill="#0f5f70" opacity=".35" />
      {/* Les nervures de béton */}
      {Array.from({ length: 15 }, (_, i) => {
        const t = (i - 7) / 7;
        return (
          <path key={i} d={`M${100 + t * 42} 96 Q${100 + t * 26} 58 ${100 + t * 34} 22`}
            stroke="#f8fafc" strokeWidth={t === 0 ? 3.4 : 3.4 - Math.abs(t) * 1.1} fill="none" strokeLinecap="round" />
        );
      })}
      {/* L'anneau du sommet et le socle */}
      <ellipse cx="100" cy="22" rx="34" ry="4.5" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      <ellipse cx="100" cy="96" rx="43" ry="5" fill="#e8e2d2" />
      {/* Bassin et reflet */}
      <ellipse cx="100" cy="100" rx="58" ry="7" fill="#7fb6d6" opacity=".7" />
      <path d="M62 100 q8 26 38 28 q30 -2 38 -28 Z" fill="#8cc3e0" opacity=".35" />
      {/* Les anges suspendus, en clin d'œil */}
      <ellipse cx="86" cy="52" rx="3" ry="5" fill="#f8fafc" opacity=".8" />
      <ellipse cx="112" cy="46" rx="3" ry="5" fill="#f8fafc" opacity=".7" />
      {/* Le drapeau au loin */}
      <line x1="178" y1="96" x2="178" y2="62" stroke="#94a3b8" strokeWidth="1.4" />
      <path d="M178 64 h14 v9 h-14 Z" fill="#16a34a" />
      <path d="M185 64 l7 4.5 l-7 4.5 l-7 -4.5 Z" fill="#facc15" />
      <circle cx="185" cy="68.5" r="2" fill="#1d4ed8" />
    </>
  ),

  /* Avenida Paulista — la ville qui ne s'arrête jamais */
  skyline: (
    <>
      <defs>
        <linearGradient id="sc-sky-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15213f" /><stop offset="60%" stopColor="#5b4a7a" /><stop offset="100%" stopColor="#e88b5a" />
        </linearGradient>
        <linearGradient id="sc-sky-tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b4a63" /><stop offset="100%" stopColor="#222c40" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-sky-sky)" />
      <circle cx="40" cy="26" r="7" fill="#fdf6e3" opacity=".9" />
      <circle cx="37" cy="24" r="6" fill="#5b4a7a" opacity=".55" />
      {[14, 62, 96, 150, 182].map((x, i) => <circle key={i} cx={x} cy={12 + (i % 3) * 8} r=".9" fill="#fff" opacity=".7" />)}
      {/* Tours lointaines */}
      {[[6, 62, 14], [24, 54, 12], [40, 66, 16], [60, 50, 14], [78, 60, 12], [96, 44, 16], [116, 58, 14], [136, 52, 12], [152, 64, 16], [172, 48, 18]].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={130 - y} fill="url(#sc-sky-tower)" opacity={0.75 + (i % 3) * 0.08} />
          {Array.from({ length: Math.floor((120 - y) / 9) }, (_, r) => (
            <g key={r}>
              <rect x={x + 2} y={y + 5 + r * 9} width="3" height="3.4" fill="#ffd98a" opacity={(i + r) % 3 ? 0.85 : 0.25} />
              <rect x={x + 7} y={y + 5 + r * 9} width="3" height="3.4" fill="#ffd98a" opacity={(i + r) % 4 ? 0.7 : 0.2} />
              {w > 14 && <rect x={x + 12} y={y + 5 + r * 9} width="3" height="3.4" fill="#ffd98a" opacity={(i + r) % 2 ? 0.8 : 0.25} />}
            </g>
          ))}
        </g>
      ))}
      {/* Le MASP et ses piliers rouges */}
      <g transform="translate(74 86)">
        <rect x="0" y="0" width="56" height="16" fill="#e2e8f0" opacity=".95" />
        <rect x="0" y="0" width="56" height="4" fill="#cbd5e1" />
        <rect x="2" y="16" width="5" height="18" fill="#dc2626" />
        <rect x="49" y="16" width="5" height="18" fill="#dc2626" />
        <rect x="0" y="-3" width="56" height="3" fill="#dc2626" />
      </g>
      {/* L'avenue */}
      <rect x="0" y="120" width="200" height="10" fill="#1b2231" />
      <path d="M0 125 h20 M30 125 h20 M60 125 h20 M90 125 h20 M120 125 h20 M150 125 h20 M180 125 h20" stroke="#fbbf24" strokeWidth="1.4" opacity=".8" />
      <circle cx="26" cy="118" r="2" fill="#fca5a5" opacity=".9" />
      <circle cx="164" cy="118" r="2" fill="#fef08a" opacity=".9" />
    </>
  ),

  /* Pantanal — le jaguar au bord de l'eau */
  wildlife: (
    <>
      <defs>
        <linearGradient id="sc-wld-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2a65a" /><stop offset="55%" stopColor="#ffd9a0" /><stop offset="100%" stopColor="#fdf0d5" />
        </linearGradient>
        <linearGradient id="sc-wld-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c98f4f" /><stop offset="100%" stopColor="#8a5f2e" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-wld-sky)" />
      <Sun cx={158} cy={40} r={12} color="#fff2cf" glow="#ff9a4d" />
      {/* Forêt lointaine */}
      <TreeLine fill="#3f6b43" opacity={0.9} trees={[
        [6, 56, 9], [22, 52, 12], [40, 57, 8], [56, 51, 11], [74, 56, 10],
        [92, 53, 9], [110, 57, 12], [130, 52, 10], [148, 56, 9], [166, 51, 12], [186, 56, 10],
      ]} />
      <rect x="0" y="60" width="200" height="6" fill="#2f5636" opacity=".8" />
      <rect x="0" y="66" width="200" height="30" fill="url(#sc-wld-water)" />
      <path d="M10 72 q22 -3 44 0 M70 80 q26 -3 52 0 M130 74 q20 -3 40 0" stroke="#e5b876" strokeWidth="1.1" fill="none" opacity=".6" />
      <ellipse cx="120" cy="86" rx="26" ry="4" fill="#fdf0d5" opacity=".25" />
      <rect x="0" y="96" width="200" height="34" fill="#6f8f4a" />
      <path d="M0 96 q40 -6 80 -1 q44 6 120 -3 v6 H0 Z" fill="#8aa85e" />
      {/* Jabiru, l'oiseau emblème de la plaine */}
      <g transform="translate(34 78)">
        <path d="M0 0 q3 -11 12 -8 q6 3 3 9 q-8 3 -15 -1 Z" fill="#f8fafc" />
        <path d="M11 -9 q1 -9 5 -9 q3 1 1 9 Z" fill="#1f2937" />
        <path d="M15 -17 q9 -3 12 0 q-9 3 -12 0 Z" fill="#1f2937" />
        <path d="M11 -9 q3 -2 5 0 q-1 3 -5 1 Z" fill="#dc2626" />
        <path d="M4 1 v11 M9 1 v11" stroke="#334155" strokeWidth="1.1" />
        <path d="M2 12 h5 M7 12 h5" stroke="#334155" strokeWidth="1" />
        <path d="M-1 -2 q-7 2 -9 6 q7 0 11 -3 Z" fill="#e2e8f0" />
      </g>
      {/* Le jaguar, de profil, au bord de l'eau */}
      <g transform="translate(92 86)">
        {/* pattes arrière puis avant, pour l'épaisseur */}
        <path d="M-22 6 q-5 10 -3 18 l6 0 q-1 -9 2 -16 Z" fill="#c78a33" />
        <path d="M18 6 q4 10 2 18 l-6 0 q0 -9 -3 -16 Z" fill="#c78a33" />
        {/* queue */}
        <path d="M-26 0 q-16 -2 -22 -14 q-2 -5 3 -4 q3 9 19 12 Z" fill="#d99a3f" />
        <path d="M-46 -16 q-4 -2 -2 -5 q4 1 4 5 Z" fill="#3f2a16" />
        {/* corps */}
        <path d="M-26 2 q2 -13 16 -14 q14 -1 24 2 q10 2 12 10 q1 8 -6 10 q-20 4 -38 1 q-9 -2 -8 -9 Z" fill="#e8b055" />
        <path d="M-26 4 q20 7 46 0 q-2 6 -8 7 q-20 4 -32 0 q-6 -2 -6 -7 Z" fill="#d99a3f" />
        {/* pattes avant */}
        <path d="M12 12 q3 9 2 14 l-5 0 q0 -8 -2 -13 Z" fill="#e8b055" />
        <path d="M-16 12 q-3 9 -2 14 l5 0 q0 -8 2 -13 Z" fill="#e8b055" />
        {/* tête */}
        <g transform="translate(30 -8)">
          <ellipse cx="0" cy="0" rx="11" ry="9.5" fill="#e8b055" />
          <path d="M-8 -7 q-2 -7 4 -6 q3 2 2 6 Z" fill="#d99a3f" />
          <path d="M8 -7 q2 -7 -4 -6 q-3 2 -2 6 Z" fill="#d99a3f" />
          <path d="M-7 -7 q-1 -4 2 -4 q1 2 1 4 Z" fill="#7c3f14" opacity=".6" />
          <path d="M7 -7 q1 -4 -2 -4 q-1 2 -1 4 Z" fill="#7c3f14" opacity=".6" />
          <ellipse cx="2" cy="4" rx="7" ry="5" fill="#f5d9a8" />
          <circle cx="-4" cy="-1" r="1.8" fill="#1f2937" />
          <circle cx="5" cy="-1" r="1.8" fill="#1f2937" />
          <circle cx="-3.4" cy="-1.6" r=".6" fill="#fff" />
          <circle cx="5.6" cy="-1.6" r=".6" fill="#fff" />
          <path d="M1.4 2.6 h3.4 l-1.7 2.2 Z" fill="#7c3f14" />
          <path d="M3 5 q-3 2.6 -5.6 .6 M3 5 q3 2.6 5.6 .6" stroke="#a9702a" strokeWidth=".9" fill="none" />
          <path d="M-6 3 q-7 1 -9 -1 M-6 5 q-7 2 -9 1" stroke="#f5d9a8" strokeWidth=".6" fill="none" opacity=".8" />
        </g>
        {/* rosettes */}
        {[[-20, -2], [-12, 4], [-4, -4], [2, 5], [10, -2], [16, 5], [-16, -6], [6, -7], [20, -6], [-8, 8]].map(([x, y], i) => (
          <g key={i} opacity=".7">
            <circle cx={x} cy={y} r="2.4" fill="none" stroke="#7c3f14" strokeWidth="1.1" />
            <circle cx={x} cy={y} r=".7" fill="#7c3f14" />
          </g>
        ))}
      </g>
      {/* Reflet et roseaux */}
      <ellipse cx="92" cy="112" rx="32" ry="3.5" fill="#4a3a1c" opacity=".28" />
      {[6, 14, 174, 186, 194].map((x, i) => (
        <path key={i} d={`M${x} 130 q2 -18 ${i % 2 ? 5 : -4} -30`} stroke="#4f7a3a" strokeWidth="1.6" fill="none" />
      ))}
      <Birds x={60} y={34} s={0.8} color="#8a5a2a" opacity={0.45} />
    </>
  ),

  /* Jericoacoara — le kite au coucher du soleil */
  kite: (
    <>
      <defs>
        <linearGradient id="sc-kit-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f26d5b" /><stop offset="50%" stopColor="#ffb26b" /><stop offset="100%" stopColor="#ffe7b0" />
        </linearGradient>
        <linearGradient id="sc-kit-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b5713c" /><stop offset="100%" stopColor="#7a4a25" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-kit-sky)" />
      <Sun cx={132} cy={74} r={15} color="#fff3cd" glow="#ff6b3d" />
      <Cloud x={40} y={22} s={1.1} color="#ffc9a0" opacity={0.6} />
      <rect x="0" y="86" width="200" height="44" fill="url(#sc-kit-sea)" />
      <path d="M118 88 q14 -3 28 0 q-14 4 -28 0 M122 96 q10 -2 20 0 q-10 3 -20 0 M126 104 q8 -2 16 0 q-8 2 -16 0" fill="#ffd9a0" opacity=".55" />
      <Foam y={92} color="#ffe3bd" opacity={0.4} />
      {/* La Pedra Furada */}
      <g>
        <path d="M14 86 q4 -26 16 -27 q8 1 11 12 q6 -2 9 4 q4 8 2 11 Z" fill="#4b3a2a" />
        <path d="M30 78 q7 -8 13 -1 q-6 7 -13 1 Z" fill="#ffb26b" />
      </g>
      {/* Dune */}
      <path d="M0 130 v-20 q30 -14 62 -4 q28 9 56 -2 q34 -12 82 2 v24 Z" fill="#e8c88f" />
      <path d="M0 110 q30 -14 62 -4 q28 9 56 -2" stroke="#d3ab6c" strokeWidth="1.4" fill="none" />
      {/* Le kitesurfeur */}
      <g>
        <path d="M60 22 q18 -12 34 4 q-16 10 -34 -4 Z" fill="#ef4444" />
        <path d="M63 23 q14 -9 27 3 q-13 6 -27 -3 Z" fill="#facc15" opacity=".9" />
        <path d="M70 26 q8 24 20 46" stroke="#f8fafc" strokeWidth=".7" fill="none" opacity=".8" />
        <path d="M86 28 q3 22 6 44" stroke="#f8fafc" strokeWidth=".7" fill="none" opacity=".8" />
        <g transform="translate(88 72)">
          <circle cx="0" cy="-6" r="2.6" fill="#1f2937" />
          <path d="M0 -4 q-4 5 -2 10 l4 0 q2 -6 0 -10 Z" fill="#1f2937" />
          <path d="M-4 8 q6 3 10 -2" stroke="#1f2937" strokeWidth="2" fill="none" />
          <path d="M-8 8 h18 l-2 2 h-14 Z" fill="#0ea5e9" />
        </g>
        <path d="M78 84 q12 -3 22 2" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity=".7" />
      </g>
      <Birds x={160} y={30} s={0.8} color="#7c3f14" opacity={0.45} />
    </>
  ),

  /* Olinda — les géants du carnaval */
  carnival: (
    <>
      <defs>
        <linearGradient id="sc-car-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" /><stop offset="60%" stopColor="#d946ef" /><stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-car-sky)" />
      {[16, 44, 72, 110, 150, 182, 30, 128, 166].map((x, i) => (
        <circle key={i} cx={x} cy={10 + (i % 4) * 9} r="1.6" fill="#fef9c3" opacity=".8" />
      ))}
      {/* Façades en pente */}
      {[[0, 62, 30, "#fcd34d"], [30, 56, 26, "#60a5fa"], [56, 64, 24, "#f472b6"], [140, 58, 26, "#34d399"], [166, 66, 34, "#fb923c"]].map(([x, y, w, c], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={130 - y} fill={c} opacity=".92" />
          <path d={`M${x - 2} ${y} h${w + 4} l-3 -6 h-${w - 2} Z`} fill="#b45309" />
          <rect x={x + 5} y={y + 10} width="7" height="10" fill="#1e293b" opacity=".65" />
          <rect x={x + 15} y={y + 10} width="7" height="10" fill="#1e293b" opacity=".5" />
        </g>
      ))}
      {/* Les géants de papier mâché */}
      <g transform="translate(84 40)">
        <path d="M14 34 q-18 6 -20 56 h40 q-2 -50 -20 -56 Z" fill="#22d3ee" />
        <circle cx="14" cy="18" r="18" fill="#fde68a" />
        <path d="M-4 14 q18 -22 36 0 q-18 -8 -36 0 Z" fill="#7c2d12" />
        <circle cx="8" cy="18" r="2.4" fill="#1f2937" />
        <circle cx="20" cy="18" r="2.4" fill="#1f2937" />
        <path d="M7 26 q7 6 14 0" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="4" cy="24" r="2.6" fill="#fb7185" opacity=".8" />
        <circle cx="24" cy="24" r="2.6" fill="#fb7185" opacity=".8" />
        <path d="M14 0 q-8 -8 -2 -12 M14 0 q8 -8 2 -12" stroke="#fbbf24" strokeWidth="2.4" fill="none" />
      </g>
      <g transform="translate(46 56) scale(.78)">
        <path d="M14 34 q-18 6 -20 56 h40 q-2 -50 -20 -56 Z" fill="#f97316" />
        <circle cx="14" cy="18" r="18" fill="#fbcfe8" />
        <path d="M-4 12 q18 -20 36 0 q-18 -9 -36 0 Z" fill="#111827" />
        <circle cx="8" cy="18" r="2.4" fill="#1f2937" />
        <circle cx="20" cy="18" r="2.4" fill="#1f2937" />
        <path d="M8 26 q6 5 12 0" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
      {/* L'ombrelle du frevo */}
      <g transform="translate(150 88)">
        <line x1="0" y1="0" x2="0" y2="-14" stroke="#78350f" strokeWidth="1.6" />
        <path d="M-13 -13 q13 -12 26 0 Z" fill="#ef4444" />
        <path d="M-13 -13 q6.5 -6 13 0 Z" fill="#facc15" />
        <path d="M0 -13 q6.5 -6 13 0 Z" fill="#22c55e" />
      </g>
      {/* Confettis */}
      {[[20, 84, "#fde047"], [64, 92, "#22d3ee"], [120, 78, "#f472b6"], [170, 96, "#4ade80"], [38, 104, "#fb923c"], [140, 110, "#a78bfa"]].map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="4" height="2.6" rx="1" fill={c} transform={`rotate(${i * 37} ${x} ${y})`} />
      ))}
      <rect x="0" y="118" width="200" height="12" fill="#6b7280" />
      <path d="M0 122 h200" stroke="#9ca3af" strokeWidth="2" />
    </>
  ),

  /* Paraty — la goélette devant la ville coloniale */
  sailboat: (
    <>
      <defs>
        <linearGradient id="sc-sail-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="sc-sail-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" /><stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-sail-sky)" />
      <Cloud x={44} y={18} s={1.1} opacity={0.85} />
      <Cloud x={150} y={26} s={0.8} opacity={0.65} />
      {/* Serra au fond */}
      <path d="M0 62 q24 -26 48 -8 q20 -22 44 2 q24 -20 50 4 q22 -14 58 2 v10 H0 Z" fill="#3f6b57" opacity=".75" />
      <path d="M0 66 q30 -12 60 -2 q34 10 70 -2 q34 -10 70 2 v6 H0 Z" fill="#2f5646" opacity=".85" />
      {/* La ville blanche */}
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <rect x={6 + i * 22} y={70} width="18" height="12" fill="#fdfcf7" />
          <path d={`M${4 + i * 22} 70 h22 l-11 -6 Z`} fill="#b45309" />
          <rect x={10 + i * 22} y={74} width="4" height="6" fill="#1d4ed8" opacity=".75" />
          <rect x={17 + i * 22} y={74} width="4" height="6" fill="#1d4ed8" opacity=".6" />
        </g>
      ))}
      <rect x="0" y="82" width="200" height="4" fill="#9aa2ad" />
      <rect x="0" y="86" width="200" height="44" fill="url(#sc-sail-sea)" />
      {/* Reflets */}
      <path d="M8 94 q20 -3 40 0 M60 102 q24 -3 48 0 M120 96 q22 -3 44 0 M30 112 q26 -3 52 0" stroke="#93c5fd" strokeWidth="1.2" fill="none" opacity=".7" />
      {/* La goélette */}
      <g transform="translate(96 100)">
        <path d="M-30 0 q30 12 60 0 l-8 8 h-44 Z" fill="#7c3f1d" />
        <path d="M-30 0 q30 12 60 0 l-2 2 q-28 10 -56 0 Z" fill="#5b2f14" />
        <line x1="-6" y1="0" x2="-6" y2="-34" stroke="#3f2a16" strokeWidth="2" />
        <line x1="14" y1="0" x2="14" y2="-26" stroke="#3f2a16" strokeWidth="1.6" />
        <path d="M-6 -34 q-18 16 -2 30 Z" fill="#fdfcf7" />
        <path d="M-6 -32 q16 12 2 26 Z" fill="#e8eaef" />
        <path d="M14 -26 q12 10 1 20 Z" fill="#fdfcf7" opacity=".95" />
        <path d="M-6 -36 l10 2 l-10 3 Z" fill="#16a34a" />
      </g>
      <ellipse cx="96" cy="112" rx="32" ry="4" fill="#1e40af" opacity=".35" />
      <path d="M150 104 h10 l-1.6 3 h-7 Z" fill="#fdfcf7" opacity=".85" />
      <path d="M155 104 v-6 l4 6 Z" fill="#fdfcf7" opacity=".8" />
      <Birds x={40} y={36} s={0.9} color="#334155" opacity={0.45} />
    </>
  ),

  /* Bonito — la rivière transparente, vue de dessous */
  reef: (
    <>
      <defs>
        <linearGradient id="sc-reef-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a5f3fc" /><stop offset="45%" stopColor="#22b8cf" /><stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="sc-reef-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".55" /><stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-reef-water)" />
      {/* Surface */}
      <path d="M0 12 q14 -7 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t32 0 V0 H0 Z" fill="#e0fbff" opacity=".85" />
      <Foam y={14} color="#ffffff" opacity={0.5} />
      {/* Rayons de soleil */}
      {[30, 74, 120, 164].map((x, i) => (
        <path key={i} d={`M${x} 12 l${-10 - i * 2} 96 l${26 + i * 3} 0 Z`} fill="url(#sc-reef-ray)" opacity=".6" />
      ))}
      {/* Fond et plantes */}
      <path d="M0 130 v-22 q30 -10 60 -4 q38 8 78 -4 q34 -10 62 2 v28 Z" fill="#c9a86c" />
      {[16, 40, 150, 178].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 112 q-6 -18 2 -30 q6 14 -2 30 Z`} fill="#0f766e" opacity=".9" />
          <path d={`M${x + 7} 114 q-5 -14 1 -24 q5 12 -1 24 Z`} fill="#15803d" opacity=".85" />
        </g>
      ))}
      {/* Banc de poissons */}
      {[[54, 46, 1, "#fbbf24"], [76, 56, 1.15, "#fb923c"], [98, 42, 0.9, "#facc15"], [116, 60, 1.1, "#f97316"], [138, 48, 0.95, "#fbbf24"], [86, 76, 1.05, "#fdba74"], [60, 84, 0.85, "#fcd34d"]].map(([x, y, s, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse cx="0" cy="0" rx="8" ry="4.4" fill={c} />
          <path d="M-8 0 l-6 -4 v8 Z" fill={c} />
          <path d="M0 -4.4 q3 -4 5 0 Z" fill={c} opacity=".8" />
          <circle cx="4.6" cy="-1" r="1.1" fill="#1f2937" />
          <path d="M-2 -3 q3 3 0 6" stroke="#b45309" strokeWidth=".7" fill="none" opacity=".6" />
        </g>
      ))}
      {/* Poisson d'argent plus gros */}
      <g transform="translate(150 92)">
        <ellipse cx="0" cy="0" rx="12" ry="6" fill="#cbd5e1" />
        <path d="M-12 0 l-8 -5 v10 Z" fill="#94a3b8" />
        <circle cx="7" cy="-1.4" r="1.4" fill="#0f172a" />
      </g>
      {/* Bulles */}
      {[[36, 70, 2.4], [42, 58, 1.6], [46, 46, 1.1], [168, 60, 2], [172, 48, 1.3]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity=".55" />
      ))}
    </>
  ),

  /* Porto de Galinhas — la jangada et les piscines naturelles */
  fishpools: (
    <>
      <defs>
        <linearGradient id="sc-fp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#e0f2fe" />
        </linearGradient>
        <linearGradient id="sc-fp-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0891b2" /><stop offset="55%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-fp-sky)" />
      <Sun cx={38} cy={24} r={10} color="#fffbe8" glow="#fde68a" />
      <Cloud x={130} y={20} s={1} opacity={0.85} />
      <rect x="0" y="52" width="200" height="78" fill="url(#sc-fp-sea)" />
      <Foam y={58} opacity={0.35} />
      {/* Récifs qui dessinent les piscines */}
      <path d="M-10 86 q40 -14 84 -4 q46 10 130 -6" stroke="#a16207" strokeWidth="5" fill="none" opacity=".75" />
      <path d="M-10 108 q46 -12 92 -2 q44 10 122 -6" stroke="#a16207" strokeWidth="4" fill="none" opacity=".6" />
      <ellipse cx="66" cy="98" rx="46" ry="12" fill="#a5f3fc" opacity=".55" />
      <ellipse cx="150" cy="118" rx="40" ry="10" fill="#a5f3fc" opacity=".45" />
      {/* La jangada */}
      <g transform="translate(112 62)">
        <path d="M-26 0 h52 l-4 5 h-44 Z" fill="#b45309" />
        <path d="M-26 0 h52 l-1 1.6 h-50 Z" fill="#92400e" />
        <line x1="0" y1="0" x2="0" y2="-30" stroke="#78350f" strokeWidth="1.8" />
        <path d="M0 -30 q20 14 4 26 h-4 Z" fill="#fdfcf7" />
        <path d="M0 -26 q13 11 2 20 h-2 Z" fill="#e2e8f0" />
        <circle cx="-10" cy="-4" r="2.4" fill="#1e293b" />
      </g>
      <ellipse cx="112" cy="70" rx="26" ry="3" fill="#0e7490" opacity=".35" />
      {/* Poissons dans la piscine */}
      {[[46, 96, "#fb923c"], [72, 102, "#fbbf24"], [96, 94, "#f97316"], [140, 116, "#fcd34d"], [164, 112, "#fb923c"]].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${0.8 + (i % 3) * 0.12})`}>
          <ellipse cx="0" cy="0" rx="6" ry="3.2" fill={c} />
          <path d="M-6 0 l-4.4 -3 v6 Z" fill={c} />
          <circle cx="3.4" cy="-.8" r=".9" fill="#1f2937" />
        </g>
      ))}
      {/* Étoile de mer et sable */}
      <path d="M182 100 l2.6 5.4 l6 .8 l-4.4 4.2 l1 6 l-5.2 -2.8 l-5.2 2.8 l1 -6 l-4.4 -4.2 l6 -.8 Z" fill="#fb7185" opacity=".9" />
      <path d="M0 130 v-8 q30 -6 60 -2 q40 6 140 -4 v14 Z" fill="#f5e0b5" />
    </>
  ),

  /* Gramado — l'hiver austral et ses chalets */
  snowvillage: (
    <>
      <defs>
        <linearGradient id="sc-snw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" /><stop offset="60%" stopColor="#475d80" /><stop offset="100%" stopColor="#94a8c4" />
        </linearGradient>
        <linearGradient id="sc-snw-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" /><stop offset="100%" stopColor="#dbe4ee" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-snw-sky)" />
      <circle cx="166" cy="24" r="9" fill="#fef9e7" opacity=".95" />
      <circle cx="162" cy="21" r="7.5" fill="#3f527a" opacity=".5" />
      {[14, 38, 66, 96, 124, 150, 186, 28, 110].map((x, i) => (
        <circle key={i} cx={x} cy={8 + (i % 4) * 7} r="1.2" fill="#fff" opacity=".8" />
      ))}
      {/* Montagnes */}
      <path d="M0 62 q28 -28 54 -6 q24 -22 50 4 q26 -18 52 2 q22 -12 44 4 v14 H0 Z" fill="#33415c" />
      <path d="M40 46 q8 6 14 10 q-14 2 -14 -10 Z" fill="#e2e8f0" opacity=".8" />
      <path d="M104 44 q8 6 14 12 q-14 2 -14 -12 Z" fill="#e2e8f0" opacity=".7" />
      {/* Sapins */}
      {[[10, 88, 1], [28, 92, .8], [172, 90, .95], [190, 86, 1.1], [56, 86, .7]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect x="-1.4" y="0" width="3" height="7" fill="#4b3a2a" />
          <path d="M0 -26 l-10 14 h20 Z" fill="#14532d" />
          <path d="M0 -18 l-12 16 h24 Z" fill="#166534" />
          <path d="M0 -10 l-13 12 h26 Z" fill="#15803d" />
          <path d="M0 -26 l-10 14 h6 Z" fill="#e2e8f0" opacity=".45" />
        </g>
      ))}
      {/* Chalets */}
      <g>
        <rect x="66" y="76" width="34" height="26" fill="#f3ede3" />
        <path d="M62 76 h42 l-21 -16 Z" fill="#8c3b2f" />
        <path d="M62 76 h42 l-2 -1.6 h-38 Z" fill="#f8fafc" />
        <rect x="72" y="84" width="8" height="8" fill="#fbbf24" />
        <rect x="86" y="84" width="8" height="8" fill="#fbbf24" opacity=".85" />
        <rect x="78" y="94" width="9" height="8" fill="#7c3f1d" />
        <rect x="90" y="60" width="5" height="10" fill="#6b7280" />
        <path d="M92 58 q3 -6 -1 -8" stroke="#cbd5e1" strokeWidth="1.4" fill="none" opacity=".7" />
      </g>
      <g transform="translate(112 84) scale(.82)">
        <rect x="0" y="0" width="34" height="24" fill="#e8e0d2" />
        <path d="M-4 0 h42 l-19 -14 Z" fill="#3f6b57" />
        <rect x="6" y="8" width="8" height="8" fill="#fbbf24" opacity=".9" />
        <rect x="20" y="8" width="8" height="8" fill="#fbbf24" opacity=".7" />
      </g>
      {/* Sol enneigé */}
      <path d="M0 130 v-28 q40 -10 82 -4 q48 7 118 -4 v36 Z" fill="url(#sc-snw-ground)" />
      {/* Guirlandes de Noël */}
      <path d="M60 72 q40 14 84 -4" stroke="#94a3b8" strokeWidth=".7" fill="none" opacity=".6" />
      {[66, 80, 94, 108, 122, 136].map((x, i) => (
        <circle key={i} cx={x} cy={76 + Math.sin(i * 1.2) * 4} r="1.6" fill={["#ef4444", "#fbbf24", "#22c55e"][i % 3]} />
      ))}
      {/* Flocons */}
      {[[20, 110], [48, 118], [140, 112], [170, 120], [92, 116], [120, 124]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#ffffff" opacity=".9" />
      ))}
    </>
  ),
};

export function SceneArt({ scene, className = "" }) {
  const content = SCENES[scene] || SCENES.beach;
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} preserveAspectRatio="xMidYMid slice" className={className}>
      {content}
    </svg>
  );
}
