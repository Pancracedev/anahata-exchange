# Kola — TODO MVP

## 1. Expérience publique bilingue

- [ ] La page d’accueil explique clairement Kola, le problème, le fonctionnement des échanges et la valeur des crédits de temps.
- [ ] L’interface est mobile-first, lisible sur petit écran et utilise un sélecteur FR/EN cohérent sur tout le parcours.
- [ ] Les CTA permettent d’aller vers l’exploration, la publication et la présentation du fonctionnement sans compte.

## 2. Découverte des opportunités et profils

- [ ] L’utilisateur peut rechercher des offres et demandes et filtrer au minimum par type et catégorie.
- [ ] Les cartes affichent compétence, besoin, crédits, localisation ou langue et état de disponibilité.
- [ ] Un profil présente compétences, disponibilité, réputation et quelques échanges réalisés.
- [ ] Les données d’exemple rendent la démo crédible au premier chargement.

## 3. Publication d’une opportunité

- [ ] Le formulaire permet de choisir offre ou demande, renseigner titre, description, catégorie, crédits de temps, langue et disponibilité.
- [ ] Une soumission valide ajoute l’opportunité au catalogue local et donne un retour de succès compréhensible.
- [ ] Les champs invalides affichent une aide courte et le formulaire reste utilisable au clavier.

## 4. Proposition et suivi d’un échange

- [ ] Depuis une opportunité, l’utilisateur peut proposer un échange avec service attendu, crédits convenus et message.
- [ ] La vue activité affiche le cycle proposé, accepté, en cours et terminé avec un repère visuel.
- [ ] L’utilisateur peut faire progresser une proposition de démonstration et voir le changement immédiatement.

## 5. Réputation et évaluation

- [ ] Une évaluation est possible après un échange terminé avec une note et un commentaire.
- [ ] La réputation affichée sur le profil reflète les évaluations de démonstration.

## 6. Persistance et livraison

- [ ] Les tables Drizzle couvrent profils, opportunités, échanges et évaluations et les migrations sont versionnées.
- [ ] Les procédures serveur permettent de lire et de modifier les données du MVP sans exposer de secret au navigateur.
- [ ] Le healthcheck `/api/health`, le manifeste `/manus-routes.json` et la commande de build fonctionnent.
- [ ] Le projet est vérifié par `pnpm check`, `pnpm build` et une revue de code finale.
- [ ] Le code est poussé sur `main` du dépôt `Pancracedev/anahata-exchange` pour servir de dépôt Git du hackathon.
