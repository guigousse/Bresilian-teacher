import React from "react";

/* ==================================================================
   ZÉ, l'ara du Brésil. Une seule illustration vectorielle, déclinée en
   humeurs : elle accompagne l'élève, félicite, s'inquiète, dort quand
   l'objectif du jour est atteint.
   ================================================================== */

export function Mascot({ mood = "idle", size = 96, className = "" }) {
  const cheering = mood === "celebrate";
  const asleep = mood === "sleep";
  const sad = mood === "sad";

  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden="true">
      <g className={cheering ? "fb-cheer" : asleep ? "" : "fb-bob"}>
        {/* Queue : les trois couleurs du drapeau */}
        <g>
          <path d="M28 78 Q6 96 10 108 Q22 104 34 90 Z" fill="#0ea5e9" />
          <path d="M31 74 Q10 88 12 100 Q26 96 37 84 Z" fill="#facc15" />
          <path d="M34 70 Q16 80 17 92 Q30 88 40 78 Z" fill="#16a34a" />
        </g>

        {/* Corps */}
        <ellipse cx="62" cy="70" rx="30" ry="32" fill="#16a34a" />
        <ellipse cx="66" cy="76" rx="20" ry="23" fill="#facc15" opacity=".95" />

        {/* Aile : elle bat quand Zé félicite */}
        <g className={cheering ? "fb-flap" : ""}>
          <path d="M40 58 Q26 68 34 86 Q46 84 52 70 Z" fill="#15803d" />
          <path d="M40 62 Q31 70 36 81" stroke="#166534" strokeWidth="2" fill="none" />
        </g>

        {/* Tête */}
        <circle cx="66" cy="40" r="25" fill="#16a34a" />
        <ellipse cx="72" cy="44" rx="15" ry="14" fill="#fef9c3" />

        {/* Crête */}
        <path d="M58 17 Q60 4 68 10" stroke="#facc15" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M66 14 Q71 2 78 9" stroke="#0ea5e9" strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* Bec */}
        <path d="M84 40 Q98 44 86 56 Q80 52 80 44 Z" fill="#1f2937" />
        <path d={sad ? "M84 52 Q92 54 86 58" : "M84 50 Q93 52 87 57"} fill="#374151" />

        {/* Œil, selon l'humeur */}
        {asleep ? (
          <path d="M67 42 Q73 47 79 42" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ) : cheering || mood === "happy" ? (
          <path d="M67 44 Q73 36 79 44" stroke="#1f2937" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : (
          <>
            <circle cx="73" cy="41" r="7" fill="#fff" />
            <circle cx={sad ? 71 : mood === "think" ? 75 : 74} cy={sad ? 44 : mood === "think" ? 37 : 41} r="4" fill="#1f2937" />
            <circle cx={sad ? 72.5 : 75.5} cy={sad ? 42.5 : 39.5} r="1.4" fill="#fff" />
          </>
        )}
        {sad && <path d="M64 30 Q71 28 78 32" stroke="#1f2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />}

        {/* Pattes */}
        <path d="M56 100 L56 108 M50 108 h12" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M72 100 L72 108 M66 108 h12" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>

      {cheering && (
        <g>
          <circle cx="20" cy="26" r="3" fill="#facc15" className="fb-pulse" />
          <circle cx="102" cy="20" r="3.5" fill="#0ea5e9" className="fb-pulse" />
          <circle cx="104" cy="70" r="2.5" fill="#f472b6" className="fb-pulse" />
        </g>
      )}
      {asleep && (
        <g fill="#94a3b8" className="fb-float">
          <text x="92" y="24" fontSize="13" fontWeight="700">z</text>
          <text x="102" y="14" fontSize="10" fontWeight="700">z</text>
        </g>
      )}
    </svg>
  );
}

/* Zé qui parle : une bulle au-dessus de la tête. */
export function MascotSays({ mood = "idle", text, size = 84 }) {
  return (
    <div className="flex items-end gap-2">
      <Mascot mood={mood} size={size} />
      {text && (
        <div className="relative flex-1 rounded-2xl rounded-bl-sm bg-white border-2 border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 fb-slide-in">
          {text}
        </div>
      )}
    </div>
  );
}
