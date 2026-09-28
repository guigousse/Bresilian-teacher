/* ==================================================================
   COURS D'ESPAGNOL D'ESPAGNE
   Même forme que courses/pt.js : données, voix, textes, couleurs et
   mascotte. Paco est un ara rouge, chapeau cordouan sur la tête.
   ================================================================== */

import { UNITS, ALL_ITEMS, PH_OF, PRON_KEYS } from "../data/es/units.js";
import { BOOKS, ES_BOOKS } from "../data/es/stories.js";
import { CARDS, CARD_PRICE } from "../data/es/cards.js";
import { PAPERS, SOUVENIRS, PAPER_ITEMS } from "../data/es/souvenirs.js";

export const ES = {
  id: "es",
  label: "Español",
  native: "Español de España",
  flag: "🇪🇸",
  country: "España",
  langFr: "espagnol",
  langTheFr: "l'espagnol",
  langAdjFr: "espagnole",
  regionFr: "d'Espagne",
  tagline: "Madrid, Séville, une guitare oubliée",
  saveKey: "fala_espana_save_v1",
  themeColor: "#dc2626",

  speech: {
    lang: "es-ES", prefix: "es", region: "es-es",
    nice: ["mónica", "monica", "jorge", "google español", "google espanol", "lucía", "lucia", "elvira",
      "álvaro", "alvaro", "helena", "laura", "pablo", "marisol", "sergio"],
    sample: "¡Buenos días! Quería un café con leche, por favor.",
    test: "Hola, ¿qué tal?",
    androidPack: "Español (España)",
    iosVoice: "Espagnol (Espagne)",
    guideTitle: "Lire l'espagnol d'Espagne",
  },

  units: UNITS, allItems: ALL_ITEMS, phOf: PH_OF, pronKeys: PRON_KEYS,
  articles: ["el", "la"],
  books: BOOKS, ...ES_BOOKS,
  cards: CARDS, cardPrice: CARD_PRICE,
  papers: PAPERS, souvenirs: SOUVENIRS, paperItems: PAPER_ITEMS,

  levelTitles: ["Principiante", "Turista", "Viajero", "Mochilero", "Tapeador", "Paseante",
    "Madrileño", "Andaluz", "Flamenco", "Castizo", "Poeta", "Español de corazón"],

  t: {
    appName: "¡Habla, España!",
    praise: ["¡Eso es!", "¡Perfecto!", "¡Muy bien!", "¡Genial!", "¡Olé!", "¡Bien hecho!"],
    bravo: "¡Muy bien!",
    hello: "¡Buenos días! On commence par dix minutes ?",
    missions: "Misiones del día",
    library: "Biblioteca",
    shop: "Tienda",
    memories: "Caja de recuerdos",
    souvenirs: "Recuerdos",
    papers: "Papelitos",
    book: "Libro",
    page: "Página",
    next: "Continuará",
    bookDone: "¡Libro terminado!",
    shopBlurb: "20 lieux d'Espagne à collectionner, chacun avec une phrase à glisser dans une conversation.",
    storyEnd: "« Nieves, ma fille… » — la suite s'écrit encore.",
    papersWhat: "expression espagnole",
    storyHint: "L'histoire de Nina continue dans l'onglet Biblioteca.",
  },

  badges: {
    first: "Primera clase", three: "A buen ritmo", perfect: "Sin fallos", lvl5: "Nivel 5", lvl10: "Nivel 10",
    solid30: "Buena memoria", streak7: "Una semana", streak30: "Un mes", crown5: "Primera corona",
    crownAll: "Rey del español", quest10: "Misiones", card1: "Primera postal", card10: "Coleccionista",
    cardAll: "Álbum completo", allLessons: "Español de corazón", book1: "Primer libro", allBooks: "Bibliotecario",
  },
  badgeEmoji: { allLessons: "🇪🇸" },

  theme: {
    avatar: "from-red-500 to-amber-400",
    ink: "text-red-900", inkSoft: "text-red-700", inkMid: "text-red-800",
    track: "bg-red-100", bar: "from-red-500 to-amber-400",
    hero: "from-red-600 via-rose-600 to-amber-600", heroSoft: "text-amber-50",
    tab: "text-red-600", tabLine: "bg-red-500",
    title: "text-red-700", soft: "bg-red-50", panel: "border-red-200 bg-amber-50",
    menuCard: "from-red-600 via-rose-600 to-amber-500",
  },

  /* Paco, l'ara rouge, sous son chapeau cordouan */
  mascot: {
    name: "Paco",
    palette: {
      tail: ["#2563eb", "#facc15", "#dc2626"], body: "#dc2626", belly: "#fbbf24",
      wing: "#2563eb", wingLine: "#facc15", head: "#dc2626", face: "#fff7ed",
      crest: null, beak: "#e7e5e4", beakLow: "#1c1917", feet: "#78716c",
    },
    hat: "cordobes",
  },
};
