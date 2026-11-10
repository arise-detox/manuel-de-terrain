/* Glossaire anglais → français. Format : [français, anglais, définition]. */
(function () {
  function g(m, rows) { MT.gl(rows.map(function (r) { return { fr: r[0], en: r[1], def: r[2], m: m }; })); }

  g("navigation", [
    ["azimut", "azimuth", "Angle horizontal mesuré depuis le nord, dans le sens des aiguilles d’une montre, de 0° à 360°."],
    ["azimut inverse", "back azimuth", "Direction exactement opposée : azimut + 180° (ou − 180° si le résultat dépasse 360°)."],
    ["gisement", "grid azimuth", "Angle mesuré depuis le nord de la grille (quadrillage) de la carte, et non depuis le nord magnétique."],
    ["déclinaison magnétique", "magnetic declination", "Écart entre le nord géographique et le nord magnétique ; varie selon le lieu et l’année."],
    ["convergence des méridiens", "grid convergence", "Écart entre le nord géographique et le nord de la grille."],
    ["nord magnétique", "magnetic north", "Direction vers laquelle pointe l’aiguille d’une boussole."],
    ["courbe de niveau", "contour line", "Ligne qui relie tous les points situés à la même altitude."],
    ["équidistance", "contour interval", "Différence d’altitude entre deux courbes de niveau consécutives."],
    ["échelle", "map scale", "Rapport entre une longueur sur la carte et la longueur réelle (1 : 25 000 : 1 cm = 250 m)."],
    ["coordonnées de grille", "grid coordinates", "Référence chiffrée d’un point sur le quadrillage : on lit d’abord vers l’Est, puis vers le Nord."],
    ["millième OTAN", "mil", "Unité d’angle : 1/6 400 de tour. À 1 000 m, 1 millième couvre environ 1 m."],
    ["grade", "gradian", "Unité d’angle : 1/400 de tour (un angle droit vaut 100 grades)."],
    ["ligne d’appui", "handrail", "Élément linéaire (rivière, crête, lisière, chemin) que l’on longe pour se guider."],
    ["point d’attaque", "attack point", "Repère facile à identifier, d’où l’on rejoint un objectif plus difficile à trouver."],
    ["point d’arrêt", "catching feature", "Élément qui signale qu’on est allé trop loin (route, rivière, falaise)."],
    ["relèvement", "resection", "Déterminer sa propre position en visant deux repères connus, puis en reportant les azimuts inverses."],
    ["intersection", "intersection", "Localiser un objet inconnu à partir des azimuts mesurés depuis deux positions connues."],
    ["estime", "dead reckoning", "Estimer sa position à partir d’un cap, d’une distance parcourue et du temps écoulé."],
    ["pas double", "pace", "Deux pas (un de chaque pied) : unité de mesure de distance, à étalonner sur 100 m."],
    ["orienter la carte", "to orient the map", "Faire coïncider le nord de la carte avec le nord réel pour que la carte ressemble au paysage."],
    ["éperon", "spur", "Relief qui avance depuis une crête ; ses courbes de niveau pointent vers l’aval."],
    ["col", "saddle", "Point bas d’une crête, entre deux sommets."],
    ["vallon", "draw", "Petite vallée peu marquée ; ses courbes de niveau forment des « V » peu profonds vers l’amont."],
    ["dépression", "depression", "Cuvette fermée ; sur la carte, des hachures sont tracées vers l’intérieur des courbes."]
  ]);

  g("survie", [
    ["règle des trois", "rule of threes", "Repères de survie : 3 minutes sans air, 3 heures sans abri, 3 jours sans eau, 3 semaines sans nourriture."],
    ["abri adossé", "lean-to", "Abri à un seul pan, ouvert d’un côté (face au feu), fermé dos au vent."],
    ["amadou", "tinder", "Matière très fine et très sèche, qui prend avec une simple étincelle (fibres, écorce râpée, coton)."],
    ["petit bois", "kindling", "Brindilles de la taille d’un crayon, qui relaient l’amadou avant le bois plus gros."],
    ["déshydratation", "dehydration", "Manque d’eau dans l’organisme : soif, urine foncée, maux de tête, fatigue, confusion."],
    ["hypothermie", "hypothermia", "Baisse de la température centrale du corps sous 35 °C, due au froid, à l’humidité ou au vent."],
    ["coup de chaleur", "heat stroke", "Urgence vitale : température corporelle très élevée, peau chaude, confusion. Refroidir et appeler le 112."],
    ["signal sol-air", "ground-to-air signal", "Symboles de grande taille posés au sol pour être vus d’un aéronef (V, X, N, Y, flèche)."],
    ["SERE", "SERE", "Survival, Evasion, Resistance, Escape : formation militaire à la survie, à l’évasion, à la résistance et à l’échappée."],
    ["purification de l’eau", "water purification", "Rendre l’eau potable : filtrer, puis faire bouillir ou traiter chimiquement."],
    ["bivouac", "bivouac", "Campement léger et provisoire, sans installation fixe."],
    ["litière isolante", "insulating bedding", "Couche de matériaux secs sous le corps pour couper le froid du sol."]
  ]);

  g("secours", [
    ["hémorragie massive", "massive hemorrhage", "Saignement abondant d’un membre ou du tronc, qui menace la vie en quelques minutes."],
    ["garrot tourniquet", "tourniquet", "Dispositif qui comprime un membre pour arrêter un saignement qui ne cède pas à la compression directe."],
    ["pansement hémostatique", "hemostatic dressing", "Compresse imprégnée d’un agent qui favorise la coagulation, utilisée pour tamponner une plaie."],
    ["tamponnement", "wound packing", "Remplir la plaie de compresses puis comprimer fermement et longtemps."],
    ["position latérale de sécurité", "recovery position", "Position sur le côté qui maintient les voies aériennes dégagées chez une victime inconsciente qui respire."],
    ["TCCC", "Tactical Combat Casualty Care", "Soins tactiques aux blessés de combat : prise en charge adaptée à un environnement dangereux."],
    ["MARCH", "MARCH", "Séquence de soins : hémorragie Massive, voies Aériennes, Respiration, Circulation, Hypothermie/tête."],
    ["pansement occlusif", "chest seal", "Pansement étanche posé sur une plaie du thorax pour éviter l’entrée d’air."],
    ["état de choc", "shock", "Défaillance de la circulation : pâleur, sueurs, pouls rapide, confusion. Allonger, couvrir, alerter."],
    ["évacuation sanitaire", "MEDEVAC", "Transport médicalisé d’un blessé vers une structure de soins ; demandée par un message de neuf lignes."],
    ["blessé", "casualty", "Personne blessée ou malade nécessitant des soins."],
    ["triage", "triage", "Classer les victimes par urgence pour traiter d’abord celles qui peuvent être sauvées par un geste rapide."],
    ["échelle AVPU", "AVPU", "Alerte, réponse à la Voix, réponse à la Douleur, Inconscient : évaluation simple du niveau de conscience."],
    ["réanimation cardio-pulmonaire", "CPR", "Compressions thoraciques et insufflations pour entretenir la circulation lors d’un arrêt cardiaque."],
    ["défibrillateur automatisé externe", "AED", "Appareil qui analyse le rythme du cœur et délivre un choc si nécessaire, guidé par la voix."],
    ["soins sous menace", "care under fire", "Phase de soins où le danger persiste : se mettre à l’abri, stopper l’hémorragie vitale, rien de plus."]
  ]);

  g("transmissions", [
    ["alphabet phonétique", "phonetic alphabet", "Mots standardisés (Alfa, Bravo, Charlie…) pour épeler sans confusion."],
    ["procédure radio", "voice procedure", "Règles de langage et de discipline pour des échanges clairs et courts."],
    ["indicatif", "call sign", "Nom court qui identifie une station ou une équipe à la radio."],
    ["reçu", "roger", "Prononcé pour signaler : « message reçu et compris »."],
    ["répétez", "say again", "Demande de répéter tout ou partie du dernier message."],
    ["à vous", "over", "Fin de message : j’attends votre réponse."],
    ["terminé", "out", "Fin d’échange : je n’attends pas de réponse."],
    ["plan PACE", "PACE plan", "Quatre moyens de communication classés : Principal, Alternatif, Contingence, Urgence."],
    ["vue directe", "line of sight", "Propagation en ligne droite des ondes VHF/UHF, bloquée par le relief."],
    ["relais", "relay", "Station placée en point haut pour retransmettre entre deux stations qui ne se voient pas."],
    ["canal", "channel", "Fréquence prédéfinie sur laquelle deux postes se parlent."],
    ["silencieux (squelch)", "squelch", "Réglage qui coupe le bruit de fond quand aucun signal n’est reçu."],
    ["essai radio", "radio check", "Échange destiné à vérifier la portée et la qualité d’une liaison."]
  ]);

  g("commandement", [
    ["intention du chef", "commander’s intent", "Pourquoi on agit et quel résultat on veut : elle permet d’improviser sans trahir l’objectif."],
    ["ordre d’opérations", "operation order (OPORD)", "Ordre structuré en cinq paragraphes : situation, mission, exécution, soutien, commandement."],
    ["ordre préparatoire", "warning order (WARNO)", "Message court, donné tôt, pour que l’équipe commence à se préparer."],
    ["analyse de situation", "METT-TC", "Mission, Ennemi/menace, Terrain et météo, Troupes et moyens, Temps, Considérations civiles."],
    ["boucle OODA", "OODA loop", "Observer, s’orienter, décider, agir : cycle de décision (J. Boyd)."],
    ["compte rendu", "report / SITREP", "Message bref qui informe le chef : qui, où, quoi, quand, besoins."],
    ["retour d’expérience", "after action review (AAR)", "Bilan collectif : ce qui était prévu, ce qui s’est passé, pourquoi, et quoi améliorer."],
    ["chef d’équipe", "team leader", "Responsable d’un petit groupe : décide, donne l’exemple, rend compte."],
    ["état final recherché", "end state", "Situation que l’on veut atteindre au terme de l’opération."],
    ["commandement par intention", "mission command", "Donner un objectif et de la liberté d’action plutôt que des consignes détaillées."],
    ["plan de repli", "contingency plan", "Solution prévue à l’avance si le plan principal échoue."],
    ["tâche", "task", "Action précise attribuée à une personne ou une équipe."]
  ]);

  g("deplacement", [
    ["colonne", "column", "Formation en file : rapide et discrète, mais peu de visibilité sur les côtés."],
    ["colonne décalée", "staggered column", "Deux files en quinconce : meilleur contrôle latéral, rythme soutenu."],
    ["coin", "wedge", "Formation en V : bon compromis entre contrôle et sûreté."],
    ["losange", "diamond", "Formation à quatre ou cinq membres offrant une surveillance dans toutes les directions."],
    ["ligne", "line", "Front large : bonne vision vers l’avant, mais lente et difficile à contrôler."],
    ["halte de sûreté", "security halt", "Arrêt durant lequel chacun surveille un secteur autour du groupe."],
    ["point de ralliement", "rally point", "Lieu connu de tous où se regrouper si le groupe est dispersé."],
    ["sûreté", "security", "Ensemble des mesures qui protègent un groupe contre la surprise."],
    ["patrouille", "patrol", "Déplacement organisé d’une petite équipe pour une mission définie (reconnaissance, liaison)."],
    ["signature", "signature", "Ce qui trahit une présence : forme, silhouette, ombre, brillance, mouvement, bruit, odeur, lumière."],
    ["dissimulation", "concealment", "Se soustraire aux regards (végétation, ombre, relief) ; à distinguer de la protection."],
    ["adaptation à l’obscurité", "dark adaptation", "Temps nécessaire à l’œil pour voir de nuit (une trentaine de minutes) ; détruite par une lumière blanche."],
    ["vision décalée", "off-center vision", "De nuit, regarder à côté d’un objet pour le percevoir avec la partie la plus sensible de l’œil."],
    ["itinéraire", "route", "Trajet choisi, avec points de passage et solutions de repli."]
  ]);

  g("doctrine", [
    ["friction", "friction", "Tout ce qui fait que ce qui est simple sur le papier devient difficile dans la réalité."],
    ["incertitude", "uncertainty", "Information toujours incomplète, souvent fausse : il faut décider sans certitude."],
    ["manœuvre", "maneuver warfare", "Approche qui cherche à surprendre et à rompre la cohésion plutôt qu’à détruire frontalement."],
    ["attrition", "attrition warfare", "Approche qui cherche à user l’adversaire par accumulation de pertes et de chocs."],
    ["point faible", "critical vulnerability", "Élément dont l’atteinte désorganise l’ensemble."],
    ["tempo", "tempo", "Rythme des actions : le plus rapide impose à l’autre de réagir."],
    ["effort principal", "main effort", "Action décisive à laquelle on consacre l’essentiel des moyens (Schwerpunkt, en allemand)."],
    ["initiative", "initiative", "Capacité d’agir sans attendre un ordre, dans le cadre de l’intention du chef."],
    ["dimension humaine", "human dimension", "Peur, fatigue, cohésion, courage : le facteur central dans toute action collective."],
    ["centre de gravité", "center of gravity", "Source de force dont dépend l’ensemble (notion de Clausewitz)."]
  ]);

  g("tir", [
    ["organes de visée", "sights", "Hausse et guidon (ou viseur) qui servent à diriger l’arme."],
    ["hausse", "rear sight", "Élément de visée situé à l’arrière : œilleton, cran de mire."],
    ["guidon", "front sight", "Élément de visée situé à l’avant, sur lequel l’œil fait la netteté."],
    ["alignement des organes de visée", "sight alignment", "Positionnement relatif correct du guidon dans la hausse."],
    ["image de visée", "sight picture", "Ce que l’on voit : organes de visée alignés, placés correctement sur la cible."],
    ["pression progressive", "trigger squeeze", "Appuyer sur la détente de façon régulière, sans à-coup, jusqu’au départ du coup."],
    ["pause respiratoire", "natural respiratory pause", "Bref arrêt naturel à la fin de l’expiration, pendant lequel on tire."],
    ["accompagnement", "follow-through", "Maintenir la position et la visée après le départ du coup."],
    ["groupement", "shot group", "Ensemble des impacts d’une série ; sa taille mesure la régularité du tireur."],
    ["réglage", "zeroing", "Ajuster les organes de visée pour que le centre du groupement coïncide avec le point visé."],
    ["tir à sec", "dry fire", "Entraînement sans munition, arme déchargée et vérifiée, pour travailler visée et détente."],
    ["position de tir", "firing position", "Posture stable : couché, assis, à genou, debout."]
  ]);

  g("forme", [
    ["surcharge progressive", "progressive overload", "Augmenter peu à peu l’effort pour provoquer l’adaptation sans se blesser."],
    ["spécificité", "specificity", "On progresse dans ce que l’on s’entraîne à faire : la marche avec charge se prépare en marchant chargé."],
    ["récupération", "recovery", "Temps de repos, de sommeil et d’alimentation pendant lequel le corps se renforce."],
    ["échauffement", "warm-up", "Préparation progressive du corps avant l’effort : chaleur, mobilité, activation."],
    ["endurance", "endurance", "Capacité à soutenir un effort prolongé."],
    ["mobilité", "mobility", "Amplitude utilisable des articulations."],
    ["hydratation", "hydration", "Apport régulier en eau avant, pendant et après l’effort."],
    ["H2F", "Holistic Health and Fitness", "Approche globale : physique, nutrition, sommeil, mental, dimension spirituelle (sens et valeurs)."],
    ["charge portée", "load carriage", "Poids transporté à pied ; sa répartition compte autant que sa valeur."],
    ["ampoule", "blister", "Décollement de la peau par frottement ; traiter dès le point chaud."],
    ["respiration carrée", "box breathing", "Inspirer, retenir, expirer, retenir, chacun sur quatre temps, pour apaiser le stress."],
    ["résilience", "resilience", "Capacité à encaisser un choc et à rebondir."]
  ]);

  g("froid", [
    ["COLD", "COLD", "Acronyme américain : Clean (propre), Overheating (éviter la surchauffe), Loose layers (ample, en couches), Dry (sec)."],
    ["système de trois couches", "layering system", "Couche de base, couche isolante, coque : on ajuste la protection en ajoutant ou retirant des couches."],
    ["gelure", "frostbite", "Lésion des tissus par le gel, surtout doigts, orteils, nez et oreilles."],
    ["mal aigu des montagnes", "altitude sickness", "Maux de tête, nausées et fatigue en altitude ; la seule vraie réponse est de descendre."],
    ["cécité des neiges", "snow blindness", "Inflammation douloureuse de l’œil causée par les UV réfléchis par la neige ; se prévient avec des lunettes adaptées."],
    ["avalanche", "avalanche", "Glissement brutal d’une masse de neige ; exige formation et matériel (DVA, pelle, sonde)."],
    ["DVA", "avalanche transceiver", "Détecteur de victimes d’avalanche, porté allumé par chaque membre du groupe."],
    ["BERA", "avalanche bulletin", "Bulletin d’estimation du risque d’avalanche publié par Météo-France (échelle de 1 à 5)."],
    ["intoxication au monoxyde de carbone", "carbon monoxide poisoning", "Danger d’un feu ou d’un réchaud dans un abri fermé : toujours ventiler."],
    ["trois points d’appui", "three points of contact", "En terrain raide, deux mains et un pied (ou l’inverse) restent en contact avant de bouger le quatrième membre."]
  ]);
})();
