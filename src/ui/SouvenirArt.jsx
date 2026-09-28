import React from "react";
import { TIERS } from "../data/common.js";

/* ==================================================================
   DESSINS — le coffre, les souvenirs et les petits papiers.
   Tout est en SVG pour rester net sur tous les écrans et ne peser
   presque rien.
   ================================================================== */

/* Garnitures du coffre selon sa rareté : plus il est rare, plus le
   métal est précieux. */
const TRIM = {
  commun:     { band: "#6b5132", bandHi: "#8a6a42", gem: "#a8a29e", wood: ["#a86a35", "#7a4a22"] },
  rare:       { band: "#94a3b8", bandHi: "#cbd5e1", gem: "#38bdf8", wood: ["#9a5b2c", "#6b3a18"] },
  epique:     { band: "#a78bfa", bandHi: "#ddd6fe", gem: "#c026d3", wood: ["#7c3f23", "#4a2312"] },
  legendaire: { band: "#f59e0b", bandHi: "#fde68a", gem: "#dc2626", wood: ["#8a3b12", "#551f07"] },
};

export function ChestArt({ tier = "commun", open = false, size = 180 }) {
  const t = TRIM[tier] || TRIM.commun;
  const glow = (TIERS[tier] || TIERS.commun).glow;
  const id = `ch-${tier}`;
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 120 114" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`${id}-halo`} cx="50%" cy="55%" r="55%">
          <stop offset="0" stopColor={glow} stopOpacity=".75" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.wood[0]} />
          <stop offset="1" stopColor={t.wood[1]} />
        </linearGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={t.band} />
          <stop offset=".45" stopColor={t.bandHi} />
          <stop offset="1" stopColor={t.band} />
        </linearGradient>
        <linearGradient id={`${id}-light`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Halo de rareté */}
      <ellipse cx="60" cy="66" rx={open ? 70 : 58} ry={open ? 64 : 50} fill={`url(#${id}-halo)`}
        className={open ? "" : "fb-halo"} />

      {/* Rayons qui sortent du coffre ouvert */}
      {open && (
        <g className="fb-rays" style={{ transformOrigin: "60px 50px" }}>
          {Array.from({ length: 10 }, (_, i) => (
            <path key={i} d="M60 50 L55 -40 L65 -40 Z" fill={glow} opacity=".35"
              transform={`rotate(${i * 36 - 90} 60 50)`} />
          ))}
        </g>
      )}

      {/* Ombre au sol */}
      <ellipse cx="60" cy="106" rx="46" ry="5" fill="#000" opacity=".25" />

      {/* Corps */}
      <rect x="14" y="52" width="92" height="50" rx="5" fill={`url(#${id}-wood)`} />
      <path d="M14 69 H106 M14 86 H106" stroke="#000" strokeOpacity=".22" strokeWidth="1.2" />
      <path d="M40 52 V102 M80 52 V102" stroke="#000" strokeOpacity=".12" strokeWidth="1" />
      <rect x="24" y="52" width="9" height="50" fill={`url(#${id}-band)`} />
      <rect x="87" y="52" width="9" height="50" fill={`url(#${id}-band)`} />
      <rect x="12" y="97" width="96" height="7" rx="2" fill={`url(#${id}-band)`} />
      {tier === "legendaire" && [30, 50, 70, 90].map((x) => <circle key={x} cx={x} cy="100.5" r="1.6" fill="#fff7d6" />)}

      {/* Lumière qui déborde quand il est ouvert */}
      {open && <rect x="16" y="40" width="88" height="16" fill={`url(#${id}-light)`} />}
      {open && <rect x="16" y="50" width="88" height="5" fill="#1c0f06" opacity=".6" />}

      {/* Serrure */}
      <rect x="51" y="54" width="18" height="20" rx="3" fill={`url(#${id}-band)`} stroke="#000" strokeOpacity=".25" />
      <circle cx="60" cy="61" r="3" fill={t.gem} />
      <path d="M59 64 h2 v6 h-2 Z" fill="#1c0f06" opacity=".7" />

      {/* Couvercle : il bascule vers l'arrière à l'ouverture */}
      <g className="fb-lid" style={{
        transformOrigin: "14px 52px",
        transform: open ? "translate(-6px,-30px) rotate(-22deg)" : "none",
        transition: "transform .45s cubic-bezier(.2,1.4,.4,1)",
      }}>
        <path d="M14 52 V38 Q14 18 60 16 Q106 18 106 38 V52 Z" fill={`url(#${id}-wood)`} />
        <path d="M18 34 Q60 22 102 34" stroke="#fff" strokeOpacity=".18" strokeWidth="2" fill="none" />
        <path d="M24 52 V26 Q27 21 33 20 V52 Z" fill={`url(#${id}-band)`} />
        <path d="M87 52 V20 Q93 21 96 26 V52 Z" fill={`url(#${id}-band)`} />
        <rect x="12" y="46" width="96" height="7" rx="2" fill={`url(#${id}-band)`} />
        <rect x="53" y="44" width="14" height="10" rx="2" fill={`url(#${id}-band)`} stroke="#000" strokeOpacity=".25" />
        {(tier === "epique" || tier === "legendaire") && <circle cx="60" cy="30" r="4.5" fill={t.gem} stroke={t.bandHi} strokeWidth="1.5" />}
      </g>
    </svg>
  );
}

/* --- Les souvenirs ---------------------------------------------------- */

const INK = "#3b2a1a";
const PAPER = "#f5ead3";
const PAPER_D = "#e2d2ae";

function Frame({ children }) {
  return <svg viewBox="0 0 64 64" width="100%" height="100%">{children}</svg>;
}

const ART = {
  flower: () => (
    <Frame>
      <rect x="10" y="8" width="44" height="50" rx="2" fill={PAPER} stroke={PAPER_D} />
      <path d="M32 50 C31 40 33 32 32 24" stroke="#6b7c3a" strokeWidth="1.5" fill="none" />
      <path d="M32 40 q-7 -3 -9 -9 q7 1 9 9" fill="#7d8f45" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="32" cy="17" rx="4" ry="7.5" fill="#e8b923" opacity=".9" transform={`rotate(${a} 32 23)`} />
      ))}
      <circle cx="32" cy="23" r="2.6" fill="#b7791f" />
      <path d="M16 54 h22" stroke={INK} strokeOpacity=".35" strokeWidth=".8" />
    </Frame>
  ),
  key: () => (
    <Frame>
      <path d="M44 10 q8 4 6 12 l-6 2" fill="#8b5a2b" stroke="#5c3a1a" />
      <circle cx="24" cy="22" r="10" fill="none" stroke="#7a7064" strokeWidth="4" />
      <circle cx="24" cy="22" r="10" fill="none" stroke="#b8ad9c" strokeWidth="1.2" />
      <path d="M31 29 L50 52" stroke="#7a7064" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 45 l5 -4 M47 49 l5 -4" stroke="#7a7064" strokeWidth="3.5" strokeLinecap="round" />
      <text x="24" y="25.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#5c5247">12</text>
    </Frame>
  ),
  letter: () => (
    <Frame>
      <g transform="rotate(-6 32 32)">
        <rect x="9" y="10" width="46" height="44" rx="1.5" fill={PAPER} stroke={PAPER_D} />
        <path d="M9 32 H55" stroke={PAPER_D} />
        {[16, 21, 26, 38, 43, 48].map((y, i) => (
          <path key={y} d={`M14 ${y} q${10} -2 ${i % 2 ? 30 : 36} 0`} stroke={INK} strokeOpacity=".6" strokeWidth="1" fill="none" />
        ))}
      </g>
    </Frame>
  ),
  recipe: () => (
    <Frame>
      <rect x="11" y="9" width="42" height="48" rx="3" fill="#fff8e6" stroke="#e6c98a" />
      <rect x="11" y="9" width="42" height="9" rx="3" fill="#f59e0b" opacity=".85" />
      <ellipse cx="32" cy="32" rx="9" ry="7" fill="#f6a623" />
      <path d="M32 25 q4 -5 8 -4" stroke="#4d7c0f" strokeWidth="2" fill="none" />
      {[44, 49].map((y) => <path key={y} d={`M16 ${y} H48`} stroke={INK} strokeOpacity=".45" strokeWidth="1" />)}
    </Frame>
  ),
  ticket: () => (
    <Frame>
      <g transform="rotate(-8 32 32)">
        <path d="M6 20 H58 V30 a3 3 0 0 0 0 6 V46 H6 V36 a3 3 0 0 0 0 -6 Z" fill="#e9d8a6" stroke="#c9b27a" />
        <path d="M44 20 V46" stroke="#b39b62" strokeDasharray="2 2" />
        <path d="M12 27 H38 M12 32 H34 M12 38 H30" stroke={INK} strokeOpacity=".55" strokeWidth="1.2" />
        <path d="M48 30 l4 -3 l2 6 Z" fill="#1e3a8a" opacity=".75" />
        <text x="51" y="42" textAnchor="middle" fontSize="5" fill={INK} opacity=".7">1962</text>
      </g>
    </Frame>
  ),
  map: () => (
    <Frame>
      <path d="M8 12 L24 8 L40 12 L56 8 V52 L40 56 L24 52 L8 56 Z" fill="#efe2c2" stroke="#c9b27a" />
      <path d="M24 8 V52 M40 12 V56" stroke="#c9b27a" />
      <path d="M12 40 C20 30 30 44 38 30 S50 22 54 26" stroke="#60a5fa" strokeWidth="2" fill="none" opacity=".7" />
      <path d="M14 22 H50 M30 14 V50" stroke="#a8a29e" strokeWidth="1.2" />
      <path d="M42 34 l6 6 M48 34 l-6 6" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 8 L50 18 L56 22" fill="#f5ead3" stroke="#c9b27a" />
    </Frame>
  ),
  ribbon: () => (
    <Frame>
      <path d="M8 44 C18 20 30 52 40 28 S54 14 58 20" stroke="#0e7490" strokeWidth="7" fill="none" strokeLinecap="round" opacity=".85" />
      <path d="M8 44 C18 20 30 52 40 28 S54 14 58 20" stroke="#67e8f9" strokeWidth="1" fill="none" strokeDasharray="1 3" />
      <circle cx="22" cy="36" r="3" fill="#0e7490" />
      <circle cx="30" cy="38" r="3" fill="#0e7490" />
      <circle cx="38" cy="32" r="3" fill="#0e7490" />
    </Frame>
  ),
  photo: () => (
    <Frame>
      <g transform="rotate(5 32 32)">
        <rect x="9" y="9" width="46" height="46" fill="#f8f4ea" stroke="#d6cdb8" />
        <rect x="13" y="13" width="38" height="32" fill="#8c8272" />
        <rect x="13" y="13" width="38" height="32" fill="#3b82f6" opacity=".25" />
        <rect x="16" y="22" width="14" height="23" fill="#6b6152" />
        <circle cx="36" cy="27" r="3.2" fill="#e7dccb" />
        <circle cx="45" cy="27" r="3.2" fill="#e7dccb" />
        <path d="M32 45 v-13 q4 -3 8 0 v13 M41 45 v-13 q4 -3 8 0 v13" fill="#d6cbb8" />
        <path d="M17 50 H40" stroke={INK} strokeOpacity=".4" strokeWidth=".9" />
      </g>
    </Frame>
  ),
  sheet: () => (
    <Frame>
      <rect x="12" y="7" width="40" height="52" fill="#fdfbf4" stroke="#d6cdb8" />
      <path d="M18 7 V59" stroke="#f87171" strokeOpacity=".6" />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i}>
          <path d={`M21 ${14 + i * 5.6} H38`} stroke={INK} strokeOpacity=".45" strokeWidth=".9" />
          <path d={`M42 ${14 + i * 5.6} l2 2 l4 -4`} stroke="#15803d" strokeWidth="1.1" fill="none" />
        </g>
      ))}
    </Frame>
  ),
  umbrella: () => (
    <Frame>
      <path d="M8 30 Q32 4 56 30 Q50 26 44 30 Q38 26 32 30 Q26 26 20 30 Q14 26 8 30 Z" fill="#1f2937" />
      <path d="M32 9 V30 M20 30 Q24 14 32 9 M44 30 Q40 14 32 9" stroke="#4b5563" strokeWidth=".9" fill="none" />
      <path d="M32 30 V52 q0 6 -6 6 q-5 0 -5 -5" stroke="#8b5a2b" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="35" y="38" width="12" height="8" rx="1" fill={PAPER} stroke={PAPER_D} transform="rotate(12 41 42)" />
      <path d="M32 38 L36 40" stroke={INK} strokeWidth=".6" />
    </Frame>
  ),
  cup: () => (
    <Frame>
      <path d="M12 26 h18 l-2 14 q-1 5 -7 5 q-6 0 -7 -5 Z" fill="#f8fafc" stroke="#cbd5e1" />
      <path d="M13 30 h16" stroke="#2563eb" strokeWidth="1.5" />
      <path d="M36 34 l14 -3 l-1 12 q-3 4 -8 2 Z" fill="#f8fafc" stroke="#cbd5e1" />
      <path d="M37 38 l12 -3" stroke="#2563eb" strokeWidth="1.5" />
      <path d="M22 50 l6 -3 l3 6 Z M42 52 l5 1 l-3 4 Z" fill="#f1f5f9" stroke="#cbd5e1" />
      <path d="M50 34 q6 1 4 7 q-2 3 -5 2" stroke="#cbd5e1" strokeWidth="2" fill="none" />
    </Frame>
  ),
  bracelet: () => (
    <Frame>
      <ellipse cx="32" cy="34" rx="22" ry="14" fill="none" stroke="#e2e8f0" strokeWidth="6" />
      <ellipse cx="32" cy="34" rx="22" ry="14" fill="none" stroke="#94a3b8" strokeWidth=".8" />
      <rect x="20" y="42" width="24" height="10" rx="2" fill="#fff" stroke="#94a3b8" />
      <path d="M23 46 H38 M23 49 H33" stroke={INK} strokeOpacity=".6" strokeWidth=".9" />
      <text x="41" y="50" textAnchor="middle" fontSize="4.5" fontWeight="700" fill="#dc2626">12</text>
    </Frame>
  ),
  card: () => (
    <Frame>
      <g transform="rotate(-4 32 32)">
        <rect x="8" y="14" width="48" height="36" rx="2" fill="#fef9c3" stroke="#facc15" />
        <text x="32" y="28" textAnchor="middle" fontSize="7" fontWeight="800" fill="#b91c1c" fontFamily="Georgia, serif">sábado</text>
        <path d="M14 36 H50 M14 42 H40" stroke="#1d4ed8" strokeOpacity=".6" strokeWidth="1.4" />
        <path d="M46 44 l2 -3 l2 3 l-2 3 Z" fill="#f472b6" />
      </g>
    </Frame>
  ),

  /* --- Espagne ------------------------------------------------------- */
  tile: () => (
    <Frame>
      <g transform="rotate(-7 32 32)">
        <path d="M11 11 H53 V53 H19 L11 45 Z" fill="#f8fafc" stroke="#94a3b8" />
        <path d="M11 11 H53 V53 H19 L11 45 Z" fill="none" stroke="#1d4ed8" strokeWidth="2.5" transform="translate(32 32) scale(.84) translate(-32 -32)" />
        <circle cx="32" cy="32" r="9" fill="none" stroke="#1d4ed8" strokeWidth="2" />
        {[0, 90, 180, 270].map((a) => (
          <path key={a} d="M32 23 q-4 -6 0 -9 q4 3 0 9" fill="#2563eb" transform={`rotate(${a} 32 32)`} />
        ))}
        <circle cx="32" cy="32" r="2.5" fill="#f59e0b" />
        {[[18, 18], [46, 18], [46, 46]].map(([x, y]) => <circle key={x + "" + y} cx={x} cy={y} r="2.2" fill="#1d4ed8" />)}
        <path d="M11 45 L19 53" stroke="#64748b" strokeWidth="1.2" />
      </g>
    </Frame>
  ),
  smallkey: () => (
    <Frame>
      <path d="M8 14 C16 6 26 12 22 20" stroke="#dc2626" strokeWidth="2" fill="none" />
      <circle cx="24" cy="24" r="7" fill="none" stroke="#b7791f" strokeWidth="3.5" />
      <circle cx="24" cy="24" r="7" fill="none" stroke="#f6d27a" strokeWidth="1" />
      <path d="M29 29 L48 48" stroke="#b7791f" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M42 42 l4 -4 M46 46 l3 -3" stroke="#b7791f" strokeWidth="3" strokeLinecap="round" />
    </Frame>
  ),
  guitarphoto: () => (
    <Frame>
      <g transform="rotate(-5 32 32)">
        <rect x="9" y="8" width="46" height="48" fill="#f8f4ea" stroke="#d6cdb8" />
        <rect x="13" y="12" width="38" height="34" fill="#b08968" opacity=".55" />
        <path d="M18 46 V34 H30 V46 M18 34 l2 -6 h8 l2 6" stroke="#6b4f35" strokeWidth="1.3" fill="none" />
        <g transform="rotate(18 38 32)">
          <path d="M38 14 V26" stroke="#3f2a1a" strokeWidth="2.4" />
          <rect x="36" y="11" width="4" height="4" rx="1" fill="#3f2a1a" />
          <path d="M38 25 c-6 0 -7 5 -4 8 c-4 3 -3 10 4 10 c7 0 8 -7 4 -10 c3 -3 2 -8 -4 -8 Z" fill="#c2833f" stroke="#7c4a1e" />
          <circle cx="38" cy="34" r="1.8" fill="#3f2a1a" />
        </g>
        <path d="M16 51 H40" stroke={INK} strokeOpacity=".4" strokeWidth=".9" />
      </g>
    </Frame>
  ),
  coaster: () => (
    <Frame>
      <circle cx="32" cy="32" r="23" fill="#f1e4c8" stroke="#c9b27a" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="19" fill="none" stroke="#b91c1c" strokeWidth="1.2" strokeDasharray="3 2" />
      <circle cx="37" cy="28" r="13" fill="none" stroke="#a16207" strokeOpacity=".25" strokeWidth="2" />
      {[26, 31, 36].map((y, i) => (
        <path key={y} d={`M${19 + i * 2} ${y} q7 -2 ${24 - i * 4} 0`} stroke="#1d4ed8" strokeOpacity=".75" strokeWidth="1.1" fill="none" />
      ))}
      <path d="M42 41 q2 -3 4 0" stroke="#1d4ed8" strokeOpacity=".75" fill="none" />
    </Frame>
  ),
  bag: () => (
    <Frame>
      <path d="M14 18 H50 L52 58 H12 Z" fill="#c9a26b" stroke="#9c7640" />
      <path d="M14 18 l3 -6 h30 l3 6" fill="#b88f58" stroke="#9c7640" />
      <path d="M17 12 l2 6 M24 12 l1 6 M31 12 v6 M38 12 l-1 6 M45 12 l-2 6" stroke="#9c7640" strokeWidth=".7" />
      <circle cx="46" cy="14" r="5" fill="#f97316" />
      <path d="M46 9 q2 -3 5 -2" stroke="#4d7c0f" strokeWidth="1.5" fill="none" />
      <path d="M19 32 q10 -2 26 0 M21 38 q8 -2 20 0" stroke="#1e3a8a" strokeWidth="1.3" fill="none" />
    </Frame>
  ),
  aveticket: () => (
    <Frame>
      <g transform="rotate(-8 32 32)">
        <path d="M6 20 H58 V30 a3 3 0 0 0 0 6 V46 H6 V36 a3 3 0 0 0 0 -6 Z" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="6" y="20" width="52" height="6" fill="#7c3aed" />
        <text x="12" y="25" fontSize="4.5" fontWeight="800" fill="#fff">AVE</text>
        <path d="M44 26 V46" stroke="#94a3b8" strokeDasharray="2 2" />
        <path d="M11 31 H38 M11 35.5 H32 M11 40 H28" stroke={INK} strokeOpacity=".55" strokeWidth="1.1" />
        <text x="51" y="38" textAnchor="middle" fontSize="6" fontWeight="700" fill="#b91c1c">08:00</text>
      </g>
    </Frame>
  ),
  cassette: () => (
    <Frame>
      <rect x="6" y="15" width="52" height="34" rx="3" fill="#292524" />
      <rect x="11" y="19" width="42" height="14" rx="1.5" fill="#fef3c7" />
      <path d="M14 24 q8 -2 16 0 M14 28 H26" stroke="#1d4ed8" strokeWidth="1" fill="none" />
      <rect x="20" y="35" width="24" height="9" rx="4.5" fill="#57534e" />
      {[26, 38].map((x) => (
        <g key={x}>
          <circle cx={x} cy="39.5" r="3.2" fill="#e7e5e4" />
          <circle cx={x} cy="39.5" r="1.2" fill="#292524" />
        </g>
      ))}
      <path d="M16 49 l3 -4 h26 l3 4" fill="#44403c" />
    </Frame>
  ),
  carnation: () => (
    <Frame>
      <rect x="10" y="8" width="44" height="50" rx="2" fill={PAPER} stroke={PAPER_D} />
      <path d="M32 52 C33 44 31 36 32 28" stroke="#6b7c3a" strokeWidth="1.5" fill="none" />
      <path d="M32 44 q7 -2 10 -8 q-8 1 -10 8" fill="#7d8f45" />
      {[-40, -20, 0, 20, 40].map((a) => (
        <path key={a} d="M32 28 l-4 -12 l2 2 l2 -3 l2 3 l2 -2 Z" fill="#b91c1c" opacity=".92" transform={`rotate(${a} 32 28)`} />
      ))}
      <path d="M28 28 q4 3 8 0 l-1 3 h-6 Z" fill="#6b7c3a" />
    </Frame>
  ),
  pick: () => (
    <Frame>
      <path d="M32 54 C20 44 12 32 14 20 C16 10 48 10 50 20 C52 32 44 44 32 54 Z" fill="#e0e7ef" stroke="#94a3b8" />
      <path d="M32 54 C20 44 12 32 14 20 C16 10 48 10 50 20 C52 32 44 44 32 54 Z" fill="url(#nacre)" opacity=".8" />
      <defs>
        <linearGradient id="nacre" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fdf2f8" /><stop offset=".5" stopColor="#bfdbfe" /><stop offset="1" stopColor="#fef9c3" />
        </linearGradient>
      </defs>
      <text x="32" y="32" textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748b" fontFamily="Georgia, serif">J.S.</text>
      <path d="M40 16 q6 3 7 10" stroke="#fff" strokeWidth="2" fill="none" opacity=".8" />
    </Frame>
  ),
  fan: () => (
    <Frame>
      <path d="M32 52 L6 30 A30 30 0 0 1 58 30 Z" fill="#fef3c7" stroke="#b45309" />
      {Array.from({ length: 9 }, (_, i) => -64 + i * 16).map((a) => (
        <path key={a} d="M32 52 V24" stroke="#b45309" strokeOpacity=".45" strokeWidth=".8" transform={`rotate(${a} 32 52)`} />
      ))}
      <circle cx="22" cy="30" r="4" fill="#15803d" /><circle cx="22" cy="30" r="1.3" fill="#f97316" />
      <circle cx="42" cy="28" r="4" fill="#15803d" /><circle cx="43" cy="27" r="1.3" fill="#f97316" />
      <path d="M28 34 h8 v6 h-8 Z" fill="#fff" stroke="#e5e7eb" />
      <path d="M32 52 L18 36" stroke="#78350f" strokeWidth="1.3" strokeDasharray="2 1.5" />
      <circle cx="32" cy="52" r="2.3" fill="#78350f" />
    </Frame>
  ),
  score: () => (
    <Frame>
      <rect x="10" y="7" width="44" height="52" fill="#fdfbf4" stroke="#d6cdb8" />
      {[17, 31, 45].map((y) => (
        <g key={y}>
          {[0, 2, 4, 6, 8].map((d) => <path key={d} d={`M14 ${y + d} H50`} stroke={INK} strokeOpacity=".35" strokeWidth=".6" />)}
        </g>
      ))}
      {[[18, 21], [24, 19], [30, 23], [36, 21], [20, 35], [27, 33], [34, 37]].map(([x, y]) => (
        <g key={x + "-" + y}>
          <ellipse cx={x} cy={y} rx="1.8" ry="1.3" fill={INK} opacity=".7" transform={`rotate(-20 ${x} ${y})`} />
          <path d={`M${x + 1.6} ${y} v-6`} stroke={INK} strokeOpacity=".7" strokeWidth=".7" />
        </g>
      ))}
      <path d="M40 35 l3 -1" stroke={INK} strokeOpacity=".4" />
    </Frame>
  ),
  postcard: () => (
    <Frame>
      <g transform="rotate(4 32 32)">
        <rect x="6" y="14" width="52" height="36" rx="1.5" fill="#fffbeb" stroke="#e7cf96" />
        <path d="M34 18 V46" stroke="#e7cf96" />
        <rect x="46" y="18" width="8" height="10" fill="none" stroke="#a8a29e" strokeDasharray="1.5 1.5" />
        <path d="M10 22 q8 -2 20 0 M10 27 q8 -1 18 0 M10 32 q7 -1 16 0 M10 38 q5 -1 10 0" stroke="#1d4ed8" strokeOpacity=".7" strokeWidth="1" fill="none" />
        <path d="M38 36 H54 M38 41 H52" stroke={INK} strokeOpacity=".4" strokeWidth=".9" />
      </g>
    </Frame>
  ),
};

export function SouvenirArt({ kind }) {
  const Draw = ART[kind] || ART.letter;
  return <Draw />;
}

/* --- Les petits papiers ---------------------------------------------- */

export function PaperSlip({ text, tilt = 0, blank = false, tier = "commun" }) {
  const ring = (TIERS[tier] || TIERS.commun).glow;
  return (
    <div className="relative w-full" style={{ transform: `rotate(${tilt}deg)` }}>
      <div className={`relative rounded-[3px] px-2 pt-3 pb-2 min-h-[58px] grid place-items-center text-center
        ${blank ? "border-2 border-dashed border-white/15" : "bg-[#fbf4e2] shadow-[1px_2px_4px_rgba(0,0,0,.25)]"}`}
        style={{ backgroundImage: blank ? undefined : "repeating-linear-gradient(0deg, rgba(120,80,30,.07) 0 1px, transparent 1px 9px)" }}>
        {/* le pli */}
        {!blank && <span className="absolute inset-x-0 top-1/2 h-px bg-black/10" />}
        {/* l'épingle */}
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow"
          style={{ background: blank ? "rgba(255,255,255,.18)" : ring }} />
        <span className={`relative text-[12px] leading-tight fb-serif ${blank ? "text-white/25 font-bold" : "text-stone-800 font-bold italic"}`}>
          {blank ? "?" : text}
        </span>
      </div>
    </div>
  );
}
