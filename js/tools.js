/* Manuel de terrain — outils interactifs (calculs locaux, aucune donnée envoyée). */
(function () {
  "use strict";
  var MT = window.MT;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var num = function (v) { var n = parseFloat(String(v).replace(",", ".")); return isNaN(n) ? null : n; };
  var mod = function (a, n) { return ((a % n) + n) % n; };
  var r1 = function (n, d) { var p = Math.pow(10, d == null ? 1 : d); return Math.round(n * p) / p; };
  var fr = function (n, d) { return String(r1(n, d)).replace(".", ","); };
  var pad = function (n, l) { n = String(n); while (n.length < (l || 2)) n = "0" + n; return n; };
  function field(id, label, value, extra) { return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" value="' + esc(value == null ? "" : value) + '" ' + (extra || 'inputmode="decimal"') + "></div>"; }
  function card(title, help, inner) { return '<div class="tool" style="margin-bottom:18px"><h3>' + title + "</h3>" + (help ? '<p class="h">' + help + "</p>" : "") + inner + "</div>"; }
  function q(root, id) { return root.querySelector("#" + id); }
  function copy(text, btn) {
    function done() { var o = btn.textContent; btn.textContent = "Copié ✓"; setTimeout(function () { btn.textContent = o; }, 1500); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { fallback(); });
    else fallback();
    function fallback() { var t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); done(); } catch (e) {} t.remove(); }
  }
  function T(id, titre, desc, mount) { MT.tools.push({ id: id, titre: titre, desc: desc, mount: mount }); }

  /* ---------- 1. angles et nords ---------- */
  T("azimut", "Angles, azimuts et nords", "Degrés, grades, millièmes OTAN, azimut inverse, conversion magnétique, géographique et grille.", function (root) {
    var rose = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
    root.innerHTML =
      card("Conversion d’unités", "Saisissez une valeur dans n’importe quel champ.", '<div class="row">' + field("d", "Degrés (0–360)", "60") + field("g", "Grades (0–400)", "66,7") + field("m", "Millièmes OTAN (0–6 400)", "1067") + '</div><div class="out plain" id="o1"></div>') +
      card("Du compas à la carte", "Déclinaison et convergence : Est positif, Ouest négatif. Les valeurs sont dans la marge de la carte.", '<div class="row">' + field("am", "Azimut magnétique (°)", "60") + field("dec", "Déclinaison magnétique (°)", "1") + field("cv", "Convergence des méridiens (°)", "0,5") + '</div><div class="out plain" id="o2"></div>');
    function conv(from) {
      var d;
      if (from === "d") d = num(q(root, "d").value); else if (from === "g") { d = num(q(root, "g").value); d = d == null ? null : d * 0.9; } else { d = num(q(root, "m").value); d = d == null ? null : d * 360 / 6400; }
      if (d == null) return;
      d = mod(d, 360);
      if (from !== "d") q(root, "d").value = fr(d, 2);
      if (from !== "g") q(root, "g").value = fr(d / 0.9, 2);
      if (from !== "m") q(root, "m").value = fr(d * 6400 / 360, 1);
      var inv = mod(d + 180, 360);
      q(root, "o1").innerHTML = '<div class="kv"><span>Azimut inverse</span><span>' + fr(inv, 1) + "° (" + fr(inv / 0.9, 1) + " gr · " + fr(inv * 6400 / 360, 0) + " ‰)</span><span>Direction</span><span>" + rose[Math.round(d / 22.5) % 16] + "</span><span>Repère</span><span>1 millième ≈ 1 m à 1 000 m</span></div>";
    }
    ["d", "g", "m"].forEach(function (k) { q(root, k).addEventListener("input", function () { conv(k); }); });
    function nords() {
      var am = num(q(root, "am").value), dc = num(q(root, "dec").value), cv = num(q(root, "cv").value);
      if (am == null) return; dc = dc || 0; cv = cv || 0;
      var ag = mod(am + dc, 360), gis = mod(ag - cv, 360);
      q(root, "o2").innerHTML = '<div class="kv"><span>Azimut géographique</span><span><b>' + fr(ag, 1) + "°</b> = magnétique + déclinaison</span><span>Gisement (grille)</span><span><b>" + fr(gis, 1) + "°</b> = géographique − convergence</span><span>Sens inverse</span><span>Carte → terrain : azimut magnétique = géographique − déclinaison</span></div>";
    }
    ["am", "dec", "cv"].forEach(function (k) { q(root, k).addEventListener("input", nords); });
    conv("d"); nords();
  });

  /* ---------- 2. pas et marche ---------- */
  T("pas", "Estime du pas et temps de marche", "Distance parcourue d’après vos pas doubles, et durée d’un itinéraire (règle de Naismith).", function (root) {
    root.innerHTML =
      card("Distance au pas", "Comptez un pas à chaque fois que le pied droit touche le sol (= un pas double). Étalonnez-vous sur 100 m connus, avec votre équipement.", '<div class="row">' + field("c", "Pas doubles pour 100 m", "65") + field("n", "Pas doubles comptés", "130") + '</div><div class="out plain" id="o1"></div>') +
      card("Temps de marche", "Règle de Naismith : 1 h pour 5 km, plus 1 h par 600 m de montée. Ajoutez du temps pour la charge, la fatigue, la neige ou la nuit.", '<div class="row">' + field("km", "Distance (km)", "12") + field("up", "Dénivelé positif cumulé (m)", "700") + field("v", "Vitesse sur le plat (km/h)", "5") + field("pa", "Pauses (% du temps)", "15") + '</div><div class="out plain" id="o2"></div>');
    function a() {
      var c = num(q(root, "c").value), n = num(q(root, "n").value); if (!c || n == null) return;
      var m = n / c * 100;
      q(root, "o1").innerHTML = '<span class="big">' + Math.round(m) + " m</span>≈ " + fr(m / 1000, 2) + " km. L’erreur typique est de 5 à 10 % ; elle augmente en pente, en terrain accidenté ou chargé.";
    }
    function b() {
      var km = num(q(root, "km").value), up = num(q(root, "up").value) || 0, v = num(q(root, "v").value) || 5, pa = num(q(root, "pa").value) || 0; if (km == null) return;
      var h = km / v + up / 600, tot = h * (1 + pa / 100), hh = Math.floor(tot), mm = Math.round((tot - hh) * 60);
      if (mm === 60) { hh++; mm = 0; }
      q(root, "o2").innerHTML = '<span class="big">' + hh + " h " + pad(mm) + "</span>dont " + fr(h, 2) + " h de marche effective, pauses comprises à " + fr(pa, 0) + " %. Prévoyez la lumière du jour pour tout le trajet.";
    }
    ["c", "n"].forEach(function (k) { q(root, k).addEventListener("input", a); });
    ["km", "up", "v", "pa"].forEach(function (k) { q(root, k).addEventListener("input", b); });
    a(); b();
  });

  /* ---------- 3. échelle et pente ---------- */
  T("echelle", "Échelle et pente", "Convertir une mesure sur la carte en distance réelle, et calculer une pente.", function (root) {
    root.innerHTML =
      card("Échelle de la carte", "Exemple : sur une carte au 1 : 25 000, 4 cm représentent 1 km.", '<div class="row"><div class="field"><label for="sc">Échelle</label><select id="sc"><option value="10000">1 : 10 000</option><option value="25000" selected>1 : 25 000</option><option value="50000">1 : 50 000</option><option value="100000">1 : 100 000</option></select></div>' + field("cm", "Mesure sur la carte (cm)", "6,5") + field("mm", "…ou distance réelle (m)", "") + '</div><div class="out plain" id="o1"></div>') +
      card("Pente", "Dénivelé et distance horizontale, lus sur la carte (courbes de niveau).", '<div class="row">' + field("dz", "Dénivelé (m)", "100") + field("dx", "Distance horizontale (m)", "500") + '</div><div class="out plain" id="o2"></div>');
    function a(from) {
      var s = num(q(root, "sc").value);
      if (from === "mm") { var m = num(q(root, "mm").value); if (m == null) return; q(root, "cm").value = fr(m * 100 / s, 2); }
      var cm = num(q(root, "cm").value); if (cm == null) return;
      var real = cm * s / 100;
      if (from !== "mm") q(root, "mm").value = fr(real, 0);
      q(root, "o1").innerHTML = '<span class="big">' + fr(real, 0) + " m</span>" + fr(cm, 2) + " cm sur la carte à l’échelle 1 : " + s.toLocaleString("fr-FR") + ".";
    }
    function p() {
      var dz = num(q(root, "dz").value), dx = num(q(root, "dx").value); if (dz == null || !dx) return;
      var pct = dz / dx * 100, ang = Math.atan(dz / dx) * 180 / Math.PI, len = Math.sqrt(dz * dz + dx * dx);
      q(root, "o2").innerHTML = '<span class="big">' + fr(pct, 0) + " %</span>soit " + fr(ang, 1) + "° · distance suivant la pente " + fr(len, 0) + " m. " + (pct < 10 ? "Pente douce." : pct < 25 ? "Pente soutenue." : pct < 45 ? "Pente raide : marche lente, zigzags." : "Très raide : terrain d’alpinisme ou de randonnée engagée.");
    }
    q(root, "sc").addEventListener("change", function () { a("cm"); });
    q(root, "cm").addEventListener("input", function () { a("cm"); }); q(root, "mm").addEventListener("input", function () { a("mm"); });
    ["dz", "dx"].forEach(function (k) { q(root, k).addEventListener("input", p); });
    a("cm"); p();
  });

  /* ---------- 4. soleil et lumière du jour ---------- */
  function sunAt(y, mo, d, lat, lon, rising, zen) {
    var rad = Math.PI / 180, deg = 180 / Math.PI, N = Math.floor((Date.UTC(y, mo, d) - Date.UTC(y, 0, 0)) / 864e5);
    var lh = lon / 15, t = N + ((rising ? 6 : 18) - lh) / 24, M = 0.9856 * t - 3.289;
    var L = mod(M + 1.916 * Math.sin(M * rad) + 0.020 * Math.sin(2 * M * rad) + 282.634, 360);
    var RA = mod(deg * Math.atan(0.91764 * Math.tan(L * rad)), 360);
    RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90; RA /= 15;
    var sd = 0.39782 * Math.sin(L * rad), cd = Math.cos(Math.asin(sd));
    var ch = (Math.cos(zen * rad) - sd * Math.sin(lat * rad)) / (cd * Math.cos(lat * rad));
    if (ch > 1 || ch < -1) return null;
    var H = (rising ? 360 - deg * Math.acos(ch) : deg * Math.acos(ch)) / 15;
    var UT = mod(H + RA - 0.06571 * t - 6.622 - lh, 24);
    return Date.UTC(y, mo, d) + UT * 3600e3;
  }
  MT.sunAt = sunAt;
  T("soleil", "Lever, coucher et crépuscules", "Heures de lumière pour planifier une sortie ou un déplacement de nuit.", function (root) {
    var now = new Date(), iso = now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate());
    root.innerHTML = card("Lumière du jour", "Heures locales de votre appareil. Précision : environ 2 minutes, hors relief.", '<div class="row">' + field("dt", "Date", iso, 'type="date"') + field("la", "Latitude (°N)", "48,85") + field("lo", "Longitude (°E)", "2,35") + '</div><p><button class="btn sm" id="geo">Utiliser ma position</button></p><div class="out plain" id="o"></div>');
    function draw() {
      var v = q(root, "dt").value.split("-").map(Number), la = num(q(root, "la").value), lo = num(q(root, "lo").value);
      if (v.length < 3 || la == null || lo == null) return;
      var fm = function (ms) { return ms == null ? "—" : new Date(ms).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); };
      var S = function (r, z) { return sunAt(v[0], v[1] - 1, v[2], la, lo, r, z); };
      var rise = S(true, 90.833), set = S(false, 90.833), dur = rise != null && set != null ? (set - rise) / 36e5 : null;
      var rows = [["Aube nautique (horizon visible)", S(true, 102)], ["Aube civile (assez de lumière sans lampe)", S(true, 96)], ["Lever du soleil", rise], ["Coucher du soleil", set], ["Crépuscule civil (fin)", S(false, 96)], ["Crépuscule nautique (fin)", S(false, 102)]];
      q(root, "o").innerHTML = '<div class="kv">' + rows.map(function (r) { return "<span>" + r[0] + "</span><span><b>" + fm(r[1]) + "</b></span>"; }).join("") + "<span>Durée du jour</span><span><b>" + (dur == null ? "—" : Math.floor(dur) + " h " + pad(Math.round((dur % 1) * 60))) + "</b></span></div>";
    }
    ["dt", "la", "lo"].forEach(function (k) { q(root, k).addEventListener("input", draw); });
    q(root, "geo").onclick = function () { if (!navigator.geolocation) return; navigator.geolocation.getCurrentPosition(function (p) { q(root, "la").value = fr(p.coords.latitude, 3); q(root, "lo").value = fr(p.coords.longitude, 3); draw(); }, function () { alert("Position indisponible. Saisissez les coordonnées à la main."); }); };
    draw();
  });

  /* ---------- 5. alphabet phonétique ---------- */
  T("phonetique", "Alphabet phonétique OTAN", "Épeler un nom, un code ou des coordonnées sans ambiguïté à la radio ou au téléphone.", function (root) {
    var A = { A: "Alfa", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo", F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliett", K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar", P: "Papa", Q: "Québec", R: "Roméo", S: "Sierra", T: "Tango", U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee", Z: "Zoulou" };
    var Dg = { 0: "Zéro", 1: "Un", 2: "Deux", 3: "Trois", 4: "Quatre", 5: "Cinq", 6: "Six", 7: "Sept", 8: "Huit", 9: "Neuf" };
    root.innerHTML = card("Épeler un texte", "Tapez un mot, une plaque, un identifiant.", '<div class="field"><label for="t">Texte</label><input id="t" value="Col 2175 B" autocomplete="off"></div><div class="out" id="o"></div><p><button class="btn sm" id="cp">Copier</button></p>') +
      card("Table complète", "", '<div class="kv" style="grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:4px 12px">' + Object.keys(A).map(function (k) { return "<span><b>" + k + "</b> " + A[k] + "</span>"; }).join("") + "</div><p class=\"h\" style=\"margin-top:10px\">Chiffres : " + Object.keys(Dg).map(function (k) { return k + " " + Dg[k]; }).join(" · ") + "</p>");
    function draw() {
      var s = q(root, "t").value.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase(), out = [];
      s.split("").forEach(function (ch) { if (A[ch]) out.push(A[ch]); else if (Dg[ch]) out.push(Dg[ch]); else if (ch === " ") out.push("/"); else if (ch === "-") out.push("tiret"); else if (ch === ".") out.push("point"); });
      q(root, "o").textContent = out.join(" ") || "—";
    }
    q(root, "t").addEventListener("input", draw); q(root, "cp").onclick = function () { copy(q(root, "o").textContent, this); }; draw();
  });

  /* ---------- 6. date-heure groupe ---------- */
  T("dtg", "Date-heure groupe (DTG)", "Le format militaire d’horodatage : JJHHMM + fuseau + mois + année.", function (root) {
    root.innerHTML = card("Générateur de DTG", "Format : jour, heure, minute, lettre de fuseau, mois, année. Exemple : 101243BNOV26. Z = UTC, A = UTC+1 (hiver en France), B = UTC+2 (été).", '<div class="row">' + field("dt", "Date", "", 'type="date"') + field("tm", "Heure locale", "", 'type="time"') + '</div><p><button class="btn sm" id="nw">Maintenant</button></p><div class="out" id="o"></div><p><button class="btn sm" id="cp">Copier</button></p>');
    var M = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"], Z = { "-12": "Y", "-11": "X", "-10": "W", "-9": "V", "-8": "U", "-7": "T", "-6": "S", "-5": "R", "-4": "Q", "-3": "P", "-2": "O", "-1": "N", 0: "Z", 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "F", 7: "G", 8: "H", 9: "I", 10: "K", 11: "L", 12: "M" };
    function nowSet() { var n = new Date(); q(root, "dt").value = n.getFullYear() + "-" + pad(n.getMonth() + 1) + "-" + pad(n.getDate()); q(root, "tm").value = pad(n.getHours()) + ":" + pad(n.getMinutes()); draw(); }
    function draw() {
      var d = q(root, "dt").value.split("-").map(Number), t = q(root, "tm").value.split(":").map(Number); if (d.length < 3 || t.length < 2 || isNaN(d[0]) || isNaN(t[0])) return;
      var loc = new Date(d[0], d[1] - 1, d[2], t[0], t[1]), off = -loc.getTimezoneOffset() / 60;
      q(root, "o").innerHTML = '<span class="big">' + pad(d[2]) + pad(t[0]) + pad(t[1]) + (Z[off] || "?") + M[d[1] - 1] + String(d[0]).slice(2) + "</span>fuseau " + (off >= 0 ? "UTC+" : "UTC") + off + " (lettre " + (Z[off] || "?") + ")";
    }
    q(root, "dt").addEventListener("input", draw); q(root, "tm").addEventListener("input", draw); q(root, "nw").onclick = nowSet;
    q(root, "cp").onclick = function () { copy(q(root, "o").textContent.split("fuseau")[0], this); }; nowSet();
  });

  /* ---------- 7. ordre en cinq paragraphes ---------- */
  T("ordre", "Ordre en cinq paragraphes", "Structurer un brief de sortie, une mission ou une activité d’équipe : situation, mission, exécution, soutien, commandement.", function (root) {
    var F = [["sit", "1. Situation", "Terrain, météo, risques, effectifs et moyens disponibles.", 3], ["mis", "2. Mission", "Qui fait quoi, où, quand et pourquoi (une phrase).", 2], ["exe", "3. Exécution", "Intention du chef, déroulé, tâches de chacun, consignes de coordination.", 4], ["sou", "4. Soutien", "Eau, vivres, matériel, soins, évacuation.", 3], ["cmd", "5. Commandement et transmissions", "Qui décide, qui remplace, moyens et fréquences, plan PACE.", 3]];
    root.innerHTML = card("Brief en cinq paragraphes", "Remplissez ce que vous savez ; le texte formaté se met à jour. Utilisable pour une sortie en groupe, un chantier ou un exercice.", '<div class="field" style="margin-bottom:12px"><label for="ti">Intitulé</label><input id="ti" value="Sortie du samedi" autocomplete="off"></div>' + F.map(function (f) { return '<div class="field" style="margin-bottom:12px"><label for="' + f[0] + '">' + f[1] + '</label><textarea id="' + f[0] + '" rows="' + f[3] + '" placeholder="' + esc(f[2]) + '"></textarea></div>'; }).join("") + '<div class="out plain" id="o"></div><p><button class="btn sm" id="cp">Copier</button> <button class="btn sm" onclick="window.print()">Imprimer</button></p>');
    function draw() {
      var t = "ORDRE : " + q(root, "ti").value.toUpperCase() + "\n";
      F.forEach(function (f) { t += "\n" + f[1].toUpperCase() + "\n" + (q(root, f[0]).value.trim() || "(à compléter)") + "\n"; });
      q(root, "o").style.whiteSpace = "pre-wrap"; q(root, "o").textContent = t;
    }
    root.querySelectorAll("input,textarea").forEach(function (e) { e.addEventListener("input", draw); });
    q(root, "cp").onclick = function () { copy(q(root, "o").textContent, this); }; draw();
  });

  /* ---------- 8. messages d'alerte ---------- */
  T("alerte", "Message d’alerte et d’évacuation", "Préparer un appel au 112 / 15, ou une demande d’évacuation sanitaire en neuf lignes.", function (root) {
    root.innerHTML =
      card("Appel au 112 / 15 / 18 (France)", "Restez en ligne, répondez calmement, n’interrompez pas l’appel avant d’y être invité.", '<div class="row">' + field("l", "Où ? (adresse, lieu-dit, coordonnées GPS)", "", 'autocomplete="off"') + field("n", "Quoi ? (chute, hémorragie, malaise…)", "", 'autocomplete="off"') + '</div><div class="row">' + field("c", "Combien de victimes ?", "1") + field("e", "État (conscient ? respire ?)", "", 'autocomplete="off"') + '</div><div class="row">' + field("d", "Dangers sur place", "", 'autocomplete="off"') + field("t", "Numéro de rappel", "", 'inputmode="tel" autocomplete="off"') + '</div><div class="out plain" id="o1"></div><p><button class="btn sm" id="c1">Copier</button></p>') +
      card("Demande d’évacuation en neuf lignes", "Format utilisé en contexte tactique. Les lignes 1 à 5 sont l’essentiel ; ne pas retarder l’appel pour le reste.", ["Lieu de prise en charge (coordonnées)", "Fréquence radio et indicatif", "Nombre de blessés par urgence (A urgent absolu, B urgent, C différé)", "Matériel spécial nécessaire (treuil, brancard…)", "Nombre de blessés couchés ou assis", "Sécurité sur la zone", "Marquage de la zone", "Nationalité et statut des blessés", "Terrain et menaces particulières"].map(function (l, i) { return '<div class="field" style="margin-bottom:10px"><label for="n' + i + '">Ligne ' + (i + 1) + " — " + l + '</label><input id="n' + i + '" autocomplete="off"></div>'; }).join("") + '<div class="out" id="o2"></div><p><button class="btn sm" id="c2">Copier</button></p>');
    function a() {
      var v = function (k) { return q(root, k).value.trim() || "…"; };
      q(root, "o1").textContent = "Je vous appelle pour : " + v("n") + ".\nLieu précis : " + v("l") + ".\nNombre de victimes : " + v("c") + ". État : " + v("e") + ".\nDangers : " + v("d") + ".\nRappel au : " + v("t") + ".";
    }
    function b() { var t = ""; for (var i = 0; i < 9; i++) t += "LIGNE " + (i + 1) + " : " + (q(root, "n" + i).value.trim() || "…") + "\n"; q(root, "o2").textContent = t; }
    ["l", "n", "c", "e", "d", "t"].forEach(function (k) { q(root, k).addEventListener("input", a); });
    for (var i = 0; i < 9; i++) q(root, "n" + i).addEventListener("input", b);
    q(root, "c1").onclick = function () { copy(q(root, "o1").textContent, this); }; q(root, "c2").onclick = function () { copy(q(root, "o2").textContent, this); }; a(); b();
  });

  /* ---------- 9. chrono de pose ---------- */
  T("chrono", "Chronomètre de pose (garrot)", "Noter l’heure et suivre le temps écoulé depuis la pose d’un garrot, pour le transmettre aux secours.", function (root) {
    root.innerHTML = card("Temps depuis la pose", "Entraînement ou situation réelle : transmettez toujours l’heure de pose aux secours. Le garrot ne se desserre pas hors d’un geste médical.", '<div class="big-time" id="t">00:00:00</div><div class="out plain" id="o">Aucune pose enregistrée.</div><p><button class="btn pri" id="go">Enregistrer la pose</button> <button class="btn" id="rz">Remettre à zéro</button></p>');
    var t0 = null, timer = null;
    function tick() {
      if (!document.body.contains(root)) { clearInterval(timer); return; }
      if (t0 == null) return; var s = Math.floor((Date.now() - t0) / 1000);
      q(root, "t").textContent = pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60);
    }
    q(root, "go").onclick = function () { t0 = Date.now(); var d = new Date(t0); q(root, "o").textContent = "Pose enregistrée à " + pad(d.getHours()) + " h " + pad(d.getMinutes()) + " (T = " + pad(d.getHours()) + ":" + pad(d.getMinutes()) + "). À écrire sur le garrot ou sur la victime."; clearInterval(timer); timer = setInterval(tick, 500); tick(); };
    q(root, "rz").onclick = function () { t0 = null; clearInterval(timer); q(root, "t").textContent = "00:00:00"; q(root, "o").textContent = "Aucune pose enregistrée."; };
  });

  /* ---------- 10. check-lists ---------- */
  var LISTS = {
    sac: ["Sac d’évasion 72 h", [["Eau", ["Gourde ou poche à eau (1,5 L minimum)", "Filtre ou pastilles de purification", "Réchaud ou récipient pouvant aller au feu"]], ["Abri et chaleur", ["Bâche ou tarp, cordelette", "Couverture de survie (ou bivouac)", "Vêtements de rechange secs, bonnet, gants"]], ["Feu", ["Deux briquets", "Allumettes étanches ou ferrocérium", "Amadou (coton, tampons enduits de cire)"]], ["Orientation", ["Carte du secteur sous pochette", "Boussole à plaque", "Lampe frontale et piles de rechange"]], ["Signalisation", ["Sifflet", "Miroir de signalisation", "Gilet ou bande haute visibilité"]], ["Nourriture et outils", ["Trois jours de rations", "Couteau ou multi-outil", "Sacs poubelle solides"]], ["Communication et papiers", ["Téléphone, câble et batterie externe", "Radio à manivelle ou piles (information)", "Copies des papiers d’identité, numéros utiles"]]]],
    med: ["Trousse de secours", [["Hémorragie", ["Compresses stériles, bandes de contention", "Pansements compressifs", "Garrot tourniquet (à n’utiliser que si formé)"]], ["Plaies et brûlures", ["Antiseptique, sérum physiologique", "Pansements, sparadrap, pansements pour ampoules", "Compresses pour brûlures, gel adapté"]], ["Fractures et entorses", ["Bande élastique, écharpe triangulaire", "Attelle souple"]], ["Protection", ["Gants à usage unique", "Couverture de survie", "Masque de poche pour réanimation"]], ["Divers", ["Ciseaux de secours, pince à épiler", "Stylo et carte d’alerte (adresse, rappel)", "Traitements personnels, avec ordonnance si nécessaire"]]]],
    sortie: ["Sortie en terrain isolé", [["Avant le départ", ["Itinéraire et heure de retour communiqués à un proche", "Météo consultée (et tendance du lendemain)", "Heure du coucher du soleil notée", "Itinéraire de repli repéré sur la carte"]], ["Équipement", ["Carte, boussole, batterie du téléphone pleine", "Eau et nourriture pour une journée de plus que prévu", "Vêtements adaptés, couche de chaleur et de pluie", "Trousse de secours et lampe frontale"]], ["Sur le terrain", ["Point de contrôle toutes les 30 à 60 minutes", "Heure de rebroussement fixée à l’avance", "Décision de renoncer prise sans honte"]]]],
    radio: ["Transmissions (radio PMR446)", [["Avant", ["Piles ou batteries chargées, piles de rechange", "Canal et code de sous-canal convenus", "Essai de portée avant de se séparer", "Plan PACE écrit (principal, alternatif, contingence, urgence)"]], ["Pendant", ["Écouter avant d’émettre", "Messages courts, noms épelés en cas de doute", "Heures de contact respectées"]]]]
  };
  T("checklists", "Check-lists", "Sac d’évasion, trousse de secours, sortie en terrain isolé, radio : cochez, la progression est conservée sur l’appareil.", function (root) {
    var st = MT.store.get(); st.checks = st.checks || {};
    var h = '<div class="filters" role="group" aria-label="Choisir une liste">' + Object.keys(LISTS).map(function (k, i) { return '<button class="chip" data-k="' + k + '" aria-pressed="' + (i === 0) + '">' + esc(LISTS[k][0]) + "</button>"; }).join("") + '</div><div class="tool" id="cl"></div>';
    root.innerHTML = h;
    var cur = "sac";
    function draw() {
      var L = LISTS[cur], mem = st.checks[cur] = st.checks[cur] || {}, out = "<h3>" + esc(L[0]) + '</h3><ul class="chk" style="margin-top:0">', n = 0, tot = 0;
      L[1].forEach(function (g, gi) { out += "<h4>" + esc(g[0]) + "</h4>"; g[1].forEach(function (it, ii) { var id = gi + "-" + ii; tot++; if (mem[id]) n++; out += '<li><label><input type="checkbox" data-id="' + id + '"' + (mem[id] ? " checked" : "") + "><span>" + esc(it) + "</span></label></li>"; }); });
      out += '</ul><p class="h">' + n + " / " + tot + ' cochés · <button class="btn sm" id="rz">Tout décocher</button> <button class="btn sm" onclick="window.print()">Imprimer</button></p>';
      q(root, "cl").innerHTML = out;
      root.querySelectorAll("input[type=checkbox]").forEach(function (c) { c.onchange = function () { if (c.checked) mem[c.dataset.id] = 1; else delete mem[c.dataset.id]; MT.store.save(); draw(); }; });
      q(root, "rz").onclick = function () { st.checks[cur] = {}; MT.store.save(); draw(); };
    }
    root.querySelectorAll(".chip").forEach(function (b) { b.onclick = function () { cur = b.dataset.k; root.querySelectorAll(".chip").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); draw(); }; });
    draw();
  });
})();
