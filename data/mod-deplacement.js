/* Module : Déplacement, discrétion et observation */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "deplacement", titre: "Déplacement, discrétion et observation", court: "Déplacement",
    desc: "Marcher en groupe sans perdre personne, s’arrêter en sécurité, se déplacer de nuit, observer la nature en discrétion, franchir routes et cours d’eau. La discipline de déplacement des patrouilles, au service de la randonnée et de l’observation.",
    outils: ["azimut", "pas", "soleil", "checklists"],
    sources: ["atp-3-21-8", "mctp-3-01a", "mcrp-3-10a-4", "tc-3-21-75"],
    chapitres: [
      {
        id: "principes", titre: "Principes du déplacement", resume: "Préparer l’itinéraire, régler le rythme, rester groupé.",
        b: [
          p("Les manuels de patrouille posent un principe simple : **un déplacement se prépare avant de se faire**. Les erreurs de terrain viennent presque toujours d’un itinéraire mal compris, d’un rythme trop rapide ou d’un groupe qui s’étire."),
          h("Avant le départ"),
          ul("**Itinéraire** : tracé sur la carte, points de passage, variantes de repli, points d’eau.", "**Horaires** : durée estimée avec la règle de Naismith ([outil Estime du pas](#/outils/pas)), heure limite de demi-tour.", "**Briefing** : chacun connaît le but, l’itinéraire, les consignes de sécurité, le point de ralliement.", "**Matériel** : vérifié, rangé pour ne pas faire de bruit ni de gêne."),
          h("Pendant la marche"),
          ul("**Rythme** : celui du plus lent. Un groupe qui s’étire perd du temps et des personnes.", "**Premier arrêt après 15 à 20 minutes** pour régler les sacs et les vêtements ; puis une courte pause toutes les heures environ.", "**Bien se couvrir avant d’avoir froid, se découvrir avant de transpirer** : ajustez les couches pendant les pauses.", "**Boire et manger** régulièrement, sans attendre la soif ou la fatigue.", "**Observer et vérifier** : positionner souvent sur la carte, noter l’heure aux points remarquables."),
          note("Une bonne règle : **se retourner pour compter**. Le dernier du groupe doit toujours rester visible du premier, ou en liaison radio.", "Ne perdre personne"),
          kp("Itinéraire, horaires, briefing et matériel : tout se prépare avant le départ.", "Rythme : celui du plus lent.", "Compter régulièrement : le dernier doit toujours rester visible.")
        ]
      },
      {
        id: "formations", titre: "Formations de déplacement", resume: "Colonne, colonne décalée, ligne, coin, losange : choisir selon le terrain.",
        b: [
          p("La **formation** est la manière dont un groupe se range pendant la marche. Les armées en décrivent cinq de base ; elles s’appliquent à n’importe quel groupe progressant à pied en terrain varié."),
          dia("tac-formations", "Cinq formations. La tête de formation est marquée en couleur ; la flèche indique le sens de marche."),
          table(["Formation", "Quand l’utiliser", "Avantages", "Inconvénients"], ["**Colonne**", "Sentier étroit, forêt, passage difficile, nuit", "Discrète, rapide, facile à contrôler", "Peu de vue sur les côtés"], ["**Colonne décalée**", "Piste large, route peu fréquentée", "Meilleure vue des deux côtés, plus de sécurité", "Demande de l’espace"], ["**Ligne**", "Terrain ouvert, ratissage d’une zone de recherche", "Front large, bonne couverture", "Lente, difficile à tenir sur terrain accidenté"], ["**Coin**", "Terrain ouvert à visibilité moyenne", "Bon compromis", "Demande de la discipline"], ["**Losange**", "Zone où l’on veut regarder dans toutes les directions", "Vue sur 360°", "Plus d’effectif et d’attention"]),
          h("Distances et signaux"),
          ul("**Gardez vos distances** : assez près pour rester en contact visuel, assez loin pour qu’un incident (chute de pierres, glissade) n’atteigne pas tout le groupe.", "Adoptez des **signaux simples** convenus à l’avance : bras levé pour arrêt, main fermée, geste vers le bas pour s’abaisser.", "Le **premier** choisit le chemin et le rythme ; le **dernier** (le serre-file) surveille l’arrière et signale tout problème."),
          kp("Colonne : discrète et rapide. Ligne : large mais lente.", "Coin et losange : meilleure vue autour de soi.", "Un premier qui choisit, un serre-file qui ferme.")
        ]
      },
      {
        id: "halte", titre: "Haltes et points de ralliement", resume: "S’arrêter en sécurité, se regrouper, retrouver un équipier égaré.",
        b: [
          p("Une halte n’est pas un moment de relâchement : c’est un moment où le groupe reste **vulnérable à la fatigue, aux intempéries et aux distractions**. Les patrouilles organisent chaque halte pour qu’elle protège le groupe et prépare la suite."),
          h("La halte de sûreté sur 360°"),
          dia("tac-halte", "Chacun surveille un secteur vers l’extérieur ; les secteurs se recoupent. Le point de ralliement est connu de tous."),
          steps(["Choisir le lieu", "À l’écart du sentier, à l’abri du vent, sans danger au-dessus (chutes de pierres, arbres morts)."], ["Se disposer", "Le groupe se place en cercle, sacs au centre ou à portée de main."], ["Répartir les secteurs", "Chacun regarde son secteur : un arrêt est aussi un moment pour observer l’environnement."], ["Désigner le point de ralliement", "Un repère visible (rocher, arbre isolé, croisement) où l’on se retrouve si l’on est séparé."], ["Repartir à l’ordre", "On s’assure que personne n’a rien oublié, on compte, on repart."]),
          h("Que faire si quelqu’un se sépare du groupe ?"),
          ul("Faites **immédiatement** un appel à voix haute, au sifflet, ou à la radio.", "Comptez le groupe, **notez l’heure** et le dernier point où l’équipier a été vu.", "Ne dispersez pas le reste du groupe : cherchez en **binôme** avec un point de repère et une heure de retour.", "Si la personne reste introuvable après un temps convenu, **alertez les secours** (112) avec le dernier point connu."),
          danger("Ne partez **jamais seul** à la recherche d’un équipier : vous doublez le problème. Cherchez toujours à plusieurs, avec un moyen de communication et un horaire de retour.", "Recherche d’un égaré"),
          kp("Halte : à l’abri, en cercle, avec un secteur par personne.", "Point de ralliement connu de tous avant le départ.", "Équipier égaré : compter, noter l’heure, chercher en binôme, alerter à temps.")
        ]
      },
      {
        id: "discretion", titre: "Discrétion et observation de la faune", resume: "Silhouette, bruit, mouvement, lumière, odeur : les cinq signatures à maîtriser.",
        b: [
          p("Se déplacer discrètement n’est pas réservé aux militaires : c’est aussi la clé de **l’observation d’animaux sauvages**, de la photographie animalière ou d’une approche respectueuse des lieux. Les manuels de reconnaissance en tirent des règles très générales."),
          h("Les cinq signatures"),
          table(["Signature", "Ce qui vous trahit", "Comment la réduire"], ["**Silhouette**", "Le contour de votre corps sur un fond clair, une crête", "Évitez les lignes de crête, restez en contre-bas ou devant un fond sombre"], ["**Bruit**", "Pas, sacs, matériel qui cliquette, voix", "Fixez ou calez le matériel, avancez lentement, parlez bas"], ["**Mouvement**", "Gestes brusques, déplacements rapides", "Bougez peu et lentement ; l’œil détecte d’abord le mouvement"], ["**Lumière**", "Reflets (lunettes, objectif, bouteille), lampe", "Couvrez les reflets, lumière rouge faible la nuit"], ["**Odeur**", "Parfum, fumée, déodorants", "Placez-vous **face au vent** pour que l’odeur ne parte pas vers l’animal"]),
          h("Observer avec patience"),
          steps(["Choisir l’emplacement", "Arrivez tôt (aube, crépuscule), vent de face, soleil dans le dos si possible."], ["S’installer", "Posture stable et confortable, jumelles prêtes, vêtements de couleurs neutres."], ["Attendre", "Pendant plusieurs minutes, ne faites rien. La faune reprend son activité normale quand elle ne se sent plus observée."], ["Observer par balayage", "Regardez large, puis détaillez les zones. Dans une lisière, une ombre, une silhouette immobile."], ["Se retirer en douceur", "Quittez les lieux comme vous êtes arrivé, sans déranger."]),
          note("En période de reproduction ou d’élevage des jeunes, **gardez vos distances** et n’approchez pas un nid, une tanière ou un nouveau-né, même s’il semble abandonné. Respectez les zones de protection et les règles locales.", "Respecter la faune"),
          kp("Cinq signatures : silhouette, bruit, mouvement, lumière, odeur.", "Se placer face au vent, bouger peu et lentement.", "Ne jamais déranger la faune en période sensible.")
        ]
      },
      {
        id: "nuit", titre: "Se déplacer de nuit", resume: "Adaptation de l’œil, lumière rouge, vision décalée, prudence.",
        b: [
          p("La nuit, tout est plus difficile : repères, distances, équilibre, froid. Les manuels de patrouille décrivent plusieurs réflexes pour mieux voir et mieux se déplacer, que l’on peut appliquer en randonnée nocturne ou lors d’un retour tardif."),
          h("L’adaptation à l’obscurité"),
          p("L’œil humain met environ **30 minutes** à s’adapter pleinement à l’obscurité. Un éclair de lumière blanche annule ce travail. Le bon réflexe : **protéger sa vision nocturne**."),
          ul("**Utilisez une lampe à lumière rouge** (ou masquez la lumière blanche) : elle préserve l’adaptation, tout en permettant de lire une carte (voir le thème « Lumière rouge » de cette application).", "**Fermez un œil** avant d’allumer une lampe : il conservera sa vision nocturne.", "**Évitez de fixer** les sources de lumière (phares, écran de téléphone)."),
          h("Voir mieux sans lampe"),
          ul("**Regardez à côté** de l’objet : la vision périphérique est plus sensible aux faibles lumières que le centre de l’œil.", "**Balayez lentement**, par petits mouvements, plutôt que de fixer.", "**Repérez les silhouettes** sur le ciel plus clair plutôt que sur le sol sombre."),
          h("Marcher la nuit"),
          ul("**Ralentissez** : on marche en gros deux fois moins vite.", "**Levez les pieds** et posez-les doucement, genoux souples.", "**Restez groupé**, avec un point d’appui lumineux discret (bande réfléchissante sur le sac).", "**Naviguez avec soin** : prenez des repères proches, comptez les pas, utilisez la boussole. L’[heure du coucher du soleil](#/outils/soleil) donne la fenêtre disponible."),
          warn("La nuit, **ne vous engagez pas sur un terrain exposé** (falaise, éboulis, torrent). Si vous n’êtes pas sûr, bivouaquez et repartez au jour.", "Prudence"),
          kp("Adaptation de l’œil : environ 30 minutes. Lumière rouge pour la préserver.", "Regarder à côté de l’objet pour mieux le voir.", "La nuit : ralentir, rester groupé, éviter le terrain exposé.")
        ]
      },
      {
        id: "franchissements", titre: "Franchir routes, clôtures et cours d’eau", resume: "Passer un obstacle sans exposer le groupe.",
        b: [
          p("Un obstacle est un moment où le groupe se concentre et où la vigilance baisse. On les franchit **un par un**, avec un responsable qui contrôle, et sans jamais risquer plus que le gain."),
          h("Routes et chemins fréquentés"),
          ul("**Regroupez-vous** avant de traverser, dans un endroit visible des deux côtés.", "**Regardez des deux côtés**, écoutez, puis traversez **rapidement et ensemble** si possible.", "**Reformez le groupe** de l’autre côté avant de repartir."),
          h("Clôtures et barrières"),
          ul("Passez par les **portails** ou **passages aménagés** ; refermez-les derrière vous.", "N’abîmez pas les clôtures : une barrière ouverte peut laisser sortir du bétail.", "En zone d’élevage, **gardez vos distances** avec les animaux, en particulier les vaches avec veaux et les chiens de protection de troupeaux."),
          h("Cours d’eau"),
          danger("Un cours d’eau, même peu profond, peut emporter un adulte. **Si vous avez un doute, ne traversez pas** : cherchez un pont, remontez vers la source (le débit diminue), ou attendez la baisse. Après un orage en amont, la crue peut monter très vite.", "Eau vive"),
          steps(["Repérer", "Un endroit large, sans rapides ni embâcles, avec une berge d’arrivée facile."], ["Se préparer", "Gardez les chaussures, **défaites la ceinture ventrale** et le sternum du sac pour pouvoir s’en défaire en cas de chute."], ["Traverser", "Face au courant ou en diagonale, par petits pas, avec un bâton, en s’appuyant sur trois points d’appui. Idéalement à plusieurs, épaule contre épaule."], ["Se réchauffer", "De l’autre côté : vêtements secs, boisson chaude, car le froid saisit vite."]),
          kp("Obstacle : un par un, un responsable, vigilance accrue.", "Rivière : au moindre doute, ne pas traverser. Défaire la ceinture du sac.", "Respecter clôtures, portails et troupeaux.")
        ]
      }
    ],
    quiz: [
      { q: "À quel rythme avance un groupe en marche ?", o: ["Celui du plus rapide", "Celui du plus lent", "Au choix de chacun", "Celui du guide, quoi qu’il arrive"], a: 1, e: "Un groupe qui s’étire perd du temps et des personnes : le rythme se règle sur le plus lent." },
      { q: "Quelle formation est la plus discrète et la plus rapide sur sentier étroit ?", o: ["La ligne", "Le losange", "La colonne", "Le coin"], a: 2, e: "La colonne convient aux sentiers étroits, aux forêts et à la nuit. Elle est discrète mais voit peu sur les côtés." },
      { q: "À quoi sert un point de ralliement ?", o: ["À faire une pause déjeuner", "À se retrouver si l’on est séparé", "À stocker le matériel", "À signaler le départ"], a: 1, e: "Un repère visible, connu de tous, où l’on se retrouve si le groupe est dispersé." },
      { q: "Quelle est la règle si un équipier disparaît ?", o: ["Partir seul à sa recherche", "Chercher en binôme, noter l’heure, alerter à temps", "Continuer sans lui", "Attendre sans rien faire"], a: 1, e: "On évite de doubler le problème : recherche en groupe avec horaire de retour, puis alerte des secours." },
      { q: "Pour observer un animal sauvage, où se placer ?", o: ["Contre le vent, derrière l’animal", "Face au vent, pour que l’odeur ne parte pas vers l’animal", "Dans une clairière bien visible", "Sur une crête dégagée"], a: 1, e: "Face au vent : l’odeur est emportée dans l’autre sens. On évite aussi les crêtes, qui dessinent la silhouette." },
      { q: "Combien de temps faut-il environ pour que l’œil s’adapte à l’obscurité ?", o: ["30 secondes", "5 minutes", "30 minutes environ", "2 heures"], a: 2, e: "Environ 30 minutes. D’où la lumière rouge, qui préserve cette adaptation." },
      { q: "Avant de traverser un cours d’eau avec un sac à dos, que fait-on ?", o: ["On serre bien la ceinture", "On défait la ceinture ventrale pour pouvoir se dégager en cas de chute", "On retire ses chaussures", "On court"], a: 1, e: "Un sac qui reste attaché peut entraîner sous l’eau. On garde les chaussures pour la stabilité." }
    ]
  });
})();
