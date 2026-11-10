/* Manuel de terrain — plateau tactique : plan, pions, étapes, champs de vision.
   Outil de dessin et de simulation pour airsoft, paintball, jeux tactiques et scénarios d'exercice.
   Tout reste sur l'appareil (MT.store, clé « board »). */
(function () {
  "use strict";
  var MT = window.MT, CELL = 30, COLS = 24, ROWS = 16, W = COLS * CELL, H = ROWS * CELL;
  var RANGE = 270, HALF = 45, RAYS = 40, TEAMS = { b: 1, r: 1, n: 1 };
  function blank() { return { walls: [], pawns: [], frames: [{ p: {}, a: [] }], seq: 0 }; }
  function example() {
    var c = function (a) { return a.map(function (v, i) { return i < 4 ? v * CELL : v; }); };
    var b = blank();
    b.walls = [[2, 2, 22, 2, "w"], [22, 2, 22, 14, "w"], [22, 14, 13, 14, "w"], [13, 14, 11, 14, "d"], [11, 14, 2, 14, "w"], [2, 14, 2, 2, "w"],
      [9, 2, 9, 5, "w"], [9, 5, 9, 7, "d"], [9, 7, 9, 9, "w"], [2, 9, 5, 9, "w"], [5, 9, 7, 9, "d"], [7, 9, 15, 9, "w"], [15, 9, 17, 9, "d"], [17, 9, 22, 9, "w"],
      [15, 2, 15, 4, "w"], [15, 4, 15, 6, "d"], [15, 6, 15, 9, "w"]].map(c);
    b.pawns = [{ id: 1, t: "b", l: "1" }, { id: 2, t: "b", l: "2" }, { id: 3, t: "r", l: "A" }, { id: 4, t: "n", l: "" }];
    b.seq = 4;
    b.frames = [
      { p: { 1: [345, 456, -90], 2: [375, 456, -90], 3: [570, 150, 135], 4: [150, 165, 0] }, a: [[345, 440, 330, 372, "b"], [375, 440, 420, 372, "b"]] },
      { p: { 1: [330, 360, -150], 2: [420, 360, -30], 3: [570, 150, 135], 4: [150, 165, 0] }, a: [[330, 345, 190, 300, "b"], [420, 345, 470, 300, "b"]] },
      { p: { 1: [180, 300, -90], 2: [480, 300, -60], 3: [570, 150, 135], 4: [150, 165, 0] }, a: [] }
    ];
    return b;
  }
  /* reconstruit un plateau à partir de données importées, en ne gardant que des valeurs sûres */
  function clean(d) {
    var b = blank(), num = function (v, max) { v = +v; return isFinite(v) ? Math.max(0, Math.min(max, v)) : 0; };
    if (!d || typeof d !== "object") return null;
    (Array.isArray(d.walls) ? d.walls : []).slice(0, 400).forEach(function (w) { if (Array.isArray(w)) b.walls.push([num(w[0], W), num(w[1], H), num(w[2], W), num(w[3], H), w[4] === "d" ? "d" : "w"]); });
    var ids = {};
    (Array.isArray(d.pawns) ? d.pawns : []).slice(0, 60).forEach(function (p) {
      var id = Math.floor(+p.id); if (!(id > 0) || ids[id] || !TEAMS[p.t]) return;
      ids[id] = 1; b.pawns.push({ id: id, t: p.t, l: String(p.l == null ? "" : p.l).replace(/[^0-9A-Za-z]/g, "").slice(0, 2) }); b.seq = Math.max(b.seq, id);
    });
    var fr = (Array.isArray(d.frames) ? d.frames : []).slice(0, 40).map(function (f) {
      var o = { p: {}, a: [] };
      b.pawns.forEach(function (p) { var v = f && f.p && f.p[p.id]; if (Array.isArray(v)) o.p[p.id] = [num(v[0], W), num(v[1], H), +v[2] || 0]; });
      (f && Array.isArray(f.a) ? f.a : []).slice(0, 80).forEach(function (a) { if (Array.isArray(a)) o.a.push([num(a[0], W), num(a[1], H), num(a[2], W), num(a[3], H), TEAMS[a[4]] ? a[4] : "n"]); });
      return o;
    });
    if (fr.length) b.frames = fr;
    b.pawns.forEach(function (p) { var last = null; b.frames.forEach(function (f) { if (f.p[p.id]) last = f.p[p.id]; }); b.frames.forEach(function (f) { if (!f.p[p.id]) f.p[p.id] = (last || [W / 2, H / 2, -90]).slice(); }); });
    return b;
  }

  /* ---------- géométrie ---------- */
  function hit(px, py, dx, dy, w) { // fraction t (0..1) où le rayon P + t·d coupe le segment w, sinon null
    var ex = w[2] - w[0], ey = w[3] - w[1], den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) return null;
    var t = ((w[0] - px) * ey - (w[1] - py) * ex) / den, u = ((w[0] - px) * dy - (w[1] - py) * dx) / den;
    return t > 1e-6 && t <= 1 && u >= 0 && u <= 1 ? t : null;
  }
  function cast(B, px, py, dx, dy) {
    var best = 1;
    for (var i = 0; i < B.walls.length; i++) { if (B.walls[i][4] !== "w") continue; var t = hit(px, py, dx, dy, B.walls[i]); if (t !== null && t < best) best = t; }
    return best;
  }
  function segDist(x, y, s) {
    var dx = s[2] - s[0], dy = s[3] - s[1], l = dx * dx + dy * dy, t = l ? Math.max(0, Math.min(1, ((x - s[0]) * dx + (y - s[1]) * dy) / l)) : 0;
    return Math.hypot(x - s[0] - t * dx, y - s[1] - t * dy);
  }
  function angDiff(a, b) { return ((b - a + 540) % 360) - 180; }
  function sees(B, a, b) { // a voit-il b ? positions [x, y, angle]
    var dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy);
    if (d > RANGE || d < 1) return false;
    if (Math.abs(angDiff(a[2], Math.atan2(dy, dx) * 180 / Math.PI)) > HALF) return false;
    return cast(B, a[0], a[1], dx, dy) >= 1;
  }
  MT.plateau = { sees: sees, cast: cast, clean: clean, example: example };

  /* ---------- outil ---------- */
  var IC = {
    move: '<path d="M9 2v14M2 9h14M9 2l-2.5 2.5M9 2l2.5 2.5M9 16l-2.5-2.5M9 16l2.5-2.5M2 9l2.5-2.5M2 9l2.5 2.5M16 9l-2.5-2.5M16 9l-2.5 2.5"/>',
    b: '<circle cx="9" cy="9" r="6.5" class="pl-pb"/>', r: '<circle cx="9" cy="9" r="6.5" class="pl-pr"/>', n: '<circle cx="9" cy="9" r="6.5" class="pl-pn"/>',
    wall: '<path d="M2 9h14" stroke-width="4"/>', door: '<path d="M2 9h14" stroke-width="3" stroke-dasharray="2 3.5"/>',
    arrow: '<path d="M2 14L15 4M15 4h-5M15 4v5"/>', erase: '<path d="M4 4l10 10M14 4L4 14"/>'
  };
  var GROUPS = [["Agir", [["move", "Déplacer / tourner"]]], ["Poser un pion", [["b", "Bleu"], ["r", "Rouge"], ["n", "Neutre"]]], ["Dessiner le plan", [["wall", "Mur"], ["door", "Porte"]]], ["Annoter", [["arrow", "Flèche"], ["erase", "Gomme"]]]];
  var HELP = {
    move: "Glissez un pion pour le déplacer. Touchez-le pour le sélectionner, puis glissez la poignée ronde pour tourner son regard.",
    b: "Touchez le plan pour poser un pion bleu.", r: "Touchez le plan pour poser un pion rouge.", n: "Touchez le plan pour poser un pion neutre (civil, arbitre, objectif).",
    wall: "Glissez d’un croisement de la grille à un autre pour tracer un mur. Un mur arrête la vue.",
    door: "Glissez pour tracer une porte ou une ouverture. Elle laisse passer la vue.",
    arrow: "Glissez pour tracer une flèche de mouvement dans l’étape affichée.",
    erase: "Touchez un pion, une flèche ou un mur pour le supprimer."
  };
  var NAME = { b: "Pion bleu", r: "Pion rouge", n: "Pion neutre" };

  MT.tools.push({
    id: "plateau", titre: "Plateau tactique", desc: "Dessinez un plan, placez des pions, enchaînez les étapes et visualisez les champs de vision. Pour l’airsoft, le paintball, les jeux et les exercices.",
    mount: function (root) {
      var S = MT.store.get(), B = clean(S.board) || example(), cur = 0, mode = "move", vision = true, drag = null, undo = [], anim = null, armed = false, sel = null;
      function save() { S.board = B; MT.store.save(); }
      function snap() { undo.push(JSON.stringify(B)); if (undo.length > 40) undo.shift(); }
      root.innerHTML =
        '<div class="pl"><details class="pl-guide"' + (S.boardSeen ? "" : " open") + '><summary>Comment ça marche</summary><ol>' +
        "<li><b>Dessinez le plan</b> : choisissez « Mur » ou « Porte », puis glissez sur la grille. Ou partez du plan d’exemple.</li>" +
        "<li><b>Posez les pions</b> : choisissez une couleur, puis touchez le plan.</li>" +
        "<li><b>Réglez l’étape</b> : avec « Déplacer / tourner », glissez les pions et tournez leur regard avec la poignée ronde.</li>" +
        "<li><b>Ajoutez une étape</b> avec « + », déplacez à nouveau les pions, puis appuyez sur « Lecture » pour voir le mouvement.</li></ol>" +
        '<p>Planche de préparation pour <strong>airsoft, paintball, jeux tactiques et exercices encadrés</strong>. C’est un outil de dessin : il n’enseigne aucune technique d’intervention.</p></details>' +
        '<div class="pl-pal" role="toolbar" aria-label="Outils du plateau">' + GROUPS.map(function (g) {
          return '<div class="pl-grp"><span>' + g[0] + "</span><div>" + g[1].map(function (m) { return '<button class="pl-tool" data-mode="' + m[0] + '" aria-pressed="false"><svg viewBox="0 0 18 18" aria-hidden="true">' + IC[m[0]] + "</svg>" + m[1] + "</button>"; }).join("") + "</div></div>";
        }).join("") + "</div>" +
        '<p class="pl-help" id="plh" aria-live="polite"></p>' +
        '<svg class="pl-svg" id="pls" viewBox="0 0 ' + W + " " + H + '" tabindex="0" role="application" aria-label="Plateau tactique : plan, pions et flèches. Flèches du clavier pour déplacer le pion sélectionné, R pour le tourner, Suppr pour l’effacer."></svg>' +
        '<div class="pl-bar" id="plsel" hidden></div>' +
        '<div class="pl-bar"><span class="pl-lab">Étapes</span><div class="pl-steps" id="plst" role="group" aria-label="Étapes"></div><button class="btn sm" id="pld">Supprimer l’étape</button><button class="btn pri sm" id="plplay">▶ Lecture</button></div>' +
        '<div class="pl-bar"><label class="pl-chk"><input type="checkbox" id="plv" checked> Champs de vision</label><button class="btn sm" id="plu">↶ Annuler</button><button class="btn sm" id="ple">Plan d’exemple</button><button class="btn sm" id="plc">Tout effacer</button>' +
        '<button class="btn sm" id="plo">Exporter</button><label class="btn sm" for="pli">Importer</label><input type="file" id="pli" accept="application/json,.json" class="sr"></div>' +
        '<div class="out plain" id="plr" aria-live="polite"></div></div>';
      var $ = function (id) { return root.querySelector("#" + id); }, svg = $("pls");
      $("plsel").addEventListener("click", function (e) {
        var k = e.target && e.target.dataset && e.target.dataset.k, q = sel && frame().p[sel]; if (!k || !q) return;
        snap(); if (k === "del") removePawn(sel); else q[2] = Math.round((q[2] + (k === "l" ? -45 : 45)) / 15) * 15;
        save(); render();
      });
      $("plst").addEventListener("click", function (e) {
        var k = e.target && e.target.dataset && e.target.dataset.step; if (k == null) return; stop();
        if (k === "+") { if (B.frames.length >= 40) return; snap(); B.frames.splice(cur + 1, 0, { p: JSON.parse(JSON.stringify(frame().p)), a: [] }); cur++; save(); seen(); }
        else cur = +k;
        render();
      });

      function frame() { return B.frames[cur]; }
      function seen() { if (!S.boardSeen) { S.boardSeen = 1; MT.store.save(); } }
      function removePawn(id) { B.pawns = B.pawns.filter(function (x) { return x.id !== id; }); B.frames.forEach(function (f) { delete f.p[id]; }); if (sel === id) sel = null; }
      function tip(q, r) { var a = q[2] * Math.PI / 180; return [q[0] + Math.cos(a) * r, q[1] + Math.sin(a) * r]; }
      function render(pos) {
        var live = !pos; pos = pos || frame().p;
        var h = '<defs><marker id="plm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="pl-mk"/></marker></defs>', i, x, y;
        h += '<rect width="' + W + '" height="' + H + '" class="pl-bg"/>';
        for (i = 1; i < COLS; i++) h += '<line x1="' + i * CELL + '" y1="0" x2="' + i * CELL + '" y2="' + H + '" class="pl-g"/>';
        for (i = 1; i < ROWS; i++) h += '<line x1="0" y1="' + i * CELL + '" x2="' + W + '" y2="' + i * CELL + '" class="pl-g"/>';
        if (!B.walls.length && !B.pawns.length) h += '<text x="' + W / 2 + '" y="' + H / 2 + '" class="pl-empty">Plateau vide : tracez un mur, posez un pion, ou chargez le plan d’exemple.</text>';
        if (vision) B.pawns.forEach(function (p) {
          var q = pos[p.id]; if (!q || p.t === "n") return;
          var pts = q[0] + "," + q[1];
          for (var k = 0; k <= RAYS; k++) { var a = (q[2] - HALF + (2 * HALF * k) / RAYS) * Math.PI / 180, dx = Math.cos(a) * RANGE, dy = Math.sin(a) * RANGE, t = cast(B, q[0], q[1], dx, dy); pts += " " + (q[0] + dx * t).toFixed(1) + "," + (q[1] + dy * t).toFixed(1); }
          h += '<polygon points="' + pts + '" class="pl-cone pl-c' + p.t + '"/>';
        });
        B.walls.forEach(function (w) { h += '<line x1="' + w[0] + '" y1="' + w[1] + '" x2="' + w[2] + '" y2="' + w[3] + '" class="' + (w[4] === "d" ? "pl-door" : "pl-wall") + '"/>'; });
        if (live && cur > 0) B.pawns.forEach(function (p) { // trace de l'étape précédente
          var o = B.frames[cur - 1].p[p.id], q = pos[p.id]; if (!o || !q || (o[0] === q[0] && o[1] === q[1])) return;
          h += '<line x1="' + o[0] + '" y1="' + o[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" class="pl-trail"/><circle cx="' + o[0] + '" cy="' + o[1] + '" r="11" class="pl-ghost pl-p' + p.t + '"/>';
        });
        if (live) frame().a.forEach(function (a) { h += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + a[2] + '" y2="' + a[3] + '" class="pl-arrow" marker-end="url(#plm)"/>'; });
        if (drag && drag.pre) h += '<line x1="' + drag.pre[0] + '" y1="' + drag.pre[1] + '" x2="' + drag.pre[2] + '" y2="' + drag.pre[3] + '" class="pl-pre"/>';
        var spotted = {}, lines = [];
        B.pawns.forEach(function (a) { if (a.t === "n") return; B.pawns.forEach(function (b) { if (b.t === "n" || b.t === a.t || !pos[a.id] || !pos[b.id]) return; if (sees(B, pos[a.id], pos[b.id])) { spotted[b.id] = 1; lines.push((a.t === "b" ? "Bleu " : "Rouge ") + a.l + " voit " + (b.t === "b" ? "bleu " : "rouge ") + b.l); } }); });
        B.pawns.forEach(function (p) {
          var q = pos[p.id]; if (!q) return; x = q[0]; y = q[1];
          if (spotted[p.id]) h += '<circle cx="' + x + '" cy="' + y + '" r="18" class="pl-seen"/>';
          if (live && sel === p.id) h += '<circle cx="' + x + '" cy="' + y + '" r="16" class="pl-sel"/>';
          if (p.t !== "n") { var e = tip(q, live && sel === p.id ? 28 : 19); h += '<line x1="' + x + '" y1="' + y + '" x2="' + e[0].toFixed(1) + '" y2="' + e[1].toFixed(1) + '" class="pl-dir"/>'; if (live && sel === p.id) h += '<circle cx="' + e[0].toFixed(1) + '" cy="' + e[1].toFixed(1) + '" r="7" class="pl-h"/>'; }
          h += '<circle cx="' + x + '" cy="' + y + '" r="12" class="pl-p pl-p' + p.t + '"/><text x="' + x + '" y="' + (y + 5) + '" class="pl-t">' + p.l + "</text>";
        });
        svg.innerHTML = h;
        var st = ""; B.frames.forEach(function (f, k) { st += '<button class="chip" data-step="' + k + '" aria-pressed="' + (k === cur) + '" aria-label="Étape ' + (k + 1) + '">' + (k + 1) + "</button>"; });
        $("plst").innerHTML = st + '<button class="chip pl-add" data-step="+" aria-label="Ajouter une étape après celle-ci" title="Ajouter une étape">+</button>';
        var sp = sel && B.pawns.filter(function (p) { return p.id === sel; })[0], bar = $("plsel");
        if (sp && live) { bar.hidden = false; bar.innerHTML = '<span class="pl-lab">' + NAME[sp.t] + (sp.l ? " " + sp.l : "") + "</span>" + (sp.t === "n" ? "" : '<button class="btn sm" data-k="l">↺ Tourner à gauche</button><button class="btn sm" data-k="r">↻ Tourner à droite</button>') + '<button class="btn sm" data-k="del">Supprimer le pion</button>'; }
        else if (live) { bar.hidden = true; bar.innerHTML = ""; }
        $("plr").innerHTML = vision ? (lines.length ? "<strong>Contacts visuels :</strong> " + lines.join(" · ") : "Aucun contact visuel entre équipes dans cette étape.") + '<br><small>Cône de 90°, portée de 9 cases. Les murs arrêtent la vue, pas les portes. Un pion vu est entouré de pointillés.</small>' : "Champs de vision masqués.";
      }
      function setMode(m) { mode = m; if (m !== "move") sel = null; root.querySelectorAll("[data-mode]").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.mode === m ? "true" : "false"); }); $("plh").textContent = HELP[m]; svg.setAttribute("data-m", m); render(); }
      function pt(e) { var r = svg.getBoundingClientRect(); return [Math.max(0, Math.min(W, (e.clientX - r.left) * W / r.width)), Math.max(0, Math.min(H, (e.clientY - r.top) * H / r.height))]; }
      function grid(p) { return [Math.round(p[0] / CELL) * CELL, Math.round(p[1] / CELL) * CELL]; }
      function half(p) { return [Math.round(p[0] / 15) * 15, Math.round(p[1] / 15) * 15]; }
      function pawnAt(p) { var best = null, bd = 20; B.pawns.forEach(function (w) { var q = frame().p[w.id]; if (!q) return; var d = Math.hypot(q[0] - p[0], q[1] - p[1]); if (d < bd) { bd = d; best = w; } }); return best; }
      function stop() { if (anim) { cancelAnimationFrame(anim.raf); clearTimeout(anim.to); anim = null; $("plplay").textContent = "▶ Lecture"; } }

      svg.addEventListener("pointerdown", function (e) {
        e.preventDefault(); stop(); try { svg.focus({ preventScroll: true }); } catch (x) {}
        var p = pt(e), w;
        if (TEAMS[mode]) {
          var n = B.pawns.filter(function (x) { return x.t === mode; }).length, q = half(p);
          snap(); var id = ++B.seq;
          B.pawns.push({ id: id, t: mode, l: mode === "b" ? String(n + 1) : mode === "r" ? String.fromCharCode(65 + (n % 26)) : "" });
          B.frames.forEach(function (f) { f.p[id] = [q[0], q[1], -90]; });
          save(); seen(); render(); return;
        }
        if (mode === "erase") {
          w = pawnAt(p); snap();
          if (w) removePawn(w.id);
          else {
            var ai = -1, wi = -1, d = 10;
            frame().a.forEach(function (a, i) { var s = segDist(p[0], p[1], a); if (s < d) { d = s; ai = i; wi = -1; } });
            B.walls.forEach(function (a, i) { var s = segDist(p[0], p[1], a); if (s < d) { d = s; wi = i; ai = -1; } });
            if (ai >= 0) frame().a.splice(ai, 1); else if (wi >= 0) B.walls.splice(wi, 1); else undo.pop();
          }
          save(); render(); return;
        }
        if (mode === "move") {
          var sq = sel && frame().p[sel], sp = sel && B.pawns.filter(function (x) { return x.id === sel; })[0];
          if (sq && sp && sp.t !== "n") { var t = tip(sq, 28); if (Math.hypot(t[0] - p[0], t[1] - p[1]) < 14) { snap(); drag = { k: "face", id: sel }; } }
          if (!drag) { w = pawnAt(p); if (!w) { sel = null; render(); return; } snap(); sel = w.id; drag = { k: "move", id: w.id }; render(); }
        } else { var s = mode === "arrow" ? half(p) : grid(p); drag = { k: mode, s: s, pre: [s[0], s[1], s[0], s[1]] }; }
        try { svg.setPointerCapture(e.pointerId); } catch (x) {}
      });
      svg.addEventListener("pointermove", function (e) {
        if (!drag) return;
        var p = pt(e), q;
        if (drag.k === "move") { q = half(p); var o = frame().p[drag.id]; o[0] = q[0]; o[1] = q[1]; }
        else if (drag.k === "face") { q = frame().p[drag.id]; if (Math.hypot(p[0] - q[0], p[1] - q[1]) > 6) q[2] = Math.round(Math.atan2(p[1] - q[1], p[0] - q[0]) * 180 / Math.PI / 15) * 15; }
        else { q = drag.k === "arrow" ? half(p) : grid(p); drag.pre[2] = q[0]; drag.pre[3] = q[1]; }
        render();
      });
      function up() {
        if (!drag) return;
        var d = drag; drag = null;
        if (d.pre && (d.pre[0] !== d.pre[2] || d.pre[1] !== d.pre[3])) {
          snap();
          if (d.k === "arrow") frame().a.push(d.pre.concat("n")); else B.walls.push(d.pre.concat(d.k === "door" ? "d" : "w"));
          seen();
        }
        save(); render();
      }
      svg.addEventListener("pointerup", up); svg.addEventListener("pointercancel", up);
      svg.addEventListener("keydown", function (e) {
        var q = sel && frame().p[sel], mv = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, -15], ArrowDown: [0, 15] }[e.key]; if (!q) return;
        if (mv) { snap(); q[0] = Math.max(0, Math.min(W, q[0] + mv[0])); q[1] = Math.max(0, Math.min(H, q[1] + mv[1])); }
        else if (e.key === "r" || e.key === "R") { snap(); q[2] = Math.round((q[2] + (e.shiftKey ? -45 : 45)) / 15) * 15; }
        else if (e.key === "Delete" || e.key === "Backspace") { snap(); removePawn(sel); }
        else return;
        e.preventDefault(); save(); render();
      });

      root.querySelectorAll("[data-mode]").forEach(function (b) { b.onclick = function () { setMode(b.dataset.mode); }; });
      $("pld").onclick = function () { stop(); if (B.frames.length < 2) return; snap(); B.frames.splice(cur, 1); cur = Math.min(cur, B.frames.length - 1); save(); render(); };
      $("plv").onchange = function () { vision = this.checked; render(); };
      $("plu").onclick = function () { stop(); var s = undo.pop(); if (!s) return; B = JSON.parse(s); sel = null; cur = Math.min(cur, B.frames.length - 1); save(); render(); };
      $("ple").onclick = function () { stop(); snap(); B = example(); cur = 0; sel = null; save(); render(); };
      $("plc").onclick = function () { // double appui plutôt qu'une boîte de dialogue
        var b = this; if (!armed) { armed = true; b.textContent = "Confirmer l’effacement"; setTimeout(function () { armed = false; b.textContent = "Tout effacer"; }, 3000); return; }
        armed = false; b.textContent = "Tout effacer"; stop(); snap(); B = blank(); cur = 0; sel = null; save(); render();
      };
      $("plo").onclick = function () {
        var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(B)], { type: "application/json" })); a.download = "plateau-tactique.json";
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
      };
      $("pli").onchange = function () {
        var f = this.files[0], inp = this; if (!f) return;
        var rd = new FileReader();
        rd.onload = function () { var b = null; try { b = clean(JSON.parse(rd.result)); } catch (e) {} if (b) { snap(); B = b; cur = 0; sel = null; save(); render(); } else $("plr").textContent = "Fichier illisible : ce n’est pas un plateau exporté par cet outil."; inp.value = ""; };
        rd.readAsText(f);
      };
      $("plplay").onclick = function () {
        if (anim) { stop(); render(); return; }
        if (B.frames.length < 2) { $("plr").textContent = "Ajoutez une deuxième étape avec « + », déplacez les pions, puis lancez la lecture."; return; }
        var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches, DUR = 900, PAUSE = 450;
        sel = null; cur = 0; render(); anim = {}; $("plplay").textContent = "■ Arrêter";
        function leg() {
          if (cur >= B.frames.length - 1) { stop(); return; }
          var A = B.frames[cur].p, Z = B.frames[cur + 1].p, t0 = null;
          if (still) { anim.to = setTimeout(function () { cur++; render(); leg(); }, DUR); return; }
          function tick(ts) {
            if (!anim) return;
            if (t0 === null) t0 = ts;
            var k = Math.min(1, (ts - t0) / DUR), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, pos = {};
            for (var id in A) { var a = A[id], z = Z[id] || a; pos[id] = [a[0] + (z[0] - a[0]) * e, a[1] + (z[1] - a[1]) * e, a[2] + angDiff(a[2], z[2]) * e]; }
            if (k < 1) { render(pos); anim.raf = requestAnimationFrame(tick); } else { cur++; render(); anim.to = setTimeout(leg, PAUSE); }
          }
          anim.raf = requestAnimationFrame(tick);
        }
        anim.to = setTimeout(leg, PAUSE);
      };
      setMode(mode);
    }
  });
})();
