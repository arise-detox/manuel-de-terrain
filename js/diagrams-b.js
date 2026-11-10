/* Schémas — secours, transmissions, commandement, déplacement, doctrine, tir, forme, froid */
(function () {
  "use strict";
  var D = MT.d, T = D.T, TL = D.TL, L = D.L, P = D.P, R = D.R, C = D.C, A = D.A, f = D.f, G = D.G;
  var X = MT.diagrams;

  /* ===== SECOURS ===== */
  X["med-march"] = function () {
    var r = D.rows([
      { k: "M", t: "Hémorragie massive", d: "Compression, tamponnement, garrot : d’abord ce qui tue vite", f: "f-d", cf: "f-dg d-nos" },
      { k: "A", t: "Voies aériennes", d: "Libérer, maintenir ouvertes, position latérale de sécurité" },
      { k: "R", t: "Respiration", d: "Fréquence, plaie du thorax : pansement occlusif" },
      { k: "C", t: "Circulation", d: "Pouls, signes de choc, autres saignements" },
      { k: "H", t: "Hypothermie et tête", d: "Isoler du sol, couvrir, surveiller la conscience" }
    ], { w: 600, h: 62, gap: 14, chip: 20 });
    return D.svg(608, r.height, r.body, "Séquence MARCH : hémorragie massive, voies aériennes, respiration, circulation, hypothermie et tête");
  };

  X["med-garrot"] = function () {
    var b = "";
    b += P("M30,110 L570,110") + P("M30,190 L570,190");
    b += L(150, 104, 150, 196, "d-dash d-l2") + T(158, 128, "articulation", "d-s d-g") + T(158, 146, "(ne pas poser dessus)", "d-s d-g");
    b += '<polygon points="415,110 425,126 418,140 432,150 420,166 434,178 428,190 462,190 454,170 468,156 452,140 464,124 452,110" class="d-ln f-d d-dg"/>' + T(440, 212, "plaie", "d-m d-b d-td");
    b += R(288, 98, 38, 104, "f-pp d-th", 4) + L(307, 98, 307, 54, "d-th") + R(294, 40, 26, 14, "f-ac d-nos", 3);
    b += P("M328,46 C346,46 350,36 342,30", "d-ac") + T(350, 30, "serrer jusqu’à l’arrêt du saignement", "d-s d-ta");
    b += A(334, 232, 410, 232, "", "") + A(410, 232, 334, 232, "", "") + T(372, 258, "5 à 8 cm au-dessus de la plaie", "d-m d-b");
    b += T(30, 70, "◄ vers le cœur", "d-b") + T(570, 70, "vers la main ou le pied ►", "d-b d-e");
    b += T(30, 296, "Noter l’heure de pose sur le garrot ou sur la victime. Ne jamais le desserrer.", "d-sg");
    return D.svg(600, 310, b, "Pose d’un garrot sur un membre : entre la plaie et le cœur, à 5 à 8 centimètres de la plaie, jamais sur une articulation");
  };

  X["med-pls"] = function () {
    var b = "", limb = ' style="stroke:var(--ink-2);stroke-width:11"';
    function Lb(x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="d-ln"' + limb + "/>"; }
    b += L(10, 256, 590, 256, "d-th");
    b += Lb(300, 226, 392, 176) + Lb(392, 176, 462, 244) + Lb(300, 240, 482, 246);
    b += R(138, 208, 170, 40, "f-pp d-th", 20);
    b += Lb(168, 214, 184, 170) + Lb(184, 170, 128, 200) + Lb(160, 244, 84, 248);
    b += C(108, 226, 24, "f-p d-th");
    b += A(70, 100, 100, 200, "a") + TL(20, 62, ["Tête en arrière,", "bouche vers le sol"], 22, "d-b");
    b += A(206, 100, 140, 192, "a") + TL(190, 62, ["Main sous", "la joue"], 22, "d-b");
    b += A(392, 100, 392, 164, "a") + TL(350, 62, ["Genou fléchi :", "stabilise le corps"], 22, "d-b");
    b += T(20, 290, "Surveiller la respiration en continu et alerter les secours (112 ou 15).", "d-sg");
    return D.svg(600, 304, b, "Position latérale de sécurité : victime couchée sur le côté, tête en arrière, jambe supérieure fléchie");
  };

  /* ===== TRANSMISSIONS ===== */
  X["rad-portee"] = function () {
    var b = "";
    b += '<path d="M0,250 L130,250 C190,250 215,112 300,112 C385,112 410,250 470,250 L600,250 L600,290 L0,290Z" class="d-ln f-v d-vg"/>';
    b += L(70, 250, 70, 190, "d-th") + L(530, 250, 530, 190, "d-th") + L(300, 112, 300, 70, "d-th");
    b += L(70, 190, 530, 190, "d-dg d-dash") + '<g class="d-ln d-dg d-th"><line x1="291" y1="181" x2="309" y2="199"/><line x1="309" y1="181" x2="291" y2="199"/></g>';
    b += L(70, 190, 300, 70, "d-ac d-th") + L(300, 70, 530, 190, "d-ac d-th");
    b += T(70, 276, "Station A", "d-m d-b") + T(530, 276, "Station B", "d-m d-b") + T(300, 56, "Relais en point haut", "d-m d-b d-ta");
    b += T(300, 226, "Liaison directe coupée par le relief", "d-m d-s d-td");
    b += T(300, 22, "VHF / UHF : propagation en vue directe. Monter en hauteur ou relayer.", "d-m d-sg");
    return D.svg(600, 300, b, "Les ondes radio VHF et UHF sont bloquées par le relief : un relais en point haut rétablit la liaison");
  };

  X["rad-pace"] = function () {
    var r = D.rows([
      { k: "P", t: "Principal", d: "Radio PMR446 sur le canal convenu" },
      { k: "A", t: "Alternatif", d: "Téléphone, SMS ou autre canal radio" },
      { k: "C", t: "Contingence", d: "Signaux visuels ou sonores, message laissé" },
      { k: "E", t: "Urgence", d: "Point de rendez-vous physique, appel du 112", f: "f-d", cf: "f-dg d-nos" }
    ], { w: 600, h: 62, gap: 14, chip: 20 });
    return D.svg(608, r.height, r.body, "Plan PACE : principal, alternatif, contingence, urgence");
  };

  /* ===== COMMANDEMENT ===== */
  X["lead-ooda"] = function () {
    var b = "";
    function node(cx, cy, t, s) { return R(cx - 78, cy - 32, 156, 64, "f-p d-th", 10) + T(cx, cy - 2, t, "d-m d-b") + T(cx, cy + 20, s, "d-m d-s d-g"); }
    b += node(280, 44, "Observer", "recueillir les faits") + node(480, 176, "S’orienter", "comprendre, interpréter") + node(280, 308, "Décider", "choisir une option") + node(80, 176, "Agir", "exécuter, tester");
    b += A(352, 64, 428, 144, "a", "d-th") + A(432, 208, 352, 288, "a", "d-th") + A(208, 288, 128, 208, "a", "d-th") + A(128, 144, 208, 64, "a", "d-th");
    b += TL(280, 168, ["Raccourcir la boucle :", "agir sur une situation avant", "qu’elle n’ait changé."], 22, "d-m d-sg");
    return D.svg(560, 352, b, "Boucle OODA : observer, s’orienter, décider, agir");
  };

  X["lead-tlp"] = function () {
    var names = ["Recevoir la mission", "Émettre un ordre préparatoire", "Établir un plan provisoire", "Lancer les préparatifs", "Reconnaître le terrain", "Finaliser le plan", "Donner l’ordre", "Superviser et ajuster"];
    var items = names.map(function (n, i) { return { k: String(i + 1), t: n, f: i === 6 ? "f-a" : "f-p" }; });
    var r = D.rows(items, { w: 600, h: 46, gap: 8, chip: 17 });
    return D.svg(608, r.height, r.body, "Les huit étapes de la conduite d’une mission");
  };

  X["lead-mett"] = function () {
    var cells = [
      ["M", ["Mission"], ["ce qu’il faut accomplir,", "et pourquoi"]],
      ["E", ["Adversaire", "ou menace"], ["risques, dangers"]],
      ["T", ["Terrain", "et météo"], ["relief, visibilité, nuit"]],
      ["T", ["Troupes", "et moyens"], ["équipe, matériel"]],
      ["T", ["Temps"], ["délais, lumière du jour"]],
      ["C", ["Considérations", "civiles"], ["population, règles"]]
    ], b = "";
    cells.forEach(function (c, i) {
      var x = (i % 3) * 200, y = Math.floor(i / 3) * 160;
      b += G(x, y, R(0, 0, 192, 150, "f-p", 8) + T(16, 52, c[0], "d-xl d-ta") + TL(16, 80, c[1], 20, "d-b") + TL(16, 124, c[2], 17, "d-sg d-g"));
    });
    return D.svg(600, 310, b, "Les six facteurs de l’analyse de situation METT-TC");
  };

  /* ===== DÉPLACEMENT ET DISCRÉTION ===== */
  X["tac-formations"] = function () {
    var b = "";
    function panel(x, y, titre, sous, dots) {
      var inner = R(0, 0, 186, 176, "f-p", 8);
      dots.forEach(function (d, i) { inner += C(d[0], d[1], 8, i === 0 ? "f-ac d-ac" : "f-pa"); });
      inner += A(168, 50, 168, 22, "", "d-l2") + T(94, 150, titre, "d-m d-b") + T(94, 168, sous, "d-m d-s d-g");
      return G(x, y, inner);
    }
    var col = [], dec = [], lig = [], coin = [[93, 44], [72, 70], [114, 70], [51, 96], [135, 96]], los = [[93, 40], [62, 74], [124, 74], [93, 108], [93, 74]], i;
    for (i = 0; i < 5; i++) { col.push([93, 30 + i * 22]); dec.push([i % 2 ? 114 : 72, 30 + i * 22]); lig.push([24 + i * 34, 80]); }
    b += panel(2, 2, "Colonne", "rapide, discrète", col) + panel(206, 2, "Colonne décalée", "plus de contrôle latéral", dec) + panel(410, 2, "Ligne", "front large, lent", lig);
    b += panel(2, 192, "Coin", "bon compromis", coin) + panel(206, 192, "Losange", "sûreté dans toutes les directions", los);
    b += G(410, 192, R(0, 0, 186, 176, "f-pp d-nos", 8) + C(22, 34, 8, "f-ac d-ac") + T(40, 40, "tête de formation", "d-s") + C(22, 64, 8, "f-pa") + T(40, 70, "membre", "d-s") + A(14, 104, 14, 88, "", "d-l2") + T(40, 100, "sens de marche", "d-s") + TL(14, 132, ["À choisir selon", "terrain, visibilité", "et risque."], 18, "d-sg d-g"));
    return D.svg(600, 372, b, "Cinq formations de déplacement : colonne, colonne décalée, ligne, coin, losange");
  };

  X["tac-halte"] = function () {
    var cx = 190, cy = 190, r = 118, b = "";
    b += C(cx, cy, r, "f-v d-vg");
    [60, 180, 300].forEach(function (a) { var p = D.pol(cx, cy, r, a); b += L(cx, cy, f(p[0]), f(p[1]), "d-dash d-l2"); });
    [[0, "Secteur 1"], [120, "Secteur 2"], [240, "Secteur 3"]].forEach(function (s) {
      var p = D.pol(cx, cy, r, s[0]), o = D.pol(cx, cy, r + 38, s[0]), m = D.pol(cx, cy, r - 40, s[0]);
      b += A(f(p[0]), f(p[1]), f(o[0]), f(o[1]), "d") + C(f(p[0]), f(p[1]), 9, "f-ac d-ac");
      b += T(f(m[0]), f(m[1]), s[1], "d-m d-s");
    });
    b += C(cx, cy, 22, "f-wa d-ct") + T(cx, cy + 5, "repos", "d-m d-s");
    b += '<polygon points="440,60 424,92 456,92" class="d-ln f-ac d-nos"/>' + T(440, 112, "Point de", "d-m d-s") + T(440, 130, "ralliement", "d-m d-s");
    b += P("M312,140 C360,120 400,100 424,94", "d-l2 d-dash");
    b += T(372, 190, "Halte de sûreté sur 360°", "d-b") + TL(372, 214, ["Chacun surveille un secteur", "vers l’extérieur. Les secteurs", "se recoupent. Un point de", "ralliement est connu de tous."], 20, "d-sg");
    return D.svg(600, 340, b, "Halte de sûreté sur 360 degrés avec trois secteurs de surveillance et un point de ralliement");
  };

  /* ===== DOCTRINE ===== */
  X["phi-manoeuvre"] = function () {
    var b = "", i;
    b += T(145, 28, "Attrition", "d-m d-b") + T(145, 48, "user l’adversaire par des chocs frontaux", "d-m d-s d-g");
    b += R(40, 64, 210, 36, "f-pp", 6) + T(145, 88, "Adversaire", "d-m d-b") + R(40, 220, 210, 36, "f-a", 6) + T(145, 244, "Nous", "d-m d-b");
    for (i = 0; i < 5; i++) b += A(62 + i * 42, 214, 62 + i * 42, 108, "d-", "d-l2");
    b += L(300, 18, 300, 270, "d-l2 d-dash d-fine");
    b += T(450, 28, "Manœuvre", "d-m d-b") + T(450, 48, "fixer, puis exploiter la brèche", "d-m d-s d-g");
    b += R(330, 64, 80, 36, "f-pp", 6) + R(490, 64, 80, 36, "f-pp", 6) + T(450, 88, "brèche", "d-m d-s d-td");
    b += R(330, 220, 240, 36, "f-a", 6) + T(450, 244, "Nous", "d-m d-b");
    b += A(366, 214, 366, 108, "d-", "d-l2 d-dash") + A(534, 214, 534, 108, "d-", "d-l2 d-dash") + T(354, 160, "fixer", "d-s d-e d-g") + T(546, 160, "fixer", "d-s d-g");
    b += A(450, 214, 450, 116, "a", "d-th") + C(450, 124, 10, "f-d d-dg") + T(472, 128, "point faible", "d-s d-td");
    return D.svg(600, 276, b, "Attrition (chocs frontaux) opposée à la manœuvre (fixer puis exploiter une brèche)");
  };

  /* ===== TIR ===== */
  X["tir-visee"] = function () {
    var b = "", ox = [0, 200, 400];
    function sight(x, px, hide, titre, sous, ok) {
      var s = R(0, 0, 188, 232, "f-p", 8);
      s += C(94, 96, 24, "f-d d-dg") + C(94, 96, 8, "f-dg d-nos");
      s += C(94, 106, 64, "d-th") + C(94, 106, 48, "d-l2 d-fine");
      s += R(px - 5, hide ? 96 : 118, 10, hide ? 62 : 40, "f-i", 2);
      s += T(94, 196, titre, "d-m d-b" + (ok ? " d-ta" : " d-td")) + T(94, 216, sous, "d-m d-s d-g");
      return G(x, 2, s);
    }
    b += sight(2, 94, false, "Correct", "guidon net et centré", true) + sight(206, 120, false, "Décentré", "tir décalé de ce côté", false) + sight(410, 94, true, "Point de visée masqué", "viser sous la cible", false);
    b += T(2, 262, "Principe : l’œil reste net sur le guidon ; la cible est légèrement floue.", "d-sg");
    return D.svg(604, 276, b, "Trois images de visée : guidon centré dans l’œilleton, guidon décentré, point de visée masqué");
  };

  X["tir-groupements"] = function () {
    var b = "", defs = [
      ["Serré et centré", "objectif atteint", [[-6, 4], [5, -5], [2, 7], [-3, -6], [7, 2]]],
      ["Serré mais décalé", "corriger le réglage", [[28, -24], [36, -28], [31, -19], [25, -29], [34, -22]]],
      ["Dispersé", "revoir la technique", [[-35, 20], [30, -30], [-20, -35], [40, 15], [5, 38]]],
      ["Dispersion verticale", "souffle, appui, tenue", [[2, -42], [-4, -25], [3, -6], [-3, 18], [2, 38]]]
    ];
    defs.forEach(function (d, i) {
      var x = 74 + i * 150, y = 78;
      b += C(x, y, 62, "f-p") + C(x, y, 41, "d-l2") + C(x, y, 20, "d-l2");
      d[2].forEach(function (p) { b += C(x + p[0], y + p[1], 4.5, "f-dg d-nos"); });
      b += T(x, 172, d[0], "d-m d-b") + T(x, 192, d[1], "d-m d-s d-g");
    });
    return D.svg(600, 206, b, "Quatre groupements de tir : serré et centré, serré mais décalé, dispersé, dispersion verticale");
  };

  /* ===== FORME PHYSIQUE ===== */
  X["fit-piliers"] = function () {
    var b = "", pil = [["Physique", ["force", "endurance", "mobilité"]], ["Nutrition", ["variété", "hydratation", "régularité"]], ["Sommeil", ["7 à 9 h", "horaires stables", "récupération"]], ["Mental", ["gérer le stress", "attention", "respiration"]], ["Sens et valeurs", ["but", "équipe", "éthique"]]];
    b += '<polygon points="6,84 300,14 594,84" class="d-ln f-pp"/>' + T(300, 66, "Performance durable", "d-m d-b");
    pil.forEach(function (p, i) {
      var x = 18 + i * 115;
      b += R(x, 96, 104, 150, "f-p", 4) + TL(x + 52, 122, p[0].length > 9 ? p[0].split(" ").length > 1 ? ["Sens et", "valeurs"] : [p[0]] : [p[0]], 20, "d-m d-b");
      p[1].forEach(function (w, j) { b += T(x + 52, 176 + j * 22, w, "d-m d-s d-g"); });
    });
    b += R(6, 252, 588, 22, "f-pp", 3);
    return D.svg(600, 284, b, "Cinq piliers de la performance : physique, nutrition, sommeil, mental, sens et valeurs");
  };

  /* ===== FROID ===== */
  X["cold-cold"] = function () {
    var t = [["C", "Clean", "Propre", ["La saleté et la", "sueur réduisent", "l’isolation."]], ["O", "Overheating", "Éviter la surchauffe", ["Retirer une", "couche avant de", "transpirer."]], ["L", "Loose, layers", "Ample, en couches", ["L’air emprisonné", "isole ; le serré", "comprime."]], ["D", "Dry", "Sec", ["L’humidité fait", "perdre la chaleur", "très vite."]]], b = "";
    t.forEach(function (c, i) {
      b += G(2 + i * 150, 2, R(0, 0, 142, 214, "f-p", 8) + T(14, 56, c[0], "d-xl d-ta") + T(48, 54, c[1], "d-s d-g") + TL(14, 92, c[2].length > 14 ? c[2].split(" ").length > 2 ? [c[2].split(" ").slice(0, 2).join(" "), c[2].split(" ").slice(2).join(" ")] : [c[2]] : [c[2]], 21, "d-b") + TL(14, 148, c[3], 19, "d-sg"));
    });
    return D.svg(604, 222, b, "Acronyme COLD : propre, éviter la surchauffe, ample et en couches, sec");
  };

  X["cold-couches"] = function () {
    var b = "";
    b += R(70, 36, 80, 170, "f-a", 0) + R(150, 36, 120, 170, "f-wa", 0) + R(270, 36, 34, 170, "f-pp d-th", 0);
    b += T(50, 126, "Peau", "d-e d-b");
    [70, 112, 154].forEach(function (y) { b += A(82, y, 420, y, "a", "d-dash"); });
    [91, 133, 175].forEach(function (y) { b += A(500, y, 312, y, "d", "d-th"); });
    b += T(330, 50, "sueur évacuée vers l’extérieur", "d-s d-ta") + T(392, 208, "vent et pluie arrêtés", "d-s d-td");
    b += C(110, 230, 13, "f-ac d-nos") + T(110, 236, "1", "d-m d-b d-on") + TL(130, 226, ["Couche de base :", "évacue la sueur"], 18, "d-s");
    b += C(240, 230, 13, "f-ac d-nos") + T(240, 236, "2", "d-m d-b d-on") + TL(260, 226, ["Isolation :", "piège l’air"], 18, "d-s");
    b += C(390, 230, 13, "f-ac d-nos") + T(390, 236, "3", "d-m d-b d-on") + TL(410, 226, ["Coque : coupe le", "vent et la pluie"], 18, "d-s");
    return D.svg(600, 272, b, "Système de trois couches : couche de base, isolation et coque de protection");
  };
})();
