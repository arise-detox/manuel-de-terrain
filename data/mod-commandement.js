/* Module : Commandement et planification */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "commandement", titre: "Commandement et planification", court: "Commandement",
    desc: "Décider, planifier, briefer, retirer les leçons : la boucle OODA, l’analyse METT-TC, les étapes de conduite d’une mission, l’ordre en cinq paragraphes et le retour d’expérience. Une méthode utile pour toute équipe : sortie en montagne, chantier, association, secours.",
    outils: ["ordre", "dtg", "checklists"],
    sources: ["mcrp-3-11-1a", "atp-3-21-8", "mcdp-1", "tc-3-21-75"],
    chapitres: [
      {
        id: "chef", titre: "Le rôle du chef", resume: "Ce que les manuels attendent d’un responsable d’équipe : être, savoir, agir.",
        b: [
          p("Un chef n’est pas celui qui donne le plus d’ordres, mais celui qui **crée les conditions pour que l’équipe réussisse et rentre en sécurité**. Les manuels américains résument le rôle par trois verbes : **être** (des valeurs, de la fiabilité), **savoir** (compétences, connaissance de ses gens), **agir** (décider, communiquer, assumer)."),
          h("Principes de conduite"),
          ul("**Connaître son métier** et chercher à progresser.", "**Connaître ses gens** : leurs forces, leurs limites, leur état du moment.", "**Prendre ses responsabilités** : décider, assumer les conséquences, ne pas reporter les erreurs.", "**Donner l’exemple** : exiger de soi ce que l’on exige des autres.", "**Tenir informés** : expliquer le pourquoi, pas seulement le quoi.", "**Faire des choix éclairés et opportuns** : décider avec l’information disponible plutôt que d’attendre la certitude."),
          h("L’intention du chef"),
          p("Le texte le plus important d’un ordre est l’**intention** : **pourquoi** on fait cela et **quel résultat** on veut. Si la situation change, chacun peut alors **adapter** sa conduite sans nouvel ordre, tout en poursuivant le même but. Les doctrines américaines parlent de « commandement par intention » : on dit ce qu’il faut atteindre, pas comment faire à chaque minute."),
          note("Exemple civil : « Nous allons au sommet pour 13 h, afin d’être redescendus avant l’orage de 16 h. » Si un passage bloque, l’équipe sait que **l’heure de retour** compte plus que le sommet.", "Intention et marge de manœuvre"),
          kp("Un chef crée les conditions de réussite et de retour en sécurité.", "Intention : pourquoi et quel résultat, pour permettre l’adaptation.", "On décide avec l’information disponible, sans attendre la certitude.")
        ]
      },
      {
        id: "ooda", titre: "La boucle OODA", resume: "Observer, s’orienter, décider, agir : décider plus vite qu’une situation ne change.",
        b: [
          p("Le colonel John Boyd, aviateur américain, a décrit la prise de décision sous pression comme une boucle en quatre temps : **Observer, S’orienter, Décider, Agir** (OODA en anglais). Elle est devenue une référence en doctrine militaire, mais aussi en sport, en gestion de crise et en entreprise."),
          dia("lead-ooda", "Une boucle, pas une ligne droite : chaque action modifie la situation et relance l’observation."),
          table(["Temps", "Question", "Exemple en randonnée"], ["**Observer**", "Que se passe-t-il ?", "Le ciel noircit à l’ouest, le vent tourne"], ["**S’orienter**", "Qu’est-ce que cela signifie ?", "Un orage approche, on est à 1 h de l’abri le plus proche"], ["**Décider**", "Quelle option choisir ?", "Redescendre par le sentier court plutôt que continuer"], ["**Agir**", "Exécuter, puis vérifier", "On part tout de suite, on regarde si la météo évolue"]),
          h("Ce que la boucle enseigne"),
          ul("**Raccourcir la boucle** : l’équipe qui décide et agit sur une situation avant qu’elle ait changé garde l’initiative.", "**S’orienter est l’étape clé** : c’est là que l’expérience, la formation et les préjugés pèsent. Une mauvaise orientation conduit à de mauvaises décisions, même avec de bonnes observations.", "**Rester ouvert** : quand les faits contredisent l’image que l’on s’en faisait, il faut changer d’avis rapidement."),
          kp("OODA : observer, s’orienter, décider, agir, puis recommencer.", "Gagner du temps : agir avant que la situation ait changé.", "S’orienter est l’étape la plus décisive.")
        ]
      },
      {
        id: "mett", titre: "Analyser une situation : METT-TC", resume: "Six facteurs à examiner avant de planifier.",
        b: [
          p("Avant de décider, il faut avoir regardé la situation sous tous ses angles. Les doctrines américaines utilisent l’acronyme **METT-TC**, un pense-bête pour ne rien oublier."),
          dia("lead-mett", "Six facteurs : la mission d’abord, puis tout ce qui la favorise ou la contrarie."),
          table(["Lettre", "Facteur", "Questions"], ["M", "Mission", "Que doit-on accomplir et pourquoi ?"], ["E", "Adversaire ou menace", "Quels dangers : météo, terrain, fatigue, autres personnes ?"], ["T", "Terrain et météo", "Relief, accès, visibilité, température, vent, orages ?"], ["T", "Troupes et moyens", "Qui compose l’équipe, quel niveau, quel matériel ?"], ["T", "Temps", "Quelles heures, quelle durée, combien de lumière ?"], ["C", "Considérations civiles", "Propriétaires, règles locales, autres usagers, riverains ?"]),
          tip("Avant de partir en montagne : la **mission** (but), les **risques** (météo, difficultés), le **terrain** (carte, dénivelé), l’**équipe** (niveau, matériel), le **temps** (horaires, nuit) et les **autres** (réserve naturelle, chasse). Le résultat tient sur une feuille.", "Version randonnée"),
          kp("METT-TC : Mission, Menace, Terrain, Troupes, Temps, Considérations civiles.", "Analyser avant de planifier : une feuille suffit.", "La mission passe toujours en premier.")
        ]
      },
      {
        id: "planification", titre: "Conduire une mission en huit étapes", resume: "De la réception de la mission à la supervision : un cadre pour ne rien oublier.",
        b: [
          p("Les manuels de commandement découpent la préparation d’une mission en huit étapes. Elles se déroulent en parallèle, mais respectent un ordre logique. L’idée directrice : **employer au mieux le temps disponible** et en laisser les deux tiers aux équipes qui exécutent."),
          dia("lead-tlp", "Les huit étapes de la conduite d’une mission, de la réception de la mission à l’ajustement."),
          steps(["Recevoir la mission", "Comprenez ce qui est demandé. Reformulez la mission, notez les contraintes de temps."], ["Émettre un ordre préparatoire", "Prévenez l’équipe : mission, calendrier, préparatifs à lancer."], ["Établir un plan provisoire", "Analysez la situation (METT-TC) et esquissez une manière de faire."], ["Lancer les préparatifs", "Vérifiez le matériel, répartissez les tâches, répétez."], ["Reconnaître", "Allez vérifier sur la carte, au sol ou par des appels : l’information remplace l’hypothèse."], ["Finaliser le plan", "Corrigez le plan avec ce que vous avez appris."], ["Donner l’ordre", "Briefez en cinq paragraphes, vérifiez que tout le monde a compris."], ["Superviser et ajuster", "Contrôlez, répétez, adaptez. C’est l’étape qui fait vraiment réussir."]),
          note("Quand le temps manque, **ne sautez pas** d’étapes : réduisez chacune. Une demi-heure suffit pour reconnaître, planifier et briefer une sortie simple.", "Peu de temps"),
          kp("Huit étapes, du plan provisoire à la supervision.", "Reconnaître avant de finaliser : l’information remplace l’hypothèse.", "Superviser et ajuster : c’est là que le plan se confronte au réel.")
        ]
      },
      {
        id: "ordre", titre: "L’ordre en cinq paragraphes", resume: "Situation, Mission, Exécution, Soutien, Commandement : un briefing structuré.",
        b: [
          p("Pour qu’un brief soit complet et facile à suivre, les armées utilisent un format fixe en cinq paragraphes (en français : **SMESC**). Il convient à tout groupe : sortie en montagne, chantier, bénévoles, événement."),
          dia("lead-smesc", "Cinq paragraphes, toujours dans le même ordre : chacun sait où trouver l’information."),
          table(["Paragraphe", "Contenu", "Exemple (sortie)"], ["**1. Situation**", "Contexte : météo, terrain, autres acteurs, l’état de l’équipe", "Beau temps jusqu’à 15 h, orage possible ensuite, sentier balisé"], ["**2. Mission**", "Ce que l’on fait, qui, quand, où, pourquoi, en une phrase", "Aujourd’hui, nous montons au refuge pour 13 h afin de redescendre avant 16 h"], ["**3. Exécution**", "Intention, concept, tâches de chacun, consignes de coordination", "Équipe en file, Léa ouvre, Karim ferme, pause à 11 h, repli par le col si orage"], ["**4. Soutien**", "Vivres, eau, matériel, soins, évacuation", "Deux litres chacun, trousse dans le sac de Léa, voiture à 17 h"], ["**5. Commandement et transmissions**", "Qui commande, comment on se parle, signaux, plan PACE", "Marie dirige, canal 3 en PMR, appel toutes les 2 h, sifflet en urgence"]),
          p("Servez-vous de l’[outil Ordre en cinq paragraphes](#/outils/ordre) pour préparer votre propre briefing, puis imprimez ou envoyez-le à l’équipe."),
          h("Bien briefer"),
          ul("**Commencer par l’essentiel** : mission et intention en premier.", "**Parler simplement** : pas de jargon inutile.", "**Faire répéter** : « Qu’as-tu retenu ? ». C’est la seule façon de savoir si le message est passé.", "**Inviter aux questions** avant de partir, pas après."),
          kp("SMESC : Situation, Mission, Exécution, Soutien, Commandement.", "Mission et intention d’abord, détails ensuite.", "Faire répéter pour s’assurer que le message est compris.")
        ]
      },
      {
        id: "retex", titre: "Le retour d’expérience", resume: "Apprendre de chaque sortie : l’After Action Review en quatre questions.",
        b: [
          p("Ce qui distingue les équipes qui progressent : elles **tirent des leçons de chaque sortie**, bonne ou mauvaise. L’armée américaine pratique pour cela l’**After Action Review** (AAR), traduit en français « retour d’expérience » (RETEX)."),
          dia("lead-retex", "Quatre questions, dans cet ordre. La dernière produit des décisions."),
          steps(["Qu’avait-on prévu ?", "Rappelez la mission et le plan."], ["Que s’est-il réellement passé ?", "Les faits, sans jugement : chronologie, observations de chacun."], ["Pourquoi cet écart ?", "Causes : matériel, décisions, météo, information, fatigue."], ["Que garde-t-on, que change-t-on ?", "Deux ou trois décisions concrètes pour la prochaine fois : un nouvel horaire, un matériel, une règle."]),
          note("Le RETEX n’est **pas un procès**. On cherche à comprendre ce qui s’est passé, pas à désigner un coupable. Chacun parle, y compris le plus jeune, et le chef parle en dernier.", "Esprit du RETEX"),
          tip("Notez en quelques lignes les leçons et rangez-les avec votre checklist de sortie. C’est le meilleur moyen de ne pas refaire la même erreur.", "Garder une trace"),
          kp("Quatre questions : prévu, réel, pourquoi, que change-t-on.", "Pas de procès : comprendre, pas condamner.", "Écrire les leçons pour ne pas les oublier.")
        ]
      }
    ],
    quiz: [
      { q: "Que signifie OODA ?", o: ["Organiser, Orienter, Décider, Attaquer", "Observer, S’orienter, Décider, Agir", "Ordre, Objectif, Délai, Action", "Observer, Obéir, Décider, Attendre"], a: 1, e: "La boucle de Boyd : observer, s’orienter, décider, agir, puis recommencer." },
      { q: "Quel est le texte le plus important d’un ordre, selon la doctrine du « commandement par intention » ?", o: ["La liste du matériel", "L’intention : pourquoi et quel résultat", "L’horaire détaillé", "Le nom du chef"], a: 1, e: "L’intention permet à chacun d’adapter sa conduite si la situation change, sans nouvel ordre." },
      { q: "Que représente le premier T de METT-TC ?", o: ["Temps", "Terrain et météo", "Troupes et moyens", "Transmissions"], a: 1, e: "METT-TC : Mission, Menace (ennemi), Terrain et météo, Troupes et moyens, Temps, Considérations civiles." },
      { q: "Que contient le deuxième paragraphe de l’ordre en cinq paragraphes ?", o: ["La Situation", "La Mission", "L’Exécution", "Le Soutien"], a: 1, e: "SMESC : 1 Situation, 2 Mission, 3 Exécution, 4 Soutien, 5 Commandement." },
      { q: "Quel est le meilleur moyen de vérifier qu’un briefing est compris ?", o: ["Le répéter plus fort", "Faire répéter aux participants", "Le distribuer par écrit seulement", "Attendre qu’ils posent des questions"], a: 1, e: "Faire reformuler montre ce qui est vraiment passé et ce qui doit être précisé." },
      { q: "Quelle est la finalité d’un retour d’expérience (RETEX) ?", o: ["Désigner un responsable", "Apprendre de l’expérience pour mieux faire la fois suivante", "Rédiger un rapport pour les archives", "Justifier les décisions du chef"], a: 1, e: "Un RETEX cherche à comprendre et à progresser, pas à juger." },
      { q: "À quoi sert l’étape « reconnaître » dans la conduite d’une mission ?", o: ["À perdre du temps", "À vérifier l’information avant de finaliser le plan", "À remplacer le brief", "À éviter de décider"], a: 1, e: "Aller voir au sol ou vérifier l’information remplace les hypothèses par des faits." }
    ]
  });
})();
