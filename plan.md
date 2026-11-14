# Kola — plan de réalisation

## Objectif produit

Kola est une plateforme mobile-first d’échange de compétences entre développeurs africains. Le MVP doit donner au jury une expérience immédiatement compréhensible et démontrable : comprendre le concept, découvrir des profils et des opportunités, publier une offre ou une demande, proposer un échange en crédits de temps, suivre son état et laisser une évaluation.

Le produit sera bilingue français–anglais, persistant grâce à la base MySQL gérée, et conçu pour rester extensible vers une authentification réelle et des espaces membres complets. La démo restera utilisable sans compte grâce à des données de démonstration et des interactions locales, afin de réduire le risque pendant le hackathon.

## Périmètre MVP

- Page d’accueil narrative avec proposition de valeur, fonctionnement en trois étapes et CTA vers la découverte.
- Catalogue d’opportunités : recherche, filtre offre/demande, catégories et cartes détaillées.
- Profils développeurs avec compétences, disponibilité, réputation et historique synthétique.
- Formulaire de publication d’une offre ou d’une demande.
- Parcours de proposition d’échange depuis une opportunité, avec service proposé, crédits de temps et message.
- Suivi visuel des échanges dans une vue activité : proposé, accepté, en cours, terminé.
- Évaluation d’un échange terminé par note et commentaire.
- Sélecteur FR/EN persistant côté navigateur ; tous les textes principaux passent par le dictionnaire de traduction.
- Données seedées pour une démo crédible et tables Drizzle prêtes pour les données persistantes.

## Architecture et structure

- `client/src/pages/Home.tsx` : shell principal et page d’accueil.
- `client/src/pages/Explore.tsx` : recherche et filtres d’opportunités.
- `client/src/pages/Profile.tsx` : profil de démonstration et réputation.
- `client/src/pages/Activity.tsx` : échanges et états du cycle de vie.
- `client/src/components/` : navigation, cartes, badges, modales et composants de formulaire.
- `client/src/lib/i18n.ts` : traductions FR/EN et état de langue.
- `client/src/index.css` : système visuel, responsive et animations sobres.
- `drizzle/schema.ts` : tables users, profiles, opportunities, exchanges et reviews.
- `server/db.ts` : accès aux données et seed idempotent.
- `server/routers.ts` : procédures tRPC publiques pour le catalogue, les profils et les actions MVP.
- `public/manus-routes.json` : routes reconnues par Preview et publication.

## Choix de design

Styles envisagés :

1. **Atelier panafricain éditorial** — 0,06 : chaleureux, texturé, plus narratif et culturel.
2. **Terminal communautaire** — 0,04 : sombre, très technique, axé code et productivité.
3. **Marché numérique chaleureux** — 0,08 : interface claire de marketplace, accents terre cuite et indigo, cartes aérées et détails inspirés du textile.

Style choisi : **Marché numérique chaleureux**.

- **Mouvement** : marketplace éditoriale contemporaine, inspirée des interfaces de communauté et des carnets de projet africains, sans folklore décoratif.
- **Principes** : confiance visible, densité maîtrisée, hiérarchie immédiate, convivialité professionnelle.
- **Philosophie couleur** : ivoire et sable pour l’accueil, indigo profond pour la confiance, terre cuite pour l’énergie, vert feuille pour les états positifs ; contraste fort et peu de couleurs concurrentes.
- **Paradigme de mise en page** : une colonne éditoriale qui s’ouvre vers des panneaux latéraux contextuels ; sections en bandes horizontales, pas de grille uniforme partout.
- **Signatures** : motif discret de points reliés évoquant les échanges, badges de crédits en capsule, grand chiffre de réputation mis en avant.
- **Interaction** : chaque action importante explique son bénéfice ; les formulaires apparaissent en panneau ou modal court et gardent le contexte de l’opportunité.
- **Animation** : transitions de 180–240 ms, apparition douce des cartes, aucun mouvement permanent ; respecter `prefers-reduced-motion`.
- **Typographie** : Manrope pour l’interface et les titres, avec une hiérarchie nette ; monospace uniquement pour les crédits, identifiants et détails techniques.
- **Essence de marque** : « Les développeurs africains s’entraident par le temps, pas seulement par l’argent. » Personnalité : fiable, directe, généreuse.
- **Voix** : titres courts et affirmatifs ; CTA concrets. Exemples : « Échangez ce que vous savez. » et « Trouver un échange qui avance. »
- **Wordmark** : mot-symbole Kola accompagné de deux capsules reliées, représentant donner et recevoir.
- **Couleur signature** : indigo Kola `#263A73`, utilisé pour les actions principales et les repères de confiance.

## Données et backend

Les données de démo seront seedées de manière idempotente dans les tables du projet. Les procédures publiques permettront de lire les opportunités et profils, de créer une opportunité, de créer une proposition d’échange et d’ajouter une évaluation. L’authentification est préparée par le starter Manus mais ne bloque pas la démo ; les mutations peuvent utiliser un profil démo lorsque le visiteur n’est pas connecté.

## Déploiement

Le projet utilise le serveur Express/tRPC et la base MySQL gérée déjà activés. Le serveur écoutera le port fourni par `PORT`, le healthcheck restera `/api/health`, et la publication utilisera le Dockerfile fourni. Le dépôt canonique cible est `Pancracedev/anahata-exchange`.
