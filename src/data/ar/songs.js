/* ==================================================================
   CHANSONS — pour la section Música.
   Les paroles ne sont pas dans l'app : elles arrivent de LRCLIB
   (paroles synchronisées, base libre) au moment de l'écoute, et la
   traduction se fait ligne par ligne à la volée (lib/lyrics.js).
   Ici on ne range que la fiche de la chanson et quelques mots à
   repérer en l'écoutant.

   ph : même code que les leçons — MAJUSCULES = syllabe accentuée,
   ch = ll et y à l'argentine, kh = jota, rr = r roulé.
   ================================================================== */

export const SONGS = [
  {
    id: "gracias-a-la-vida",
    title: "Gracias a la vida",
    artist: "Mercedes Sosa",
    /* Ce qu'on demande à LRCLIB, et ce qu'on tape dans YouTube. */
    lrclib: { track: "Gracias a la vida", artist: "Mercedes Sosa" },
    search: "Mercedes Sosa Gracias a la vida",
    year: 1971,
    emoji: "🌻",
    color: "from-amber-400 via-orange-500 to-rose-600",
    about:
      "Écrite en 1966 par la Chilienne Violeta Parra, peu avant sa mort. Mercedes Sosa, « La Negra », " +
      "la chante en 1971 et en fait un hymne de toute l'Amérique latine. Chaque couplet remercie la vie " +
      "pour un don : les yeux, l'ouïe, les mots, la marche, le cœur, le rire et les larmes.",
    tip:
      "Elle chante « me ha dado » (passé composé), comme au Chili. À Buenos Aires on dirait plutôt « me dio ». " +
      "Le refrain revient à chaque couplet : idéal pour le retenir.",
    words: [
      { pt: "me ha dado tanto", fr: "elle m'a tant donné", ph: "mé a DA-do TAN-to" },
      { pt: "los luceros", fr: "les étoiles brillantes", ph: "los lou-SÉ-ros" },
      { pt: "el oído", fr: "l'ouïe", ph: "él o-I-do" },
      { pt: "los grillos", fr: "les grillons", ph: "los GRI-chos" },
      { pt: "el abecedario", fr: "l'alphabet", ph: "él a-bé-sé-DA-rio" },
      { pt: "la marcha", fr: "la marche", ph: "la MAR-tcha" },
      { pt: "los pies cansados", fr: "les pieds fatigués", ph: "los PIÈS kan-SA-dos" },
      { pt: "los charcos", fr: "les flaques", ph: "los TCHAR-kos" },
      { pt: "el llano", fr: "la plaine", ph: "él CHA-no" },
      { pt: "el corazón", fr: "le cœur", ph: "él ko-ra-SON" },
      { pt: "la risa", fr: "le rire", ph: "la RRI-sa" },
      { pt: "el llanto", fr: "les pleurs", ph: "él CHAN-to" },
      { pt: "el quebranto", fr: "le chagrin", ph: "él ké-BRAN-to" },
    ],
  },
];
