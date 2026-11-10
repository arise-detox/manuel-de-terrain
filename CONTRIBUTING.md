# Contribuer

Merci de votre aide ! Ce projet est un outil pédagogique : la **justesse** compte plus que la quantité.

## Principes éditoriaux

1. **Français clair**, phrases courtes, vocabulaire défini (utilisez `{{terme}}` pour lier au glossaire).
2. **Sources** : tout contenu technique doit pouvoir être rattaché à un manuel listé dans `data/sources.js`
   (ou à une source officielle française : ministère, Météo-France, FFTir, Croix-Rouge, etc.).
3. **Adapter au contexte français** : numéros d’urgence, réglementation, unités, organismes.
4. **Pas de contenu nuisible**. Sont exclus : explosifs et démolitions, armes improvisées, agents NRBC, pièges,
   techniques d’attaque, d’embuscade, de tir sur personne. Toute proposition de ce type sera refusée.
5. **Prudence médicale** : pas de posologie ; renvoyer vers une formation (PSC1) et vers le 112.
6. **Pas de copier-coller** de passages longs d’un manuel : reformulez, synthétisez, citez la source.

## Mise en route

```bash
git clone <votre-fork>
cd manuel-de-terrain
python3 -m http.server 8080
npm test        # à lancer avant chaque commit
```

## Proposer une modification

1. Créez une branche : `git checkout -b chapitre-xxx`.
2. Modifiez les fichiers de `data/` (ou `js/` pour un schéma ou un outil). Voir `docs/ARCHITECTURE.md`.
3. Lancez `npm test` : il doit afficher « Validation réussie ».
4. Ouvrez une *pull request* en indiquant vos **sources** et, pour un sujet de sécurité (secours, montagne, tir),
   si un **professionnel** a relu le texte.

## Signaler une erreur

Ouvrez une *issue* avec : la page concernée, ce qui est faux ou ambigu, la source qui le montre.
Les erreurs touchant la **sécurité** sont traitées en priorité.
