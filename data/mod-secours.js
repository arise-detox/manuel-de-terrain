/* Module : Secours et soins tactiques */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "secours", titre: "Secours et soins tactiques", court: "Secours",
    desc: "Les gestes qui sauvent : hémorragie, voies aériennes, respiration, circulation, hypothermie, arrêt cardiaque, évacuation. La logique MARCH des soins tactiques, adaptée au contexte civil français.",
    outils: ["alerte", "chrono", "checklists"],
    sources: ["atp-4-02-11", "fm-4-25-11"],
    chapitres: [
      {
        id: "principes", titre: "Principes : protéger, alerter, secourir", resume: "La démarche générale et la séquence MARCH des soins tactiques.",
        b: [
          warn("Ce chapitre est une introduction, pas une formation. Les gestes de secours s’apprennent **en pratique** avec un instructeur : formation PSC1 (Prévention et secours civiques de niveau 1), formations de la Croix-Rouge, de la Protection civile, des pompiers, ou stage de secourisme en milieu isolé. Faites-en une, et rafraîchissez-la tous les deux ou trois ans.", "Se former"),
          h("La démarche civile en trois temps"),
          steps(["Protéger", "Écartez le danger (circulation, effondrement, feu, chute de pierres) ou la victime du danger, **sans vous mettre en danger**. Vous êtes inutile si vous devenez victime."], ["Alerter", "Appelez le **112** (ou 15, 18). Donnez le lieu précis, la nature du problème, le nombre de victimes. Suivez les instructions du régulateur."], ["Secourir", "Pratiquez les gestes que vous maîtrisez : arrêter une hémorragie, dégager les voies aériennes, relancer le cœur, protéger du froid."]),
          h("La logique des soins tactiques : MARCH"),
          p("Les soins tactiques aux blessés de combat (TCCC) classent les gestes **dans l’ordre où l’on meurt**, du plus rapide au plus lent. Cette logique est valable bien au-delà du champ de bataille : accident de montagne, accident de la route, atelier."),
          dia("med-march", "Dans cet ordre : d’abord ce qui tue en quelques minutes (le saignement), puis la respiration et la circulation, enfin le froid."),
          note("Ne passez à la lettre suivante que lorsque la précédente est traitée. Un saignement massif ignoré ne laisse aucun temps pour le reste.", "Un ordre, pas une liste"),
          kp("Protéger, alerter, secourir.", "MARCH : hémorragie massive, voies aériennes, respiration, circulation, hypothermie et tête.", "Se former en pratique : PSC1 et formations équivalentes.")
        ]
      },
      {
        id: "hemorragie", titre: "Hémorragie massive", resume: "Compression, tamponnement, garrot : arrêter un saignement qui menace la vie.",
        b: [
          p("Une personne peut perdre assez de sang pour mourir en **quelques minutes**. L’hémorragie massive est donc le premier problème à traiter. Elle se reconnaît à un sang qui jaillit, qui imbibe les vêtements, qui forme une flaque, ou qui ne s’arrête pas malgré la compression."),
          h("Trois gestes, dans cet ordre"),
          steps(["Compression directe", "Appuyez fermement avec la paume de la main, ou avec le poing, sur la plaie, à travers un tissu propre si possible. Maintenez sans relâcher."], ["Tamponnement", "Pour une plaie profonde (ou près de l’aine, de l’aisselle, du cou), bourrez la plaie de compresses ou de pansement hémostatique, puis comprimez fortement plusieurs minutes. Suivez la notice du pansement."], ["Garrot", "Si le membre continue de saigner malgré la compression, ou si la compression est impossible (plusieurs victimes, danger immédiat), posez un garrot."]),
          note("Dans le **contexte civil français**, on privilégie la compression directe, puis le garrot si elle ne suffit pas. Dans le **contexte tactique** (menace présente, plusieurs blessés), on pose le garrot d’emblée sur une hémorragie d’un membre.", "Civil et tactique"),
          h("Poser un garrot"),
          dia("med-garrot", "Le garrot se pose entre la plaie et le cœur, jamais sur une articulation."),
          steps(["Placer", "Posez-le à 5 à 8 cm au-dessus de la plaie, côté cœur. Si vous ne savez pas où est la plaie, placez-le le plus haut possible sur le membre."], ["Serrer", "Serrez jusqu’à l’arrêt du saignement. C’est douloureux : c’est normal et nécessaire."], ["Verrouiller", "Fixez la tige ou la sangle pour qu’elle ne se desserre pas."], ["Noter l’heure", "Écrivez l’heure de pose sur le garrot ou sur le front de la victime, et communiquez-la aux secours."], ["Ne pas desserrer", "Seuls les médecins décident de le retirer. Si le saignement continue, serrez davantage ou posez un deuxième garrot juste au-dessus du premier."]),
          warn("Un garrot mal posé (trop lâche) peut aggraver le saignement. Si vous n’êtes pas formé à son emploi, appuyez fort sur la plaie et alertez. Entraînez-vous sur un membre factice, jamais sur une personne.", "Entraînement"),
          p("L’[outil Chronomètre de pose](#/outils/chrono) sert à suivre le temps écoulé depuis la pose, pour l’entraînement ou en situation réelle."),
          kp("Compression directe, puis tamponnement, puis garrot.", "Garrot : 5 à 8 cm au-dessus de la plaie, serré jusqu’à l’arrêt du saignement, heure notée, jamais desserré.", "Plaie à l’aine, au cou ou à l’aisselle : tamponnement et compression, pas de garrot.")
        ]
      },
      {
        id: "voies-respiration", titre: "Voies aériennes et respiration", resume: "Dégager les voies aériennes, la position latérale de sécurité, les plaies du thorax.",
        b: [
          h("Vérifier la conscience et la respiration"),
          p("Secouez doucement les épaules et demandez « Vous m’entendez ? ». Si la personne ne répond pas, basculez doucement sa tête en arrière, soulevez le menton, regardez le ventre et la poitrine pendant **10 secondes au plus** : bouge-t-elle ?"),
          table(["Constat", "Conduite"], ["Inconsciente, **respire**", "Position latérale de sécurité, alerter, surveiller en continu"], ["Inconsciente, **ne respire pas** (ou respiration anormale)", "Alerter, commencer la réanimation (voir « Arrêt cardiaque »)"], ["Consciente, difficultés à respirer", "Position confortable (souvent assise), desserrer les vêtements, alerter"]),
          h("La position latérale de sécurité"),
          dia("med-pls", "La personne est sur le côté, la tête en arrière et la bouche vers le sol : les liquides s’écoulent, la langue ne bouche pas la gorge."),
          steps(["Préparer", "Pliez le genou le plus éloigné de vous. Placez le bras le plus proche à angle droit, la main de l’autre bras sous sa joue."], ["Faire rouler", "Tirez doucement sur le genou plié pour la rouler vers vous, sur le côté."], ["Stabiliser", "Ajustez la jambe du dessus pour qu’elle soutienne le corps, penchez la tête en arrière, ouvrez la bouche vers le sol."]),
          note("Si un traumatisme du cou ou du dos est possible (chute, accident), manipulez le moins possible. Mais une personne inconsciente qui respire doit avoir ses voies aériennes libres : c’est la priorité.", "Cas particulier"),
          h("Plaie du thorax"),
          p("Une plaie thoracique qui « aspire » l’air (bruit, bulles) se couvre avec un **pansement étanche**, fixé sur trois côtés ou muni d’une valve. Si la respiration s’aggrave, soulevez un coin du pansement pour laisser sortir l’air. Ne retirez **jamais** un objet planté : stabilisez-le par un pansement volumineux."),
          kp("Dix secondes pour voir si la poitrine bouge.", "Inconsciente et respire : position latérale de sécurité.", "Plaie qui aspire l’air : pansement étanche sur trois côtés.", "Objet planté : on ne le retire pas.")
        ]
      },
      {
        id: "circulation-froid", titre: "Circulation, choc et hypothermie", resume: "Reconnaître le choc, garder la victime au chaud, surveiller la conscience.",
        b: [
          h("Le choc"),
          p("Le choc survient quand la circulation ne suffit plus : après une perte de sang, une douleur intense, une réaction allergique. Il se reconnaît à la **pâleur**, aux sueurs froides, au pouls rapide et faible, à l’agitation puis la somnolence."),
          ul("Arrêtez toute hémorragie visible.", "Allongez la personne, couvrez-la, rassurez-la.", "Ne lui donnez ni à boire ni à manger, elle pourrait devoir être opérée.", "Alertez (112) et surveillez sa respiration et sa conscience."),
          h("Hypothermie : un tueur discret"),
          p("Un blessé perd sa chaleur vite, même à des températures modérées, surtout s’il est mouillé ou au contact du sol. Elle aggrave les saignements en gênant la coagulation."),
          steps(["Isoler du sol", "Glissez un sac, une couverture, un tapis sous la victime."], ["Couvrir", "Couverture de survie, vêtements secs. Couvrez aussi la tête."], ["Garder au sec", "Retirez les vêtements trempés si possible, sans exposer la victime au vent."]),
          h("Surveiller la conscience : AVPU"),
          table(["Lettre", "Signification", "Test"], ["A", "Alerte", "Yeux ouverts, répond normalement"], ["V", "Voix", "Réagit quand on l’appelle"], ["P", "Douleur", "Ne réagit qu’à un stimulus douloureux"], ["I", "Inconscient", "Aucune réaction"]),
          p("Un passage de A vers V, P ou I est une **aggravation** : informez immédiatement les secours. Un traumatisme à la tête impose cette surveillance même si la personne se sent bien."),
          kp("Choc : pâleur, sueurs, pouls rapide. Allonger, couvrir, alerter.", "Toujours isoler du sol et couvrir un blessé.", "AVPU : une baisse de conscience est une aggravation.")
        ]
      },
      {
        id: "arret-cardiaque", titre: "Arrêt cardiaque : réanimation et défibrillateur", resume: "Compressions thoraciques et DAE : le geste qui double ou triple les chances de survie.",
        b: [
          p("Une personne inconsciente qui ne respire pas, ou respire de façon anormale (gasps), est en arrêt cardiaque. Le temps compte : chaque minute sans massage diminue les chances de survie. **N’attendez pas d’être sûr.**"),
          dia("med-rcp", "Le rond rouge bat à la bonne cadence : environ deux compressions par seconde."),
          steps(["Alerter", "Appelez le **112** (ou faites appeler) et demandez un défibrillateur : ils sont signalés dans de nombreux lieux publics."], ["Comprimer", "Placez le talon d’une main au centre de la poitrine, l’autre main par-dessus. Enfoncez de 5 à 6 cm, à un rythme de **100 à 120 par minute**, en laissant le thorax remonter."], ["Insuffler (si formé)", "Alternez 30 compressions et 2 insufflations de 1 seconde. Si vous n’êtes pas formé ou n’osez pas, continuez les compressions seules."], ["Défibrillateur (DAE)", "Dès qu’il arrive, allumez-le et suivez ses instructions vocales. Aucun risque de choquer par erreur : il n’administre un choc que s’il est nécessaire."]),
          warn("Ne vous arrêtez que pour passer le relais aux secours, si la victime reprend conscience, ou si vous êtes épuisé. Se relayer toutes les 2 minutes maintient l’efficacité.", "Continuer"),
          kp("Inconscient + ne respire pas : 112, compressions, défibrillateur.", "Centre de la poitrine, 5 à 6 cm, 100 à 120 par minute.", "Le défibrillateur automatisé ne choque que si nécessaire.")
        ]
      },
      {
        id: "evacuation", titre: "Évacuer et transmettre", resume: "Surveiller, transmettre un bilan clair, préparer l’arrivée des secours.",
        b: [
          p("Le blessé n’est pas pris en charge tant que l’information n’a pas été transmise. **Un bon bilan** fait gagner du temps aux secours."),
          h("Transmettre aux secours"),
          ul("**Qui** : âge approximatif, conscience, respiration.", "**Quoi** : ce qui s’est passé, les blessures vues.", "**Quels gestes** : ce que vous avez fait, avec les heures (surtout la pose d’un garrot).", "**Évolution** : mieux, pareil ou pire depuis votre arrivée."),
          h("La demande en neuf lignes"),
          p("Dans un contexte tactique, une demande d’évacuation sanitaire suit un message en neuf lignes. Les cinq premières sont l’essentiel."),
          table(["Ligne", "Contenu"], ["1", "Lieu de prise en charge (coordonnées)"], ["2", "Fréquence radio et indicatif"], ["3", "Blessés par degré d’urgence (urgent absolu, urgent, différé)"], ["4", "Matériel spécial nécessaire"], ["5", "Blessés couchés ou pouvant s’asseoir"], ["6", "Sécurité sur la zone"], ["7", "Marquage de la zone"], ["8", "Nationalité et statut des blessés"], ["9", "Terrain et menaces particulières"]),
          p("Préparez-la avec l’[outil Message d’alerte et d’évacuation](#/outils/alerte)."),
          h("Accueillir un hélicoptère"),
          ul("Choisissez une zone plane, dégagée, sans fils ni obstacles, avec les objets légers fixés ou retirés.", "Gardez-vous **loin** de l’appareil et ne vous approchez que sur indication de l’équipage, jamais par l’arrière.", "Protégez vos yeux et la victime de la poussière.", "Ne bougez pas tant que les rotors tournent, sauf instruction contraire."),
          kp("Transmettre : qui, quoi, quels gestes (avec heures), évolution.", "Neuf lignes : les cinq premières sont l’essentiel.", "Hélicoptère : zone dégagée, jamais par l’arrière, instructions de l’équipage.")
        ]
      }
    ],
    quiz: [
      { q: "Dans la séquence MARCH, que traite-t-on en premier ?", o: ["Les voies aériennes", "L’hypothermie", "Les hémorragies massives", "La respiration"], a: 2, e: "On commence par ce qui tue le plus vite : un saignement abondant peut être mortel en quelques minutes." },
      { q: "À quelle distance de la plaie pose-t-on un garrot ?", o: ["Directement sur la plaie", "5 à 8 cm au-dessus, côté cœur", "Sur l’articulation la plus proche", "Aussi loin que possible de la plaie"], a: 1, e: "On le place entre la plaie et le cœur, à 5 à 8 cm, jamais sur une articulation." },
      { q: "Que faire une fois le garrot serré et le saignement arrêté ?", o: ["Le desserrer après 5 minutes", "Noter l’heure de pose et ne pas le desserrer", "Le retirer dès que les secours arrivent", "Ajouter de la glace"], a: 1, e: "L’heure de pose doit être transmise aux secours, et seul un médecin décide de retirer un garrot." },
      { q: "Une personne est inconsciente et respire. Que faites-vous ?", o: ["La laisser sur le dos", "La mettre en position latérale de sécurité et alerter", "La faire boire", "La relever"], a: 1, e: "La position latérale de sécurité libère les voies aériennes et évite l’étouffement par la langue ou les liquides." },
      { q: "Quel est le rythme des compressions thoraciques pour adulte ?", o: ["60 par minute", "100 à 120 par minute", "150 à 180 par minute", "Peu importe"], a: 1, e: "100 à 120 par minute, en enfonçant le thorax de 5 à 6 cm." },
      { q: "Que signifie la lettre P dans AVPU ?", o: ["Pouls", "Pression", "Réagit à la douleur (Pain)", "Pupilles"], a: 2, e: "A : alerte, V : voix, P : douleur, I (U) : inconscient. C’est une échelle de conscience en quatre niveaux." },
      { q: "Quelle est la première étape en présence d’un danger sur les lieux d’un accident ?", o: ["Secourir la victime immédiatement", "Protéger : écarter le danger sans se mettre en danger", "Attendre sans rien faire", "Déplacer systématiquement la victime"], a: 1, e: "On protège d’abord. Un secouriste blessé n’aide plus personne." }
    ]
  });
})();
