/* Module : Froid, neige et montagne */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "froid", titre: "Froid, neige et montagne", court: "Froid",
    desc: "Rester au chaud et en sécurité en hiver et en altitude : règle COLD, système des trois couches, hypothermie, gelures, risque d’avalanche, altitude et orages. D’après les manuels américains de survie par temps froid (TC 21-3) et d’alpinisme militaire (TC 3-97.61).",
    outils: ["soleil", "checklists", "alerte"],
    sources: ["tc-21-3", "tc-3-97-61", "atp-3-50-21"],
    chapitres: [
      {
        id: "cold", titre: "La règle COLD", resume: "Propre, éviter la surchauffe, ample et en couches, sec : le réflexe de tout hivernant.",
        b: [
          p("Le manuel américain TC 21-3 résume la gestion de la chaleur corporelle par un acronyme anglais : **COLD** (« froid »). Il s’applique à toute sortie hivernale."),
          dia("cold-cold", "Quatre réflexes : propre, éviter la surchauffe, ample en couches, sec."),
          table(["Lettre", "Anglais", "Français", "Pourquoi ?"], ["C", "Clean", "Propre", "Saleté et sueur colmatent les fibres et réduisent l’isolation"], ["O", "Overheating", "Éviter la surchauffe", "Retirez une couche avant de transpirer : la sueur refroidit ensuite"], ["L", "Loose, layers", "Ample, en couches", "L’air emprisonné isole ; un vêtement trop serré comprime l’isolant et gêne la circulation"], ["D", "Dry", "Sec", "L’eau conduit la chaleur environ 25 fois plus vite que l’air : un vêtement mouillé vous refroidit très vite"]),
          note("**Ne transpirez pas** : en effort, ouvrez les fermetures, retirez la couche d’isolation, ralentissez. Ajoutez-la dès l’arrêt, avant d’avoir froid.", "Le réflexe clé"),
          kp("COLD : propre, éviter la surchauffe, ample et en couches, sec.", "Ne pas transpirer : ouvrir ou retirer une couche à l’effort.", "Remettre une couche dès l’arrêt, avant d’avoir froid.")
        ]
      },
      {
        id: "couches", titre: "Le système des trois couches", resume: "Base, isolation, protection : la bonne combinaison de vêtements.",
        b: [
          dia("cold-couches", "La sueur est évacuée vers l’extérieur par la couche de base et l’isolation ; la coque coupe le vent et la pluie."),
          steps(["Couche de base", "Contre la peau : tissu synthétique ou laine mérinos qui évacue la sueur. **Jamais de coton**, qui retient l’humidité."], ["Couche d’isolation", "Polaire, veste synthétique ou duvet. Elle emprisonne l’air chaud. On en ajoute ou on en retire selon l’effort."], ["Couche de protection (coque)", "Veste et pantalon coupe-vent et imperméables, respirants si possible. Elle protège de la pluie, de la neige et du vent."]),
          h("Les extrémités"),
          ul("**Tête** : bonnet ou cagoule. On perd beaucoup de chaleur par la tête lorsqu’elle est découverte.", "**Mains** : sous-gants fins plus moufles imperméables. Les moufles réchauffent mieux que les gants.", "**Pieds** : chaussures isolées, chaussettes de laine **sèches** ; une paire de rechange dans le sac.", "**Visage** : cache-cou ou masque en cas de vent."),
          tip("Gardez une **veste d’isolation de rechange** (plus ample) dans le sac pour les arrêts et les imprévus.", "Rechange"),
          kp("Trois couches : base, isolation, protection. Jamais de coton.", "Mains, pieds et tête : prévoir des rechanges et de l’isolation.", "Ajouter ou retirer de l’isolation selon l’effort.")
        ]
      },
      {
        id: "hypothermie", titre: "Hypothermie", resume: "Reconnaître le refroidissement du corps, agir tôt.",
        b: [
          p("L’**hypothermie** est une baisse de la température centrale du corps (au-dessous de **35 °C**). Elle survient en environnement froid, **mouillé** ou venteux — pas seulement en hiver. Elle est insidieuse : la personne atteinte perd d’abord le jugement et ne s’en rend pas compte."),
          table(["Stade", "Signes", "Conduite"], ["**Léger**", "Frissons intenses, mains maladroites, lenteur, parole confuse", "Abriter, retirer les vêtements mouillés, couvrir, boisson chaude sucrée si conscient, effort léger"], ["**Modéré**", "Frissons qui diminuent ou cessent, confusion, somnolence, démarche titubante", "Alerter (112), manipuler avec douceur, isoler du sol, couvrir complètement, ne pas faire marcher"], ["**Sévère**", "Inconscience, respiration lente, pouls difficile à trouver", "Alerter (112) tout de suite, manipuler très doucement, réanimation si arrêt, isolation maximale"]),
          h("Dans l’attente des secours"),
          steps(["Abriter", "Du vent, de la pluie, du sol froid."], ["Isoler du sol", "Tapis, sac, branchages."], ["Sécher", "Retirez les vêtements mouillés, **sans exposer** la personne au vent."], ["Envelopper", "Duvet, couvertures, couverture de survie. Couvrez la tête."], ["Réchauffer doucement", "Boisson chaude sucrée si elle est consciente et peut avaler. Pas d’alcool."]),
          danger("Une personne en hypothermie modérée ou sévère doit être manipulée **avec douceur** : les mouvements brusques peuvent déclencher un trouble du rythme cardiaque. **Pas de frictions, pas d’alcool, pas de bain chaud.** Appelez le **112**.", "À ne pas faire"),
          kp("Hypothermie : température centrale sous 35 °C ; elle commence par la confusion.", "Abriter, isoler du sol, sécher, envelopper, réchauffer doucement.", "Hypothermie modérée ou sévère : 112, manipulation douce.")
        ]
      },
      {
        id: "gelures", titre: "Gelures, engelures et cécité des neiges", resume: "Les autres blessures du froid et de la lumière.",
        b: [
          h("Gelures"),
          p("Les **gelures** surviennent quand les tissus (doigts, orteils, nez, oreilles) **gèlent**. Elles commencent par un engourdissement, une peau blanche ou grisâtre, froide et dure. La zone devient insensible : on ne sent plus rien, ce qui est trompeur."),
          ul("**Mettre à l’abri** et au sec, retirer bagues et vêtements serrés.", "**Réchauffer** avec la chaleur du corps (mains sous les aisselles) **sans frotter**.", "**Ne réchauffez pas** si le risque de regel existe : mieux vaut attendre le refuge.", "**Évacuer** vers un médecin : une gelure peut évoluer en perte de tissu."),
          warn("Ne frottez **jamais** une zone gelée avec de la neige : cela abîme la peau. N’exposez pas à une source de chaleur directe (feu, radiateur) : la zone insensible peut brûler.", "Erreurs fréquentes"),
          h("Engelures"),
          p("Les **engelures** sont une atteinte plus légère, due au froid humide : rougeurs, démangeaisons, douleurs. Elles se soignent par un réchauffement progressif au sec et au chaud."),
          h("Cécité des neiges"),
          p("Le soleil réfléchi par la neige brûle la **cornée** : yeux rouges, douloureux, sensation de sable, larmoiement. Elle apparaît quelques heures après l’exposition. **Prévention** : lunettes de soleil de catégorie 3 ou 4 avec protection latérale. En l’absence de lunettes, une fente taillée dans un carton réduit l’éblouissement. **Traitement** : repos dans l’obscurité, compresses froides, consultation."),
          kp("Gelure : zone blanche, dure, insensible. Réchauffer sans frotter.", "Pas de neige, pas de chaleur directe, évacuer.", "Cécité des neiges : lunettes catégorie 3 ou 4 avec protection latérale.")
        ]
      },
      {
        id: "avalanche", titre: "Neige et avalanche", resume: "Lire le bulletin, s’équiper, savoir que faire : un module de sensibilisation.",
        b: [
          danger("**La neige et l’avalanche ne s’improvisent pas.** Ce chapitre est de la **sensibilisation**. Hors piste et en montagne enneigée, **suivez une formation** (clubs alpins, ENSA, guides de haute montagne) et **faites-vous accompagner** par un professionnel tant que vous n’avez pas acquis l’expérience.", "Se former"),
          h("Le bulletin d’estimation du risque d’avalanche (BERA)"),
          p("Météo-France publie, pour chaque massif, un bulletin qui évalue le risque sur une échelle de **1 à 5** :"),
          table(["Niveau", "Risque", "Lecture"], ["1", "Faible", "Manteau neigeux bien stabilisé"], ["2", "Limité", "Quelques pentes raides concernées"], ["3", "Marqué", "Plusieurs pentes concernées : le plus d’accidents surviennent à ce niveau"], ["4", "Fort", "Nombreuses pentes concernées, déclenchements spontanés"], ["5", "Très fort", "Avalanches spontanées nombreuses : se tenir à l’écart"]),
          note("**Consultez le bulletin avant chaque sortie** et renoncez si la pente prévue est dans les conditions signalées dangereuses. La plupart des accidents sont **déclenchés par les victimes ou par leur groupe**.", "Avant de partir"),
          h("Le matériel de sécurité (« trio »)"),
          ul("**DVA** (détecteur de victimes d’avalanche) : émet et reçoit.", "**Pelle**.", "**Sonde**."),
          p("Ce matériel n’a de sens que si **chaque membre du groupe sait s’en servir** (entraînement régulier). Beaucoup de stages de formation proposent des exercices de recherche."),
          h("Comportement en groupe"),
          ul("**Un par un** dans les pentes douteuses, les autres observent depuis un lieu sûr.", "Gardez des **distances** entre les personnes.", "**Évitez** les pentes de plus de 30°, les zones de corniches, les accumulations de neige soufflée, les terrains piégeux.", "En cas d’ensevelissement d’un membre : **alerter (112)**, rechercher avec le DVA **immédiatement**, car les premières minutes décident de la survie."),
          kp("Consulter le BERA avant chaque sortie : échelle de 1 à 5, danger maximum aux niveaux 3 à 5.", "DVA, pelle, sonde : et savoir s’en servir.", "Se former, partir accompagné, un par un dans les pentes douteuses.")
        ]
      },
      {
        id: "altitude-orage", titre: "Altitude et orages", resume: "Le mal des montagnes, la foudre et les réflexes de repli.",
        b: [
          h("Le mal aigu des montagnes (MAM)"),
          p("Au-delà de **2 500 m** environ, la baisse d’oxygène peut provoquer maux de tête, nausées, fatigue inhabituelle, vertiges, mauvais sommeil. C’est le **mal aigu des montagnes**."),
          ul("**Prévention** : monter progressivement, dormir plus bas que le point le plus haut atteint dans la journée, boire régulièrement.", "**Signes d’alerte** : maux de tête qui s’aggravent, difficulté à respirer au repos, confusion, perte de coordination.", "**Conduite** : arrêtez de monter, **redescendez** dès que les symptômes s’aggravent. La descente est le meilleur traitement."),
          h("Orages en montagne"),
          p("En été, les orages se forment souvent **l’après-midi**. Le meilleur moyen de les éviter : **partir tôt, redescendre tôt**. Surveillez les nuages qui se développent verticalement."),
          ul("**Quittez les crêtes, sommets, arêtes** et les points isolés.", "**Éloignez-vous** de l’eau et des objets métalliques (rails, câbles).", "**Accroupissez-vous** sur un sac isolant, pieds joints, en position basse, sans s’allonger. Dispersez-vous de quelques mètres au sein du groupe.", "**Ne vous abritez pas** sous un arbre isolé ni sous un surplomb peu profond.", "Comptez les secondes entre l’éclair et le tonnerre : **moins de 30 secondes**, l’orage est proche. Attendez 30 minutes après le dernier tonnerre avant de repartir."),
          warn("La **règle de prudence** : si la météo se dégrade, renoncez. Le sommet sera encore là la semaine prochaine ; ce n’est pas toujours le cas des alpinistes pressés.", "Savoir renoncer"),
          p("Planifiez vos horaires avec l’[outil Lever et coucher du soleil](#/outils/soleil), et préparez une alerte avec l’[outil Message d’alerte](#/outils/alerte)."),
          kp("Au-dessus de 2 500 m : monter progressivement, redescendre en cas d’aggravation.", "Orage : partir tôt, quitter les crêtes, ne pas se mettre sous un arbre isolé.", "Savoir renoncer fait partie de la compétence.")
        ]
      }
    ],
    quiz: [
      { q: "Que signifie la règle COLD ?", o: ["Calme, Orientation, Lumière, Données", "Propre, éviter la surchauffe, ample et en couches, sec", "Chaud, Optimal, Léger, Dense", "Couvrir, Observer, Lire, Décider"], a: 1, e: "COLD : Clean, Overheating, Loose layers, Dry." },
      { q: "Quelle matière évite-t-on pour la couche en contact avec la peau ?", o: ["La laine mérinos", "Le synthétique", "Le coton", "Le polypropylène"], a: 2, e: "Le coton retient l’humidité et refroidit le corps ; on lui préfère le synthétique ou la laine." },
      { q: "À quelle température centrale parle-t-on d’hypothermie ?", o: ["Sous 37 °C", "Sous 35 °C", "Sous 30 °C", "Sous 25 °C"], a: 1, e: "L’hypothermie est une température centrale inférieure à 35 °C." },
      { q: "Que ne faut-il surtout pas faire face à une hypothermie modérée ?", o: ["Isoler du sol", "Manipuler la personne avec douceur", "La frictionner ou lui donner de l’alcool", "Alerter le 112"], a: 2, e: "Frictions, alcool et bain chaud sont déconseillés : ils aggravent le risque de troubles du rythme cardiaque." },
      { q: "Que faut-il consulter avant une sortie en neige hors piste ?", o: ["Le BERA (bulletin d’estimation du risque d’avalanche)", "Le menu du refuge", "Le journal de la veille", "Rien"], a: 0, e: "Le BERA de Météo-France donne le risque par massif sur une échelle de 1 à 5." },
      { q: "Le « trio » de sécurité en avalanche comprend :", o: ["Casque, piolet, corde", "DVA, pelle, sonde", "Boussole, carte, GPS", "Radio, sifflet, miroir"], a: 1, e: "Le détecteur de victimes d’avalanche, la pelle et la sonde, et la formation pour les utiliser." },
      { q: "Quel est le meilleur traitement du mal aigu des montagnes aggravé ?", o: ["Monter plus haut", "Redescendre", "Courir", "Ne boire que du café"], a: 1, e: "La descente est le traitement le plus efficace dès que les symptômes s’aggravent." }
    ]
  });
})();
