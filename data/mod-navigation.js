/* Module : Navigation terrestre */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, ol = b.ol, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "navigation", titre: "Navigation terrestre", court: "Navigation",
    desc: "Lire une carte, utiliser une boussole, donner et suivre un azimut, se localiser, s’orienter sans instrument. La compétence de base de tout déplacement hors des sentiers.",
    outils: ["azimut", "pas", "echelle", "soleil"],
    sources: ["fm-3-25-26", "tc-3-21-75", "tc-3-21-76"],
    chapitres: [
      {
        id: "lire-la-carte", titre: "Lire une carte", resume: "Échelle, légende, courbes de niveau : comprendre le relief avant de marcher.",
        b: [
          p("Une carte est un modèle réduit du terrain vu de dessus. Avant de partir, lisez-la toujours dans le même ordre : **titre et date**, **échelle**, **légende**, **équidistance** des courbes, puis les **indications de nord** en marge. Une carte ancienne peut ignorer un chemin fermé ou une route nouvelle."),
          h("L’échelle"),
          p("L’échelle relie une longueur sur la carte à une longueur réelle. Plus le chiffre est petit, plus la carte est détaillée."),
          table(["Échelle", "1 cm sur la carte =", "4 cm =", "Usage courant"], ["1 : 10 000", "100 m", "400 m", "Plan détaillé, ville, secteur d’exercice"], ["1 : 25 000", "250 m", "1 km", "Randonnée, orientation : l’échelle de référence"], ["1 : 50 000", "500 m", "2 km", "Marche longue, vue d’ensemble d’un massif"], ["1 : 100 000", "1 km", "4 km", "Préparation d’itinéraires, déplacements en véhicule"]),
          tip("Sur une carte au 1 : 25 000, **4 cm = 1 km**. Mesurez avec le bord de la boussole, puis calculez, ou utilisez l’[outil Échelle et pente](#/outils/echelle)."),
          h("Couleurs et symboles"),
          p("La légende explique chaque symbole. Par convention, le **noir** désigne les constructions, routes et limites ; le **bleu** l’eau ; le **vert** la végétation ; le **brun** le relief (les courbes de niveau). Regardez surtout ce qui se voit de loin et de près : lignes électriques, lisières, ponts, croisements, clochers. Ce sont vos futurs repères."),
          h("Le relief : les courbes de niveau"),
          p("Une courbe de niveau relie tous les points situés à la même altitude. L’**équidistance** est la différence d’altitude entre deux courbes voisines (5 ou 10 m sur la plupart des cartes de randonnée). Quelques règles suffisent pour « voir » le relief :"),
          ul("Des courbes **serrées** indiquent une pente **raide** ; des courbes **espacées**, une pente douce.", "Les courbes **maîtresses** (plus épaisses) portent une cote en mètres : repérez-les pour savoir si l’on monte ou descend.", "Des courbes **fermées** dessinent un sommet ou une dépression. Une dépression est marquée de petites hachures vers l’intérieur.", "Deux courbes ne se croisent jamais, sauf à une falaise ou un surplomb."),
          dia("nav-relief", "Les quatre formes de base. Dans une vallée, les courbes dessinent des « V » dont la pointe regarde l’amont ; sur un éperon, la pointe regarde l’aval. Si de l’eau coule, elle descend : un cours d’eau vous dit toujours où est le bas."),
          note("Une carte numérique (application, GPS) montre la même information, mais sa batterie et son écran sont fragiles. Gardez toujours une carte papier du secteur et une boussole : elles ne tombent jamais en panne.", "Papier ou numérique ?"),
          kp("Échelle, légende, équidistance, nord : lire dans cet ordre.", "1 : 25 000 → 4 cm = 1 km.", "Courbes serrées = pente raide ; courbes en « V » : vallée (pointe vers l’amont) ou éperon (pointe vers l’aval).", "L’eau descend : un ruisseau indique le bas du relief.")
        ]
      },
      {
        id: "coordonnees", titre: "Coordonnées et quadrillage", resume: "Donner sa position avec précision, en 4, 6 ou 8 chiffres, sans ambiguïté.",
        b: [
          p("Le quadrillage imprimé sur la carte permet de désigner n’importe quel point par des chiffres. Les lignes verticales sont numérotées d’Ouest en Est (**X**, abscisse) et les lignes horizontales du Sud au Nord (**Y**, ordonnée)."),
          dia("nav-coord", "On lit toujours X avant Y : d’abord vers la droite, puis vers le haut."),
          h("Lire une coordonnée"),
          steps(["Trouvez le carré", "Repérez la ligne verticale à gauche du point (X), puis la ligne horizontale en dessous (Y). Ensemble : référence à 4 chiffres, précise à 1 km."], ["Estimez le dixième", "Divisez mentalement le carré en 10 colonnes et 10 lignes. Ajoutez un chiffre à X, un chiffre à Y : référence à 6 chiffres, précise à 100 m."], ["Annoncez dans l’ordre", "X d’abord, Y ensuite, chiffre par chiffre : « trois, trois, six, sept, quatre, quatre ». Précisez toujours la **carte** ou la **zone** concernée."]),
          h("Les systèmes que vous croiserez"),
          table(["Système", "Où le trouve-t-on", "À savoir"], ["Lambert-93 (RGF93)", "Cartes IGN récentes, données françaises", "Grille en kilomètres, propre à la France"], ["UTM / MGRS", "Cartes militaires OTAN, cartes internationales", "La France métropolitaine couvre les fuseaux 30, 31 et 32 ; les références MGRS commencent par le fuseau et la bande (ex. 31U)"], ["Latitude / longitude (WGS84)", "GPS, téléphones, applications", "Se note en degrés décimaux (48,85 ; 2,35) ou en degrés-minutes-secondes"]),
          warn("Le plus gros piège : un GPS réglé sur un système ou un référentiel différent de celui de la carte. Vérifiez le système de coordonnées et le **datum** (WGS84 en général) avant de comparer une position GPS à une carte papier.", "Cohérence des systèmes"),
          p("Pour transmettre une position par radio ou téléphone, épelez les chiffres un par un et répétez-les. Entraînez-vous avec l’[alphabet phonétique](#/outils/phonetique)."),
          kp("Toujours X (vers la droite) puis Y (vers le haut).", "4 chiffres = 1 km ; 6 chiffres = 100 m ; 8 chiffres = 10 m.", "Vérifier que carte et GPS utilisent le même système et le même datum.")
        ]
      },
      {
        id: "boussole", titre: "Boussole et azimuts", resume: "Mesurer une direction sur la carte et sur le terrain, puis la suivre.",
        b: [
          p("Un **azimut** est l’angle entre le nord et la direction d’un objet, mesuré dans le sens des aiguilles d’une montre de 0° à 360°. Une boussole à plaque transparente, la plus courante, sert à le lire sur le terrain **et** sur la carte."),
          dia("nav-boussole", "Les éléments à connaître d’une boussole à plaque."),
          dia("nav-azimut", "Un azimut de 60° pointe vers l’est-nord-est. L’azimut inverse, pour revenir sur ses pas, est 240°."),
          h("Mesurer un azimut sur le terrain"),
          steps(["Visez le repère", "Tenez la boussole à plat devant vous, flèche de direction pointée vers l’objet."], ["Calez l’aiguille", "Tournez le limbe jusqu’à ce que la pointe rouge de l’aiguille tombe exactement dans la flèche d’orientation (la « niche »)."], ["Lisez", "L’azimut se lit sur le limbe, à l’index situé au bout de la flèche de direction."]),
          h("Mesurer un azimut sur la carte"),
          steps(["Posez le bord de la plaque", "Placez un bord de la plaque sur la ligne départ → arrivée, flèche de direction vers l’arrivée."], ["Alignez le limbe", "Tournez le limbe jusqu’à ce que les lignes d’orientation soient parallèles aux lignes nord-sud de la carte, N vers le haut."], ["Corrigez le nord", "Ajoutez ou retranchez la déclinaison (voir « Les trois nords »), puis lisez l’azimut à l’index."]),
          h("Suivre un azimut"),
          p("Affichez l’azimut sur le limbe, tournez-vous jusqu’à ce que l’aiguille rouge soit dans la niche, puis choisissez un **repère lointain** exactement dans l’axe (arbre, rocher, pylône). Marchez jusqu’à lui, sans regarder la boussole, puis recommencez. Cette méthode « de repère en repère » est bien plus précise que de marcher les yeux rivés sur l’aiguille."),
          warn("Éloignez la boussole des masses métalliques, aimants, câbles à haute tension, téléphone et véhicules : l’aiguille serait déviée. Tenez-la bien à plat, et vérifiez de temps en temps que la pointe rouge indique bien le nord.", "Perturbations"),
          kp("Azimut : 0 à 360°, depuis le nord, sens horaire.", "Azimut inverse = ± 180°.", "On marche de repère en repère, pas les yeux sur l’aiguille.", "Métal, aimants, câbles : sources d’erreur.")
        ]
      },
      {
        id: "nords", titre: "Les trois nords", resume: "Nord géographique, nord de la grille, nord magnétique : comment passer de l’un à l’autre.",
        b: [
          p("Une carte et une boussole ne désignent pas le même nord. La marge de la carte indique l’écart entre les trois, souvent par un petit schéma."),
          dia("nav-nords", "NG : nord géographique ; NL : nord de la grille (lignes du quadrillage) ; NM : nord magnétique (aiguille)."),
          ul("**Déclinaison** : angle entre NG et NM. Elle change avec le lieu et se modifie d’année en année.", "**Convergence** : angle entre NG et NL. Négligeable sur de courtes distances.", "Les angles sont comptés **positivement vers l’Est** et négativement vers l’Ouest."),
          h("Les formules"),
          table(["Pour passer de…", "…à…", "Opération"], ["Azimut magnétique", "Azimut géographique", "+ déclinaison"], ["Azimut géographique", "Gisement (grille)", "− convergence"], ["Gisement (grille)", "Azimut magnétique", "+ convergence − déclinaison"]),
          p("Exemple : une déclinaison de +2° (Est) et un azimut magnétique de 100° donnent un azimut géographique de 102°. Pour **reporter** sur la carte un azimut lu sur la boussole, on ajoute la déclinaison ; pour **afficher** sur la boussole un azimut pris sur la carte, on la retranche."),
          note("En France, la déclinaison ne dépasse en général que quelques degrés. Un degré d’erreur représente environ 17 m de décalage tous les 1 000 m. Sur 5 km, ne pas corriger peut vous faire passer à côté d’un point d’attaque : lisez la marge de votre carte et corrigez.", "Ordre de grandeur"),
          p("L’[outil Angles, azimuts et nords](#/outils/azimut) fait ces conversions pour vous, et convertit aussi degrés, grades et millièmes."),
          kp("NG, NL, NM : trois directions différentes.", "Est positif, Ouest négatif.", "1° d’erreur ≈ 17 m par kilomètre.")
        ]
      },
      {
        id: "se-localiser", titre: "Se localiser et suivre un itinéraire", resume: "Relèvement, estime, repères d’itinéraire : savoir où l’on est et où l’on va.",
        b: [
          p("Naviguer, c’est répondre en permanence à trois questions : **Où suis-je ? Où vais-je ? Comment y aller ?** Le reste est de la méthode."),
          h("Relèvement : retrouver sa position"),
          p("Si vous êtes perdu mais voyez deux repères identifiables sur la carte, vous pouvez vous situer avec la boussole."),
          steps(["Visez deux repères", "Mesurez l’azimut vers chacun. Le meilleur angle entre les deux directions est proche de 90°."], ["Calculez les azimuts inverses", "Ajoutez ou retranchez 180° à chaque azimut, puis corrigez de la déclinaison."], ["Tracez sur la carte", "Depuis chaque repère, tracez une ligne selon l’azimut inverse. Elles se croisent à votre position."]),
          dia("nav-intersection", "Les deux lignes issues des repères se coupent à l’endroit où vous vous trouvez. Un troisième repère permet de vérifier."),
          h("Estime : savoir où l’on est quand rien n’est visible"),
          p("L’estime combine **cap**, **distance** et **temps**. Comptez vos **pas doubles** (un par pied droit) après avoir étalonné votre pas sur 100 m connus : de 60 à 70 pas doubles par 100 m sur terrain plat, davantage en pente ou avec une charge. Pour le temps, la règle de Naismith retient 1 heure pour 5 km, plus 1 heure par 600 m de montée. Utilisez l’[outil Estime du pas](#/outils/pas)."),
          h("Construire un itinéraire facile à suivre"),
          ul("**Ligne d’appui** : un élément linéaire (rivière, lisière, crête, chemin) que l’on longe.", "**Point d’attaque** : un repère évident, d’où l’on rejoint un objectif plus discret.", "**Point d’arrêt** : un élément qui montre qu’on est allé trop loin (route, ruisseau).", "**Points de contrôle** réguliers, tous les 500 m à 1 km, avec heure estimée de passage."),
          warn("Vous êtes perdu ? **Stoppez, réfléchissez, observez, planifiez** (le « STOP » des manuels américains : Stop, Think, Observe, Plan). Reprenez la carte et retournez au dernier point sûr. Marcher plus vite dans la mauvaise direction ne fait qu’aggraver la situation. En cas de doute sérieux, restez où vous êtes et alertez.", "Perdu"),
          note("Un GPS est précis à quelques mètres, mais se brouille sous couvert dense ou au fond d’un ravin et vide sa batterie. Téléchargez les cartes hors-ligne avant de partir, enregistrez votre itinéraire, et considérez la boussole comme secours.", "Et le GPS ?"),
          kp("Trois questions : où suis-je, où vais-je, comment y aller ?", "Relèvement : deux azimuts inverses, croisés sur la carte.", "Itinéraire : ligne d’appui, point d’attaque, point d’arrêt, points de contrôle.", "Perdu : stoppez, réfléchissez, observez, planifiez.")
        ]
      },
      {
        id: "sans-boussole", titre: "S’orienter sans boussole", resume: "Soleil, montre, ombre d’un bâton, étoile polaire : retrouver le nord avec ce que l’on a.",
        b: [
          p("Ces méthodes donnent une direction approximative (une dizaine de degrés d’erreur), suffisante pour ne pas tourner en rond ou rejoindre une route, une rivière ou une ligne d’appui connue."),
          h("Le soleil"),
          p("Il se lève à peu près à l’Est et se couche à peu près à l’Ouest, avec précision aux équinoxes seulement. À midi solaire, il est au **Sud** dans l’hémisphère nord. En France, cela se produit entre 12 h 30 et 13 h 20 en heure d’hiver, entre 13 h 30 et 14 h 20 en heure d’été, selon la région et la saison."),
          h("Montre analogique et bâton"),
          dia("orient-nature", "À gauche, la montre. À droite, l’ombre d’un bâton planté droit : la ligne qui relie les deux marques va de l’Ouest à l’Est."),
          ul("**Montre** (hémisphère nord) : pointez l’aiguille des heures vers le soleil. Le sud se trouve à mi-chemin entre cette aiguille et le 12. En heure d’été, prenez le 13 à la place du 12.", "**Bâton** : plantez un bâton droit sur sol plat, marquez le bout de l’ombre, attendez 15 minutes, marquez à nouveau. La première marque est à l’Ouest, la seconde à l’Est."),
          h("La nuit : l’étoile polaire"),
          dia("orient-polaire", "On prolonge cinq fois la distance entre Mérak et Dubhe pour trouver l’étoile polaire, qui indique le nord à un degré près."),
          p("L’étoile polaire est presque exactement au Nord. Elle n’est pas la plus brillante du ciel : on la trouve grâce à la Grande Ourse (le « Chariot »), ou à l’opposé en partant de Cassiopée, dont la forme évoque un W."),
          warn("Les « indices de la nature » (mousse sur un côté des arbres, forme des cimes, orientation des fourmilières) sont **peu fiables** : ils dépendent de l’humidité, du vent et de la pente. Ne vous y fiez pas pour décider d’un itinéraire.", "À éviter"),
          tip("Une fois la direction trouvée, fixez-la avec un **repère lointain**, puis un deuxième derrière lui. Deux jalons alignés permettent de garder le cap, même en forêt."),
          kp("Soleil au sud à midi solaire (hémisphère nord).", "Montre : le sud est à mi-chemin entre l’aiguille des heures (vers le soleil) et 12 h.", "Bâton : première marque à l’ouest, seconde à l’est.", "Polaire : 5 fois la distance Mérak-Dubhe.")
        ]
      }
    ],
    quiz: [
      { q: "Sur une carte au 1 : 25 000, quelle distance réelle représentent 4 cm ?", o: ["400 m", "1 km", "2,5 km", "4 km"], a: 1, e: "À cette échelle, 1 cm = 250 m, donc 4 cm = 1 000 m." },
      { q: "Sur une carte, des courbes de niveau très serrées indiquent…", o: ["un terrain plat", "une pente raide", "une zone d’eau", "une forêt dense"], a: 1, e: "Plus les courbes sont rapprochées, plus l’altitude change sur une courte distance : la pente est raide." },
      { q: "Pour lire une coordonnée de grille, on lit…", o: ["d’abord vers le haut (Y), puis vers la droite (X)", "d’abord vers la droite (X), puis vers le haut (Y)", "dans l’ordre que l’on veut", "uniquement la ligne verticale"], a: 1, e: "On lit toujours X (Est) avant Y (Nord) : « d’abord à droite, puis en haut »." },
      { q: "Quel est l’azimut inverse de 75° ?", o: ["105°", "180°", "255°", "285°"], a: 2, e: "75° + 180° = 255°. Si le résultat dépasse 360°, on retranche 360° ; si l’azimut dépasse 180°, on retranche 180°." },
      { q: "La déclinaison est de +2° (Est) et vous mesurez 100° au compas. Quel est l’azimut géographique ?", o: ["98°", "100°", "102°", "280°"], a: 2, e: "Azimut géographique = azimut magnétique + déclinaison Est : 100° + 2° = 102°." },
      { q: "Avec une montre analogique (hémisphère nord, heure d’hiver), le sud se trouve…", o: ["dans la direction de l’aiguille des minutes", "à mi-chemin entre l’aiguille des heures dirigée vers le soleil et 12 h", "à l’opposé de l’aiguille des heures", "dans la direction du 6"], a: 1, e: "On vise le soleil avec l’aiguille des heures ; la bissectrice entre elle et 12 h indique le sud." },
      { q: "Comment trouve-t-on l’étoile polaire avec la Grande Ourse ?", o: ["en prolongeant 2 fois la distance entre Mérak et Dubhe", "en prolongeant 5 fois la distance entre Mérak et Dubhe", "en suivant la queue du Chariot", "en cherchant l’étoile la plus brillante"], a: 1, e: "On prolonge cinq fois la distance entre les deux étoiles du bord du « chariot », de Mérak vers Dubhe." },
      { q: "Perdu en forêt, que faites-vous en premier ?", o: ["Marcher plus vite pour sortir", "Stopper, réfléchir, observer, planifier", "Grimper à l’arbre le plus haut", "Suivre n’importe quel chemin"], a: 1, e: "S’arrêter permet de reprendre la carte et de revenir au dernier point sûr, au lieu d’aggraver l’erreur." }
    ]
  });
})();
