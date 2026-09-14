# Fala, Brasil!

Apprendre les bases du portugais du Brésil depuis le français : leçons courtes,
phonétique française sous chaque mot, prononciation audio, niveaux, gemmes et
cartes postales à collectionner.

Progression enregistrée dans le **localStorage** du navigateur : rien à installer,
pas de compte, pas de serveur. Application installable et utilisable hors ligne (PWA).

## Lancer en local

```bash
npm install
npm run dev
```

## Déployer sur Vercel

**Option A — via GitHub (recommandé)**

```bash
git init && git add . && git commit -m "Fala Brasil"
git remote add origin git@github.com:<toi>/fala-brasil.git
git push -u origin main
```

Puis sur vercel.com : *Add New → Project → Import* le dépôt. Vercel détecte Vite
tout seul (build `npm run build`, output `dist`). Rien à configurer.

**Option B — en ligne de commande**

```bash
npm i -g vercel
vercel        # préproduction
vercel --prod # production
```

## Une fois en ligne

Ouvre le site sur ton téléphone, puis « Ajouter à l'écran d'accueil »
(Safari : Partager → Sur l'écran d'accueil ; Chrome : menu → Installer l'application).
L'app s'ouvre alors en plein écran et fonctionne **sans connexion** — utile au Brésil.

## Sauvegarde

- Enregistrement automatique après chaque leçon, dans le navigateur.
- Effacer les données du site ou passer en navigation privée efface la progression.
- Le profil contient un **code de secours** à copier pour transférer la progression
  vers un autre appareil ou un autre navigateur.

## Voix

L'app utilise la synthèse vocale du système (`speechSynthesis`) en `pt-BR`.
La qualité dépend des voix installées sur l'appareil ; les réglages permettent de
choisir la voix, le débit et la hauteur.
- iPhone : Réglages → Accessibilité → Contenu énoncé → Voix → Portugais (Brésil), version Améliorée ou Premium.
- Android : Paramètres → Synthèse vocale → moteur Google → installer les données pt-BR.

## Structure

```
src/App.jsx   toute l'app : contenu des leçons, cartes, exercices, écrans
src/main.jsx  point d'entrée React
src/index.css Tailwind + quelques règles de base
```

Le contenu pédagogique est en haut de `App.jsx` (`UNITS`), les cartes postales
juste en dessous (`CARDS`) : ajouter une unité ou une carte se fait en ajoutant
un objet au tableau, rien d'autre à toucher.
