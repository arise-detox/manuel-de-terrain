/* Module : Tir sportif de précision, fondamentaux et sécurité */
(function () {
  var b = MT.b, p = b.p, h = b.h, ul = b.ul, steps = b.steps, note = b.note, tip = b.tip, warn = b.warn, danger = b.danger, table = b.table, dia = b.dia, kp = b.kp;

  MT.mod({
    id: "tir", titre: "Tir sportif : fondamentaux et sécurité", court: "Tir sportif",
    desc: "Les fondamentaux du tir de précision sur cible, tels que les enseignent les manuels d’instruction : sécurité d’abord, position, visée, respiration, détente, lecture des groupements. Pour le tir sportif en stand ou en club (carabine à plomb, carabine 22 LR, biathlon). Aucun contenu tactique ni contre une personne.",
    outils: ["checklists"],
    sources: ["tc-3-22-9", "tc-3-21-75"],
    chapitres: [
      {
        id: "securite", titre: "Sécurité avant tout", resume: "Les quatre règles universelles, le cadre légal en France, le stand.",
        b: [
          danger("Une arme à feu est **toujours dangereuse**. Ce module ne remplace ni un **moniteur diplômé**, ni les consignes d’un **club affilié à la Fédération française de tir (FFTir)**. N’apprenez jamais seul ; n’utilisez une arme que dans un **stand agréé**, sous la responsabilité d’un encadrant.", "Cadre indispensable"),
          dia("tir-regles", "Quatre règles cumulatives : il faut en enfreindre plusieurs pour qu’un accident arrive."),
          h("Les quatre règles universelles"),
          steps(["Toute arme est chargée", "Traitez toujours une arme comme si elle l’était, même si vous « savez » qu’elle ne l’est pas."], ["Jamais vers quelqu’un", "Ne dirigez **jamais** le canon vers ce que vous ne voulez pas détruire. Gardez-le toujours orienté vers la zone de tir ou vers le haut."], ["Doigt hors de la détente", "Le doigt reste **le long du pontet** jusqu’à ce que vous soyez en position, la cible dans la visée, et prêt à tirer."], ["Sûr de la cible et de ce qu’il y a derrière", "Identifiez votre cible. Assurez-vous que la balle est arrêtée par le pare-balles."]),
          h("Dans un stand"),
          ul("**Écoutez les ordres** du directeur de tir : « Chargez », « Feu », « Cessez le feu », « Déchargez ».", "**Armes déchargées**, culasse ouverte et **drapeau de sécurité** (ou chambre vide) à chaque pause ou déplacement.", "**Protections auditives et oculaires** obligatoires pour tous.", "Hors ligne de tir : jamais d’arme en main sans autorisation."),
          h("Cadre légal en France (à vérifier auprès des autorités)"),
          note("La détention et le transport d’armes obéissent à des **règles strictes** (catégories, licence sportive, certificat médical, autorisation ou déclaration selon l’arme, stockage sécurisé, transport déchargé). Elles évoluent : renseignez-vous auprès de votre club, de la FFTir, de la préfecture ou du site service-public.fr.", "Réglementation"),
          kp("Quatre règles : toute arme est chargée, jamais vers quelqu’un, doigt hors détente, cible et fond sûrs.", "Apprendre en club affilié FFTir, dans un stand agréé.", "Respecter la réglementation de détention et de transport.")
        ]
      },
      {
        id: "position", titre: "Une position stable", resume: "Os plutôt que muscles : l’arme tient presque toute seule.",
        b: [
          p("La précision commence par la **stabilité**. Une bonne position est une position où l’arme tient **sans effort musculaire**, en s’appuyant sur la structure osseuse et sur des appuis."),
          h("Les caractéristiques d’une bonne position"),
          ul("**Appuis solides** : coudes, genoux, hanches posés sur un support ou sur le sol, jamais « en l’air ».", "**Le squelette porte** : alignement des os plus que force des muscles.", "**Détente corporelle** : relâchez épaules, mâchoire, mains.", "**Régularité** : retrouver exactement la même position à chaque tir.", "**Respiration naturelle** possible sans bouger l’arme."),
          h("Le point d’aplomb naturel"),
          p("Fermez les yeux quelques secondes en position, puis ouvrez-les : si le guidon n’est plus sur la cible, votre position **tire** l’arme de côté. Déplacez tout le **corps** (pas les bras) jusqu’à ce que la visée retombe d’elle-même sur la cible : c’est le **point d’aplomb naturel**."),
          tip("Faites un **carnet de tir** et notez votre position, vos réglages, vos conditions. Les débutants progressent surtout en **répétant le même geste**.", "Régularité"),
          kp("Appuis solides, os plutôt que muscles, corps détendu.", "Point d’aplomb naturel : le corps se place, pas les bras.", "Retrouver la même position à chaque tir.")
        ]
      },
      {
        id: "visee", titre: "La visée", resume: "Alignement, mise au point de l’œil, image de visée correcte.",
        b: [
          p("La visée consiste à **aligner** les éléments de visée (œilleton, guidon, cible) et à **garder cet alignement** au moment du départ du coup."),
          dia("tir-visee", "À gauche, l’image correcte : le guidon est net et centré dans l’ouverture. Au milieu, une erreur de centrage. À droite, un point de visée mal choisi."),
          h("Le principe de la mise au point"),
          p("L’œil ne peut pas être net à la fois sur l’œilleton, le guidon et la cible. Les instructeurs recommandent : **œil net sur le guidon**, cible légèrement floue, œilleton flou. Un guidon net donne l’alignement le plus précis."),
          steps(["Alignement", "Le guidon est centré dans l’ouverture, à égale distance sur les côtés."], ["Point de visée", "Le guidon est placé de manière constante par rapport à la cible, selon la méthode de votre discipline."], ["Maintien", "Ne cherchez pas à tenir parfaitement immobile : une petite oscillation est normale. Concentrez-vous sur la régularité."]),
          note("Le **bon œil** est celui qui domine. Testez avec les deux bras tendus, formant un petit trou avec les mains : l’œil qui voit la cible à travers l’ouverture est l’œil directeur. Un moniteur vous aidera à choisir l’épaule adaptée.", "Œil directeur"),
          kp("Œil net sur le guidon, cible légèrement floue.", "Alignement centré, constant à chaque tir.", "Une petite oscillation est normale : la régularité compte plus que l’immobilité.")
        ]
      },
      {
        id: "respiration-detente", titre: "Respiration et détente", resume: "La pause respiratoire naturelle et le contrôle progressif de la détente.",
        b: [
          h("Respiration"),
          p("La respiration fait bouger la poitrine, donc l’arme. L’enseignement est constant : **respirer calmement**, puis faire le tir dans la **courte pause naturelle** après l’expiration, sans bloquer l’air plus de quelques secondes."),
          steps(["Inspirer", "Une respiration normale, sans forcer."], ["Expirer", "Laissez l’air sortir naturellement, jusqu’à la pause."], ["Tirer dans la pause", "Dans cette courte pause (quelques secondes), poursuivez la visée et pressez la détente."], ["Reprendre", "Si la visée n’est pas bonne, **n’insistez pas** : respirez et recommencez."]),
          h("La détente"),
          p("Une détente tirée trop brusquement **déplace l’arme** et ruine la visée. L’enseignement classique : **pression progressive et régulière** à l’aide de la première phalange du doigt, dans l’axe de l’arme, jusqu’à ce que le départ **surprenne** légèrement."),
          h("L’accompagnement"),
          p("Après le départ du coup, **gardez la position, la visée et la pression** quelques instants : c’est l’**accompagnement**. Les tireurs expérimentés le considèrent comme l’un des éléments les plus déterminants de la précision."),
          warn("Ne cherchez jamais à anticiper le départ en se crispant ou en fermant les yeux. Ces réactions réflexes sont des **sources d’erreurs**. Le tir à vide ou le tir à l’air comprimé, sous contrôle d’un instructeur, aide à les corriger.", "Anticipation"),
          kp("Tirer dans la pause naturelle après l’expiration.", "Détente : pression progressive, départ « surprise ».", "Accompagner : garder position et visée après le départ.")
        ]
      },
      {
        id: "groupements", titre: "Lire ses groupements", resume: "Serré, décalé, dispersé : distinguer le réglage de la technique.",
        b: [
          p("Un **groupement** est l’ensemble des impacts d’une série de coups. Sa taille dit la **régularité** du tireur ; sa position dit le **réglage** de l’arme. On corrige **d’abord** la régularité, ensuite le réglage."),
          dia("tir-groupements", "Quatre cas types. Le diagnostic dépend de la forme du groupement, pas d’un coup isolé."),
          table(["Constat", "Interprétation probable", "Action"], ["**Serré et centré**", "Bonne technique et bon réglage", "Continuer, noter les conditions"], ["**Serré mais décalé**", "Régularité bonne, réglage à corriger", "Régler la hausse ou le guidon (ou le point de visée)"], ["**Dispersé**", "Régularité insuffisante : position, détente, visée", "Revoir un fondamental à la fois, avec le moniteur"], ["**Dispersion verticale**", "Respiration, appui, tenue de l’arme variable", "Travailler la respiration, la position, la prise"]),
          note("Ne modifiez pas le réglage de l’arme sur un groupement dispersé : vous « poursuivez » des impacts aléatoires. **Groupez d’abord, réglez ensuite.** Utilisez des séries de 3 à 5 coups pour évaluer.", "Règle d’or"),
          tip("Notez dans le carnet : date, arme, munition, distance, conditions, taille du groupement. Au bout de quelques séances, vos progrès — ou vos régressions — se verront clairement.", "Mesurer pour progresser"),
          kp("Groupement = régularité ; position du groupement = réglage.", "Groupez d’abord, réglez ensuite.", "Séries de 3 à 5 coups pour juger.")
        ]
      },
      {
        id: "entrainement", titre: "S’entraîner efficacement", resume: "Tir à sec, concentration, gestion du stress, progression.",
        b: [
          p("Le tir sportif est un sport d’**attention** et de **répétition**. Les meilleurs entraînements combinent peu de coups tirés, mais **très attentifs**."),
          h("Le tir à vide (dry fire)"),
          p("Pratiqué avec une arme **déchargée et vérifiée**, sous la supervision d’un moniteur et dans un lieu autorisé, le tir à vide permet de répéter la position, la visée et la détente **sans tirer de munitions**. Vérifiez **trois fois** que l’arme est vide, et éloignez toute munition de la zone d’entraînement."),
          h("La préparation mentale"),
          ul("**Un seul objectif par série** : la détente, ou la respiration, ou l’accompagnement.", "**Routine** identique avant chaque tir : position, respiration, visée, tir.", "**Visualisation** : imaginer le tir parfait dans son détail avant de le faire.", "**Gérer le stress** : respirer, ralentir. En compétition, les mêmes routines que l’entraînement."),
          h("Progresser"),
          ul("Commencez par la **carabine à air comprimé** : peu de recul, coûts modestes, apprentissage des fondamentaux.", "**Régularité avant puissance** : des séances courtes et fréquentes valent mieux que de longues séances occasionnelles.", "Prenez des **conseils d’un moniteur** et filmez-vous pour repérer les défauts de position."),
          note("Le **biathlon** combine ski de fond et tir à la carabine 22 LR sur cible : il illustre l’importance de la régularité sous effort et de la maîtrise de la respiration et du rythme cardiaque.", "Un exemple de sport complet"),
          kp("Tir à vide uniquement sur arme déchargée, vérifiée et encadrée.", "Un objectif par série, une routine identique.", "Débuter à l’air comprimé, séances courtes et fréquentes.")
        ]
      }
    ],
    quiz: [
      { q: "Quelle est la première règle de sécurité avec toute arme ?", o: ["Elle est déchargée si on l’a déchargée il y a longtemps", "Toute arme est considérée comme chargée", "Seules les armes à feu sont dangereuses", "On ne vérifie jamais la chambre"], a: 1, e: "On traite toujours une arme comme si elle était chargée, même si l’on pense qu’elle ne l’est pas." },
      { q: "Où garde-t-on le doigt tant que l’on n’est pas prêt à tirer ?", o: ["Sur la détente", "Le long du pontet, hors de la détente", "Dans la poche", "Sur le chien"], a: 1, e: "Le doigt reste le long du pontet jusqu’à ce que la cible soit dans la visée et que l’on ait décidé de tirer." },
      { q: "Sur quoi l’œil doit-il être net pendant la visée ?", o: ["Sur la cible", "Sur l’œilleton", "Sur le guidon", "Sur l’ensemble"], a: 2, e: "L’œil est net sur le guidon ; la cible est légèrement floue. C’est l’alignement qui est le plus précis." },
      { q: "À quel moment du cycle respiratoire presse-t-on la détente ?", o: ["À la fin de l’inspiration", "Dans la pause naturelle après l’expiration", "En retenant l’air une minute", "Peu importe"], a: 1, e: "On tire dans la courte pause naturelle qui suit l’expiration, sans retenir l’air trop longtemps." },
      { q: "Que signifie un groupement serré mais décalé ?", o: ["Une technique très irrégulière", "Une bonne régularité, mais un réglage à corriger", "Une arme défectueuse", "Une erreur de lecture"], a: 1, e: "Le tireur est régulier : on peut régler l’arme (hausse, guidon) pour ramener le groupement au centre." },
      { q: "Dans quel ordre corrige-t-on un groupement dispersé ?", o: ["On règle d’abord l’arme", "On travaille d’abord la régularité (technique), puis le réglage", "On change de munition chaque série", "On ne corrige rien"], a: 1, e: "Modifier le réglage sur un groupement dispersé revient à poursuivre des impacts aléatoires : groupez d’abord." },
      { q: "Où doit-on pratiquer le tir ?", o: ["Dans son jardin", "Dans un stand agréé, avec encadrement", "En forêt, au hasard", "Où l’on veut"], a: 1, e: "Le tir sportif se pratique dans un stand agréé, dans le respect de la réglementation et sous la responsabilité d’un encadrant." }
    ]
  });
})();
