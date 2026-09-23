import React from "react";

/* ==================================================================
   LES VINGT PAYSAGES DES CARTES POSTALES

   Chaque carte est une illustration construite en plans : un ciel qui
   donne l'heure du lieu, un arrière-plan voilé de brume pour la
   profondeur, le sujet avec sa face éclairée et sa face à l'ombre, et
   un premier plan sombre qui encadre. On y glisse presque toujours une
   silhouette humaine : c'est elle qui donne l'échelle et fait qu'un
   dessin ressemble à un endroit où l'on pourrait être.
   ================================================================== */

const VB = { w: 200, h: 130 };

/* --- Petites pièces réutilisables --------------------------------- */

function Sun({ cx, cy, r = 11, color = "#ffd98a", glow = "#ffb86b", rays = false }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 3} fill={glow} opacity=".12" />
      <circle cx={cx} cy={cy} r={r * 2} fill={glow} opacity=".18" />
      <circle cx={cx} cy={cy} r={r * 1.4} fill={glow} opacity=".25" />
      <circle cx={cx} cy={cy} r={r} fill={color} />
      {rays && [0, 30, 60, 90, 120, 150].map((a) => (
        <line key={a} x1={cx - r * 2.4} y1={cy} x2={cx + r * 2.4} y2={cy} stroke={color} strokeWidth=".7"
          opacity=".28" transform={`rotate(${a} ${cx} ${cy})`} />
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
      <ellipse cx="1" cy="-3.5" rx="7.5" ry="4.8" fill={color} />
      <ellipse cx="-3" cy="-1" rx="6" ry="4" fill={color} opacity=".85" />
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
      {[0, 1, 2, 3, 4].map((i) => <line key={i} x1={-1.5 + i * 0.6} y1={-4 - i * 5} x2={1.5 + i * 0.6} y2={-4.6 - i * 5} stroke="#3f2f20" strokeWidth=".7" opacity=".5" />)}
      <path d="M1 -28 q-14 -5 -19 3 q10 -1 19 0" fill={leaf} />
      <path d="M1 -28 q14 -6 20 2 q-11 -1 -20 1" fill={leaf} />
      <path d="M1 -28 q-9 -12 -2 -18 q5 8 4 18" fill={dark} />
      <path d="M1 -28 q11 -10 16 -4 q-9 1 -16 5" fill={dark} />
      <path d="M1 -28 q-16 2 -19 9 q11 -5 19 -6" fill={dark} opacity=".8" />
      <circle cx="1" cy="-28" r="1.8" fill="#854d0e" />
    </g>
  );
}

/* Une silhouette humaine : deux traits et une tête, juste pour l'échelle. */
function Person({ x, y, s = 1, color = "#1f2937", opacity = 0.8 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <circle cx="0" cy="-7" r="1.7" fill={color} />
      <path d="M0 -5.4 v4 M0 -1.4 l-1.8 3.4 M0 -1.4 l1.8 3.4 M-1.6 -4 h3.2" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
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
function Foam({ y, color = "#ffffff", opacity = 0.7, offset = 0, w = 1.6 }) {
  return (
    <path d={`M${-10 + offset} ${y} q12 -3 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0`}
      stroke={color} strokeWidth={w} fill="none" opacity={opacity} strokeLinecap="round" />
  );
}

/* Le voile de brume qui sépare deux plans */
function Haze({ y, h = 10, color = "#ffffff", opacity = 0.35 }) {
  return <rect x="0" y={y} width="200" height={h} fill={color} opacity={opacity} />;
}

/* --- Les scènes ---------------------------------------------------- */

const SCENES = {
  /* Cristo Redentor — le crépuscule sur la baie */
  mountain: (
    <>
      <defs>
        <linearGradient id="sc-mnt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e2163" /><stop offset="42%" stopColor="#8d4b86" />
          <stop offset="72%" stopColor="#d9707a" /><stop offset="100%" stopColor="#ffb07a" />
        </linearGradient>
        <linearGradient id="sc-mnt-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a66a87" /><stop offset="45%" stopColor="#4d4a7e" /><stop offset="100%" stopColor="#242a55" />
        </linearGradient>
        <linearGradient id="sc-mnt-rock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#25563f" /><stop offset="42%" stopColor="#173a2c" /><stop offset="100%" stopColor="#0c2119" />
        </linearGradient>
        <linearGradient id="sc-mnt-stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f6f4ec" /><stop offset="52%" stopColor="#dedbd0" /><stop offset="100%" stopColor="#a8a59b" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-mnt-sky)" />
      <Sun cx={160} cy={56} r={8} color="#ffeec2" glow="#ff8f5a" />
      <Cloud x={36} y={22} s={1.2} color="#e2a8a6" opacity={0.45} />
      <Cloud x={112} y={14} s={0.8} color="#eab8ab" opacity={0.35} />
      <path d="M0 40 q40 -4 78 2 M120 30 q34 -5 70 1" stroke="#f3c3a4" strokeWidth="1.6" fill="none" opacity=".35" />

      {/* La baie et Niterói en face */}
      <path d="M0 68 h200 v62 H0 Z" fill="url(#sc-mnt-sea)" />
      <path d="M150 68 q6 -14 12 -15 q7 1 10 15 Z" fill="#241f4a" opacity=".9" />
      <path d="M176 68 q4 -9 8 -10 q5 1 7 10 Z" fill="#241f4a" opacity=".8" />
      <path d="M116 68 q5 -8 9 -9 q5 1 7 9 Z" fill="#2b2550" opacity=".7" />
      {[122, 131, 155, 163, 172, 183, 191].map((x, i) => (
        <rect key={i} x={x} y={64 - (i % 3)} width="1.2" height={3 + (i % 3)} fill="#ffd9a8" opacity=".55" />
      ))}
      <path d="M118 69 q12 -3 26 0 q-13 3 -26 0 M126 75 q10 -2 20 0 q-10 3 -20 0 M132 82 q8 -2 16 0 q-8 2 -16 0 M138 90 q6 -2 12 0 q-6 2 -12 0" fill="#ffcf9e" opacity=".4" />
      <Foam y={96} color="#e8bfa8" opacity={0.18} />

      {/* Le Corcovado */}
      <path d="M2 130 q26 -68 66 -87 q42 17 62 87 Z" fill="url(#sc-mnt-rock)" />
      <path d="M68 43 q24 13 44 55 q-28 -22 -44 -55 Z" fill="#2f7c58" opacity=".5" />
      {[[26, 108, 7], [42, 96, 6], [16, 118, 6], [96, 106, 7], [110, 118, 6], [56, 88, 5], [84, 92, 5]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.8} fill="#1b4632" opacity=".85" />
      ))}
      <path d="M40 130 q16 -22 28 -24 q14 2 26 24" stroke="#0a1a14" strokeWidth="1.4" fill="none" opacity=".5" />

      {/* Plateforme et statue */}
      <path d="M52 48 h32 l-3 5 H55 Z" fill="#6f6d64" />
      <rect x="55" y="43" width="26" height="5" fill="#85837a" />
      {[58, 63, 68, 73, 78].map((x, i) => <Person key={i} x={x} y={43} s={0.55} color="#2b2350" opacity={0.7} />)}
      <rect x="62" y="34" width="12" height="9" fill="#9b9890" />
      <rect x="62" y="34" width="6" height="9" fill="#b3b0a7" />
      <g>
        <path d="M64 34 h8 l-1.6 -14 h-4.8 Z" fill="url(#sc-mnt-stone)" />
        <path d="M66 34 l1 -14 M69 34 l.6 -14" stroke="#b9b6ac" strokeWidth=".5" opacity=".8" />
        <rect x="53" y="19.6" width="30" height="2.6" rx="1.3" fill="url(#sc-mnt-stone)" />
        <rect x="65.6" y="17.6" width="4.8" height="4" rx="1" fill="#e9e7de" />
        <circle cx="68" cy="16" r="2.7" fill="#f2f0e7" />
        <path d="M68 13.4 a2.7 2.7 0 0 1 0 5.4 Z" fill="#c9c6bd" />
      </g>
      <ellipse cx="68" cy="49" rx="20" ry="3" fill="#fff0c9" opacity=".12" />

      <Birds x={124} y={38} s={0.9} color="#2b2350" opacity={0.5} />
      <Birds x={30} y={52} s={0.7} color="#2b2350" opacity={0.35} />

      {/* Fougères au premier plan */}
      <g fill="#081a13">
        <path d="M0 130 q18 -18 34 -12 q-10 -14 6 -24 q-1 22 -16 36 Z" />
        <path d="M200 130 q-22 -14 -40 -6 q12 -12 -2 -24 q3 20 18 30 Z" />
      </g>
      <path d="M10 124 q10 -10 22 -8 M176 122 q-12 -8 -22 -6" stroke="#153a2a" strokeWidth="1" fill="none" opacity=".8" />
    </>
  ),

  /* Pão de Açúcar — le téléphérique à l'heure dorée */
  cablecar: (
    <>
      <defs>
        <linearGradient id="sc-cab-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f18a35" /><stop offset="45%" stopColor="#ffc178" /><stop offset="100%" stopColor="#ffeccb" />
        </linearGradient>
        <linearGradient id="sc-cab-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f8fb0" /><stop offset="100%" stopColor="#17456b" />
        </linearGradient>
        <linearGradient id="sc-cab-rock" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8d7861" /><stop offset="38%" stopColor="#6b5a49" /><stop offset="100%" stopColor="#372e27" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-cab-sky)" />
      <Sun cx={42} cy={38} r={12} color="#fff6da" glow="#ff8534" rays />
      <Cloud x={138} y={24} s={1} color="#ffdcae" opacity={0.6} />
      <Cloud x={92} y={16} s={0.7} color="#ffdcae" opacity={0.4} />
      <Haze y={70} h={10} color="#ffd9a0" opacity={0.3} />

      <rect x="0" y="78" width="200" height="52" fill="url(#sc-cab-sea)" />
      <path d="M28 78 q14 -3 28 0 q-14 3 -28 0 M34 86 q12 -3 24 0 q-12 3 -24 0 M40 95 q10 -2 20 0 q-10 3 -20 0 M46 104 q8 -2 16 0 q-8 2 -16 0" fill="#ffe0ad" opacity=".55" />
      <Foam y={82} opacity={0.3} />
      <Foam y={93} opacity={0.22} offset={9} />
      <Foam y={106} opacity={0.16} offset={4} />

      {/* Morro da Urca puis le Pain de Sucre */}
      <path d="M6 78 q10 -27 27 -28 q18 1 26 28 Z" fill="url(#sc-cab-rock)" opacity=".92" />
      <path d="M33 50 q14 4 22 28 q-16 -14 -22 -28 Z" fill="#a08a72" opacity=".45" />
      <path d="M20 52 q10 -4 18 3 q-11 3 -18 -3 Z" fill="#33714a" opacity=".8" />
      <path d="M8 74 q12 -5 24 -1 q-12 4 -24 1 Z" fill="#33714a" opacity=".5" />

      <path d="M114 78 q10 -50 36 -52 q26 2 36 52 Z" fill="url(#sc-cab-rock)" />
      <path d="M150 26 q19 12 30 52 q-17 -27 -30 -52 Z" fill="#a08a72" opacity=".5" />
      <path d="M128 44 q13 -6 26 2 q-14 3 -26 -2 Z" fill="#33714a" opacity=".75" />
      <path d="M120 64 q16 -6 32 0 q-16 5 -32 0 Z" fill="#33714a" opacity=".45" />
      {[132, 141, 152, 163, 171].map((x, i) => (
        <path key={i} d={`M${x} ${74 - i % 2 * 4} q3 -14 1 -24`} stroke="#3b3128" strokeWidth=".7" fill="none" opacity=".45" />
      ))}
      <ellipse cx="150" cy="78" rx="36" ry="4" fill="#0e3a5c" opacity=".35" />

      {/* Le câble, ses pylônes et les deux cabines */}
      <path d="M30 46 Q92 30 150 26" stroke="#3f3a33" strokeWidth="1.1" fill="none" />
      <path d="M30 49 Q92 34 150 30" stroke="#3f3a33" strokeWidth=".7" fill="none" opacity=".6" />
      <line x1="30" y1="50" x2="30" y2="42" stroke="#4a443b" strokeWidth="2" />
      <line x1="150" y1="30" x2="150" y2="22" stroke="#4a443b" strokeWidth="2" />
      <g transform="translate(82 32)">
        <line x1="6" y1="0" x2="6" y2="4" stroke="#3f3a33" strokeWidth="1.2" />
        <rect x="0" y="4" width="14" height="9.5" rx="2" fill="#d9534f" />
        <rect x="1.6" y="6" width="10.8" height="4.4" rx="1" fill="#fff0d4" opacity=".92" />
        <rect x="0" y="12" width="14" height="1.6" fill="#9e3a37" />
        <circle cx="4" cy="8" r=".9" fill="#5b2f2d" opacity=".5" />
        <circle cx="9" cy="8" r=".9" fill="#5b2f2d" opacity=".5" />
      </g>
      <g transform="translate(120 27) scale(.8)">
        <line x1="6" y1="0" x2="6" y2="4" stroke="#3f3a33" strokeWidth="1.2" />
        <rect x="0" y="4" width="14" height="9.5" rx="2" fill="#c0504d" />
        <rect x="1.6" y="6" width="10.8" height="4.4" rx="1" fill="#ffe9c4" opacity=".85" />
      </g>

      {/* Bateaux et sillages */}
      <g>
        <path d="M50 100 h13 l-2.2 3.2 h-8.6 Z" fill="#fdfcf7" />
        <path d="M56 100 v-6.5 l5.4 6.5 Z" fill="#fdfcf7" opacity=".9" />
        <path d="M50 104 q-12 2 -20 5" stroke="#cfe6f2" strokeWidth="1" fill="none" opacity=".55" />
      </g>
      <g opacity=".85">
        <path d="M98 114 h9.6 l-1.7 2.6 h-6.4 Z" fill="#e8eef3" />
        <path d="M98 117 q-10 2 -16 4" stroke="#cfe6f2" strokeWidth=".9" fill="none" opacity=".45" />
      </g>
      <Birds x={64} y={28} s={0.8} color="#7c4a20" opacity={0.45} />
      <Birds x={172} y={48} s={0.6} color="#7c4a20" opacity={0.3} />
    </>
  ),

  /* Copacabana — la plage et son trottoir en vagues */
  beach: (
    <>
      <defs>
        <linearGradient id="sc-bch-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f7fc4" /><stop offset="62%" stopColor="#87cfec" /><stop offset="100%" stopColor="#dff3fb" />
        </linearGradient>
        <linearGradient id="sc-bch-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0c6480" /><stop offset="45%" stopColor="#1795b4" /><stop offset="100%" stopColor="#5ec9d6" />
        </linearGradient>
        <linearGradient id="sc-bch-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6e2b6" /><stop offset="100%" stopColor="#dfbe82" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-bch-sky)" />
      <Sun cx={166} cy={22} r={9} color="#fffdf2" glow="#ffeaa0" />
      <Cloud x={44} y={18} s={1.2} opacity={0.9} />
      <Cloud x={110} y={28} s={0.7} opacity={0.55} />
      <Cloud x={150} y={14} s={0.5} opacity={0.4} />

      {/* Le Pain de Sucre ferme la baie, comme depuis la plage */}
      <path d="M150 58 q7 -22 17 -23 q11 1 15 23 Z" fill="#48685e" opacity=".9" />
      <path d="M167 35 q9 6 15 23 q-11 -11 -15 -23 Z" fill="#5f8377" opacity=".8" />
      <path d="M176 58 q5 -13 11 -14 q7 1 9 14 Z" fill="#40605a" opacity=".8" />
      <path d="M0 58 q14 -14 28 -3 q11 -11 22 3 Z" fill="#3f6b58" opacity=".55" />

      <rect x="0" y="56" width="200" height="34" fill="url(#sc-bch-sea)" />
      <Haze y={54} h={5} color="#cfeaf5" opacity={0.5} />
      <Foam y={62} opacity={0.35} w={1.2} />
      <Foam y={70} opacity={0.5} offset={11} />
      <Foam y={79} opacity={0.72} offset={4} w={2} />
      {/* baigneurs */}
      <circle cx="62" cy="76" r="1.8" fill="#1f2937" opacity=".65" />
      <circle cx="70" cy="79" r="1.5" fill="#1f2937" opacity=".55" />
      <circle cx="122" cy="74" r="1.6" fill="#1f2937" opacity=".5" />

      {/* Le sable */}
      <path d="M0 88 q30 6 62 2 q40 -5 70 2 q34 5 68 -2 v40 H0 Z" fill="url(#sc-bch-sand)" />
      <path d="M0 88 q30 6 62 2 q40 -5 70 2 q34 5 68 -2 v4.5 q-34 7 -68 2 q-30 -7 -70 -2 q-32 4 -62 -2 Z" fill="#ffffff" opacity=".8" />
      <path d="M18 100 q18 -2 34 1 M96 104 q20 -2 38 1" stroke="#e7cb97" strokeWidth="1" fill="none" opacity=".7" />

      {/* Le trottoir portugais : les vagues de Burle Marx */}
      <rect x="0" y="110" width="200" height="20" fill="#f8fafc" />
      <path d="M-12 118 q11 -8 22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0" stroke="#111827" strokeWidth="5" fill="none" />
      <path d="M-12 126 q11 -8 22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0" stroke="#111827" strokeWidth="5" fill="none" />
      <path d="M-12 110 q11 -8 22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0 t22 0" stroke="#111827" strokeWidth="3" fill="none" opacity=".85" />

      {/* Parasols, palmiers, joueurs */}
      <Palm x={22} y={112} s={1.2} />
      <Palm x={186} y={110} s={0.95} />
      <g transform="translate(92 104)">
        <line x1="0" y1="0" x2="0" y2="-12" stroke="#8a6a4a" strokeWidth="1.4" />
        <path d="M-12 -11 q12 -8 24 0 Z" fill="#ef4444" />
        <path d="M-12 -11 q6 -4 12 0 Z" fill="#fecaca" />
        <path d="M0 -11 q6 -4 12 0 Z" fill="#fca5a5" />
      </g>
      <g transform="translate(128 106)">
        <line x1="0" y1="0" x2="0" y2="-10" stroke="#8a6a4a" strokeWidth="1.2" />
        <path d="M-10 -9 q10 -7 20 0 Z" fill="#f59e0b" />
        <path d="M0 -9 q5 -3.5 10 0 Z" fill="#fcd34d" />
      </g>
      <Person x={108} y={106} s={1} color="#1f2937" opacity={0.85} />
      <Person x={114} y={107} s={0.9} color="#334155" opacity={0.8} />
      <circle cx="111" cy="96" r="2" fill="#fde047" />
      <line x1="146" y1="106" x2="146" y2="94" stroke="#94a3b8" strokeWidth="1" />
      <line x1="166" y1="106" x2="166" y2="94" stroke="#94a3b8" strokeWidth="1" />
      <path d="M146 96 h20" stroke="#cbd5e1" strokeWidth="2.6" opacity=".9" strokeDasharray="1.5 1.5" />
    </>
  ),

  /* Iguaçu — la gorge, la brume et l'arc-en-ciel */
  waterfall: (
    <>
      <defs>
        <linearGradient id="sc-wf-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5fb6dd" /><stop offset="100%" stopColor="#dcf1e6" />
        </linearGradient>
        <linearGradient id="sc-wf-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" /><stop offset="55%" stopColor="#eaf8ff" /><stop offset="100%" stopColor="#b6dfef" />
        </linearGradient>
        <linearGradient id="sc-wf-jungle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b8a51" /><stop offset="100%" stopColor="#13502c" />
        </linearGradient>
        <linearGradient id="sc-wf-cliff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3f33" /><stop offset="100%" stopColor="#2b241d" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-wf-sky)" />
      <Cloud x={150} y={14} s={0.9} opacity={0.75} />
      <Cloud x={52} y={12} s={0.6} opacity={0.5} />
      <Birds x={28} y={22} s={0.9} color="#334155" opacity={0.4} />

      <g fill="none" strokeWidth="2.6" opacity=".5">
        <path d="M56 100 a46 46 0 0 1 92 0" stroke="#ef4444" />
        <path d="M60 100 a42 42 0 0 1 84 0" stroke="#f59e0b" />
        <path d="M64 100 a38 38 0 0 1 76 0" stroke="#fde047" />
        <path d="M68 100 a34 34 0 0 1 68 0" stroke="#4ade80" />
        <path d="M72 100 a30 30 0 0 1 60 0" stroke="#60a5fa" />
      </g>

      {/* Plateaux boisés de part et d'autre, en gradins */}
      <path d="M0 38 h74 q8 12 0 22 H0 Z" fill="url(#sc-wf-jungle)" />
      <path d="M200 32 h-70 q-10 14 0 24 h70 Z" fill="url(#sc-wf-jungle)" />
      <TreeLine fill="#166534" trees={[[4, 36, 7], [17, 31, 9], [31, 37, 6], [45, 32, 8], [60, 36, 7], [70, 31, 6]]} />
      <TreeLine fill="#166534" trees={[[136, 32, 7], [149, 27, 9], [162, 33, 6], [176, 28, 8], [190, 33, 7]]} />
      <path d="M0 58 h66 v6 H0 Z" fill="url(#sc-wf-cliff)" opacity=".85" />
      <path d="M200 56 h-62 v6 h62 Z" fill="url(#sc-wf-cliff)" opacity=".85" />

      {/* Les chutes, sur deux niveaux */}
      <g>
        {[[12, 58, 11], [28, 58, 9], [43, 58, 10], [57, 58, 8], [136, 56, 9], [150, 56, 11], [165, 56, 9], [180, 56, 10]].map(([x, y, w], i) => (
          <g key={i}>
            <path d={`M${x} ${y} h${w} l${-1.5} 42 h${-w + 3} Z`} fill="url(#sc-wf-water)" opacity={0.93} />
            <path d={`M${x + 2} ${y} h2 l-1 40 h-2 Z`} fill="#ffffff" opacity=".8" />
          </g>
        ))}
        <path d="M68 58 h62 l-7 46 H75 Z" fill="url(#sc-wf-water)" />
        <path d="M82 58 h13 l-3.4 46 h-9 Z" fill="#ffffff" opacity=".85" />
        <path d="M106 58 h11 l-2.6 46 h-7.6 Z" fill="#ffffff" opacity=".72" />
        <path d="M68 58 q31 6 62 0 l-1 4 q-30 6 -60 0 Z" fill="#cbeaf7" opacity=".9" />
      </g>

      {/* La passerelle et ses visiteurs */}
      <path d="M6 96 h58" stroke="#6b5a45" strokeWidth="2" />
      {[10, 22, 34, 46, 58].map((x, i) => <line key={i} x1={x} y1="96" x2={x} y2="102" stroke="#6b5a45" strokeWidth="1" />)}
      <Person x={20} y={96} s={0.8} color="#b91c1c" />
      <Person x={36} y={96} s={0.8} color="#1d4ed8" />
      <Person x={50} y={96} s={0.7} color="#0f172a" />

      <ellipse cx="100" cy="108" rx="72" ry="14" fill="#ffffff" opacity=".7" />
      <ellipse cx="58" cy="114" rx="42" ry="9" fill="#ffffff" opacity=".5" />
      <ellipse cx="148" cy="112" rx="38" ry="8" fill="#ffffff" opacity=".45" />
      <rect x="0" y="116" width="200" height="14" fill="#9fd3e6" />
      <Foam y={119} color="#ffffff" opacity={0.85} />
      <Foam y={125} color="#ffffff" opacity={0.5} offset={7} />

      <path d="M0 130 q24 -8 32 -28 q5 22 -12 28 Z" fill="#12482a" />
      <path d="M200 130 q-26 -6 -34 -26 q-5 20 14 26 Z" fill="#12482a" />
      <path d="M6 126 q10 -8 18 -18 M180 124 q-8 -8 -14 -16" stroke="#1d6b3f" strokeWidth="1" fill="none" opacity=".7" />
    </>
  ),

  /* Amazonie — la canopée, le fleuve et l'ara */
  jungle: (
    <>
      <defs>
        <linearGradient id="sc-jgl-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d5ecdc" /><stop offset="100%" stopColor="#85c49d" />
        </linearGradient>
        <linearGradient id="sc-jgl-river" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9a7845" /><stop offset="100%" stopColor="#57401f" />
        </linearGradient>
        <linearGradient id="sc-jgl-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8dc" stopOpacity=".5" /><stop offset="100%" stopColor="#fff8dc" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-jgl-sky)" />
      <Sun cx={38} cy={18} r={9} color="#fffbe8" glow="#ffeaa8" />
      <path d="M30 18 l-16 54 h34 Z" fill="url(#sc-jgl-ray)" />
      <path d="M52 20 l-6 46 h22 Z" fill="url(#sc-jgl-ray)" opacity=".7" />

      <TreeLine fill="#8cc3a1" opacity={0.75} trees={[
        [4, 44, 11], [21, 40, 14], [38, 45, 9], [52, 38, 13], [70, 44, 11],
        [86, 41, 10], [103, 46, 13], [121, 39, 12], [138, 45, 10], [156, 41, 14], [176, 45, 11], [194, 40, 12],
      ]} />
      <Haze y={44} h={12} opacity={0.42} />

      {/* Le fleuve qui serpente, avec sa barque */}
      <path d="M0 74 q34 6 56 16 q22 10 30 24 q6 10 4 16 H52 q-4 -14 -18 -24 Q16 94 0 92 Z" fill="url(#sc-jgl-river)" />
      <path d="M14 82 q26 6 42 18 M34 80 q26 10 40 26 M6 88 q22 5 34 14" stroke="#c19a5b" strokeWidth="1" fill="none" opacity=".4" />
      <g transform="translate(40 96) rotate(12)">
        <path d="M0 0 q11 6 24 0 l-3 4.6 h-18 Z" fill="#7c3f1d" />
        <path d="M2 0 q10 4 20 0" stroke="#5b2f14" strokeWidth="1" fill="none" />
        <Person x={8} y={0} s={0.8} color="#1e293b" />
        <Person x={16} y={0} s={0.7} color="#7f1d1d" />
      </g>

      <TreeLine fill="#2f8a52" trees={[
        [92, 62, 15], [112, 58, 18], [134, 64, 14], [152, 57, 17], [172, 63, 15], [192, 58, 16], [8, 64, 13], [26, 60, 11],
      ]} />
      <TreeLine fill="#1c7a45" trees={[
        [104, 74, 13], [126, 78, 15], [148, 72, 12], [170, 79, 14], [190, 73, 13],
      ]} />
      <TreeLine fill="#14532d" trees={[
        [0, 98, 20], [18, 106, 16], [40, 100, 14], [122, 94, 22], [146, 102, 18], [168, 96, 20], [192, 103, 17],
      ]} />

      {/* L'arbre émergent */}
      <path d="M64 96 q4 -26 2 -44" stroke="#6b4f2a" strokeWidth="5" fill="none" />
      <path d="M66 58 q-10 -4 -14 -12 M66 62 q10 -3 15 -10 M65 70 q-9 -2 -12 -8" stroke="#6b4f2a" strokeWidth="2.2" fill="none" />
      <ellipse cx="66" cy="48" rx="24" ry="12" fill="#1f7a48" />
      <ellipse cx="50" cy="45" rx="13" ry="8" fill="#2a8c55" />
      <ellipse cx="80" cy="44" rx="14" ry="9" fill="#2a8c55" />
      <ellipse cx="66" cy="39" rx="11" ry="7" fill="#3aad68" />
      <path d="M52 52 q6 8 3 16 M78 52 q-4 9 -1 16" stroke="#14532d" strokeWidth="1" fill="none" opacity=".5" />

      {/* Deux aras */}
      <g transform="translate(140 30) rotate(-12)">
        <path d="M0 0 q10 -3 18 2 q-9 4 -18 -2 Z" fill="#dc2626" />
        <path d="M2 0 q-8 -8 -2 -14 q6 6 4 14 Z" fill="#facc15" />
        <path d="M4 1 q-4 9 -14 11 q6 -7 10 -12 Z" fill="#2563eb" />
        <circle cx="19" cy="0.5" r="3" fill="#dc2626" />
        <path d="M21 0 q5 1 3 3 q-3 0 -4 -2 Z" fill="#1f2937" />
        <circle cx="19.5" cy="-0.6" r=".7" fill="#0f172a" />
      </g>
      <g transform="translate(166 46) rotate(-20) scale(.62)" opacity=".9">
        <path d="M0 0 q10 -3 18 2 q-9 4 -18 -2 Z" fill="#ea580c" />
        <path d="M2 0 q-8 -8 -2 -14 q6 6 4 14 Z" fill="#fde047" />
        <circle cx="19" cy="0.5" r="3" fill="#ea580c" />
      </g>

      <ellipse cx="34" cy="100" rx="8" ry="3" fill="#3fa96a" />
      <ellipse cx="52" cy="110" rx="6.5" ry="2.6" fill="#48b877" />
      <ellipse cx="22" cy="114" rx="7" ry="2.8" fill="#3fa96a" />
      <path d="M0 130 q24 -10 28 -36 q12 24 -8 36 Z" fill="#0d3520" />
      <path d="M200 130 q-26 -8 -30 -34 q-12 22 8 34 Z" fill="#0d3520" />
      <path d="M8 124 q8 -12 12 -22 M186 122 q-6 -10 -10 -18" stroke="#1d6b3f" strokeWidth="1" fill="none" opacity=".6" />
    </>
  ),

  /* Encontro das Águas — les deux fleuves qui refusent de se mêler */
  rivers: (
    <>
      <defs>
        <linearGradient id="sc-riv-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a9d2e6" /><stop offset="100%" stopColor="#eaf1e6" />
        </linearGradient>
        <linearGradient id="sc-riv-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a352a" /><stop offset="100%" stopColor="#170f0c" />
        </linearGradient>
        <linearGradient id="sc-riv-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cda667" /><stop offset="100%" stopColor="#7e5c2b" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-riv-sky)" />
      <Cloud x={38} y={16} s={1.1} opacity={0.85} />
      <Cloud x={146} y={12} s={0.8} opacity={0.65} />
      <Cloud x={96} y={22} s={0.6} opacity={0.45} />

      <TreeLine fill="#3f7a52" opacity={0.6} trees={[
        [10, 36, 6], [30, 34, 8], [52, 37, 5], [76, 34, 7], [100, 37, 6], [124, 34, 8], [150, 37, 5], [176, 34, 7], [196, 37, 6],
      ]} />
      <rect x="0" y="38" width="200" height="10" fill="#2f6b45" />
      <TreeLine fill="#1f5233" trees={[
        [5, 39, 5], [19, 36, 7], [33, 40, 4], [47, 37, 6], [62, 40, 5], [78, 36, 7], [94, 39, 5],
        [110, 37, 6], [126, 40, 4], [142, 36, 7], [158, 39, 5], [174, 37, 6], [190, 40, 5],
      ]} />
      <Haze y={42} h={7} opacity={0.3} />
      <rect x="0" y="47" width="200" height="4" fill="#0f172a" opacity=".14" />

      {/* Les deux eaux */}
      <rect x="0" y="48" width="200" height="82" fill="url(#sc-riv-light)" />
      <path d="M0 48 h104 q-10 20 4 40 q-14 22 -2 42 H0 Z" fill="url(#sc-riv-dark)" />
      <path d="M104 48 q-10 20 4 40 q-14 22 -2 42" stroke="#e8c98d" strokeWidth="1.8" fill="none" opacity=".75" />
      {/* les tourbillons de la frontière */}
      {[[100, 60, 1], [110, 76, .85], [113, 92, 1.1], [98, 108, .9], [106, 122, .8]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0 q9 3 3 10 q-9 -3 -3 -10 Z" fill="#c19a5b" opacity=".7" />
          <path d="M-2 2 q6 2 2 7" stroke="#5a4020" strokeWidth=".8" fill="none" opacity=".5" />
        </g>
      ))}
      <path d="M18 66 q18 -3 34 0 M26 84 q16 -3 30 0 M12 102 q20 -3 36 0 M30 118 q16 -3 30 0" stroke="#6b5a4a" strokeWidth="1.1" fill="none" opacity=".55" />
      <path d="M140 60 q18 -3 34 0 M132 78 q20 -3 38 0 M146 98 q16 -3 32 0 M136 116 q18 -3 34 0" stroke="#e5c288" strokeWidth="1.1" fill="none" opacity=".6" />

      {/* Le bateau de tourisme et son sillage */}
      <g transform="translate(124 70)">
        <path d="M0 0 q12 7 26 0 l-3.4 6 h-19 Z" fill="#f8fafc" />
        <rect x="6" y="-7" width="14" height="7" rx="1.4" fill="#e2e8f0" />
        <rect x="8" y="-5.4" width="3" height="3" fill="#60a5fa" />
        <rect x="13" y="-5.4" width="3" height="3" fill="#60a5fa" />
        <rect x="12.6" y="-12" width="1.4" height="5" fill="#94a3b8" />
        <path d="M0 6 q-16 5 -28 9 M26 6 q14 6 24 10" stroke="#f0dcb4" strokeWidth="1.2" fill="none" opacity=".5" />
      </g>
      <Birds x={54} y={26} s={0.8} color="#475569" opacity={0.4} />
    </>
  ),

  /* Pelourinho — la rue colorée de Salvador */
  colonial: (
    <>
      <defs>
        <linearGradient id="sc-col-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b97d4" /><stop offset="100%" stopColor="#ffe6c6" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-col-sky)" />
      <Cloud x={152} y={16} s={0.85} opacity={0.75} />
      <Cloud x={40} y={12} s={0.6} opacity={0.5} />
      <Birds x={64} y={14} s={0.8} color="#475569" opacity={0.4} />

      <path d="M0 24 q50 16 100 4 q50 -12 100 6" stroke="#94a3b8" strokeWidth=".8" fill="none" opacity=".7" />
      {[14, 34, 54, 74, 94, 114, 134, 154, 174, 194].map((x, i) => (
        <path key={i} d={`M${x} ${28 + Math.sin(i) * 3} l4 0 l-2 6 Z`} fill={["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#ec4899"][i % 5]} opacity=".9" />
      ))}

      {/* L'église baroque */}
      <g>
        <rect x="82" y="38" width="38" height="50" fill="#f6ecdc" />
        <rect x="82" y="38" width="10" height="50" fill="#fdf7ec" />
        <path d="M82 38 h38 l-19 -13 Z" fill="#e9d8bf" />
        <rect x="74" y="32" width="11" height="56" fill="#f2e6d2" />
        <rect x="117" y="32" width="11" height="56" fill="#e0cfb6" />
        <path d="M74 32 q5.5 -11 11 0 Z" fill="#c2410c" />
        <path d="M117 32 q5.5 -11 11 0 Z" fill="#9a3412" />
        <rect x="78.8" y="20" width="1.6" height="7" fill="#b45309" />
        <rect x="121.8" y="20" width="1.6" height="7" fill="#b45309" />
        <rect x="100.2" y="14" width="1.8" height="11" fill="#b45309" />
        <rect x="96.6" y="17" width="9" height="1.8" fill="#b45309" />
        <circle cx="101" cy="46" r="5" fill="#d9c4a3" />
        <circle cx="101" cy="46" r="3" fill="#7c3f1d" />
        <rect x="95" y="60" width="12" height="18" rx="6" fill="#7c3f1d" />
        <rect x="97" y="63" width="8" height="15" rx="4" fill="#5b2f14" />
        <rect x="77" y="44" width="5" height="7" rx="2.5" fill="#94a3b8" opacity=".8" />
        <rect x="120" y="44" width="5" height="7" rx="2.5" fill="#94a3b8" opacity=".7" />
        <path d="M86 88 h30 v2 H86 Z" fill="#cbb08a" />
      </g>

      {/* La rue et ses façades */}
      {[
        [0, 58, 26, "#f5b301", "#c88a00"], [26, 50, 22, "#4fa3d9", "#2b7fb5"], [48, 62, 22, "#ef6f6c", "#c74d4a"],
        [128, 52, 24, "#7bc47f", "#4f9a57"], [152, 62, 20, "#f19ecb", "#c9749f"], [172, 48, 28, "#5fc3c9", "#3b9aa0"],
      ].map(([x, y, w, face, shade], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={130 - y} fill={face} />
          <rect x={x + w - 4} y={y} width="4" height={130 - y} fill={shade} />
          <path d={`M${x - 2} ${y} h${w + 4} l-2 -5 h-${w} Z`} fill="#b45309" />
          <path d={`M${x - 2} ${y - 5} h${w + 4}`} stroke="#92400e" strokeWidth="1.4" />
          {[0, 1].map((r) => (
            <g key={r}>
              <rect x={x + 4} y={y + 8 + r * 17} width="6.5" height="9.5" fill="#1f2937" opacity=".78" />
              <rect x={x + 4} y={y + 8 + r * 17} width="6.5" height="9.5" fill="none" stroke="#fdfcf7" strokeWidth=".9" />
              <rect x={x + 13} y={y + 8 + r * 17} width="6.5" height="9.5" fill="#1f2937" opacity=".62" />
              <rect x={x + 13} y={y + 8 + r * 17} width="6.5" height="9.5" fill="none" stroke="#fdfcf7" strokeWidth=".9" />
              {r === 1 && <path d={`M${x + 3} ${y + 35} h${w - 5}`} stroke="#4b5563" strokeWidth="1" opacity=".5" />}
            </g>
          ))}
        </g>
      ))}

      {/* Pavés */}
      <rect x="0" y="104" width="200" height="26" fill="#9aa2ad" />
      {Array.from({ length: 33 }, (_, i) => (
        <rect key={i} x={(i % 11) * 19 + (Math.floor(i / 11) % 2 ? 9 : 0)} y={106 + Math.floor(i / 11) * 8}
          width="15" height="6" rx="1.6" fill={i % 3 ? "#b6bcc6" : "#a8afb9"} />
      ))}

      {/* Un tambour, deux danseurs de capoeira */}
      <g transform="translate(92 106)">
        <ellipse cx="0" cy="0" rx="9" ry="3.6" fill="#f8fafc" />
        <path d="M-9 0 v8 q9 4 18 0 v-8 Z" fill="#dc2626" />
        <path d="M-9 3 q9 4 18 0 M-9 6 q9 4 18 0" stroke="#fef3c7" strokeWidth=".9" fill="none" />
      </g>
      <Person x={126} y={116} s={1.3} color="#0f172a" opacity={0.85} />
      <g transform="translate(140 116)" opacity=".85">
        <circle cx="0" cy="-9" r="2.2" fill="#0f172a" />
        <path d="M0 -7 q-4 4 -6 8 M0 -7 q5 3 7 7 M-3 -3 l-4 4 M3 -4 l4 3" stroke="#0f172a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
    </>
  ),

  /* Chapada Diamantina — les plateaux au couchant */
  canyon: (
    <>
      <defs>
        <linearGradient id="sc-cyn-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b2f77" /><stop offset="40%" stopColor="#d75f42" />
          <stop offset="72%" stopColor="#f79256" /><stop offset="100%" stopColor="#ffca77" />
        </linearGradient>
        <linearGradient id="sc-cyn-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a24924" /><stop offset="100%" stopColor="#4f2013" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-cyn-sky)" />
      <Sun cx={104} cy={64} r={13} color="#fff3d2" glow="#ff6f3a" />
      <Cloud x={38} y={24} s={1.2} color="#e79a75" opacity={0.5} />
      <Cloud x={162} y={18} s={0.8} color="#e79a75" opacity={0.4} />
      <Cloud x={120} y={34} s={0.6} color="#f7b48a" opacity={0.35} />
      <Birds x={52} y={38} s={0.9} color="#4f2013" opacity={0.45} />
      <Birds x={148} y={46} s={0.6} color="#4f2013" opacity={0.3} />

      {/* Trois rangs de plateaux, du plus voilé au plus net */}
      <path d="M0 78 h44 l6 -12 h34 l6 12 h50 l8 -10 h52 v14 H0 Z" fill="#c07a52" opacity=".5" />
      <Haze y={74} h={8} color="#ffbe8a" opacity={0.35} />
      <path d="M0 92 h30 l8 -14 h40 l6 14 h36 l10 -12 h70 v18 H0 Z" fill="#a85c34" opacity=".8" />
      <path d="M0 130 v-24 h54 l10 -16 h44 l8 16 h84 v24 Z" fill="#7c3a1e" />
      <path d="M0 130 v-24 h54 l10 -16 h6 l-8 16 v24 Z" fill="#8f4523" />

      {/* Strates */}
      <path d="M0 112 h54 M64 104 h44 M116 112 h84 M0 120 h60 M112 120 h88 M120 116 h70" stroke="#5b2713" strokeWidth="1.1" opacity=".5" />
      <path d="M54 106 l10 -16 M108 90 l8 16" stroke="#5b2713" strokeWidth="1" opacity=".4" />

      {/* Le Morro do Pai Inácio et ses marcheurs */}
      <Person x={70} y={90} s={1.1} color="#2b1108" />
      <Person x={78} y={90} s={0.95} color="#2b1108" opacity={0.8} />

      {/* Cascade */}
      <path d="M150 92 q2 18 -1 30" stroke="#ffe8c9" strokeWidth="2.6" fill="none" opacity=".8" />
      <ellipse cx="149" cy="123" rx="9" ry="2.6" fill="#ffe8c9" opacity=".35" />

      {[10, 26, 40, 132, 160, 182].map((x, i) => (
        <g key={i} transform={`translate(${x} ${120 - (i % 2) * 5})`} opacity=".8">
          <path d="M0 0 v-9 M0 -9 l-3.4 -3 M0 -9 l3.4 -3 M0 -5 l-3 -2.6 M0 -5 l3 -2.6" stroke="#3b1c0d" strokeWidth="1.1" fill="none" />
        </g>
      ))}
    </>
  ),

  /* Lençóis Maranhenses — dunes blanches et lagunes turquoise */
  dunes: (
    <>
      <defs>
        <linearGradient id="sc-dun-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3ea8dd" /><stop offset="100%" stopColor="#e3f3fb" />
        </linearGradient>
        <linearGradient id="sc-dun-lagoon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5fd8e0" /><stop offset="45%" stopColor="#12b3c4" /><stop offset="100%" stopColor="#077f95" />
        </linearGradient>
        <linearGradient id="sc-dun-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffaef" /><stop offset="100%" stopColor="#e8d3a8" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-dun-sky)" />
      <Sun cx={158} cy={20} r={9} color="#fffdf4" glow="#ffeaa8" />
      <Cloud x={48} y={18} s={1.1} opacity={0.9} />
      <Cloud x={108} y={12} s={0.7} opacity={0.6} />
      <Cloud x={186} y={30} s={0.5} opacity={0.45} />
      <Birds x={38} y={34} s={0.8} color="#64748b" opacity={0.4} />

      <path d="M0 60 q28 -14 56 -2 q30 13 58 -4 q32 -16 86 2 v20 H0 Z" fill="#f3e4c4" />
      <Haze y={56} h={8} opacity={0.3} />
      <path d="M112 74 q22 -7 44 1 q-20 8 -44 -1 Z" fill="url(#sc-dun-lagoon)" opacity=".85" />

      <path d="M0 80 q34 -16 68 -2 q30 12 64 -4 q34 -16 68 4 v52 H0 Z" fill="url(#sc-dun-sand)" />
      <path d="M0 80 q34 -16 68 -2 q30 12 64 -4 q34 -16 68 4 v8 q-34 -18 -68 -2 q-34 16 -64 4 q-34 -14 -68 2 Z" fill="#fffdf6" opacity=".7" />
      {/* les creux à l'ombre */}
      <path d="M66 82 q22 10 50 -2 q-24 16 -50 2 Z" fill="#dcc79c" opacity=".55" />
      <path d="M132 76 q28 -14 62 4 q-32 -8 -62 -4 Z" fill="#dcc79c" opacity=".4" />

      <path d="M22 100 q34 -12 70 1 q-32 14 -70 -1 Z" fill="url(#sc-dun-lagoon)" />
      <path d="M32 99 q24 -5 46 2" stroke="#a7f0f7" strokeWidth="1.5" fill="none" opacity=".85" />
      <path d="M40 104 q18 -3 34 2" stroke="#a7f0f7" strokeWidth="1" fill="none" opacity=".55" />
      <ellipse cx="150" cy="118" rx="19" ry="5" fill="url(#sc-dun-lagoon)" opacity=".9" />
      <path d="M140 117 q10 -2 20 1" stroke="#a7f0f7" strokeWidth="1" fill="none" opacity=".6" />

      <path d="M0 130 v-16 q40 -18 82 -4 q40 13 76 -6 q22 -10 42 -2 v28 Z" fill="#fdf7e8" />
      <path d="M0 114 q40 -18 82 -4 q40 13 76 -6" stroke="#e0caa0" strokeWidth="1.4" fill="none" />
      <path d="M12 122 q20 -4 40 0 M64 126 q22 -4 44 0 M124 120 q20 -4 40 1 M30 118 q16 -3 32 1" stroke="#ecdcba" strokeWidth="1" fill="none" />

      {/* Deux marcheurs sur la crête : c'est l'échelle qui fait le paysage */}
      <Person x={104} y={92} s={1.1} color="#334155" />
      <Person x={111} y={93} s={0.95} color="#475569" opacity={0.75} />
    </>
  ),

  /* Fernando de Noronha — les Dois Irmãos et les dauphins */
  dolphins: (
    <>
      <defs>
        <linearGradient id="sc-dol-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2946b" /><stop offset="45%" stopColor="#ffd6a4" /><stop offset="100%" stopColor="#c3ebf3" />
        </linearGradient>
        <linearGradient id="sc-dol-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a7590" /><stop offset="40%" stopColor="#14a6bd" /><stop offset="100%" stopColor="#66d6dd" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-dol-sky)" />
      <Sun cx={38} cy={32} r={11} color="#fff6dd" glow="#ff9a58" />
      <Cloud x={138} y={20} s={0.9} color="#ffe2c7" opacity={0.7} />
      <Cloud x={84} y={14} s={0.6} color="#ffe2c7" opacity={0.45} />

      {/* Morro Dois Irmãos */}
      <g>
        <path d="M116 66 q8 -42 21 -43 q14 1 19 43 Z" fill="#3c574d" />
        <path d="M137 23 q11 8 19 43 q-13 -21 -19 -43 Z" fill="#5b7d6e" />
        <path d="M152 66 q6 -28 15 -29 q10 1 13 29 Z" fill="#436054" />
        <path d="M167 37 q8 6 13 29 q-9 -15 -13 -29 Z" fill="#63866f" />
        <path d="M120 48 q11 -4 20 2 q-12 3 -20 -2 Z" fill="#2f7a48" opacity=".65" />
        <path d="M156 52 q8 -3 14 1 q-8 3 -14 -1 Z" fill="#2f7a48" opacity=".55" />
      </g>
      <rect x="0" y="66" width="200" height="64" fill="url(#sc-dol-sea)" />
      <ellipse cx="146" cy="68" rx="38" ry="4" fill="#0a5872" opacity=".4" />
      <path d="M18 70 q12 -3 24 0 q-12 3 -24 0 M24 78 q10 -2 20 0 q-10 3 -20 0 M30 87 q8 -2 16 0 q-8 2 -16 0" fill="#ffd9a8" opacity=".5" />
      <Foam y={74} opacity={0.3} />
      <Foam y={88} opacity={0.26} offset={8} />

      {/* Le dauphin qui saute, et son ombre dans l'eau */}
      <ellipse cx="86" cy="94" rx="18" ry="4" fill="#0a5872" opacity=".35" />
      <g transform="translate(64 78) rotate(-18)">
        <path d="M0 0 q16 -16 40 -6 q-6 8 -16 10 q-14 3 -24 -4 Z" fill="#e3ecf7" />
        <path d="M0 0 q16 -16 40 -6 q-10 3 -22 3 q-11 1 -18 3 Z" fill="#8ba0bd" />
        <path d="M40 -6 q7 -4 10 -1 q-3 4 -10 1 Z" fill="#cbd5e1" />
        <path d="M18 -12 q4 -8 9 -2 q-5 2 -9 2 Z" fill="#cbd5e1" />
        <path d="M-2 0 q-8 2 -10 7 q7 0 12 -4 Z" fill="#8ba0bd" />
        <circle cx="42" cy="-6" r="1" fill="#0f172a" />
        <path d="M8 -3 q10 -4 22 -2" stroke="#ffffff" strokeWidth="1" fill="none" opacity=".5" />
      </g>
      <path d="M58 86 q6 -6 12 -2 M50 90 q5 -5 10 -2" stroke="#ffffff" strokeWidth="1.4" fill="none" opacity=".7" />

      <path d="M118 96 q4 -7 8 0 Z" fill="#94a3b8" />
      <path d="M134 102 q3.4 -6 7 0 Z" fill="#94a3b8" opacity=".85" />
      <path d="M152 98 q3 -5 6 0 Z" fill="#94a3b8" opacity=".7" />
      <ellipse cx="122" cy="97" rx="10" ry="2" fill="#ffffff" opacity=".35" />
      <ellipse cx="137" cy="103" rx="8" ry="1.6" fill="#ffffff" opacity=".3" />

      <path d="M0 122 q40 -8 80 -2 q44 7 120 -4 v14 H0 Z" fill="#f8e7c4" />
      <Foam y={121} opacity={0.8} />
      <Palm x={16} y={126} s={0.9} />
      <Person x={38} y={126} s={0.9} color="#334155" opacity={0.7} />
    </>
  ),

  /* Ouro Preto — le baroque sur la colline */
  church: (
    <>
      <defs>
        <linearGradient id="sc-chu-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6aabdd" /><stop offset="100%" stopColor="#ffe8c9" />
        </linearGradient>
        <linearGradient id="sc-chu-hill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#59845b" /><stop offset="100%" stopColor="#2c4f33" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-chu-sky)" />
      <Cloud x={32} y={16} s={1} opacity={0.8} />
      <Cloud x={158} y={24} s={0.75} opacity={0.6} />
      <Birds x={148} y={40} s={0.8} color="#475569" opacity={0.4} />

      <path d="M0 56 q26 -24 52 -6 q22 -18 46 4 q26 -20 54 2 q22 -14 48 4 v20 H0 Z" fill="#8aa3b5" opacity=".5" />
      <Haze y={56} h={8} opacity={0.35} />
      <path d="M0 130 v-56 q50 -16 100 -2 q50 14 100 -4 v62 Z" fill="url(#sc-chu-hill)" />

      {/* Les maisons de la pente, à toits rouges */}
      {[[6, 86, 1], [28, 92, .9], [50, 87, .95], [138, 90, .9], [162, 85, 1], [182, 93, .85]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect x="0" y="0" width="19" height="15" fill="#fbf3e6" />
          <rect x="0" y="0" width="5" height="15" fill="#ece0cd" />
          <path d="M-2.5 0 h24 l-12 -7.5 Z" fill="#b24a3a" />
          <path d="M-2.5 0 h24" stroke="#8c3628" strokeWidth="1.2" />
          <rect x="3" y="4" width="4" height="5" fill="#3f5566" />
          <rect x="11" y="4" width="4" height="5" fill="#3f5566" opacity=".85" />
          <rect x="7" y="10" width="5" height="5" fill="#7c3f1d" />
        </g>
      ))}

      {/* L'église */}
      <g>
        <rect x="76" y="60" width="48" height="42" fill="#fdf7ea" />
        <rect x="76" y="60" width="13" height="42" fill="#fffdf6" />
        <rect x="68" y="54" width="14" height="48" fill="#f7efe0" />
        <rect x="118" y="54" width="14" height="48" fill="#ebe0cb" />
        <path d="M68 54 q7 -13 14 0 Z" fill="#1f6f8b" />
        <path d="M118 54 q7 -13 14 0 Z" fill="#175a72" />
        <circle cx="75" cy="47" r="1.4" fill="#b45309" />
        <circle cx="125" cy="47" r="1.4" fill="#b45309" />
        <rect x="74.2" y="60" width="2" height="42" fill="#e6d9c2" />
        <rect x="123.8" y="60" width="2" height="42" fill="#d9ccb4" />
        <path d="M76 60 q24 -17 48 0 Z" fill="#f4ead6" />
        <path d="M76 60 q24 -17 48 0" stroke="#d9c9a8" strokeWidth="1.2" fill="none" />
        <rect x="99" y="32" width="2" height="11" fill="#7c5c2c" />
        <rect x="95.4" y="35" width="9" height="1.8" fill="#7c5c2c" />
        <circle cx="100" cy="53" r="4.5" fill="#dcc9a6" />
        <circle cx="100" cy="53" r="2.6" fill="#6b4220" />
        <rect x="72" y="63" width="6" height="8" rx="3" fill="#9ca3af" opacity=".8" />
        <rect x="122" y="63" width="6" height="8" rx="3" fill="#9ca3af" opacity=".7" />
        <path d="M84 102 v-17 q16 -13 32 0 v17 Z" fill="#8c5a2b" />
        <path d="M92 102 v-12 q8 -8 16 0 v12 Z" fill="#6b4220" />
        <path d="M100 90 v12" stroke="#4a2c14" strokeWidth="1" />
        <rect x="80" y="100" width="40" height="2.4" fill="#cbb08a" />
      </g>
      <Person x={104} y={104} s={1} color="#1f2937" opacity={0.8} />

      {/* La rue pavée qui descend vers nous */}
      <path d="M86 102 L46 130 H154 L114 102 Z" fill="#9aa2ad" />
      <path d="M86 102 L46 130 h10 L93 102 Z" fill="#aab1ba" />
      {[106, 112, 119, 127].map((y, r) => (
        <path key={r} d={`M${84 - (y - 102) * 1.45} ${y} H${116 + (y - 102) * 1.45}`} stroke="#7d848e" strokeWidth="1.1" opacity=".65" />
      ))}
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${92 + ((i % 3) - 1) * (13 + Math.floor(i / 3) * 9)} ${106 + Math.floor(i / 3) * 6.5} h${6 + Math.floor(i / 3) * 2}`}
          stroke="#8b929c" strokeWidth="2.2" strokeLinecap="round" />
      ))}
      <g>
        <line x1="64" y1="118" x2="64" y2="106" stroke="#3f4650" strokeWidth="1.4" />
        <circle cx="64" cy="104" r="2.4" fill="#fde68a" />
      </g>
    </>
  ),

  /* Brasília — la cathédrale de Niemeyer */
  modernist: (
    <>
      <defs>
        <linearGradient id="sc-mod-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a58a0" /><stop offset="58%" stopColor="#74acdc" /><stop offset="100%" stopColor="#ffdcac" />
        </linearGradient>
        <linearGradient id="sc-mod-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14707f" /><stop offset="55%" stopColor="#2f9fb5" /><stop offset="100%" stopColor="#7fd0dc" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-mod-sky)" />
      <Sun cx={172} cy={28} r={8} color="#fff8e4" glow="#ffd08a" />
      <Cloud x={42} y={20} s={0.9} opacity={0.5} />
      <Cloud x={120} y={14} s={0.6} opacity={0.35} />

      <rect x="0" y="96" width="200" height="34" fill="#d3c19c" />
      <rect x="0" y="96" width="200" height="3" fill="#ab9871" />
      <path d="M0 104 h200" stroke="#c0ad86" strokeWidth="1" opacity=".7" />

      {/* Le vitrail puis les nervures */}
      <path d="M58 96 Q74 58 66 22 L134 22 Q126 58 142 96 Z" fill="url(#sc-mod-glass)" opacity=".95" />
      <path d="M58 96 Q74 58 66 22 L100 22 Q100 58 100 96 Z" fill="#0d5867" opacity=".3" />
      {Array.from({ length: 15 }, (_, i) => {
        const t = (i - 7) / 7;
        return (
          <path key={i} d={`M${100 + t * 42} 96 Q${100 + t * 26} 58 ${100 + t * 34} 22`}
            stroke={t < 0 ? "#f8fafc" : "#e9edf2"} strokeWidth={3.4 - Math.abs(t) * 1.1} fill="none" strokeLinecap="round" />
        );
      })}
      <ellipse cx="100" cy="22" rx="34" ry="4.5" fill="none" stroke="#e2e8f0" strokeWidth="2" />
      <ellipse cx="100" cy="96" rx="43" ry="5" fill="#eae4d4" />
      <ellipse cx="100" cy="99" rx="46" ry="5" fill="#8fb4cd" opacity=".45" />

      {/* Les anges suspendus */}
      <ellipse cx="86" cy="50" rx="3" ry="5.5" fill="#f8fafc" opacity=".85" />
      <ellipse cx="112" cy="44" rx="3" ry="5.5" fill="#f8fafc" opacity=".7" />
      <line x1="86" y1="30" x2="86" y2="45" stroke="#f8fafc" strokeWidth=".5" opacity=".5" />
      <line x1="112" y1="28" x2="112" y2="39" stroke="#f8fafc" strokeWidth=".5" opacity=".5" />

      {/* Le campanile, les statues des apôtres, le drapeau */}
      <g>
        <rect x="40" y="52" width="3" height="44" fill="#e8eaee" />
        <rect x="46" y="58" width="3" height="38" fill="#dfe2e7" />
        <path d="M40 52 h9 v-4 h-9 Z" fill="#cbd5e1" />
      </g>
      <Person x={70} y={96} s={1.2} color="#8c8574" opacity={0.9} />
      <Person x={130} y={96} s={1.2} color="#8c8574" opacity={0.9} />
      <Person x={158} y={98} s={1} color="#1f2937" opacity={0.7} />
      <line x1="178" y1="96" x2="178" y2="60" stroke="#94a3b8" strokeWidth="1.4" />
      <path d="M178 62 h15 v10 h-15 Z" fill="#16a34a" />
      <path d="M185.5 62 l7.5 5 l-7.5 5 l-7.5 -5 Z" fill="#facc15" />
      <circle cx="185.5" cy="67" r="2.2" fill="#1d4ed8" />
    </>
  ),

  /* Avenida Paulista — la ville qui ne s'arrête jamais */
  skyline: (
    <>
      <defs>
        <linearGradient id="sc-sky-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101a35" /><stop offset="55%" stopColor="#584a7a" /><stop offset="100%" stopColor="#ea8b58" />
        </linearGradient>
        <linearGradient id="sc-sky-tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3f4f6b" /><stop offset="100%" stopColor="#1e2739" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="#1b2545" />
      <rect width="200" height="130" fill="url(#sc-sky-sky)" opacity=".9" />
      <circle cx="40" cy="24" r="7" fill="#fdf6e3" opacity=".92" />
      <circle cx="37" cy="22" r="6" fill="#3c4a72" opacity=".5" />
      {[14, 62, 96, 150, 182, 26, 118, 168].map((x, i) => <circle key={i} cx={x} cy={10 + (i % 4) * 7} r=".9" fill="#fff" opacity=".7" />)}
      <Cloud x={150} y={34} s={1.1} color="#6b5d86" opacity={0.45} />

      {/* Deux plans de tours */}
      {[[8, 68, 12], [30, 62, 10], [52, 72, 14], [126, 66, 12], [150, 70, 10], [176, 62, 14]].map(([x, y, w], i) => (
        <rect key={`f${i}`} x={x} y={y} width={w} height={130 - y} fill="#2b3552" opacity=".75" />
      ))}
      {[[4, 56, 15], [22, 46, 13], [40, 60, 17], [60, 42, 15], [80, 54, 13], [98, 38, 17], [118, 52, 15], [138, 44, 13], [156, 58, 17], [178, 40, 19]].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={130 - y} fill="url(#sc-sky-tower)" />
          <rect x={x} y={y} width="2.5" height={130 - y} fill="#4a5c7c" opacity=".7" />
          {Array.from({ length: Math.floor((122 - y) / 8) }, (_, r) => (
            <g key={r}>
              <rect x={x + 3} y={y + 5 + r * 8} width="2.8" height="3.2" fill="#ffd98a" opacity={(i + r) % 3 ? 0.9 : 0.2} />
              <rect x={x + 7.5} y={y + 5 + r * 8} width="2.8" height="3.2" fill="#ffd98a" opacity={(i + r) % 4 ? 0.72 : 0.18} />
              {w > 14 && <rect x={x + 12} y={y + 5 + r * 8} width="2.8" height="3.2" fill="#ffe9b8" opacity={(i + r) % 2 ? 0.85 : 0.22} />}
            </g>
          ))}
          {i % 3 === 0 && <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y - 6} stroke="#94a3b8" strokeWidth=".8" />}
          {i % 3 === 0 && <circle cx={x + w / 2} cy={y - 7} r="1" fill="#f87171" />}
        </g>
      ))}

      {/* Le MASP, suspendu à ses piliers rouges */}
      <g transform="translate(72 84)">
        <rect x="0" y="0" width="58" height="17" fill="#e8edf3" opacity=".97" />
        <rect x="0" y="0" width="58" height="4" fill="#c9d2dc" />
        {[6, 16, 26, 36, 46].map((x, i) => <rect key={i} x={x} y={6} width="6" height="8" fill="#93a4bb" opacity=".8" />)}
        <rect x="2" y="17" width="5" height="19" fill="#dc2626" />
        <rect x="51" y="17" width="5" height="19" fill="#dc2626" />
        <rect x="0" y="-3.4" width="58" height="3.4" fill="#dc2626" />
        <rect x="0" y="34" width="58" height="2.4" fill="#b91c1c" opacity=".6" />
      </g>

      {/* L'avenue et ses traînées de phares */}
      <rect x="0" y="120" width="200" height="10" fill="#161d2c" />
      <path d="M0 124 h26 M34 124 h24 M66 124 h26 M100 124 h22 M130 124 h26 M164 124 h30" stroke="#fbbf24" strokeWidth="1.6" opacity=".85" />
      <path d="M0 128 h34 M46 128 h28 M82 128 h30 M120 128 h26 M154 128 h40" stroke="#f87171" strokeWidth="1.4" opacity=".6" />
      <circle cx="24" cy="118" r="1.8" fill="#fef08a" opacity=".9" />
      <circle cx="168" cy="118" r="1.8" fill="#fef08a" opacity=".8" />
    </>
  ),

  /* Pantanal — le jaguar au bord de l'eau */
  wildlife: (
    <>
      <defs>
        <linearGradient id="sc-wld-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef9a4e" /><stop offset="50%" stopColor="#ffd9a0" /><stop offset="100%" stopColor="#fdf2dc" />
        </linearGradient>
        <linearGradient id="sc-wld-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d79c58" /><stop offset="100%" stopColor="#8a5f2e" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-wld-sky)" />
      <Sun cx={158} cy={38} r={12} color="#fff4d6" glow="#ff9a4d" />
      <Birds x={54} y={28} s={0.9} color="#8a5a2a" opacity={0.45} />
      <Birds x={120} y={22} s={0.6} color="#8a5a2a" opacity={0.3} />

      <TreeLine fill="#3f6b43" opacity={0.9} trees={[
        [6, 56, 9], [22, 52, 12], [40, 57, 8], [56, 51, 11], [74, 56, 10],
        [92, 53, 9], [110, 57, 12], [130, 52, 10], [148, 56, 9], [166, 51, 12], [186, 56, 10],
      ]} />
      <Haze y={52} h={8} color="#ffe2b4" opacity={0.35} />
      <rect x="0" y="60" width="200" height="6" fill="#2f5636" opacity=".8" />

      <rect x="0" y="66" width="200" height="30" fill="url(#sc-wld-water)" />
      <path d="M10 72 q22 -3 44 0 M70 80 q26 -3 52 0 M130 74 q20 -3 40 0 M40 90 q24 -3 48 0" stroke="#efc98c" strokeWidth="1.1" fill="none" opacity=".55" />
      <ellipse cx="130" cy="84" rx="30" ry="4" fill="#fff0d0" opacity=".3" />
      {/* un caïman qui passe */}
      <g opacity=".85">
        <path d="M150 90 q14 -3 26 0 q-12 3 -26 0 Z" fill="#4b5540" />
        <path d="M150 90 l-5 -2 l5 -1 Z" fill="#4b5540" />
        {[156, 162, 168].map((x, i) => <path key={i} d={`M${x} 89 l2 -2 l2 2 Z`} fill="#3c452f" />)}
      </g>

      <rect x="0" y="96" width="200" height="34" fill="#6f8f4a" />
      <path d="M0 96 q40 -6 80 -1 q44 6 120 -3 v6 H0 Z" fill="#8aa85e" />

      {/* Le jabiru */}
      <g transform="translate(32 76)">
        <path d="M0 0 q3 -11 12 -8 q6 3 3 9 q-8 3 -15 -1 Z" fill="#fdfdfb" />
        <path d="M11 -9 q1 -9 5 -9 q3 1 1 9 Z" fill="#1f2937" />
        <path d="M15 -17 q9 -3 12 0 q-9 3 -12 0 Z" fill="#1f2937" />
        <path d="M11 -9 q3 -2 5 0 q-1 3 -5 1 Z" fill="#dc2626" />
        <path d="M4 1 v11 M9 1 v11" stroke="#334155" strokeWidth="1.1" />
        <path d="M2 12 h5 M7 12 h5" stroke="#334155" strokeWidth="1" />
        <path d="M-1 -2 q-7 2 -9 6 q7 0 11 -3 Z" fill="#e8edf2" />
      </g>

      {/* Le jaguar, de profil */}
      <g transform="translate(92 86)">
        <path d="M-22 6 q-5 10 -3 18 l6 0 q-1 -9 2 -16 Z" fill="#c78a33" />
        <path d="M18 6 q4 10 2 18 l-6 0 q0 -9 -3 -16 Z" fill="#c78a33" />
        <path d="M-26 0 q-16 -2 -22 -14 q-2 -5 3 -4 q3 9 19 12 Z" fill="#d99a3f" />
        <path d="M-46 -16 q-4 -2 -2 -5 q4 1 4 5 Z" fill="#3f2a16" />
        <path d="M-26 2 q2 -13 16 -14 q14 -1 24 2 q10 2 12 10 q1 8 -6 10 q-20 4 -38 1 q-9 -2 -8 -9 Z" fill="#e8b055" />
        <path d="M-26 4 q20 7 46 0 q-2 6 -8 7 q-20 4 -32 0 q-6 -2 -6 -7 Z" fill="#d99a3f" />
        <path d="M12 12 q3 9 2 14 l-5 0 q0 -8 -2 -13 Z" fill="#e8b055" />
        <path d="M-16 12 q-3 9 -2 14 l5 0 q0 -8 2 -13 Z" fill="#e8b055" />
        <g transform="translate(30 -8)">
          <ellipse cx="0" cy="0" rx="11" ry="9.5" fill="#e8b055" />
          <path d="M-8 -7 q-2 -7 4 -6 q3 2 2 6 Z" fill="#d99a3f" />
          <path d="M8 -7 q2 -7 -4 -6 q-3 2 -2 6 Z" fill="#d99a3f" />
          <path d="M-7 -7 q-1 -4 2 -4 q1 2 1 4 Z" fill="#7c3f14" opacity=".6" />
          <path d="M7 -7 q1 -4 -2 -4 q-1 2 -1 4 Z" fill="#7c3f14" opacity=".6" />
          <ellipse cx="2" cy="4" rx="7" ry="5" fill="#f7dcac" />
          <circle cx="-4" cy="-1" r="1.8" fill="#1f2937" />
          <circle cx="5" cy="-1" r="1.8" fill="#1f2937" />
          <circle cx="-3.4" cy="-1.6" r=".6" fill="#fff" />
          <circle cx="5.6" cy="-1.6" r=".6" fill="#fff" />
          <path d="M1.4 2.6 h3.4 l-1.7 2.2 Z" fill="#7c3f14" />
          <path d="M3 5 q-3 2.6 -5.6 .6 M3 5 q3 2.6 5.6 .6" stroke="#a9702a" strokeWidth=".9" fill="none" />
          <path d="M-6 3 q-7 1 -9 -1 M-6 5 q-7 2 -9 1 M8 3 q7 1 9 -1" stroke="#f7dcac" strokeWidth=".55" fill="none" opacity=".85" />
        </g>
        {[[-20, -2], [-12, 4], [-4, -4], [2, 5], [10, -2], [16, 5], [-16, -6], [6, -7], [20, -6], [-8, 8], [-2, 12], [12, 9]].map(([x, y], i) => (
          <g key={i} opacity=".7">
            <circle cx={x} cy={y} r="2.4" fill="none" stroke="#7c3f14" strokeWidth="1.1" />
            <circle cx={x} cy={y} r=".7" fill="#7c3f14" />
          </g>
        ))}
      </g>
      <ellipse cx="92" cy="112" rx="32" ry="3.5" fill="#4a3a1c" opacity=".26" />

      {[4, 12, 22, 172, 184, 194].map((x, i) => (
        <path key={i} d={`M${x} 130 q2 -18 ${i % 2 ? 5 : -4} -30`} stroke="#4f7a3a" strokeWidth="1.6" fill="none" />
      ))}
      <path d="M0 130 q16 -6 20 -20 q6 14 -6 20 Z" fill="#3c5c2c" />
    </>
  ),

  /* Jericoacoara — le kite au coucher du soleil */
  kite: (
    <>
      <defs>
        <linearGradient id="sc-kit-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e85d4f" /><stop offset="45%" stopColor="#ffab5e" /><stop offset="100%" stopColor="#ffe9b8" />
        </linearGradient>
        <linearGradient id="sc-kit-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c07a42" /><stop offset="100%" stopColor="#74451f" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-kit-sky)" />
      <Sun cx={132} cy={76} r={15} color="#fff6d6" glow="#ff5f32" />
      <Cloud x={40} y={20} s={1.2} color="#ffc09a" opacity={0.55} />
      <Cloud x={172} y={28} s={0.7} color="#ffc09a" opacity={0.4} />

      <rect x="0" y="86" width="200" height="44" fill="url(#sc-kit-sea)" />
      <path d="M116 88 q16 -3 32 0 q-16 4 -32 0 M120 96 q12 -2 24 0 q-12 3 -24 0 M124 104 q10 -2 20 0 q-10 2 -20 0 M128 112 q8 -2 16 0 q-8 2 -16 0" fill="#ffdfa8" opacity=".6" />
      <Foam y={91} color="#ffe3bd" opacity={0.35} />
      <Foam y={100} color="#ffe3bd" opacity={0.25} offset={9} />

      {/* La Pedra Furada, percée */}
      <g>
        <path d="M12 86 q4 -28 17 -29 q9 1 12 13 q7 -2 10 5 q4 9 2 11 Z" fill="#4a382a" />
        <path d="M29 57 q7 2 10 12 q-6 -3 -10 -12 Z" fill="#6b5340" opacity=".8" />
        <path d="M30 79 q8 -9 14 -1 q-7 8 -14 1 Z" fill="#ffab5e" />
        <path d="M30 79 q8 -9 14 -1" stroke="#2f2418" strokeWidth=".8" fill="none" opacity=".5" />
      </g>

      <path d="M0 130 v-20 q30 -14 62 -4 q28 9 56 -2 q34 -12 82 2 v24 Z" fill="#e5c185" />
      <path d="M0 110 q30 -14 62 -4 q28 9 56 -2" stroke="#cda264" strokeWidth="1.4" fill="none" />
      <path d="M8 118 q20 -4 38 0 M70 122 q22 -4 44 0" stroke="#d9b478" strokeWidth="1" fill="none" opacity=".8" />

      {/* Deux kites et leur pilote */}
      <g>
        <path d="M58 20 q18 -12 34 4 q-16 10 -34 -4 Z" fill="#ef4444" />
        <path d="M61 21 q14 -9 27 3 q-13 6 -27 -3 Z" fill="#facc15" opacity=".9" />
        <path d="M68 24 q8 24 20 46" stroke="#fdfcf7" strokeWidth=".7" fill="none" opacity=".85" />
        <path d="M84 26 q3 22 6 44" stroke="#fdfcf7" strokeWidth=".7" fill="none" opacity=".85" />
        <g transform="translate(88 72)">
          <circle cx="0" cy="-7" r="2.6" fill="#1f2937" />
          <path d="M0 -5 q-4 5 -2 10 l4 0 q2 -6 0 -10 Z" fill="#1f2937" />
          <path d="M-4 7 q6 3 10 -2" stroke="#1f2937" strokeWidth="2" fill="none" />
          <path d="M-9 8 h19 l-2 2.4 h-15 Z" fill="#0ea5e9" />
          <path d="M-10 10 q10 -4 20 0" stroke="#ffffff" strokeWidth="1.4" fill="none" opacity=".7" />
        </g>
        <path d="M76 84 q14 -3 24 2" stroke="#ffffff" strokeWidth="1.6" fill="none" opacity=".65" />
      </g>
      <g transform="translate(150 34) scale(.6)" opacity=".85">
        <path d="M0 0 q18 -12 34 4 q-16 10 -34 -4 Z" fill="#22c55e" />
        <path d="M3 1 q14 -9 27 3 q-13 6 -27 -3 Z" fill="#a7f3d0" opacity=".9" />
      </g>

      {/* Les spectateurs du coucher de soleil, sur la dune */}
      <Person x={168} y={112} s={1.2} color="#5b3218" />
      <Person x={176} y={113} s={1.05} color="#5b3218" opacity={0.85} />
      <Person x={30} y={120} s={1} color="#5b3218" opacity={0.7} />
      <Birds x={158} y={24} s={0.7} color="#7c3f14" opacity={0.4} />
    </>
  ),

  /* Olinda — les géants du carnaval */
  carnival: (
    <>
      <defs>
        <linearGradient id="sc-car-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6d28d9" /><stop offset="55%" stopColor="#d946ef" /><stop offset="100%" stopColor="#fde2f2" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-car-sky)" />
      {[16, 44, 72, 110, 150, 182, 30, 128, 166].map((x, i) => (
        <circle key={i} cx={x} cy={8 + (i % 4) * 8} r="1.5" fill="#fef9c3" opacity=".75" />
      ))}
      <path d="M0 30 q50 14 100 2 q50 -12 100 4" stroke="#f9a8d4" strokeWidth=".8" fill="none" opacity=".6" />

      {/* Les façades en pente d'Olinda */}
      {[[0, 62, 30, "#fcd34d", "#d9a520"], [30, 54, 26, "#60a5fa", "#3b82c4"], [56, 66, 22, "#f472b6", "#c85f94"],
      [142, 58, 26, "#34d399", "#22a97d"], [168, 68, 32, "#fb923c", "#d2742c"]].map(([x, y, w, c, sh], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={130 - y} fill={c} opacity=".95" />
          <rect x={x + w - 4} y={y} width="4" height={130 - y} fill={sh} />
          <path d={`M${x - 2} ${y} h${w + 4} l-3 -6 h-${w - 2} Z`} fill="#b45309" />
          <rect x={x + 5} y={y + 10} width="7" height="10" fill="#1e293b" opacity=".6" />
          <rect x={x + 5} y={y + 10} width="7" height="10" fill="none" stroke="#fdfcf7" strokeWidth=".8" />
          <rect x={x + 15} y={y + 10} width="7" height="10" fill="#1e293b" opacity=".45" />
          <rect x={x + 15} y={y + 10} width="7" height="10" fill="none" stroke="#fdfcf7" strokeWidth=".8" />
        </g>
      ))}

      {/* Trois géants de papier mâché */}
      <g transform="translate(84 38)">
        <path d="M14 34 q-19 6 -21 58 h42 q-2 -52 -21 -58 Z" fill="#22d3ee" />
        <path d="M14 34 q-19 6 -21 58 h10 q3 -46 11 -58 Z" fill="#67e8f9" />
        <circle cx="14" cy="18" r="18" fill="#fde68a" />
        <path d="M-4 14 q18 -22 36 0 q-18 -8 -36 0 Z" fill="#7c2d12" />
        <path d="M-6 13 q20 -6 40 0 l-2 -3 q-18 -5 -36 0 Z" fill="#a3410f" />
        <circle cx="8" cy="18" r="2.4" fill="#1f2937" />
        <circle cx="20" cy="18" r="2.4" fill="#1f2937" />
        <circle cx="8.8" cy="17.2" r=".8" fill="#fff" />
        <circle cx="20.8" cy="17.2" r=".8" fill="#fff" />
        <path d="M7 26 q7 6 14 0" stroke="#be123c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <circle cx="4" cy="24" r="2.6" fill="#fb7185" opacity=".8" />
        <circle cx="24" cy="24" r="2.6" fill="#fb7185" opacity=".8" />
        <path d="M14 0 q-8 -8 -2 -12 M14 0 q8 -8 2 -12 M14 0 q0 -10 0 -14" stroke="#fbbf24" strokeWidth="2.4" fill="none" />
      </g>
      <g transform="translate(44 54) scale(.76)">
        <path d="M14 34 q-19 6 -21 58 h42 q-2 -52 -21 -58 Z" fill="#f97316" />
        <circle cx="14" cy="18" r="18" fill="#fbcfe8" />
        <path d="M-4 12 q18 -20 36 0 q-18 -9 -36 0 Z" fill="#111827" />
        <circle cx="8" cy="18" r="2.4" fill="#1f2937" />
        <circle cx="20" cy="18" r="2.4" fill="#1f2937" />
        <path d="M8 26 q6 5 12 0" stroke="#be123c" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M2 4 q12 -10 24 0" stroke="#fbbf24" strokeWidth="3" fill="none" />
      </g>
      <g transform="translate(126 62) scale(.6)" opacity=".95">
        <path d="M14 34 q-19 6 -21 58 h42 q-2 -52 -21 -58 Z" fill="#a78bfa" />
        <circle cx="14" cy="18" r="18" fill="#fed7aa" />
        <path d="M-4 13 q18 -21 36 0 q-18 -8 -36 0 Z" fill="#334155" />
        <circle cx="8" cy="18" r="2.6" fill="#1f2937" />
        <circle cx="20" cy="18" r="2.6" fill="#1f2937" />
        <path d="M8 26 q6 6 12 0" stroke="#be123c" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>

      {/* L'ombrelle du frevo et la foule */}
      <g transform="translate(160 96)">
        <line x1="0" y1="0" x2="0" y2="-15" stroke="#78350f" strokeWidth="1.6" />
        <path d="M-13 -14 q13 -12 26 0 Z" fill="#ef4444" />
        <path d="M-13 -14 q6.5 -6 13 0 Z" fill="#facc15" />
        <path d="M0 -14 q6.5 -6 13 0 Z" fill="#22c55e" />
      </g>
      <rect x="0" y="112" width="200" height="18" fill="#6b7280" />
      <path d="M0 116 h200" stroke="#9ca3af" strokeWidth="1.6" />
      {[8, 20, 32, 52, 70, 100, 118, 140, 174, 190].map((x, i) => (
        <Person key={i} x={x} y={122} s={1 + (i % 3) * 0.12} color="#1f2937" opacity={0.75} />
      ))}
      {[[20, 84, "#fde047"], [64, 92, "#22d3ee"], [120, 78, "#f472b6"], [170, 86, "#4ade80"], [38, 104, "#fb923c"], [140, 106, "#a78bfa"], [96, 100, "#fcd34d"]].map(([x, y, c], i) => (
        <rect key={i} x={x} y={y} width="4.2" height="2.6" rx="1" fill={c} transform={`rotate(${i * 37} ${x} ${y})`} />
      ))}
    </>
  ),

  /* Paraty — la goélette devant la ville coloniale */
  sailboat: (
    <>
      <defs>
        <linearGradient id="sc-sail-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f79e8" /><stop offset="100%" stopColor="#dceafe" />
        </linearGradient>
        <linearGradient id="sc-sail-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b46b4" /><stop offset="100%" stopColor="#4a8ce0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-sail-sky)" />
      <Cloud x={42} y={16} s={1.2} opacity={0.9} />
      <Cloud x={148} y={24} s={0.8} opacity={0.65} />
      <Cloud x={104} y={12} s={0.6} opacity={0.5} />

      <path d="M0 62 q24 -26 48 -8 q20 -22 44 2 q24 -20 50 4 q22 -14 58 2 v10 H0 Z" fill="#43705c" opacity=".7" />
      <path d="M0 66 q30 -12 60 -2 q34 10 70 -2 q34 -10 70 2 v6 H0 Z" fill="#2f5646" opacity=".9" />
      <Haze y={64} h={8} opacity={0.3} />

      {/* Le front de mer blanc et l'église Santa Rita */}
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <rect x={6 + i * 22} y={70} width="18" height="12" fill="#fdfcf7" />
          <rect x={6 + i * 22} y={70} width="5" height="12" fill="#eef0ea" />
          <path d={`M${4 + i * 22} 70 h22 l-11 -6 Z`} fill="#b45309" />
          <rect x={10 + i * 22} y={74} width="4" height="6" fill="#1d4ed8" opacity=".75" />
          <rect x={17 + i * 22} y={74} width="4" height="6" fill="#1d4ed8" opacity=".6" />
        </g>
      ))}
      <g>
        <rect x="88" y="60" width="24" height="22" fill="#fdfcf7" />
        <path d="M86 60 h28 l-14 -8 Z" fill="#b45309" />
        <rect x="96" y="46" width="8" height="14" fill="#fdfcf7" />
        <path d="M94 46 h12 l-6 -6 Z" fill="#b45309" />
        <rect x="99.2" y="36" width="1.6" height="5" fill="#7c5c2c" />
        <rect x="97.6" y="38" width="5" height="1.4" fill="#7c5c2c" />
        <rect x="97" y="68" width="6" height="14" rx="3" fill="#7c3f1d" />
      </g>
      <rect x="0" y="82" width="200" height="4" fill="#9aa2ad" />
      <rect x="0" y="86" width="200" height="44" fill="url(#sc-sail-sea)" />
      <path d="M8 94 q20 -3 40 0 M60 102 q24 -3 48 0 M120 96 q22 -3 44 0 M30 112 q26 -3 52 0 M140 116 q22 -3 44 0" stroke="#9ec5f7" strokeWidth="1.2" fill="none" opacity=".7" />

      {/* La goélette */}
      <g transform="translate(96 100)">
        <path d="M-30 0 q30 12 60 0 l-8 8 h-44 Z" fill="#7c3f1d" />
        <path d="M-30 0 q30 12 60 0 l-2 2 q-28 10 -56 0 Z" fill="#5b2f14" />
        <line x1="-6" y1="0" x2="-6" y2="-36" stroke="#3f2a16" strokeWidth="2" />
        <line x1="14" y1="0" x2="14" y2="-27" stroke="#3f2a16" strokeWidth="1.6" />
        <path d="M-6 -36 q-19 17 -2 31 Z" fill="#fdfcf7" />
        <path d="M-6 -34 q17 13 2 27 Z" fill="#e6e9ee" />
        <path d="M14 -27 q13 11 1 21 Z" fill="#fdfcf7" opacity=".95" />
        <path d="M-6 -38 l11 2 l-11 3 Z" fill="#16a34a" />
        <Person x={2} y={0} s={0.8} color="#1e293b" />
      </g>
      <ellipse cx="96" cy="112" rx="32" ry="4" fill="#173a94" opacity=".35" />
      <path d="M66 106 q30 8 60 0" stroke="#bcd8fb" strokeWidth="1.2" fill="none" opacity=".5" />
      <g opacity=".9">
        <path d="M150 104 h11 l-1.8 3 h-7.4 Z" fill="#fdfcf7" />
        <path d="M155 104 v-7 l4.6 7 Z" fill="#fdfcf7" />
      </g>
      <Birds x={38} y={34} s={0.9} color="#334155" opacity={0.45} />
    </>
  ),

  /* Bonito — la rivière transparente, vue de dessous */
  reef: (
    <>
      <defs>
        <linearGradient id="sc-reef-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bdf5fb" /><stop offset="40%" stopColor="#25bdd2" /><stop offset="100%" stopColor="#0b6f8c" />
        </linearGradient>
        <linearGradient id="sc-reef-ray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity=".6" /><stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-reef-water)" />
      <path d="M0 12 q14 -7 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t32 0 V0 H0 Z" fill="#e6fcff" opacity=".9" />
      <Foam y={14} color="#ffffff" opacity={0.55} />
      {[26, 70, 116, 160].map((x, i) => (
        <path key={i} d={`M${x} 12 l${-10 - i * 2} 100 l${26 + i * 3} 0 Z`} fill="url(#sc-reef-ray)" opacity=".55" />
      ))}

      {/* Un nageur en surface, vu d'en dessous */}
      <g transform="translate(132 20)" opacity=".8">
        <ellipse cx="0" cy="0" rx="12" ry="3.4" fill="#0f172a" opacity=".45" />
        <path d="M-10 1 q10 4 20 0" stroke="#0f172a" strokeWidth="1.4" fill="none" opacity=".5" />
      </g>

      <path d="M0 130 v-24 q30 -10 60 -4 q38 8 78 -4 q34 -10 62 2 v30 Z" fill="#cbab6e" />
      <path d="M0 130 v-24 q30 -10 60 -4 q38 8 78 -4 q34 -10 62 2 v5 q-32 -10 -62 0 q-40 12 -78 4 q-30 -6 -60 4 Z" fill="#dcbf87" />
      {[14, 38, 152, 180, 96].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 112 q-6 -20 2 -32 q6 16 -2 32 Z`} fill="#0f766e" opacity=".9" />
          <path d={`M${x + 7} 114 q-5 -15 1 -26 q5 13 -1 26 Z`} fill="#15803d" opacity=".85" />
          <path d={`M${x - 6} 116 q-4 -12 1 -20 q4 10 -1 20 Z`} fill="#166534" opacity=".7" />
        </g>
      ))}
      {[[60, 120, 5], [124, 122, 7], [168, 124, 4]].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.6} fill="#a1875a" opacity=".8" />
      ))}

      {/* Le banc de poissons */}
      {[[54, 46, 1, "#fbbf24"], [76, 56, 1.15, "#fb923c"], [98, 42, 0.9, "#facc15"], [116, 60, 1.1, "#f97316"],
      [138, 48, 0.95, "#fbbf24"], [86, 76, 1.05, "#fdba74"], [60, 84, 0.85, "#fcd34d"], [40, 62, 0.8, "#fb923c"], [156, 78, 0.9, "#fcd34d"]].map(([x, y, s, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <ellipse cx="0" cy="0" rx="8" ry="4.4" fill={c} />
          <path d="M-8 0 l-6 -4 v8 Z" fill={c} />
          <path d="M0 -4.4 q3 -4 5 0 Z" fill={c} opacity=".8" />
          <path d="M0 4.4 q3 3 5 0 Z" fill={c} opacity=".7" />
          <circle cx="4.6" cy="-1" r="1.1" fill="#1f2937" />
          <circle cx="5" cy="-1.4" r=".35" fill="#fff" />
          <path d="M-2 -3 q3 3 0 6" stroke="#b45309" strokeWidth=".7" fill="none" opacity=".55" />
        </g>
      ))}
      <g transform="translate(152 96)">
        <ellipse cx="0" cy="0" rx="13" ry="6.4" fill="#cbd5e1" />
        <ellipse cx="0" cy="2" rx="13" ry="4" fill="#e2e8f0" opacity=".7" />
        <path d="M-13 0 l-9 -5.4 v10.8 Z" fill="#94a3b8" />
        <path d="M0 -6.4 q4 -5 7 0 Z" fill="#94a3b8" />
        <circle cx="7.4" cy="-1.6" r="1.5" fill="#0f172a" />
      </g>
      {[[36, 70, 2.4], [42, 56, 1.6], [46, 42, 1.1], [168, 58, 2], [172, 44, 1.3], [110, 30, 1.6]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#ffffff" opacity=".5" />
      ))}
    </>
  ),

  /* Porto de Galinhas — la jangada et les piscines naturelles */
  fishpools: (
    <>
      <defs>
        <linearGradient id="sc-fp-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#25aaf0" /><stop offset="100%" stopColor="#e4f4fe" />
        </linearGradient>
        <linearGradient id="sc-fp-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0782a3" /><stop offset="45%" stopColor="#25cbdd" /><stop offset="100%" stopColor="#8fe9f2" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-fp-sky)" />
      <Sun cx={36} cy={22} r={10} color="#fffdf0" glow="#fde68a" />
      <Cloud x={126} y={18} s={1} opacity={0.9} />
      <Cloud x={72} y={12} s={0.6} opacity={0.5} />
      {/* la plage au fond, avec ses parasols */}
      <rect x="0" y="46" width="200" height="6" fill="#f2dfb4" />
      <Palm x={12} y={46} s={0.55} />
      <Palm x={186} y={46} s={0.5} />
      {[40, 58, 150, 168].map((x, i) => (
        <path key={i} d={`M${x} 46 q4 -4 8 0 Z`} fill={["#ef4444", "#f59e0b"][i % 2]} opacity=".85" />
      ))}

      <rect x="0" y="52" width="200" height="78" fill="url(#sc-fp-sea)" />
      <Foam y={56} opacity={0.35} />
      <path d="M-10 86 q40 -14 84 -4 q46 10 130 -6" stroke="#b07a1e" strokeWidth="5.5" fill="none" opacity=".7" />
      <path d="M-10 86 q40 -14 84 -4 q46 10 130 -6" stroke="#d8a63f" strokeWidth="2" fill="none" opacity=".6" />
      <path d="M-10 108 q46 -12 92 -2 q44 10 122 -6" stroke="#b07a1e" strokeWidth="4.5" fill="none" opacity=".55" />
      <ellipse cx="66" cy="98" rx="46" ry="12" fill="#c8f7fd" opacity=".55" />
      <ellipse cx="150" cy="118" rx="40" ry="10" fill="#c8f7fd" opacity=".45" />

      {/* La jangada et ses passagers */}
      <g transform="translate(112 62)">
        <path d="M-27 0 h54 l-4 5 h-46 Z" fill="#b45309" />
        <path d="M-27 0 h54 l-1 1.6 h-52 Z" fill="#92400e" />
        {[-20, -12, -4, 4, 12, 20].map((x, i) => <line key={i} x1={x} y1="0" x2={x - 1} y2="4.6" stroke="#7c3f1d" strokeWidth=".7" opacity=".6" />)}
        <line x1="0" y1="0" x2="0" y2="-32" stroke="#78350f" strokeWidth="1.8" />
        <path d="M0 -32 q21 15 4 28 h-4 Z" fill="#fdfcf7" />
        <path d="M0 -28 q14 11 2 21 h-2 Z" fill="#e4e8ed" />
        <Person x={-12} y={0} s={0.85} color="#1e293b" />
        <Person x={12} y={0} s={0.8} color="#7f1d1d" opacity={0.9} />
      </g>
      <ellipse cx="112" cy="70" rx="27" ry="3" fill="#0b6f8c" opacity=".35" />

      {[[46, 96, "#fb923c"], [72, 102, "#fbbf24"], [96, 94, "#f97316"], [140, 116, "#fcd34d"], [164, 112, "#fb923c"], [58, 112, "#fdba74"]].map(([x, y, c], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${0.85 + (i % 3) * 0.12})`}>
          <ellipse cx="0" cy="0" rx="6.4" ry="3.4" fill={c} />
          <path d="M-6.4 0 l-4.6 -3 v6 Z" fill={c} />
          <path d="M0 -3.4 q2.4 -3 4 0 Z" fill={c} opacity=".8" />
          <circle cx="3.6" cy="-.8" r=".9" fill="#1f2937" />
        </g>
      ))}
      <path d="M180 100 l2.6 5.4 l6 .8 l-4.4 4.2 l1 6 l-5.2 -2.8 l-5.2 2.8 l1 -6 l-4.4 -4.2 l6 -.8 Z" fill="#fb7185" />
      <path d="M180 104 l1.4 3 l3 .4 l-2.2 2.2 l.6 3 l-2.8 -1.4 l-2.8 1.4 l.6 -3 l-2.2 -2.2 l3 -.4 Z" fill="#f43f5e" opacity=".6" />
      <path d="M0 130 v-8 q30 -6 60 -2 q40 6 140 -4 v14 Z" fill="#f7e5bd" />
    </>
  ),

  /* Gramado — l'hiver austral et ses chalets */
  snowvillage: (
    <>
      <defs>
        <linearGradient id="sc-snw-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#151f36" /><stop offset="55%" stopColor="#40547a" /><stop offset="100%" stopColor="#9db1cc" />
        </linearGradient>
        <linearGradient id="sc-snw-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbfdff" /><stop offset="100%" stopColor="#d5e0ed" />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill="url(#sc-snw-sky)" />
      <circle cx="166" cy="22" r="9" fill="#fef9e7" opacity=".95" />
      <circle cx="162" cy="19" r="7.5" fill="#33456b" opacity=".5" />
      {[14, 38, 66, 96, 124, 150, 186, 28, 110, 178, 50].map((x, i) => (
        <circle key={i} cx={x} cy={6 + (i % 5) * 7} r={i % 3 ? 1.2 : 1.6} fill="#fff" opacity=".8" />
      ))}

      <path d="M0 62 q28 -28 54 -6 q24 -22 50 4 q26 -18 52 2 q22 -12 44 4 v14 H0 Z" fill="#2d3a55" />
      <path d="M38 48 q9 7 16 11 q-16 2 -16 -11 Z" fill="#e8eef6" opacity=".85" />
      <path d="M102 44 q9 7 16 13 q-16 2 -16 -13 Z" fill="#e8eef6" opacity=".75" />
      <path d="M156 50 q7 5 12 9 q-12 2 -12 -9 Z" fill="#e8eef6" opacity=".7" />
      <Haze y={62} h={8} color="#cfdcea" opacity={0.3} />

      {[[8, 92, 1], [26, 96, .82], [172, 94, .95], [192, 90, 1.1], [54, 90, .72], [148, 98, .68]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect x="-1.4" y="0" width="3" height="8" fill="#4b3a2a" />
          <path d="M0 -27 l-10 15 h20 Z" fill="#12482a" />
          <path d="M0 -19 l-12 16 h24 Z" fill="#166534" />
          <path d="M0 -10 l-13 13 h26 Z" fill="#15803d" />
          <path d="M0 -27 l-10 15 h7 Z" fill="#e8eef6" opacity=".5" />
          <path d="M0 -19 l-12 16 h8 Z" fill="#e8eef6" opacity=".35" />
        </g>
      ))}

      {/* Les chalets, fenêtres allumées */}
      <g>
        <rect x="64" y="74" width="36" height="28" fill="#f4eee4" />
        <rect x="64" y="74" width="10" height="28" fill="#e6ded1" />
        <path d="M60 74 h44 l-22 -17 Z" fill="#8c3b2f" />
        <path d="M60 74 h44 l-2 -1.8 h-40 Z" fill="#fbfdff" />
        <path d="M82 57 l-22 17 h5 l17 -13 Z" fill="#a34437" />
        <rect x="70" y="82" width="9" height="9" fill="#fbbf24" />
        <rect x="70" y="82" width="9" height="9" fill="none" stroke="#7c3f1d" strokeWidth=".9" />
        <rect x="86" y="82" width="9" height="9" fill="#fbbf24" opacity=".85" />
        <rect x="86" y="82" width="9" height="9" fill="none" stroke="#7c3f1d" strokeWidth=".9" />
        <rect x="77" y="94" width="10" height="8" fill="#7c3f1d" />
        <rect x="90" y="58" width="5" height="11" fill="#6b7280" />
        <path d="M92 56 q4 -7 -1 -10 M93 50 q4 -6 0 -9" stroke="#cbd5e1" strokeWidth="1.2" fill="none" opacity=".6" />
      </g>
      <g transform="translate(110 84) scale(.8)">
        <rect x="0" y="0" width="36" height="24" fill="#e9e1d3" />
        <path d="M-4 0 h44 l-20 -15 Z" fill="#3f6b57" />
        <path d="M-4 0 h44 l-2 -1.6 h-40 Z" fill="#fbfdff" />
        <rect x="6" y="7" width="8" height="9" fill="#fbbf24" opacity=".9" />
        <rect x="21" y="7" width="8" height="9" fill="#fbbf24" opacity=".7" />
        <rect x="14" y="16" width="8" height="8" fill="#7c3f1d" />
      </g>
      <g transform="translate(32 88) scale(.62)" opacity=".92">
        <rect x="0" y="0" width="32" height="22" fill="#efe6d8" />
        <path d="M-4 0 h40 l-18 -14 Z" fill="#8c3b2f" />
        <rect x="6" y="6" width="7" height="8" fill="#fbbf24" opacity=".8" />
        <rect x="19" y="6" width="7" height="8" fill="#fbbf24" opacity=".6" />
      </g>

      <path d="M0 130 v-28 q40 -10 82 -4 q48 7 118 -4 v36 Z" fill="url(#sc-snw-ground)" />
      <path d="M20 112 q20 -4 40 0 M110 116 q24 -4 48 0" stroke="#c3d3e4" strokeWidth="1" fill="none" opacity=".8" />

      <path d="M58 70 q42 16 88 -4" stroke="#94a3b8" strokeWidth=".7" fill="none" opacity=".6" />
      {[64, 78, 92, 106, 120, 134].map((x, i) => (
        <circle key={i} cx={x} cy={74 + Math.sin(i * 1.2) * 4} r="1.7" fill={["#ef4444", "#fbbf24", "#22c55e"][i % 3]} />
      ))}
      {[[20, 110], [48, 118], [140, 112], [170, 120], [92, 116], [120, 124], [8, 122], [186, 108]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#ffffff" opacity=".9" />
      ))}
      <Person x={150} y={118} s={1} color="#1e293b" opacity={0.8} />
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
