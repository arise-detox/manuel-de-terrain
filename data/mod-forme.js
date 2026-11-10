/* Module : Condition physique et santé globale */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "forme", titre: "Condition physique et santé globale", court: "Forme",
    desc: "Se préparer pour la marche, la montagne, le terrain : cinq piliers (physique, nutrition, sommeil, mental, sens), progression de l’entraînement, exercices au poids du corps, marche chargée, prévention des blessures. D’après le manuel de santé et de forme globales de l’armée américaine (FM 7-22).",
    outils: ["pas", "checklists"],
    sources: ["fm-7-22", "tc-3-21-75"],
    chapitres: [
      {
        id: "piliers", titre: "Cinq piliers de la performance", resume: "Physique, nutrition, sommeil, mental, sens : la santé globale selon l’armée américaine.",
        b: [
          warn("Cet exposé est **général** et ne remplace pas un avis médical. Avant de reprendre ou d’intensifier une activité (surtout après 40 ans, en cas de maladie cardiaque, de douleur thoracique, d’essoufflement inhabituel, de blessure, de grossesse ou de traitement), **parlez-en à votre médecin**.", "Santé"),
          p("Le manuel **FM 7-22 Holistic Health and Fitness** de l’armée américaine part d’un constat : la performance durable ne dépend pas seulement de l’entraînement. Elle repose sur **cinq piliers** qui s’entretiennent mutuellement."),
          dia("fit-piliers", "Cinq piliers : l’affaiblissement de l’un fragilise les autres. Un sommeil insuffisant, par exemple, réduit la force, la concentration et la récupération."),
          table(["Pilier", "Ce qu’il recouvre"], ["**Physique**", "Force, endurance, mobilité, vitesse, équilibre"], ["**Nutrition**", "Alimentation variée, hydratation, régularité"], ["**Sommeil**", "Durée suffisante, horaires stables, récupération"], ["**Mental**", "Gestion du stress, attention, respiration, motivation"], ["**Sens et valeurs**", "But, sentiment d’appartenance, éthique : ce qui donne la force de continuer"]),
          kp("Cinq piliers : physique, nutrition, sommeil, mental, sens et valeurs.", "Ils interagissent : le plus faible limite les autres.", "Avis médical avant de reprendre ou d’intensifier une activité.")
        ]
      },
      {
        id: "entrainement", titre: "Entraîner : les principes", resume: "Progressivité, régularité, spécificité, récupération.",
        b: [
          p("Un entraînement efficace respecte quelques principes que l’on retrouve dans tous les manuels d’éducation physique."),
          dia("fit-progression", "Une progression régulière, avec une semaine allégée pour laisser le corps s’adapter."),
          table(["Principe", "Idée", "En pratique"], ["**Progressivité**", "Augmenter la charge peu à peu", "Pas plus de 10 % d’augmentation par semaine en durée ou en charge"], ["**Régularité**", "La fréquence prime sur l’intensité", "Trois à quatre séances par semaine valent mieux qu’une séance héroïque"], ["**Spécificité**", "On progresse dans ce que l’on pratique", "Marcher beaucoup pour mieux marcher, porter pour mieux porter"], ["**Récupération**", "Le progrès se fait au repos", "Un jour léger ou de repos entre deux séances intenses"], ["**Variété**", "Éviter la routine et la surcharge d’un même point", "Alterner endurance, force, mobilité"]),
          h("Les repères d’activité de l’OMS"),
          p("L’Organisation mondiale de la santé recommande, pour un adulte, au moins **150 minutes par semaine** d’activité d’endurance d’intensité modérée (marche rapide), complétées par **deux séances de renforcement musculaire**. C’est un minimum de santé ; la préparation à une course de montagne ou à un trek exige davantage."),
          h("Une séance type"),
          steps(["Échauffement (10 min)", "Mobilité articulaire, marche rapide, quelques mouvements légers de la séance."], ["Corps de séance (20 à 40 min)", "Force ou endurance, intensité adaptée."], ["Retour au calme (5 à 10 min)", "Marche lente, étirements doux, respiration."]),
          note("Une courbature légère après une séance nouvelle est normale. Une **douleur aiguë, une gêne qui persiste plusieurs jours, un gonflement** ne le sont pas : arrêtez et consultez.", "Douleur et fatigue"),
          kp("Progressivité (10 % par semaine), régularité, spécificité, récupération.", "OMS : 150 minutes d’endurance modérée et deux séances de renforcement par semaine.", "Échauffement, corps de séance, retour au calme.")
        ]
      },
      {
        id: "exercices", titre: "Exercices au poids du corps", resume: "Un programme complet sans matériel : squat, fente, pompe, rowing, gainage.",
        b: [
          p("Sans matériel, on peut déjà travailler tout le corps. Les manuels militaires de forme physique reposent sur des **mouvements fondamentaux**, exécutés lentement et avec une bonne technique."),
          table(["Mouvement", "Muscles principaux", "Points clés"], ["**Squat**", "Cuisses, fessiers", "Genoux dans l’axe des pieds, dos droit, talons au sol"], ["**Fente**", "Cuisses, fessiers, équilibre", "Pas long, buste droit, genou avant au-dessus de la cheville"], ["**Pompe**", "Pectoraux, épaules, triceps", "Corps gainé en planche, coudes à 45°, genoux au sol si besoin"], ["**Rowing** (tirage)", "Dos, biceps", "Sous une table solide ou avec élastique ; omoplates serrées"], ["**Gainage** (planche)", "Abdominaux, dos", "Alignement tête-hanches-talons, respiration continue"], ["**Montée de marche**", "Jambes, cardio", "Marche ou banc stable, rythme régulier"]),
          h("Un circuit de départ"),
          p("Trois tours de : 10 squats, 8 fentes par jambe, 8 pompes, 10 rowings, planche de 20 secondes. **Repos de 1 à 2 minutes** entre les tours. Faites-le deux fois par semaine, puis augmentez progressivement les répétitions."),
          warn("La **technique avant la quantité**. Une mauvaise exécution répétée entraîne des blessures. Si vous êtes débutant, demandez conseil à un éducateur sportif.", "Technique"),
          kp("Mouvements fondamentaux : squat, fente, pompe, tirage, gainage.", "Technique d’abord, quantité ensuite.", "Deux séances par semaine suffisent pour progresser au début.")
        ]
      },
      {
        id: "marche-chargee", titre: "Marcher avec un sac", resume: "Charge, chaussures, pieds : réussir une longue marche sans se blesser.",
        b: [
          p("La marche avec sac à dos est l’une des activités les plus formatrices pour la montagne ou le trek. Elle sollicite les jambes, le dos, les pieds et la tête. La plupart des blessures proviennent d’une **charge trop lourde**, de **chaussures mal adaptées** ou d’une **progression trop rapide**."),
          h("La charge"),
          ul("**Visez léger** : un sac de randonnée à la journée dépasse rarement 8 à 10 kg ; pour plusieurs jours, essayez de ne pas dépasser **20 % de votre poids**.", "Placez le **poids lourd près du dos**, haut et au milieu.", "Réglez la **ceinture ventrale** : elle doit porter la moitié ou plus de la charge, pas les épaules.", "Augmentez la charge et la distance **séparément**, par palier de 10 % maximum par semaine."),
          h("Les pieds"),
          ul("**Chaussures adaptées au terrain**, déjà portées plusieurs fois avant le départ.", "**Chaussettes sans couture**, laine ou synthétique, jamais de coton.", "**Ongles courts**.", "Dès qu’une **zone chaude** apparaît, **arrêtez-vous** et protégez-la (pansement, bande adhésive). Une ampoule qui naît se soigne en une minute ; une ampoule installée gâche une semaine."),
          note("La marche est l’exercice de base de la préparation au terrain. Calculez vos temps avec l’[outil Estime du pas et temps de marche](#/outils/pas) et ajoutez une marge.", "Estimer le temps"),
          kp("Charge maximale : environ 20 % du poids du corps pour plusieurs jours.", "Ceinture ventrale réglée, poids près du dos.", "Soigner une zone chaude au pied dès qu’elle apparaît.")
        ]
      },
      {
        id: "nutrition-sommeil", titre: "Nutrition, hydratation et sommeil", resume: "Manger et boire pour tenir ; dormir pour récupérer.",
        b: [
          h("Nutrition"),
          ul("**Variété** : féculents, légumes, fruits, protéines, bonnes graisses.", "**Régularité** : ne sautez pas de repas, en particulier le petit-déjeuner avant l’effort.", "**Pendant l’effort** : de petits apports fréquents (fruits secs, barres, fruits) valent mieux qu’un gros repas.", "**Après l’effort** : un repas qui apporte des glucides et des protéines favorise la récupération."),
          h("Hydratation"),
          p("Buvez **régulièrement**, par petites gorgées, avant d’avoir soif. Les urines **claires** indiquent une bonne hydratation, les urines foncées traduisent un manque d’eau. En chaleur ou en altitude, les besoins augmentent."),
          warn("Boire **beaucoup trop** d’eau pure en peu de temps peut aussi être dangereux (hyponatrémie). Pendant un effort prolongé, associez eau et apport en sel (aliments, boisson adaptée).", "Pas d’excès"),
          h("Sommeil"),
          p("La plupart des adultes ont besoin de **7 à 9 heures** de sommeil. Le manuel de l’armée américaine insiste : un déficit de sommeil réduit les réflexes, la concentration, la prise de décision et la récupération musculaire — d’où des **erreurs et des accidents**."),
          ul("Horaires de coucher et de lever **réguliers**.", "Chambre **sombre, fraîche, calme**.", "Pas d’écran lumineux dans l’heure précédant le coucher.", "En déplacement prolongé, **profitez de chaque occasion de repos** (sieste courte de 20 à 30 minutes)."),
          kp("Alimentation variée et régulière ; petits apports fréquents pendant l’effort.", "Boire avant d’avoir soif ; urines claires = bon signe.", "7 à 9 heures de sommeil : un déficit augmente les erreurs.")
        ]
      },
      {
        id: "mental", titre: "Mental, stress et récupération", resume: "Respirer, cadrer son attention, rebondir.",
        b: [
          p("Le pilier mental regroupe les compétences qui permettent de **rester lucide sous pression** : gérer le stress, se concentrer, se fixer des objectifs, récupérer."),
          dia("fit-respiration", "Suivez le cercle : il grandit pendant l’inspiration, se resserre pendant l’expiration."),
          h("Respiration pour se calmer"),
          steps(["Inspirer", "Par le nez, pendant 4 secondes."], ["Marquer une pause", "Quelques secondes si c’est confortable."], ["Expirer lentement", "Par la bouche, pendant 6 secondes."], ["Répéter", "Pendant une à deux minutes. La respiration lente apaise le système nerveux."]),
          h("Autres outils"),
          ul("**Objectifs** : un grand but et des petites étapes, concrets et mesurables.", "**Dialogue intérieur** : remplacez « je n’y arriverai pas » par « une étape à la fois ».", "**Visualisation** : imaginez le parcours, les difficultés et vos réponses.", "**Esprit d’équipe** : parlez de vos difficultés, partagez la charge."),
          note("Un stress durable, un moral en baisse, des troubles du sommeil ou un sentiment de détresse **ne se gèrent pas seul** : parlez-en à un proche ou à un professionnel de santé. Il n’y a aucune faiblesse à demander de l’aide. En France, le **3114** (numéro national de prévention du suicide) est joignable 24 h/24.", "Demander de l’aide"),
          kp("Respiration lente : 4 secondes d’inspiration, 6 d’expiration.", "Fixer des objectifs concrets, étape par étape.", "Un mal-être durable se partage : proche, médecin ou 3114.")
        ]
      }
    ],
    quiz: [
      { q: "Combien de piliers comptent la santé et la forme globales selon le FM 7-22 ?", o: ["Deux", "Trois", "Cinq", "Dix"], a: 2, e: "Physique, nutrition, sommeil, mental, sens et valeurs." },
      { q: "De combien augmente-t-on au maximum la charge ou la durée d’une semaine à l’autre ?", o: ["Jusqu’à 50 %", "Environ 10 %", "Aucune limite", "100 %"], a: 1, e: "Une progression d’environ 10 % par semaine limite le risque de blessure de surcharge." },
      { q: "Que recommande l’OMS pour un adulte ?", o: ["30 minutes de sport par mois", "Au moins 150 minutes d’endurance modérée par semaine, plus deux séances de renforcement", "Une heure par jour d’activité intense", "Seulement du renforcement"], a: 1, e: "150 minutes d’endurance modérée et deux séances de renforcement musculaire par semaine, c’est le minimum de santé." },
      { q: "Quelle est la bonne conduite devant une zone chaude au pied pendant la marche ?", o: ["Continuer pour finir l’étape", "S’arrêter et protéger la zone tout de suite", "Retirer la chaussure et marcher pieds nus", "Boire plus"], a: 1, e: "Une zone chaude se protège immédiatement : elle évite l’ampoule et une semaine de souffrance." },
      { q: "Combien d’heures de sommeil la plupart des adultes ont-ils besoin ?", o: ["4 à 5 heures", "7 à 9 heures", "10 à 12 heures", "Cela ne change rien"], a: 1, e: "Un déficit de sommeil réduit les réflexes, la concentration et la récupération." },
      { q: "Où place-t-on la charge la plus lourde dans un sac ?", o: ["En bas, loin du dos", "Près du dos, en haut et au milieu", "Sur les côtés", "Peu importe"], a: 1, e: "Une charge proche du dos et à hauteur d’épaules rapproche le centre de gravité et fatigue moins." },
      { q: "En cas de stress ou de mal-être durable, que faire ?", o: ["Attendre que ça passe seul", "En parler à un proche ou un professionnel (3114 en cas de détresse)", "Cacher ses émotions", "Éviter tout contact"], a: 1, e: "Demander de l’aide est un réflexe de santé. Le 3114 est joignable 24 h/24 en France." }
    ]
  });
})();
