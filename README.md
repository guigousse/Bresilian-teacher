# Fala! — portugais & espagnol

Apprendre les bases du **portugais du Brésil** ou de l'**espagnol d'Espagne** depuis
le français : leçons courtes, phonétique française sous chaque mot, prononciation
audio, mémoire espacée, histoire à débloquer et cartes postales à collectionner.

Au premier lancement, un menu fait choisir la langue. Chaque langue a son propre
univers et sa propre progression (niveau, série, gemmes, collection) :

| | 🇧🇷 Fala, Brasil! | 🇪🇸 ¡Habla, España! |
|---|---|---|
| Mascotte | Zé, l'ara vert et jaune | Paco, l'ara rouge au chapeau cordouan |
| Histoire | Léa, un carnet oublié, de Rio à Salvador | Nina, une guitare oubliée, de Madrid à Grenade |
| Cartes | 20 lieux du Brésil | 20 lieux d'Espagne |
| Boîte à souvenirs | 14 souvenirs, 26 expressions brésiliennes | 14 souvenirs, 26 expressions espagnoles |

On change de langue en touchant le drapeau en haut de l'accueil (ou depuis le profil).

Progression enregistrée dans le **localStorage** du navigateur : rien à installer,
pas de compte, pas de serveur. Application installable et utilisable hors ligne (PWA).

## Lancer en local

```bash
npm install
npm run dev
```

## Comment l'app fait apprendre

**La mémoire espacée d'abord.** Chaque mot vit dans une boîte de Leitner. Une
réponse juste repousse sa prochaine révision (1, 2, 4, 9, 18 puis 35 jours), une
erreur la rapproche. L'app sait donc en permanence ce qui est acquis, ce qui est
fragile et ce qui doit être revu aujourd'hui — c'est ce qui remplace le « j'ai
tout oublié depuis la semaine dernière ».

**Cinq façons de rencontrer un mot.** Le reconnaître (QCM dans les deux sens),
l'entendre sans le lire, l'écrire, l'écrire sous dictée, le reconstruire dans une
phrase, choisir son article (o/a) et le prononcer au micro quand l'appareil le
permet. Reconnaître n'est pas savoir : la difficulté monte vers la production.

**Des paliers qui se rejouent.** Une unité ne se « termine » pas, elle se monte
jusqu'à cinq couronnes, et le mélange d'exercices change à chaque couronne :
découverte → reconnaissance → écoute → écriture → production → maîtrise.

**Cinq thématiques, vingt chapitres.** Le vocabulaire se précise à l'intérieur
d'une thématique : on commande à manger, puis on décrit son petit-déjeuner, puis
on achète au marché, puis on dit ce qu'on aime. 360 mots et phrases en tout.

**Un livre par thématique, une page par chapitre.** Terminer un chapitre ouvre une
page du livre de sa thématique — il en faut les quatre pour avoir l'histoire
entière et refermer le livre sur l'étagère. Dans la page, les mots du chapitre
sont en surbrillance : les retranscrire, puis répondre à deux questions de
compréhension, ouvre le chapitre suivant. La traduction française s'affiche ligne
par ligne, les mots à retrouver restant masqués. Chaque page se termine sur une
phrase en suspens, chaque livre sur une question sans réponse.

## Ce qui donne envie de revenir

- Objectif quotidien réglable (de 20 à 120 XP), anneau de progression.
- **Des coffres** gagnés à l'objectif du jour, aux paliers de série et à chaque
  livre terminé. Leur rareté (commun, rare, épique, légendaire) se voit avant de
  les ouvrir ; une garantie assure un coffre rare au moins tous les 7 et épique
  au moins tous les 15.
- **Une boîte à souvenirs** qui se remplit avec les coffres : 14 objets de
  l'histoire de Dalva (chacun n'apparaît qu'une fois sa page lue) et 26 petits
  papiers portant une expression brésilienne, qui rejoignent les révisions.
- Série de jours, primes aux paliers (3, 7, 14, 30…) et **gel de série** achetable
  pour ne pas tout perdre le jour où l'on ne peut pas jouer.
- Trois quêtes par jour, tirées au sort mais stables sur la journée.
- Zé, l'ara, qui réagit à ce qui se passe ; sons synthétisés à la volée, vibrations,
  compteurs qui grimpent, confettis.
- Cartes postales à collectionner (récompense purement cosmétique), chacune avec
  l'histoire, la culture et les détails du lieu.

## Suivre sa progression

L'écran **Ma progression** (accessible depuis l'accueil ou le profil) montre ce que
l'élève sait vraiment : répartition des mots par niveau de mémoire, prévisions de
révision des sept prochains jours, régularité sur huit semaines, mots qui résistent,
et couronnes par palier.

## Structure

```
src/
  Root.jsx         menu de choix de la langue, monte l'app sur le cours choisi
  App.jsx          assemblage : état, navigation, récompenses
  courses/         un fichier par langue : données, voix, textes, couleurs, mascotte
  data/            portugais : units, stories, cards, souvenirs
  data/es/         espagnol : les mêmes fichiers
  lib/progress.js  mémoire espacée, couronnes, quêtes, séries, trophées
  lib/chests.js    coffres : rareté, garanties, contenu
  lib/exercises.js fabrique les sessions selon la couronne
  lib/speech.js    synthèse vocale dans la langue du cours (et contournements Android)
  lib/audio.js     sons et vibrations, synthétisés sans aucun fichier
  lib/storage.js   sauvegarde et code de secours
  ui/              un fichier par écran, plus la mascotte et les styles
```

Ajouter du vocabulaire se fait dans `units.js`, une carte dans `cards.js`, un chapitre
dans `stories.js` de la langue concernée. Ajouter une langue : un dossier `data/xx/`,
un fichier `courses/xx.js` sur le modèle des deux autres, et une ligne dans
`courses/index.js`.

## Déployer sur Vercel

Importer le dépôt sur vercel.com : Vite est détecté tout seul (build `npm run build`,
sortie `dist`). Rien à configurer.

## Sauvegarde

- Enregistrement automatique après chaque leçon, dans le navigateur — une sauvegarde
  par langue ; les réglages (voix, débit, objectif) sont communs.
- Effacer les données du site ou passer en navigation privée efface la progression.
- Le profil contient un **code de secours** à copier pour transférer la progression
  vers un autre appareil. Les sauvegardes d'avant la refonte sont migrées
  automatiquement : les mots déjà croisés entrent en mémoire espacée et les leçons
  terminées valent une première couronne.

## Voix

L'app utilise la synthèse vocale du système (`speechSynthesis`) en `pt-BR` ou en
`es-ES`. La qualité dépend des voix installées sur l'appareil ; les réglages
permettent de choisir la voix (retenue pour chaque langue), le débit et la hauteur.

- iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Portugais (Brésil)
  ou Espagnol (Espagne).
- Android : Paramètres → Synthèse vocale → moteur Google → installer les données
  pt-BR ou es-ES.

Si la voix reste muette, **Profil → Diagnostic du son** teste séparément les bips
et la voix, et donne le rapport à envoyer.
