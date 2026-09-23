import { ALL_ITEMS } from "./units.js";

/* ================================================================== */
/*  HISTÓRIAS — un livre par palier, suite d'une même histoire          */
/*  Syntaxe : {{texte affiché|clé pt exacte}} marque un mot testable    */
/*  (la clé doit correspondre à l'entrée « pt » d'un item de UNITS)     */
/* ================================================================== */

const STORY_TOKEN_RE = /\{\{([^}|]+)(?:\|([^}]+))?\}\}/g;

export function parseStoryParagraph(text) {
  const tokens = [];
  let last = 0, m;
  STORY_TOKEN_RE.lastIndex = 0;
  while ((m = STORY_TOKEN_RE.exec(text))) {
    if (m.index > last) tokens.push({ type: "text", value: text.slice(last, m.index) });
    const display = m[1];
    const key = (m[2] || m[1]).toLowerCase();
    const item = ALL_ITEMS.find((it) => it.pt.toLowerCase() === key);
    tokens.push({ type: "word", display, key, item });
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push({ type: "text", value: text.slice(last) });
  return tokens;
}

export const STORIES = [
  {
    id: "u1", title: "Capítulo 1 — Chegada no Rio",
    paragraphs: [
      "Léa desce do avião no Rio de Janeiro. Uma mulher sorri para ela na fila.",
      "— {{Oi|oi}}! {{Tudo bem?|tudo bem?}} — pergunta a mulher.",
      "— {{Tudo bem|tudo bem}}, obrigada! — responde Léa, um pouco cansada da viagem.",
      "A mulher continua, curiosa: — {{Como você se chama?|como você se chama?}}",
      "— Meu nome é Léa. {{Eu sou francês|eu sou francês}}... quer dizer, francesa! — ela ri da própria confusão.",
      "— {{Prazer|prazer}}, Léa! Bem-vinda ao Brasil.",
      "No dia seguinte, Léa acorda cedo. {{Bom dia|bom dia}}, Rio de Janeiro! Ela pega a mochila e sai para explorar a cidade.",
      "— {{Até logo|até logo}}! — diz ela ao recepcionista do hostel, animada.",
    ],
  },
  {
    id: "u2", title: "Capítulo 2 — Pão de queijo",
    paragraphs: [
      "Léa entra em uma padaria pequena perto da praia.",
      "— Bom dia! Um pão de queijo, {{por favor|por favor}} — ela pede ao vendedor.",
      "O vendedor responde muito rápido, e Léa não entende nada.",
      "— {{Desculpa|desculpa}}... {{você fala francês?|você fala francês?}} — ela pergunta, um pouco nervosa.",
      "— Não, mas calma! — ele sorri e repete mais devagar.",
      "— {{Eu não falo português|eu não falo português}} muito bem ainda. Pode {{fala mais devagar|fala mais devagar}}?",
      "— {{Sim|sim}}, claro! — ele repete cada palavra, com paciência.",
      "Léa entende tudo agora e paga o pão de queijo. — {{Obrigada|obrigada}}! — ela diz, feliz.",
    ],
  },
  {
    id: "u3", title: "Capítulo 3 — O mercado de rua",
    paragraphs: [
      "No mercado de rua, Léa vê frutas coloridas em uma banca.",
      "— {{Quanto custa?|quanto custa?}} — ela pergunta, apontando para as mangas.",
      "— {{Um|um}} real cada! — diz a vendedora, sorrindo.",
      "Léa pensa um instante e pede: — {{Dois, por favor|dois, por favor}}.",
      "— Só {{dois|dois}}? Leve {{três|três}}, fica mais barato! — insiste a vendedora.",
      "Léa concorda e paga com uma nota de {{dez|dez}} reais, feliz com o negócio.",
    ],
  },
  {
    id: "u4", title: "Capítulo 4 — Jantar brasileiro",
    paragraphs: [
      "À noite, Léa janta em um restaurante simples perto da pousada.",
      "O garçom traz o cardápio. — {{Eu queria um café|eu queria um café}} e {{o pão|o pão}} de alho, por favor — ela pede.",
      "— E para beber? {{A água|a água}} está incluída — explica o garçom.",
      "Ela avisa também: — {{Eu sou vegetariano|eu sou vegetariano}}, não como carne.",
      "O prato chega e ela prova. — Nossa, {{está delicioso|está delicioso}}! — ela diz, surpresa.",
      "No fim da refeição, ela chama o garçom: — {{A conta, por favor|a conta, por favor}}.",
    ],
  },
  {
    id: "u5", title: "Capítulo 5 — Rumo à praia",
    paragraphs: [
      "Depois do almoço, Léa quer visitar a praia, mas se perde nas ruas estreitas.",
      "— Com licença, {{onde fica a praia?|onde fica a praia?}} — ela pergunta a um senhor.",
      "— Vire {{à direita|à direita}} na próxima esquina, depois {{à esquerda|à esquerda}}. É {{perto|perto}} daqui — ele explica.",
      "Léa segue as instruções, mas se confunde de novo entre as vielas.",
      "— Acho que {{estou perdido|estou perdido}}... — ela murmura, procurando uma referência.",
      "Ela para outra pessoa: — {{Onde fica o banheiro?|onde fica o banheiro?}} Preciso de um antes da praia!",
      "Alguns minutos depois, Léa chega enfim {{a praia|a praia}} e respira o ar do mar.",
    ],
  },
  {
    id: "u6", title: "Capítulo 6 — Táxi até o centro",
    paragraphs: [
      "No dia seguinte, Léa pensa em pegar {{o ônibus|o ônibus}}, mas as linhas são complicadas.",
      "Ela decide parar {{o táxi|o táxi}} amarelo na esquina.",
      "— {{Eu vou para o centro|eu vou para o centro}} — ela diz ao motorista, entrando no carro.",
      "— {{Quanto tempo?|quanto tempo?}} — ela pergunta, curiosa com o trânsito.",
      "— Uns vinte minutos — responde ele, sorrindo pelo retrovisor.",
      "Perto do destino, Léa pede: — {{Pode me levar?|pode me levar?}} Até a praça principal, {{para aqui, por favor|para aqui, por favor}}!",
    ],
  },
  {
    id: "u7", title: "Capítulo 7 — A pousada",
    paragraphs: [
      "No fim da tarde, Léa encontra {{a pousada|a pousada}} onde vai dormir.",
      "— Boa noite! Eu fiz uma reserva para {{duas noites|duas noites}} — ela explica na recepção.",
      "O recepcionista confirma e entrega {{a chave|a chave}} do quarto número doze.",
      "— {{O quarto|o quarto}} é simples, mas confortável — ele diz, sorrindo.",
      "Léa pergunta ainda: — {{Tem wi-fi?|tem wi-fi?}}",
      "— Sim, a senha está na parede. E {{o café da manhã|o café da manhã}} é servido às sete horas.",
    ],
  },
  {
    id: "u8", title: "Capítulo 8 — Artesanato e negociação",
    paragraphs: [
      "No mercado de artesanato, Léa vê uma linda rede colorida.",
      "— Quanto custa? — pergunta ela ao vendedor.",
      "— Cento e vinte reais — ele responde.",
      "— {{Muito caro!|muito caro!}} — exclama Léa, surpresa com o preço.",
      "— É {{caro|caro}} mesmo, mas é feita à mão. {{Tem desconto?|tem desconto?}} — ela pergunta, tentando negociar.",
      "— Para você, cem reais — ele sorri.",
      "Léa verifica {{o dinheiro|o dinheiro}} na carteira, mas não tem o suficiente em espécie.",
      "— {{Aceita cartão?|aceita cartão?}} — ela pergunta.",
      "— Aceito sim!",
      "— Então {{eu vou levar|eu vou levar}}! — ela decide, feliz com a compra.",
    ],
  },
  {
    id: "u9", title: "Capítulo 9 — Um susto",
    paragraphs: [
      "Uma manhã, Léa não se sente bem.",
      "Ela acorda com dor de cabeça e febre. — Acho que {{estou doente|estou doente}} — ela pensa, preocupada.",
      "Ela procura o passaporte para ir à farmácia, mas não encontra. — {{Perdi meu passaporte|perdi meu passaporte}}! — ela exclama, em pânico.",
      "Ela corre até a recepção. — {{Me ajuda, por favor|me ajuda, por favor}}! {{Não estou bem|não estou bem}} e perdi meus documentos!",
      "O recepcionista tenta acalmá-la: — {{Cuidado!|cuidado!}}, respira fundo. Vamos resolver isso juntos.",
      "Momentos depois, alguém grita na rua: — {{Socorro!|socorro!}} — mas era só um susto, um cachorro fugiu de uma loja.",
      "No fim, o passaporte estava dentro da mochila o tempo todo. Léa respira aliviada.",
    ],
  },
  {
    id: "u10", title: "Capítulo 10 — Até a próxima, Brasil",
    paragraphs: [
      "No último dia, Léa senta na areia e observa o pôr do sol.",
      "— {{A praia é linda|a praia é linda}} — ela pensa, sorrindo sozinha.",
      "Ela conhece Marcos, um brasileiro simpático que trabalha na pousada ao lado.",
      "— {{Você é muito gentil|você é muito gentil}} — ela diz, agradecendo por toda a ajuda durante a viagem.",
      "— {{Beleza|beleza}}! Foi um prazer te ajudar — ele responde.",
      "Léa conta sobre sua viagem: as praias, as pessoas, a comida. — {{Eu gosto|eu gosto}} muito daqui, sabe?",
      "— {{Que legal!|que legal!}} Volta {{amanhã|amanhã}}? Quer dizer... outro dia! — ele brinca.",
      "Léa ri e responde, com o coração cheio: — {{Eu amo o Brasil|eu amo o brasil}}!",
    ],
  },
];

/* Traduction française, ligne par ligne. Les segments marqués reprennent
   les mêmes clés que le texte portugais : tant que le mot n'a pas été
   retrouvé, sa traduction reste masquée — sinon la traduction donnerait
   la réponse et il n'y aurait plus rien à chercher. */
const TRANSLATIONS = {
  u1: [
    "Léa descend de l'avion à Rio de Janeiro. Une femme lui sourit dans la file.",
    "— {{Salut|oi}} ! {{Ça va ?|tudo bem?}} — demande la femme.",
    "— {{Ça va bien|tudo bem}}, merci ! — répond Léa, un peu fatiguée du voyage.",
    "La femme poursuit, curieuse : — {{Comment tu t'appelles ?|como você se chama?}}",
    "— Je m'appelle Léa. {{Je suis français|eu sou francês}}… enfin, française ! — elle rit de sa propre confusion.",
    "— {{Enchantée|prazer}}, Léa ! Bienvenue au Brésil.",
    "Le lendemain, Léa se réveille tôt. {{Bonjour|bom dia}}, Rio de Janeiro ! Elle prend son sac à dos et sort explorer la ville.",
    "— {{À bientôt|até logo}} ! — dit-elle au réceptionniste de l'auberge, tout enjouée.",
  ],
  u2: [
    "Léa entre dans une petite boulangerie près de la plage.",
    "— Bonjour ! Un pão de queijo, {{s'il vous plaît|por favor}} — demande-t-elle au vendeur.",
    "Le vendeur répond très vite, et Léa ne comprend rien.",
    "— {{Pardon|desculpa}}… {{vous parlez français ?|você fala francês?}} — demande-t-elle, un peu nerveuse.",
    "— Non, mais pas de panique ! — il sourit et répète plus lentement.",
    "— {{Je ne parle pas portugais|eu não falo português}} très bien pour l'instant. Vous pouvez {{parler plus lentement|fala mais devagar}} ?",
    "— {{Oui|sim}}, bien sûr ! — il répète chaque mot, patiemment.",
    "Léa comprend tout maintenant et paie son pão de queijo. — {{Merci|obrigada}} ! — dit-elle, ravie.",
  ],
  u3: [
    "Au marché de rue, Léa voit des fruits colorés sur un étal.",
    "— {{Combien ça coûte ?|quanto custa?}} — demande-t-elle en montrant les mangues.",
    "— {{Un|um}} real pièce ! — dit la vendeuse en souriant.",
    "Léa réfléchit un instant et demande : — {{Deux, s'il vous plaît|dois, por favor}}.",
    "— Seulement {{deux|dois}} ? Prenez-en {{trois|três}}, ça revient moins cher ! — insiste la vendeuse.",
    "Léa accepte et paie avec un billet de {{dix|dez}} reais, contente de son affaire.",
  ],
  u4: [
    "Le soir, Léa dîne dans un restaurant simple près de l'auberge.",
    "Le serveur apporte la carte. — {{Je voudrais un café|eu queria um café}} et {{le pain|o pão}} à l'ail, s'il vous plaît — demande-t-elle.",
    "— Et à boire ? {{L'eau|a água}} est comprise — explique le serveur.",
    "Elle prévient aussi : — {{Je suis végétarien|eu sou vegetariano}}, je ne mange pas de viande.",
    "Le plat arrive et elle goûte. — Waouh, {{c'est délicieux|está delicioso}} ! — dit-elle, surprise.",
    "À la fin du repas, elle appelle le serveur : — {{L'addition, s'il vous plaît|a conta, por favor}}.",
  ],
  u5: [
    "Après le déjeuner, Léa veut aller à la plage, mais elle se perd dans les ruelles étroites.",
    "— Excusez-moi, {{où est la plage ?|onde fica a praia?}} — demande-t-elle à un monsieur.",
    "— Tournez {{à droite|à direita}} au prochain coin de rue, puis {{à gauche|à esquerda}}. C'est {{près|perto}} d'ici — explique-t-il.",
    "Léa suit les indications, mais s'embrouille de nouveau entre les venelles.",
    "— Je crois que {{je suis perdu|estou perdido}}… — murmure-t-elle en cherchant un repère.",
    "Elle arrête quelqu'un d'autre : — {{Où sont les toilettes ?|onde fica o banheiro?}} Il m'en faut avant la plage !",
    "Quelques minutes plus tard, Léa arrive enfin à {{la plage|a praia}} et respire l'air du large.",
  ],
  u6: [
    "Le lendemain, Léa pense prendre {{le bus|o ônibus}}, mais les lignes sont compliquées.",
    "Elle décide d'arrêter {{le taxi|o táxi}} jaune au coin de la rue.",
    "— {{Je vais au centre-ville|eu vou para o centro}} — dit-elle au chauffeur en montant dans la voiture.",
    "— {{Combien de temps ?|quanto tempo?}} — demande-t-elle, intriguée par la circulation.",
    "— Une vingtaine de minutes — répond-il en souriant dans le rétroviseur.",
    "Près de l'arrivée, Léa demande : — {{Pouvez-vous m'emmener ?|pode me levar?}} Jusqu'à la place principale, {{arrêtez ici, s'il vous plaît|para aqui, por favor}} !",
  ],
  u7: [
    "En fin d'après-midi, Léa trouve {{l'auberge|a pousada}} où elle va dormir.",
    "— Bonsoir ! J'ai réservé pour {{deux nuits|duas noites}} — explique-t-elle à la réception.",
    "Le réceptionniste confirme et lui remet {{la clé|a chave}} de la chambre numéro douze.",
    "— {{La chambre|o quarto}} est simple, mais confortable — dit-il en souriant.",
    "Léa demande encore : — {{Il y a du wifi ?|tem wi-fi?}}",
    "— Oui, le mot de passe est affiché au mur. Et {{le petit-déjeuner|o café da manhã}} est servi à sept heures.",
  ],
  u8: [
    "Au marché d'artisanat, Léa voit un magnifique hamac coloré.",
    "— Combien ça coûte ? — demande-t-elle au vendeur.",
    "— Cent vingt reais — répond-il.",
    "— {{Trop cher !|muito caro!}} — s'exclame Léa, surprise par le prix.",
    "— C'est vrai que c'est {{cher|caro}}, mais c'est fait à la main. {{Il y a une réduction ?|tem desconto?}} — demande-t-elle en tentant de négocier.",
    "— Pour vous, cent reais — sourit-il.",
    "Léa vérifie {{l'argent|o dinheiro}} dans son portefeuille, mais elle n'a pas assez de liquide.",
    "— {{Vous acceptez la carte ?|aceita cartão?}} — demande-t-elle.",
    "— Oui, bien sûr !",
    "— Alors {{je le prends|eu vou levar}} ! — décide-t-elle, contente de son achat.",
  ],
  u9: [
    "Un matin, Léa ne se sent pas bien.",
    "Elle se réveille avec mal à la tête et de la fièvre. — Je crois que {{je suis malade|estou doente}} — pense-t-elle, inquiète.",
    "Elle cherche son passeport pour aller à la pharmacie, mais ne le trouve pas. — {{J'ai perdu mon passeport|perdi meu passaporte}} ! — s'exclame-t-elle, paniquée.",
    "Elle court jusqu'à la réception. — {{Aidez-moi, s'il vous plaît|me ajuda, por favor}} ! {{Je ne vais pas bien|não estou bem}} et j'ai perdu mes papiers !",
    "Le réceptionniste essaie de la calmer : — {{Attention !|cuidado!}}, respirez à fond. On va régler ça ensemble.",
    "Quelques instants plus tard, quelqu'un crie dans la rue : — {{Au secours !|socorro!}} — mais ce n'était qu'une frayeur, un chien s'était échappé d'une boutique.",
    "Finalement, le passeport était resté dans le sac à dos depuis le début. Léa souffle, soulagée.",
  ],
  u10: [
    "Le dernier jour, Léa s'assoit sur le sable et regarde le coucher de soleil.",
    "— {{La plage est belle|a praia é linda}} — pense-t-elle en souriant toute seule.",
    "Elle rencontre Marcos, un Brésilien sympathique qui travaille à l'auberge d'à côté.",
    "— {{Tu es très gentil|você é muito gentil}} — dit-elle, en le remerciant pour toute son aide pendant le voyage.",
    "— {{Nickel|beleza}} ! Ça m'a fait plaisir de t'aider — répond-il.",
    "Léa raconte son voyage : les plages, les gens, la cuisine. — {{J'aime|eu gosto}} beaucoup cet endroit, tu sais ?",
    "— {{Trop bien !|que legal!}} Tu reviens {{demain|amanhã}} ? Enfin… un autre jour ! — plaisante-t-il.",
    "Léa rit et répond, le cœur plein : — {{J'adore le Brésil|eu amo o brasil}} !",
  ],
};

/* Questions de compréhension : on ne valide pas un chapitre seulement
   parce qu'on a traduit des mots isolés, mais parce qu'on a suivi
   l'histoire. Les réponses sont en français, la bonne est la première
   du tableau (elles sont mélangées à l'affichage). */
const QUIZZES = {
  u1: [
    { q: "Que répond Léa quand on lui demande comment elle s'appelle ?", a: ["Elle donne son nom et dit qu'elle est française", "Elle répond qu'elle ne comprend pas", "Elle demande son chemin"] },
    { q: "À qui dit-elle « até logo » ?", a: ["Au réceptionniste de l'auberge", "À la vendeuse du marché", "Au chauffeur de taxi"] },
  ],
  u2: [
    { q: "Pourquoi Léa ne comprend pas le vendeur ?", a: ["Il répond trop vite", "Il parle anglais", "Il chuchote"] },
    { q: "Que lui demande-t-elle alors ?", a: ["De parler plus lentement", "De baisser le prix", "De répéter en anglais"] },
  ],
  u3: [
    { q: "Combien coûte une mangue ?", a: ["Un real", "Dix reais", "Trois reais"] },
    { q: "Que conseille la vendeuse ?", a: ["D'en prendre trois, c'est moins cher", "De revenir demain", "De payer par carte"] },
  ],
  u4: [
    { q: "Que commande Léa à boire ?", a: ["Un café", "Une bière", "Un jus de fruit"] },
    { q: "Pourquoi précise-t-elle qu'elle est végétarienne ?", a: ["Pour ne pas avoir de viande", "Parce qu'elle est allergique", "Pour obtenir une réduction"] },
  ],
  u5: [
    { q: "Quel chemin lui indique le monsieur ?", a: ["À droite, puis à gauche", "Tout droit, puis à droite", "À gauche, puis tout droit"] },
    { q: "Que cherche Léa juste avant la plage ?", a: ["Les toilettes", "Une pharmacie", "Un restaurant"] },
  ],
  u6: [
    { q: "Pourquoi renonce-t-elle au bus ?", a: ["Les lignes sont compliquées", "Il est trop cher", "Il n'y en a pas"] },
    { q: "Combien de temps dure le trajet ?", a: ["Une vingtaine de minutes", "Une heure", "Cinq minutes"] },
  ],
  u7: [
    { q: "Pour combien de nuits a-t-elle réservé ?", a: ["Deux nuits", "Une nuit", "Trois nuits"] },
    { q: "À quelle heure est servi le petit-déjeuner ?", a: ["À sept heures", "À huit heures", "À six heures"] },
  ],
  u8: [
    { q: "Quel prix annonce d'abord le vendeur ?", a: ["Cent vingt reais", "Cent reais", "Quatre-vingts reais"] },
    { q: "Comment Léa paie-t-elle finalement ?", a: ["Par carte", "En espèces", "Elle renonce à l'acheter"] },
  ],
  u9: [
    { q: "Pourquoi Léa panique-t-elle ?", a: ["Elle ne trouve plus son passeport", "Elle a perdu son argent", "Elle a raté son avion"] },
    { q: "Où était le passeport, finalement ?", a: ["Dans son sac à dos", "À la réception", "Au commissariat"] },
  ],
  u10: [
    { q: "Qui est Marcos ?", a: ["Un Brésilien qui travaille à la pousada d'à côté", "Le chauffeur de taxi", "Le vendeur du marché"] },
    { q: "Que répond Léa pour finir ?", a: ["Qu'elle adore le Brésil", "Qu'elle ne reviendra pas", "Qu'elle a froid"] },
  ],
};

/* Les paragraphes sont regroupés en pages courtes : une page de livre
   se lit d'un coup d'œil, et le chapitre avance page après page. */
function paginate(paragraphs, maxChars = 300) {
  const pages = [];
  let cur = [], len = 0;
  paragraphs.forEach((p, i) => {
    const clean = p.replace(/\{\{([^}|]+)(\|[^}]+)?\}\}/g, "$1");
    if (cur.length && len + clean.length > maxChars) { pages.push(cur); cur = []; len = 0; }
    cur.push(i);
    len += clean.length;
  });
  if (cur.length) pages.push(cur);
  return pages;
}

STORIES.forEach((s) => {
  s.tokens = s.paragraphs.map(parseStoryParagraph);
  s.targetKeys = [];
  s.tokens.forEach((tokens) => tokens.forEach((t) => {
    if (t.type === "word" && t.item && !s.targetKeys.includes(t.key)) s.targetKeys.push(t.key);
  }));
  s.fr = TRANSLATIONS[s.id] || [];
  s.frTokens = s.fr.map(parseStoryParagraph);
  s.pages = paginate(s.paragraphs);
  s.quiz = QUIZZES[s.id] || [];
  /* Le texte nu de chaque page, pour la lecture à voix haute. */
  s.pageText = s.pages.map((idxs) => idxs
    .map((i) => s.paragraphs[i].replace(/\{\{([^}|]+)(\|[^}]+)?\}\}/g, "$1").replace(/^—\s*/, ""))
    .join(" "));
});

export const STORY_BONUS_XP = 40;
export const STORY_BONUS_GEMS = 30;
export const HINT_PRICE = 10;
