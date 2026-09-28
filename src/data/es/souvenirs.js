/* ==================================================================
   LA CAJA DE RECUERDOS — ce qu'on trouve dans les coffres en plus des
   gemmes : des objets de l'histoire de Nina, et de petits papiers
   portant une expression espagnole.

   Chaque souvenir ne peut sortir d'un coffre qu'une fois la page
   « after » lue : il prolonge l'histoire sans jamais la devancer.
   Les petits papiers entrent dans la révision espacée comme le reste
   du vocabulaire.
   ================================================================== */

export { TIERS, TIER_ORDER } from "../common.js";

/* --- Los papelitos : des expressions qu'aucune leçon n'enseigne ----- */

export const PAPERS = [
  /* communs */
  { id: "p01", rarity: "commun", pt: "¡qué fuerte!", fr: "c'est dingue !", ph: "ké FOUÈR-té",
    note: "« Que c'est fort ! » La réaction à tout ce qui surprend, choque ou scandalise — d'un ragot à une facture." },
  { id: "p02", rarity: "commun", pt: "¡ojalá!", fr: "pourvu que !", ph: "o-kha-LA",
    note: "Hérité de l'arabe « law šāʾ Allāh », si Dieu le veut. Huit siècles d'al-Andalus tiennent dans ce petit mot." },
  { id: "p03", rarity: "commun", pt: "tío, tía", fr: "mec, meuf", ph: "TI-o, TI-a",
    note: "Littéralement « oncle, tante ». Entre amis, en Espagne, tout le monde est l'oncle ou la tante de quelqu'un." },
  { id: "p04", rarity: "commun", pt: "¡venga!", fr: "allez !", ph: "BÈN-ga",
    note: "Pour encourager, pour presser, pour dire au revoir au téléphone : « venga, venga, venga, adiós »." },
  { id: "p05", rarity: "commun", pt: "me mola", fr: "ça me plaît", ph: "mé MO-la",
    note: "Né dans l'argot madrilène des années 70. « ¿Te mola? » : ça te branche ?" },
  { id: "p06", rarity: "commun", pt: "madrugar", fr: "se lever tôt", ph: "ma-drou-GAR",
    note: "Un seul verbe pour « se lever aux aurores ». Le proverbe console : « No por mucho madrugar amanece más temprano »." },
  { id: "p07", rarity: "commun", pt: "ir de tapas", fr: "faire la tournée des tapas", ph: "ir dé TA-pas",
    note: "Un bar, une caña, une tapa — puis le bar suivant. On ne dîne pas : on se promène en mangeant." },
  { id: "p08", rarity: "commun", pt: "¡anda ya!", fr: "sans blague !", ph: "AN-da YA",
    note: "« Marche, déjà ! » Pour dire qu'on n'y croit pas une seconde." },
  { id: "p09", rarity: "commun", pt: "flipar", fr: "halluciner", ph: "fli-PAR",
    note: "De l'anglais « to flip ». « ¡Estoy flipando! » : je n'en reviens pas." },
  { id: "p10", rarity: "commun", pt: "¡olé!", fr: "bravo !", ph: "o-LÉ",
    note: "Le cri du flamenco : on le lance quand le chant, la guitare ou la danse touchent juste." },

  /* rares */
  { id: "p11", rarity: "rare", pt: "estar en las nubes", fr: "être dans la lune", ph: "ès-TAR èn las NOU-bés",
    note: "En espagnol, on n'est pas dans la lune : on est « dans les nuages »." },
  { id: "p12", rarity: "rare", pt: "tomar el pelo", fr: "faire marcher quelqu'un", ph: "to-MAR èl PÉ-lo",
    note: "« Prendre le cheveu » : raconter des bobards à quelqu'un pour s'amuser." },
  { id: "p13", rarity: "rare", pt: "ponerse las pilas", fr: "se secouer", ph: "po-NÈR-sé las PI-las",
    note: "« Se mettre les piles » : se réveiller, se mettre au travail, enfin." },
  { id: "p14", rarity: "rare", pt: "ser pan comido", fr: "être du gâteau", ph: "sèr pan ko-MI-do",
    note: "« Être du pain mangé » : c'est si facile que c'est déjà fait." },
  { id: "p15", rarity: "rare", pt: "no pegar ojo", fr: "ne pas fermer l'œil", ph: "no pé-GAR O-kho",
    note: "« Ne pas coller l'œil » : passer une nuit blanche, à cause du bruit, du souci — ou de la chaleur d'août." },
  { id: "p16", rarity: "rare", pt: "estar hecho polvo", fr: "être crevé", ph: "ès-TAR É-tcho POL-bo",
    note: "« Être réduit en poussière » : épuisé, lessivé, bon à rien." },
  { id: "p17", rarity: "rare", pt: "echar una mano", fr: "donner un coup de main", ph: "é-TCHAR OU-na MA-no",
    note: "« Jeter une main ». « ¿Me echas una mano? » : tu m'aides ?" },
  { id: "p18", rarity: "rare", pt: "meter la pata", fr: "faire une gaffe", ph: "mé-TÈR la PA-ta",
    note: "« Mettre la patte » — dans le plat, sous-entendu." },
  { id: "p19", rarity: "rare", pt: "costar un ojo de la cara", fr: "coûter les yeux de la tête", ph: "kos-TAR oun O-kho dé la KA-ra",
    note: "Presque la même image qu'en français, mais un seul œil suffit — celui « du visage »." },
  { id: "p20", rarity: "rare", pt: "estar como una cabra", fr: "être complètement fou", ph: "ès-TAR KO-mo OU-na KA-bra",
    note: "« Être comme une chèvre » : imprévisible, un peu toqué. Dit avec tendresse, le plus souvent." },
  { id: "p21", rarity: "rare", pt: "ser uña y carne", fr: "être inséparables", ph: "sèr OU-gna i KAR-né",
    note: "« Être l'ongle et la chair » : deux amis qu'on ne sépare pas sans que ça fasse mal." },

  /* épiques */
  { id: "p22", rarity: "epique", pt: "el duende", fr: "la magie du flamenco", ph: "èl DOUÈN-dé",
    note: "Un lutin, au sens propre. Pour Lorca, le duende est ce frisson mystérieux qui fait qu'un chant vous transperce — ou vous laisse froid." },
  { id: "p23", rarity: "epique", pt: "la sobremesa", fr: "le temps passé à table après le repas", ph: "la so-bré-MÉ-sa",
    note: "Le repas est fini, personne ne se lève : on parle, on rit, on refait le monde. Parfois jusqu'au dîner." },
  { id: "p24", rarity: "epique", pt: "la madrugada", fr: "les heures entre minuit et l'aube", ph: "la ma-drou-GA-da",
    note: "Ce n'est plus la nuit, ce n'est pas encore le matin. À Madrid, c'est souvent l'heure où la soirée commence." },
  { id: "p25", rarity: "epique", pt: "la vergüenza ajena", fr: "la honte pour les autres", ph: "la bèr-GOUÈN-tha a-KHÉ-na",
    note: "Rougir à la place de quelqu'un qui, lui, ne rougit pas. Le français n'a pas de mot ; l'espagnol, si." },
  { id: "p26", rarity: "epique", pt: "la morriña", fr: "le mal du pays", ph: "la mo-RRI-gna",
    note: "Un mot venu de Galice : la nostalgie de sa terre, de sa pluie, de sa mer. La cousine espagnole de la saudade." },
];

/* --- Los recuerdos : des objets de l'histoire de Nina --------------- */

export const SOUVENIRS = [
  { id: "m01", rarity: "rare", kind: "tile", after: "e3", name: "El azulejo azul",
    pt: "Un azulejo azul con una esquina rota. Detrás, a lápiz, dos letras y un año: « J. S. — 1976 ».",
    fr: "Un carreau bleu à l'angle cassé. Derrière, au crayon, deux lettres et une année : « J. S. — 1976 ».",
    caption: "Carmen a voulu le recoller. Nina l'a gardé." },
  { id: "m02", rarity: "rare", kind: "smallkey", after: "e4", name: "La llavecita",
    pt: "Una llave pequeña, de latón, atada con un cordón rojo. No abre ninguna puerta del edificio.",
    fr: "Une petite clé en laiton, nouée à un cordon rouge. Elle n'ouvre aucune porte de l'immeuble.",
    caption: "Nina a essayé toutes les serrures du troisième B." },
  { id: "m03", rarity: "epique", kind: "guitarphoto", after: "e4", name: "La foto de la guitarra",
    pt: "Una guitarra apoyada en una silla de enea. Detrás: « Triana, verano de 1975. Para que no se olvide. »",
    fr: "Une guitare posée sur une chaise paillée. Au dos : « Triana, été 1975. Pour qu'on n'oublie pas. »",
    caption: "Trouvée dans la boîte en fer, sous la lettre." },
  { id: "m04", rarity: "rare", kind: "coaster", after: "e5", name: "El posavasos de Casa Paco",
    pt: "Un posavasos de cartón. Detrás, a boli, una letra de canción: « Si me voy, que no me llores… »",
    fr: "Un sous-bock en carton. Derrière, au stylo, des paroles de chanson : « Si je m'en vais, ne me pleure pas… »",
    caption: "Paco l'avait gardé derrière le comptoir depuis 1976." },
  { id: "m05", rarity: "rare", kind: "bag", after: "e7", name: "La bolsa de papel",
    pt: "Una bolsa de papel de la frutería, con una dirección a boli: « Calle Pureza, Triana ».",
    fr: "Un sac en papier du primeur, avec une adresse au stylo : « Calle Pureza, Triana ».",
    caption: "Elle sent encore l'orange." },
  { id: "m06", rarity: "rare", kind: "recipe", after: "e8", name: "La receta de Encarna",
    pt: "Mermelada de naranja amarga: un kilo de naranjas de Sevilla, un kilo de azúcar, un limón. Y paciencia, mucha paciencia.",
    fr: "Confiture d'oranges amères : un kilo d'oranges de Séville, un kilo de sucre, un citron. Et de la patience, beaucoup de patience.",
    caption: "Glissée dans le sac, avec les oranges." },
  { id: "m07", rarity: "epique", kind: "aveticket", after: "e9", name: "El billete del AVE",
    pt: "Madrid Puerta de Atocha — Sevilla Santa Justa. Salida: 08:00. Andén 5. Coche 4, plaza 12A. Solo ida.",
    fr: "Madrid Puerta de Atocha — Séville Santa Justa. Départ : 8 h 00. Quai 5. Voiture 4, place 12A. Aller simple.",
    caption: "Au dos, Nina a noté : « Voiture 5 : le manteau gris »." },
  { id: "m08", rarity: "epique", kind: "cassette", after: "e12", name: "La cinta « Para Amparo »",
    pt: "Una cinta de casete de sesenta minutos. Cara A: « J. Serrano — Triana, 1976 ». Cara B: en blanco.",
    fr: "Une cassette de soixante minutes. Face A : « J. Serrano — Triana, 1976 ». Face B : vierge.",
    caption: "Quinze euros au mercadillo de l'Alameda. En espèces." },
  { id: "m09", rarity: "rare", kind: "carnation", after: "e13", name: "El clavel de Amparo",
    pt: "Un clavel rojo, ya seco. Amparo lo llevaba en el pelo el día que conoció a Nina.",
    fr: "Un œillet rouge, désormais séché. Amparo le portait dans les cheveux le jour où elle a rencontré Nina.",
    caption: "Pressé dans le carnet de musique de Nina." },
  { id: "m10", rarity: "epique", kind: "pick", after: "e14", name: "La púa de nácar",
    pt: "Una púa de guitarra de nácar, gastada por un lado. Grabadas, dos letras: J. S.",
    fr: "Un médiator en nacre, usé d'un côté. Gravées dessus, deux lettres : J. S.",
    caption: "Manuel l'a retrouvée dans un tiroir de l'atelier." },
  { id: "m11", rarity: "rare", kind: "fan", after: "e15", name: "El abanico de Lucía",
    pt: "Un abanico de madera pintado a mano: naranjos y un patio blanco. Una varilla está rota.",
    fr: "Un éventail en bois peint à la main : des orangers et un patio blanc. Une baleine est cassée.",
    caption: "« Pour les quarante-cinq degrés », a dit Lucía." },
  { id: "m12", rarity: "rare", kind: "letter", after: "e17", name: "La copia de la denuncia",
    pt: "« Objetos robados: un bolso negro, una cartera, un móvil, una caja de lata. Valor sentimental: incalculable. »",
    fr: "« Objets volés : un sac noir, un portefeuille, un portable, une boîte en fer-blanc. Valeur sentimentale : inestimable. »",
    caption: "Le policier a souri en tapant la dernière ligne." },
  { id: "m13", rarity: "legendaire", kind: "score", after: "e20", name: "La nana para Nieves",
    pt: "Una partitura a lápiz, sin terminar. Título: « Nana para Nieves ». La última línea está en blanco.",
    fr: "Une partition au crayon, inachevée. Titre : « Berceuse pour Nieves ». La dernière ligne est vide.",
    caption: "Cachée sous le velours de l'étui, derrière l'enveloppe." },
  { id: "m14", rarity: "legendaire", kind: "postcard", after: "e20", name: "La postal de Perpiñán",
    pt: "Una postal de Perpiñán, sin sello: « Andrés: tienes una hermana. Ven cuando quieras. La guitarra te espera. — Nieves »",
    fr: "Une carte postale de Perpignan, sans timbre : « Andrés : tu as une sœur. Viens quand tu veux. La guitare t'attend. — Nieves »",
    caption: "Jamais postée. Nina l'a trouvée sur le buffet de sa grand-mère." },
];

/* Les papiers deviennent des items de vocabulaire comme les autres. */
export const PAPER_ITEMS = PAPERS.map((p) => ({ pt: p.pt, fr: p.fr, ph: p.ph, paper: p.id }));
