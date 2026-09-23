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

STORIES.forEach((s) => {
  s.tokens = s.paragraphs.map(parseStoryParagraph);
  s.targetKeys = [];
  s.tokens.forEach((tokens) => tokens.forEach((t) => {
    if (t.type === "word" && t.item && !s.targetKeys.includes(t.key)) s.targetKeys.push(t.key);
  }));
});

export const STORY_BONUS_XP = 40;
export const STORY_BONUS_GEMS = 30;
