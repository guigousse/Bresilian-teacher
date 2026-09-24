/* ==================================================================
   LA BOÎTE À SOUVENIRS — ce qu'on trouve dans les coffres en plus des
   gemmes : des objets de l'histoire de Dalva, et de petits papiers
   portant une expression brésilienne.

   Chaque souvenir ne peut sortir d'un coffre qu'une fois la page
   « after » lue : il prolonge l'histoire sans jamais la devancer.
   Les petits papiers, eux, entrent dans la révision espacée comme le
   reste du vocabulaire.
   ================================================================== */

export const TIERS = {
  commun:     { label: "Commun",     glow: "#d6b98c", ring: "border-stone-300",   chip: "bg-stone-100 text-stone-600",   text: "text-stone-600" },
  rare:       { label: "Rare",       glow: "#38bdf8", ring: "border-sky-400",     chip: "bg-sky-100 text-sky-700",       text: "text-sky-600" },
  epique:     { label: "Épique",     glow: "#a855f7", ring: "border-purple-400",  chip: "bg-purple-100 text-purple-700", text: "text-purple-600" },
  legendaire: { label: "Légendaire", glow: "#f59e0b", ring: "border-amber-400",   chip: "bg-amber-100 text-amber-800",   text: "text-amber-600" },
};
export const TIER_ORDER = ["commun", "rare", "epique", "legendaire"];

/* --- Les petits papiers : des expressions qu'aucune leçon n'enseigne */

export const PAPERS = [
  /* communs */
  { id: "p01", rarity: "commun", pt: "valeu!", fr: "merci ! (entre amis)", ph: "va-LÉ-ou",
    note: "Le merci de tous les jours entre amis. Littéralement « ça a valu » — sous-entendu : le coup." },
  { id: "p02", rarity: "commun", pt: "nossa!", fr: "waouh !", ph: "NO-sa",
    note: "Contraction de « Nossa Senhora », Notre-Dame. Surprise, admiration, choc : tout passe par nossa." },
  { id: "p03", rarity: "commun", pt: "tá ligado?", fr: "tu captes ?", ph: "TA li-GA-dou",
    note: "« Tu es branché ? » Le tic de langage des jeunes de Rio et de São Paulo, placé en fin de phrase." },
  { id: "p04", rarity: "commun", pt: "fica tranquilo", fr: "t'inquiète", ph: "FI-ka tran-KOUI-lou",
    note: "La phrase qu'on entend dix fois par jour au Brésil — souvent juste avant un léger retard." },
  { id: "p05", rarity: "commun", pt: "bater papo", fr: "papoter", ph: "ba-TÊR PA-pou",
    note: "« Battre la causette ». Un bate-papo, c'est une bonne discussion — et aussi une conversation en ligne." },
  { id: "p06", rarity: "commun", pt: "puxa vida!", fr: "mince alors !", ph: "POU-cha VI-da",
    note: "« Tire la vie ! » L'exclamation de la déception gentille, celle qu'on dit à un enfant qui a fait tomber sa glace." },
  { id: "p07", rarity: "commun", pt: "fazer hora", fr: "tuer le temps", ph: "fa-ZÊR O-ra",
    note: "« Faire l'heure » : traîner un peu quelque part en attendant autre chose." },
  { id: "p08", rarity: "commun", pt: "a saideira", fr: "le dernier verre", ph: "a sa-ï-DÉ-ï-ra",
    note: "Celui qu'on commande en jurant que c'est le dernier. Il ne l'est presque jamais." },
  { id: "p09", rarity: "commun", pt: "o boteco", fr: "le petit bar du coin", ph: "ou bou-TÈ-kou",
    note: "Un comptoir, des tables en plastique sur le trottoir, une bière très froide : le boteco est le salon des Brésiliens." },
  { id: "p10", rarity: "commun", pt: "oxente!", fr: "ben ça alors !", ph: "o-CHEN-tchi",
    note: "L'interjection de Bahia et du Nordeste. Si on l'entend, on n'est plus à Rio." },

  /* rares */
  { id: "p11", rarity: "rare", pt: "pão-duro", fr: "radin", ph: "PA-on DOU-rou",
    note: "« Pain dur » : quelqu'un qui ne partagerait même pas une miette." },
  { id: "p12", rarity: "rare", pt: "cara de pau", fr: "culotté", ph: "KA-ra dji PA-ou",
    note: "« Visage de bois » : quelqu'un qui ne rougit jamais, même pris la main dans le sac." },
  { id: "p13", rarity: "rare", pt: "quebrar o galho", fr: "dépanner", ph: "ke-BRAR ou GA-illou",
    note: "« Casser la branche » : rendre le petit service qui tire quelqu'un d'affaire." },
  { id: "p14", rarity: "rare", pt: "dar um jeito", fr: "trouver une solution", ph: "DAR oun JÉ-ï-tou",
    note: "La réponse à presque tous les problèmes au Brésil : « on va trouver un moyen »." },
  { id: "p15", rarity: "rare", pt: "pagar o pato", fr: "payer les pots cassés", ph: "pa-GAR ou PA-tou",
    note: "« Payer le canard » : être puni pour la faute de quelqu'un d'autre." },
  { id: "p16", rarity: "rare", pt: "chover no molhado", fr: "enfoncer une porte ouverte", ph: "chou-VÊR nou mou-ILLA-dou",
    note: "« Pleuvoir sur le mouillé » : dire ce que tout le monde sait déjà." },
  { id: "p17", rarity: "rare", pt: "mão na roda", fr: "bien pratique", ph: "MA-on na HO-da",
    note: "« Une main sur la roue » : l'aide qui arrive exactement au bon moment." },
  { id: "p18", rarity: "rare", pt: "ficar de molho", fr: "rester au repos", ph: "fi-KAR dji MO-illou",
    note: "« Rester à tremper » : garder le lit, en général parce qu'on est malade." },
  { id: "p19", rarity: "rare", pt: "um frio na barriga", fr: "le trac", ph: "oun FRI-ou na ba-HI-ga",
    note: "« Un froid dans le ventre » : les papillons d'avant un rendez-vous ou un examen." },
  { id: "p20", rarity: "rare", pt: "estar com a pulga atrás da orelha", fr: "avoir des soupçons", ph: "is-TAR kon a POUL-ga a-TRAS da o-RÉ-illa",
    note: "Presque la même image qu'en français — « avoir la puce à l'oreille » — mais au Brésil, la puce est derrière." },
  { id: "p21", rarity: "rare", pt: "a vaca foi pro brejo", fr: "tout est fichu", ph: "a VA-ka FOÏ prou BRÉ-jou",
    note: "« La vache est partie au marais » : il n'y a plus rien à sauver." },

  /* épiques */
  { id: "p22", rarity: "epique", pt: "saudade", fr: "le manque", ph: "sa-ou-DA-dji",
    note: "Le mot que les Brésiliens disent intraduisible : la présence d'une absence. On a saudade d'une personne, d'un lieu, d'une époque — parfois même de ce qu'on n'a pas vécu." },
  { id: "p23", rarity: "epique", pt: "matar a saudade", fr: "retrouver enfin", ph: "ma-TAR a sa-ou-DA-dji",
    note: "« Tuer la saudade » : revoir enfin quelqu'un, retourner enfin quelque part, remanger enfin un plat qui manquait." },
  { id: "p24", rarity: "epique", pt: "jeitinho", fr: "la débrouille", ph: "jé-ï-TCHI-nhou",
    note: "Le « jeitinho brasileiro » : trouver une façon de s'en sortir — souvent en contournant la règle, toujours avec le sourire." },
  { id: "p25", rarity: "epique", pt: "cafuné", fr: "caresse dans les cheveux", ph: "ka-fou-NÉ",
    note: "Passer doucement les doigts dans les cheveux de quelqu'un qu'on aime. Un geste courant, et un mot que le français n'a pas." },
  { id: "p26", rarity: "epique", pt: "fazer uma vaquinha", fr: "faire une cagnotte", ph: "fa-ZÊR OU-ma va-KI-nha",
    note: "« Faire une petite vache ». On raconte que des supporters des années 1920 réunissaient des primes selon les numéros du jogo do bicho, une loterie où la vache porte le 25." },
];

/* --- Les souvenirs : des objets de l'histoire de Dalva -------------- */

export const SOUVENIRS = [
  { id: "m01", rarity: "rare", kind: "flower", after: "u3", name: "A flor seca",
    pt: "Uma flor de ipê-amarelo, prensada entre duas páginas. Embaixo, a lápis: « O primeiro dia. »",
    fr: "Une fleur d'ipê jaune, pressée entre deux pages. En dessous, au crayon : « Le premier jour. »",
    caption: "Tombée du carnet, dans la chambre douze." },
  { id: "m02", rarity: "rare", kind: "key", after: "u3", name: "A chave do quarto doze",
    pt: "Uma chave de ferro com o número doze. No chaveiro de couro, quase apagadas, duas letras: D. e I.",
    fr: "Une clé en fer avec le numéro douze. Sur le porte-clés en cuir, presque effacées, deux lettres : D. et I.",
    caption: "L'auberge a changé toutes ses serrures. Pas celle-là." },
  { id: "m03", rarity: "epique", kind: "letter", after: "u11", name: "O bilhete de sexta-feira",
    pt: "« Se ela não vier sexta, eu volto sábado. Se não vier sábado, eu volto sempre. »",
    fr: "« Si elle ne vient pas vendredi, je reviens samedi. Si elle ne vient pas samedi, je reviendrai toujours. »",
    caption: "Plié en quatre, glissé dans la reliure du carnet." },
  { id: "m04", rarity: "rare", kind: "recipe", after: "u13", name: "A receita da manga",
    pt: "Doce de manga: três mangas maduras, uma xícara de açúcar, um limão. Mexer até a colher ficar em pé. Servir no sábado.",
    fr: "Confiture de mangue : trois mangues mûres, une tasse de sucre, un citron. Remuer jusqu'à ce que la cuillère tienne debout. Servir le samedi.",
    caption: "Au dos d'un sachet de sucre, rendu avec la monnaie au marché." },
  { id: "m05", rarity: "epique", kind: "ticket", after: "u14", name: "A passagem de navio",
    pt: "Navio Estrela do Sul. Salvador — Marselha. Terceira classe. Partida: 14 de março de 1962. Uma passageira.",
    fr: "Paquebot Estrela do Sul. Salvador — Marseille. Troisième classe. Départ : 14 mars 1962. Une passagère.",
    caption: "Un talon de billet jauni, coincé sous la couverture du carnet." },
  { id: "m06", rarity: "rare", kind: "map", after: "u5", name: "O mapa rasgado",
    pt: "Um pedaço de mapa de Salvador. Uma rua marcada a caneta — Rua do Carmo — e uma cruz ao lado da igreja azul.",
    fr: "Un morceau de plan de Salvador. Une rue marquée au stylo — rue do Carmo — et une croix à côté de l'église bleue.",
    caption: "Oublié par un voyageur dans le bus de minuit." },
  { id: "m07", rarity: "rare", kind: "ribbon", after: "u7", name: "A fita do Bonfim",
    pt: "Uma fita desbotada do Senhor do Bonfim. Dizem que, quando ela cai sozinha do pulso, o pedido se realiza. Esta nunca caiu.",
    fr: "Un ruban délavé du Senhor do Bonfim. On dit que, quand il tombe tout seul du poignet, le vœu se réalise. Celui-ci n'est jamais tombé.",
    caption: "Noué à la rampe de l'escalier de l'auberge, à Salvador." },
  { id: "m08", rarity: "epique", kind: "photo", after: "u8", name: "O verso da fotografia",
    pt: "Atrás da foto, uma letra redonda: « D. e I., na porta de casa. O último domingo. »",
    fr: "Au dos de la photo, une écriture ronde : « D. et I., devant la maison. Le dernier dimanche. »",
    caption: "Léa ne l'avait pas vu en achetant la photo." },
  { id: "m09", rarity: "rare", kind: "sheet", after: "u16", name: "A lista da escola",
    pt: "Uma folha da escola da esquina, 1961. Vinte e dois nomes de alunos. Ao lado de cada um, a professora escreveu: « já lê ».",
    fr: "Une feuille de l'école du coin, 1961. Vingt-deux noms d'élèves. À côté de chacun, l'institutrice a écrit : « sait lire ».",
    caption: "Retrouvée dans un tiroir de la cuisine, sous les recettes." },
  { id: "m10", rarity: "legendaire", kind: "umbrella", after: "u17", name: "O guarda-chuva emprestado",
    pt: "Um guarda-chuva preto, com o cabo de madeira gasto. Na etiqueta, em francês: « Pour Iara. Je le rendrai. »",
    fr: "Un parapluie noir, au manche de bois usé. Sur l'étiquette, en français : « Pour Iara. Je le rendrai. »",
    caption: "Retrouvé par la mère de Léa dans le grenier de Marseille, après avoir vu la photo." },
  { id: "m11", rarity: "rare", kind: "cup", after: "u18", name: "A xícara quebrada",
    pt: "Os cacos da xícara que caiu. Nalva quis jogar fora. Iara pediu para guardar.",
    fr: "Les morceaux de la tasse tombée. Nalva voulait les jeter. Iara a demandé qu'on les garde.",
    caption: "Rangés dans une boîte à biscuits, sur le buffet." },
  { id: "m12", rarity: "rare", kind: "bracelet", after: "u19", name: "A pulseira do hospital",
    pt: "Pulseira de identificação: Iara S., noventa e dois anos. Quarto doze.",
    fr: "Bracelet d'identification : Iara S., quatre-vingt-douze ans. Chambre douze.",
    caption: "Encore la chambre douze." },
  { id: "m13", rarity: "epique", kind: "card", after: "u20", name: "O convite de sábado",
    pt: "Um papel escrito pela menina, com letra grande: « Almoço de sábado. Lugar da Léa: sempre. »",
    fr: "Un papier écrit par la petite fille, en grosses lettres : « Déjeuner du samedi. Place de Léa : toujours. »",
    caption: "Glissé dans le sac de Léa le jour du départ." },
  { id: "m14", rarity: "legendaire", kind: "letter", after: "u10", name: "O que a capa escondia",
    pt: "« Para quem vier depois: eu não fui embora sozinha. Procure em Manaus. Pergunte pelo Tomás. »",
    fr: "« Pour celle qui viendra après : je ne suis pas partie seule. Cherche à Manaus. Demande Tomás. »",
    caption: "La même dernière page — mais sous la colle, une ligne de plus." },
];

/* Les papiers deviennent des items de vocabulaire comme les autres. */
export const PAPER_ITEMS = PAPERS.map((p) => ({ pt: p.pt, fr: p.fr, ph: p.ph, paper: p.id }));
