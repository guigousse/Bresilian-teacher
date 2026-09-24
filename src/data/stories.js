import { ALL_ITEMS } from "./units.js";

/* ==================================================================
   O CADERNO — une seule histoire en cinq livres de quatre pages.
   Une page par chapitre : on la débloque en terminant la leçon, on la
   lit, on retrouve ses mots, on répond aux questions. Le livre ne se
   referme que lorsque ses quatre pages sont faites, et il se termine
   toujours sur une question sans réponse.

   Syntaxe : {{texte affiché|clé pt exacte}} marque un mot testable ;
   la clé doit appartenir au chapitre de la page.
   ================================================================== */

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

export const BOOKS = [
  {
    id: "s1", title: "O caderno esquecido", subtitle: "Rio de Janeiro", emoji: "📓",
    color: "from-emerald-400 to-emerald-700",
    ending: "« Si je ne reviens pas, quelqu'un reviendra pour moi. » Et demain, justement, c'est vendredi.",
    pages: [
      {
        unit: "u1", title: "A chegada",
        hook: "« De retour » ? Léa n'a jamais mis les pieds au Brésil.",
        paragraphs: [
          "Léa desce do avião no Rio de Janeiro com uma mochila e o endereço de uma pousada velha.",
          "Na fila do táxi, uma mulher sorri para ela. — {{Oi|oi}}! {{Tudo bem?|tudo bem?}}",
          "— Tudo bem, obrigada — responde Léa. — {{Como você se chama?|como você se chama?}} — pergunta a mulher.",
          "— {{Meu nome é|meu nome é}} Léa. — {{De onde você é?|de onde você é?}} — {{Eu sou da França|eu sou da França}}.",
          "A mulher olha para ela um instante a mais do que o normal. — {{Bem-vindo|bem-vindo}} de volta — diz, e entra no táxi antes que Léa possa perguntar o que isso significa.",
        ],
        fr: [
          "Léa descend de l'avion à Rio de Janeiro avec un sac à dos et l'adresse d'une vieille auberge.",
          "Dans la file des taxis, une femme lui sourit. — {{Salut|oi}} ! {{Ça va ?|tudo bem?}}",
          "— Ça va, merci — répond Léa. — {{Comment tu t'appelles ?|como você se chama?}} — demande la femme.",
          "— {{Je m'appelle|meu nome é}} Léa. — {{D'où viens-tu ?|de onde você é?}} — {{Je viens de France|eu sou da França}}.",
          "La femme la regarde un instant de trop. — {{Bienvenue|bem-vindo}} de retour — dit-elle, avant de monter dans le taxi sans laisser à Léa le temps de demander ce que ça veut dire.",
        ],
        quiz: [
          { q: "Que dit la femme à Léa avant de partir ?", a: ["Bienvenue de retour", "À demain", "Bon voyage"] },
          { q: "D'où vient Léa ?", a: ["De France", "Du Portugal", "de Bahia"] },
        ],
      },
      {
        unit: "u2", title: "O quarto doze",
        hook: "Personne ne reste longtemps dans la chambre douze. Léa y monte quand même.",
        paragraphs: [
          "Na recepção da pousada, a moça fala rápido demais, e Léa perde metade das palavras.",
          "— {{Desculpa|desculpa}}, {{eu não entendo|eu não entendo}}. {{Fala mais devagar|fala mais devagar}}, {{por favor|por favor}}.",
          "— Claro — a moça respira e recomeça. — Quarto doze. É o único livre.",
          "— {{Pode repetir?|pode repetir?}} {{Eu não falo português|eu não falo português}} muito bem ainda.",
          "— Doze. E ninguém fica muito tempo lá — ela diz baixinho, como quem não queria ter dito.",
          "— {{O que significa?|o que significa?}} — pergunta Léa. A moça já está atendendo o telefone.",
        ],
        fr: [
          "À la réception de l'auberge, la jeune femme parle bien trop vite, et Léa perd la moitié des mots.",
          "— {{Pardon|desculpa}}, {{je ne comprends pas|eu não entendo}}. {{Parlez plus lentement|fala mais devagar}}, {{s'il vous plaît|por favor}}.",
          "— Bien sûr — elle respire et recommence. — Chambre douze. C'est la seule de libre.",
          "— {{Vous pouvez répéter ?|pode repetir?}} {{Je ne parle pas portugais|eu não falo português}} très bien pour l'instant.",
          "— Douze. Et personne n'y reste très longtemps — dit-elle tout bas, comme si elle regrettait déjà.",
          "— {{Qu'est-ce que ça veut dire ?|o que significa?}} — demande Léa. La jeune femme répond déjà au téléphone.",
        ],
        quiz: [
          { q: "Quelle chambre donne-t-on à Léa ?", a: ["La douze", "La deux", "La trente"] },
          { q: "Que laisse échapper la réceptionniste ?", a: ["Que personne n'y reste longtemps", "Que la chambre est la plus chère", "Qu'il n'y a pas d'eau chaude"] },
        ],
      },
      {
        unit: "u3", title: "Noventa reais",
        hook: "Un carnet, une fleur séchée, et une écriture qui n'est pas d'aujourd'hui.",
        paragraphs: [
          "— {{Quanto custa?|quanto custa?}} — pergunta Léa, tirando a carteira.",
          "— {{Trinta|trinta}} reais a noite. {{Três|três}} noites dá noventa.",
          "— Se pagar {{cinquenta|cinquenta}} adiantado, eu seguro o quarto — diz a moça.",
          "Léa conta as notas: uma de {{cem|cem}}, e recebe {{dez|dez}} de troco.",
          "A chave é pesada, antiga, com um {{um|um}} e um {{dois|dois}} gravados no metal.",
          "No quarto, a gaveta da mesinha não fecha direito. Léa puxa com força e alguma coisa cai no chão: um caderno, com uma flor seca entre as páginas.",
        ],
        fr: [
          "— {{Combien ça coûte ?|quanto custa?}} — demande Léa en sortant son portefeuille.",
          "— {{Trente|trinta}} reais la nuit. {{Trois|três}} nuits, ça fait quatre-vingt-dix.",
          "— Si vous payez {{cinquante|cinquenta}} d'avance, je vous garde la chambre — dit la jeune femme.",
          "Léa compte ses billets : un de {{cent|cem}}, et on lui rend {{dix|dez}} reais.",
          "La clé est lourde, ancienne, avec un {{un|um}} et un {{deux|dois}} gravés dans le métal.",
          "Dans la chambre, le tiroir de la table de chevet ferme mal. Léa tire d'un coup sec et quelque chose tombe par terre : un carnet, avec une fleur séchée entre les pages.",
        ],
        quiz: [
          { q: "Combien coûte une nuit ?", a: ["Trente reais", "Cinquante reais", "Dix reais"] },
          { q: "Que trouve Léa dans le tiroir ?", a: ["Un carnet avec une fleur séchée", "Une clé rouillée", "Une lettre déchirée"] },
        ],
      },
      {
        unit: "u11", title: "Sexta-feira, meio-dia",
        hook: "Le rendez-vous est noté pour vendredi midi. Et demain, c'est vendredi.",
        paragraphs: [
          "{{À noite|à noite}}, Léa abre o caderno na cama. Não há nomes, só horários.",
          "« {{Segunda-feira|segunda-feira}}, {{cedo|cedo}} : ela não veio. »",
          "« {{Sexta-feira|sexta-feira}}, {{meio-dia|meio-dia}}, na feira. Se eu não voltar, alguém volta por mim. »",
          "Léa olha o relógio. {{Que horas são?|que horas são?}} Quase {{meia-noite|meia-noite}}.",
          "Ela vira a página: o resto foi arrancado. Só sobrou uma linha, escrita {{de manhã|de manhã}}, com outra tinta: « Ela vai entender quando provar a manga. »",
          "Léa fecha o caderno devagar. Amanhã é sexta-feira.",
        ],
        fr: [
          "{{Le soir|à noite}}, Léa ouvre le carnet dans son lit. Aucun nom, seulement des horaires.",
          "« {{Lundi|segunda-feira}}, {{tôt|cedo}} : elle n'est pas venue. »",
          "« {{Vendredi|sexta-feira}}, {{midi|meio-dia}}, au marché. Si je ne reviens pas, quelqu'un reviendra pour moi. »",
          "Léa regarde la pendule. {{Quelle heure est-il ?|que horas são?}} Presque {{minuit|meia-noite}}.",
          "Elle tourne la page : le reste a été arraché. Il ne reste qu'une ligne, écrite {{le matin|de manhã}}, d'une autre encre : « Elle comprendra quand elle goûtera la mangue. »",
          "Léa referme le carnet lentement. Demain, c'est vendredi.",
        ],
        quiz: [
          { q: "Quel rendez-vous est noté dans le carnet ?", a: ["Vendredi, midi, au marché", "Lundi, tôt, à la plage", "Dimanche, minuit, à la gare"] },
          { q: "Quelle heure est-il quand Léa lit le carnet ?", a: ["Presque minuit", "Midi", "Tôt le matin"] },
        ],
      },
    ],
  },
  {
    id: "s2", title: "A mulher da feira", subtitle: "Rio de Janeiro", emoji: "🥭",
    color: "from-amber-400 to-orange-700",
    ending: "Une femme partie pour la France en 1962. La grand-mère de Léa est arrivée à Marseille cette année-là.",
    pages: [
      {
        unit: "u4", title: "O peixe com dendê",
        hook: "Le serveur a reconnu le carnet. Il n'a rien dit.",
        paragraphs: [
          "Antes de dormir, Léa desce para jantar. O restaurante da esquina tem quatro mesas e um ventilador cansado.",
          "{{O garçom|o garçom}} traz {{o cardápio|o cardápio}}. — Hoje tem {{peixe|o peixe}} com dendê.",
          "— Então o peixe, e {{a água|a água}}, por favor.",
          "Ela prova e fecha os olhos um segundo. — Nossa, {{está delicioso|está delicioso}}!",
          "— {{A conta, por favor|a conta, por favor}} — pede ela, e põe o caderno sobre a mesa.",
          "— {{Eu queria um café|eu queria um café}} também — acrescenta. Ele não responde. Está olhando a capa do caderno como quem reconhece um rosto.",
        ],
        fr: [
          "Avant d'aller dormir, Léa descend dîner. Le restaurant du coin a quatre tables et un ventilateur fatigué.",
          "{{Le serveur|o garçom}} apporte {{la carte|o cardápio}}. — Aujourd'hui il y a du {{poisson|o peixe}} au dendê.",
          "— Va pour le poisson, et {{de l'eau|a água}}, s'il vous plaît.",
          "Elle goûte et ferme les yeux une seconde. — Waouh, {{c'est délicieux|está delicioso}} !",
          "— {{L'addition, s'il vous plaît|a conta, por favor}} — demande-t-elle, en posant le carnet sur la table.",
          "— {{Je voudrais un café|eu queria um café}} aussi — ajoute-t-elle. Il ne répond pas. Il fixe la couverture du carnet comme on reconnaît un visage.",
        ],
        quiz: [
          { q: "Que commande Léa ?", a: ["Le poisson et de l'eau", "Le poulet et une bière", "Le riz et un jus"] },
          { q: "Comment réagit le serveur devant le carnet ?", a: ["Il se fige en le reconnaissant", "Il le range derrière le bar", "Il éclate de rire"] },
        ],
      },
      {
        unit: "u12", title: "A letra conhecida",
        hook: "Elle connaît cette écriture. Et elle ne veut pas dire d'où.",
        paragraphs: [
          "Na cozinha da pousada, uma senhora serve o café da manhã para três hóspedes e um gato.",
          "— {{O cafezinho|o cafezinho}} {{está quente|está quente}} — avisa, empurrando {{a xícara|a xícara}}. — {{Com açúcar|com açúcar}}?",
          "— Sim, obrigada. E {{o pão de queijo|o pão de queijo}}, por favor.",
          "A senhora corta {{o mamão|o mamão}} em fatias finas e senta-se na frente dela, o que não faz com os outros hóspedes.",
          "— {{Eu queria mais um|eu queria mais um}} — diz Léa, só para ganhar tempo, e abre o caderno sobre a mesa.",
          "A senhora para com a faca no ar. — Essa letra eu conheço — diz, e a voz não é mais a mesma. — Onde você achou isso?",
        ],
        fr: [
          "Dans la cuisine de l'auberge, une dame sert le petit-déjeuner à trois clients et un chat.",
          "— {{Le café|o cafezinho}} {{est chaud|está quente}} — prévient-elle en poussant {{la tasse|a xícara}}. — {{Avec du sucre|com açúcar}} ?",
          "— Oui, merci. Et {{un pain au fromage|o pão de queijo}}, s'il vous plaît.",
          "La dame coupe {{la papaye|o mamão}} en tranches fines et s'assoit en face d'elle, ce qu'elle ne fait pas avec les autres clients.",
          "— {{J'en voudrais un autre|eu queria mais um}} — dit Léa, juste pour gagner du temps, et elle ouvre le carnet sur la table.",
          "La dame s'arrête, le couteau en l'air. — Cette écriture, je la connais — dit-elle, et sa voix n'est plus la même. — Où avez-vous trouvé ça ?",
        ],
        quiz: [
          { q: "Que fait la dame qu'elle ne fait pas avec les autres clients ?", a: ["Elle s'assoit en face de Léa", "Elle refuse d'être payée", "Elle ferme la cuisine"] },
          { q: "Que reconnaît-elle ?", a: ["L'écriture du carnet", "Le sac de Léa", "La clé de la chambre"] },
        ],
      },
      {
        unit: "u13", title: "Ao meio-dia, na feira",
        hook: "« Elle comprendra quand elle goûtera la mangue. » C'était écrit dans le carnet.",
        paragraphs: [
          "Ao meio-dia, Léa atravessa {{a feira|a feira}} com o caderno debaixo do braço.",
          "Há pirâmides de {{manga|a manga}}, {{coco|o coco}} aberto na faca, cheiro de alho frito e rádio ligado alto.",
          "— {{Está maduro?|está maduro?}} — pergunta numa banca, só para ter uma desculpa de parar.",
          "— Esse aí? {{Me vê dois|me vê dois}} que eu escolho pra você — ri a vendedora. — {{Um quilo|um quilo}}?",
          "— {{Só isso|só isso}} — diz Léa, e apoia o caderno na caixa de frutas.",
          "A vendedora, uma senhora de lenço azul, olha o caderno, depois olha Léa. Não pergunta nada. Corta uma manga ao meio e estende metade.",
        ],
        fr: [
          "À midi, Léa traverse {{le marché|a feira}} avec le carnet sous le bras.",
          "Il y a des pyramides de {{mangues|a manga}}, des {{noix de coco|o coco}} ouvertes au couteau, une odeur d'ail frit et une radio à plein volume.",
          "— {{C'est mûr ?|está maduro?}} — demande-t-elle à un étal, juste pour avoir un prétexte de s'arrêter.",
          "— Celle-là ? {{Donnez-m'en deux|me vê dois}} et je vous les choisis — rit la vendeuse. — {{Un kilo|um quilo}} ?",
          "— {{Ce sera tout|só isso}} — dit Léa, en posant le carnet sur la caisse de fruits.",
          "La vendeuse, une dame au foulard bleu, regarde le carnet, puis regarde Léa. Elle ne demande rien. Elle coupe une mangue en deux et lui en tend la moitié.",
        ],
        quiz: [
          { q: "Pourquoi Léa demande-t-elle si c'est mûr ?", a: ["Pour avoir un prétexte de s'arrêter", "Parce qu'elle a faim", "Parce que le prix lui semble trop élevé"] },
          { q: "Que fait la vendeuse en voyant le carnet ?", a: ["Elle coupe une mangue et lui en tend la moitié", "Elle appelle la police", "Elle referme son étal"] },
        ],
      },
      {
        unit: "u14", title: "Mil novecentos e sessenta e dois",
        hook: "Mille neuf cent soixante-deux. Léa connaît cette date par cœur.",
        paragraphs: [
          "— {{Experimenta!|experimenta!}} — diz a senhora, com a metade da manga na mão.",
          "A fruta é {{doce|doce}} e um pouco {{azeda|azedo}} na ponta, como se guardasse duas lembranças ao mesmo tempo.",
          "— {{Gostoso|gostoso}}? — {{Eu adoro|eu adoro}} — responde Léa, e é verdade.",
          "— Tem uma que é bem melhor, mas só dá em Salvador. {{Eu prefiro|eu prefiro}} aquela — diz a senhora, limpando as mãos no avental.",
          "Léa sente a boca seca de repente. — {{Estou com sede|estou com sede}}.",
          "— Esse caderno — diz a senhora, sem levantar os olhos — era de uma moça que foi embora pra França em mil novecentos e sessenta e dois. Ninguém nunca mais soube dela.",
          "Léa fica muito quieta. A avó dela chegou em Marselha em mil novecentos e sessenta e dois.",
        ],
        fr: [
          "— {{Goûte !|experimenta!}} — dit la dame, la demi-mangue à la main.",
          "Le fruit est {{sucré|doce}} et un peu {{acide|azedo}} au bout, comme s'il gardait deux souvenirs à la fois.",
          "— {{Savoureux|gostoso}} ? — {{J'adore|eu adoro}} — répond Léa, et c'est vrai.",
          "— Il y en a une bien meilleure, mais elle ne pousse qu'à Salvador. {{Je préfère|eu prefiro}} celle-là — dit la dame en s'essuyant les mains sur son tablier.",
          "Léa a soudain la bouche sèche. — {{J'ai soif|estou com sede}}.",
          "— Ce carnet — dit la dame sans lever les yeux — était à une jeune femme qui est partie pour la France en mille neuf cent soixante-deux. Personne n'a jamais eu de ses nouvelles.",
          "Léa ne bouge plus. Sa grand-mère est arrivée à Marseille en mille neuf cent soixante-deux.",
        ],
        quiz: [
          { q: "Quel goût a la mangue ?", a: ["Sucrée, avec une pointe d'acidité", "Très amère", "Salée"] },
          { q: "Qu'apprend Léa sur le carnet ?", a: ["Il appartenait à une femme partie en France en 1962", "Il a été écrit par la vendeuse", "Il vient d'un hôtel de Rio"] },
        ],
      },
    ],
  },
  {
    id: "s3", title: "Rumo ao norte", subtitle: "Salvador", emoji: "🚌",
    color: "from-sky-400 to-indigo-700",
    ending: "Sur une photographie de 1960, une inconnue a exactement le visage de Léa.",
    pages: [
      {
        unit: "u5", title: "A rua do Carmo",
        hook: "La rue n'est pas à Rio. Elle est à deux mille kilomètres au nord.",
        paragraphs: [
          "No verso da última página do caderno há um endereço, escrito com pressa: {{a rua|a rua}} do Carmo, perto da igreja azul.",
          "Léa pergunta a um rapaz na padaria. — Vai {{em frente|em frente}} até {{a esquina|a esquina}}, depois {{à direita|à direita}}.",
          "Ela anda. A rua vira, desce, vira de novo. Vinte minutos depois, está exatamente no mesmo lugar.",
          "— {{Estou perdido|estou perdido}} — admite em voz alta, e um senhor sentado na porta levanta a cabeça.",
          "— Rua do Carmo? Não é {{à esquerda|à esquerda}} nem à direita, minha filha. É {{longe|longe}} — ele diz, e aponta o horizonte. — Fica em Salvador.",
        ],
        fr: [
          "Au dos de la dernière page du carnet il y a une adresse, écrite à la hâte : {{la rue|a rua}} do Carmo, près de l'église bleue.",
          "Léa demande à un jeune homme à la boulangerie. — Allez {{tout droit|em frente}} jusqu'au {{coin de rue|a esquina}}, puis {{à droite|à direita}}.",
          "Elle marche. La rue tourne, descend, tourne encore. Vingt minutes plus tard, elle est exactement au même endroit.",
          "— {{Je suis perdue|estou perdido}} — admet-elle à voix haute, et un monsieur assis sur le pas de sa porte lève la tête.",
          "— La rue do Carmo ? Ce n'est ni {{à gauche|à esquerda}} ni à droite, ma fille. C'est {{loin|longe}} — dit-il en montrant l'horizon. — C'est à Salvador.",
        ],
        quiz: [
          { q: "Que cherche Léa ?", a: ["Une adresse écrite au dos du carnet", "La plage la plus proche", "Une pharmacie"] },
          { q: "Pourquoi ne trouve-t-elle pas la rue ?", a: ["Elle est à Salvador, pas à Rio", "Elle a été démolie", "Elle a mal lu le nom"] },
        ],
      },
      {
        unit: "u6", title: "Vinte e oito horas",
        hook: "Vingt-huit heures de bus, et soixante ans de retard.",
        paragraphs: [
          "{{A rodoviária|a rodoviária}} do Rio às seis da tarde é um formigueiro de malas e despedidas.",
          "— Salvador, uma {{passagem|a passagem}} — pede Léa no guichê.",
          "— {{Ida e volta|ida e volta}}? — Só ida.",
          "— {{Quanto tempo?|quanto tempo?}} — Vinte e oito horas, se não chover.",
          "— {{Que horas sai?|que horas sai?}} — Saiu faz dois minutos. O próximo é à meia-noite.",
          "{{Estou atrasado|estou atrasado}}, pensa Léa, e ri sozinha: atrasada sessenta anos.",
          "{{O ônibus|o ônibus}} da meia-noite atravessa a noite inteira com as janelas embaçadas e um filme sem som na telinha da frente.",
        ],
        fr: [
          "{{La gare routière|a rodoviária}} de Rio à six heures du soir est une fourmilière de valises et d'adieux.",
          "— Salvador, un {{billet|a passagem}} — demande Léa au guichet.",
          "— {{Aller-retour|ida e volta}} ? — Aller simple.",
          "— {{Combien de temps ?|quanto tempo?}} — Vingt-huit heures, s'il ne pleut pas.",
          "— {{À quelle heure ça part ?|que horas sai?}} — C'est parti il y a deux minutes. Le prochain est à minuit.",
          "{{Je suis en retard|estou atrasado}}, pense Léa, et elle rit toute seule : en retard de soixante ans.",
          "{{Le bus|o ônibus}} de minuit traverse la nuit entière, vitres embuées, un film sans le son sur le petit écran à l'avant.",
        ],
        quiz: [
          { q: "Combien dure le trajet jusqu'à Salvador ?", a: ["Vingt-huit heures", "Six heures", "Trois jours"] },
          { q: "Pourquoi Léa rit-elle toute seule ?", a: ["Elle se dit qu'elle a soixante ans de retard", "Elle a pris le mauvais bus", "Elle a oublié son billet"] },
        ],
      },
      {
        unit: "u7", title: "A casa que caiu",
        hook: "La maison n'existe plus. Mais quelqu'un, quelque part, sait qui y vivait.",
        paragraphs: [
          "Em Salvador, {{a pousada|a pousada}} mais barata do Pelourinho tem as paredes cor de melancia.",
          "— {{Tem vaga?|tem vaga?}} Para {{duas noites|duas noites}}.",
          "O rapaz da recepção entrega {{a chave|a chave}} do {{quarto|o quarto}} do fundo, o que dá para o telhado.",
          "— {{Tem wi-fi?|tem wi-fi?}} — Tem, mas só perto da escada. E {{o ventilador|o ventilador}} faz barulho, já aviso.",
          "Léa mostra o endereço escrito no caderno. O rapaz olha, franze a testa e chama alguém lá dentro.",
          "— Rua do Carmo, número nove? — ele volta com a resposta. — Essa casa não existe mais, moça. Caiu no inverno passado.",
        ],
        fr: [
          "À Salvador, {{l'auberge|a pousada}} la moins chère du Pelourinho a les murs couleur pastèque.",
          "— {{Vous avez de la place ?|tem vaga?}} Pour {{deux nuits|duas noites}}.",
          "Le garçon de la réception lui tend {{la clé|a chave}} de la {{chambre|o quarto}} du fond, celle qui donne sur les toits.",
          "— {{Il y a du wifi ?|tem wi-fi?}} — Oui, mais seulement près de l'escalier. Et {{le ventilateur|o ventilador}} fait du bruit, je préviens.",
          "Léa montre l'adresse écrite dans le carnet. Le garçon regarde, fronce les sourcils et appelle quelqu'un à l'intérieur.",
          "— Rue do Carmo, numéro neuf ? — il revient avec la réponse. — Cette maison n'existe plus, madame. Elle s'est effondrée l'hiver dernier.",
        ],
        quiz: [
          { q: "Combien de nuits réserve Léa ?", a: ["Deux nuits", "Une nuit", "Une semaine"] },
          { q: "Qu'apprend-elle sur la maison de la rue do Carmo ?", a: ["Elle s'est effondrée l'hiver dernier", "Elle a été vendue", "Elle est devenue un hôtel"] },
        ],
      },
      {
        unit: "u8", title: "Oitenta, em dinheiro",
        hook: "Une des deux jeunes filles de la photo a exactement son visage.",
        paragraphs: [
          "No Mercado Modelo, um homem vende fotografias antigas espalhadas sobre um pano.",
          "— {{Só estou olhando|só estou olhando}} — mente Léa, e para na terceira foto: duas moças de mãos dadas na porta de uma casa azul.",
          "— Essa é de mil novecentos e sessenta. Cento e vinte.",
          "— {{Muito caro!|muito caro!}} {{Tem desconto?|tem desconto?}}",
          "— {{Qual é o último preço?|qual é o último preço?}} — insiste ela. — Oitenta, {{em dinheiro|em dinheiro}}.",
          "— {{Eu vou levar|eu vou levar}}. O homem conta {{o troco|o troco}} devagar, com as mãos tremendo um pouco.",
          "Léa vira a foto no sol da porta. Uma das moças tem o rosto dela. Exatamente o rosto dela.",
        ],
        fr: [
          "Au Mercado Modelo, un homme vend de vieilles photographies étalées sur un drap.",
          "— {{Je regarde seulement|só estou olhando}} — ment Léa, et elle s'arrête à la troisième : deux jeunes filles main dans la main devant une maison bleue.",
          "— Celle-là date de mille neuf cent soixante. Cent vingt.",
          "— {{Trop cher !|muito caro!}} {{Il y a une réduction ?|tem desconto?}}",
          "— {{C'est votre dernier prix ?|qual é o último preço?}} — insiste-t-elle. — Quatre-vingts, {{en espèces|em dinheiro}}.",
          "— {{Je la prends|eu vou levar}}. L'homme compte {{la monnaie|o troco}} lentement, les mains un peu tremblantes.",
          "Léa retourne la photo dans la lumière de la porte. Une des deux jeunes filles a son visage. Exactement son visage.",
        ],
        quiz: [
          { q: "Combien paie-t-elle la photo, finalement ?", a: ["Quatre-vingts reais en espèces", "Cent vingt reais par carte", "Rien, on la lui offre"] },
          { q: "Que voit Léa sur la photographie ?", a: ["Une des deux jeunes filles a exactement son visage", "La maison bleue en flammes", "Sa grand-mère âgée"] },
        ],
      },
    ],
  },
  {
    id: "s4", title: "A casa azul", subtitle: "Salvador", emoji: "🏠",
    color: "from-violet-400 to-fuchsia-700",
    ending: "« Je m'appelle Iara. Dalva était ma sœur, et j'avais douze ans quand elle… » La tasse tombe.",
    pages: [
      {
        unit: "u15", title: "Quem abre o portão",
        hook: "Dalva. La sœur qui n'est jamais revenue. Et le prénom de la grand-mère de Léa.",
        paragraphs: [
          "A casa azul caiu, mas a família mudou-se para a rua de trás. Uma menina abre o portão.",
          "— {{Esta é minha mãe|esta é minha mãe}} — diz {{a criança|a criança}}, apontando para dentro sem largar o portão.",
          "A mulher enxuga as mãos no pano. — Você é {{filha|a filha}} de quem?",
          "Léa mostra a fotografia. A mulher senta-se sem responder, e chama para o corredor: — Mãe! Mãe, vem cá.",
          "— {{A avó|a avó}} não escuta bem — explica ela. — Ela tem noventa e dois.",
          "— {{Quantos anos você tem?|quantos anos você tem?}} — pergunta a menina a Léa, sem cerimônia. Toda {{a família|a família}} ri, e por um segundo parece que Léa sempre esteve ali.",
          "No corredor aparece uma senhora muito pequena, apoiada numa bengala. Olha a foto e diz um nome que Léa nunca ouviu: — Dalva. {{A irmã|a irmã}} que não voltou.",
        ],
        fr: [
          "La maison bleue s'est effondrée, mais la famille a déménagé dans la rue de derrière. Une petite fille ouvre le portail.",
          "— {{Voici ma mère|esta é minha mãe}} — dit {{l'enfant|a criança}}, en montrant l'intérieur sans lâcher le portail.",
          "La femme s'essuie les mains sur un torchon. — Vous êtes {{la fille|a filha}} de qui ?",
          "Léa montre la photographie. La femme s'assoit sans répondre, et appelle vers le couloir : — Maman ! Maman, viens voir.",
          "— {{La grand-mère|a avó}} n'entend pas bien — explique-t-elle. — Elle a quatre-vingt-douze ans.",
          "— {{Quel âge tu as ?|quantos anos você tem?}} — demande la petite fille à Léa, sans façons. Toute {{la famille|a família}} rit, et pendant une seconde on dirait que Léa a toujours été là.",
          "Dans le couloir apparaît une toute petite dame appuyée sur une canne. Elle regarde la photo et prononce un nom que Léa n'a jamais entendu : — Dalva. {{La sœur|a irmã}} qui n'est pas revenue.",
        ],
        quiz: [
          { q: "Qui ouvre le portail ?", a: ["Une petite fille", "Le grand-père", "Personne"] },
          { q: "Quel nom prononce la vieille dame en voyant la photo ?", a: ["Dalva", "Iara", "Célia"] },
        ],
      },
      {
        unit: "u16", title: "O que Dalva fazia",
        hook: "« Pourquoi est-elle partie ? » — « Ça, c'est pour un autre jour. »",
        paragraphs: [
          "Servem café. A mulher — chama-se Nalva — quer saber tudo, e pergunta sem rodeios.",
          "— {{O que você faz?|o que você faz?}} — {{Eu trabalho|eu trabalho}} numa editora. {{Eu moro em Paris|eu moro em Paris}}.",
          "— E veio a trabalho? — {{Estou de férias|estou de férias}} — diz Léa. Não é bem verdade.",
          "— Dalva queria ser {{professora|o professor}} — conta a velha senhora, devagar. — Dava aula na {{escola|a escola}} da esquina, de graça, para quem não sabia ler.",
          "— E a senhora? — {{Cozinheira|o cozinheiro}} desta casa sempre fui eu — ri ela. — Setenta anos na mesma panela.",
          "— Por que ela foi embora? — pergunta Léa. A senhora olha para a janela um tempo longo demais. — Isso — diz — fica para outro dia.",
        ],
        fr: [
          "On sert le café. La femme — elle s'appelle Nalva — veut tout savoir, et demande sans détour.",
          "— {{Tu fais quoi dans la vie ?|o que você faz?}} — {{Je travaille|eu trabalho}} dans une maison d'édition. {{J'habite à Paris|eu moro em Paris}}.",
          "— Et vous êtes venue pour le travail ? — {{Je suis en vacances|estou de férias}} — dit Léa. Ce n'est pas tout à fait vrai.",
          "— Dalva voulait être {{professeure|o professor}} — raconte la vieille dame, lentement. — Elle faisait cours à {{l'école|a escola}} du coin, gratuitement, pour ceux qui ne savaient pas lire.",
          "— Et vous ? — La {{cuisinière|o cozinheiro}} de cette maison, ça a toujours été moi — rit-elle. — Soixante-dix ans dans la même casserole.",
          "— Pourquoi est-elle partie ? — demande Léa. La vieille dame regarde la fenêtre bien trop longtemps. — Ça — dit-elle — ce sera pour un autre jour.",
        ],
        quiz: [
          { q: "Que faisait Dalva ?", a: ["Elle donnait des cours gratuits à l'école du coin", "Elle tenait un restaurant", "Elle vendait des fruits au marché"] },
          { q: "Que répond la vieille dame quand Léa demande pourquoi Dalva est partie ?", a: ["Que ce sera pour un autre jour", "Qu'elle ne l'a jamais su", "Qu'on l'a chassée"] },
        ],
      },
      {
        unit: "u17", title: "A chuva de fim de tarde",
        hook: "Elle est partie avec un parapluie emprunté, et n'est jamais revenue le rendre.",
        paragraphs: [
          "No fim da tarde {{o tempo|o tempo}} vira de repente. O céu fica cor de ferro.",
          "— {{Vai chover|vai chover}} — diz Nalva, fechando as janelas. — Aqui não chove: desaba.",
          "Cinco minutos depois {{está chovendo|está chovendo}} tanto que não dá para ouvir a própria voz. {{O vento|o vento}} entra por baixo da porta.",
          "— {{Que calor!|que calor!}} — reclama a menina, abanando-se com um prato de plástico. Todo mundo ri dela.",
          "— Foi num {{inverno|o inverno}} assim que a casa azul caiu — diz a velha senhora. — E foi num assim que Dalva foi embora, com um {{guarda-chuva|o guarda-chuva}} emprestado que nunca devolveu.",
          "Léa olha a chuva bater na janela. Sessenta anos depois, pensa ela, eu ainda estou devolvendo esse guarda-chuva.",
        ],
        fr: [
          "En fin d'après-midi, {{le temps|o tempo}} change d'un coup. Le ciel devient couleur de fer.",
          "— {{Il va pleuvoir|vai chover}} — dit Nalva en fermant les fenêtres. — Ici il ne pleut pas : ça s'effondre.",
          "Cinq minutes plus tard {{il pleut|está chovendo}} si fort qu'on ne s'entend plus parler. {{Le vent|o vento}} passe sous la porte.",
          "— {{Quelle chaleur !|que calor!}} — se plaint la petite fille en s'éventant avec une assiette en plastique. Tout le monde se moque d'elle.",
          "— C'est un {{hiver|o inverno}} comme celui-ci qui a fait tomber la maison bleue — dit la vieille dame. — Et c'est par un temps comme ça que Dalva est partie, avec un {{parapluie|o guarda-chuva}} emprunté qu'elle n'a jamais rendu.",
          "Léa regarde la pluie frapper la vitre. Soixante ans après, pense-t-elle, je suis encore en train de rendre ce parapluie.",
        ],
        quiz: [
          { q: "Que se passe-t-il en fin d'après-midi ?", a: ["Un orage éclate", "Le soleil revient", "Le vent tombe"] },
          { q: "Qu'avait emprunté Dalva en partant ?", a: ["Un parapluie", "Une valise", "De l'argent"] },
        ],
      },
      {
        unit: "u18", title: "Eu me chamo Iara",
        hook: "La phrase reste en suspens. La tasse tombe.",
        paragraphs: [
          "A chuva passa tão rápido quanto chegou. A velha senhora pede que Léa sente perto dela.",
          "— {{Como você está?|como você está?}} — pergunta, e é a primeira vez que alguém lhe pergunta isso desde que chegou ao Brasil.",
          "— {{Estou nervoso|estou nervoso}} — confessa Léa. — E {{estou com medo|estou com medo}} de estar enganada.",
          "— {{Calma|calma}}, minha filha. {{Não se preocupe|não se preocupe}} — a senhora pega a mão dela. — Dalva escreveu esse caderno para quem viesse depois. Você veio.",
          "— {{Eu sinto muito|eu sinto muito}} — diz Léa, sem saber bem por quê. — {{Tudo vai dar certo|tudo vai dar certo}} — responde a senhora, e sorri com metade da boca.",
          "Ela começa: — Eu me chamo Iara. Dalva era minha irmã, e eu tinha doze anos quando ela...",
          "A frase fica no ar. A xícara cai. Iara escorrega da cadeira devagar, como se o corpo tivesse ficado sem ar de repente.",
        ],
        fr: [
          "La pluie passe aussi vite qu'elle est venue. La vieille dame demande à Léa de s'asseoir près d'elle.",
          "— {{Comment vas-tu ?|como você está?}} — demande-t-elle, et c'est la première fois que quelqu'un lui pose cette question depuis son arrivée au Brésil.",
          "— {{Je suis stressée|estou nervoso}} — avoue Léa. — Et {{j'ai peur|estou com medo}} de me tromper.",
          "— {{Du calme|calma}}, ma fille. {{Ne t'inquiète pas|não se preocupe}} — la dame lui prend la main. — Dalva a écrit ce carnet pour celle qui viendrait après. Tu es venue.",
          "— {{Je suis vraiment désolée|eu sinto muito}} — dit Léa, sans trop savoir pourquoi. — {{Tout va bien se passer|tudo vai dar certo}} — répond la dame, et elle sourit d'un demi-sourire.",
          "Elle commence : — Je m'appelle Iara. Dalva était ma sœur, et j'avais douze ans quand elle…",
          "La phrase reste en l'air. La tasse tombe. Iara glisse de sa chaise lentement, comme si son corps s'était vidé d'air d'un seul coup.",
        ],
        quiz: [
          { q: "Comment s'appelle la vieille dame ?", a: ["Iara", "Nalva", "Dalva"] },
          { q: "Comment se termine la scène ?", a: ["Iara s'effondre au milieu de sa phrase", "Iara refuse de parler", "Léa s'en va"] },
        ],
      },
    ],
  },
  {
    id: "s5", title: "O que ficou", subtitle: "Salvador", emoji: "🕯️",
    color: "from-rose-500 to-red-800",
    ending: "« Pour celle qui viendra après : je ne suis pas partie seule. Cherche à Manaus. » — à suivre.",
    pages: [
      {
        unit: "u9", title: "Onze minutos",
        hook: "Dans l'ambulance, Iara ne lâche pas sa main.",
        paragraphs: [
          "— {{Socorro!|socorro!}} — grita Nalva na porta. — Alguém chama {{a ambulância|a ambulância}}!",
          "Léa pega {{o celular|o celular}} com as mãos que não obedecem e disca o número que a menina grita da escada.",
          "— {{É uma emergência|é uma emergência}} — ela diz, e pela primeira vez em duas semanas as palavras saem sem que precise procurá-las.",
          "— {{Me ajuda, por favor|me ajuda, por favor}} — repete, dando o endereço duas vezes, depois três.",
          "— {{Chame um médico|chame um médico}}, chame qualquer um! — Nalva ajoelha ao lado da mãe, no chão da cozinha.",
          "A sirene chega em onze minutos. No caminho para {{o hospital|o hospital}}, Iara aperta a mão de Léa e não solta.",
        ],
        fr: [
          "— {{Au secours !|socorro!}} — crie Nalva sur le pas de la porte. — Que quelqu'un appelle {{l'ambulance|a ambulância}} !",
          "Léa attrape {{son portable|o celular}} avec des mains qui n'obéissent plus et compose le numéro que la petite fille hurle depuis l'escalier.",
          "— {{C'est une urgence|é uma emergência}} — dit-elle, et pour la première fois en deux semaines les mots sortent sans qu'elle ait à les chercher.",
          "— {{Aidez-moi, s'il vous plaît|me ajuda, por favor}} — répète-t-elle, en donnant l'adresse deux fois, puis trois.",
          "— {{Appelez un médecin|chame um médico}}, appelez n'importe qui ! — Nalva s'agenouille près de sa mère, sur le carrelage de la cuisine.",
          "La sirène arrive en onze minutes. Sur le chemin de {{l'hôpital|o hospital}}, Iara serre la main de Léa et ne la lâche plus.",
        ],
        quiz: [
          { q: "Qui appelle les secours ?", a: ["Léa, avec son portable", "Nalva, depuis chez un voisin", "La petite fille"] },
          { q: "Que fait Iara dans l'ambulance ?", a: ["Elle serre la main de Léa sans la lâcher", "Elle perd connaissance", "Elle réclame le carnet"] },
        ],
      },
      {
        unit: "u19", title: "A última página",
        hook: "La page arrachée n'était pas perdue. Elle était collée au fond de la couverture.",
        paragraphs: [
          "No corredor do hospital cheira a álcool e a café requentado. Ninguém fala alto.",
          "— {{É grave?|é grave?}} — pergunta Léa ao médico, e Nalva traduz o olhar dele antes das palavras.",
          "— O coração deu um susto. Ela vai ficar. Precisa de {{remédio|o remédio}} todo dia e de {{receita|a receita}} renovada todo mês.",
          "Iara acorda de madrugada. — {{Dói aqui|dói aqui}} — diz, tocando {{o braço|o braço}} onde está o soro. — Mas {{a dor|a dor}} que eu tinha era outra.",
          "Ela pede o caderno. Lê a última página, aquela que parecia arrancada, e que estava colada no fundo da capa desde sempre.",
          "— {{Melhoras!|melhoras!}} — diz a enfermeira ao sair. Iara nem ouve. Está chorando e sorrindo ao mesmo tempo.",
        ],
        fr: [
          "Dans le couloir de l'hôpital ça sent l'alcool et le café réchauffé. Personne ne parle fort.",
          "— {{C'est grave ?|é grave?}} — demande Léa au médecin, et Nalva traduit son regard avant ses mots.",
          "— Le cœur a fait une alerte. Elle s'en sortira. Il lui faut un {{médicament|o remédio}} tous les jours et une {{ordonnance|a receita}} renouvelée tous les mois.",
          "Iara se réveille au petit matin. — {{Ça fait mal ici|dói aqui}} — dit-elle en touchant {{le bras|o braço}} où est la perfusion. — Mais {{la douleur|a dor}} que j'avais était d'une autre sorte.",
          "Elle réclame le carnet. Elle lit la dernière page, celle qui semblait arrachée, et qui était collée au fond de la couverture depuis toujours.",
          "— {{Bon rétablissement !|melhoras!}} — dit l'infirmière en sortant. Iara ne l'entend même pas. Elle pleure et sourit en même temps.",
        ],
        quiz: [
          { q: "Que dit le médecin ?", a: ["Le cœur a fait une alerte, mais elle s'en sortira", "Qu'il faut opérer tout de suite", "Qu'il n'y a plus rien à faire"] },
          { q: "Où était la dernière page du carnet ?", a: ["Collée au fond de la couverture", "Chez le vendeur de photos", "Dans la chambre douze"] },
        ],
      },
      {
        unit: "u20", title: "Todo sábado tem almoço",
        hook: "Tous les samedis, il y a un déjeuner. Il y en avait déjà un en 1962.",
        paragraphs: [
          "Iara volta para casa numa quinta-feira. A rua inteira aparece na porta com panelas.",
          "— {{Qual é o seu número?|qual é o seu número?}} — pergunta a menina, séria como quem fecha um contrato.",
          "— {{Me manda mensagem|me manda mensagem}} quando chegar em Paris — pede Nalva. — Todo dia, viu?",
          "— {{Vamos combinar|vamos combinar}} uma coisa — diz Iara da cadeira, com a voz ainda fina. — {{No sábado|no sábado}} que vem tem almoço aqui. Todo sábado tem. Sempre teve.",
          "— {{Pode ser|pode ser}} — responde Léa, e a garganta fecha antes do fim da palavra.",
          "— {{Te espero lá|te espero lá}} — diz Iara. — {{Até já|até já}}, não é assim que vocês dizem?",
        ],
        fr: [
          "Iara rentre à la maison un jeudi. La rue entière débarque sur le pas de la porte avec des casseroles.",
          "— {{C'est quoi ton numéro ?|qual é o seu número?}} — demande la petite fille, sérieuse comme on signe un contrat.",
          "— {{Envoie-moi un message|me manda mensagem}} quand tu arrives à Paris — demande Nalva. — Tous les jours, hein ?",
          "— {{On va se caler quelque chose|vamos combinar}} — dit Iara depuis son fauteuil, la voix encore fluette. — {{Samedi|no sábado}} prochain il y a un déjeuner ici. Tous les samedis il y en a un. Il y en a toujours eu.",
          "— {{Ça marche|pode ser}} — répond Léa, et sa gorge se serre avant la fin du mot.",
          "— {{Je t'attends là-bas|te espero lá}} — dit Iara. — {{À tout de suite|até já}}, c'est bien comme ça que vous dites ?",
        ],
        quiz: [
          { q: "Qu'est-ce qu'Iara propose à Léa ?", a: ["Le déjeuner de tous les samedis", "De venir habiter chez elle", "De lui racheter le carnet"] },
          { q: "Que demande la petite fille ?", a: ["Le numéro de Léa", "Le carnet", "Une photo"] },
        ],
      },
      {
        unit: "u10", title: "Procure em Manaus",
        hook: "Le carnet avait encore quelque chose à dire. Et ça ne finit pas ici.",
        paragraphs: [
          "No último dia, Léa desce à praia sozinha, bem cedo, com o caderno no bolso.",
          "{{A praia é linda|a praia é linda}} a essa hora, quando ainda é dos pescadores e dos cachorros.",
          "Nalva chega com café numa garrafa térmica e senta na areia sem tirar os sapatos. — {{Foi muito bom|foi muito bom}} te conhecer.",
          "— {{Você é muito gentil|você é muito gentil}} — diz Léa. — {{Vou sentir saudade|vou sentir saudade}}.",
          "— Não fala assim que eu choro. {{A gente se vê|a gente se vê}}.",
          "— {{Eu volto|eu volto}} — promete Léa. — {{Eu amo o Brasil|eu amo o brasil}}, mas não é por isso que eu volto.",
          "No avião, ela abre o caderno na última página. A letra de Dalva, firme, sem tremer: « Para quem vier depois: eu não fui embora sozinha. Procure em Manaus. »",
        ],
        fr: [
          "Le dernier jour, Léa descend à la plage toute seule, très tôt, le carnet dans la poche.",
          "{{La plage est belle|a praia é linda}} à cette heure-là, quand elle appartient encore aux pêcheurs et aux chiens.",
          "Nalva arrive avec du café dans une bouteille thermos et s'assoit dans le sable sans enlever ses chaussures. — {{C'était super|foi muito bom}} de te connaître.",
          "— {{Tu es très gentille|você é muito gentil}} — dit Léa. — {{Tu vas me manquer|vou sentir saudade}}.",
          "— Ne dis pas ça, je vais pleurer. {{On se revoit|a gente se vê}}.",
          "— {{Je reviens|eu volto}} — promet Léa. — {{J'adore le Brésil|eu amo o brasil}}, mais ce n'est pas pour ça que je reviens.",
          "Dans l'avion, elle ouvre le carnet à la dernière page. L'écriture de Dalva, ferme, sans trembler : « Pour celle qui viendra après : je ne suis pas partie seule. Cherche à Manaus. »",
        ],
        quiz: [
          { q: "Que promet Léa ?", a: ["Qu'elle reviendra", "Qu'elle écrira un livre", "Qu'elle enverra de l'argent"] },
          { q: "Que dit la dernière page du carnet ?", a: ["Qu'elle n'est pas partie seule, et qu'il faut chercher à Manaus", "Qu'elle ne voulait pas être retrouvée", "Qu'elle est morte à Salvador"] },
        ],
      },
    ],
  },
];

/* --- Mise en forme : chaque page connaît ses mots et son texte nu --- */

const strip = (s) => s.replace(/\{\{([^}|]+)(\|[^}]+)?\}\}/g, "$1");

BOOKS.forEach((book, bi) => {
  book.number = bi + 1;
  book.chapters = book.pages.map((p) => p.unit);
  book.pages.forEach((page, pi) => {
    page.id = `${book.id}.${page.unit}`;
    page.book = book.id;
    page.number = pi + 1;
    page.tokens = page.paragraphs.map(parseStoryParagraph);
    page.frTokens = (page.fr || []).map(parseStoryParagraph);
    page.targetKeys = [];
    page.tokens.forEach((tokens) => tokens.forEach((t) => {
      if (t.type === "word" && t.item && !page.targetKeys.includes(t.key)) page.targetKeys.push(t.key);
    }));
    /* Le texte nu, pour la lecture à voix haute. */
    page.text = page.paragraphs.map((p) => strip(p).replace(/^—\s*/, "")).join(" ");
  });
  book.targetTotal = book.pages.reduce((n, p) => n + p.targetKeys.length, 0);
});

/* Les sections du parcours sont les livres vus depuis le chemin. */
export const SECTIONS = BOOKS.map((b) => ({
  id: b.id, title: b.title, subtitle: b.subtitle, emoji: b.emoji, color: b.color,
  chapters: b.chapters, book: b,
}));

export const ALL_CHAPTERS = SECTIONS.flatMap((s) => s.chapters);
export const BOOK_OF = Object.fromEntries(BOOKS.flatMap((b) => b.chapters.map((c) => [c, b])));
export const PAGE_OF = Object.fromEntries(BOOKS.flatMap((b) => b.pages.map((p) => [p.unit, p])));

export function bookOf(unitId) { return BOOK_OF[unitId]; }
export function pageOf(unitId) { return PAGE_OF[unitId]; }

export const PAGE_BONUS_XP = 25;
export const PAGE_BONUS_GEMS = 15;
export const BOOK_BONUS_XP = 60;
export const BOOK_BONUS_GEMS = 50;
export const HINT_PRICE = 10;
