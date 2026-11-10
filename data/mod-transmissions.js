/* Module : Transmissions radio et communication */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "transmissions", titre: "Transmissions et communication", court: "Radio",
    desc: "Se parler et se faire entendre sans ambiguïté : types de radio, portée, procédure, alphabet phonétique, plan PACE et messages d’urgence. Version civile : PMR446, CB, radio amateur, balise de détresse.",
    outils: ["phonetique", "dtg", "alerte", "checklists"],
    sources: ["mcrp-3-40-3b", "tc-3-21-60", "tc-3-21-75"],
    chapitres: [
      {
        id: "equipements", titre: "Quel équipement pour quel usage ?", resume: "PMR446, CB, radio amateur, téléphone satellite et balise de détresse : ce que chaque outil permet.",
        b: [
          p("Une communication sert à **transmettre une information utile, au bon destinataire, au bon moment**. Les manuels militaires insistent sur la fiabilité plutôt que sur la sophistication : un moyen simple, connu de tous, que l’on a testé."),
          h("Les moyens courants en France"),
          table(["Moyen", "Principe", "Intérêt", "Limites"], ["**PMR446**", "Talkie-walkie UHF (446 MHz), 0,5 W, sans licence", "Simple, bon marché, idéal en groupe", "Portée courte (1 à 3 km en terrain dégagé, bien moins en forêt ou en ville)"], ["**CB** (27 MHz)", "Bande citoyenne, sans licence, puissance limitée", "Portée un peu meilleure, réseau d’utilisateurs", "Sensible aux parasites, antenne encombrante"], ["**Radio amateur**", "Plusieurs bandes, puissance supérieure, avec licence (certificat d’opérateur)", "Longues portées, relais, communauté d’entraide", "Demande de l’apprentissage et un indicatif"], ["**Téléphone**", "Réseau cellulaire, parfois par satellite", "Appel du 112 même sans abonnement", "Pas de couverture en montagne ou en vallée isolée"], ["**Balise PLB** (406 MHz)", "Émet un signal de détresse capté par satellite", "Alerte les secours avec votre position", "Pour les urgences vitales seulement, doit être enregistrée"]),
          note("Les règles précises (puissance, bandes, licences, usage en mer ou en montagne) évoluent. Consultez les textes de l’ANFR et de l’Arcep, ou le vendeur de votre matériel, avant d’acheter ou d’émettre.", "Réglementation"),
          h("Le meilleur moyen est celui que l’on a testé"),
          ul("**Essayez** votre matériel avant le départ, dans les conditions réelles, avec piles ou batteries pleines.", "**Prévoyez l’énergie** : piles de rechange, batterie externe, mise en veille de l’écran, appareil au chaud en hiver (le froid vide les batteries).", "**Protégez** l’appareil de l’eau avec un sac étanche.", "**Connaissez** votre appareil : changement de canal, verrouillage, touche d’émission."),
          kp("Un moyen simple, testé et connu de tous vaut mieux qu’un moyen sophistiqué.", "PMR446 : sans licence, courte portée. CB : sans licence. Radio amateur : licence.", "Le 112 fonctionne dans tout réseau mobile disponible ; la PLB est réservée aux urgences vitales.")
        ]
      },
      {
        id: "portee", titre: "Portée, relief et antennes", resume: "Pourquoi une radio n’est pas entendue, et comment gagner quelques kilomètres.",
        b: [
          p("Les ondes **VHF et UHF** (talkies, PMR446, radios de randonnée) se propagent presque **en ligne droite**. Elles ne contournent pas une montagne et traversent mal les murs, les forêts denses et le sol. La portée dépend donc davantage du **dégagement** que de la puissance."),
          dia("rad-portee", "Entre A et B, la colline coupe la liaison. En montant sur la crête ou en passant par un relais, on rétablit la communication."),
          h("Ce qui améliore la portée"),
          ul("**Monter en hauteur** : une crête, un pylône, une clairière, le haut d’un immeuble.", "**Dégager** : sortir de la vallée, de la forêt dense, du bâtiment.", "**Garder l’antenne verticale** et éloignée du corps ; ne pas la plier ni la tenir contre le visage.", "**Une antenne extérieure** ou plus longue améliore nettement la réception (pour les postes qui le permettent).", "**Changer de position** de quelques mètres : à ces fréquences, un simple déplacement peut tout changer."),
          h("Ce qui la détériore"),
          ul("Relief, bâtiments, béton armé, véhicules métalliques.", "Végétation humide et dense.", "Batteries faibles (puissance et réception dégradées).", "Interférences électriques (lignes à haute tension, moteurs)."),
          tip("Si vous n’êtes pas entendu, avant de monter en puissance : **bougez, montez, dégagez**. C’est presque toujours la solution.", "Réflexe"),
          kp("VHF/UHF : propagation en ligne droite, bloquée par le relief.", "Hauteur et dégagement comptent plus que la puissance.", "Pas de réponse : changer de position avant de crier plus fort.")
        ]
      },
      {
        id: "procedure", titre: "Procédure radio et alphabet phonétique", resume: "Parler court, clair et sans ambiguïté, avec les mots de procédure.",
        b: [
          p("La procédure radio réduit les erreurs. Les mots de procédure (**prowords**) ont un sens précis et gagnent du temps. Le plus important : **réfléchir avant d’appuyer**, parler lentement, distinctement, en phrases courtes."),
          h("Structure d’un appel"),
          steps(["Appeler", "Dites d’abord **qui vous appelez**, puis **qui vous êtes** : « Alpha de Bravo, Alpha de Bravo. Répondez. »"], ["Attendre la réponse", "Le correspondant répond : « Ici Alpha, à vous. »"], ["Transmettre", "Message court. Dites l’essentiel d’abord."], ["Accuser réception", "Le correspondant confirme : « Reçu. » Sinon, il demande de répéter."], ["Clore", "« Terminé. » Chaque échange se termine par une clôture."]),
          h("Mots de procédure courants"),
          table(["Français", "Équivalent anglais", "Sens"], ["Répondez", "Over", "Fin de ma transmission, j’attends votre réponse"], ["Terminé", "Out", "Fin de l’échange, pas de réponse attendue"], ["Reçu", "Roger", "J’ai bien reçu et compris le message"], ["Répétez", "Say again", "Répétez votre dernier message"], ["Je répète", "I say again", "Je répète mon message"], ["Attendez", "Wait", "Je dois d’abord faire autre chose, restez à l’écoute"], ["Épelez", "Spell", "Épelez en alphabet phonétique"], ["Exact", "Affirm", "Oui"], ["Négatif", "Negative", "Non"]),
          warn("Ne dites jamais « Répondez » et « Terminé » dans le même message : ils s’excluent. Le premier ouvre l’échange, le second le clôt.", "Erreur fréquente"),
          h("L’alphabet phonétique OTAN"),
          p("Pour épeler un nom, une plaque, un lieu ou des coordonnées : A comme **Alpha**, B comme **Bravo**, C comme **Charlie**… Les chiffres se prononcent distinctement, et le zéro se dit « zéro », pas « o »."),
          p("Entraînez-vous avec l’[alphabet phonétique OTAN](#/outils/phonetique) interactif, et avec l’[horodatage DTG](#/outils/dtg) pour noter l’heure."),
          kp("Appel : qui j’appelle, qui je suis, puis « Répondez ».", "« Répondez » ouvre, « Terminé » clôt. Jamais les deux ensemble.", "Épeler les noms et les chiffres importants avec l’alphabet phonétique.")
        ]
      },
      {
        id: "pace", titre: "Le plan PACE et le plan de communication", resume: "Avoir toujours un moyen de rechange, et savoir quand et comment se contacter.",
        b: [
          p("Un équipement tombe en panne, une batterie se vide, un relief coupe la liaison. Le plan **PACE** (Primaire, Alternatif, Contingence, Urgence) impose de **prévoir plusieurs moyens de communication, dans l’ordre**, avant de partir."),
          dia("rad-pace", "Quatre niveaux : si le premier échoue, on passe au suivant. Tout le groupe connaît l’ordre."),
          h("Construire son plan"),
          steps(["Choisir les moyens", "Un principal (radio), un alternatif (téléphone), un secours (signaux), un dernier recours (rendez-vous)."], ["Fixer les canaux et horaires", "Canal principal, canal de repli, **heures de contact** (par exemple toutes les deux heures, cinq minutes)."], ["Décider du seuil de bascule", "Après combien de temps sans réponse passe-t-on au niveau suivant ?"], ["Désigner un contact au point de départ", "Une personne restée en lieu sûr connaît l’itinéraire, l’heure de retour prévue et ce qu’elle doit faire en cas de silence."]),
          h("Le principe du message laissé"),
          p("Avant toute sortie en terrain isolé, **laissez un message** à quelqu’un : itinéraire, nombre de personnes, véhicule, heure de retour, et l’heure à laquelle il doit **alerter les secours** si vous n’avez pas redonné signe de vie. C’est la mesure de sécurité la plus efficace."),
          note("Le meilleur plan de transmission ne remplace pas la prudence : en cas de doute sur la météo ou le terrain, on reporte la sortie.", "Prudence"),
          kp("PACE : Primaire, Alternatif, Contingence, Urgence.", "Convenir de canaux, d’horaires et d’un seuil de bascule avant le départ.", "Toujours laisser un message avec itinéraire et heure d’alerte.")
        ]
      },
      {
        id: "discipline", titre: "Discipline radio et sécurité de l’information", resume: "Brièveté, discrétion, vérifications : les bonnes habitudes de tout opérateur.",
        b: [
          p("Une radio est une **fréquence partagée** : tout le monde à portée peut vous entendre. La discipline radio protège à la fois l’efficacité (canal libre pour les urgences) et la vie privée."),
          h("Règles de base"),
          ul("**Écoutez avant d’émettre** : ne coupez pas une conversation en cours.", "**Soyez bref** : message préparé, structuré, essentiel d’abord.", "**N’émettez pas de données personnelles** : adresse précise, absences prolongées, informations sensibles.", "**N’utilisez pas** de langage inutile ou d’émotions sur le canal, surtout en situation d’urgence.", "**Gardez le canal libre** : ne monopolisez pas.", "**Vérifiez** que la touche d’émission n’est pas coincée (sac, poche), ce qui bloque tout le canal."),
          h("Messages d’urgence"),
          table(["Signal", "Quand l’utiliser", "Sens"], ["**MAYDAY** (3 fois)", "Danger de mort immédiat", "Détresse : tous se taisent, l’appel est prioritaire"], ["**PAN-PAN** (3 fois)", "Urgence sans danger immédiat", "Besoin d’aide ou d’assistance"], ["**SÉCURITÉ** (3 fois)", "Information de sécurité", "Avis important pour tous (météo, obstacle)"]),
          p("En détresse, donnez dans l’ordre : **qui** vous êtes, **où** vous êtes (coordonnées, repères), **quoi** (nature du problème), **combien** de personnes, **quel secours** vous demandez. Utilisez l’[outil de message d’alerte](#/outils/alerte) pour préparer à l’avance ce message."),
          danger("Un appel de détresse sans motif réel est un délit et mobilise des secours qui manqueront ailleurs. Cela ne doit jamais servir d’exercice. Pour s’entraîner, annoncez clairement « exercice » à chaque phrase et choisissez un canal et un cadre autorisés.", "Ne simulez pas"),
          kp("Écouter avant d’émettre, parler court, ne donner aucune donnée personnelle.", "MAYDAY pour un danger de mort, PAN-PAN pour une urgence, SÉCURITÉ pour une information.", "En détresse : qui, où, quoi, combien, quel secours.")
        ]
      },
      {
        id: "visuel", titre: "Signaux visuels et sonores", resume: "Quand la radio échoue : miroir, sifflet, lumière, panneaux.",
        b: [
          p("Les signaux visuels et sonores sont le **niveau de contingence** du plan PACE. Ils ne dépendent d’aucune pile, mais portent moins loin et exigent d’être vu ou entendu."),
          h("Signaux utiles à connaître"),
          ul("**Sifflet** : trois coups brefs répétés à intervalles réguliers signalent une détresse. Six coups par minute en montagne, avec réponse de trois coups.", "**Miroir de signalisation** : visible à plusieurs kilomètres par temps clair. Orientez le reflet vers l’avion ou le point d’observation.", "**Lampe frontale** : six éclairs par minute, la nuit.", "**Grands signes au sol** : lettres de plusieurs mètres, contrastés, dans un espace dégagé (voir le module de survie).", "**Feu et fumée** : trois feux en triangle ou en ligne signalent l’urgence ; fumée épaisse (feuillage vert) le jour."),
          note("Le signal international de détresse en montagne est **six signaux par minute** (sonores ou lumineux), puis une minute de pause. La réponse est **trois signaux par minute**.", "Montagne"),
          h("Se faire repérer par un hélicoptère"),
          ul("Placez-vous dans un endroit **dégagé**, couleurs vives (veste, bâche).", "Levez les **deux bras** en V si vous demandez de l’aide, un bras levé et l’autre baissé pour dire « tout va bien ».", "Ne vous précipitez pas vers l’appareil."),
          kp("Sifflet, miroir et lampe : six signaux par minute pour la détresse, trois pour répondre.", "Les signaux visuels sont le niveau de contingence du plan PACE.", "Bras levés en V : j’ai besoin d’aide.")
        ]
      }
    ],
    quiz: [
      { q: "Les ondes VHF et UHF se propagent principalement :", o: ["Autour de la Terre, comme les ondes courtes", "En ligne droite, bloquées par le relief", "À travers le sol", "Uniquement le jour"], a: 1, e: "À ces fréquences, la portée dépend du dégagement : le relief bloque, la hauteur aide." },
      { q: "Que faire d’abord si la radio ne reçoit personne ?", o: ["Augmenter la puissance au maximum", "Changer de position, monter, dégager", "Éteindre la radio", "Crier au micro"], a: 1, e: "Bouger de quelques mètres ou monter en hauteur règle souvent le problème sans rien changer d’autre." },
      { q: "Que signifient les lettres du plan PACE ?", o: ["Position, Appel, Contact, Évacuation", "Primaire, Alternatif, Contingence, Urgence", "Prévoir, Anticiper, Coordonner, Exécuter", "Priorité, Alerte, Code, Échange"], a: 1, e: "PACE hiérarchise les moyens de communication : principal, alternatif, contingence, urgence." },
      { q: "Quel mot indique « fin de l’échange, pas de réponse attendue » ?", o: ["Répondez", "Reçu", "Terminé", "Répétez"], a: 2, e: "« Terminé » clôt l’échange. « Répondez » signifie au contraire : j’attends votre réponse." },
      { q: "Quel signal utilise-t-on en cas de danger de mort immédiat à la radio ?", o: ["SÉCURITÉ", "PAN-PAN", "MAYDAY", "Négatif"], a: 2, e: "MAYDAY, répété trois fois, signale une détresse : le canal devient prioritaire." },
      { q: "Quel est le signal de détresse de montagne ?", o: ["Un coup par minute", "Six signaux par minute", "Deux signaux par heure", "Un cri long"], a: 1, e: "Six signaux par minute, une minute de pause ; la réponse est trois signaux par minute." },
      { q: "Que doit-on laisser avant de partir en terrain isolé ?", o: ["Rien", "Un message : itinéraire, nombre de personnes, heure de retour et d’alerte", "Les clés du véhicule seulement", "Sa batterie"], a: 1, e: "Le message laissé à un proche est la mesure de sécurité la plus efficace : sans lui, personne ne sait qu’on est en difficulté." }
    ]
  });
})();
