import React, { useState, useEffect, useCallback } from "react";
import {
  Flame, Star, Heart, Volume2, Check, X, ArrowLeft, Lock, Sparkles, RotateCcw,
  Gem, Zap, BookOpen, Award, ChevronRight, Settings, Eye, EyeOff, Trophy,
  ShoppingBag, Map, User, AlertTriangle, Copy, Package
} from "lucide-react";

/* ================================================================== */
/*  CONTENU — portugais du Brésil + phonétique « à la française »      */
/* ================================================================== */

const UNITS = [
  {
    id: "u1", title: "Oi, tudo bem?", subtitle: "Se saluer", emoji: "👋",
    color: "from-emerald-400 to-emerald-600",
    items: [
      { pt: "oi", fr: "salut", ph: "oï" },
      { pt: "olá", fr: "bonjour", ph: "o-LA" },
      { pt: "bom dia", fr: "bonjour (le matin)", ph: "bon DJI-a" },
      { pt: "boa tarde", fr: "bon après-midi", ph: "BO-a TAR-dji" },
      { pt: "boa noite", fr: "bonsoir", ph: "BO-a NOÏ-tchi" },
      { pt: "tchau", fr: "au revoir", ph: "tchaou" },
      { pt: "até logo", fr: "à bientôt", ph: "a-TÉ LO-gou" },
      { pt: "tudo bem?", fr: "ça va ?", ph: "TOU-dou BÈN" },
      { pt: "tudo bem", fr: "ça va bien", ph: "TOU-dou BÈN" },
      { pt: "e você?", fr: "et toi ?", ph: "i vo-SÉ" },
      { pt: "prazer", fr: "enchanté", ph: "pra-ZÈR" },
      { pt: "como você se chama?", fr: "comment tu t'appelles ?", ph: "KO-mou vo-SÉ si CHA-ma" },
      { pt: "eu sou francês", fr: "je suis français", ph: "É-ou SÔ fran-SÊS" },
    ],
  },
  {
    id: "u2", title: "Por favor", subtitle: "Être poli", emoji: "🙏",
    color: "from-sky-400 to-blue-600",
    items: [
      { pt: "por favor", fr: "s'il vous plaît", ph: "pour fa-VOR" },
      { pt: "obrigado", fr: "merci (dit par un homme)", ph: "o-bri-GA-dou" },
      { pt: "obrigada", fr: "merci (dit par une femme)", ph: "o-bri-GA-da" },
      { pt: "de nada", fr: "de rien", ph: "dji NA-da" },
      { pt: "com licença", fr: "excusez-moi (pour passer)", ph: "kon li-SEN-sa" },
      { pt: "desculpa", fr: "pardon", ph: "dis-KOUL-pa" },
      { pt: "sim", fr: "oui", ph: "sin" },
      { pt: "não", fr: "non", ph: "NA-on" },
      { pt: "eu não entendo", fr: "je ne comprends pas", ph: "É-ou NA-on en-TEN-dou" },
      { pt: "você fala francês?", fr: "vous parlez français ?", ph: "vo-SÉ FA-la fran-SÊS" },
      { pt: "eu não falo português", fr: "je ne parle pas portugais", ph: "É-ou NA-on FA-lou por-tou-GÊS" },
      { pt: "fala mais devagar", fr: "parlez plus lentement", ph: "FA-la MA-ÏS dji-va-GAR" },
    ],
  },
  {
    id: "u3", title: "Um, dois, três", subtitle: "Les nombres", emoji: "🔢",
    color: "from-amber-400 to-orange-500",
    items: [
      { pt: "um", fr: "un", ph: "oun" },
      { pt: "dois", fr: "deux", ph: "DOÏSS" },
      { pt: "três", fr: "trois", ph: "TRÉSS" },
      { pt: "quatro", fr: "quatre", ph: "KWA-trou" },
      { pt: "cinco", fr: "cinq", ph: "SIN-kou" },
      { pt: "seis", fr: "six", ph: "SÉÏSS" },
      { pt: "sete", fr: "sept", ph: "SÉ-tchi" },
      { pt: "oito", fr: "huit", ph: "OÏ-tou" },
      { pt: "nove", fr: "neuf", ph: "NO-vi" },
      { pt: "dez", fr: "dix", ph: "DÈSS" },
      { pt: "vinte", fr: "vingt", ph: "VIN-tchi" },
      { pt: "cem", fr: "cent", ph: "SÈN" },
      { pt: "quanto custa?", fr: "combien ça coûte ?", ph: "KWAN-tou KOUS-ta" },
      { pt: "dois, por favor", fr: "deux, s'il vous plaît", ph: "DOÏSS pour fa-VOR" },
    ],
  },
  {
    id: "u4", title: "No restaurante", subtitle: "Manger et boire", emoji: "🍽️",
    color: "from-rose-400 to-pink-600",
    items: [
      { pt: "a água", fr: "l'eau", ph: "a A-goua" },
      { pt: "a cerveja", fr: "la bière", ph: "a sèr-VÉ-ja" },
      { pt: "o café", fr: "le café", ph: "ou ka-FÉ" },
      { pt: "o suco", fr: "le jus de fruit", ph: "ou SOU-kou" },
      { pt: "o arroz", fr: "le riz", ph: "ou a-HOSS" },
      { pt: "o feijão", fr: "les haricots", ph: "ou féi-JA-on" },
      { pt: "a carne", fr: "la viande", ph: "a KAR-ni" },
      { pt: "o frango", fr: "le poulet", ph: "ou FRAN-gou" },
      { pt: "o peixe", fr: "le poisson", ph: "ou PÉÏ-chi" },
      { pt: "o pão", fr: "le pain", ph: "ou PA-on" },
      { pt: "eu queria um café", fr: "je voudrais un café", ph: "É-ou ké-RI-a oun ka-FÉ" },
      { pt: "a conta, por favor", fr: "l'addition, s'il vous plaît", ph: "a KON-ta pour fa-VOR" },
      { pt: "está delicioso", fr: "c'est délicieux", ph: "is-TA dé-li-si-O-zou" },
      { pt: "sem açúcar", fr: "sans sucre", ph: "SÈN a-SOU-kar" },
      { pt: "eu sou vegetariano", fr: "je suis végétarien", ph: "É-ou SÔ vé-jé-ta-ri-A-nou" },
    ],
  },
  {
    id: "u5", title: "Na rua", subtitle: "S'orienter", emoji: "🧭",
    color: "from-violet-400 to-purple-600",
    items: [
      { pt: "onde fica o banheiro?", fr: "où sont les toilettes ?", ph: "ON-dji FI-ka ou ba-NHÉÏ-rou" },
      { pt: "à direita", fr: "à droite", ph: "a dji-RÉÏ-ta" },
      { pt: "à esquerda", fr: "à gauche", ph: "a is-KÈR-da" },
      { pt: "em frente", fr: "tout droit", ph: "èn FREN-tchi" },
      { pt: "perto", fr: "près", ph: "PÈR-tou" },
      { pt: "longe", fr: "loin", ph: "LON-ji" },
      { pt: "a rua", fr: "la rue", ph: "a HOU-a" },
      { pt: "a praia", fr: "la plage", ph: "a PRA-ïa" },
      { pt: "o mercado", fr: "le marché", ph: "ou mèr-KA-dou" },
      { pt: "a farmácia", fr: "la pharmacie", ph: "a far-MA-si-a" },
      { pt: "estou perdido", fr: "je suis perdu", ph: "is-TÔ pèr-DJI-dou" },
      { pt: "onde fica a praia?", fr: "où est la plage ?", ph: "ON-dji FI-ka a PRA-ïa" },
    ],
  },
  {
    id: "u6", title: "Vamos!", subtitle: "Se déplacer", emoji: "🚌",
    color: "from-cyan-400 to-teal-600",
    items: [
      { pt: "o ônibus", fr: "le bus", ph: "ou O-ni-bouss" },
      { pt: "o táxi", fr: "le taxi", ph: "ou TAK-si" },
      { pt: "o metrô", fr: "le métro", ph: "ou mé-TRÔ" },
      { pt: "o aeroporto", fr: "l'aéroport", ph: "ou a-é-ro-POR-tou" },
      { pt: "a rodoviária", fr: "la gare routière", ph: "a ho-do-vi-A-ria" },
      { pt: "a passagem", fr: "le billet", ph: "a pa-SA-jèn" },
      { pt: "quanto tempo?", fr: "combien de temps ?", ph: "KWAN-tou TEN-pou" },
      { pt: "eu vou para o centro", fr: "je vais au centre-ville", ph: "É-ou VÔ PA-ra ou SEN-trou" },
      { pt: "pode me levar?", fr: "pouvez-vous m'emmener ?", ph: "PO-dji mi lé-VAR" },
      { pt: "para aqui, por favor", fr: "arrêtez ici, s'il vous plaît", ph: "PA-ra a-KI pour fa-VOR" },
    ],
  },
  {
    id: "u7", title: "Na pousada", subtitle: "Dormir quelque part", emoji: "🛏️",
    color: "from-indigo-400 to-indigo-600",
    items: [
      { pt: "a pousada", fr: "l'auberge", ph: "a po-ZA-da" },
      { pt: "o quarto", fr: "la chambre", ph: "ou KWAR-tou" },
      { pt: "a chave", fr: "la clé", ph: "a CHA-vi" },
      { pt: "a toalha", fr: "la serviette", ph: "a to-A-lya" },
      { pt: "o chuveiro", fr: "la douche", ph: "ou chou-VÉÏ-rou" },
      { pt: "tem wi-fi?", fr: "il y a du wifi ?", ph: "TÈN ouaï-FAÏ" },
      { pt: "a reserva", fr: "la réservation", ph: "a hé-ZÈR-va" },
      { pt: "duas noites", fr: "deux nuits", ph: "DOU-as NOÏ-tchiss" },
      { pt: "o café da manhã", fr: "le petit-déjeuner", ph: "ou ka-FÉ da ma-NHAN" },
    ],
  },
  {
    id: "u8", title: "Quanto custa?", subtitle: "Acheter et payer", emoji: "💸",
    color: "from-lime-400 to-green-600",
    items: [
      { pt: "o dinheiro", fr: "l'argent", ph: "ou dji-NHÉÏ-rou" },
      { pt: "o cartão", fr: "la carte bancaire", ph: "ou kar-TA-on" },
      { pt: "o troco", fr: "la monnaie", ph: "ou TRO-kou" },
      { pt: "barato", fr: "bon marché", ph: "ba-RA-tou" },
      { pt: "caro", fr: "cher", ph: "KA-rou" },
      { pt: "muito caro!", fr: "trop cher !", ph: "MOUÏN-tou KA-rou" },
      { pt: "tem desconto?", fr: "il y a une réduction ?", ph: "TÈN dis-KON-tou" },
      { pt: "aceita cartão?", fr: "vous acceptez la carte ?", ph: "a-SÉÏ-ta kar-TA-on" },
      { pt: "eu vou levar", fr: "je le prends", ph: "É-ou VÔ lé-VAR" },
      { pt: "só estou olhando", fr: "je regarde seulement", ph: "SO is-TÔ o-LYAN-dou" },
    ],
  },
  {
    id: "u9", title: "Socorro!", subtitle: "En cas de pépin", emoji: "🆘",
    color: "from-red-400 to-red-600",
    items: [
      { pt: "socorro!", fr: "au secours !", ph: "so-KO-hou" },
      { pt: "cuidado!", fr: "attention !", ph: "kouï-DA-dou" },
      { pt: "a polícia", fr: "la police", ph: "a po-LI-si-a" },
      { pt: "o hospital", fr: "l'hôpital", ph: "ou os-pi-TAOU" },
      { pt: "estou doente", fr: "je suis malade", ph: "is-TÔ do-EN-tchi" },
      { pt: "me ajuda, por favor", fr: "aidez-moi, s'il vous plaît", ph: "mi a-JOU-da pour fa-VOR" },
      { pt: "chame um médico", fr: "appelez un médecin", ph: "CHA-mi oun MÉ-dji-kou" },
      { pt: "perdi meu passaporte", fr: "j'ai perdu mon passeport", ph: "pèr-DJI MÉ-ou pa-sa-POR-tchi" },
      { pt: "não estou bem", fr: "je ne vais pas bien", ph: "NA-on is-TÔ BÈN" },
    ],
  },
  {
    id: "u10", title: "Que legal!", subtitle: "Faire la conversation", emoji: "🎉",
    color: "from-fuchsia-400 to-purple-600",
    items: [
      { pt: "eu gosto", fr: "j'aime", ph: "É-ou GOS-tou" },
      { pt: "eu não gosto", fr: "je n'aime pas", ph: "É-ou NA-on GOS-tou" },
      { pt: "muito bom", fr: "très bon", ph: "MOUÏN-tou BON" },
      { pt: "que legal!", fr: "trop bien !", ph: "ki lé-GAOU" },
      { pt: "beleza", fr: "nickel", ph: "bé-LÉ-za" },
      { pt: "a praia é linda", fr: "la plage est belle", ph: "a PRA-ïa É LIN-da" },
      { pt: "hoje", fr: "aujourd'hui", ph: "O-ji" },
      { pt: "amanhã", fr: "demain", ph: "a-ma-NHAN" },
      { pt: "ontem", fr: "hier", ph: "ON-tèn" },
      { pt: "agora", fr: "maintenant", ph: "a-GO-ra" },
      { pt: "você é muito gentil", fr: "tu es très gentil", ph: "vo-SÉ É MOUÏN-tou jen-TCHIOU" },
      { pt: "eu amo o Brasil", fr: "j'adore le Brésil", ph: "É-ou A-mou ou bra-ZIOU" },
    ],
  },
];

const ALL_ITEMS = UNITS.flatMap((u) => u.items);
const PH_OF = Object.fromEntries(ALL_ITEMS.map((i) => [i.pt, i.ph]));

const PRON_KEYS = [
  { k: "r / rr", v: "un h soufflé : rua → HOU-a" },
  { k: "de / di", v: "« dji » : bom dia → bon DJI-a" },
  { k: "te / ti", v: "« tchi » : noite → NOÏ-tchi" },
  { k: "o final", v: "se dit « ou » : obrigado → o-bri-GA-dou" },
  { k: "ão", v: "« a-on » très nasal : pão → PA-on" },
  { k: "nh / lh", v: "gn / ill : banheiro, toalha" },
  { k: "MAJUSCULES", v: "la syllabe accentuée, celle qu'on appuie" },
];

/* ================================================================== */
/*  CARTES POSTALES — 20 à collectionner                               */
/* ================================================================== */

const RARITY = {
  comum: { label: "Commune", weight: 62, ring: "border-slate-200", chip: "bg-slate-100 text-slate-600" },
  rara: { label: "Rare", weight: 30, ring: "border-sky-300", chip: "bg-sky-100 text-sky-700" },
  lendaria: { label: "Légendaire", weight: 8, ring: "border-amber-400", chip: "bg-amber-100 text-amber-700" },
};

const CARDS = [
  { id: "c1", name: "Cristo Redentor", place: "Rio de Janeiro", emoji: "🙌", r: "comum", grad: "from-sky-400 to-blue-600", pt: "Que vista linda!", fr: "Quelle belle vue !", note: "38 m de haut, les bras ouverts sur la baie depuis 1931." },
  { id: "c2", name: "Pão de Açúcar", place: "Rio de Janeiro", emoji: "🚡", r: "comum", grad: "from-amber-400 to-orange-600", pt: "Vamos de bondinho", fr: "On y va en téléphérique", note: "Le téléphérique grimpe en deux tronçons, le second au coucher du soleil." },
  { id: "c3", name: "Copacabana", place: "Rio de Janeiro", emoji: "🏖️", r: "comum", grad: "from-cyan-400 to-teal-500", pt: "Uma água de coco", fr: "Une eau de coco", note: "4 km de plage et un trottoir en vagues noires et blanches." },
  { id: "c4", name: "Cataratas do Iguaçu", place: "Paraná", emoji: "💦", r: "rara", grad: "from-emerald-400 to-green-700", pt: "Que barulho!", fr: "Quel vacarme !", note: "275 chutes ; le côté brésilien offre la vue d'ensemble." },
  { id: "c5", name: "Amazônia", place: "Manaus", emoji: "🌳", r: "rara", grad: "from-green-500 to-emerald-800", pt: "A floresta é imensa", fr: "La forêt est immense", note: "Un tiers des arbres tropicaux de la planète." },
  { id: "c6", name: "Encontro das Águas", place: "Manaus", emoji: "🌊", r: "rara", grad: "from-amber-700 to-slate-800", pt: "Dois rios, uma cor", fr: "Deux fleuves, deux couleurs", note: "Le Rio Negro et le Solimões coulent côte à côte sur 6 km sans se mélanger." },
  { id: "c7", name: "Pelourinho", place: "Salvador", emoji: "🥁", r: "comum", grad: "from-yellow-400 to-rose-500", pt: "Ouve o tambor", fr: "Écoute le tambour", note: "Le centre colonial de Salvador, pavé et repeint de toutes les couleurs." },
  { id: "c8", name: "Chapada Diamantina", place: "Bahia", emoji: "⛰️", r: "rara", grad: "from-orange-400 to-red-700", pt: "Vamos caminhar", fr: "Allons marcher", note: "Cascades, grottes et plateaux ; on y cherchait des diamants." },
  { id: "c9", name: "Lençóis Maranhenses", place: "Maranhão", emoji: "🏜️", r: "lendaria", grad: "from-sky-300 to-amber-300", pt: "Areia e lagoas", fr: "Du sable et des lagunes", note: "Des dunes qui se remplissent d'eau de pluie turquoise entre juin et septembre." },
  { id: "c10", name: "Fernando de Noronha", place: "Pernambuco", emoji: "🐬", r: "lendaria", grad: "from-teal-300 to-blue-600", pt: "Olha os golfinhos!", fr: "Regarde les dauphins !", note: "21 îles, un quota strict de visiteurs, une eau transparente." },
  { id: "c11", name: "Ouro Preto", place: "Minas Gerais", emoji: "⛪", r: "comum", grad: "from-amber-500 to-yellow-700", pt: "Ruas de pedra", fr: "Des rues pavées", note: "Ville baroque bâtie sur l'or du XVIIIe siècle." },
  { id: "c12", name: "Brasília", place: "Distrito Federal", emoji: "🏛️", r: "comum", grad: "from-slate-400 to-slate-700", pt: "Tudo é curvo", fr: "Tout est courbe", note: "Dessinée par Niemeyer et Costa, sortie de terre en 41 mois." },
  { id: "c13", name: "Avenida Paulista", place: "São Paulo", emoji: "🏙️", r: "comum", grad: "from-zinc-500 to-zinc-800", pt: "A cidade não para", fr: "La ville ne s'arrête jamais", note: "2,8 km d'avenue, fermée aux voitures le dimanche." },
  { id: "c14", name: "Pantanal", place: "Mato Grosso", emoji: "🐆", r: "rara", grad: "from-lime-500 to-emerald-700", pt: "Vi uma onça!", fr: "J'ai vu un jaguar !", note: "La plus grande zone humide du monde, meilleure que l'Amazonie pour voir des animaux." },
  { id: "c15", name: "Jericoacoara", place: "Ceará", emoji: "🪁", r: "rara", grad: "from-orange-300 to-rose-500", pt: "O vento é bom", fr: "Le vent est bon", note: "Village de sable sans routes goudronnées, paradis du kitesurf." },
  { id: "c16", name: "Olinda", place: "Pernambuco", emoji: "🎭", r: "comum", grad: "from-fuchsia-400 to-purple-600", pt: "O carnaval é na rua", fr: "Le carnaval est dans la rue", note: "Des géants en papier mâché défilent dans les ruelles en pente." },
  { id: "c17", name: "Paraty", place: "Rio de Janeiro", emoji: "⛵", r: "comum", grad: "from-blue-300 to-indigo-500", pt: "A maré subiu", fr: "La marée est montée", note: "Le centre historique est inondé par les grandes marées, exprès." },
  { id: "c18", name: "Bonito", place: "Mato Grosso do Sul", emoji: "🐠", r: "rara", grad: "from-cyan-300 to-emerald-500", pt: "A água é cristalina", fr: "L'eau est cristalline", note: "On flotte au fil de rivières limpides au milieu des poissons." },
  { id: "c19", name: "Porto de Galinhas", place: "Pernambuco", emoji: "🐟", r: "comum", grad: "from-teal-300 to-cyan-600", pt: "Piscinas naturais", fr: "Des piscines naturelles", note: "À marée basse, les récifs forment des bassins tièdes." },
  { id: "c20", name: "Gramado", place: "Rio Grande do Sul", emoji: "🍫", r: "lendaria", grad: "from-rose-300 to-emerald-600", pt: "Faz frio aqui", fr: "Il fait froid ici", note: "Chalets, chocolatiers et hiver austral : le Brésil auquel personne ne pense." },
];

const CARD_PRICE = 100;

/* ================================================================== */
/*  NIVEAUX                                                            */
/* ================================================================== */

const LEVEL_TITLES = ["Iniciante", "Turista", "Viajante", "Mochileiro", "Praieiro", "Sambista",
  "Carioca", "Baiano", "Sertanejo", "Malandro", "Poeta", "Brasileiro de coração"];
const LEVEL_GEMS = 60;

/* XP cumulés requis : 0, 100, 250, 450, 700, 1000, 1350… */
const LEVEL_XP = (() => {
  const t = [0]; let step = 100, acc = 0;
  for (let i = 1; i < 30; i++) { acc += step; t.push(acc); step += 50; }
  return t;
})();

function levelInfo(xp) {
  let lvl = 1;
  for (let i = 0; i < LEVEL_XP.length; i++) if (xp >= LEVEL_XP[i]) lvl = i + 1;
  const floor = LEVEL_XP[lvl - 1];
  const ceil = LEVEL_XP[lvl] != null ? LEVEL_XP[lvl] : floor;
  const span = Math.max(1, ceil - floor);
  return {
    level: lvl,
    title: LEVEL_TITLES[Math.min(lvl - 1, LEVEL_TITLES.length - 1)],
    into: xp - floor,
    span,
    toNext: Math.max(0, ceil - xp),
    pct: Math.min(100, Math.round(((xp - floor) / span) * 100)),
  };
}

const BADGES = [
  { id: "first", label: "Primeira aula", desc: "Terminer une leçon", emoji: "🌱", test: (p) => doneCount(p) >= 1 },
  { id: "three", label: "Em ritmo", desc: "3 leçons terminées", emoji: "🚀", test: (p) => doneCount(p) >= 3 },
  { id: "perfect", label: "Sem erro", desc: "Une leçon sans faute", emoji: "💎", test: (p) => Object.values(p.lessons).some((l) => l.stars === 3) },
  { id: "lvl5", label: "Nível 5", desc: "Atteindre le niveau 5", emoji: "⚡", test: (p) => levelInfo(p.xp).level >= 5 },
  { id: "lvl10", label: "Nível 10", desc: "Atteindre le niveau 10", emoji: "🔥", test: (p) => levelInfo(p.xp).level >= 10 },
  { id: "words50", label: "50 mots", desc: "50 mots rencontrés", emoji: "📚", test: (p) => Object.keys(p.learned).length >= 50 },
  { id: "streak3", label: "3 jours", desc: "3 jours d'affilée", emoji: "🗓️", test: (p) => p.streak >= 3 },
  { id: "card1", label: "Primeiro cartão", desc: "Acheter une carte", emoji: "💌", test: (p) => (p.cards || []).length >= 1 },
  { id: "card10", label: "Colecionador", desc: "10 cartes postales", emoji: "🗂️", test: (p) => (p.cards || []).length >= 10 },
  { id: "cardAll", label: "Álbum completo", desc: "Les 20 cartes", emoji: "🏆", test: (p) => (p.cards || []).length >= CARDS.length },
  { id: "allLessons", label: "Brasileiro", desc: "Toutes les leçons", emoji: "🇧🇷", test: (p) => doneCount(p) >= UNITS.length },
];

/* ================================================================== */
/*  ÉTAT & SAUVEGARDE                                                  */
/* ================================================================== */

const SAVE_KEY = "fala_brasil_save_v2";
const PREFS_KEY = "fala_brasil_prefs_v2";
const XP_PER_CORRECT = 10;
const DAILY_GOAL = 60;

function doneCount(p) { return Object.values(p.lessons).filter((l) => l.done).length; }

function defaultProgress() {
  return { xp: 0, gems: 50, streak: 0, lastDay: null, today: null, xpToday: 0, lessons: {}, learned: {}, badges: [], cards: [] };
}
function defaultPrefs() { return { voiceURI: null, rate: 0.88, pitch: 1.05, showPhonetics: true }; }

function todayKey() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; }
function daysBetween(a, b) {
  const pa = a.split("-").map(Number), pb = b.split("-").map(Number);
  return Math.round((new Date(pb[0], pb[1] - 1, pb[2]) - new Date(pa[0], pa[1] - 1, pa[2])) / 86400000);
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
function pick(arr, n) { return shuffle(arr).slice(0, n); }

/* --- La sauvegarde : localStorage du navigateur.
   Elle survit à la fermeture de l'onglet, au redémarrage du téléphone et
   aux mises à jour du site. Elle ne survit pas à un effacement manuel des
   données du navigateur ni à la navigation privée — d'où le code de
   secours dans le profil, et le repli en mémoire si l'écriture est refusée.
   On n'écrit jamais par-dessus une lecture qui a échoué. --- */
const storage = {
  ok: false,
  mode: "none", // "navigateur" | "memoire"
  mem: {},
  init() {
    try {
      const probe = "fala_probe";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      const keys = Object.keys(window.localStorage).filter((k) => k.indexOf("fala_") === 0);
      this.ok = true; this.mode = "navigateur";
      return { keys };
    } catch (e) { /* navigation privée ou stockage refusé */ }
    this.ok = true; this.mode = "memoire"; this.mem = {};
    return { keys: [] };
  },
  read(key) {
    try {
      if (this.mode === "navigateur") {
        const v = window.localStorage.getItem(key);
        return v ? JSON.parse(v) : null;
      }
      return this.mem[key] || null;
    } catch (e) { return null; }
  },
  write(key, value) {
    try {
      if (this.mode === "navigateur") { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
      this.mem[key] = value; return true;
    } catch (e) { return false; }
  },
  label() {
    return this.mode === "navigateur" ? "mémoire du navigateur" : "mémoire temporaire";
  },
};

/* Code de sauvegarde à copier-coller, pour ne rien perdre entre deux versions */
function encodeSave(p) {
  try { return btoa(unescape(encodeURIComponent(JSON.stringify(p)))); } catch (e) { return ""; }
}
function decodeSave(code) {
  try {
    const obj = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (typeof obj !== "object" || obj === null || typeof obj.xp !== "number") return null;
    return { ...defaultProgress(), ...obj };
  } catch (e) { return null; }
}

/* --- sons --- */
let audioCtx = null;
function blip(freqs, type = "sine", vol = 0.14) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = audioCtx || new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
    freqs.forEach((f, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = type; o.frequency.value = f;
      o.connect(g); g.connect(audioCtx.destination);
      const t = audioCtx.currentTime + i * 0.08;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.start(t); o.stop(t + 0.32);
    });
  } catch (e) { /* silence */ }
}
const sndGood = () => blip([660, 880], "triangle");
const sndBad = () => blip([180, 130], "sawtooth", 0.09);
const sndWin = () => blip([523, 659, 784, 1046], "triangle");
const sndTap = () => blip([440], "sine", 0.05);
const sndLevel = () => blip([523, 784, 1046, 1318], "square", 0.1);
const sndCard = () => blip([392, 523, 659, 880, 1046], "triangle", 0.12);

/* --- voix --- */
let VOICES = [];
let PREFS = defaultPrefs();
const NICE_NAMES = ["luciana", "google português", "google portugues", "francisca", "brenda", "camila", "fernanda",
  "joana", "raquel", "maria", "ricardo", "felipe", "daniel", "antônio", "antonio"];
const POOR_NAMES = /espeak|compact|eloquence|pico|festival|robot/i;

function voiceScore(v) {
  const name = (v.name || "").toLowerCase();
  const lang = (v.lang || "").toLowerCase().replace("_", "-");
  let s = 0;
  if (lang.startsWith("pt-br")) s += 100; else if (lang.startsWith("pt")) s += 55;
  if (NICE_NAMES.some((n) => name.includes(n))) s += 30;
  if (/natural|neural|enhanced|premium|siri/.test(name)) s += 25;
  if (POOR_NAMES.test(name)) s -= 60;
  if (v.localService === false) s += 10;
  return s;
}
function ptVoices() {
  return VOICES.filter((v) => (v.lang || "").toLowerCase().replace("_", "-").startsWith("pt"))
    .sort((a, b) => voiceScore(b) - voiceScore(a));
}
function refreshVoices() {
  try { VOICES = window.speechSynthesis.getVoices() || []; } catch (e) { VOICES = []; }
  return VOICES;
}
function currentVoice() {
  const list = ptVoices();
  if (!list.length) return null;
  if (PREFS.voiceURI) { const f = list.find((v) => v.voiceURI === PREFS.voiceURI); if (f) return f; }
  return list[0];
}
function speak(text, opts = {}) {
  try {
    if (!window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    const v = currentVoice();
    u.lang = v ? v.lang : "pt-BR";
    if (v) u.voice = v;
    u.rate = opts.slow ? Math.max(0.5, PREFS.rate - 0.25) : PREFS.rate;
    u.pitch = PREFS.pitch;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  } catch (e) { /* pas de voix */ }
}

/* ================================================================== */
/*  EXERCICES                                                          */
/* ================================================================== */

function makeExercises(items, count = 10) {
  const base = shuffle(items);
  const out = [];
  let i = 0;
  while (out.length < count) {
    const item = base[i % base.length];
    const slot = out.length % 5;
    if (slot === 0 || slot === 3) out.push(mcq(item, items, "pt_fr"));
    else if (slot === 1) out.push(mcq(item, items, "fr_pt"));
    else if (slot === 2) out.push({ ...mcq(item, items, "pt_fr"), kind: "listen" });
    else out.push(item.pt.split(" ").length >= 2 ? bank(item) : mcq(item, items, "fr_pt"));
    i++;
  }
  return out.map((e, idx) => ({ ...e, key: idx }));
}
function mcq(item, pool, dir) {
  const field = dir === "pt_fr" ? "fr" : "pt";
  const others = pick(
    [...pool, ...ALL_ITEMS].filter((x) => x[field] !== item[field])
      .filter((x, idx, self) => self.findIndex((y) => y[field] === x[field]) === idx), 3
  ).map((x) => x[field]);
  return { kind: "mcq", dir, item, question: dir === "pt_fr" ? item.pt : item.fr, answer: item[field], options: shuffle([item[field], ...others]) };
}
function bank(item) {
  const words = item.pt.split(" ");
  const noise = pick(ALL_ITEMS.flatMap((x) => x.pt.split(" ")).filter((w) => !words.includes(w)), Math.min(3, Math.max(2, 5 - words.length)));
  return { kind: "bank", item, question: item.fr, answer: item.pt, tiles: shuffle([...words, ...noise]).map((w, i) => ({ w, id: `${w}-${i}` })) };
}

/* ================================================================== */
/*  PETITS COMPOSANTS                                                  */
/* ================================================================== */

function Phonetic({ text, className = "" }) {
  if (!text) return null;
  return <span className={`font-mono text-sky-600 ${className}`}>[{text}]</span>;
}

function Confetti() {
  const bits = Array.from({ length: 44 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 1.4, dur: 2 + Math.random() * 1.8,
    size: 6 + Math.random() * 10, rot: Math.random() * 360,
    color: ["#009B3A", "#FEDF00", "#002776", "#FF5C8A", "#00C2CB", "#FF8A00"][i % 6],
  }));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {bits.map((b, i) => (
        <span key={i} className="absolute block rounded-sm" style={{
          left: `${b.left}%`, top: "-20px", width: b.size, height: b.size * 0.6,
          background: b.color, transform: `rotate(${b.rot}deg)`,
          animation: `fb-fall ${b.dur}s linear ${b.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}

function StatPill({ icon, value, tone }) {
  return <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${tone}`}>{icon}<span className="text-sm font-bold tabular-nums">{value}</span></div>;
}

function SpeakButton({ text, big }) {
  return (
    <button onClick={() => speak(text)} onDoubleClick={() => speak(text, { slow: true })} aria-label="Écouter"
      className={`shrink-0 grid place-items-center rounded-2xl bg-sky-500 text-white shadow-md border-b-4 border-sky-700 active:border-b-0 active:translate-y-1 transition-all ${big ? "w-20 h-20" : "w-11 h-11"}`}>
      <Volume2 className={big ? "w-9 h-9" : "w-5 h-5"} />
    </button>
  );
}

function Postcard({ card, owned = true, small = false }) {
  if (!owned) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 aspect-[4/3] grid place-items-center">
        <Lock className="w-6 h-6 text-slate-300" />
      </div>
    );
  }
  const rar = RARITY[card.r];
  return (
    <div className={`rounded-2xl overflow-hidden border-2 ${rar.ring} bg-gradient-to-br ${card.grad} text-white relative ${small ? "" : "shadow-lg"}`}>
      <div className="absolute top-1.5 right-1.5 bg-white/85 rounded-md px-1 py-0.5 text-[8px] font-bold text-slate-700 border border-white">BRASIL</div>
      <div className={`${small ? "p-2" : "p-4"} flex flex-col items-center justify-center text-center`}>
        <div className={small ? "text-2xl" : "text-5xl"}>{card.emoji}</div>
        <div className={`font-extrabold leading-tight ${small ? "text-[10px] mt-1" : "text-lg mt-2"}`}>{card.name}</div>
        <div className={`opacity-90 ${small ? "text-[8px]" : "text-xs"}`}>{card.place}</div>
      </div>
      {!small && (
        <div className="bg-white/15 px-4 py-2 text-center">
          <div className="font-bold text-sm">{card.pt}</div>
          <div className="text-xs opacity-90">{card.fr}</div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  RÉGLAGES DE VOIX                                                   */
/* ================================================================== */

function VoiceSettings({ prefs, setPrefs, onClose }) {
  const [voices, setVoices] = useState(ptVoices());
  useEffect(() => {
    refreshVoices(); setVoices(ptVoices());
    const h = () => { refreshVoices(); setVoices(ptVoices()); };
    try { window.speechSynthesis.addEventListener("voiceschanged", h); } catch (e) { /* ok */ }
    return () => { try { window.speechSynthesis.removeEventListener("voiceschanged", h); } catch (e) { /* ok */ } };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-slate-900/40 flex items-end justify-center">
      <div className="w-full max-w-md bg-white rounded-t-3xl p-5 max-h-screen overflow-y-auto" style={{ animation: "fb-up .25s ease-out" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-lg text-slate-800">Voix et prononciation</h3>
          <button onClick={onClose} className="w-9 h-9 grid place-items-center rounded-xl text-slate-400"><X className="w-6 h-6" /></button>
        </div>

        <label className="block text-sm font-bold text-slate-600 mb-1">Voix portugaise</label>
        {voices.length === 0 ? (
          <p className="text-sm text-slate-600 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3">
            Aucune voix portugaise sur cet appareil. Android : Paramètres → Synthèse vocale → télécharger « português (Brasil) ».
            iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Portugais (Brésil), version Améliorée ou Premium.
          </p>
        ) : (
          <select value={prefs.voiceURI || (voices[0] && voices[0].voiceURI) || ""}
            onChange={(e) => setPrefs({ ...prefs, voiceURI: e.target.value })}
            className="w-full rounded-2xl border-2 border-slate-200 px-3 py-3 font-semibold text-slate-700 bg-white">
            {voices.map((v) => (<option key={v.voiceURI} value={v.voiceURI}>{v.name} — {v.lang}{voiceScore(v) >= 120 ? " ⭐" : ""}</option>))}
          </select>
        )}

        <div className="mt-5">
          <div className="flex justify-between text-sm font-bold text-slate-600 mb-1"><span>Débit</span><span className="tabular-nums">{prefs.rate.toFixed(2)}×</span></div>
          <input type="range" min="0.5" max="1.2" step="0.02" value={prefs.rate}
            onChange={(e) => setPrefs({ ...prefs, rate: Number(e.target.value) })} className="w-full accent-emerald-500" />
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm font-bold text-slate-600 mb-1"><span>Hauteur de voix</span><span className="tabular-nums">{prefs.pitch.toFixed(2)}</span></div>
          <input type="range" min="0.7" max="1.4" step="0.02" value={prefs.pitch}
            onChange={(e) => setPrefs({ ...prefs, pitch: Number(e.target.value) })} className="w-full accent-emerald-500" />
        </div>

        <button onClick={() => speak("Bom dia! Eu queria um café, por favor.")}
          className="w-full mt-5 rounded-2xl bg-sky-500 text-white font-extrabold py-3 border-b-4 border-sky-700 active:border-b-0 active:translate-y-1">
          Écouter un exemple
        </button>
        <button onClick={() => setPrefs({ ...prefs, showPhonetics: !prefs.showPhonetics })}
          className="w-full mt-3 rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-600 flex items-center justify-center gap-2">
          {prefs.showPhonetics ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          Phonétique {prefs.showPhonetics ? "affichée" : "masquée"}
        </button>

        <h4 className="font-extrabold text-slate-800 mt-6 mb-2">Lire le portugais brésilien</h4>
        <div className="rounded-2xl border-2 border-slate-100 divide-y divide-slate-100">
          {PRON_KEYS.map((r) => (
            <div key={r.k} className="flex gap-3 px-3 py-2">
              <div className="font-mono font-bold text-sky-600 text-sm w-24 shrink-0">{r.k}</div>
              <div className="text-sm text-slate-600">{r.v}</div>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-5 mb-2 rounded-2xl bg-emerald-500 text-white font-extrabold py-4 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">C'est bon</button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ÉCRAN : PARCOURS                                                   */
/* ================================================================== */

function PathScreen({ progress, onStart, onSettings, storageWarning }) {
  const done = doneCount(progress);
  const goalPct = Math.min(100, Math.round((progress.xpToday / DAILY_GOAL) * 100));
  const reviewUnlocked = done >= 3;
  const li = levelInfo(progress.xp);

  return (
    <div className="pb-28">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-emerald-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-yellow-400 grid place-items-center text-lg">🦜</div>
            <div className="leading-tight">
              <div className="text-[13px] font-extrabold text-emerald-900">Niveau {li.level} · {li.title}</div>
              <div className="text-[11px] text-emerald-700 tabular-nums">{progress.xp} XP</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <StatPill icon={<Flame className="w-4 h-4 text-orange-500" />} value={progress.streak} tone="bg-orange-50 text-orange-700" />
            <StatPill icon={<Gem className="w-4 h-4 text-sky-500" />} value={progress.gems} tone="bg-sky-50 text-sky-700" />
            <button onClick={onSettings} aria-label="Réglages de voix" className="w-8 h-8 grid place-items-center rounded-full text-slate-400"><Settings className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-800 mb-1">
            <span>Niveau {li.level + 1} dans {li.toNext} XP</span>
            <span className="tabular-nums">Objectif du jour {progress.xpToday}/{DAILY_GOAL}</span>
          </div>
          <div className="h-3 rounded-full bg-emerald-100 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-yellow-400 transition-all duration-700" style={{ width: `${li.pct}%` }} />
          </div>
          <div className="h-1.5 mt-1 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-orange-400 transition-all duration-700" style={{ width: `${goalPct}%` }} />
          </div>
        </div>
      </header>

      {storageWarning && (
        <div className="mx-4 mt-4 rounded-2xl bg-amber-50 border-2 border-amber-200 p-3 flex gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
          <div className="text-xs text-amber-800">
            Ni l'app ni le navigateur n'acceptent d'enregistrer ici (navigation privée ?). Copie ton code de sauvegarde depuis le profil avant de fermer.
          </div>
        </div>
      )}

      <div className="px-4 pt-5">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white p-5 shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 text-7xl opacity-20">🌴</div>
          <h1 className="text-2xl font-extrabold leading-tight">Le portugais du Brésil,<br />une bouchée à la fois</h1>
          <p className="text-emerald-50 text-sm mt-2">
            {done === 0 ? "Commence par les salutations : dix minutes et tu sais dire bonjour à Rio."
              : `${done} leçon${done > 1 ? "s" : ""} terminée${done > 1 ? "s" : ""} · ${Object.keys(progress.learned).length} mots · ${(progress.cards || []).length}/${CARDS.length} cartes`}
          </p>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-3">
        {UNITS.map((u, i) => {
          const st = progress.lessons[u.id] || {};
          const unlocked = i === 0 || (progress.lessons[UNITS[i - 1].id] || {}).done;
          const stars = st.stars || 0;
          return (
            <button key={u.id} disabled={!unlocked} onClick={() => { sndTap(); onStart(u.id); }}
              className={`w-full text-left rounded-3xl p-4 flex items-center gap-4 transition-all
                ${unlocked ? `bg-gradient-to-r ${u.color} text-white shadow-lg border-b-4 border-black/20 active:border-b-0 active:translate-y-1`
                  : "bg-slate-100 text-slate-400 border-b-4 border-slate-200"}`}>
              <div className={`w-14 h-14 rounded-2xl grid place-items-center text-2xl shrink-0 ${unlocked ? "bg-white/25" : "bg-white"}`}>
                {unlocked ? u.emoji : <Lock className="w-6 h-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-extrabold text-lg truncate">{u.title}</div>
                <div className={`text-sm truncate ${unlocked ? "text-white/85" : ""}`}>{u.subtitle}</div>
                {unlocked && (
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3].map((s) => <Star key={s} className={`w-4 h-4 ${s <= stars ? "fill-yellow-300 text-yellow-300" : "text-white/40"}`} />)}
                  </div>
                )}
              </div>
              {unlocked && <ChevronRight className="w-6 h-6 opacity-70 shrink-0" />}
            </button>
          );
        })}

        <button disabled={!reviewUnlocked} onClick={() => { sndTap(); onStart("review"); }}
          className={`w-full rounded-3xl p-4 flex items-center gap-4 transition-all
            ${reviewUnlocked ? "bg-white text-emerald-900 shadow-lg border-2 border-dashed border-emerald-400 active:translate-y-1"
              : "bg-slate-100 text-slate-400 border-2 border-dashed border-slate-200"}`}>
          <div className="w-14 h-14 rounded-2xl grid place-items-center bg-emerald-50 shrink-0">
            {reviewUnlocked ? <RotateCcw className="w-6 h-6 text-emerald-600" /> : <Lock className="w-6 h-6" />}
          </div>
          <div className="flex-1 text-left">
            <div className="font-extrabold text-lg">Révision mélangée</div>
            <div className="text-sm opacity-70">{reviewUnlocked ? "Tout ce que tu as vu, en désordre" : "Se débloque après 3 leçons"}</div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ÉCRAN : BOUTIQUE                                                   */
/* ================================================================== */

function ShopScreen({ progress, onBuy }) {
  const owned = progress.cards || [];
  const remaining = CARDS.length - owned.length;
  const canBuy = progress.gems >= CARD_PRICE && remaining > 0;

  return (
    <div className="pb-28">
      <div className="px-4 py-4 flex items-center justify-between border-b border-slate-100 sticky top-0 bg-white z-20">
        <h2 className="font-extrabold text-lg text-slate-800">Loja · Boutique</h2>
        <StatPill icon={<Gem className="w-4 h-4 text-sky-500" />} value={progress.gems} tone="bg-sky-50 text-sky-700" />
      </div>

      <div className="px-4 pt-5">
        <div className="rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white p-5 shadow-lg relative overflow-hidden">
          <div className="absolute -right-4 -bottom-6 text-8xl opacity-20">💌</div>
          <div className="flex items-center gap-2 text-xs font-bold bg-white/25 rounded-full px-3 py-1 w-fit">
            <Sparkles className="w-3.5 h-3.5" /> Carte mystère
          </div>
          <h3 className="text-2xl font-extrabold mt-3 leading-tight">Une carte postale<br />tirée au hasard</h3>
          <p className="text-sm text-white/90 mt-2">
            20 lieux du Brésil à collectionner, chacun avec une phrase à glisser dans une conversation.
            {remaining > 0 ? ` Il t'en manque ${remaining}.` : " Album complet !"}
          </p>
          <button disabled={!canBuy} onClick={() => onBuy()}
            className={`w-full mt-4 rounded-2xl py-4 font-extrabold border-b-4 transition-all
              ${canBuy ? "bg-white text-orange-600 border-orange-200 active:border-b-0 active:translate-y-1" : "bg-white/40 text-white/70 border-white/20"}`}>
            {remaining === 0 ? "Tout est collectionné" : `Ouvrir une carte — ${CARD_PRICE} gemmes`}
          </button>
          {!canBuy && remaining > 0 && (
            <p className="text-xs text-white/90 mt-2 text-center">
              Il te manque {CARD_PRICE - progress.gems} gemmes. Une leçon en rapporte 5 à 15, un passage de niveau {LEVEL_GEMS}.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between mt-7 mb-3">
          <h3 className="font-extrabold text-slate-800 flex items-center gap-2"><Package className="w-5 h-5 text-slate-400" /> Mon album</h3>
          <span className="text-sm font-bold text-slate-400 tabular-nums">{owned.length}/{CARDS.length}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {CARDS.map((c) => (
            <div key={c.id}><Postcard card={c} owned={owned.includes(c.id)} small /></div>
          ))}
        </div>

        {owned.length > 0 && (
          <>
            <h3 className="font-extrabold text-slate-800 mt-7 mb-3">Le dos des cartes</h3>
            <div className="space-y-2">
              {CARDS.filter((c) => owned.includes(c.id)).map((c) => (
                <div key={c.id} className="rounded-2xl border-2 border-slate-100 p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{c.emoji}</span>
                    <span className="font-extrabold text-slate-800">{c.name}</span>
                    <span className={`text-[10px] font-bold rounded-full px-2 py-0.5 ${RARITY[c.r].chip}`}>{RARITY[c.r].label}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{c.note}</p>
                  <button onClick={() => speak(c.pt)} className="mt-2 flex items-center gap-2 text-sm">
                    <span className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 grid place-items-center shrink-0"><Volume2 className="w-4 h-4" /></span>
                    <span className="font-bold text-slate-700">{c.pt}</span>
                    <span className="text-slate-400">· {c.fr}</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CardReveal({ card, onClose }) {
  const rar = RARITY[card.r];
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 grid place-items-center px-6">
      <Confetti />
      <div className="w-full max-w-xs" style={{ animation: "fb-pop .5s ease-out" }}>
        <div className={`text-center text-xs font-bold rounded-full px-3 py-1 w-fit mx-auto mb-3 ${rar.chip}`}>{rar.label}</div>
        <Postcard card={card} />
        <p className="text-white/90 text-sm text-center mt-3">{card.note}</p>
        <button onClick={onClose}
          className="w-full mt-4 rounded-2xl bg-white text-slate-800 font-extrabold py-4 border-b-4 border-slate-300 active:border-b-0 active:translate-y-1">
          Ajouter à l'album
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ÉCRAN : LEÇON                                                      */
/* ================================================================== */

function LessonScreen({ unit, exercises, onQuit, onFinish, gems, onRevive, prefs }) {
  const [idx, setIdx] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [choice, setChoice] = useState(null);
  const [built, setBuilt] = useState([]);
  const [state, setState] = useState("answering");
  const [mistakes, setMistakes] = useState(0);
  const [combo, setCombo] = useState(0);
  const ex = exercises[idx];
  const pct = Math.round((idx / exercises.length) * 100);
  const showPh = prefs.showPhonetics;

  useEffect(() => {
    if (ex && ex.kind === "listen") { const t = setTimeout(() => speak(ex.item.pt), 400); return () => clearTimeout(t); }
  }, [idx, ex]);

  const ready = ex && (ex.kind === "bank" ? built.length > 0 : choice !== null);

  function check() {
    const given = ex.kind === "bank" ? built.map((t) => t.w).join(" ") : choice;
    if (given.trim().toLowerCase() === ex.answer.trim().toLowerCase()) {
      sndGood(); setCombo((c) => c + 1); setState("right"); setTimeout(() => speak(ex.item.pt), 260);
    } else {
      sndBad(); setCombo(0); setMistakes((m) => m + 1);
      const h = hearts - 1; setHearts(h); setState(h <= 0 ? "dead" : "wrong");
    }
  }
  function next() {
    if (idx + 1 >= exercises.length) { sndWin(); onFinish({ mistakes }); }
    else { setIdx(idx + 1); setChoice(null); setBuilt([]); setState("answering"); }
  }

  if (state === "dead") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-4">
        <div className="text-7xl">💔</div>
        <h2 className="text-2xl font-extrabold text-slate-800">Plus de cœurs</h2>
        <p className="text-slate-500 max-w-xs">Pas grave. Les erreurs, c'est là que ça rentre. Reprends la leçon quand tu veux.</p>
        <button onClick={() => { sndTap(); onQuit(); }} className="w-full max-w-xs rounded-2xl bg-emerald-500 text-white font-extrabold py-4 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">Retour au parcours</button>
        {gems >= 30 && (
          <button onClick={() => { sndTap(); onRevive(); setHearts(3); setState("answering"); }}
            className="w-full max-w-xs rounded-2xl bg-white text-sky-700 font-bold py-3 border-2 border-sky-200">
            Reprendre avec 3 cœurs — 30 <Gem className="inline w-4 h-4 -mt-1" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3">
        <button onClick={() => { sndTap(); onQuit(); }} aria-label="Quitter la leçon" className="w-9 h-9 grid place-items-center rounded-xl text-slate-400"><X className="w-6 h-6" /></button>
        <div className="flex-1 h-4 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center gap-1"><Heart className="w-5 h-5 fill-red-500 text-red-500" /><span className="font-extrabold text-red-500 tabular-nums">{hearts}</span></div>
      </div>

      {combo >= 3 && state === "answering" && (
        <div className="px-4">
          <div className="inline-flex items-center gap-1 rounded-full bg-orange-100 text-orange-700 px-3 py-1 text-xs font-bold"><Flame className="w-3.5 h-3.5" /> {combo} d'affilée !</div>
        </div>
      )}

      <div className="flex-1 px-4 pt-6">
        <p className="text-sm font-bold text-slate-400 mb-3">
          {ex.kind === "listen" ? "Qu'est-ce que tu entends ?" : ex.kind === "bank" ? "Construis la phrase en portugais"
            : ex.dir === "pt_fr" ? "Que veut dire ce mot ?" : "Comment on dit ?"}
        </p>

        {ex.kind === "listen" ? (
          <div className="flex flex-col items-center py-6 gap-2">
            <SpeakButton text={ex.item.pt} big />
            <button onClick={() => speak(ex.item.pt, { slow: true })} className="text-xs font-bold text-sky-600 rounded-full border-2 border-sky-200 px-3 py-1">Plus lentement</button>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-6">
            <div className="text-4xl">{unit.emoji}</div>
            <div className="relative bg-white border-2 border-slate-200 rounded-2xl px-4 py-3 flex-1">
              <div className="text-xl font-extrabold text-slate-800">{ex.question}</div>
              {ex.dir === "pt_fr" && showPh && <div className="text-sm mt-0.5"><Phonetic text={ex.item.ph} /></div>}
              {ex.dir === "pt_fr" && (
                <button onClick={() => speak(ex.item.pt)} aria-label="Écouter" className="absolute -right-2 -top-3 w-8 h-8 rounded-full bg-sky-500 text-white grid place-items-center shadow"><Volume2 className="w-4 h-4" /></button>
              )}
            </div>
          </div>
        )}

        {ex.kind === "bank" ? (
          <div>
            <div className="min-h-16 rounded-2xl border-2 border-dashed border-slate-300 p-2 flex flex-wrap gap-2 mb-5">
              {built.map((t) => (
                <button key={t.id} disabled={state !== "answering"} onClick={() => { sndTap(); setBuilt(built.filter((x) => x.id !== t.id)); }}
                  className="rounded-xl bg-white border-2 border-slate-200 border-b-4 px-3 py-2 font-bold text-slate-700">{t.w}</button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {ex.tiles.filter((t) => !built.find((b) => b.id === t.id)).map((t) => (
                <button key={t.id} disabled={state !== "answering"} onClick={() => { sndTap(); setBuilt([...built, t]); }}
                  className="rounded-xl bg-white border-2 border-slate-200 border-b-4 px-3 py-2 font-bold text-slate-700 active:translate-y-0.5 active:border-b-2">{t.w}</button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-3">
            {ex.options.map((opt) => {
              const selected = choice === opt, isAnswer = opt === ex.answer;
              let cls = "bg-white border-slate-200 text-slate-700";
              if (state === "answering" && selected) cls = "bg-sky-50 border-sky-400 text-sky-800";
              if (state !== "answering" && isAnswer) cls = "bg-emerald-50 border-emerald-400 text-emerald-800";
              if (state === "wrong" && selected && !isAnswer) cls = "bg-red-50 border-red-400 text-red-700";
              const ph = ex.dir === "fr_pt" ? PH_OF[opt] : null;
              return (
                <button key={opt} disabled={state !== "answering"}
                  onClick={() => { sndTap(); setChoice(opt); if (ex.dir === "fr_pt") speak(opt); }}
                  className={`w-full text-left rounded-2xl border-2 border-b-4 px-4 py-3 font-bold transition-all active:translate-y-0.5 active:border-b-2 ${cls}`}>
                  <div>{opt}</div>
                  {ph && showPh && <div className="text-xs font-normal mt-0.5"><Phonetic text={ph} /></div>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className={`sticky bottom-0 px-4 py-4 border-t-2 transition-colors
        ${state === "right" ? "bg-emerald-50 border-emerald-200" : state === "wrong" ? "bg-red-50 border-red-200" : "bg-white border-slate-100"}`}>
        {state !== "answering" && (
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-9 h-9 rounded-full grid place-items-center shrink-0 ${state === "right" ? "bg-emerald-500" : "bg-red-500"}`}>
              {state === "right" ? <Check className="w-5 h-5 text-white" /> : <X className="w-5 h-5 text-white" />}
            </div>
            <div className="leading-tight min-w-0">
              <div className={`font-extrabold ${state === "right" ? "text-emerald-700" : "text-red-700"}`}>
                {state === "right" ? ["Isso aí !", "Perfeito !", "Muito bem !", "Boa !"][idx % 4] : "Réponse attendue"}
              </div>
              <div className={`text-sm font-semibold ${state === "right" ? "text-emerald-700" : "text-red-700"}`}>{ex.item.pt}</div>
              <div className="text-sm"><Phonetic text={ex.item.ph} /> <span className="text-slate-500">· {ex.item.fr}</span></div>
            </div>
            <button onClick={() => speak(ex.item.pt, { slow: true })} aria-label="Réécouter lentement" className="ml-auto w-9 h-9 rounded-xl bg-white/70 grid place-items-center text-slate-500 shrink-0"><Volume2 className="w-5 h-5" /></button>
          </div>
        )}
        <button disabled={state === "answering" && !ready} onClick={() => (state === "answering" ? check() : next())}
          className={`w-full rounded-2xl py-4 font-extrabold text-white border-b-4 transition-all active:border-b-0 active:translate-y-1
            ${state === "wrong" ? "bg-red-500 border-red-700" : state === "right" ? "bg-emerald-500 border-emerald-700"
              : ready ? "bg-emerald-500 border-emerald-700" : "bg-slate-200 border-slate-300 text-slate-400"}`}>
          {state === "answering" ? "Vérifier" : "Continuer"}
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  ÉCRAN : FIN DE LEÇON                                               */
/* ================================================================== */

function ResultScreen({ result, onHome }) {
  const { xpGained, gemsGained, stars, mistakes, levelUps, levelGems, newLevel, newTitle, newBadges } = result;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-10">
      <Confetti />
      <div className="text-7xl mb-2" style={{ animation: "fb-pop .5s ease-out" }}>🎉</div>
      <h2 className="text-3xl font-extrabold text-emerald-700">Muito bem!</h2>
      <p className="text-slate-500 mt-1 mb-6">{mistakes === 0 ? "Aucune erreur, chapeau." : `${mistakes} erreur${mistakes > 1 ? "s" : ""} — on revoit ça en révision.`}</p>

      <div className="flex gap-1 mb-6">
        {[1, 2, 3].map((s) => (
          <Star key={s} className={`w-10 h-10 ${s <= stars ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
            style={s <= stars ? { animation: `fb-pop .4s ease-out ${s * 0.12}s backwards` } : {}} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-4">
        <div className="rounded-2xl bg-yellow-50 border-2 border-yellow-200 p-4">
          <Zap className="w-6 h-6 text-yellow-500 mx-auto" />
          <div className="text-2xl font-extrabold text-yellow-700 tabular-nums">+{xpGained}</div>
          <div className="text-xs font-bold text-yellow-600">XP</div>
        </div>
        <div className="rounded-2xl bg-sky-50 border-2 border-sky-200 p-4">
          <Gem className="w-6 h-6 text-sky-500 mx-auto" />
          <div className="text-2xl font-extrabold text-sky-700 tabular-nums">+{gemsGained + levelGems}</div>
          <div className="text-xs font-bold text-sky-600">gemmes</div>
        </div>
      </div>

      {levelUps > 0 && (
        <div className="w-full max-w-xs mb-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4" style={{ animation: "fb-pop .5s ease-out .2s backwards" }}>
          <div className="text-3xl">🏅</div>
          <div className="font-extrabold text-lg">Niveau {newLevel} · {newTitle}</div>
          <div className="text-sm text-white/90">+{levelGems} gemmes de récompense</div>
        </div>
      )}

      {newBadges.length > 0 && (
        <div className="w-full max-w-xs mb-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-4">
          <div className="flex items-center justify-center gap-2 font-extrabold mb-2"><Sparkles className="w-5 h-5" /> Nouveau trophée</div>
          {newBadges.map((b) => <div key={b.id} className="text-sm">{b.emoji} {b.label}</div>)}
        </div>
      )}

      <button onClick={() => { sndTap(); onHome(); }}
        className="w-full max-w-xs rounded-2xl bg-emerald-500 text-white font-extrabold py-4 border-b-4 border-emerald-700 active:border-b-0 active:translate-y-1">Continuer</button>
    </div>
  );
}

/* ================================================================== */
/*  ÉCRAN : PROFIL                                                     */
/* ================================================================== */

function ProfileScreen({ progress, onReset, onImport, prefs, storageWarning }) {
  const [confirm, setConfirm] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [importMsg, setImportMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const words = Object.keys(progress.learned);
  const li = levelInfo(progress.xp);
  const code = encodeSave(progress);

  function copy() {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    } catch (e) { setCopied(false); }
  }
  function doImport() {
    const p = decodeSave(importCode);
    if (!p) { setImportMsg("Ce code n'est pas lisible. Vérifie qu'il est copié en entier."); return; }
    onImport(p); setImportMsg("Progression restaurée."); setImportCode("");
  }

  return (
    <div className="pb-28">
      <div className="px-4 py-4 border-b border-slate-100 sticky top-0 bg-white z-20">
        <h2 className="font-extrabold text-lg text-slate-800">Mon profil</h2>
      </div>

      <div className="px-4 pt-5">
        <div className="rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-400 to-emerald-500 p-5 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-3xl bg-white/25 grid place-items-center text-3xl">🦜</div>
            <div>
              <div className="text-xs font-bold opacity-90">Niveau {li.level}</div>
              <div className="text-2xl font-extrabold">{li.title}</div>
              <div className="text-xs opacity-90 tabular-nums">{progress.xp} XP au total</div>
            </div>
          </div>
          <div className="h-2.5 rounded-full bg-white/30 mt-4 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${li.pct}%` }} />
          </div>
          <div className="text-[11px] mt-1 opacity-90">{li.toNext} XP avant le niveau {li.level + 1} — et {LEVEL_GEMS} gemmes à la clé</div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="rounded-2xl bg-orange-50 border-2 border-orange-100 p-3 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto" />
            <div className="font-extrabold text-orange-700 text-lg tabular-nums">{progress.streak}</div>
            <div className="text-[10px] font-bold text-orange-600">jours</div>
          </div>
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-100 p-3 text-center">
            <BookOpen className="w-5 h-5 text-emerald-500 mx-auto" />
            <div className="font-extrabold text-emerald-700 text-lg tabular-nums">{words.length}</div>
            <div className="text-[10px] font-bold text-emerald-600">mots</div>
          </div>
          <div className="rounded-2xl bg-violet-50 border-2 border-violet-100 p-3 text-center">
            <Trophy className="w-5 h-5 text-violet-500 mx-auto" />
            <div className="font-extrabold text-violet-700 text-lg tabular-nums">{doneCount(progress)}</div>
            <div className="text-[10px] font-bold text-violet-600">leçons</div>
          </div>
          <div className="rounded-2xl bg-sky-50 border-2 border-sky-100 p-3 text-center">
            <Gem className="w-5 h-5 text-sky-500 mx-auto" />
            <div className="font-extrabold text-sky-700 text-lg tabular-nums">{progress.gems}</div>
            <div className="text-[10px] font-bold text-sky-600">gemmes</div>
          </div>
        </div>

        <h3 className="font-extrabold text-slate-800 mt-7 mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-amber-500" /> Trophées</h3>
        <div className="grid grid-cols-4 gap-3">
          {BADGES.map((b) => {
            const has = progress.badges.includes(b.id);
            return (
              <div key={b.id} title={b.desc} className={`rounded-2xl p-2 text-center border-2 ${has ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-100 opacity-50"}`}>
                <div className="text-2xl">{has ? b.emoji : "🔒"}</div>
                <div className="text-[10px] font-bold text-slate-600 leading-tight mt-1">{b.label}</div>
              </div>
            );
          })}
        </div>

        {/* Sauvegarde */}
        <h3 className="font-extrabold text-slate-800 mt-7 mb-2">Sauvegarde</h3>
        <div className={`rounded-2xl border-2 p-3 mb-3 flex items-center gap-2 ${storageWarning ? "bg-amber-50 border-amber-200" : "bg-emerald-50 border-emerald-200"}`}>
          {storageWarning ? <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" /> : <Check className="w-5 h-5 text-emerald-600 shrink-0" />}
          <div className={`text-xs ${storageWarning ? "text-amber-800" : "text-emerald-800"}`}>
            {storageWarning
              ? "Rien ne s'enregistre ici : tout sera perdu en fermant. Garde le code ci-dessous."
              : `Enregistrement automatique après chaque leçon — ${storage.label()}.`}
          </div>
        </div>
        <button onClick={() => setShowCode(!showCode)} className="w-full rounded-2xl border-2 border-slate-200 font-bold py-3 text-slate-600">
          {showCode ? "Masquer le code" : "Code de secours (changer d'appareil)"}
        </button>
        {showCode && (
          <div className="mt-3">
            <textarea readOnly value={code} rows={4}
              className="w-full rounded-2xl border-2 border-slate-200 p-3 font-mono text-[10px] text-slate-600 break-all" />
            <button onClick={copy} className="w-full mt-2 rounded-2xl bg-slate-800 text-white font-bold py-3 flex items-center justify-center gap-2">
              <Copy className="w-4 h-4" /> {copied ? "Copié" : "Copier le code"}
            </button>
            <div className="mt-4">
              <label className="block text-sm font-bold text-slate-600 mb-1">Restaurer depuis un code</label>
              <textarea value={importCode} onChange={(e) => setImportCode(e.target.value)} rows={3} placeholder="Colle ton code ici"
                className="w-full rounded-2xl border-2 border-slate-200 p-3 font-mono text-[10px] text-slate-700" />
              <button onClick={doImport} disabled={!importCode.trim()}
                className={`w-full mt-2 rounded-2xl font-bold py-3 ${importCode.trim() ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                Restaurer
              </button>
              {importMsg && <p className="text-xs mt-2 text-slate-600">{importMsg}</p>}
            </div>
          </div>
        )}

        {words.length > 0 && (
          <>
            <h3 className="font-extrabold text-slate-800 mt-7 mb-3">Mon carnet de mots</h3>
            <div className="rounded-2xl border-2 border-slate-100 divide-y divide-slate-100 overflow-hidden">
              {words.map((pt) => {
                const it = ALL_ITEMS.find((x) => x.pt === pt);
                return (
                  <div key={pt} className="flex items-center gap-3 px-3 py-2">
                    <button onClick={() => speak(pt)} aria-label="Écouter" className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 grid place-items-center shrink-0"><Volume2 className="w-4 h-4" /></button>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-800 truncate">{pt}</div>
                      {prefs.showPhonetics && <div className="text-xs truncate"><Phonetic text={PH_OF[pt]} /></div>}
                      <div className="text-xs text-slate-500 truncate">{it ? it.fr : ""}</div>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      {[1, 2, 3].map((n) => <div key={n} className={`w-2 h-2 rounded-full ${n <= Math.min(3, progress.learned[pt]) ? "bg-emerald-500" : "bg-slate-200"}`} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="mt-8">
          {!confirm ? (
            <button onClick={() => setConfirm(true)} className="w-full rounded-2xl border-2 border-slate-200 text-slate-500 font-bold py-3">Effacer ma progression</button>
          ) : (
            <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-700 font-semibold mb-3">Tout sera remis à zéro : XP, niveau, gemmes, cartes postales.</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirm(false)} className="flex-1 rounded-xl bg-white border-2 border-slate-200 font-bold py-2.5 text-slate-600">Annuler</button>
                <button onClick={onReset} className="flex-1 rounded-xl bg-red-500 text-white font-bold py-2.5">Tout effacer</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  NAVIGATION                                                         */
/* ================================================================== */

function TabBar({ view, setView, cardCount }) {
  const tabs = [
    { id: "path", label: "Parcours", icon: Map },
    { id: "shop", label: "Boutique", icon: ShoppingBag, badge: cardCount },
    { id: "profile", label: "Profil", icon: User },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30">
      <div className="mx-auto max-w-md bg-white border-t-2 border-slate-100 flex">
        {tabs.map((t) => {
          const Icon = t.icon, active = view === t.id;
          return (
            <button key={t.id} onClick={() => { sndTap(); setView(t.id); }}
              className={`flex-1 py-3 flex flex-col items-center gap-0.5 relative ${active ? "text-emerald-600" : "text-slate-400"}`}>
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-bold">{t.label}</span>
              {active && <span className="absolute top-0 left-6 right-6 h-1 rounded-full bg-emerald-500" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  APPLICATION                                                        */
/* ================================================================== */

export default function App() {
  const [ready, setReady] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [progress, setProgress] = useState(defaultProgress());
  const [prefs, setPrefsState] = useState(defaultPrefs());
  const [view, setView] = useState("path");
  const [session, setSession] = useState(null);
  const [result, setResult] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [revealed, setRevealed] = useState(null);

  const setPrefs = useCallback((p) => { PREFS = p; setPrefsState(p); }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { keys } = await storage.init();
      if (!alive) return;
      setStorageWarning(storage.mode === "memoire");
      let p = defaultProgress();
      if (keys.includes(SAVE_KEY)) {
        const saved = await storage.read(SAVE_KEY);
        if (saved) p = { ...defaultProgress(), ...saved };
      }
      const t = todayKey();
      if (p.today !== t) { p.today = t; p.xpToday = 0; }
      if (p.lastDay && daysBetween(p.lastDay, t) > 1) p.streak = 0;
      if (keys.includes(PREFS_KEY)) {
        const sp = await storage.read(PREFS_KEY);
        if (sp) { const pr = { ...defaultPrefs(), ...sp }; PREFS = pr; setPrefsState(pr); }
      }
      setProgress(p);
      setReady(true);
    })();

    refreshVoices();
    const h = () => refreshVoices();
    try { window.speechSynthesis.addEventListener("voiceschanged", h); } catch (e) { /* ok */ }
    return () => { alive = false; try { window.speechSynthesis.removeEventListener("voiceschanged", h); } catch (e) { /* ok */ } };
  }, []);

  useEffect(() => { if (ready && storage.ok) storage.write(SAVE_KEY, progress); }, [progress, ready]);
  useEffect(() => { if (ready && storage.ok) storage.write(PREFS_KEY, prefs); }, [prefs, ready]);

  const startLesson = useCallback((unitId) => {
    if (unitId === "review") {
      const seen = ALL_ITEMS.filter((x) => progress.learned[x.pt]);
      const pool = seen.length >= 6 ? seen : ALL_ITEMS.slice(0, 12);
      setSession({ unit: { id: "review", title: "Révision", emoji: "🔁", items: pool }, exercises: makeExercises(pool, 12) });
    } else {
      const u = UNITS.find((x) => x.id === unitId);
      setSession({ unit: u, exercises: makeExercises(u.items, 10) });
    }
    setView("lesson");
  }, [progress.learned]);

  function finishLesson({ mistakes }) {
    const u = session.unit;
    const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    const gained = Math.max(20, session.exercises.length * XP_PER_CORRECT - mistakes * 5);
    const gemsGained = stars * 5;

    const before = levelInfo(progress.xp).level;
    const afterInfo = levelInfo(progress.xp + gained);
    const levelUps = Math.max(0, afterInfo.level - before);
    const levelGems = levelUps * LEVEL_GEMS;

    let freshBadges = [];
    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      const t = todayKey();
      if (p.today !== t) { p.today = t; p.xpToday = 0; }
      p.xp += gained; p.xpToday += gained; p.gems += gemsGained + levelGems;
      if (p.lastDay !== t) { p.streak = p.lastDay && daysBetween(p.lastDay, t) === 1 ? p.streak + 1 : 1; p.lastDay = t; }
      if (u.id !== "review") {
        const prevL = p.lessons[u.id] || { stars: 0 };
        p.lessons[u.id] = { done: true, stars: Math.max(prevL.stars, stars), plays: (prevL.plays || 0) + 1 };
      }
      u.items.forEach((it) => { p.learned[it.pt] = (p.learned[it.pt] || 0) + 1; });
      freshBadges = BADGES.filter((b) => !p.badges.includes(b.id) && b.test(p));
      p.badges = [...p.badges, ...freshBadges.map((b) => b.id)];
      return p;
    });

    if (levelUps > 0) setTimeout(sndLevel, 500);
    setResult({
      xpGained: gained, gemsGained, stars, mistakes, levelUps, levelGems,
      newLevel: afterInfo.level, newTitle: afterInfo.title, newBadges: freshBadges,
    });
    setView("result");
  }

  function buyCard() {
    const owned = progress.cards || [];
    const available = CARDS.filter((c) => !owned.includes(c.id));
    if (progress.gems < CARD_PRICE || available.length === 0) return;

    const total = available.reduce((s, c) => s + RARITY[c.r].weight, 0);
    let roll = Math.random() * total, chosen = available[available.length - 1];
    for (const c of available) { roll -= RARITY[c.r].weight; if (roll <= 0) { chosen = c; break; } }

    sndCard();
    setProgress((prev) => {
      const p = JSON.parse(JSON.stringify(prev));
      p.gems -= CARD_PRICE;
      p.cards = [...(p.cards || []), chosen.id];
      const fresh = BADGES.filter((b) => !p.badges.includes(b.id) && b.test(p));
      p.badges = [...p.badges, ...fresh.map((b) => b.id)];
      return p;
    });
    setRevealed(chosen);
    setTimeout(() => speak(chosen.pt), 700);
  }

  if (!ready) {
    return (
      <div className="min-h-screen grid place-items-center bg-emerald-50">
        <div className="text-center">
          <div className="text-5xl mb-2" style={{ animation: "fb-pop .6s ease-out" }}>🦜</div>
          <div className="font-extrabold text-emerald-700">Fala, Brasil!</div>
        </div>
      </div>
    );
  }

  const inLesson = view === "lesson" || view === "result";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <style>{`
        @keyframes fb-fall { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        @keyframes fb-pop { 0% { transform: scale(.4); opacity: 0; } 60% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fb-up { from { transform: translateY(40px); opacity: .6; } to { transform: translateY(0); opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { * { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
      `}</style>

      <div className="mx-auto max-w-md bg-white min-h-screen shadow-xl relative">
        {view === "path" && (
          <PathScreen progress={progress} onStart={startLesson} onSettings={() => setShowSettings(true)} storageWarning={storageWarning} />
        )}
        {view === "shop" && <ShopScreen progress={progress} onBuy={buyCard} />}
        {view === "profile" && (
          <ProfileScreen progress={progress} prefs={prefs} storageWarning={storageWarning}
            onReset={() => { setProgress(defaultProgress()); setView("path"); }}
            onImport={(p) => setProgress(p)} />
        )}
        {view === "lesson" && session && (
          <LessonScreen unit={session.unit} exercises={session.exercises} prefs={prefs} gems={progress.gems}
            onRevive={() => setProgress((p) => ({ ...p, gems: p.gems - 30 }))}
            onQuit={() => { setSession(null); setView("path"); }} onFinish={finishLesson} />
        )}
        {view === "result" && result && (
          <ResultScreen result={result} onHome={() => { setSession(null); setResult(null); setView("path"); }} />
        )}

        {!inLesson && <TabBar view={view} setView={setView} cardCount={(progress.cards || []).length} />}
        {showSettings && <VoiceSettings prefs={prefs} setPrefs={setPrefs} onClose={() => setShowSettings(false)} />}
        {revealed && <CardReveal card={revealed} onClose={() => { sndTap(); setRevealed(null); }} />}
      </div>
    </div>
  );
}
