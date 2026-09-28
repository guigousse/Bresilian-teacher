/* ==================================================================
   COURS DE PORTUGAIS DU BRÉSIL
   Tout ce qui change d'une langue à l'autre est rassemblé ici : les
   données, la voix, les textes de l'interface, les couleurs, la
   mascotte. Le reste de l'app lit le cours actif (courses/index.js).

   Nom historique : dans les items, « pt » désigne le texte dans la
   langue apprise, quelle qu'elle soit.
   ================================================================== */

import { UNITS, ALL_ITEMS, PH_OF, PRON_KEYS } from "../data/units.js";
import { BOOKS, PT_BOOKS } from "../data/stories.js";
import { CARDS, CARD_PRICE } from "../data/cards.js";
import { PAPERS, SOUVENIRS, PAPER_ITEMS } from "../data/souvenirs.js";

export const PT = {
  id: "pt",
  label: "Português",
  native: "Português do Brasil",
  flag: "🇧🇷",
  country: "Brasil",
  langFr: "portugais",
  langTheFr: "le portugais",
  langAdjFr: "portugaise",
  regionFr: "du Brésil",
  tagline: "Rio, Salvador, un carnet oublié",
  saveKey: "fala_brasil_save_v2",
  themeColor: "#059669",

  speech: {
    lang: "pt-BR", prefix: "pt", region: "pt-br",
    nice: ["luciana", "google português", "google portugues", "francisca", "brenda", "camila", "fernanda",
      "joana", "raquel", "maria", "ricardo", "felipe", "daniel", "antônio", "antonio"],
    sample: "Bom dia! Eu queria um café, por favor.",
    test: "Bom dia, tudo bem?",
    androidPack: "Português (Brasil)",
    iosVoice: "Portugais (Brésil)",
    guideTitle: "Lire le portugais brésilien",
  },

  units: UNITS, allItems: ALL_ITEMS, phOf: PH_OF, pronKeys: PRON_KEYS,
  articles: ["o", "a"],
  books: BOOKS, ...PT_BOOKS,
  cards: CARDS, cardPrice: CARD_PRICE,
  papers: PAPERS, souvenirs: SOUVENIRS, paperItems: PAPER_ITEMS,

  levelTitles: ["Iniciante", "Turista", "Viajante", "Mochileiro", "Praieiro", "Sambista",
    "Carioca", "Baiano", "Sertanejo", "Malandro", "Poeta", "Brasileiro de coração"],

  t: {
    appName: "Fala, Brasil!",
    praise: ["Isso aí !", "Perfeito !", "Muito bem !", "Boa !", "Mandou bem !", "Show !"],
    bravo: "Muito bem!",
    hello: "Bom dia ! On commence par dix minutes ?",
    missions: "Missões do dia",
    library: "Biblioteca",
    shop: "Loja",
    memories: "Caixa de lembranças",
    souvenirs: "Lembranças",
    papers: "Papeizinhos",
    book: "Livro",
    page: "Página",
    next: "A seguir",
    bookDone: "Livro terminado !",
    shopBlurb: "20 lieux du Brésil à collectionner, chacun avec une phrase à glisser dans une conversation.",
    storyEnd: "« Je ne suis pas partie seule. Cherche à Manaus. » — la suite s'écrit encore.",
    papersWhat: "expression brésilienne",
    storyHint: "L'histoire de Léa continue dans l'onglet Biblioteca.",
  },

  badges: {
    first: "Primeira aula", three: "Em ritmo", perfect: "Sem erro", lvl5: "Nível 5", lvl10: "Nível 10",
    solid30: "Memória boa", streak7: "Uma semana", streak30: "Um mês", crown5: "Primeira coroa",
    crownAll: "Rei do português", quest10: "Missões", card1: "Primeiro cartão", card10: "Colecionador",
    cardAll: "Álbum completo", allLessons: "Brasileiro", book1: "Primeiro livro", allBooks: "Bibliotecário",
  },
  badgeEmoji: { allLessons: "🇧🇷" },

  theme: {
    avatar: "from-emerald-400 to-yellow-400",
    ink: "text-emerald-900", inkSoft: "text-emerald-700", inkMid: "text-emerald-800",
    track: "bg-emerald-100", bar: "from-emerald-400 to-yellow-400",
    hero: "from-emerald-500 via-emerald-600 to-teal-700", heroSoft: "text-emerald-50",
    tab: "text-emerald-600", tabLine: "bg-emerald-500",
    title: "text-emerald-700", soft: "bg-emerald-50", panel: "border-emerald-200 bg-emerald-50",
    menuCard: "from-emerald-500 via-emerald-600 to-teal-700",
  },

  /* Zé, l'ara aux couleurs du drapeau brésilien */
  mascot: {
    name: "Zé",
    palette: {
      tail: ["#0ea5e9", "#facc15", "#16a34a"], body: "#16a34a", belly: "#facc15",
      wing: "#15803d", wingLine: "#166534", head: "#16a34a", face: "#fef9c3",
      crest: ["#facc15", "#0ea5e9"], beak: "#1f2937", beakLow: "#374151", feet: "#f59e0b",
    },
    hat: null,
  },
};
