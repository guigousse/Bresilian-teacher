# Fala, Brasil!

Apprendre les bases du portugais du Brésil depuis le français : leçons courtes,
phonétique française sous chaque mot, prononciation audio, mémoire espacée,
histoire à débloquer et cartes postales à collectionner.

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

- Objectif quotidien réglable (de 20 à 120 XP), anneau de progression, coffre à
  l'objectif atteint.
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
  App.jsx          assemblage : état, navigation, récompenses
  data/units.js    le contenu pédagogique : 20 chapitres, 360 items
  data/stories.js  les cinq livres, vingt pages en tout
  data/cards.js    les vingt cartes postales
  lib/progress.js  mémoire espacée, couronnes, quêtes, séries, trophées
  lib/exercises.js fabrique les sessions selon la couronne
  lib/speech.js    synthèse vocale portugaise (et contournements Android)
  lib/audio.js     sons et vibrations, synthétisés sans aucun fichier
  lib/storage.js   sauvegarde et code de secours
  ui/              un fichier par écran, plus la mascotte et les styles
```

Ajouter du vocabulaire se fait dans `data/units.js`, une carte dans `data/cards.js`,
un chapitre dans `data/stories.js` : rien d'autre à toucher.

## Déployer sur Vercel

Importer le dépôt sur vercel.com : Vite est détecté tout seul (build `npm run build`,
sortie `dist`). Rien à configurer.

## Sauvegarde

- Enregistrement automatique après chaque leçon, dans le navigateur.
- Effacer les données du site ou passer en navigation privée efface la progression.
- Le profil contient un **code de secours** à copier pour transférer la progression
  vers un autre appareil. Les sauvegardes d'avant la refonte sont migrées
  automatiquement : les mots déjà croisés entrent en mémoire espacée et les leçons
  terminées valent une première couronne.

## Voix

L'app utilise la synthèse vocale du système (`speechSynthesis`) en `pt-BR`.
La qualité dépend des voix installées sur l'appareil ; les réglages permettent de
choisir la voix, le débit et la hauteur.

- iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Portugais (Brésil).
- Android : Paramètres → Synthèse vocale → moteur Google → installer les données pt-BR.

Si le portugais reste muet, **Profil → Diagnostic du son** teste séparément les bips
et la voix, et donne le rapport à envoyer.
