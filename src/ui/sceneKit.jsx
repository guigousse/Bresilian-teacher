import React from "react";

/* ==================================================================
   PIÈCES DE DÉCOR — partagées par les scènes de toutes les langues.
   ================================================================== */

export function Sun({ cx, cy, r = 11, color = "#ffd98a", glow = "#ffb86b", rays = false }) {
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

export function Cloud({ x, y, s = 1, color = "#ffffff", opacity = 0.75 }) {
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

export function Birds({ x, y, s = 1, color = "#1f2937", opacity = 0.5 }) {
  return (
    <g opacity={opacity} transform={`translate(${x} ${y}) scale(${s})`} stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round">
      <path d="M0 0 q3 -3 6 0 q3 -3 6 0" />
      <path d="M12 6 q2.4 -2.4 4.8 0 q2.4 -2.4 4.8 0" />
      <path d="M-9 7 q2 -2 4 0 q2 -2 4 0" />
    </g>
  );
}

export function Palm({ x, y, s = 1, trunk = "#5b4630", leaf = "#166534", dark = "#0f4429" }) {
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
export function Person({ x, y, s = 1, color = "#1f2937", opacity = 0.8 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity}>
      <circle cx="0" cy="-7" r="1.7" fill={color} />
      <path d="M0 -5.4 v4 M0 -1.4 l-1.8 3.4 M0 -1.4 l1.8 3.4 M-1.6 -4 h3.2" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </g>
  );
}

/* Une lisière de forêt. Les positions sont écrites à la main plutôt que
   calculées : une rangée régulière se voit tout de suite et fait faux. */
export function TreeLine({ trees, fill, opacity = 1 }) {
  return (
    <g opacity={opacity}>
      {trees.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r} ry={r * (0.72 + (i % 3) * 0.12)} fill={fill} />
      ))}
    </g>
  );
}

/* Un banc d'écume pour les mers */
export function Foam({ y, color = "#ffffff", opacity = 0.7, offset = 0, w = 1.6 }) {
  return (
    <path d={`M${-10 + offset} ${y} q12 -3 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0`}
      stroke={color} strokeWidth={w} fill="none" opacity={opacity} strokeLinecap="round" />
  );
}

/* Le voile de brume qui sépare deux plans */
export function Haze({ y, h = 10, color = "#ffffff", opacity = 0.35 }) {
  return <rect x="0" y={y} width="200" height={h} fill={color} opacity={opacity} />;
}

