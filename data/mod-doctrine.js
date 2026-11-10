/* Module : Doctrine et pensée stratégique */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "doctrine", titre: "Doctrine et pensée stratégique", court: "Doctrine",
    desc: "Comprendre comment les armées pensent : friction et incertitude, attrition contre manœuvre, principes de la guerre, droit des conflits armés. Un module de culture générale tiré de la doctrine fondatrice du Corps des Marines (MCDP 1 « Warfighting »), à lire comme une réflexion sur la décision.",
    outils: ["ordre"],
    sources: ["mcdp-1", "mcrp-3-11-1a", "tc-3-21-75"],
    chapitres: [
      {
        id: "nature", titre: "La nature de la guerre", resume: "Violence, incertitude, friction, hasard : ce que les doctrines retiennent de Clausewitz.",
        b: [
          note("Ce module est un **module de culture stratégique** : il explique comment des armées modernes conçoivent la décision et le conflit. Il ne contient ni procédure de combat ni technique offensive. Les idées présentées sont, pour la plupart, applicables à toute activité où l’on décide sous pression.", "Nature du module"),
          p("Le manuel **MCDP 1 Warfighting**, doctrine fondatrice du Corps des Marines américain, s’appuie sur le penseur prussien **Carl von Clausewitz** (« De la guerre », 1832) pour décrire ce qu’est un conflit. Il en retient quelques idées centrales, utiles bien au-delà du militaire."),
          h("Quatre idées clés"),
          table(["Notion", "Idée", "Conséquence pratique"], ["**Friction**", "Tout est simple en guerre, mais le plus simple est difficile : l’accumulation de petits ratés ralentit tout.", "Prévoir des marges, simplifier les plans, s’entraîner."], ["**Incertitude (brouillard)**", "L’information est toujours incomplète, tardive, parfois fausse.", "Décider sans attendre toute l’information ; accepter un risque raisonnable."], ["**Fluidité**", "La situation change en permanence ; chaque action en modifie la suite.", "Adapter en continu ; éviter les plans trop rigides."], ["**Hasard**", "Les événements imprévus pèsent sur l’issue.", "Prévoir des plans de repli, garder des réserves."]),
          h("La dimension humaine"),
          p("Pour Clausewitz comme pour les Marines, la guerre est avant tout **un affrontement de volontés humaines**. Le **moral**, la fatigue, la peur, la cohésion de l’équipe et la confiance comptent autant que le matériel. La doctrine américaine en tire une conséquence : former des personnes qui décident bien sous pression est plus important que perfectionner la technique."),
          kp("Friction, incertitude, fluidité, hasard : les quatre ennemis de tout plan.", "La dimension humaine (moral, cohésion, confiance) pèse autant que le matériel.", "Décider sans attendre la certitude complète.")
        ]
      },
      {
        id: "attrition-manoeuvre", titre: "Attrition contre manœuvre", resume: "Deux manières de gagner : user l’autre, ou le déséquilibrer.",
        b: [
          p("La doctrine distingue deux grandes philosophies de la conduite d’un conflit, dont la comparaison s’applique aussi aux affaires, au sport ou aux échecs."),
          dia("phi-manoeuvre", "À gauche, l’attrition : on use l’adversaire par des chocs frontaux. À droite, la manœuvre : on fixe l’adversaire, puis on exploite un point faible."),
          table(["", "Attrition", "Manœuvre"], ["**Principe**", "Détruire l’adversaire par accumulation de pertes", "Briser sa cohésion et sa capacité à décider"], ["**Moyen**", "Puissance de feu, masse, choc frontal", "Rapidité, surprise, exploitation d’un point faible"], ["**Coût**", "Élevé, long", "Faible si réussi, risqué si raté"], ["**Exige**", "Ressources abondantes", "Information, initiative, commandement décentralisé"]),
          h("L’idée de la manœuvre"),
          p("La manœuvre ne cherche pas à détruire chaque élément de l’adversaire : elle cherche à **le placer dans une situation où il ne peut plus agir de manière cohérente** : désorienté, déséquilibré, privé de choix. Elle suppose de **fixer** un point (attirer l’attention), puis d’**exploiter** un point faible ailleurs. Le principe est ancien (Sun Tzu, 5e siècle av. J.-C.) et se retrouve chez Boyd (boucle OODA)."),
          note("Une doctrine n’est pas une recette. La manœuvre demande une grande qualité d’information et de commandement ; l’attrition peut s’imposer quand l’on dispose d’un avantage massif. Le bon choix dépend de la situation.", "Pas de solution universelle"),
          kp("Attrition : user par le choc ; manœuvre : déséquilibrer par la vitesse et l’exploitation d’un point faible.", "La manœuvre exige information, initiative et commandement par intention.", "Aucune doctrine ne vaut en toute situation.")
        ]
      },
      {
        id: "principes", titre: "Principes de la guerre", resume: "Foch et la doctrine américaine : des repères généraux pour penser une action.",
        b: [
          p("Plusieurs armées ont formulé des **principes de la guerre** : non des règles à appliquer mécaniquement, mais des repères pour **juger une situation**. En France, ceux du maréchal **Ferdinand Foch** (1903) sont restés célèbres."),
          table(["Principe français", "Idée"], ["**Liberté d’action**", "Conserver la capacité de choisir ses actions et son moment, ne pas se laisser imposer l’initiative."], ["**Concentration des efforts**", "Rassembler ses moyens sur ce qui compte, au bon endroit et au bon moment."], ["**Économie des forces**", "Ne pas gaspiller : utiliser le minimum de moyens là où ce n’est pas l’essentiel."]),
          h("Les principes de la guerre américains"),
          p("Les armées américaines retiennent habituellement une liste de neuf principes, que l’on peut aussi lire comme des principes d’organisation d’une action collective :"),
          table(["Principe", "Sens"], ["Objectif", "Poursuivre un but clair, décisif, accessible"], ["Offensive", "Garder l’initiative plutôt que subir"], ["Masse", "Concentrer les effets au bon endroit et moment"], ["Économie des forces", "Employer le minimum partout ailleurs"], ["Manœuvre", "Placer ses moyens de façon avantageuse"], ["Unité de commandement", "Une seule autorité par objectif"], ["Sûreté", "Ne jamais s’exposer à une surprise inacceptable"], ["Surprise", "Agir de façon inattendue ou à un moment imprévu"], ["Simplicité", "Des plans clairs, des ordres brefs et compréhensibles"]),
          tip("Appliquez-les à une sortie en montagne, à un projet ou à une partie d’échecs : **un objectif clair** (sommet ou retour), **unité de commandement** (un chef), **sûreté** (marges de sécurité), **simplicité** (plan lisible).", "Dans la vie civile"),
          kp("Foch : liberté d’action, concentration des efforts, économie des forces.", "Les principes américains : objectif, offensive, masse, économie des forces, manœuvre, unité de commandement, sûreté, surprise, simplicité.", "Ce sont des repères de jugement, pas des recettes.")
        ]
      },
      {
        id: "commandement-mission", titre: "Commander par la mission", resume: "Donner un but plutôt qu’une procédure, et faire confiance à l’initiative.",
        b: [
          p("Si la situation est incertaine et change vite, **un ordre détaillé est vite périmé**. La doctrine des Marines préfère la **tactique de la mission** : on indique le but à atteindre et les limites, on laisse chacun décider de la manière."),
          steps(["Donner l’intention", "Le but final et pourquoi il compte."], ["Fixer les contraintes", "Limites de temps, zone, règles à respecter."], ["Faire confiance", "Les subordonnés choisissent comment, adaptent, saisissent les occasions."], ["Assumer", "Le chef soutient les initiatives qui vont dans le sens de l’intention, même imparfaites."]),
          h("Pourquoi ça marche"),
          ul("**Vitesse** : pas besoin d’attendre un nouvel ordre pour réagir.", "**Adaptation** : chacun voit des choses que le chef ne voit pas.", "**Motivation** : on s’engage davantage dans ce que l’on comprend."),
          h("Ce que ça exige"),
          ul("**Une formation commune** : tous partagent la même culture, le même vocabulaire.", "**La confiance mutuelle** : droit à l’erreur, parole libre.", "**Un but clair** : sans intention explicite, la liberté devient de l’anarchie."),
          p("Voir aussi le module [Commandement et planification](#/m/commandement) pour l’application pratique (intention, ordre en cinq paragraphes)."),
          kp("Commander par la mission : donner le but, laisser le choix de la manière.", "Exige formation commune, confiance et intention claire.", "Utile quand la situation change vite.")
        ]
      },
      {
        id: "droit", titre: "Le droit des conflits armés", resume: "Humanité, nécessité, distinction, proportionnalité : les règles qui encadrent la guerre.",
        b: [
          p("Même au cœur d’un conflit, des règles s’appliquent. Le **droit international humanitaire** (droit des conflits armés), codifié notamment par les **Conventions de Genève de 1949** et leurs protocoles additionnels, est enseigné à tous les militaires, notamment à partir des principes suivants."),
          dia("phi-droit", "Les quatre principes enseignés à tous les militaires."),
          table(["Principe", "Contenu"], ["**Nécessité militaire**", "On ne peut employer la force que pour atteindre un objectif militaire légitime."], ["**Distinction**", "On distingue en permanence combattants et civils, objectifs militaires et biens civils. Les civils ne sont pas une cible."], ["**Proportionnalité**", "Les dommages causés aux civils ne doivent pas être excessifs par rapport à l’avantage militaire attendu."], ["**Humanité**", "On interdit les souffrances inutiles. Les prisonniers, blessés et malades doivent être traités humainement."]),
          h("Ce qui est protégé"),
          ul("**Les blessés et malades** de toutes parties.", "**Les prisonniers de guerre**, qui ne peuvent être maltraités ni humiliés.", "**Le personnel sanitaire et religieux**, les hôpitaux, les ambulances (emblèmes de la croix rouge, du croissant rouge).", "**Les civils** et les biens civils (maisons, écoles, lieux de culte, biens culturels)."),
          note("Désobéir à un ordre manifestement illégal est un devoir. Les crimes de guerre sont imprescriptibles en droit international ; « j’ai obéi aux ordres » ne constitue pas une défense.", "Responsabilité individuelle"),
          kp("Quatre principes : nécessité, distinction, proportionnalité, humanité.", "Blessés, prisonniers, civils et personnel médical sont protégés.", "Un ordre manifestement illégal ne s’exécute pas.")
        ]
      }
    ],
    quiz: [
      { q: "Selon la doctrine, que désigne la « friction » ?", o: ["La rivalité entre services", "L’accumulation de petits ratés qui rend difficile tout ce qui est simple", "L’usure du matériel", "Le frottement des unités sur le terrain"], a: 1, e: "Clausewitz : tout est simple en guerre, mais le plus simple est difficile, par accumulation de petits ratés." },
      { q: "En quoi consiste la manœuvre, par opposition à l’attrition ?", o: ["Détruire chaque élément adverse", "Déséquilibrer l’adversaire en fixant un point et en exploitant un point faible", "Attendre l’adversaire", "Se replier toujours"], a: 1, e: "La manœuvre cherche à briser la cohésion de l’adversaire plutôt qu’à le détruire élément par élément." },
      { q: "Quels sont les trois principes de la guerre du maréchal Foch ?", o: ["Surprise, vitesse, force", "Liberté d’action, concentration des efforts, économie des forces", "Attaque, défense, retraite", "Unité, simplicité, sûreté"], a: 1, e: "Les principes de Foch : liberté d’action, concentration des efforts, économie des forces." },
      { q: "Que signifie « commander par la mission » ?", o: ["Donner des ordres très détaillés", "Donner le but et laisser le choix de la manière", "Laisser faire sans objectif", "Ne rien contrôler"], a: 1, e: "On indique l’intention et les contraintes ; les subordonnés choisissent les moyens et adaptent." },
      { q: "Quel principe du droit des conflits armés impose de ne pas viser les civils ?", o: ["Nécessité", "Distinction", "Surprise", "Économie"], a: 1, e: "Le principe de distinction impose de séparer en permanence combattants et civils, objectifs militaires et biens civils." },
      { q: "Le principe de proportionnalité exige que :", o: ["Tous les moyens soient identiques", "Les dommages aux civils ne soient pas excessifs par rapport à l’avantage militaire attendu", "Les pertes soient égales des deux côtés", "Le matériel soit égal"], a: 1, e: "Les dommages collatéraux ne doivent pas être excessifs par rapport à l’avantage militaire concret et direct attendu." },
      { q: "Quel auteur est à l’origine de l’idée de « brouillard » de la guerre ?", o: ["Sun Tzu", "Carl von Clausewitz", "Napoléon", "Foch"], a: 1, e: "Clausewitz (De la guerre, 1832) est associé aux notions de brouillard et de friction." }
    ]
  });
})();
