# Architecture

Application **statique** en JavaScript « classique » (pas de module ES, pas de bundler, pas de dépendance) :
elle fonctionne via `file://`, un serveur HTTP simple ou GitHub Pages. Tout est enregistré dans un objet global
`window.MT`.

## Ordre de chargement (`index.html`)

`js/core.js` → `js/diagrams-a.js`, `js/diagrams-b.js` → `data/sources.js`, `data/glossaire.js` →
`data/mod-*.js` → `data/parcours.js` → `js/tools.js` → `js/app.js`.

`scripts/validate.mjs` relit cette liste : tout script ajouté à `index.html` est chargé par la validation
(sauf `js/app.js`, qui a besoin du DOM) et doit aussi figurer dans `PRECACHE` de `sw.js`.

## Ajouter un module

Créez `data/mod-monmodule.js` :

```js
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip,
      warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "monmodule", titre: "Titre complet", court: "Court", desc: "Une ou deux phrases.",
    outils: ["checklists"],               // identifiants d’outils (js/tools.js)
    sources: ["fm-3-25-26"],              // clés de data/sources.js
    chapitres: [
      { id: "intro", titre: "Introduction", resume: "Une ligne.",
        b: [
          p("Un paragraphe avec **gras**, _italique_, `code`, un {{terme du glossaire}} et un [lien](#/m/survie)."),
          h("Un intertitre"),
          ul("Premier point", "Second point"),
          steps(["Étape 1", "Explication."], ["Étape 2", "Explication."]),
          table(["Colonne A", "Colonne B"], ["a1", "b1"], ["a2", "b2"]),
          note("Texte", "Titre facultatif"),     // aussi tip(), warn(), danger()
          dia("nav-relief", "Légende du schéma"),
          kp("Idée à retenir 1", "Idée à retenir 2")
        ] }
    ],
    quiz: [
      { q: "Question ?", o: ["A", "B", "C", "D"], a: 1, e: "Explication affichée après la réponse." }
    ]
  });
})();
```

Puis ajoutez la balise `<script>` dans `index.html` (avant `data/parcours.js`) **et** le fichier dans `PRECACHE`
de `sw.js`. Les options de quiz sont mélangées à l’affichage ; `a` est l’indice de la bonne réponse dans `o`.

### Liens internes

`#/m/<module>`, `#/m/<module>/<chapitre>`, `#/outils/<outil>`, `#/quiz/<module>`, `#/glossaire`, `#/recherche`,
`#/cartes`, `#/fiches`, `#/sources`, `#/a-propos`. La validation refuse tout lien inconnu.

## Ajouter un schéma

Dans `js/diagrams-a.js` ou `js/diagrams-b.js` : `X["mon-schema"] = function () { … return D.svg(w, h, corps, "description accessible"); }`.
La boîte à outils `MT.d` fournit `T` (texte), `TL` (texte multiligne), `L` (ligne), `P` (chemin), `R` (rectangle),
`C` (cercle), `E` (ellipse), `A` (flèche), `G` (groupe), `pol` (polaire), `rows` (liste de lignes numérotées).

N’utilisez **que les classes** de `css/diagrams.css` (`d-*` pour les traits et textes, `f-*` pour les remplissages) :
elles reposent sur des variables CSS, donc le schéma suit automatiquement les thèmes jour, nuit et rouge.
Vérifiez-le dans les trois thèmes et en largeur de téléphone.

## Ajouter un outil

Dans `js/tools.js` : `T("identifiant", "Titre", "Description", function (racine) { racine.innerHTML = …; })`.
Les calculs restent locaux. Les valeurs à conserver passent par `MT.store` (clé `mdt.v1` du `localStorage`).

## Données locales

La clé `mdt.v1` contient `{ read, quiz, theme, checks }` : chapitres lus, meilleurs scores, thème, cases cochées.
La page « À propos » permet de tout réinitialiser. Aucune donnée ne quitte l’appareil.

## Hors-ligne

`sw.js` pré-cache tous les fichiers listés dans `PRECACHE`. Les pages sont servies réseau d’abord (cache en secours),
les autres fichiers cache d’abord avec mise à jour en arrière-plan. Le workflow `pages.yml` remplace `mdt-v1` par
l’empreinte du commit pour purger l’ancien cache à chaque publication ; en local, changez `VERSION` à la main.
