import { ALL_ITEMS } from "./units.js";
import { prepareBooks } from "../../lib/books.js";

/* ==================================================================
   EL ÚLTIMO TANGO — une seule histoire en cinq livres de quatre pages,
   de Buenos Aires à la Patagonie. Camille, étudiante en piano à Lyon,
   achète un vieux bandonéon au marché de San Telmo. Dans le soufflet :
   une photo de 1962, sa grand-mère Stella dansant le tango avec un
   certain Ramón… qui ne sait toujours pas qu'il a une fille.

   Syntaxe : {{texte affiché|clé exacte}} marque un mot testable ; la
   clé doit appartenir au chapitre de la page.
   ================================================================== */

export const BOOKS = [
  {
    id: "l1", title: "El bandoneón de San Telmo", subtitle: "Buenos Aires", emoji: "🪗",
    color: "from-sky-500 to-blue-800",
    ending: "Stella, c'est Mamie. En 1962, à vingt ans, elle dansait le tango à Buenos Aires avec un certain Ramón. Elle n'en a jamais dit un mot.",
    pages: [
      {
        unit: "a1", title: "La llegada",
        hook: "« J'ai connu quelqu'un qui portait le même pendentif. »",
        paragraphs: [
          "Camille llega a Buenos Aires un martes de marzo, con una valija y la dirección de una pensión en San Telmo.",
          "En la puerta la espera una señora con un mate en la mano. — {{¡Hola!|hola}} {{Buen día|buen día}}. ¿Vos sos la chica francesa?",
          "— Sí. {{Me llamo|me llamo}} Camille. — Yo soy Ofelia, la dueña. {{¿Todo bien?|¿todo bien?}} ¿Qué tal el viaje?",
          "— {{Bien, ¿y vos?|bien, ¿y vos?}} — Acá, peleando con la escalera — ríe Ofelia, y le da {{un beso|un beso}} en la mejilla.",
          "— {{¿De dónde sos?|¿de dónde sos?}} — {{Soy de Francia|soy de francia}}, de Lyon. — {{Mucho gusto|mucho gusto}}, Camille. {{Bienvenida|bienvenido}} a Buenos Aires.",
          "Ofelia le mira el cuello: un dije de plata con una S, el de su abuela. Se pone pálida. — Yo conocí a alguien con un dije igual. Hace sesenta años.",
        ],
        fr: [
          "Camille arrive à Buenos Aires un mardi de mars, avec une valise et l'adresse d'une pension à San Telmo.",
          "Sur le pas de la porte, une dame l'attend, un maté à la main. — {{Salut !|hola}} {{Bonjour|buen día}}. C'est toi, la Française ?",
          "— Oui. {{Je m'appelle|me llamo}} Camille. — Moi, c'est Ofelia, la propriétaire. {{Tout va bien ?|¿todo bien?}} Et ce voyage ?",
          "— {{Bien, et toi ?|bien, ¿y vos?}} — Moi ? Je me bats avec l'escalier — rit Ofelia, et elle lui fait {{une bise|un beso}} sur la joue.",
          "— {{D'où viens-tu ?|¿de dónde sos?}} — {{Je viens de France|soy de francia}}, de Lyon. — {{Enchantée|mucho gusto}}, Camille. {{Bienvenue|bienvenido}} à Buenos Aires.",
          "Ofelia regarde son cou : un pendentif en argent avec un S, celui de sa grand-mère. Elle pâlit. — J'ai connu quelqu'un qui portait le même pendentif. Il y a soixante ans.",
        ],
        quiz: [
          { q: "D'où vient Camille ?", a: ["De Lyon", "De Paris", "De Madrid"] },
          { q: "Qu'est-ce qui trouble Ofelia ?", a: ["Le pendentif de Camille", "Sa valise", "Son accent"] },
        ],
      },
      {
        unit: "a2", title: "Más despacio",
        hook: "« Va demain à la brocante de San Telmo. Demande le Tano. »",
        paragraphs: [
          "Ofelia le muestra la pensión: la cocina, el patio, las reglas. Habla rapidísimo, y Camille pierde la mitad.",
          "— {{Perdón|perdón}}, {{no entiendo|no entiendo}}. ¿Podés hablar {{más despacio|más despacio}}, {{por favor|por favor}}?",
          "— {{No pasa nada|no pasa nada}}, querida. El mate no se presta, la ducha es de siete a nueve, y los domingos no hay desayuno.",
          "— {{¿Podés repetir?|¿podés repetir?}} Lo del dije... ¿Quién tenía uno igual? — Ofelia hace como que no oye.",
          "— « Feria »... {{¿qué significa?|¿qué significa?}} — pregunta Camille, señalando un cartel en la puerta. — Un mercado de cosas viejas. Mañana, en la plaza Dorrego.",
          "— {{Gracias|gracias}}. — {{De nada|de nada}}. Andá a la feria y preguntá por el Tano. Él te va a contar. Yo no puedo.",
        ],
        fr: [
          "Ofelia lui fait visiter la pension : la cuisine, le patio, les règles. Elle parle à toute vitesse, et Camille perd la moitié.",
          "— {{Pardon|perdón}}, {{je ne comprends pas|no entiendo}}. Tu peux parler {{plus lentement|más despacio}}, {{s'il te plaît|por favor}} ?",
          "— {{Ce n'est pas grave|no pasa nada}}, ma chérie. Le maté ne se prête pas, la douche, c'est de sept à neuf, et le dimanche, pas de petit-déjeuner.",
          "— {{Tu peux répéter ?|¿podés repetir?}} Pour le pendentif… Qui en avait un pareil ? — Ofelia fait semblant de ne pas entendre.",
          "— « Feria »… {{qu'est-ce que ça veut dire ?|¿qué significa?}} — demande Camille en montrant une affiche sur la porte. — Un marché de vieilleries. Demain, sur la place Dorrego.",
          "— {{Merci|gracias}}. — {{De rien|de nada}}. Va à la brocante et demande le Tano. Lui, il te racontera. Moi, je ne peux pas.",
        ],
        quiz: [
          { q: "Où Ofelia envoie-t-elle Camille ?", a: ["À la brocante de la place Dorrego", "Au café du coin", "À l'aéroport"] },
          { q: "Qu'est-ce qui ne se prête pas, à la pension ?", a: ["Le maté", "La douche", "La clé"] },
        ],
      },
      {
        unit: "a3", title: "La feria",
        hook: "« Je le garde pour toi depuis soixante ans. »",
        paragraphs: [
          "El domingo, la plaza Dorrego está llena: antigüedades, sifones, discos, y una pareja que baila tango sobre los adoquines.",
          "En un puesto, un señor muy viejo vende bandoneones. — Soy el Tano — dice. — ¿Buscás algo?",
          "Camille señala un bandoneón negro, gastado. — {{¿Cuánto es?|¿cuánto es?}} — Para los turistas, {{mil|mil}} dólares — dice el Tano, serio.",
          "— No tengo tanta {{plata|la plata}}... Tengo {{cincuenta|cincuenta}} mil {{pesos|el peso}}.",
          "El Tano ve el dije de la S y deja de sonreír. Cuenta despacio: {{uno|uno}}, {{dos|dos}}, {{tres|tres}}... y cierra los ojos.",
          "— Para vos, {{cien|cien}} pesos. Y no quiero {{el cambio|el cambio}}. — ¿Por qué? — Porque este bandoneón es tuyo. Hace sesenta años que lo guardo para vos.",
        ],
        fr: [
          "Le dimanche, la place Dorrego est pleine : des antiquités, des siphons, des disques, et un couple qui danse le tango sur les pavés.",
          "À un stand, un très vieux monsieur vend des bandonéons. — Je suis le Tano — dit-il. — Tu cherches quelque chose ?",
          "Camille montre un bandonéon noir, usé. — {{C'est combien ?|¿cuánto es?}} — Pour les touristes, {{mille|mil}} dollars — dit le Tano, sérieux.",
          "— Je n'ai pas autant {{d'argent|la plata}}… J'ai {{cinquante|cincuenta}} mille {{pesos|el peso}}.",
          "Le Tano voit le pendentif au S et cesse de sourire. Il compte lentement : {{un|uno}}, {{deux|dos}}, {{trois|tres}}… et ferme les yeux.",
          "— Pour toi, {{cent|cien}} pesos. Et je ne veux pas {{la monnaie|el cambio}}. — Pourquoi ? — Parce que ce bandonéon est à toi. Je le garde pour toi depuis soixante ans.",
        ],
        quiz: [
          { q: "Que vend le Tano ?", a: ["Des bandonéons", "Des guitares", "Des pendentifs"] },
          { q: "Combien Camille paie-t-elle finalement ?", a: ["Cent pesos", "Mille dollars", "Cinquante mille pesos"] },
        ],
      },
      {
        unit: "a4", title: "Sábado 3 de marzo",
        hook: "Mamie n'a jamais dit qu'elle avait vécu en Argentine.",
        paragraphs: [
          "{{A la noche|a la noche}}, en su cuarto, Camille abre el fuelle del bandoneón. Adentro hay algo: una foto y un papel doblado.",
          "{{¿Qué hora es?|¿qué hora es?}} Casi {{la medianoche|la medianoche}}. Desde la calle suben un tango y el ruido de un colectivo.",
          "En la foto, una pareja joven baila. Atrás dice: « Stella y Ramón, Boedo, {{sábado|el sábado}} 3 de marzo de 1962 ».",
          "El papel es una nota: « Stella: {{mañana|mañana}}, {{domingo|el domingo}}, {{temprano|temprano}}, sale tu barco. Si algún día volvés, el último tango es tuyo. — R. »",
          "{{Hoy|hoy}} Camille no va a dormir: la chica de la foto tiene veinte años, el pelo corto... y el mismo dije de plata.",
          "Stella es el nombre de su abuela. La abuela de Lyon, la que nunca habló de su juventud. La que siempre dijo que no sabía bailar.",
        ],
        fr: [
          "{{Le soir|a la noche}}, dans sa chambre, Camille ouvre le soufflet du bandonéon. Dedans, il y a quelque chose : une photo et un papier plié.",
          "{{Quelle heure est-il ?|¿qué hora es?}} Presque {{minuit|la medianoche}}. De la rue montent un tango et le bruit d'un bus.",
          "Sur la photo, un jeune couple danse. Au dos : « Stella et Ramón, Boedo, {{samedi|el sábado}} 3 mars 1962 ».",
          "Le papier est un mot : « Stella : {{demain|mañana}}, {{dimanche|el domingo}}, {{tôt|temprano}}, ton bateau part. Si un jour tu reviens, le dernier tango est à toi. — R. »",
          "{{Aujourd'hui|hoy}}, Camille ne dormira pas : la fille de la photo a vingt ans, les cheveux courts… et le même pendentif en argent.",
          "Stella, c'est le prénom de sa grand-mère. La grand-mère de Lyon, celle qui n'a jamais parlé de sa jeunesse. Celle qui a toujours dit qu'elle ne savait pas danser.",
        ],
        quiz: [
          { q: "Qu'y a-t-il dans le soufflet ?", a: ["Une photo et un mot", "Une clé", "Des billets de banque"] },
          { q: "Qui est Stella ?", a: ["La grand-mère de Camille", "La propriétaire de la pension", "La fille du Tano"] },
        ],
      },
    ],
  },
  {
    id: "l2", title: "La milonga de Boedo", subtitle: "Buenos Aires", emoji: "💃",
    color: "from-rose-500 to-rose-800",
    ending: "Ramón a cessé de jouer le jour où le bateau de Stella est parti. Des années plus tard, il écrivait encore — depuis une bodega de Mendoza. Et quelqu'un d'autre le cherche.",
    pages: [
      {
        unit: "a5", title: "Un cortado en Boedo",
        hook: "Ramón jouait ici tous les samedis. Jusqu'en 1962.",
        paragraphs: [
          "Al día siguiente, Camille toma el subte hasta Boedo y entra en un café antiguo: mesas de madera, espejos, fotos de cantores en las paredes.",
          "{{El mozo|el mozo}}, un señor de moño y ochenta años, le trae {{la carta|la carta}}. — ¿Qué te sirvo, piba?",
          "— {{Quería|quería}} {{un cortado|un cortado}} y {{una medialuna|una medialuna}}. — Enseguida.",
          "Camille prueba la medialuna. — ¡{{Está riquísimo|está riquísimo}}! — Es de la panadería de enfrente, desde 1940 — dice el mozo con orgullo.",
          "— {{La cuenta, por favor|la cuenta, por favor}} — dice ella, y pone la foto sobre la mesa. — {{¿Aceptan tarjeta?|¿aceptan tarjeta?}}",
          "El mozo no contesta. Mira la foto un rato largo. — Ramón Ibarra. El mejor bandoneón de Boedo. Tocaba acá todos los sábados... hasta el 62.",
        ],
        fr: [
          "Le lendemain, Camille prend le métro jusqu'à Boedo et entre dans un vieux café : tables en bois, miroirs, photos de chanteurs aux murs.",
          "{{Le serveur|el mozo}}, un monsieur de quatre-vingts ans en nœud papillon, lui apporte {{la carte|la carta}}. — Je te sers quoi, ma petite ?",
          "— {{Je voudrais|quería}} {{un café noisette|un cortado}} et {{un croissant|una medialuna}}. — Tout de suite.",
          "Camille goûte le croissant. — {{C'est délicieux|está riquísimo}} ! — Il vient de la boulangerie d'en face, depuis 1940 — dit le serveur avec fierté.",
          "— {{L'addition, s'il vous plaît|la cuenta, por favor}} — dit-elle en posant la photo sur la table. — {{Vous prenez la carte ?|¿aceptan tarjeta?}}",
          "Le serveur ne répond pas. Il regarde la photo un long moment. — Ramón Ibarra. Le meilleur bandonéon de Boedo. Il jouait ici tous les samedis… jusqu'en 62.",
        ],
        quiz: [
          { q: "Que commande Camille ?", a: ["Un café noisette et un croissant", "Un maté", "Une bière"] },
          { q: "Qui est Ramón Ibarra, selon le serveur ?", a: ["Le meilleur bandonéon de Boedo", "Le patron du café", "Un chanteur de rock"] },
        ],
      },
      {
        unit: "a6", title: "Mate y facturas",
        hook: "Un seul disque pour elle. Puis plus jamais une note.",
        paragraphs: [
          "El mozo se llama Beto. Al otro día la invita a su casa, arriba del café. En la mesa hay {{facturas|las facturas}}, {{dulce de leche|el dulce de leche}} y {{tostadas|las tostadas}} con {{manteca|la manteca}}.",
          "Beto prepara {{el mate|el mate}}: pone {{la yerba|la yerba}}, calienta el agua sin que hierva y le pasa la calabaza. — {{¿Querés un mate?|¿querés un mate?}}",
          "Camille prueba: está {{amargo|amargo}}. — ¿{{Con azúcar|con azúcar}}? — Ni loca — miente ella, y Beto se ríe.",
          "— Stella venía todos los sábados. Bailaba con Ramón hasta la madrugada. Un domingo de marzo se fue en un barco a Francia, y nadie supo por qué.",
          "Camille devuelve el mate. — {{Gracias, no quiero más|gracias, no quiero más}} — dice, como le enseñó Ofelia: acá, « gracias » quiere decir « basta ».",
          "— Ramón fue al puerto, pero llegó tarde — dice Beto. — Grabó un disco para ella, uno solo. Después no tocó nunca más, y un día se fue para el oeste.",
        ],
        fr: [
          "Le serveur s'appelle Beto. Le lendemain, il l'invite chez lui, au-dessus du café. Sur la table, il y a {{des viennoiseries|las facturas}}, {{de la confiture de lait|el dulce de leche}} et {{des tartines grillées|las tostadas}} avec {{du beurre|la manteca}}.",
          "Beto prépare {{le maté|el mate}} : il met {{l'herbe|la yerba}}, chauffe l'eau sans la faire bouillir et lui tend la calebasse. — {{Tu veux un maté ?|¿querés un mate?}}",
          "Camille goûte : il est {{amer|amargo}}. — {{Avec du sucre|con azúcar}} ? — Jamais de la vie — ment-elle, et Beto éclate de rire.",
          "— Stella venait tous les samedis. Elle dansait avec Ramón jusqu'à l'aube. Un dimanche de mars, elle est partie en bateau pour la France, et personne n'a su pourquoi.",
          "Camille rend le maté. — {{Merci, je n'en veux plus|gracias, no quiero más}} — dit-elle, comme Ofelia le lui a appris : ici, « merci » veut dire « ça suffit ».",
          "— Ramón a couru au port, mais il est arrivé trop tard — dit Beto. — Il a enregistré un disque pour elle, un seul. Après, il n'a plus jamais joué, et un jour, il est parti vers l'ouest.",
        ],
        quiz: [
          { q: "Comment Camille boit-elle le maté ?", a: ["Amer, sans sucre", "Avec du sucre", "Avec du lait"] },
          { q: "Que s'est-il passé en mars 1962 ?", a: ["Stella est partie en bateau pour la France", "Ramón s'est marié", "Le café a fermé"] },
        ],
      },
      {
        unit: "a7", title: "La verdulería de Chela",
        hook: "Une adresse à Mendoza, au dos d'une vieille enveloppe.",
        paragraphs: [
          "Beto la lleva a {{la verdulería|la verdulería}} de su hermana Chela, en la esquina. Cajones de fruta, la radio encendida, olor a tierra.",
          "— Chela se acuerda de todo — dice Beto. — Menos de dónde deja los anteojos.",
          "Para romper el hielo, Camille señala {{las paltas|la palta}}. — {{¿Está madura?|¿está madura?}} — Esa sí, tocala. ¿Y {{un kilo|un kilo}} de {{frutillas|la frutilla}}? Están {{frescas|fresco}}.",
          "— {{Medio kilo|medio kilo}} de frutillas. Y de paltas, {{¿me das dos?|¿me das dos?}} {{Nada más|nada más}}, gracias.",
          "Chela mira la foto y se seca las manos en el delantal. — Ramón me escribió durante años. Cartas para Stella, para que yo se las mandara a Francia. Nunca supe su dirección.",
          "Busca en un cajón y le da un sobre amarillo. En el remitente, con letra firme: « R. Ibarra — Bodega Los Álamos — Luján de Cuyo, Mendoza ».",
        ],
        fr: [
          "Beto l'emmène chez {{le primeur|la verdulería}} de sa sœur Chela, au coin de la rue. Des cagettes de fruits, la radio allumée, une odeur de terre.",
          "— Chela se souvient de tout — dit Beto. — Sauf de l'endroit où elle pose ses lunettes.",
          "Pour briser la glace, Camille montre {{les avocats|la palta}}. — {{C'est mûr ?|¿está madura?}} — Celui-là, oui, touche. Et {{un kilo|un kilo}} de {{fraises|la frutilla}} ? Elles sont {{fraîches|fresco}}.",
          "— {{Un demi-kilo|medio kilo}} de fraises. Et des avocats, {{tu m'en donnes deux ?|¿me das dos?}} {{Ce sera tout|nada más}}, merci.",
          "Chela regarde la photo et s'essuie les mains sur son tablier. — Ramón m'a écrit pendant des années. Des lettres pour Stella, pour que je les envoie en France. Je n'ai jamais su son adresse.",
          "Elle fouille dans un tiroir et lui tend une enveloppe jaune. À l'expéditeur, d'une écriture ferme : « R. Ibarra — Bodega Los Álamos — Luján de Cuyo, Mendoza ».",
        ],
        quiz: [
          { q: "Qui est Chela ?", a: ["La sœur de Beto", "La fille d'Ofelia", "Une danseuse de tango"] },
          { q: "Que donne Chela à Camille ?", a: ["Une enveloppe avec une adresse à Mendoza", "Un bandonéon", "Une photo de Stella"] },
        ],
      },
      {
        unit: "a8", title: "El asado del domingo",
        hook: "Quelqu'un d'autre cherche Ramón Ibarra.",
        paragraphs: [
          "El domingo, Beto hace {{un asado|el asado}} en la terraza. Él es {{el parrillero|el parrillero}}: nadie más toca las brasas.",
          "Primero sale {{el choripán|el choripán}}, después {{la provoleta|la provoleta}} y al final {{el bife de chorizo|el bife de chorizo}}. — ¿Cómo lo querés? ¿{{A punto|a punto}} o {{jugoso|jugoso}}?",
          "— {{¡Qué rico!|¡qué rico!}} — dice Camille con la boca llena. — Le falta {{chimichurri|el chimichurri}} — contesta Chela, y le pasa el frasco.",
          "— {{Me encanta|me encanta}} — dice Camille. — Pero {{tengo sed|tengo sed}}. — Beto le sirve un vaso de vino, y se pone serio.",
          "— Hay algo que no te dije. Ayer vino al café un pibe joven, de sombrero. Preguntaba por Ramón Ibarra.",
          "— ¿Y qué le dijiste? — Nada. Pero tenía los mismos ojos que el de la foto.",
        ],
        fr: [
          "Le dimanche, Beto fait {{un barbecue|el asado}} sur la terrasse. C'est lui {{le maître du grill|el parrillero}} : personne d'autre ne touche aux braises.",
          "D'abord vient {{le sandwich à la saucisse|el choripán}}, puis {{le provolone grillé|la provoleta}}, et enfin {{l'entrecôte|el bife de chorizo}}. — Tu la veux comment ? {{À point|a punto}} ou {{saignante|jugoso}} ?",
          "— {{Que c'est bon !|¡qué rico!}} — dit Camille la bouche pleine. — Il manque {{la sauce chimichurri|el chimichurri}} — répond Chela en lui tendant le bocal.",
          "— {{J'adore|me encanta}} — dit Camille. — Mais {{j'ai soif|tengo sed}}. — Beto lui sert un verre de vin, et devient sérieux.",
          "— Il y a une chose que je ne t'ai pas dite. Hier, un jeune est venu au café, avec un chapeau. Il demandait Ramón Ibarra.",
          "— Et qu'est-ce que tu lui as dit ? — Rien. Mais il avait les mêmes yeux que l'homme de la photo.",
        ],
        quiz: [
          { q: "Qui s'occupe du grill ?", a: ["Beto", "Chela", "Camille"] },
          { q: "Qui est venu au café ?", a: ["Un jeune homme au chapeau", "Stella", "Le Tano"] },
        ],
      },
    ],
  },
  {
    id: "l3", title: "Rumbo a Mendoza", subtitle: "Mendoza", emoji: "🚌",
    color: "from-amber-500 to-orange-700",
    ending: "Ramón a quitté Mendoza depuis longtemps. Mais son unique disque l'attendait : « Tangos para Stella », 1962 — avec une dédicace que quelqu'un a voulu effacer.",
    pages: [
      {
        unit: "a9", title: "El micro de la noche",
        hook: "Le garçon au chapeau est dans le même car.",
        paragraphs: [
          "Camille va a {{la terminal|la terminal}} de Retiro con la valija y el bandoneón en brazos. — Un {{pasaje|el pasaje}} a Mendoza, por favor.",
          "— ¿{{Ida y vuelta|ida y vuelta}}? — No, {{solo ida|solo ida}}. — ¿Semicama o {{coche cama|coche cama}}? Son catorce horas. — Coche cama, entonces.",
          "— {{¿A qué hora sale?|¿a qué hora sale?}} — A las nueve de la noche, {{plataforma|la plataforma}} 40. — {{¿A qué hora llega?|¿a qué hora llega?}} — Mañana a las once, si Dios quiere.",
          "Son las nueve menos cinco. {{Estoy llegando tarde|estoy llegando tarde}}, piensa Camille, y corre por la terminal.",
          "Sube {{al micro|el micro}} en el último segundo y busca su asiento: el doce, arriba, al lado de la ventana.",
          "En el asiento de atrás, alguien se saca el sombrero y la mira. Es el pibe del café.",
        ],
        fr: [
          "Camille va à {{la gare routière|la terminal}} de Retiro avec sa valise et le bandonéon dans les bras. — Un {{billet|el pasaje}} pour Mendoza, s'il vous plaît.",
          "— {{Aller-retour|ida y vuelta}} ? — Non, {{aller simple|solo ida}}. — Semi-couchette ou {{couchette|coche cama}} ? C'est quatorze heures de route. — Couchette, alors.",
          "— {{Il part à quelle heure ?|¿a qué hora sale?}} — À neuf heures du soir, {{quai|la plataforma}} 40. — {{Il arrive à quelle heure ?|¿a qué hora llega?}} — Demain à onze heures, si Dieu le veut.",
          "Il est neuf heures moins cinq. {{Je suis en retard|estoy llegando tarde}}, pense Camille, et elle court dans la gare.",
          "Elle monte {{dans le car|el micro}} à la dernière seconde et cherche sa place : la douze, à l'étage, côté fenêtre.",
          "Sur le siège de derrière, quelqu'un ôte son chapeau et la regarde. C'est le garçon du café.",
        ],
        quiz: [
          { q: "Combien de temps dure le trajet ?", a: ["Quatorze heures", "Deux heures", "Trois jours"] },
          { q: "Qui est assis derrière Camille ?", a: ["Le garçon du café", "Beto", "Ofelia"] },
        ],
      },
      {
        unit: "a10", title: "Luján de Cuyo",
        hook: "La bodega est fermée. Mais au mur, il y a une photo de Stella.",
        paragraphs: [
          "En Mendoza, el pibe desaparece en la terminal. Camille toma un colectivo a Luján de Cuyo y se baja en cualquier lado. — {{Estoy perdida|estoy perdido}} — admite.",
          "Le pregunta a un señor en bicicleta: — Perdón, {{¿dónde queda|¿dónde queda?}} la bodega Los Álamos?",
          "— {{Seguí derecho|seguí derecho}} por esta calle, {{doblá a la izquierda|doblá a la izquierda}} en {{la esquina|la esquina}} del almacén, y {{a dos cuadras|a dos cuadras}} la vas a ver. Está {{cerca|cerca}}.",
          "A los costados del camino hay viñedos hasta {{la montaña|la montaña}}. Al fondo, el Aconcagua tiene nieve en la punta, aunque es marzo y hace calor.",
          "La bodega es una casa vieja de adobe, con álamos altos. En la puerta, un cartel: « Cerrado por vendimia ».",
          "Camille mira por la ventana. En la pared, entre botellas, hay una foto enmarcada: una chica de pelo corto que baila. Stella.",
        ],
        fr: [
          "À Mendoza, le garçon disparaît dans la gare routière. Camille prend un bus pour Luján de Cuyo et descend au hasard. — {{Je suis perdue|estoy perdido}} — avoue-t-elle.",
          "Elle demande à un monsieur à vélo : — Pardon, {{où se trouve|¿dónde queda?}} la bodega Los Álamos ?",
          "— {{Continue tout droit|seguí derecho}} dans cette rue, {{tourne à gauche|doblá a la izquierda}} au {{coin|la esquina}} de l'épicerie, et {{deux rues plus loin|a dos cuadras}}, tu la verras. C'est {{tout près|cerca}}.",
          "Au bord du chemin, des vignes jusqu'à {{la montagne|la montaña}}. Au fond, l'Aconcagua a de la neige au sommet, même si on est en mars et qu'il fait chaud.",
          "La bodega est une vieille maison en adobe, entourée de grands peupliers. Sur la porte, une pancarte : « Fermé pour les vendanges ».",
          "Camille regarde par la fenêtre. Au mur, entre les bouteilles, il y a une photo encadrée : une fille aux cheveux courts qui danse. Stella.",
        ],
        quiz: [
          { q: "Pourquoi la bodega est-elle fermée ?", a: ["Pour les vendanges", "Pour travaux", "Parce que c'est dimanche"] },
          { q: "Que voit Camille au mur ?", a: ["Une photo de Stella", "Un bandonéon", "Une carte de Mendoza"] },
        ],
      },
      {
        unit: "a11", title: "Un hostel con parras",
        hook: "Ramón ne vit plus ici. Et quelqu'un attend une Française.",
        paragraphs: [
          "Enfrente de la bodega hay {{un hostel|el hostel}} con un patio lleno de parras. — Hola, {{¿tienen lugar?|¿tienen lugar?}}",
          "— Queda {{una habitación|la habitación}} con {{baño|el baño}} privado. ¿Cuántas noches? — {{Por dos noches|por dos noches}}.",
          "La chica de la recepción le da {{la llave|la llave}}. — {{El desayuno está incluido|el desayuno está incluido}}. Y a la noche prendé {{la calefacción|la calefacción}}: acá hace calor de día y frío de noche.",
          "— {{¿Hay wifi?|¿hay wifi?}} {{¿Cuál es la contraseña?|¿cuál es la contraseña?}} — « Malbec2026 ». Todo en Mendoza tiene que ver con el vino — sonríe la chica.",
          "Camille señala la bodega. — ¿Ramón Ibarra vive ahí? — ¿Don Ramón? No, hace años que se fue al sur. Ahora la bodega es de su familia.",
          "La chica baja la voz. — Pero ayer vino un pibe de sombrero, un Ibarra. Me dijo que si llegaba una francesa con un bandoneón, le avisara.",
        ],
        fr: [
          "En face de la bodega, il y a {{une auberge|el hostel}} avec un patio plein de treilles. — Bonjour, {{vous avez de la place ?|¿tienen lugar?}}",
          "— Il reste {{une chambre|la habitación}} avec {{salle de bain|el baño}} privée. Combien de nuits ? — {{Pour deux nuits|por dos noches}}.",
          "La fille de la réception lui donne {{la clé|la llave}}. — {{Le petit-déjeuner est compris|el desayuno está incluido}}. Et le soir, allume {{le chauffage|la calefacción}} : ici, il fait chaud le jour et froid la nuit.",
          "— {{Il y a du wifi ?|¿hay wifi?}} {{C'est quoi, le mot de passe ?|¿cuál es la contraseña?}} — « Malbec2026 ». Tout, à Mendoza, a un rapport avec le vin — sourit la fille.",
          "Camille montre la bodega. — Ramón Ibarra habite là ? — Don Ramón ? Non, il est parti dans le Sud il y a des années. Maintenant, la bodega appartient à sa famille.",
          "La fille baisse la voix. — Mais hier, un garçon au chapeau est venu, un Ibarra. Il m'a dit de le prévenir si une Française arrivait avec un bandonéon.",
        ],
        quiz: [
          { q: "Où vit Ramón aujourd'hui ?", a: ["Dans le Sud", "À Buenos Aires", "En France"] },
          { q: "Qu'a demandé le garçon au chapeau ?", a: ["D'être prévenu si une Française arrivait", "Une chambre pour deux nuits", "Le mot de passe du wifi"] },
        ],
      },
      {
        unit: "a12", title: "La feria de artesanos",
        hook: "« Pour Stella, qui est partie avec… » La fin est rayée.",
        paragraphs: [
          "El sábado, para esperar a que abra la bodega, Camille pasea por {{la feria|la feria}} de la plaza Independencia.",
          "Entre ponchos, mates y cuchillos, hay un puesto de discos viejos. — {{Solo estoy mirando|solo estoy mirando}} — dice ella.",
          "Un disco tiene la tapa gastada: « Ramón Ibarra — Tangos para Stella — 1962 ». Camille deja de respirar. — {{¿Cuánto sale?|¿cuánto sale?}} — Veinte mil.",
          "— ¡{{Es caro|es caro}}! {{¿Me hacés un descuento?|¿me hacés un descuento?}} — Quince mil, {{en efectivo|en efectivo}}. — {{Me lo llevo|me lo llevo}}.",
          "En el hostel, Camille saca el disco de la funda. Adentro, escrita a mano, hay una dedicatoria.",
          "« Para Stella, que se fue con... » Las últimas palabras están tachadas con tinta negra. Alguien no quiso que se leyeran.",
        ],
        fr: [
          "Le samedi, en attendant que la bodega ouvre, Camille se promène dans {{la foire|la feria}} de la place Independencia.",
          "Entre ponchos, calebasses à maté et couteaux, il y a un stand de vieux disques. — {{Je regarde seulement|solo estoy mirando}} — dit-elle.",
          "Un disque a une pochette usée : « Ramón Ibarra — Tangos pour Stella — 1962 ». Camille cesse de respirer. — {{Ça coûte combien ?|¿cuánto sale?}} — Vingt mille.",
          "— {{C'est cher|es caro}} ! {{Tu me fais une réduc ?|¿me hacés un descuento?}} — Quinze mille, {{en espèces|en efectivo}}. — {{Je le prends|me lo llevo}}.",
          "À l'auberge, Camille sort le disque de sa pochette. À l'intérieur, écrite à la main, il y a une dédicace.",
          "« Pour Stella, qui est partie avec… » Les derniers mots sont rayés à l'encre noire. Quelqu'un n'a pas voulu qu'on les lise.",
        ],
        quiz: [
          { q: "Quel est le titre du disque ?", a: ["Tangos pour Stella", "Le dernier bateau", "Buenos Aires 1962"] },
          { q: "Qu'a-t-on fait à la dédicace ?", a: ["On a rayé les derniers mots", "On l'a déchirée", "On l'a traduite"] },
        ],
      },
    ],
  },
  {
    id: "l4", title: "Los Ibarra", subtitle: "Mendoza", emoji: "🍇",
    color: "from-purple-500 to-fuchsia-800",
    ending: "Stella est partie enceinte. Sa fille s'appelle Marie — comme la mère de Camille. Et Julián, le garçon au chapeau, veut emporter le bandonéon de son grand-père.",
    pages: [
      {
        unit: "a13", title: "La familia Ibarra",
        hook: "« Tu as les yeux de Ramón. »",
        paragraphs: [
          "El lunes, la bodega abre. {{Un nene|el nene}} de siete años juega con un perro en la entrada. — ¡{{Mamá|la mamá}}, hay una chica con un acordeón! — ¡Es un bandoneón, Nico!",
          "Sale un hombre con las manos violetas de uva. — Martín Ibarra. Soy {{el papá|el papá}} de este desastre. ¿Te ayudo?",
          "Atrás aparece una chica de la edad de Camille. — Sofía, {{la hija|la hija}} mayor. Acá trabaja toda {{la familia|la familia}}.",
          "Nico la mira sin vergüenza. — {{¿Cuántos años tenés?|¿cuántos años tenés?}} {{¿Tenés hermanos?|¿tenés hermanos?}} — ¡Nico! — lo reta Sofía, riéndose.",
          "Entonces llega una señora muy vieja, con bastón. — Es Elena, la hermana de Ramón — dice Martín. — {{La abuela|la abuela}} de todos, digamos.",
          "Elena mira a Camille un largo rato. Le toca la cara con la mano seca. — {{Te parecés a|te parecés a}} alguien. Tenés los ojos de Ramón.",
        ],
        fr: [
          "Le lundi, la bodega ouvre. {{Un petit garçon|el nene}} de sept ans joue avec un chien à l'entrée. — {{Maman|la mamá}}, il y a une fille avec un accordéon ! — C'est un bandonéon, Nico !",
          "Un homme sort, les mains violettes de raisin. — Martín Ibarra. Je suis {{le papa|el papá}} de cette catastrophe. Je peux t'aider ?",
          "Derrière apparaît une fille de l'âge de Camille. — Sofía, {{la fille|la hija}} aînée. Ici, toute {{la famille|la familia}} travaille.",
          "Nico la dévisage sans gêne. — {{Tu as quel âge ?|¿cuántos años tenés?}} {{Tu as des frères et sœurs ?|¿tenés hermanos?}} — Nico ! — le gronde Sofía en riant.",
          "Arrive alors une très vieille dame, avec une canne. — C'est Elena, la sœur de Ramón — dit Martín. — {{La grand-mère|la abuela}} de tout le monde, disons.",
          "Elena regarde Camille longtemps. Elle lui touche le visage de sa main sèche. — {{Tu ressembles à|te parecés a}} quelqu'un. Tu as les yeux de Ramón.",
        ],
        quiz: [
          { q: "Qui est Elena ?", a: ["La sœur de Ramón", "La femme de Martín", "La mère de Stella"] },
          { q: "Que dit Elena à Camille ?", a: ["Qu'elle a les yeux de Ramón", "Qu'elle doit partir", "Qu'elle danse bien"] },
        ],
      },
      {
        unit: "a14", title: "La vendimia",
        hook: "Depuis une semaine, Ramón ne demande qu'une chose.",
        paragraphs: [
          "Martín le muestra {{la bodega|la bodega}}: barricas, olor a madera, y afuera, {{la vendimia|la vendimia}} en pleno. Todos cortan {{uva|la uva}} desde las seis.",
          "— {{¿A qué te dedicás?|¿a qué te dedicás?}} — le pregunta Sofía, con una tijera en la mano. — {{Soy estudiante|soy estudiante}}. {{Estudio|estudio}} piano en Lyon.",
          "— Yo trabajo acá, pero {{el laburo|el laburo}} de verdad es {{el vino|el vino}}: el año que viene empiezo {{la facultad|la facultad}} de enología.",
          "Martín descuelga una foto vieja: Ramón joven, con el bandoneón, en el campo. — Mi viejo era {{músico|el músico}}. Cuando llegó de Buenos Aires, no tocaba más. Trabajó la tierra cuarenta años.",
          "— Hace veinte años se fue a vivir solo a la Patagonia, a una cabaña junto a un lago. Dice que ahí el viento le hace de música.",
          "Martín baja la voz. — Pero está enfermo. Y desde hace una semana pide una sola cosa: su bandoneón.",
        ],
        fr: [
          "Martín lui fait visiter {{le domaine|la bodega}} : des fûts, une odeur de bois, et dehors, {{les vendanges|la vendimia}} battent leur plein. Tout le monde coupe {{le raisin|la uva}} depuis six heures.",
          "— {{Tu fais quoi dans la vie ?|¿a qué te dedicás?}} — lui demande Sofía, un sécateur à la main. — {{Je suis étudiante|soy estudiante}}. {{J'étudie|estudio}} le piano à Lyon.",
          "— Moi, je travaille ici, mais {{le vrai boulot|el laburo}}, c'est {{le vin|el vino}} : l'an prochain, je commence {{la fac|la facultad}} d'œnologie.",
          "Martín décroche une vieille photo : Ramón jeune, avec le bandonéon, à la campagne. — Mon père était {{musicien|el músico}}. En arrivant de Buenos Aires, il ne jouait plus. Il a travaillé la terre pendant quarante ans.",
          "— Il y a vingt ans, il est parti vivre seul en Patagonie, dans une cabane au bord d'un lac. Il dit que là-bas, le vent lui tient lieu de musique.",
          "Martín baisse la voix. — Mais il est malade. Et depuis une semaine, il ne demande qu'une chose : son bandonéon.",
        ],
        quiz: [
          { q: "Qu'étudie Camille ?", a: ["Le piano", "L'œnologie", "La médecine"] },
          { q: "Que demande Ramón depuis une semaine ?", a: ["Son bandonéon", "Une lettre de Stella", "Sa sœur Elena"] },
        ],
      },
      {
        unit: "a15", title: "Viento zonda",
        hook: "« Elle s'appelle Marie. » Comme la mère de Camille.",
        paragraphs: [
          "A la tarde sopla el zonda, un viento caliente que baja de la cordillera. — {{¡Qué calor!|¡qué calor!}} — dice Camille. — En {{verano|el verano}}, acá {{hace mucho calor|hace mucho calor}} — contesta Sofía.",
          "Se sientan con Elena a {{la sombra|la sombra}} de una parra. {{El sol|el sol}} quema las piedras del patio.",
          "Elena habla con los ojos cerrados. — Me acuerdo del día: {{hacía frío|hace frío}} y {{llovía|llueve}}, cosa rara en Mendoza. Llegó una carta de Francia. De Stella.",
          "— Ramón la leyó en la puerta, bajo {{el paraguas|el paraguas}}, y no dijo nada. Después la guardó, y nunca más la volvió a abrir.",
          "— Yo la leí a escondidas. — Elena abre los ojos. — Decía: « Tuve una hija en septiembre. No la busques. »",
          "— ¿Y el nombre? — pregunta Camille, sin voz. — Marie. Se llama Marie. — Camille se agarra de la mesa: Marie es el nombre de su mamá.",
        ],
        fr: [
          "L'après-midi souffle le zonda, un vent brûlant qui descend de la cordillère. — {{Quelle chaleur !|¡qué calor!}} — dit Camille. — En {{été|el verano}}, ici, {{il fait très chaud|hace mucho calor}} — répond Sofía.",
          "Elles s'assoient avec Elena à {{l'ombre|la sombra}} d'une treille. {{Le soleil|el sol}} brûle les pierres du patio.",
          "Elena parle les yeux fermés. — Je me souviens du jour : {{il faisait froid|hace frío}} et {{il pleuvait|llueve}}, ce qui est rare à Mendoza. Une lettre est arrivée de France. De Stella.",
          "— Ramón l'a lue sur le pas de la porte, sous {{le parapluie|el paraguas}}, et il n'a rien dit. Puis il l'a rangée, et ne l'a plus jamais rouverte.",
          "— Moi, je l'ai lue en cachette. — Elena ouvre les yeux. — Elle disait : « J'ai eu une fille en septembre. Ne la cherche pas. »",
          "— Et son prénom ? — demande Camille, sans voix. — Marie. Elle s'appelle Marie. — Camille s'agrippe à la table : Marie, c'est le prénom de sa mère.",
        ],
        quiz: [
          { q: "Qu'est-ce que le zonda ?", a: ["Un vent chaud qui descend de la cordillère", "Un vin de Mendoza", "Une danse"] },
          { q: "Que disait la lettre de Stella ?", a: ["Qu'elle avait eu une fille", "Qu'elle revenait bientôt", "Qu'elle se mariait"] },
        ],
      },
      {
        unit: "a16", title: "Julián",
        hook: "« Ce bandonéon est à mon grand-père. Demain, je l'emporte. »",
        paragraphs: [
          "Camille no puede hablar. Sofía le agarra la mano. — {{¿Qué te pasa?|¿qué te pasa?}} {{¿Estás bien?|¿estás bien?}}",
          "— {{Estoy emocionada|estoy emocionado}}... y {{tengo miedo|tengo miedo}}. Mi mamá se llama Marie. Nació en septiembre de 1962.",
          "— {{No te preocupes|no te preocupes}} — dice Elena, y le acaricia el pelo. — {{Tranqui|tranqui}}, nena. Hace sesenta años que espero este día.",
          "— {{Lo siento mucho|lo siento mucho}} — dice Camille, sin saber bien por qué. — {{Todo va a salir bien|todo va a salir bien}} — contesta Sofía.",
          "Entonces se abre la puerta del patio. Entra un pibe con sombrero, cubierto de polvo. — Julián, mi hermano — dice Sofía. — ¿Dónde estabas?",
          "Julián mira a Camille, después el bandoneón. — Buscándola a ella. — Se saca el sombrero. — Ese bandoneón es de mi abuelo. Y mañana me lo llevo al sur.",
        ],
        fr: [
          "Camille n'arrive pas à parler. Sofía lui prend la main. — {{Qu'est-ce qui t'arrive ?|¿qué te pasa?}} {{Tu vas bien ?|¿estás bien?}}",
          "— {{Je suis émue|estoy emocionado}}… et {{j'ai peur|tengo miedo}}. Ma mère s'appelle Marie. Elle est née en septembre 1962.",
          "— {{Ne t'inquiète pas|no te preocupes}} — dit Elena en lui caressant les cheveux. — {{Du calme|tranqui}}, petite. J'attends ce jour depuis soixante ans.",
          "— {{Je suis vraiment désolée|lo siento mucho}} — dit Camille, sans bien savoir pourquoi. — {{Tout va bien se passer|todo va a salir bien}} — répond Sofía.",
          "C'est alors que la porte du patio s'ouvre. Entre un garçon au chapeau, couvert de poussière. — Julián, mon frère — dit Sofía. — Où tu étais ?",
          "Julián regarde Camille, puis le bandonéon. — Je la cherchais, elle. — Il ôte son chapeau. — Ce bandonéon est à mon grand-père. Et demain, je l'emporte dans le Sud.",
        ],
        quiz: [
          { q: "Quand est née la mère de Camille ?", a: ["En septembre 1962", "En mars 1962", "En 1976"] },
          { q: "Qui est Julián ?", a: ["Le frère de Sofía, petit-fils de Ramón", "Le fils du Tano", "Le serveur du café"] },
        ],
      },
    ],
  },
  {
    id: "l5", title: "El último tango", subtitle: "Patagonie", emoji: "🏔️",
    color: "from-cyan-500 to-slate-700",
    ending: "Ramón a eu son dernier tango. Dans la lettre de 1963, il y a une adresse à Lyon — et une promesse qu'il n'a jamais tenue. Cette fois, c'est Camille qui la tiendra.",
    pages: [
      {
        unit: "a17", title: "Tormenta en el sendero",
        hook: "La photo de Stella s'est envolée dans la tempête.",
        paragraphs: [
          "Julián y Camille viajan juntos a Bariloche: él no quiere soltar el bandoneón, ella no quiere soltar a Julián. Ramón vive en una cabaña al final de {{un sendero|el sendero}}, junto al lago.",
          "A mitad de camino se larga {{una tormenta|la tormenta}}. — {{¡Cuidado!|¡cuidado!}} — grita Julián. Camille resbala en las piedras. — ¡{{Me caí|me caí}}!",
          "— {{No me puedo mover|no me puedo mover}}... {{¡Ayuda!|¡ayuda!}} — Julián saca {{el celular|el celular}}: no hay señal.",
          "Corre hasta la casilla de {{los guardaparques|el guardaparque}}. — {{¡Es urgente!|es urgente}} {{¡Llamá a una ambulancia!|llamá a una ambulancia}}",
          "Mientras la suben a la camilla, Camille abre la mochila: el bandoneón está bien. Pero la foto de Stella no está.",
          "Allá arriba, en el viento, un papel chiquito vuela sobre el lago y desaparece entre los árboles.",
        ],
        fr: [
          "Julián et Camille partent ensemble pour Bariloche : lui ne veut pas lâcher le bandonéon, elle ne veut pas lâcher Julián. Ramón vit dans une cabane au bout d'{{un sentier|el sendero}}, au bord du lac.",
          "À mi-chemin éclate {{une tempête|la tormenta}}. — {{Attention !|¡cuidado!}} — crie Julián. Camille glisse sur les pierres. — {{Je suis tombée|me caí}} !",
          "— {{Je ne peux pas bouger|no me puedo mover}}… {{À l'aide !|¡ayuda!}} — Julián sort {{son portable|el celular}} : pas de réseau.",
          "Il court jusqu'à la cabane {{des gardes forestiers|el guardaparque}}. — {{C'est urgent !|es urgente}} {{Appelez une ambulance !|llamá a una ambulancia}}",
          "Pendant qu'on la monte sur le brancard, Camille ouvre son sac à dos : le bandonéon n'a rien. Mais la photo de Stella n'est plus là.",
          "Là-haut, dans le vent, un petit bout de papier vole au-dessus du lac et disparaît entre les arbres.",
        ],
        quiz: [
          { q: "Pourquoi Julián ne peut-il pas appeler ?", a: ["Il n'y a pas de réseau", "Son téléphone est cassé", "Il a oublié son portable"] },
          { q: "Qu'est-ce qui a disparu ?", a: ["La photo de Stella", "Le bandonéon", "Le pendentif"] },
        ],
      },
      {
        unit: "a18", title: "En la guardia",
        hook: "Ramón est hospitalisé ici. Au troisième étage.",
        paragraphs: [
          "En {{la guardia|la guardia}} del hospital de Bariloche, una médica le revisa el pie hinchado. — {{Me duele acá|me duele acá}} — dice Camille, tocándose {{el tobillo|el tobillo}}.",
          "— {{¿Es grave?|¿es grave?}} — No, es un esguince. Pero vamos a hacer {{una radiografía|la radiografía}}, por las dudas.",
          "La médica le hace {{la receta|la receta}}. — Este {{remedio|el remedio}}, dos veces por día. Lo comprás en {{la farmacia|la farmacia}} de enfrente. Y nada de correr por la montaña.",
          "Julián entra con dos cafés. Está pálido. — Camille... No es casualidad. Mi abuelo {{está internado|está internado}} acá, en el tercer piso. Desde el martes.",
          "— ¿Y cómo está? — Cansado. Pero cuando le conté de vos, se sentó en la cama por primera vez en una semana.",
          "— Dice que quiere verte. Mañana. Y que lleves el bandoneón. — La médica, desde la puerta: — {{¡Que te mejores!|¡que te mejores!}}",
        ],
        fr: [
          "Aux {{urgences|la guardia}} de l'hôpital de Bariloche, une médecin examine son pied enflé. — {{J'ai mal ici|me duele acá}} — dit Camille en touchant {{sa cheville|el tobillo}}.",
          "— {{C'est grave ?|¿es grave?}} — Non, c'est une entorse. Mais on va faire {{une radio|la radiografía}}, au cas où.",
          "La médecin lui fait {{une ordonnance|la receta}}. — Ce {{médicament|el remedio}}, deux fois par jour. Tu l'achètes à {{la pharmacie|la farmacia}} d'en face. Et interdiction de courir dans la montagne.",
          "Julián entre avec deux cafés. Il est pâle. — Camille… Ce n'est pas un hasard. Mon grand-père {{est hospitalisé|está internado}} ici, au troisième étage. Depuis mardi.",
          "— Et comment il va ? — Fatigué. Mais quand je lui ai parlé de toi, il s'est assis dans son lit pour la première fois en une semaine.",
          "— Il dit qu'il veut te voir. Demain. Et que tu apportes le bandonéon. — La médecin, depuis la porte : — {{Bon rétablissement !|¡que te mejores!}}",
        ],
        quiz: [
          { q: "Qu'a Camille ?", a: ["Une entorse à la cheville", "Une fracture", "De la fièvre"] },
          { q: "Où est Ramón ?", a: ["Au troisième étage du même hôpital", "Dans sa cabane", "À Mendoza"] },
        ],
      },
      {
        unit: "a19", title: "Una carta sin mandar",
        hook: "Une lettre de 1963, jamais envoyée. Et un message pour Lyon.",
        paragraphs: [
          "Esa noche, Julián le escribe desde el hotel. — {{¿Nos vemos?|¿nos vemos?}} Tengo que contarte algo antes de mañana.",
          "— {{¿Dónde nos encontramos?|¿dónde nos encontramos?}} — En el muelle, frente al lago. — {{¿A qué hora?|¿a qué hora?}} — {{Esta noche|esta noche}}, a las nueve.",
          "— {{Perfecto|perfecto}}. — {{Te espero|te espero}} — escribe él. A las nueve menos cinco, Camille contesta: — {{Ya voy|ya voy}}, {{estoy en camino|estoy en camino}}.",
          "En el muelle, Julián le da un sobre viejo, cerrado. — Es la carta que mi abuelo le escribió a Stella en 1963. Nunca la mandó. Quiere que la leas vos.",
          "De vuelta en el hotel, Camille llama a Lyon. Nadie contesta. Le deja un mensaje a su abuela: — Mamie, {{llamame|llamame}}. Estoy en Argentina. Con Ramón.",
          "Después le escribe a su mamá: « {{Tengo ganas de verte|tengo ganas de verte}}. Tengo que contarte quién es tu papá. » Y apaga el celular antes de arrepentirse.",
        ],
        fr: [
          "Ce soir-là, Julián lui écrit depuis l'hôtel. — {{On se voit ?|¿nos vemos?}} Il faut que je te dise quelque chose avant demain.",
          "— {{On se retrouve où ?|¿dónde nos encontramos?}} — Sur le ponton, face au lac. — {{À quelle heure ?|¿a qué hora?}} — {{Ce soir|esta noche}}, à neuf heures.",
          "— {{Parfait|perfecto}}. — {{Je t'attends|te espero}} — écrit-il. À neuf heures moins cinq, Camille répond : — {{J'arrive|ya voy}}, {{je suis en route|estoy en camino}}.",
          "Sur le ponton, Julián lui tend une vieille enveloppe, fermée. — C'est la lettre que mon grand-père a écrite à Stella en 1963. Il ne l'a jamais envoyée. Il veut que ce soit toi qui la lises.",
          "De retour à l'hôtel, Camille appelle Lyon. Personne ne répond. Elle laisse un message à sa grand-mère : — Mamie, {{appelle-moi|llamame}}. Je suis en Argentine. Avec Ramón.",
          "Puis elle écrit à sa mère : « {{J'ai envie de te voir|tengo ganas de verte}}. Il faut que je te dise qui est ton père. » Et elle éteint son portable avant de changer d'avis.",
        ],
        quiz: [
          { q: "Que donne Julián à Camille ?", a: ["Une lettre jamais envoyée", "Le bandonéon", "Une photo"] },
          { q: "Qui Camille appelle-t-elle ?", a: ["Sa grand-mère, à Lyon", "Beto", "Ofelia"] },
        ],
      },
      {
        unit: "a20", title: "El último tango",
        hook: "« Stella… Et la petite ? »",
        paragraphs: [
          "Al otro día, Ramón espera en una silla de ruedas, frente a la ventana del tercer piso. Tiene ochenta y seis años y las manos más lindas del mundo.",
          "— {{¡Che!|¡che!}} ¿Vos sos la francesa? — dice con una sonrisa torcida. — {{¿Qué onda?|¿qué onda?}} Pasá, pasá, que no muerdo.",
          "Camille le pone el bandoneón en las rodillas. Ramón lo acaricia como a un perro viejo. — {{¡Qué lindo!|¡qué lindo!}} Sesenta años... Lo extrañé {{un montón|un montón}}.",
          "Ella le muestra el dije de la S. Ramón deja de sonreír. — Stella... ¿Y la nena? — Se llama Marie. Es mi mamá. — Ramón cierra los ojos. Cuando los abre, están mojados. — ¿{{Posta|posta}}? — Posta.",
          "Entonces abre el fuelle y toca. Un tango lento, que nadie en el piso conoce. Las enfermeras dejan de caminar. — {{¡Bárbaro!|¡bárbaro!}} — susurra {{un pibe|el pibe}} desde la puerta.",
          "Cuando termina, Ramón le da la carta de 1963. — Leela vos, {{piba|la piba}}. Yo ya me la sé de memoria. — Camille abre el sobre: « Stella: te esperé en el puerto hasta que el barco fue un punto... »",
        ],
        fr: [
          "Le lendemain, Ramón attend dans un fauteuil roulant, face à la fenêtre du troisième étage. Il a quatre-vingt-six ans et les plus belles mains du monde.",
          "— {{Hé !|¡che!}} C'est toi, la Française ? — dit-il avec un sourire en coin. — {{Quoi de neuf ?|¿qué onda?}} Entre, entre, je ne mords pas.",
          "Camille pose le bandonéon sur ses genoux. Ramón le caresse comme un vieux chien. — {{Qu'il est beau !|¡qué lindo!}} Soixante ans… Il m'a {{tellement|un montón}} manqué.",
          "Elle lui montre le pendentif au S. Ramón cesse de sourire. — Stella… Et la petite ? — Elle s'appelle Marie. C'est ma mère. — Ramón ferme les yeux. Quand il les rouvre, ils sont mouillés. — {{Pour de vrai ?|posta}} — Pour de vrai.",
          "Alors il ouvre le soufflet et joue. Un tango lent, que personne à l'étage ne connaît. Les infirmières s'arrêtent. — {{Génial|¡bárbaro!}} — murmure {{un gamin|el pibe}} depuis la porte.",
          "Quand il a fini, Ramón lui tend la lettre de 1963. — Lis-la, toi, {{ma petite|la piba}}. Moi, je la connais par cœur. — Camille ouvre l'enveloppe : « Stella : je t'ai attendue sur le quai jusqu'à ce que le bateau ne soit plus qu'un point… »",
        ],
        quiz: [
          { q: "Quel âge a Ramón ?", a: ["Quatre-vingt-six ans", "Soixante ans", "Cent ans"] },
          { q: "Que fait Ramón avec le bandonéon ?", a: ["Il joue un tango lent", "Il le vend", "Il le donne à Julián"] },
        ],
      },
    ],
  },
];

export const AR_BOOKS = prepareBooks(BOOKS, ALL_ITEMS);
