/* Schémas animés — complément pédagogique (rythmes, échelles, suites d'étapes) */
(function () {
  "use strict";
  var D = MT.d, T = D.T, TL = D.TL, L = D.L, R = D.R, C = D.C, A = D.A;
  var X = MT.diagrams;
  function rows(items, label, o) { var r = D.rows(items, o || { w: 600, h: 56, gap: 12, chip: 19 }); return D.svg(608, r.height, r.body, label); }

  /* ===== SECOURS : rythme du massage cardiaque ===== */
  X["med-rcp"] = function () {
    var b = "";
    b += R(40, 150, 250, 70, "f-pp", 34) + C(70, 185, 26, "f-pp");                       // victime allongée (tête à gauche)
    b += '<circle cx="180" cy="185" r="20" class="d-ln f-d d-dg an-beat"/>';              // point d'appui : centre de la poitrine
    b += '<g class="an-press">' + L(180, 60, 180, 140, "d-th") + L(150, 60, 210, 60, "d-th") + '<path d="M168,128 L180,146 L192,128" class="d-ln d-th"/></g>';
    b += T(180, 40, "Bras tendus, à la verticale", "d-m d-s d-g") + T(180, 250, "Centre de la poitrine", "d-m d-b d-td");
    b += T(330, 86, "100 à 120", "d-xl d-td") + T(330, 112, "compressions par minute", "d-b");
    b += T(330, 150, "Enfoncer de 5 à 6 cm, relâcher.", "d-sg") + T(330, 174, "30 compressions, 2 insufflations", "d-sg") + T(330, 196, "(compressions seules si non formé)", "d-sg d-g");
    b += R(330, 214, 252, 44, "f-a d-ac", 8) + T(456, 242, "Le rond bat au bon rythme : suivez-le.", "d-m d-s d-ta");
    return D.svg(600, 272, b, "Massage cardiaque : appui au centre de la poitrine, 100 à 120 compressions par minute, 5 à 6 centimètres");
  };

  /* ===== TRANSMISSIONS : un échange radio type ===== */
  X["rad-dialogue"] = function () {
    var b = "", msgs = [[0, "Alpha de Bravo, Alpha de Bravo. Répondez."], [1, "Ici Alpha. Répondez."], [0, "Sommes au col, tout va bien. Retour prévu 16 h. Répondez."], [1, "Reçu. Terminé."]];
    b += C(34, 30, 20, "f-ac d-nos") + T(34, 37, "B", "d-m d-b d-on") + T(64, 37, "Bravo (le groupe)", "d-b");
    b += C(566, 30, 20, "f-i d-nos") + T(566, 37, "A", "d-m d-b d-on") + T(536, 37, "Alpha (le contact)", "d-b d-e");
    msgs.forEach(function (m, i) {
      var y = 66 + i * 58, x = m[0] ? 150 : 10;
      b += '<g>' + R(x, y, 440, 44, m[0] ? "f-pp" : "f-a d-ac", 12) + T(x + 18, y + 28, "« " + m[1] + " »", "d-sg") + "</g>";
    });
    b += T(300, 314, "« Répondez » : j’attends la réponse.   « Terminé » : fin de l’échange.", "d-m d-s d-g");
    return D.svg(600, 326, b, "Échange radio type entre deux stations : appel, réponse, message, accusé de réception");
  };

  /* ===== suites d'étapes ===== */
  X["lead-smesc"] = function () {
    return rows([{ k: "S", t: "Situation", d: "Météo, terrain, autres acteurs, état de l’équipe" }, { k: "M", t: "Mission", d: "Qui fait quoi, quand, où, pourquoi, en une phrase" }, { k: "E", t: "Exécution", d: "Intention, déroulement, rôle de chacun, repli" }, { k: "S", t: "Soutien", d: "Eau, vivres, matériel, soins, retour" }, { k: "C", t: "Commandement", d: "Qui décide, comment on se parle, signaux" }],
      "Ordre en cinq paragraphes : situation, mission, exécution, soutien, commandement");
  };
  X["lead-retex"] = function () {
    return rows([{ k: "1", t: "Qu’avait-on prévu ?", d: "La mission et le plan" }, { k: "2", t: "Que s’est-il passé ?", d: "Les faits, sans jugement" }, { k: "3", t: "Pourquoi cet écart ?", d: "Causes : décisions, matériel, météo, fatigue" }, { k: "4", t: "Que change-t-on ?", d: "Deux ou trois décisions concrètes", f: "f-a" }],
      "Retour d’expérience en quatre questions");
  };
  X["phi-droit"] = function () {
    return rows([{ k: "N", t: "Nécessité", d: "La force seulement pour un objectif militaire légitime" }, { k: "D", t: "Distinction", d: "Séparer combattants et civils, en permanence" }, { k: "P", t: "Proportionnalité", d: "Pas de dommages civils excessifs" }, { k: "H", t: "Humanité", d: "Pas de souffrances inutiles ; blessés et prisonniers protégés" }],
      "Quatre principes du droit des conflits armés : nécessité, distinction, proportionnalité, humanité");
  };
  X["tir-regles"] = function () {
    return rows([{ k: "1", t: "Toute arme est considérée comme chargée", d: "Même si l’on « sait » qu’elle ne l’est pas" }, { k: "2", t: "Canon toujours en direction sûre", d: "Vers la zone de tir, jamais vers quelqu’un", f: "f-d", cf: "f-dg d-nos" }, { k: "3", t: "Doigt hors de la détente", d: "Le long du pontet jusqu’à la décision de tirer" }, { k: "4", t: "Sûr de la cible et de ce qu’il y a derrière", d: "Le pare-balles arrête le tir" }],
      "Les quatre règles universelles de sécurité avec une arme");
  };
  X["surv-eau"] = function () {
    return rows([{ k: "1", t: "Choisir", d: "Eau courante et claire, en amont des pâtures et des habitations" }, { k: "2", t: "Filtrer", d: "À travers un tissu propre, pour retirer les particules" }, { k: "3", t: "Désinfecter", d: "Ébullition franche 1 minute (3 minutes au-dessus de 2 000 m)", f: "f-w" }, { k: "4", t: "Conserver", d: "Dans un récipient propre et fermé" }],
      "Rendre l’eau potable en quatre étapes : choisir, filtrer, désinfecter, conserver");
  };

  /* ===== FORME ===== */
  X["fit-progression"] = function () {
    var b = "", v = [100, 110, 121, 133, 100, 146];
    b += L(40, 230, 580, 230, "d-th");
    v.forEach(function (n, i) {
      var h = n * 1.15, x = 62 + i * 86, rest = i === 4;
      b += '<rect x="' + x + '" y="' + (230 - h) + '" width="56" height="' + h + '" rx="4" class="d-ln ' + (rest ? "f-ok" : "f-a d-ac") + ' an-grow" style="--g:' + i * 160 + 'ms"/>';
      b += T(x + 28, 252, "Sem. " + (i + 1), "d-m d-s") + T(x + 28, 222 - h, rest ? "allégée" : (i ? "+10 %" : "départ"), "d-m d-s " + (rest ? "d-g" : "d-ta"));
    });
    b += T(40, 26, "Augmenter d’environ 10 % par semaine, avec une semaine allégée pour récupérer.", "d-sg");
    return D.svg(600, 266, b, "Progression de l’entraînement : environ dix pour cent de plus par semaine, avec une semaine allégée");
  };
  X["fit-respiration"] = function () {
    var b = "";
    b += C(150, 140, 110, "d-l2 d-dash") + '<circle cx="150" cy="140" r="110" class="d-ln f-a d-ac an-breathe"/>' + T(150, 147, "souffle", "d-m d-b");
    b += T(310, 84, "Inspirez par le nez", "d-b") + T(310, 108, "4 secondes : le cercle grandit.", "d-sg d-g");
    b += T(310, 150, "Expirez par la bouche", "d-b") + T(310, 174, "6 secondes : le cercle se resserre.", "d-sg d-g");
    b += T(310, 216, "Répétez une à deux minutes.", "d-sg") + T(310, 238, "L’expiration longue apaise le rythme cardiaque.", "d-sg d-g");
    return D.svg(600, 280, b, "Exercice de respiration : inspirer quatre secondes, expirer six secondes");
  };

  /* ===== FROID ===== */
  X["cold-thermo"] = function () {
    var b = "", z = [["37 à 35 °C", "Normal", ["frissons", "possibles"], "f-ok", 130], ["35 à 32 °C", "Légère", ["frissons intenses,", "maladresse"], "f-wa", 150], ["32 à 28 °C", "Modérée", ["frissons qui cessent,", "confusion"], "f-d", 150], ["sous 28 °C", "Sévère", ["inconscience,", "pouls faible"], "f-dg", 150]], x = 10;
    z.forEach(function (s, i) {
      b += R(x, 70, s[4], 46, s[3], 0) + T(x + s[4] / 2, 60, s[0], "d-m d-s d-g") + T(x + s[4] / 2, 100, s[1], "d-m d-b" + (i === 3 ? " d-on" : ""));
      b += TL(x + s[4] / 2, 146, s[2], 18, "d-m d-sg");
      x += s[4];
    });
    b += '<g class="an-slide" style="--dx:540px"><path d="M30,20 L44,44 L16,44 Z" transform="rotate(180 30 32)" class="d-ln f-i d-nos"/></g>';
    b += A(10, 204, 590, 204, "d", "d-th") + T(300, 232, "Le corps se refroidit : agir dès les premiers frissons, alerter le 112 dès la confusion.", "d-m d-s");
    return D.svg(600, 244, b, "Stades de l’hypothermie selon la température centrale : normale, légère, modérée, sévère");
  };
  X["cold-bera"] = function () {
    var b = "", n = [["1", "Faible", "f-ok"], ["2", "Limité", "f-wa"], ["3", "Marqué", "f-ct"], ["4", "Fort", "f-d"], ["5", "Très fort", "f-dg"]];
    b += L(30, 220, 570, 220, "d-th");
    n.forEach(function (s, i) {
      var h = 36 + i * 34, x = 52 + i * 104;
      b += '<rect x="' + x + '" y="' + (220 - h) + '" width="72" height="' + h + '" rx="4" class="d-ln ' + s[2] + ' an-grow" style="--g:' + i * 180 + 'ms"/>';
      b += T(x + 36, 210, s[0], "d-m d-b" + (i === 2 || i === 4 ? " d-on" : "")) + T(x + 36, 244, s[1], "d-m d-s");
    });
    b += '<g class="an-pulse">' + A(296, 70, 296, 100, "d", "d-th") + "</g>" + T(296, 40, "Niveau 3 : c’est là que surviennent", "d-m d-s d-td") + T(296, 58, "le plus d’accidents.", "d-m d-s d-td");
    return D.svg(600, 256, b, "Échelle du risque d’avalanche de 1 (faible) à 5 (très fort)");
  };

  /* ===== DÉPLACEMENT : adaptation de l'œil à l'obscurité ===== */
  X["tac-nuit"] = function () {
    var b = "";
    b += R(40, 90, 520, 34, "f-pp", 17) + '<rect x="40" y="90" width="520" height="34" rx="17" class="d-ln f-a d-ac an-fill"/>';
    [[40, "0 min", "lumière éteinte"], [213, "10 min", "on distingue les formes"], [560, "30 min", "vision de nuit complète"]].forEach(function (m, i) {
      b += L(m[0], 124, m[0], 140, "d-l2") + T(m[0], 160, m[1], "d-b " + (i === 0 ? "" : i === 1 ? "d-m" : "d-e")) + T(m[0], 180, m[2], "d-s d-g " + (i === 0 ? "" : i === 1 ? "d-m" : "d-e"));
    });
    b += T(40, 40, "L’œil met environ 30 minutes à s’adapter à l’obscurité.", "d-b") + T(40, 64, "La barre se remplit comme votre vision de nuit.", "d-sg d-g");
    b += R(40, 204, 520, 48, "f-d d-dg", 8) + C(72, 228, 12, "f-dg d-nos an-pulse") + T(96, 234, "Un seul éclair de lumière blanche remet le compteur à zéro.", "d-s");
    return D.svg(600, 264, b, "Adaptation de l’œil à l’obscurité : environ trente minutes, annulée par un éclair de lumière blanche");
  };
})();
