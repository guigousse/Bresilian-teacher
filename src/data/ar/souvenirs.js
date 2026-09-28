/* ==================================================================
   LA CAJA DE RECUERDOS — ce qu'on trouve dans les coffres en plus des
   gemmes : des objets de l'histoire de Camille, et de petits papiers
   portant une expression argentine, souvent du lunfardo, l'argot né
   dans les ports et les tangos de Buenos Aires.

   Chaque souvenir ne peut sortir d'un coffre qu'une fois la page
   « after » lue : il prolonge l'histoire sans jamais la devancer.
   Les petits papiers entrent dans la révision espacée comme le reste
   du vocabulaire.
   ================================================================== */

export { TIERS, TIER_ORDER } from "../common.js";

/* --- Los papelitos : des expressions qu'aucune leçon n'enseigne ----- */

export const PAPERS = [
  /* communs */
  { id: "p01", rarity: "commun", pt: "¡qué quilombo!", fr: "quel bazar !", ph: "KÉ ki-LOM-bo",
    note: "Le mot vient du Brésil, où un quilombo était un village d'esclaves évadés. À Buenos Aires, il désigne tout ce qui est sens dessus dessous — des embouteillages à la politique." },
  { id: "p02", rarity: "commun", pt: "la fiaca", fr: "la flemme", ph: "la FIA-ka",
    note: "Apportée par les immigrés génois (« fiacca », la fatigue). « Tengo fiaca » : aucune envie de bouger du canapé." },
  { id: "p03", rarity: "commun", pt: "¡qué garrón!", fr: "quelle galère !", ph: "KÉ ga-RRON",
    note: "Pour la pluie le jour du barbecue, le bus qui passe sous le nez, la queue à la banque." },
  { id: "p04", rarity: "commun", pt: "¡qué bajón!", fr: "quel coup de blues !", ph: "KÉ ba-KHON",
    note: "Un « bajón », c'est une descente : le moral qui tombe. Se dit aussi d'une grosse envie de manger après la fête." },
  { id: "p05", rarity: "commun", pt: "el chabón", fr: "le type, le gars", ph: "èl tcha-BON",
    note: "« Un chabón me preguntó la hora » : un gars m'a demandé l'heure. Familier, jamais méchant." },
  { id: "p06", rarity: "commun", pt: "la guita", fr: "le fric", ph: "la GUI-ta",
    note: "Du lunfardo : l'argot des ports de Buenos Aires, né au début du XXe siècle et chanté dans les tangos." },
  { id: "p07", rarity: "commun", pt: "no tengo un mango", fr: "je n'ai pas un sou", ph: "no TÈN-go oun MAN-go",
    note: "Un « mango », en lunfardo, c'est un peso. Rien à voir avec le fruit." },
  { id: "p08", rarity: "commun", pt: "¡de una!", fr: "carrément !", ph: "dé OU-na",
    note: "« On va à la plage ? — ¡De una! » : oui, tout de suite, sans réfléchir." },
  { id: "p09", rarity: "commun", pt: "hacer la previa", fr: "prendre l'apéro avant de sortir", ph: "a-SÈR la PRÉ-bia",
    note: "À Buenos Aires, on ne sort pas avant une heure du matin. D'ici là, on fait « la previa » chez quelqu'un." },
  { id: "p10", rarity: "commun", pt: "cheto", fr: "bourge, snob", ph: "TCHÉ-to",
    note: "Pour un quartier, une boutique ou une personne qui se croient un peu au-dessus. « Re cheto » : très chic, trop chic." },

  /* rares */
  { id: "p11", rarity: "rare", pt: "estar al horno", fr: "être dans le pétrin", ph: "ès-TAR al OR-no",
    note: "« Être au four » : cuit, fichu, sans issue. « Si no llego al micro, estoy al horno. »" },
  { id: "p12", rarity: "rare", pt: "ser un chanta", fr: "être un baratineur", ph: "sèr oun TCHAN-ta",
    note: "Le charlatan qui promet tout et ne tient rien. Le mot vient de « chantapufi », du lunfardo." },
  { id: "p13", rarity: "rare", pt: "buena onda", fr: "sympa, bonne ambiance", ph: "BOUÉ-na ON-da",
    note: "« Bonne onde » : une personne, un lieu ou une soirée qui mettent de bonne humeur. Le contraire : « mala onda »." },
  { id: "p14", rarity: "rare", pt: "cortar el mambo", fr: "casser l'ambiance", ph: "kor-TAR èl MAM-bo",
    note: "« Couper le mambo » : arrêter la musique au meilleur moment. On le dit de celui qui rabat-joie." },
  { id: "p15", rarity: "rare", pt: "hacerse el sota", fr: "faire l'innocent", ph: "a-SÈR-sé èl SO-ta",
    note: "« Faire le valet » : faire semblant de ne rien savoir, de ne rien avoir vu." },
  { id: "p16", rarity: "rare", pt: "no da", fr: "ça ne se fait pas", ph: "no DA",
    note: "Deux mots pour tout ce qui est gênant, déplacé ou impossible. « Ir en ojotas a la boda... no da. »" },
  { id: "p17", rarity: "rare", pt: "caer como peludo de regalo", fr: "débarquer à l'improviste", ph: "ka-ÈR KO-mo pé-LOU-do dé rré-GA-lo",
    note: "« Tomber comme un tatou offert » : le peludo est un tatou, cadeau que personne n'avait demandé." },
  { id: "p18", rarity: "rare", pt: "andá a cantarle a Gardel", fr: "cause toujours", ph: "an-DA a kan-TAR-lé a gar-DÈL",
    note: "« Va chanter ça à Gardel » — Carlos Gardel, la voix du tango, né à Toulouse selon la plupart des historiens. On le dit à qui raconte des histoires." },
  { id: "p19", rarity: "rare", pt: "ser un pan de Dios", fr: "être bon comme le pain", ph: "sèr oun PAN dé DIOS",
    note: "« Être un pain de Dieu » : quelqu'un d'une gentillesse à toute épreuve." },
  { id: "p20", rarity: "rare", pt: "tener mala leche", fr: "ne pas avoir de chance", ph: "té-NÈR MA-la LÉ-tché",
    note: "Attention : en Argentine, c'est la malchance. En Espagne, « mala leche », c'est la mauvaise humeur, ou les mauvaises intentions." },
  { id: "p21", rarity: "rare", pt: "tirar onda", fr: "draguer, faire du charme", ph: "ti-RAR ON-da",
    note: "« Lancer des ondes » : les regards, les sourires, les messages un peu trop gentils." },

  /* épiques */
  { id: "p22", rarity: "epique", pt: "el lunfardo", fr: "l'argot de Buenos Aires", ph: "èl loun-FAR-do",
    note: "Né vers 1900 dans les conventillos et les ports, mêlant italien, gallego, français et verlan (« al revés » : « feca » pour café). Le tango l'a rendu éternel." },
  { id: "p23", rarity: "epique", pt: "la viveza criolla", fr: "la débrouillardise à l'argentine", ph: "la bi-BÉ-sa KRIO-cha",
    note: "L'art de s'en sortir par la ruse, admiré et critiqué à la fois. Les Argentins en rient autant qu'ils s'en plaignent." },
  { id: "p24", rarity: "epique", pt: "el aguante", fr: "la fidélité à toute épreuve", ph: "èl a-GOUAN-té",
    note: "Né dans les tribunes de football : soutenir son équipe, ses amis, sa famille, surtout quand tout va mal." },
  { id: "p25", rarity: "epique", pt: "la sobremesa", fr: "le temps passé à table après le repas", ph: "la so-bré-MÉ-sa",
    note: "L'asado est fini depuis longtemps, personne ne se lève : un maté, une anecdote, un autre maté. Parfois jusqu'au soir." },
  { id: "p26", rarity: "epique", pt: "la mufa", fr: "le cafard, la poisse", ph: "la MOU-fa",
    note: "Du lunfardo, venu de l'italien « muffa », la moisissure. Un « mufa », c'est aussi celui qui porte malheur." },
];

/* --- Los recuerdos : des objets de l'histoire de Camille ------------ */

export const SOUVENIRS = [
  { id: "m01", rarity: "rare", kind: "letter", after: "a2", name: "Las reglas de Ofelia",
    pt: "« Pensión Ofelia. 1. El mate no se presta. 2. La ducha, de siete a nueve. 3. Los domingos, no hay desayuno. 4. De la señora del tercero, no se habla. »",
    fr: "« Pension Ofelia. 1. Le maté ne se prête pas. 2. La douche, de sept à neuf. 3. Le dimanche, pas de petit-déjeuner. 4. De la dame du troisième, on ne parle pas. »",
    caption: "Punaisé derrière la porte de la chambre. La règle 4 est écrite d'une autre encre." },
  { id: "m02", rarity: "rare", kind: "pendant", after: "a3", name: "El dije de la S",
    pt: "Un dije de plata con una S grabada. Del otro lado, casi borrado: « B. A. 1961 ».",
    fr: "Un pendentif en argent gravé d'un S. De l'autre côté, presque effacé : « B. A. 1961 ».",
    caption: "Camille ne l'avait jamais retourné." },
  { id: "m03", rarity: "epique", kind: "photo", after: "a4", name: "La foto de Boedo",
    pt: "Una pareja joven baila en la vereda. Atrás: « Stella y Ramón, Boedo, sábado 3 de marzo de 1962 ».",
    fr: "Un jeune couple danse sur le trottoir. Au dos : « Stella et Ramón, Boedo, samedi 3 mars 1962 ».",
    caption: "Trouvée dans le soufflet du bandonéon." },
  { id: "m04", rarity: "rare", kind: "napkin", after: "a5", name: "La servilleta del café",
    pt: "Una servilleta de papel con un dibujo a birome: un bandoneón y dos zapatos de tango. Firma: « Beto, 1961 ».",
    fr: "Une serviette en papier avec un dessin au stylo bille : un bandonéon et deux chaussures de tango. Signé : « Beto, 1961 »." ,
    caption: "Beto la gardait sous la caisse depuis soixante ans." },
  { id: "m05", rarity: "rare", kind: "mate", after: "a6", name: "El mate de Beto",
    pt: "Una calabaza gastada, con una bombilla de alpaca. En el borde, una inscripción: « Para el Tano, de Ramón ».",
    fr: "Une calebasse usée, avec une paille en maillechort. Sur le bord, une inscription : « Pour le Tano, de Ramón »." ,
    caption: "« Le maté ne se prête pas. Mais il se donne », a dit Beto." },
  { id: "m06", rarity: "epique", kind: "ticket", after: "a6", name: "El pasaje del barco",
    pt: "Buenos Aires — Le Havre. Tercera clase. Salida: domingo 4 de marzo de 1962. Una pasajera: Stella M.",
    fr: "Buenos Aires — Le Havre. Troisième classe. Départ : dimanche 4 mars 1962. Une passagère : Stella M.",
    caption: "Chela l'avait gardé dans une boîte à biscuits." },
  { id: "m07", rarity: "rare", kind: "letter", after: "a7", name: "El sobre amarillo",
    pt: "« R. Ibarra — Bodega Los Álamos — Luján de Cuyo, Mendoza ». Adentro, nada. Solo olor a uva.",
    fr: "« R. Ibarra — Bodega Los Álamos — Luján de Cuyo, Mendoza ». Dedans, rien. Juste une odeur de raisin.",
    caption: "L'enveloppe d'une lettre que Stella n'a jamais reçue." },
  { id: "m08", rarity: "rare", kind: "microticket", after: "a9", name: "El pasaje del micro",
    pt: "Retiro — Mendoza. Salida: 21:00. Plataforma 40. Coche cama, asiento 12, piso de arriba.",
    fr: "Retiro — Mendoza. Départ : 21 h 00. Quai 40. Couchette, siège 12, à l'étage.",
    caption: "Au dos, Camille a noté : « Siège 13 : le chapeau »." },
  { id: "m09", rarity: "epique", kind: "vinyl", after: "a12", name: "Tangos para Stella",
    pt: "Un disco de 1962, la tapa gastada: « Ramón Ibarra y su bandoneón — Tangos para Stella ». Lado B: « El último tango ».",
    fr: "Un disque de 1962, à la pochette usée : « Ramón Ibarra et son bandonéon — Tangos pour Stella ». Face B : « Le dernier tango ».",
    caption: "Quinze mille pesos à la foire de la place Independencia. En espèces." },
  { id: "m10", rarity: "rare", kind: "wine", after: "a14", name: "La etiqueta del Malbec",
    pt: "Una etiqueta vieja de la bodega: « Los Álamos — Malbec — Cosecha 1963 ». En el centro, una bailarina de pelo corto.",
    fr: "Une vieille étiquette du domaine : « Los Álamos — Malbec — Millésime 1963 ». Au centre, une danseuse aux cheveux courts.",
    caption: "Martín ne savait pas qui était la danseuse. Maintenant, si." },
  { id: "m11", rarity: "rare", kind: "recipe", after: "a15", name: "Las empanadas de Elena",
    pt: "Empanadas mendocinas: carne cortada a cuchillo, cebolla, huevo, una aceituna. Al horno de barro. « Y nunca, nunca, pasas de uva. »",
    fr: "Empanadas de Mendoza : viande coupée au couteau, oignon, œuf, une olive. Au four en terre. « Et jamais, jamais de raisins secs. »",
    caption: "Recopiée par Sofía au dos d'un bon de livraison." },
  { id: "m12", rarity: "epique", kind: "backpack", after: "a17", name: "La mochila embarrada",
    pt: "La mochila de Camille, llena de barro, con un agujero en el bolsillo. Por ahí se fue la foto.",
    fr: "Le sac à dos de Camille, couvert de boue, avec un trou dans la poche. C'est par là que la photo est partie.",
    caption: "Le bandonéon, lui, n'a pas une égratignure." },
  { id: "m13", rarity: "legendaire", kind: "score", after: "a20", name: "El último tango",
    pt: "Una partitura a lápiz, de 1962: « El último tango — para Stella ». Abajo, con otra letra, más temblorosa: « ...y para la nena ».",
    fr: "Une partition au crayon, de 1962 : « Le dernier tango — pour Stella ». En dessous, d'une autre écriture, plus tremblante : « …et pour la petite ».",
    caption: "Ramón l'a ajoutée hier soir, à l'hôpital." },
  { id: "m14", rarity: "legendaire", kind: "postcard", after: "a20", name: "La postal de Lyon",
    pt: "Una postal de Lyon, con letra redonda: « Ramón: llego el jueves. Guardame un tango. — Stella »",
    fr: "Une carte postale de Lyon, d'une écriture ronde : « Ramón : j'arrive jeudi. Garde-moi un tango. — Stella »",
    caption: "Arrivée à Bariloche trois jours après le dernier tango." },
];

/* Les papiers deviennent des items de vocabulaire comme les autres. */
export const PAPER_ITEMS = PAPERS.map((p) => ({ pt: p.pt, fr: p.fr, ph: p.ph, paper: p.id }));
