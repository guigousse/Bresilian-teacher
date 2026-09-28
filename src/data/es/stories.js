import { ALL_ITEMS } from "./units.js";
import { prepareBooks } from "../../lib/books.js";

/* ==================================================================
   LA GUITARRA — une seule histoire en cinq livres de quatre pages, de
   Madrid à Grenade. Nina, étudiante de Perpignan, trouve derrière un
   carreau de sa chambre une lettre de 1976 adressée à sa grand-mère,
   signée d'un arrière-grand-père guitariste qui a quitté l'Espagne en
   1939, y est revenu en 1976… et n'est jamais rentré.

   Syntaxe : {{texte affiché|clé exacte}} marque un mot testable ; la
   clé doit appartenir au chapitre de la page.
   ================================================================== */

export const BOOKS = [
  {
    id: "l1", title: "La llave del tercero B", subtitle: "Madrid", emoji: "🗝️",
    color: "from-red-500 to-red-800",
    ending: "La lettre est adressée à Nieves — le prénom de sa grand-mère. Son arrière-grand-père l'a écrite dans cette chambre, en 1976, juste avant de disparaître.",
    pages: [
      {
        unit: "e1", title: "La llegada",
        hook: "« Ça fait des années que je n'avais pas entendu ce nom dans cette maison. »",
        paragraphs: [
          "Nina llega a Madrid un lunes de septiembre, con una maleta y la dirección de un piso en Lavapiés.",
          "En el portal la espera una señora mayor. — {{Hola|hola}}, buenos días. ¿Eres la chica francesa?",
          "— Sí. {{Me llamo|me llamo}} Nina. — Yo soy Carmen, la dueña. {{¿Qué tal?|¿qué tal?}} ¿Buen viaje?",
          "— {{Muy bien|muy bien}}, gracias. ¿Y tú? — Cansada de las escaleras, hija — ríe Carmen.",
          "— {{¿De dónde eres?|¿de dónde eres?}} — {{Soy de Francia|soy de francia}}, de Perpiñán. — {{Encantada|encantado}}, Nina. {{Bienvenida|bienvenido}} a Madrid.",
          "Carmen mira el contrato, lee el apellido y se queda quieta. — Serrano... Hace muchos años que no oía ese nombre en esta casa.",
        ],
        fr: [
          "Nina arrive à Madrid un lundi de septembre, avec une valise et l'adresse d'un appartement à Lavapiés.",
          "Dans l'entrée de l'immeuble, une dame âgée l'attend. — {{Salut|hola}}, bonjour. Tu es la Française ?",
          "— Oui. {{Je m'appelle|me llamo}} Nina. — Moi, c'est Carmen, la propriétaire. {{Ça va ?|¿qué tal?}} Bon voyage ?",
          "— {{Très bien|muy bien}}, merci. Et toi ? — Fatiguée par les escaliers, ma fille — rit Carmen.",
          "— {{D'où viens-tu ?|¿de dónde eres?}} — {{Je viens de France|soy de francia}}, de Perpignan. — {{Enchantée|encantado}}, Nina. {{Bienvenue|bienvenido}} à Madrid.",
          "Carmen regarde le contrat, lit le nom de famille et reste immobile. — Serrano… Ça fait des années que je n'avais pas entendu ce nom dans cette maison.",
        ],
        quiz: [
          { q: "D'où vient Nina ?", a: ["De Perpignan, en France", "De Paris", "De Madrid"] },
          { q: "Qu'est-ce qui trouble Carmen ?", a: ["Le nom de famille de Nina", "Son accent", "Sa valise"] },
        ],
      },
      {
        unit: "e2", title: "Más despacio",
        hook: "Pourquoi ne faudrait-il surtout pas toucher à ce carreau bleu ?",
        paragraphs: [
          "Carmen le enseña el piso: la cocina, el balcón, las normas. Habla muy rápido, y Nina pierde la mitad.",
          "— {{Perdón|perdón}}, {{no entiendo|no entiendo}}. {{Más despacio, por favor|más despacio, por favor}}.",
          "— {{No pasa nada|no pasa nada}}, hija — Carmen respira y empieza otra vez. — La basura, los martes. Y en tu cuarto, no toques el azulejo suelto.",
          "— {{¿Puedes repetir?|¿puedes repetir?}} — El azulejo de la pared, el azul. No se toca.",
          "— « Azulejo »... {{¿qué significa?|¿qué significa?}} — Carmen señala la pared: un cuadrado de cerámica azul, un poco torcido.",
          "— {{Gracias|gracias}} — dice Nina. — {{De nada|de nada}}. Pero no lo toques — repite Carmen, y cierra la puerta.",
        ],
        fr: [
          "Carmen lui fait visiter l'appartement : la cuisine, le balcon, les règles. Elle parle très vite, et Nina perd la moitié.",
          "— {{Pardon|perdón}}, {{je ne comprends pas|no entiendo}}. {{Plus lentement, s'il vous plaît|más despacio, por favor}}.",
          "— {{Ce n'est pas grave|no pasa nada}}, ma fille — Carmen reprend son souffle et recommence. — Les poubelles, le mardi. Et dans ta chambre, ne touche pas au carreau qui bouge.",
          "— {{Tu peux répéter ?|¿puedes repetir?}} — Le carreau du mur, le bleu. On n'y touche pas.",
          "— « Azulejo »… {{qu'est-ce que ça veut dire ?|¿qué significa?}} — Carmen montre le mur : un carré de céramique bleue, un peu de travers.",
          "— {{Merci|gracias}} — dit Nina. — {{De rien|de nada}}. Mais n'y touche pas — répète Carmen, et elle referme la porte.",
        ],
        quiz: [
          { q: "Quel jour sort-on les poubelles ?", a: ["Le mardi", "Le lundi", "Le dimanche"] },
          { q: "À quoi ne faut-il pas toucher ?", a: ["Au carreau bleu qui bouge", "Au balcon", "À la guitare"] },
        ],
      },
      {
        unit: "e3", title: "Tercero B",
        hook: "Derrière le carreau qu'il ne fallait pas toucher : une boîte rouillée.",
        paragraphs: [
          "— {{¿Cuánto cuesta?|¿cuánto cuesta?}} — pregunta Nina en la cocina, con el sobre del dinero en la mano.",
          "— Cuatrocientos al mes. Y {{cien|cien}} de fianza — dice Carmen.",
          "Nina cuenta los billetes: {{veinte|veinte}}, {{cincuenta|cincuenta}}... Carmen le da {{dos|dos}} llaves: la del portal y la del piso.",
          "— Tu cuarto está al fondo, después de {{tres|tres}} escalones. Solo tienes {{una|uno}} ventana, pero da a la plaza.",
          "Por la noche, Nina cuelga una foto de su abuela en la pared. Da un golpecito sin querer... y el azulejo azul cae al suelo.",
          "Detrás, en un hueco de la pared, hay una caja de lata oxidada.",
        ],
        fr: [
          "— {{Combien ça coûte ?|¿cuánto cuesta?}} — demande Nina dans la cuisine, l'enveloppe d'argent à la main.",
          "— Quatre cents par mois. Et {{cent|cien}} de caution — dit Carmen.",
          "Nina compte les billets : {{vingt|veinte}}, {{cinquante|cincuenta}}… Carmen lui donne {{deux|dos}} clés : celle de l'immeuble et celle de l'appartement.",
          "— Ta chambre est au fond, après {{trois|tres}} marches. Tu n'as qu'{{une|uno}} fenêtre, mais elle donne sur la place.",
          "Le soir, Nina accroche une photo de sa grand-mère au mur. Elle donne un petit coup sans le vouloir… et le carreau bleu tombe par terre.",
          "Derrière, dans un creux du mur, il y a une boîte en fer-blanc rouillée.",
        ],
        quiz: [
          { q: "Combien coûte la caution ?", a: ["Cent euros", "Cinquante euros", "Vingt euros"] },
          { q: "Que trouve Nina derrière le carreau ?", a: ["Une boîte en fer rouillée", "Un trou vide", "Une photo"] },
        ],
      },
      {
        unit: "e4", title: "Enero de 1976",
        hook: "« Si je ne reviens pas, la guitare sait où. »",
        paragraphs: [
          "{{Por la noche|por la noche}}, Nina abre la caja en la cama. Dentro hay una llave pequeña, una foto de una guitarra y una carta doblada.",
          "{{¿Qué hora es?|¿qué hora es?}} Casi {{la medianoche|la medianoche}}. Desde la plaza suben voces y una canción.",
          "La carta está fechada: « Madrid, {{el viernes|el viernes}} 16 de enero de 1976 ».",
          "« {{El domingo|el domingo}}, {{temprano|temprano}}, voy a buscar la guitarra. Si no vuelvo esta {{semana|la semana}}, la guitarra sabe dónde. »",
          "Abajo, una firma: « J. Serrano ». Y arriba, el nombre de la persona a quien escribe: « Nieves ».",
          "Nina se sienta muy despacio. Su abuela se llama Nieves. Y su bisabuelo, Joaquín Serrano, se fue a España en 1976 y nunca volvió.",
        ],
        fr: [
          "{{Le soir|por la noche}}, Nina ouvre la boîte sur son lit. Dedans : une petite clé, la photo d'une guitare et une lettre pliée.",
          "{{Quelle heure est-il ?|¿qué hora es?}} Presque {{minuit|la medianoche}}. Depuis la place montent des voix et une chanson.",
          "La lettre est datée : « Madrid, {{vendredi|el viernes}} 16 janvier 1976 ».",
          "« {{Dimanche|el domingo}}, {{tôt|temprano}}, je vais chercher la guitare. Si je ne reviens pas cette {{semaine|la semana}}, la guitare sait où. »",
          "En bas, une signature : « J. Serrano ». Et en haut, le prénom de la personne à qui il écrit : « Nieves ».",
          "Nina s'assoit très lentement. Sa grand-mère s'appelle Nieves. Et son arrière-grand-père, Joaquín Serrano, est parti en Espagne en 1976 et n'est jamais revenu.",
        ],
        quiz: [
          { q: "Qui a écrit la lettre ?", a: ["J. Serrano, l'arrière-grand-père de Nina", "Carmen", "La grand-mère de Nina"] },
          { q: "Que dit la lettre ?", a: ["Qu'il va chercher la guitare dimanche, tôt", "Qu'il vend l'appartement", "Qu'il part pour Paris"] },
        ],
      },
    ],
  },
  {
    id: "l2", title: "El bar de Paco", subtitle: "Madrid", emoji: "🍷",
    color: "from-amber-500 to-orange-700",
    ending: "Hier, un homme en manteau gris est venu poser les mêmes questions. Sur le même nom.",
    pages: [
      {
        unit: "e5", title: "Una caña en Lavapiés",
        hook: "Quelqu'un jouait de cette guitare ici, tous les jeudis. En 1976.",
        paragraphs: [
          "Al día siguiente, Nina baja al bar de la esquina, Casa Paco: una barra de madera, jamones colgados y un televisor sin volumen.",
          "{{El camarero|el camarero}}, un señor de ochenta años, le da {{la carta|la carta}}. — Hoy hay {{tortilla|la tortilla}} y croquetas.",
          "— {{Una caña|una caña}} y unas {{tapas|las tapas}}, por favor. — Marchando.",
          "Nina prueba la tortilla. — ¡{{Está buenísima|está buenísimo}}! — El secreto es la cebolla — guiña el ojo Paco.",
          "— {{La cuenta, por favor|la cuenta, por favor}} — dice ella, y deja la foto de la guitarra sobre la barra.",
          "— Y {{quería un café|quería un café}} también. — Paco no contesta. Mira la foto un buen rato. — Esa guitarra la tocaba un hombre aquí, todos los jueves. En el setenta y seis.",
        ],
        fr: [
          "Le lendemain, Nina descend au bar du coin, Casa Paco : un comptoir en bois, des jambons suspendus et une télé sans le son.",
          "{{Le serveur|el camarero}}, un monsieur de quatre-vingts ans, lui tend {{la carte|la carta}}. — Aujourd'hui il y a de {{la tortilla|la tortilla}} et des croquettes.",
          "— {{Une petite bière|una caña}} et quelques {{tapas|las tapas}}, s'il vous plaît. — Ça marche.",
          "Nina goûte la tortilla. — {{C'est délicieux|está buenísimo}} ! — Le secret, c'est l'oignon — dit Paco avec un clin d'œil.",
          "— {{L'addition, s'il vous plaît|la cuenta, por favor}} — dit-elle, en posant la photo de la guitare sur le comptoir.",
          "— Et {{je voudrais un café|quería un café}} aussi. — Paco ne répond pas. Il regarde la photo un long moment. — Cette guitare, un homme en jouait ici, tous les jeudis. En soixante-seize.",
        ],
        quiz: [
          { q: "Que commande Nina ?", a: ["Une petite bière et des tapas", "Un vin rouge", "Un menu du jour"] },
          { q: "De quoi se souvient Paco ?", a: ["Un homme jouait de cette guitare ici, le jeudi, en 1976", "Il a vendu la guitare", "Il n'a jamais vu cette guitare"] },
        ],
      },
      {
        unit: "e6", title: "Churros a las ocho",
        hook: "Il est parti un dimanche matin pour Séville. Avec la guitare.",
        paragraphs: [
          "A las ocho de la mañana, Paco la espera en una chocolatería de la calle Mayor.",
          "— Aquí se toma {{el chocolate|el chocolate}} con {{churros|los churros}} — dice él. — Para mí, {{un café con leche|el café con leche}}.",
          "El chocolate llega en {{una taza|la taza}} blanca. — Cuidado, {{está caliente|está caliente}}.",
          "— El hombre de la guitarra vivía en tu piso, en el tercero B — cuenta Paco. — Tocaba aquí, en el bar, y todos le llamaban « el francés ».",
          "— {{Otro, por favor|otro, por favor}} — pide Nina, para tener tiempo de pensar. — ¿{{Con azúcar|con azúcar}}? — Sin.",
          "— Un domingo se fue muy temprano, con la guitarra. A Sevilla, dijo. Y nunca volvió a subir esas escaleras.",
        ],
        fr: [
          "À huit heures du matin, Paco l'attend dans une chocolaterie de la calle Mayor.",
          "— Ici, on prend {{le chocolat|el chocolate}} avec {{des churros|los churros}} — dit-il. — Pour moi, {{un café au lait|el café con leche}}.",
          "Le chocolat arrive dans {{une tasse|la taza}} blanche. — Attention, {{c'est chaud|está caliente}}.",
          "— L'homme à la guitare vivait dans ton appartement, au troisième B — raconte Paco. — Il jouait ici, au bar, et tout le monde l'appelait « le Français ».",
          "— {{Un autre, s'il vous plaît|otro, por favor}} — demande Nina, pour se donner le temps de réfléchir. — {{Avec du sucre|con azúcar}} ? — Sans.",
          "— Un dimanche, il est parti très tôt, avec la guitare. À Séville, a-t-il dit. Et il n'a plus jamais remonté ces escaliers.",
        ],
        quiz: [
          { q: "Comment appelait-on l'homme à la guitare ?", a: ["« Le Français »", "« Le Madrilène »", "« Le professeur »"] },
          { q: "Où est-il parti, un dimanche ?", a: ["À Séville", "À Paris", "À Barcelone"] },
        ],
      },
      {
        unit: "e7", title: "El puesto de Encarna",
        hook: "Une adresse à Séville, griffonnée sur un sac en papier.",
        paragraphs: [
          "Paco la lleva {{al mercado|el mercado}} de Antón Martín. Entre gritos y cajas, hay {{un puesto|el puesto}} de fruta con un toldo verde.",
          "— Encarna, mi hermana — presenta Paco. — Ella se acuerda de todo.",
          "— {{¿Está madura?|¿está maduro?}} — pregunta Nina, señalando {{las naranjas|la naranja}}, para romper el hielo.",
          "— Estas, recién llegadas de Valencia. {{Frescas|fresco}}. ¿{{Un kilo|un kilo}}?",
          "— {{Póngame dos|póngame dos}}. Y {{nada más|nada más}}, gracias.",
          "Encarna mira la foto. — El francés... Me compraba naranjas cada viernes. Decía que eran para una mujer de Sevilla. — Escribe algo en la bolsa de papel: « Calle Pureza, Triana ».",
        ],
        fr: [
          "Paco l'emmène {{au marché|el mercado}} d'Antón Martín. Entre les cris et les cagettes, il y a {{un étal|el puesto}} de fruits sous une bâche verte.",
          "— Encarna, ma sœur — présente Paco. — Elle se souvient de tout.",
          "— {{C'est mûr ?|¿está maduro?}} — demande Nina en montrant {{les oranges|la naranja}}, pour briser la glace.",
          "— Celles-là viennent d'arriver de Valence. {{Fraîches|fresco}}. {{Un kilo|un kilo}} ?",
          "— {{Mettez-m'en deux|póngame dos}}. Et {{ce sera tout|nada más}}, merci.",
          "Encarna regarde la photo. — Le Français… Il m'achetait des oranges tous les vendredis. Il disait qu'elles étaient pour une femme de Séville. — Elle écrit quelque chose sur le sac en papier : « Calle Pureza, Triana ».",
        ],
        quiz: [
          { q: "Qui est Encarna ?", a: ["La sœur de Paco", "La fille de Carmen", "Une cliente du bar"] },
          { q: "Qu'écrit-elle sur le sac ?", a: ["Une adresse à Triana, à Séville", "Un numéro de téléphone", "Le prix des oranges"] },
        ],
      },
      {
        unit: "e8", title: "El hombre del abrigo gris",
        hook: "Quelqu'un d'autre cherche Joaquín Serrano.",
        paragraphs: [
          "— {{¡Pruébala!|¡pruébalo!}} — Encarna le da una naranja pequeña, arrugada.",
          "Nina la muerde y pone cara rara: no es {{dulce|dulce}}, es {{amarga|amargo}}. Encarna se ríe.",
          "— Es naranja de Sevilla. Sirve para mermelada, no para comer. {{Prefiero|prefiero}} las de Valencia.",
          "— A mí {{me encanta|me encanta}} igual — miente Nina, con los ojos llenos de lágrimas. — {{Tengo sed|tengo sed}}.",
          "— Toma, estas son más {{ricas|rico}} — Encarna le da otra, y baja la voz.",
          "— Ayer vino un hombre con un abrigo gris. Preguntaba lo mismo que tú. Por el mismo nombre: Serrano.",
        ],
        fr: [
          "— {{Goûte !|¡pruébalo!}} — Encarna lui tend une petite orange, toute ridée.",
          "Nina mord dedans et fait une drôle de tête : elle n'est pas {{sucrée|dulce}}, elle est {{amère|amargo}}. Encarna éclate de rire.",
          "— C'est une orange de Séville. Elle sert à la confiture, pas à être mangée. {{Je préfère|prefiero}} celles de Valence.",
          "— Moi, {{j'adore|me encanta}} quand même — ment Nina, les yeux pleins de larmes. — {{J'ai soif|tengo sed}}.",
          "— Tiens, celles-ci sont {{meilleures|rico}} — Encarna lui en tend une autre, et baisse la voix.",
          "— Hier, un homme en manteau gris est venu. Il demandait la même chose que toi. Le même nom : Serrano.",
        ],
        quiz: [
          { q: "Pourquoi l'orange est-elle amère ?", a: ["C'est une orange de Séville, faite pour la confiture", "Elle est pourrie", "Elle n'est pas mûre"] },
          { q: "Qui est venu la veille ?", a: ["Un homme en manteau gris, qui cherchait le même nom", "La police", "Carmen"] },
        ],
      },
    ],
  },
  {
    id: "l3", title: "Rumbo al sur", subtitle: "Séville", emoji: "🚄",
    color: "from-sky-500 to-indigo-800",
    ending: "Une cassette de 1976, étiquetée de la main de Joaquín : « Para Amparo ».",
    pages: [
      {
        unit: "e9", title: "El AVE de las ocho",
        hook: "L'homme en manteau gris est dans le même train.",
        paragraphs: [
          "El sábado, Nina coge el metro hasta Atocha. {{La estación|la estación}} huele a café y a prisa.",
          "— Un {{billete|el billete}} para Sevilla, por favor. — ¿{{Ida y vuelta|ida y vuelta}}? — Solo ida.",
          "— {{¿A qué hora sale?|¿a qué hora sale?}} — A las ocho, {{andén|el andén}} cinco. — {{¿Cuánto tarda?|¿cuánto tarda?}} — Dos horas y media.",
          "Son las ocho menos dos. {{¡Llego tarde!|llego tarde}}, piensa Nina, y corre por el pasillo con la maleta.",
          "Sube al {{AVE|el ave}} en el último segundo. Las puertas se cierran detrás de ella.",
          "Por la ventana, en el andén, un hombre con un abrigo gris mira el tren. Luego sube al vagón de al lado.",
        ],
        fr: [
          "Samedi, Nina prend le métro jusqu'à Atocha. {{La gare|la estación}} sent le café et la précipitation.",
          "— Un {{billet|el billete}} pour Séville, s'il vous plaît. — {{Aller-retour|ida y vuelta}} ? — Aller simple.",
          "— {{Il part à quelle heure ?|¿a qué hora sale?}} — À huit heures, {{quai|el andén}} cinq. — {{Il met combien de temps ?|¿cuánto tarda?}} — Deux heures et demie.",
          "Il est huit heures moins deux. {{Je suis en retard|llego tarde}}, pense Nina, et elle court dans le couloir avec sa valise.",
          "Elle monte dans l'{{AVE|el ave}} à la dernière seconde. Les portes se referment derrière elle.",
          "Par la fenêtre, sur le quai, un homme en manteau gris regarde le train. Puis il monte dans la voiture d'à côté.",
        ],
        quiz: [
          { q: "Combien de temps dure le trajet jusqu'à Séville ?", a: ["Deux heures et demie", "Six heures", "Une heure"] },
          { q: "Qui monte dans la voiture d'à côté ?", a: ["L'homme en manteau gris", "Paco", "Carmen"] },
        ],
      },
      {
        unit: "e10", title: "El puente de Triana",
        hook: "La guitare est là. Derrière une vitre, dans un atelier fermé.",
        paragraphs: [
          "En Sevilla hace un calor de horno. Nina busca la calle Pureza y da vueltas por el centro. — {{Estoy perdida|estoy perdido}} — admite.",
          "— Perdone, {{¿dónde está la plaza?|¿dónde está la plaza?}} La de Cuba — pregunta a un señor en bicicleta.",
          "— {{Todo recto|todo recto}} hasta {{el río|el río}}, cruza {{el puente|el puente}} y {{a la derecha|a la derecha}}. Está {{cerca|cerca}}.",
          "Desde el puente de Triana, el Guadalquivir brilla como un espejo. Al otro lado, casas blancas y amarillas.",
          "{{La calle|la calle}} Pureza es estrecha y fresca. En el número 7 hay un taller de guitarras con la persiana medio bajada: « Cerrado ».",
          "Nina pega la cara al cristal. Dentro, colgada en la pared, hay una guitarra. La misma de la foto.",
        ],
        fr: [
          "À Séville, il fait une chaleur de four. Nina cherche la calle Pureza et tourne en rond dans le centre. — {{Je suis perdue|estoy perdido}} — avoue-t-elle.",
          "— Pardon, {{où est la place ?|¿dónde está la plaza?}} Celle de Cuba — demande-t-elle à un monsieur à vélo.",
          "— {{Tout droit|todo recto}} jusqu'{{au fleuve|el río}}, traversez {{le pont|el puente}} et {{à droite|a la derecha}}. C'est {{tout près|cerca}}.",
          "Depuis le pont de Triana, le Guadalquivir brille comme un miroir. De l'autre côté, des maisons blanches et jaunes.",
          "{{La rue|la calle}} Pureza est étroite et fraîche. Au numéro 7, il y a un atelier de guitares, le rideau à moitié baissé : « Fermé ».",
          "Nina colle son visage à la vitre. À l'intérieur, accrochée au mur, il y a une guitare. La même que sur la photo.",
        ],
        quiz: [
          { q: "Quel fleuve Nina traverse-t-elle ?", a: ["Le Guadalquivir", "Le Tage", "L'Èbre"] },
          { q: "Que voit-elle à travers la vitre ?", a: ["La guitare de la photo", "L'homme en manteau gris", "Une photo de Joaquín"] },
        ],
      },
      {
        unit: "e11", title: "Un patio con naranjos",
        hook: "Quelqu'un a déjà essayé d'acheter la guitare ce matin.",
        paragraphs: [
          "Enfrente del taller hay {{un hostal|el hostal}} pequeño con un patio lleno de naranjos.",
          "— {{¿Hay habitaciones?|¿hay habitaciones?}} — Queda una, con {{aire acondicionado|el aire acondicionado}}, menos mal. ¿Para cuántas noches? — {{Dos noches|dos noches}}.",
          "La recepcionista le da {{la llave|la llave}} de {{la habitación|la habitación}} catorce. — {{El desayuno|el desayuno}} es a las ocho, en el patio.",
          "— {{¿Hay wifi?|¿hay wifi?}} — Sí, pero solo en el patio. Como todo lo bueno — sonríe.",
          "Nina señala la ventana. — El taller de guitarras, ¿cuándo abre? — Es de los Vargas. Abren el lunes.",
          "La recepcionista baja la voz. — Pero si vienes por la guitarra de la pared... La abuela Amparo no la vende. Nunca. Ya lo intentó otro esta mañana.",
        ],
        fr: [
          "En face de l'atelier, il y a {{une petite pension|el hostal}} avec un patio plein d'orangers.",
          "— {{Vous avez des chambres ?|¿hay habitaciones?}} — Il en reste une, avec {{la climatisation|el aire acondicionado}}, heureusement. Pour combien de nuits ? — {{Deux nuits|dos noches}}.",
          "La réceptionniste lui tend {{la clé|la llave}} de {{la chambre|la habitación}} quatorze. — {{Le petit-déjeuner|el desayuno}} est à huit heures, dans le patio.",
          "— {{Il y a du wifi ?|¿hay wifi?}} — Oui, mais seulement dans le patio. Comme tout ce qui est bien — sourit-elle.",
          "Nina montre la fenêtre. — L'atelier de guitares, il ouvre quand ? — C'est celui des Vargas. Ils ouvrent lundi.",
          "La réceptionniste baisse la voix. — Mais si tu viens pour la guitare du mur… La grand-mère Amparo ne la vend pas. Jamais. Quelqu'un a déjà essayé ce matin.",
        ],
        quiz: [
          { q: "Pour combien de nuits Nina réserve-t-elle ?", a: ["Deux nuits", "Une semaine", "Une nuit"] },
          { q: "Qu'apprend-elle sur la guitare ?", a: ["La grand-mère Amparo ne la vend jamais", "Elle est à vendre", "Elle a été volée"] },
        ],
      },
      {
        unit: "e12", title: "El mercadillo",
        hook: "« Para Amparo ». Joaquín connaissait la grand-mère de l'atelier.",
        paragraphs: [
          "El domingo por la mañana, para esperar al lunes, Nina pasea por {{un mercadillo|el mercadillo}} en la Alameda.",
          "Entre discos viejos y abanicos, un vendedor tiene una caja de casetes. — {{Solo estoy mirando|solo estoy mirando}} — dice ella.",
          "Una casete tiene una etiqueta escrita a mano: « J. Serrano — Triana, 1976 ». A Nina se le para el corazón. — ¿Y esta? — Veinte euros.",
          "— {{¡Qué caro!|¡qué caro!}} {{¿Me hace un descuento?|¿me hace un descuento?}}",
          "— {{¿Cuál es el último precio?|¿cuál es el último precio?}} — insiste. — Quince, {{en efectivo|en efectivo}}. — {{Me lo llevo|me lo llevo}}.",
          "En el hostal, Nina da la vuelta a la casete. Detrás, con la misma letra de la carta: « Para Amparo ».",
        ],
        fr: [
          "Dimanche matin, pour patienter jusqu'à lundi, Nina se promène dans {{un marché aux puces|el mercadillo}} sur l'Alameda.",
          "Entre de vieux disques et des éventails, un vendeur a une boîte de cassettes. — {{Je regarde seulement|solo estoy mirando}} — dit-elle.",
          "Une cassette porte une étiquette écrite à la main : « J. Serrano — Triana, 1976 ». Le cœur de Nina s'arrête. — Et celle-ci ? — Vingt euros.",
          "— {{Que c'est cher !|¡qué caro!}} {{Vous me faites une réduction ?|¿me hace un descuento?}}",
          "— {{C'est votre dernier prix ?|¿cuál es el último precio?}} — insiste-t-elle. — Quinze, {{en espèces|en efectivo}}. — {{Je la prends|me lo llevo}}.",
          "À la pension, Nina retourne la cassette. Au dos, de la même écriture que la lettre : « Para Amparo ».",
        ],
        quiz: [
          { q: "Combien Nina paie-t-elle la cassette ?", a: ["Quinze euros en espèces", "Vingt euros par carte", "Rien"] },
          { q: "Qu'y a-t-il au dos de la cassette ?", a: ["« Para Amparo », de la main de Joaquín", "Un numéro de téléphone", "Une adresse à Madrid"] },
        ],
      },
    ],
  },
  {
    id: "l4", title: "La casa de Triana", subtitle: "Séville", emoji: "🎸",
    color: "from-violet-500 to-fuchsia-800",
    ending: "« Cette guitare appartient à ma famille. » L'homme en manteau gris s'appelle Andrés Serrano.",
    pages: [
      {
        unit: "e13", title: "Los Vargas",
        hook: "« Tu as ses yeux. » Amparo a reconnu quelqu'un.",
        paragraphs: [
          "El lunes, la persiana del taller está subida. {{Un niño|el niño}} juega en la puerta con un balón.",
          "Sale un hombre con serrín en las manos. — Manuel Vargas. Soy {{el padre|el padre}} de este terremoto. ¿En qué te ayudo?",
          "Detrás aparece una chica de la edad de Nina. — Lucía, {{la hija|la hija}} mayor. Aquí trabaja toda {{la familia|la familia}}.",
          "El niño mira a Nina con descaro. — {{¿Cuántos años tienes?|¿cuántos años tienes?}} — ¡Pablo! — le riñe Lucía, riendo.",
          "Entonces entra una señora muy pequeña, con bastón. — {{Esta es mi madre|esta es mi madre}}, Amparo — dice Manuel. — {{La abuela|la abuela}} de todos.",
          "Amparo mira a Nina mucho tiempo, sin decir nada. Luego le toca la cara con la mano. — Tienes sus ojos.",
        ],
        fr: [
          "Lundi, le rideau de l'atelier est levé. {{Un petit garçon|el niño}} joue au ballon devant la porte.",
          "Un homme sort, de la sciure plein les mains. — Manuel Vargas. Je suis {{le père|el padre}} de cette tornade. Je peux t'aider ?",
          "Derrière apparaît une fille de l'âge de Nina. — Lucía, {{la fille|la hija}} aînée. Ici, toute {{la famille|la familia}} travaille.",
          "Le garçon dévisage Nina sans gêne. — {{Tu as quel âge ?|¿cuántos años tienes?}} — Pablo ! — le gronde Lucía en riant.",
          "Entre alors une toute petite dame, avec une canne. — {{Voici ma mère|esta es mi madre}}, Amparo — dit Manuel. — {{La grand-mère|la abuela}} de tout le monde.",
          "Amparo regarde Nina longtemps, sans rien dire. Puis elle lui touche le visage. — Tu as ses yeux.",
        ],
        quiz: [
          { q: "Qui est Amparo ?", a: ["La mère de Manuel, la grand-mère de la famille", "La sœur de Carmen", "La réceptionniste"] },
          { q: "Que dit Amparo à Nina ?", a: ["« Tu as ses yeux »", "« Va-t'en »", "« La guitare est vendue »"] },
        ],
      },
      {
        unit: "e14", title: "El taller",
        hook: "Il est venu chercher la guitare… et il est reparti sans elle.",
        paragraphs: [
          "Manuel le enseña {{el taller|el taller}}: maderas, cuerdas, olor a barniz. — Mi abuelo era {{artesano|el artesano}}. Hizo esa guitarra en 1935.",
          "— ¿Para quién? — Para un {{guitarrista|el guitarrista}} joven de Madrid. Joaquín Serrano.",
          "— ¿Y tú, {{a qué te dedicas?|¿a qué te dedicas?}} — pregunta Lucía. — {{Soy estudiante|soy estudiante}}. {{Estudio|estudio}} música en Madrid.",
          "— Yo {{trabajo|trabajo}} aquí con mi padre — dice Lucía —, y el año que viene voy a {{la universidad|la universidad}}.",
          "Manuel descuelga la guitarra con cuidado. — Joaquín vino a buscarla en el setenta y seis. Tocó una noche entera en este patio.",
          "— ¿Y se la llevó? — No. Se fue sin ella. Y nunca nos dijo por qué.",
        ],
        fr: [
          "Manuel lui fait visiter {{l'atelier|el taller}} : du bois, des cordes, une odeur de vernis. — Mon grand-père était {{artisan|el artesano}}. Il a fabriqué cette guitare en 1935.",
          "— Pour qui ? — Pour un jeune {{guitariste|el guitarrista}} de Madrid. Joaquín Serrano.",
          "— Et toi, {{tu fais quoi dans la vie ?|¿a qué te dedicas?}} — demande Lucía. — {{Je suis étudiante|soy estudiante}}. {{J'étudie|estudio}} la musique à Madrid.",
          "— Moi, {{je travaille|trabajo}} ici avec mon père — dit Lucía —, et l'an prochain, je vais à {{l'université|la universidad}}.",
          "Manuel décroche la guitare avec précaution. — Joaquín est venu la chercher en soixante-seize. Il a joué toute une nuit dans ce patio.",
          "— Et il l'a emportée ? — Non. Il est reparti sans elle. Et il ne nous a jamais dit pourquoi.",
        ],
        quiz: [
          { q: "Quand la guitare a-t-elle été fabriquée ?", a: ["En 1935, par le grand-père de Manuel", "En 1976", "L'an dernier"] },
          { q: "Qu'a fait Joaquín en 1976 ?", a: ["Il a joué toute une nuit, puis il est reparti sans la guitare", "Il l'a vendue", "Il l'a cassée"] },
        ],
      },
      {
        unit: "e15", title: "Cuarenta y cinco grados",
        hook: "« Garde-la pour ma fille. Un jour, elle viendra. »",
        paragraphs: [
          "A las cuatro de la tarde, en Triana nadie se mueve. — {{¡Qué calor!|¡qué calor!}} — resopla Nina.",
          "— En Sevilla, en {{verano|el verano}}, {{hace mucho calor|hace mucho calor}}: cuarenta y cinco grados a {{la sombra|la sombra}} — dice Lucía, abanicándose.",
          "Se sientan en el patio, bajo los naranjos. {{El sol|el sol}} cae como un martillo sobre las tejas.",
          "Amparo, en su mecedora, habla sin abrir los ojos. — Aquella noche también hacía calor. De pronto, el cielo se puso negro. — {{Va a llover|va a llover}}, dijo él.",
          "— Y {{estaba lloviendo|está lloviendo}} cuando se fue. Sin {{paraguas|el paraguas}}, empapado. La guitarra se quedó aquí.",
          "Amparo abre los ojos. — Me dijo: « Guárdala para mi hija. Algún día vendrá. »",
        ],
        fr: [
          "À quatre heures de l'après-midi, à Triana, personne ne bouge. — {{Quelle chaleur !|¡qué calor!}} — souffle Nina.",
          "— À Séville, en {{été|el verano}}, {{il fait très chaud|hace mucho calor}} : quarante-cinq degrés à {{l'ombre|la sombra}} — dit Lucía en s'éventant.",
          "Elles s'assoient dans le patio, sous les orangers. {{Le soleil|el sol}} tape comme un marteau sur les tuiles.",
          "Amparo, dans son rocking-chair, parle sans ouvrir les yeux. — Cette nuit-là aussi, il faisait chaud. Tout à coup, le ciel est devenu noir. — {{Il va pleuvoir|va a llover}}, a-t-il dit.",
          "— Et {{il pleuvait|está lloviendo}} quand il est parti. Sans {{parapluie|el paraguas}}, trempé. La guitare est restée ici.",
          "Amparo ouvre les yeux. — Il m'a dit : « Garde-la pour ma fille. Un jour, elle viendra. »",
        ],
        quiz: [
          { q: "Quelle température fait-il à l'ombre ?", a: ["Quarante-cinq degrés", "Trente degrés", "Vingt degrés"] },
          { q: "Qu'a demandé Joaquín à Amparo ?", a: ["De garder la guitare pour sa fille", "De la vendre", "De la lui envoyer à Paris"] },
        ],
      },
      {
        unit: "e16", title: "El timbre",
        hook: "Un autre Serrano vient réclamer la guitare.",
        paragraphs: [
          "Nina no puede hablar. Lucía le coge la mano. — {{¿Cómo estás?|¿cómo estás?}}",
          "— {{Estoy emocionada|estoy emocionado}}... y {{tengo miedo|tengo miedo}}. Mi abuela se llama Nieves. Es su hija.",
          "— {{No te preocupes|no te preocupes}} — dice Amparo. — {{Tranquila|tranquilo}}. Llevo cincuenta años esperando este día.",
          "— {{Lo siento mucho|lo siento mucho}} — dice Nina, sin saber muy bien por qué. — {{Todo va a salir bien|todo va a salir bien}} — responde la anciana.",
          "Entonces suena el timbre. Lucía abre. En la puerta hay un hombre con un abrigo gris, a pesar del calor.",
          "— Buenas tardes. Vengo por la guitarra — dice, muy serio. — Esa guitarra es de mi familia. Me llamo Andrés Serrano.",
        ],
        fr: [
          "Nina n'arrive pas à parler. Lucía lui prend la main. — {{Comment ça va ?|¿cómo estás?}}",
          "— {{Je suis émue|estoy emocionado}}… et {{j'ai peur|tengo miedo}}. Ma grand-mère s'appelle Nieves. C'est sa fille.",
          "— {{Ne t'inquiète pas|no te preocupes}} — dit Amparo. — {{Du calme|tranquilo}}. J'attends ce jour depuis cinquante ans.",
          "— {{Je suis vraiment désolée|lo siento mucho}} — dit Nina, sans bien savoir pourquoi. — {{Tout va bien se passer|todo va a salir bien}} — répond la vieille dame.",
          "C'est alors que la sonnette retentit. Lucía ouvre. Sur le seuil, un homme en manteau gris, malgré la chaleur.",
          "— Bonjour. Je viens pour la guitare — dit-il, très sérieux. — Cette guitare appartient à ma famille. Je m'appelle Andrés Serrano.",
        ],
        quiz: [
          { q: "Pourquoi Nina a-t-elle peur ?", a: ["Elle découvre que la guitare était destinée à sa grand-mère", "Elle a perdu son billet", "Amparo est malade"] },
          { q: "Qui sonne à la porte ?", a: ["L'homme en manteau gris, Andrés Serrano", "Paco", "La police"] },
        ],
      },
    ],
  },
  {
    id: "l5", title: "Lo que queda", subtitle: "Grenade", emoji: "🏰",
    color: "from-teal-500 to-emerald-800",
    ending: "Une lettre pour Nieves, un frère qu'elle ne connaît pas, et une guitare qui rentre enfin à la maison. — à suivre.",
    pages: [
      {
        unit: "e17", title: "¡Al ladrón!",
        hook: "La lettre de Joaquín a disparu. Et la clé avec.",
        paragraphs: [
          "Andrés propone hablar en Granada, donde vive. — Allí te lo explico todo. Mañana, en la estación de autobuses.",
          "En la estación de Granada, alguien tira del {{bolso|el bolso}} de Nina y sale corriendo. — {{¡Al ladrón!|¡al ladrón!}} — grita ella.",
          "Dentro del bolso van {{la cartera|la cartera}}, {{el móvil|el móvil}}... y la caja con la carta y la llave.",
          "Nina corre detrás del ladrón, tropieza en un bordillo y cae. — {{¡Me han robado!|me han robado}} — dice a un guardia de seguridad.",
          "— {{¡Llame a la policía!|¡llame a la policía!}} — pide un señor. — {{¿Dónde está la comisaría?|¿dónde está la comisaría?}} — Aquí al lado. Hay que {{poner una denuncia|poner una denuncia}}.",
          "Nina se levanta y el tobillo le falla. La carta de Joaquín ha desaparecido.",
        ],
        fr: [
          "Andrés propose de parler à Grenade, où il vit. — Là-bas, je t'explique tout. Demain, à la gare routière.",
          "À la gare routière de Grenade, quelqu'un arrache {{le sac|el bolso}} de Nina et part en courant. — {{Au voleur !|¡al ladrón!}} — crie-t-elle.",
          "Dans le sac, il y a {{le portefeuille|la cartera}}, {{le portable|el móvil}}… et la boîte avec la lettre et la clé.",
          "Nina court après le voleur, trébuche sur un trottoir et tombe. — {{On m'a volée !|me han robado}} — dit-elle à un agent de sécurité.",
          "— {{Appelez la police !|¡llame a la policía!}} — demande un monsieur. — {{Où est le commissariat ?|¿dónde está la comisaría?}} — Juste à côté. Il faut {{porter plainte|poner una denuncia}}.",
          "Nina se relève et sa cheville lâche. La lettre de Joaquín a disparu.",
        ],
        quiz: [
          { q: "Qu'y avait-il dans le sac volé ?", a: ["Le portefeuille, le portable, la lettre et la clé", "Seulement de l'argent", "La guitare"] },
          { q: "Que doit faire Nina ?", a: ["Porter plainte au commissariat", "Retourner à Madrid", "Appeler Carmen"] },
        ],
      },
      {
        unit: "e18", title: "El centro de salud",
        hook: "Joaquín n'a pas disparu. Il a vécu à Grenade, et il n'a jamais osé revenir.",
        paragraphs: [
          "En {{el centro de salud|el centro de salud}}, una médica le mira el pie hinchado. — {{Me duele aquí|me duele aquí}} — dice Nina, tocándose {{el tobillo|el tobillo}}.",
          "— {{¿Es grave?|¿es grave?}} — No, es un esguince. Pero {{el dolor|el dolor}} va a durar unos días.",
          "La médica le hace {{una receta|la receta}}. — {{Este medicamento|el medicamento}}, dos veces al día. Y nada de correr detrás de ladrones.",
          "Cuando sale, Andrés la espera en la puerta. Tiene el bolso de Nina en la mano. — Lo encontró un chaval en una papelera. La caja está dentro. La llave también.",
          "Nina lo mira, desconfiada. — ¿Quién eres? — Soy el hijo de Joaquín. Mi padre no desapareció en 1976. Vivió aquí, en Granada, hasta 2004.",
          "— Tenía miedo de volver a Francia. Pensaba que Nieves nunca le perdonaría. — {{¡Que te mejores!|¡que te mejores!}} — grita la médica desde la puerta. Nina ni la oye.",
        ],
        fr: [
          "Au {{centre de santé|el centro de salud}}, une médecin examine son pied enflé. — {{J'ai mal ici|me duele aquí}} — dit Nina en touchant {{sa cheville|el tobillo}}.",
          "— {{C'est grave ?|¿es grave?}} — Non, c'est une entorse. Mais {{la douleur|el dolor}} va durer quelques jours.",
          "La médecin lui fait {{une ordonnance|la receta}}. — {{Ce médicament|el medicamento}}, deux fois par jour. Et interdiction de courir après les voleurs.",
          "Quand elle sort, Andrés l'attend à la porte. Il tient le sac de Nina. — Un gamin l'a trouvé dans une poubelle. La boîte est dedans. La clé aussi.",
          "Nina le regarde, méfiante. — Qui es-tu ? — Je suis le fils de Joaquín. Mon père n'a pas disparu en 1976. Il a vécu ici, à Grenade, jusqu'en 2004.",
          "— Il avait peur de retourner en France. Il pensait que Nieves ne lui pardonnerait jamais. — {{Bon rétablissement !|¡que te mejores!}} — lance la médecin depuis la porte. Nina ne l'entend même pas.",
        ],
        quiz: [
          { q: "Qu'a Nina au pied ?", a: ["Une entorse à la cheville", "Une fracture", "Rien du tout"] },
          { q: "Qui est Andrés ?", a: ["Le fils de Joaquín, qui a vécu à Grenade jusqu'en 2004", "Le voleur", "Un policier"] },
        ],
      },
      {
        unit: "e19", title: "El Mirador",
        hook: "« Apporte la clé. »",
        paragraphs: [
          "Andrés le apunta su número en la mano. — {{¿Cuál es tu número?|¿cuál es tu número?}} Por si acaso. — Nina se lo dicta.",
          "— {{¿Quedamos?|¿quedamos?}} Tengo algo que enseñarte. — {{¿Dónde quedamos?|¿dónde quedamos?}} — En el Mirador de San Nicolás.",
          "— {{¿A qué hora?|¿a qué hora?}} — {{Esta noche|esta noche}}, a las ocho, cuando el sol toca la Alhambra.",
          "— {{Vale, perfecto|vale, perfecto}}. — {{Te espero allí|te espero allí}}. Ah, y una cosa... Tráete la llave.",
          "Nina vuelve cojeando al hostal y llama a su abuela desde el móvil. Nieves no contesta. Le deja un mensaje: — Abuela, {{llámame|llámame}}. Es importante.",
          "Luego abre la caja. La llave pequeña brilla en su mano. ¿Qué puede abrir, después de cincuenta años?",
        ],
        fr: [
          "Andrés note son numéro sur la main de Nina. — {{C'est quoi ton numéro ?|¿cuál es tu número?}} Au cas où. — Nina le lui dicte.",
          "— {{On se voit ?|¿quedamos?}} J'ai quelque chose à te montrer. — {{On se retrouve où ?|¿dónde quedamos?}} — Au Mirador de San Nicolás.",
          "— {{À quelle heure ?|¿a qué hora?}} — {{Ce soir|esta noche}}, à huit heures, quand le soleil touche l'Alhambra.",
          "— {{D'accord, parfait|vale, perfecto}}. — {{Je t'attends là-bas|te espero allí}}. Ah, et une chose… Apporte la clé.",
          "Nina rentre en boitant à la pension et appelle sa grand-mère depuis son portable. Nieves ne répond pas. Elle lui laisse un message : — Mamie, {{appelle-moi|llámame}}. C'est important.",
          "Puis elle ouvre la boîte. La petite clé brille dans sa main. Que peut-elle ouvrir, après cinquante ans ?",
        ],
        quiz: [
          { q: "Où Andrés donne-t-il rendez-vous ?", a: ["Au Mirador de San Nicolás, face à l'Alhambra", "À la gare", "Au commissariat"] },
          { q: "Que doit apporter Nina ?", a: ["La clé", "La guitare", "La cassette"] },
        ],
      },
      {
        unit: "e20", title: "La última canción",
        hook: "« Je suis parti parce que… » La suite, c'est à Nieves de la lire.",
        paragraphs: [
          "Al atardecer, la Alhambra se pone roja. Andrés llega con un estuche de guitarra viejo. — Amparo me lo dio esta mañana. Dice que ya es hora.",
          "El estuche tiene una cerradura pequeña. Nina mete la llave. Encaja. Clic. — {{Granada es preciosa|granada es preciosa}} — susurra, para no llorar.",
          "Dentro, sobre el terciopelo, hay un sobre: « Para Nieves ». Andrés sonríe. — {{Ha sido genial|ha sido genial}} conocerte, Nina. {{Eres muy amable|eres muy amable}} por venir hasta aquí.",
          "— {{Te voy a echar de menos|te voy a echar de menos}} — dice ella. — {{¡Nos vemos!|¡nos vemos!}} — responde Andrés. — En Perpiñán. Tengo una hermana a la que no conozco.",
          "Al día siguiente, en el tren, con la guitarra entre las rodillas, Nina escribe a Lucía: « {{Volveré|volveré}}. {{Un abrazo|un abrazo}} ». — {{¡Buen viaje!|¡buen viaje!}} — contesta Lucía.",
          "Nina abre el sobre. La letra de Joaquín, firme: « Nieves, hija mía: no me fui porque no te quisiera. Me fui porque... »",
        ],
        fr: [
          "Au coucher du soleil, l'Alhambra devient rouge. Andrés arrive avec un vieil étui de guitare. — Amparo me l'a donné ce matin. Elle dit qu'il est temps.",
          "L'étui a une petite serrure. Nina y glisse la clé. Elle entre. Clic. — {{Grenade est magnifique|granada es preciosa}} — murmure-t-elle, pour ne pas pleurer.",
          "À l'intérieur, sur le velours, il y a une enveloppe : « Para Nieves ». Andrés sourit. — {{C'était génial|ha sido genial}} de te connaître, Nina. {{Tu es très gentille|eres muy amable}} d'être venue jusqu'ici.",
          "— {{Tu vas me manquer|te voy a echar de menos}} — dit-elle. — {{À bientôt !|¡nos vemos!}} — répond Andrés. — À Perpignan. J'ai une sœur que je ne connais pas.",
          "Le lendemain, dans le train, la guitare entre les genoux, Nina écrit à Lucía : « {{Je reviendrai|volveré}}. {{Je t'embrasse|un abrazo}} ». — {{Bon voyage !|¡buen viaje!}} — répond Lucía.",
          "Nina ouvre l'enveloppe. L'écriture de Joaquín, ferme : « Nieves, ma fille : je ne suis pas parti parce que je ne t'aimais pas. Je suis parti parce que… »",
        ],
        quiz: [
          { q: "Qu'ouvre la clé ?", a: ["L'étui de la guitare", "La porte de l'atelier", "Un coffre à la banque"] },
          { q: "Qu'y a-t-il dans l'étui ?", a: ["Une lettre « Para Nieves »", "De l'argent", "Une photo d'Amparo"] },
        ],
      },
    ],
  },
];

/* --- Mise en forme commune (lib/books.js) ------------------------- */

export const ES_BOOKS = prepareBooks(BOOKS, ALL_ITEMS);
