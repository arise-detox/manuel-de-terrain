/* Module : Survie en milieu isolé */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "survie", titre: "Survie en milieu isolé", court: "Survie",
    desc: "Rester en vie et se faire retrouver : état d’esprit, priorités, abri, eau, feu, signaux. Les réflexes des manuels de survie, adaptés au contexte français.",
    outils: ["soleil", "checklists", "alerte"],
    sources: ["atp-3-50-21", "mcrp-3-02h", "afh-10-644"],
    chapitres: [
      {
        id: "priorites", titre: "Mental et priorités", resume: "La règle des trois, l’acronyme SURVIVAL et l’ordre dans lequel agir.",
        b: [
          p("Les manuels de survie insistent sur un point : ce qui sauve n’est pas d’abord le matériel, c’est la **décision**. Rester calme, évaluer, puis agir dans le bon ordre. La peur est normale ; la panique est ce qui tue."),
          h("La règle des trois"),
          dia("surv-regle3", "Des repères pour hiérarchiser : on meurt plus vite d’un manque d’air ou de chaleur que de faim."),
          h("SURVIVAL : l’acronyme des manuels américains"),
          p("Les manuels américains résument l’état d’esprit par un acronyme anglais. En voici la traduction, ligne à ligne :"),
          table(["Lettre", "Anglais", "Français"], ["S", "Size up the situation", "Évaluer la situation : environnement, état physique, matériel"], ["U", "Use all your senses", "Utiliser tous ses sens ; la précipitation fait perdre du temps"], ["R", "Remember where you are", "Se rappeler où l’on est (dernier point connu, sur la carte)"], ["V", "Vanquish fear and panic", "Vaincre la peur et la panique"], ["I", "Improvise", "Improviser avec ce que l’on a"], ["V", "Value living", "Valoriser la vie : garder une raison de s’en sortir"], ["A", "Act like the natives", "Agir comme les gens du pays : observer ce qui s’y fait"], ["L", "Live by your wits", "Se débrouiller, mais d’abord apprendre les bases"]),
          h("L’ordre des priorités"),
          dia("surv-priorites", "Chaque étape protège la suivante. Mieux vaut un abri sans nourriture qu’un repas sans abri."),
          kp("3 minutes sans air, 3 heures sans abri, 3 jours sans eau, 3 semaines sans nourriture.", "Stopper, évaluer, puis agir dans l’ordre : sécurité, soins, abri, eau, feu, signal, nourriture.", "La panique est le premier ennemi.")
        ]
      },
      {
        id: "abri", titre: "Abri et protection thermique", resume: "Choisir un emplacement, s’isoler du sol, construire un abri simple.",
        b: [
          p("L’abri protège du vent, de la pluie et du froid, et préserve la chaleur du corps. En pratique, **les vêtements et l’isolation du sol comptent plus que l’abri lui-même** : on perd beaucoup plus de chaleur au contact du sol que dans l’air."),
          h("Choisir l’emplacement"),
          ul("**À chercher** : sol sec et plat, protégé du vent, à proximité de l’eau et du bois, visible de loin pour les secours.", "**À éviter** : lits de ruisseaux asséchés (crue), bas-fonds où l’air froid stagne, pentes sujettes aux chutes de pierres ou à l’avalanche, **arbres morts ou branches mortes** au-dessus de vous, crêtes exposées au vent, sous un arbre isolé par temps d’orage."),
          h("Un abri adossé"),
          dia("surv-abri", "Toit incliné, ouverture du côté du feu, dos au vent. Le réflecteur renvoie la chaleur vers vous."),
          steps(["Support", "Fixez une perche horizontale entre deux arbres ou deux fourches, à hauteur de hanche."], ["Charpente", "Appuyez des branches sur la perche, côté vent, en les serrant."], ["Couverture", "Ajoutez des couches de feuillage, d’écorce ou de bâche, du bas vers le haut (comme des tuiles) pour que l’eau ruisselle."], ["Litière", "Posez 15 cm au moins de branchages et de feuilles sèches sous vous. C’est la partie la plus importante."]),
          note("Un abri **petit** se réchauffe vite avec la chaleur du corps. Ne construisez pas plus grand que nécessaire, et gardez toujours une ventilation, surtout si vous brûlez quelque chose à l’intérieur.", "Petit, isolé, ventilé"),
          danger("Ne faites jamais fonctionner un réchaud, un feu ou un barbecue dans un abri fermé : le **monoxyde de carbone** est invisible et inodore. Il endort avant de tuer.", "Monoxyde de carbone"),
          kp("L’isolation du sol compte plus que le toit.", "Emplacement : sec, abrité, sans arbre mort au-dessus.", "Abri petit, ventilé, ouverture sous le vent et face au feu.")
        ]
      },
      {
        id: "eau", titre: "Eau", resume: "Trouver de l’eau, la rendre potable, reconnaître la déshydratation.",
        b: [
          p("Il faut de l’ordre de **2 à 3 litres d’eau par jour** au repos, nettement plus en cas de chaleur ou d’effort. Une eau claire n’est pas forcément potable : bactéries, parasites et virus ne se voient pas."),
          dia("surv-eau", "De la source à la gourde : quatre étapes, dans cet ordre."),
          h("Où en trouver"),
          ul("Les **cours d’eau** vifs valent mieux que les mares ; plus on est près de la source, mieux c’est. Évitez les eaux en aval de pâturages, de villages ou de mines.", "La **pluie** recueillie avec une bâche, la **rosée** essuyée à l’aube avec un tissu.", "Le **creux d’un vallon** en végétation dense, où l’eau affleure parfois."),
          h("La rendre potable"),
          steps(["Filtrer", "Passez l’eau trouble à travers un tissu serré, du sable ou un filtre portatif, pour retirer les particules."], ["Faire bouillir", "Portez à ébullition franche pendant au moins 1 minute (3 minutes au-dessus de 2 000 m). C’est la méthode la plus sûre."], ["Ou traiter", "À défaut, utilisez des pastilles ou un filtre portatif adaptés, en suivant la notice."]),
          warn("Ne buvez **pas** d’eau de mer, d’urine ni d’alcool pour vous hydrater : ils aggravent la déshydratation. Ne vous rationnez pas non plus quand vous avez de l’eau : mieux vaut boire régulièrement que garder l’eau dans le sac.", "À ne pas faire"),
          h("Reconnaître la déshydratation"),
          p("Soif, urine foncée et peu abondante, bouche sèche, maux de tête, vertiges, fatigue, puis confusion. En cas de signes sérieux (confusion, malaise), allongez la personne à l’ombre, faites-la boire par petites gorgées si elle est consciente, et appelez le 112."),
          kp("2 à 3 litres par jour, davantage en effort ou en chaleur.", "Filtrer, puis bouillir au moins 1 minute (3 minutes au-dessus de 2 000 m).", "Jamais d’eau de mer ni d’urine.")
        ]
      },
      {
        id: "feu", titre: "Feu", resume: "Allumer et entretenir un feu de façon sûre, et dans le respect de la loi.",
        b: [
          p("Le feu réchauffe, sèche les vêtements, rend l’eau potable, éloigne les insectes, rassure, et signale votre position. Il demande trois choses : un **combustible**, de l’**air**, de la **chaleur**. Retirez-en une et il s’éteint."),
          warn("En France, allumer un feu en forêt ou à proximité de la végétation est strictement encadré (arrêtés préfectoraux, période de risque incendie, interdiction dans de nombreux massifs). Hors situation de détresse réelle, **renseignez-vous avant** et n’allumez rien sans autorisation.", "Réglementation"),
          h("Préparer avant d’allumer"),
          dia("surv-feu", "Trois montages classiques. Tout le combustible est rassemblé avant d’allumer."),
          steps(["Isoler", "Dégagez le sol jusqu’à la terre, entourez le foyer de pierres, posez une base de bois sec si le sol est mouillé."], ["Rassembler trois tailles", "Amadou (matière très fine et sèche), petit bois (taille d’un crayon), bois plus gros. Prévoyez trois fois plus que ce qui semble nécessaire."], ["Allumer par le dessous", "Enflammez l’amadou, glissez-le sous le petit bois, ajoutez progressivement. Le feu monte : le combustible se place au-dessus de la flamme."]),
          tip("Du bois mort **sur pied**, ou cassé net en branches, est souvent plus sec que celui qui traîne au sol. Fendez les bûches humides : l’intérieur est sec."),
          h("Éteindre"),
          p("Arrosez, remuez les braises, arrosez encore, jusqu’à pouvoir poser la main nue sur la cendre. Un feu mal éteint peut repartir plusieurs heures plus tard."),
          kp("Combustible, air, chaleur.", "Amadou, petit bois, bois : trois tailles, préparées avant d’allumer.", "Feu en nature : réglementation stricte, éteindre complètement.")
        ]
      },
      {
        id: "signaux", titre: "Se faire repérer et alerter", resume: "Signaux sol-air, sifflet, miroir, lampe : se rendre visible et appeler les secours.",
        b: [
          p("Être retrouvé est le vrai but de la survie. Votre priorité est de **faire savoir** où vous êtes. Appelez dès que possible, signalez-vous ensuite."),
          h("Alerter"),
          ul("**112** : numéro d’urgence européen. Il peut fonctionner sur un autre réseau disponible, même sans le réseau de votre opérateur.", "**15** (SAMU), **18** (pompiers), **196** (secours en mer, CROSS).", "Donnez : **où**, **quoi**, **combien**. Restez en ligne et économisez la batterie ensuite (mode avion, luminosité minimale).", "Utilisez l’[outil Message d’alerte](#/outils/alerte) pour préparer vos informations."),
          h("Se signaler"),
          ul("**Trois** signaux répétés (coups de sifflet, éclats de miroir, flashs de lampe, feux) sont reconnus comme appel de détresse.", "Le **miroir** se voit à plusieurs kilomètres par temps clair : visez l’avion ou le sauveteur en passant la main devant le miroir.", "Le **sifflet** porte plus loin que la voix et ne fatigue pas.", "Une **fumée** épaisse (branches vertes sur un feu) se voit le jour ; un **feu** la nuit."),
          dia("surv-signaux", "Signaux au sol : grands, contrastés, tracés dans un espace dégagé."),
          note("Avant de partir, **laissez un plan** à un proche : itinéraire, heure de retour, personnes présentes. Si vous êtes en retard, c’est lui qui déclenchera les secours. C’est la meilleure précaution de toutes.", "La précaution qui sauve"),
          kp("112 : sans réseau opérateur, il passe par un autre réseau disponible.", "Trois signaux répétés = détresse.", "Un proche prévenu de votre itinéraire déclenche les secours si vous ne rentrez pas.")
        ]
      },
      {
        id: "chaleur", titre: "Chaleur et coup de chaleur", resume: "Éviter, reconnaître et traiter l’excès de chaleur.",
        b: [
          p("Une journée chaude, de l’effort et peu d’eau suffisent à provoquer un **coup de chaleur**, une urgence vitale. Il touche autant les jeunes en bonne forme que les autres."),
          h("Prévenir"),
          ul("Marchez tôt le matin ou en fin de journée ; reposez-vous à l’ombre aux heures chaudes.", "Buvez régulièrement avant d’avoir soif ; salez un peu votre alimentation.", "Portez des vêtements amples, clairs, et un couvre-chef."),
          h("Reconnaître"),
          table(["Étape", "Signes", "Conduite"], ["Épuisement par la chaleur", "Transpiration abondante, crampes, nausées, fatigue", "Ombre, repos, boisson par petites gorgées"], ["Coup de chaleur", "Peau chaude et souvent sèche, confusion, malaise, parfois perte de connaissance", "**Refroidir** vite (linges mouillés, éventer), allonger, **appeler le 112**"]),
          warn("Un coup de chaleur n’attend pas : chaque minute compte. Ne donnez rien à boire à une personne qui n’est pas parfaitement consciente.", "Urgence"),
          kp("Prévenir : marcher aux heures fraîches, boire régulièrement, couvrir la tête.", "Coup de chaleur : peau chaude, confusion. Refroidir vite et appeler le 112.", "Rien à boire à une personne qui n’est pas pleinement consciente.")
        ]
      }
    ],
    quiz: [
      { q: "Selon la règle des trois, combien de temps peut-on survivre sans eau ?", o: ["3 heures", "3 jours", "3 semaines", "3 mois"], a: 1, e: "Environ 3 jours, mais cela varie avec la chaleur et l’effort : c’est un repère, pas une promesse." },
      { q: "Dans l’ordre des priorités de survie, que vient-il avant la nourriture ?", o: ["Rien, la nourriture est vitale", "L’abri, l’eau, le feu, le signal", "Seulement le feu", "La chasse"], a: 1, e: "On tient des semaines sans nourriture : le froid, le manque d’eau et l’absence de secours sont bien plus urgents." },
      { q: "Quel est le meilleur choix d’emplacement pour un abri ?", o: ["Dans un lit de ruisseau asséché", "Sous un grand arbre mort", "Un sol sec, abrité du vent, sans arbre mort au-dessus", "Au sommet de la crête"], a: 2, e: "Les lits de ruisseau (crue), les arbres morts (chute de branches) et les crêtes (vent) sont à proscrire." },
      { q: "Quelle durée minimale d’ébullition recommande-t-on au niveau de la mer ?", o: ["10 secondes", "1 minute", "20 minutes", "Une heure"], a: 1, e: "Une minute d’ébullition franche suffit à tuer les micro-organismes ; 3 minutes au-dessus de 2 000 m." },
      { q: "Quel signal est reconnu comme un appel de détresse ?", o: ["Un seul coup de sifflet", "Trois signaux répétés (sifflet, lampe, miroir, feux)", "Une chanson", "Un drapeau blanc seul"], a: 1, e: "La répétition par trois est le code de détresse le plus répandu." },
      { q: "Quel danger représente un réchaud allumé dans un abri fermé ?", o: ["Aucun s’il fait froid", "L’intoxication au monoxyde de carbone", "La condensation", "Le bruit"], a: 1, e: "Le monoxyde de carbone est invisible, inodore, et provoque somnolence puis mort." },
      { q: "Que faire face à un coup de chaleur ?", o: ["Donner à boire beaucoup d’eau immédiatement", "Refroidir vite et appeler le 112", "Attendre que cela passe", "Faire continuer la marche"], a: 1, e: "C’est une urgence vitale : refroidir (linges mouillés, éventer), allonger et alerter." }
    ]
  });
})();
