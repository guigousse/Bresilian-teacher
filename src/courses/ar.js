/* ==================================================================
   COURS D'ESPAGNOL D'ARGENTINE (rioplatense)
   Même forme que courses/pt.js : données, voix, textes, couleurs et
   mascotte. Premier pays d'Amérique latine : on tutoie avec « vos »,
   et Pampa, la conure de Patagonie, porte le béret du gaucho.
   ================================================================== */

import { UNITS, ALL_ITEMS, PH_OF, PRON_KEYS } from "../data/ar/units.js";
import { BOOKS, AR_BOOKS } from "../data/ar/stories.js";
import { CARDS, CARD_PRICE } from "../data/ar/cards.js";
import { PAPERS, SOUVENIRS, PAPER_ITEMS } from "../data/ar/souvenirs.js";
import { SONGS } from "../data/ar/songs.js";

export const AR = {
  id: "ar",
  label: "Español",
  native: "Español de Argentina",
  flag: "🇦🇷",
  country: "Argentina",
  langFr: "espagnol",
  langTheFr: "l'espagnol d'Argentine",
  langAdjFr: "espagnole",
  regionFr: "d'Argentine",
  tagline: "Buenos Aires, la Patagonie, un bandonéon oublié",
  saveKey: "fala_argentina_save_v1",
  themeColor: "#0284c7",

  speech: {
    lang: "es-AR", prefix: "es", region: "es-ar",
    /* Sans voix argentine, une voix d'Amérique latine s'en approche bien
       plus que celle d'Espagne (pas de « th », intonation plus proche). */
    near: ["es-419", "es-us", "es-mx", "es-uy", "es-cl", "es-co"],
    nice: ["diego", "elena", "tomás", "tomas", "google español de estados unidos", "paulina", "juan", "sabina", "dalia"],
    sample: "¡Buen día! ¿Me traés un cortado y dos medialunas, por favor?",
    test: "Hola, ¿cómo andás?",
    androidPack: "Español (Estados Unidos)",
    iosVoice: "Espagnol (Argentine) — voix Diego, ou à défaut Espagnol (Mexique)",
    guideTitle: "Lire l'espagnol d'Argentine",
  },

  units: UNITS, allItems: ALL_ITEMS, phOf: PH_OF, pronKeys: PRON_KEYS,
  articles: ["el", "la"],
  books: BOOKS, ...AR_BOOKS,
  cards: CARDS, cardPrice: CARD_PRICE,
  papers: PAPERS, souvenirs: SOUVENIRS, paperItems: PAPER_ITEMS,
  songs: SONGS,

  levelTitles: ["Recién llegado", "Turista", "Mochilero", "Viajero", "Matero", "Parrillero",
    "Porteño", "Milonguero", "Gaucho", "Patagónico", "Poeta", "Argentino de corazón"],

  t: {
    appName: "¡Dale, Argentina!",
    praise: ["¡Eso!", "¡Bárbaro!", "¡Muy bien!", "¡Genial!", "¡Qué capo!", "¡Joya!"],
    bravo: "¡Bárbaro!",
    hello: "¡Buen día! ¿Arrancamos con diez minutos ?",
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
    shopBlurb: "20 lieux d'Argentine à collectionner, chacun avec une phrase à glisser dans une conversation.",
    storyEnd: "« Stella : je t'ai attendue sur le quai… » — la suite s'écrit encore.",
    papersWhat: "expression argentine",
    storyHint: "L'histoire de Camille continue dans l'onglet Biblioteca.",
  },

  badges: {
    first: "Primera clase", three: "A buen ritmo", perfect: "Sin errores", lvl5: "Nivel 5", lvl10: "Nivel 10",
    solid30: "Buena memoria", streak7: "Una semana", streak30: "Un mes", crown5: "Primera corona",
    crownAll: "Capo del castellano", quest10: "Misiones", card1: "Primera postal", card10: "Coleccionista",
    cardAll: "Álbum completo", allLessons: "Argentino de corazón", book1: "Primer libro", allBooks: "Bibliotecario",
  },
  badgeEmoji: { allLessons: "🇦🇷" },

  theme: {
    avatar: "from-sky-400 to-amber-300",
    ink: "text-sky-900", inkSoft: "text-sky-700", inkMid: "text-sky-800",
    track: "bg-sky-100", bar: "from-sky-400 to-amber-400",
    hero: "from-sky-500 via-sky-600 to-indigo-600", heroSoft: "text-sky-50",
    tab: "text-sky-600", tabLine: "bg-sky-500",
    title: "text-sky-700", soft: "bg-sky-50", panel: "border-sky-200 bg-sky-50",
    menuCard: "from-sky-500 via-sky-600 to-indigo-600",
  },

  /* Pampa, la conure de Patagonie (loro barranquero) : dos olive, ventre
     jaune marqué de rouge, ailes bleues — en béret et foulard celeste. */
  mascot: {
    name: "Pampa",
    palette: {
      tail: ["#2f7fae", "#6b6a4a", "#facc15"], body: "#77734c", belly: "#facc15", patch: "#dc2626",
      wing: "#2f7fae", wingLine: "#1e5a80", head: "#6b6a4a", face: "#f5f1e6",
      crest: null, beak: "#e7e5e4", beakLow: "#a8a29e", feet: "#d6a88a",
    },
    hat: "boina",
  },
};
