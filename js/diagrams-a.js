/* Schémas — navigation terrestre et survie */
(function () {
  "use strict";
  var D = MT.d, T = D.T, TL = D.TL, L = D.L, P = D.P, R = D.R, C = D.C, A = D.A, f = D.f, G = D.G;
  var X = MT.diagrams;

  /* ===== NAVIGATION ===== */
  X["nav-relief"] = function () {
    function panel(x, y, titre, sous, inner) {
      return G(x, y, R(0, 0, 290, 160, "f-p", 8) + inner + T(12, 130, titre, "d-b") + T(12, 150, sous, "d-sg d-g"));
    }
    var colline = [[100, 46], [72, 32], [46, 20], [20, 8]].map(function (r, i) {
      return D.E(145, 64, r[0], r[1], "d-ct" + (i % 3 === 0 ? " d-th" : ""));
    }).join("") + T(137, 68, "130", "d-s d-g");
    var vallee = "";
    for (var i = 0; i < 4; i++) { var yy = 84 - i * 20; vallee += P("M55," + (yy + 30) + " Q145," + (yy - 34) + " 235," + (yy + 30), "d-ct"); }
    vallee += P("M145,8 L145,112", "d-wt d-dash") + T(153, 20, "ruisseau", "d-s d-ta");
    var eperon = "";
    for (var j = 0; j < 4; j++) { var y2 = 10 + j * 20; eperon += P("M55," + (y2 - 4) + " Q145," + (y2 + 66) + " 235," + (y2 - 4), "d-ct"); }
    var col = G(0, -10, P("M30,70 C30,22 118,20 145,56 C172,20 260,22 260,70 C260,118 172,122 145,86 C118,122 30,118 30,70Z", "d-ct d-th") +
      D.E(78, 70, 32, 22, "d-ct") + D.E(212, 70, 32, 22, "d-ct") + C(145, 71, 5, "f-ac d-nos") + T(154, 62, "col", "d-s d-ta"));
    return D.svg(600, 342,
      panel(5, 5, "Colline", "courbes fermées, cotes croissantes", colline) +
      panel(305, 5, "Vallée", "courbes en « V » pointant vers l’amont", vallee) +
      panel(5, 177, "Éperon", "courbes en « V » pointant vers l’aval", eperon) +
      panel(305, 177, "Col", "selle entre deux sommets", col),
      "Quatre formes de relief représentées par leurs courbes de niveau : colline, vallée, éperon, col");
  };

  X["nav-azimut"] = function () {
    var cx = 240, cy = 190, r = 138, b = "";
    b += C(cx, cy, r, "f-p") + C(cx, cy, r - 22, "d-l2 d-fine");
    for (var a = 0; a < 360; a += 10) {
      var p1 = D.pol(cx, cy, r, a), p2 = D.pol(cx, cy, r - (a % 30 === 0 ? 14 : 7), a);
      b += L(f(p1[0]), f(p1[1]), f(p2[0]), f(p2[1]), a % 90 === 0 ? "" : "d-l2");
    }
    [["N", 0], ["E", 90], ["S", 180], ["O", 270]].forEach(function (k) {
      var p = D.pol(cx, cy, r + 20, k[1]); b += T(f(p[0]), f(p[1] + 6), k[0], "d-m d-b" + (k[0] === "N" ? " d-td" : ""));
    });
    [120, 150, 210, 300, 330].forEach(function (g) { var p = D.pol(cx, cy, r - 32, g); b += T(f(p[0]), f(p[1] + 5), g, "d-m d-s d-g"); });
    var t = D.pol(cx, cy, r - 6, 60), tb = D.pol(cx, cy, r - 6, 240);
    b += A(cx, cy, f(t[0]), f(t[1]), "a", "d-th") + L(cx, cy, f(tb[0]), f(tb[1]), "d-dash d-l2");
    var a1 = D.pol(cx, cy, 78, 0), a2 = D.pol(cx, cy, 78, 60);
    b += P("M" + f(a1[0]) + "," + f(a1[1]) + " A78,78 0 0 1 " + f(a2[0]) + "," + f(a2[1]), "d-dg d-th an-draw");
    b += T(cx + 20, cy - 36, "60°", "d-b d-td") + C(cx, cy, 5, "f-i");
    b += TL(f(tb[0]) - 10, f(tb[1]) + 22, ["240°", "(azimut inverse)"], 18, "d-e d-s d-g");
    var x = 440;
    b += T(x, 96, "Azimut", "d-b") + T(x, 120, "Angle mesuré depuis le Nord,", "d-sg d-g") + T(x, 140, "dans le sens horaire, de 0° à 360°.", "d-sg d-g");
    b += T(x, 184, "Azimut inverse", "d-b") + T(x, 208, "= azimut + 180° (si < 180°)", "d-sg d-g") + T(x, 228, "ou azimut − 180° (si ≥ 180°).", "d-sg d-g");
    b += T(x, 272, "Équivalences", "d-b") + T(x, 296, "360° = 400 grades", "d-sg d-g") + T(x, 316, "= 6 400 millièmes OTAN", "d-sg d-g");
    return D.svg(700, 380, b, "Rose des azimuts : azimut de 60 degrés et azimut inverse de 240 degrés");
  };

  X["nav-nords"] = function () {
    var ox = 190, oy = 270, len = 200, b = "";
    function end(deg) { var p = D.pol(ox, oy, len, deg); return [f(p[0]), f(p[1])]; }
    var ng = end(0), nm = end(13), nl = end(-8);
    b += L(ox, oy, ng[0], ng[1], "d-th") + L(ox, oy, nm[0], nm[1], "d-dg d-th") + L(ox, oy, nl[0], nl[1], "d-ac d-th");
    b += C(ox, oy, 6, "f-i");
    b += T(ox, 38, "NG", "d-m d-xl") + T(f(nm[0]) + 18, f(nm[1]) + 14, "NM", "d-xl d-td") + T(f(nl[0]) - 18, f(nl[1]) + 14, "NL", "d-e d-xl d-ta");
    var p1 = D.pol(ox, oy, 120, 0), p2 = D.pol(ox, oy, 120, 13), q1 = D.pol(ox, oy, 150, 0), q2 = D.pol(ox, oy, 150, -8);
    b += P("M" + f(p1[0]) + "," + f(p1[1]) + " A120,120 0 0 1 " + f(p2[0]) + "," + f(p2[1]), "d-dg");
    b += P("M" + f(q1[0]) + "," + f(q1[1]) + " A150,150 0 0 0 " + f(q2[0]) + "," + f(q2[1]), "d-ac");
    b += T(ox + 40, oy - 96, "déclinaison", "d-s d-td") + T(ox - 28, oy - 128, "convergence", "d-s d-ta d-e");
    var x = 330;
    b += T(x, 70, "Trois nords sur une carte", "d-b");
    b += T(x, 104, "NG  Nord géographique", "d-t") + T(x, 124, "Direction du pôle Nord vrai.", "d-sg d-g");
    b += T(x, 160, "NL  Nord de la grille", "d-t d-ta") + T(x, 180, "Lignes du quadrillage (Lambert, UTM).", "d-sg d-g");
    b += T(x, 216, "NM  Nord magnétique", "d-t d-td") + T(x, 236, "Direction indiquée par l’aiguille.", "d-sg d-g");
    b += T(x, 284, "Les angles et leur sens (E/O) sont", "d-sg") + T(x, 304, "indiqués dans la marge de la carte :", "d-sg") + T(x, 324, "ils évoluent avec les années.", "d-sg");
    return D.svg(640, 330, b, "Nord géographique, nord de la grille et nord magnétique : trois directions différentes");
  };

  X["nav-coord"] = function () {
    var x0 = 50, y0 = 28, s = 58, b = "", i;
    b += R(x0, y0, s * 5, s * 5, "f-p", 2);
    b += R(x0 + s * 2, y0 + s * 1, s, s, "f-a d-ac", 0);
    for (i = 0; i <= 5; i++) {
      b += L(x0 + i * s, y0, x0 + i * s, y0 + s * 5, "d-l2 d-fine") + L(x0, y0 + i * s, x0 + s * 5, y0 + i * s, "d-l2 d-fine");
      b += T(x0 + i * s, y0 + s * 5 + 24, 31 + i, "d-m d-s") + T(x0 - 10, y0 + i * s + 5, 76 - i, "d-e d-s");
    }
    var px = x0 + 2.6 * s, py = y0 + 1.6 * s;
    b += L(px, py, px, y0 + s * 5, "d-dash d-dg d-fine") + L(px, py, x0, py, "d-dash d-dg d-fine") + C(px, py, 6, "f-dg d-nos");
    b += T(px + 10, py - 8, "point", "d-s d-td");
    b += T(x0 + 150, y0 + s * 5 + 52, "X : Est (vers la droite)", "d-s d-g");
    b += T(366, 64, "Lire dans cet ordre", "d-b") + T(366, 92, "1. vers la droite (X, Est)", "d-sg") + T(366, 114, "2. puis vers le haut (Y, Nord)", "d-sg");
    b += T(366, 156, "Carré (1 km)", "d-b") + T(366, 182, "X 33 · Y 74  →  3374", "d-sg") + T(366, 220, "Point (précision 100 m)", "d-b") + T(366, 246, "X 33,6 · Y 74,4  →  336744", "d-sg");
    b += T(366, 284, "Astuce : « on entre dans la maison", "d-sg d-g") + T(366, 304, "avant de monter l’escalier ».", "d-sg d-g");
    return D.svg(640, 372, b, "Lecture de coordonnées sur un quadrillage : d’abord vers la droite, puis vers le haut");
  };

  X["nav-boussole"] = function () {
    var b = "";
    b += R(36, 14, 168, 322, "f-a d-ac", 14);
    for (var i = 0; i < 20; i++) b += L(36, 300 - i * 6, i % 5 === 0 ? 52 : 45, 300 - i * 6, "d-l2 d-fine");
    b += A(120, 108, 120, 34, "a", "d-th");
    b += C(120, 176, 70, "f-p") + C(120, 176, 54, "d-l2 d-fine");
    for (var a = 0; a < 360; a += 15) { var p1 = D.pol(120, 176, 70, a), p2 = D.pol(120, 176, a % 90 === 0 ? 58 : 64, a); b += L(f(p1[0]), f(p1[1]), f(p2[0]), f(p2[1]), "d-l2 d-fine"); }
    b += L(100, 130, 100, 222, "d-l2 d-fine") + L(140, 130, 140, 222, "d-l2 d-fine");
    b += '<g transform="rotate(-24 120 176)"><polygon points="120,118 112,176 128,176" class="d-ln f-dg d-nos"/><polygon points="120,234 112,176 128,176" class="d-ln f-pa"/></g>';
    b += T(120, 126, "N", "d-m d-s d-g");
    var lab = [[1, "Flèche de direction", "sens de la marche", 120, 70], [2, "Plaque de base", "règle graduée, rapporteur", 44, 250], [3, "Limbe tournant", "graduation 0–360° (ou 0–6 400)", 169, 127], [4, "Aiguille aimantée", "pointe rouge = Nord magnétique", 106, 140], [5, "Lignes d’orientation", "à aligner avec le quadrillage", 140, 205], [6, "Index de lecture", "valeur de l’azimut", 120, 108]];
    lab.forEach(function (l) {
      var y = 40 + (l[0] - 1) * 52;
      b += L(237, y - 6, l[3], l[4], "d-l2 d-fine d-dot") + C(l[3], l[4], 3.5, "f-ac d-nos");
      b += C(250, y - 6, 13, "f-ac d-nos") + T(250, y, l[0], "d-m d-b d-on") + T(276, y - 4, l[1], "d-b") + T(276, y + 16, l[2], "d-sg d-g");
    });
    return D.svg(640, 350, b, "Schéma d’une boussole à plaque transparente avec ses éléments numérotés");
  };

  X["nav-intersection"] = function () {
    var b = "";
    b += R(10, 10, 540, 320, "f-p", 10);
    b += '<polygon points="130,48 112,86 148,86" class="d-ln f-ac d-nos"/>' + L(130, 86, 130, 98) + T(130, 38, "Clocher", "d-m d-b");
    b += '<polygon points="440,70 424,104 456,104" class="d-ln f-ac d-nos"/>' + L(440, 104, 440, 116) + T(440, 58, "Pylône", "d-m d-b");
    b += L(130, 98, 282, 252, "d-ac d-th") + L(440, 116, 292, 252, "d-ac d-th");
    b += L(268, 238, 282, 252, "d-dg d-th") + L(296, 238, 282, 252, "d-dg d-th");
    b += '<g class="d-ln d-dg d-th"><line x1="272" y1="242" x2="292" y2="262"/><line x1="292" y1="242" x2="272" y2="262"/></g>' + T(282, 288, "Vous êtes ici", "d-m d-b d-td");
    b += T(168, 190, "azimut inverse du clocher", "d-s d-ta d-e") + T(402, 196, "azimut inverse du pylône", "d-s d-ta");
    b += A(520, 70, 520, 30, "", "d-th") + T(520, 24, "N", "d-m d-b");
    return D.svg(560, 340, b, "Recoupement : deux repères visés, les azimuts inverses se croisent à votre position");
  };

  /* ===== SURVIE ===== */
  X["surv-regle3"] = function () {
    var rows = [["3 minutes", "Sans air (noyade, étouffement)", 40, "f-dg"], ["3 heures", "Sans abri, par froid ou chaleur extrêmes", 191, "f-ct"], ["3 jours", "Sans eau", 307, "f-ac"], ["3 semaines", "Sans nourriture", 378, "f-vg"]], b = "";
    rows.forEach(function (r, i) {
      var y = 14 + i * 74;
      b += T(0, y + 24, r[0], "d-b") + R(140, y, 440, 36, "f-pp d-l2 d-fine", 6) + R(140, y, r[2] + 40, 36, r[3] + " d-nos", 6) + T(140, y + 56, r[1], "d-sg d-g");
    });
    b += T(0, 318, "Ordres de grandeur, sur une échelle logarithmique :", "d-sg d-g") + T(0, 338, "ils varient selon l’état de la personne et le climat.", "d-sg d-g");
    return D.svg(600, 352, b, "Règle des trois : 3 minutes sans air, 3 heures sans abri, 3 jours sans eau, 3 semaines sans nourriture");
  };

  X["surv-priorites"] = function () {
    var items = [
      { k: "1", t: "Sécurité immédiate", d: "Quitter le danger, ne pas aggraver la situation", f: "f-d", cf: "f-dg d-nos" },
      { k: "2", t: "Soins", d: "Hémorragies, voies aériennes, hypothermie", f: "f-d", cf: "f-dg d-nos" },
      { k: "3", t: "Protection thermique et abri", d: "Vêtements, isolation du sol, abri", f: "f-wa" },
      { k: "4", t: "Eau", d: "Source sûre, filtration, ébullition", f: "f-a" },
      { k: "5", t: "Feu", d: "Chaleur, eau potable, moral, signal", f: "f-a" },
      { k: "6", t: "Signalisation et secours", d: "Rendre sa position visible, alerter", f: "f-p" },
      { k: "7", t: "Nourriture", d: "Rarement urgente : bien après le reste", f: "f-p" }
    ];
    var r = D.rows(items, { w: 600, h: 54, gap: 8, chip: 18, funnel: 0 });
    return D.svg(608, r.height, r.body, "Ordre des priorités de survie, de la sécurité immédiate à la nourriture");
  };

  X["surv-abri"] = function () {
    var b = "";
    b += P("M10,250 L590,250", "d-th");
    for (var i = 0; i < 24; i++) b += L(20 + i * 24, 250, 10 + i * 24, 260, "d-l2 d-fine");
    b += A(30, 66, 100, 66, "a", "d-th") + T(30, 50, "Vent dominant", "d-b d-ta");
    b += '<polygon points="118,250 328,118 340,132 140,250" class="d-ln f-v d-vg d-th"/>' + L(334, 124, 334, 250, "d-th");
    b += R(140, 238, 180, 12, "f-v d-vg", 3);
    b += C(160, 226, 9, "f-p") + L(169, 228, 300, 232, "d-th");
    b += A(210, 102, 190, 160, "", "d-l2") + T(210, 96, "Toit en couches (feuillage, écorce, bâche)", "d-sg");
    b += T(30, 284, "Litière isolante épaisse (feuilles, branches)", "d-sg");
    b += R(480, 188, 16, 62, "f-pp", 3) + '<path d="M425,250 C418,232 432,226 430,214 C440,222 446,232 440,250Z" class="d-ln f-dg d-nos"/>';
    b += A(416, 232, 346, 232, "", "d-l2");
    b += T(488, 178, "Réflecteur", "d-s d-m") + T(433, 204, "Feu", "d-s d-td d-m") + T(380, 224, "chaleur", "d-s d-g d-m");
    b += T(300, 316, "Ouverture du côté du feu, dos au vent", "d-b");
    return D.svg(600, 330, b, "Coupe d’un abri adossé : toit incliné, litière isolante, feu et réflecteur du côté de l’ouverture");
  };

  X["surv-feu"] = function () {
    var b = "", i;
    function panel(x, titre, sous, inner) { return G(x, 4, R(0, 0, 190, 214, "f-p", 8) + inner + T(95, 188, titre, "d-m d-b") + T(95, 206, sous, "d-m d-sg d-g")); }
    var tipi = L(40, 150, 95, 40) + L(150, 150, 95, 40) + L(95, 150, 95, 40) + L(72, 150, 95, 70, "d-l2") + C(95, 140, 9, "f-wa d-ct") + '<path d="M95,40 C86,28 100,24 96,12 C108,22 108,34 95,40Z" class="d-ln f-dg d-nos an-flame"/>';
    var cab = "";
    for (i = 0; i < 4; i++) {
      if (i % 2 === 0) cab += C(52, 142 - i * 18, 8, "f-ct") + C(138, 142 - i * 18, 8, "f-ct");
      else cab += R(40, 133 - i * 18, 110, 14, "f-ct", 6);
    }
    cab += C(95, 142, 9, "f-wa d-ct");
    var lean = R(30, 118, 130, 14, "f-ct", 6) + L(158, 154, 50, 132) + L(130, 154, 70, 132) + L(102, 154, 90, 132) + C(120, 146, 8, "f-wa d-ct") + L(20, 154, 170, 154, "d-th");
    b = panel(4, "Tipi", "démarrage rapide", tipi) + panel(204, "Chalet", "braises durables", cab) + panel(404, "Adossé", "pour le vent", lean);
    b += R(4, 232, 590, 66, "f-pp", 8) + T(20, 258, "Amadou (matière fine, très sèche)  →  petit bois (crayon)  →  bois plus gros.", "d-b") + T(20, 284, "Préparer tout le combustible avant d’allumer. Isoler le foyer du sol humide.", "d-sg");
    return D.svg(600, 306, b, "Trois façons de monter un feu : tipi, chalet et adossé");
  };

  X["surv-signaux"] = function () {
    var items = [["V", ["Besoin", "d’assistance"], "M22,24 L50,96 L78,24"], ["X", ["Besoin d’aide", "médicale"], "M24,24 L76,96 M76,24 L24,96"], ["N", ["Non", "(négatif)"], "M26,96 L26,24 L74,96 L74,24"], ["Y", ["Oui", "(affirmatif)"], "M20,24 L50,62 L80,24 M50,62 L50,98"], ["→", ["Nous allons dans", "cette direction"], "M18,60 L84,60 M62,36 L84,60 L62,84"]], b = "";
    items.forEach(function (it, i) {
      var x = 6 + i * 118;
      b += G(x, 6, R(0, 0, 108, 118, "f-p", 8) + P(it[2], "d-th d-dg an-draw") + TL(54, 142, it[1], 18, "d-m d-s"));
    });
    b += TL(6, 214, ["Signes de grande taille (3 m ou plus), contrastés avec le sol,", "visibles depuis le ciel.", "Appel de détresse universel : trois signaux répétés", "(sifflet, feux, éclats de miroir ou de lampe)."], 22, "d-sg");
    return D.svg(600, 300, b, "Code de signaux sol-air : V, X, N, Y et la flèche");
  };

  X["orient-nature"] = function () {
    var b = "", cx = 150, cy = 150;
    b += C(cx, cy, 92, "f-p d-th");
    for (var h = 0; h < 12; h++) { var p1 = D.pol(cx, cy, 92, h * 30), p2 = D.pol(cx, cy, 81, h * 30); b += L(f(p1[0]), f(p1[1]), f(p2[0]), f(p2[1])); var pn = D.pol(cx, cy, 68, h * 30); if (h % 3 === 0) b += T(f(pn[0]), f(pn[1] + 6), h === 0 ? 12 : h, "d-m d-s d-g"); }
    var hh = D.pol(cx, cy, 54, 120), mm = D.pol(cx, cy, 76, 0), sud = D.pol(cx, cy, 138, 60), sol = D.pol(cx, cy, 118, 120);
    b += L(cx, cy, f(hh[0]), f(hh[1]), "d-th d-ac") + L(cx, cy, f(mm[0]), f(mm[1]), "d-l2 d-th") + L(cx, cy, f(sud[0]), f(sud[1]), "d-dg d-dash d-th") + C(cx, cy, 5, "f-i");
    b += C(f(sol[0]), f(sol[1]), 12, "f-wa d-ct") + T(f(sol[0]) + 18, f(sol[1]) + 6, "Soleil", "d-s");
    b += T(f(sud[0]) + 8, f(sud[1]) - 2, "SUD", "d-b d-td");
    b += TL(cx, 282, ["Montre : l’aiguille des heures", "vise le Soleil ; le Sud est à", "mi-chemin entre elle et 12 h."], 20, "d-m d-sg");
    b += TL(cx, 352, ["Heure d’été : prendre 13 h", "à la place de 12 h."], 18, "d-m d-s d-g");
    var ox = 480;
    b += R(330, 12, 300, 252, "f-p", 8);
    b += T(ox, 38, "Bâton et ombre (vu du dessus)", "d-m d-b");
    b += C(ox, 236, 7, "f-i") + T(ox + 14, 254, "bâton", "d-s");
    b += L(ox, 236, 428, 124, "d-l2") + L(ox, 236, 540, 118, "d-l2") + C(428, 124, 5, "f-ac d-nos") + C(540, 118, 5, "f-ac d-nos");
    b += T(414, 112, "1", "d-b") + T(548, 108, "2", "d-b");
    b += A(354, 126, 612, 116, "a", "d-th") + T(340, 148, "Ouest", "d-s d-ta") + T(584, 140, "Est", "d-s d-ta");
    b += A(484, 114, 484, 58, "", "d-th") + T(496, 70, "Nord", "d-b");
    b += TL(ox, 292, ["Marquer le bout de l’ombre,", "attendre 15 min, marquer", "de nouveau : la ligne 1 → 2", "va de l’Ouest vers l’Est."], 20, "d-m d-sg");
    return D.svg(640, 384, b, "S’orienter sans boussole avec une montre analogique et avec l’ombre d’un bâton");
  };

  X["orient-polaire"] = function () {
    var b = "", st = { al: [130, 360], mi: [190, 342], ao: [262, 352], me: [330, 340], ph: [326, 388], mr: [420, 394], du: [432, 348] }, k;
    b += L(10, 420, 590, 420, "d-th");
    var path = [["al", "mi"], ["mi", "ao"], ["ao", "me"], ["me", "du"], ["du", "mr"], ["mr", "ph"], ["ph", "me"]];
    path.forEach(function (p) { b += L(st[p[0]][0], st[p[0]][1], st[p[1]][0], st[p[1]][1], "d-l2"); });
    var vx = st.du[0] - st.mr[0], vy = st.du[1] - st.mr[1];
    b += L(st.mr[0], st.mr[1], st.du[0] + 5 * vx, st.du[1] + 5 * vy, "d-ac d-dash d-th");
    for (k = 1; k <= 4; k++) { var x = st.du[0] + k * vx, y = st.du[1] + k * vy; b += C(f(x), f(y), 3.5, "f-ac d-nos") + T(f(x + 14), f(y + 5), k + " ×", "d-s d-ta"); }
    for (var n in st) b += C(st[n][0], st[n][1], 6, "f-i");
    var pl = [st.du[0] + 5 * vx, st.du[1] + 5 * vy];
    b += C(f(pl[0]), f(pl[1]), 11, "f-wa d-ct d-th") + T(f(pl[0]) - 20, f(pl[1]) + 6, "Étoile polaire (5 ×)", "d-b d-e");
    b += T(st.du[0] + 14, st.du[1] - 6, "Dubhe", "d-s") + T(st.mr[0] + 12, st.mr[1] + 6, "Mérak", "d-s") + T(110, 322, "Grande Ourse (le « Chariot »)", "d-b");
    b += A(f(pl[0]), f(pl[1]) + 16, f(pl[0]), 408, "", "d-l2 d-dash") + T(f(pl[0]) + 10, 412, "NORD", "d-b d-td");
    b += TL(20, 40, ["Reporter 5 fois la distance entre les deux étoiles du bord", "du « chariot », en suivant la ligne de Mérak vers Dubhe."], 22, "d-sg");
    return D.svg(600, 432, b, "Trouver l’étoile polaire à partir de la Grande Ourse");
  };
})();
