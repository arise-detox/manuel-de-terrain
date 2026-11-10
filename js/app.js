/* Manuel de terrain — application (routeur, vues, recherche, progression, quiz, cartes). Aucune dépendance. */
(function () {
  "use strict";
  var MT = window.MT, B = MT.b;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return [].slice.call((el || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var fold = function (s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var byId = function (id) { return MT.modules.filter(function (m) { return m.id === id; })[0]; };

  /* ---------- stockage local (progression, thème) ---------- */
  var KEY = "mdt.v1", S = { read: {}, quiz: {}, theme: "jour", checks: {} };
  try { var raw = JSON.parse(localStorage.getItem(KEY)); if (raw) for (var k in raw) S[k] = raw[k]; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  MT.store = { get: function () { return S; }, save: save };

  /* ---------- texte enrichi minimal ---------- */
  var glMap = null;
  function glLookup(t) {
    if (!glMap) { glMap = {}; MT.glossary.forEach(function (g) { glMap[fold(g.fr)] = g; }); }
    return glMap[fold(t)];
  }
  function inl(s) {
    s = esc(s);
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/(^|[\s(«])_([^_]+?)_(?=[\s.,;:!?)»]|$)/g, "$1<em>$2</em>");
    s = s.replace(/`(.+?)`/g, "<code>$1</code>");
    s = s.replace(/\{\{(.+?)\}\}/g, function (m, t) {
      var g = glLookup(t); return g ? '<a class="gl" href="#/glossaire?t=' + encodeURIComponent(t) + '" title="' + esc(g.def) + '">' + t + "</a>" : t;
    });
    s = s.replace(/\[([^\]]+)\]\((#[^)]+|https?:[^)]+)\)/g, function (m, t, u) { return '<a href="' + u + '"' + (u[0] !== "#" ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + t + "</a>"; });
    return s;
  }
  function plain(b) {
    var t = [];
    (function add(x) { if (x == null) return; if (typeof x === "string") t.push(x); else if (Array.isArray(x)) x.forEach(add); })([b.x, b.i, b.h, b.r, b.cap, b.titre]);
    return t.join(" ").replace(/[*_`]|\{\{|\}\}|\[([^\]]+)\]\([^)]*\)/g, "$1 ");
  }

  /* ---------- rendu des blocs ---------- */
  function block(b) {
    switch (b.t) {
      case "p": return "<p>" + inl(b.x) + "</p>";
      case "h": return "<h3>" + inl(b.x) + "</h3>";
      case "ul": return "<ul>" + b.i.map(function (i) { return "<li>" + inl(i) + "</li>"; }).join("") + "</ul>";
      case "ol": return "<ol>" + b.i.map(function (i) { return "<li>" + inl(i) + "</li>"; }).join("") + "</ol>";
      case "steps": return '<ol class="steps">' + b.i.map(function (i) { return "<li><b>" + inl(i[0]) + "</b><span>" + inl(i[1] || "") + "</span></li>"; }).join("") + "</ol>";
      case "call": return '<div class="call ' + (b.k === "info" ? "" : b.k) + '" role="note"><b>' + esc(b.titre) + "</b><p>" + inl(b.x) + "</p></div>";
      case "table": return '<div class="tw" tabindex="0"><table><thead><tr>' + b.h.map(function (h) { return "<th>" + inl(h) + "</th>"; }).join("") + "</tr></thead><tbody>" + b.r.map(function (r) { return "<tr>" + r.map(function (c) { return "<td>" + inl(c) + "</td>"; }).join("") + "</tr>"; }).join("") + "</tbody></table></div>";
      case "dia": return '<figure class="fig"><div class="box">' + (MT.diagrams[b.id] ? MT.diagrams[b.id]() : "<p>Schéma manquant : " + esc(b.id) + "</p>") + "</div>" + (b.cap ? "<figcaption>" + inl(b.cap) + "</figcaption>" : "") + "</figure>";
      case "kp": return '<div class="kp"><b>À retenir</b><ul>' + b.i.map(function (i) { return "<li>" + inl(i) + "</li>"; }).join("") + "</ul></div>";
    }
    return "";
  }
  function words(ch) { return ch.b.map(plain).join(" ").split(/\s+/).length; }
  function minutes(ch) { return Math.max(1, Math.round(words(ch) / 190)); }
  function modMinutes(m) { return m.chapitres.reduce(function (a, c) { return a + minutes(c); }, 0); }
  function modDia(m) { var n = 0; m.chapitres.forEach(function (c) { c.b.forEach(function (b) { if (b.t === "dia") n++; }); }); return n; }
  function readCount(m) { return m.chapitres.filter(function (c) { return S.read[m.id + "/" + c.id]; }).length; }
  function prog(m) { return readCount(m) / m.chapitres.length; }
  function srcLinks(ids) {
    return ids.map(function (id) { var s = MT.sources[id]; return s ? '<li><a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + esc(s.titre) + "</a> <span>— " + esc(s.org) + "</span></li>" : ""; }).join("");
  }

  /* ---------- shell : navigation latérale, thèmes ---------- */
  var view = $("#view"), side = $("#side");
  function renderNav(route) {
    var cur = route || "";
    function a(href, label, extra) { return '<a href="#' + href + '"' + (cur === href || (href !== "/" && cur.indexOf(href + "/") === 0) ? ' aria-current="page"' : "") + ">" + (extra || "") + label + "</a>"; }
    var h = '<nav class="nav" aria-label="Navigation principale">' + a("/", "Accueil") + "<h2>Modules</h2>";
    MT.modules.forEach(function (m) { h += a("/m/" + m.id, esc(m.court), '<span class="dot" aria-hidden="true"><i style="--p:' + prog(m).toFixed(2) + '"></i></span>'); });
    h += "<h2>Outils</h2>" + a("/outils", "Outils interactifs") + a("/glossaire", "Glossaire EN → FR") + a("/quiz", "Quiz") + a("/cartes", "Cartes mémoire") + a("/fiches", "Fiches à imprimer") + "<h2>Projet</h2>" + a("/sources", "Sources") + a("/a-propos", "À propos") + "</nav>";
    $("#navhost").innerHTML = h;
  }
  function setTheme(t) {
    S.theme = t; save(); document.documentElement.setAttribute("data-theme", t);
    $$(".themes button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.t === t ? "true" : "false"); });
    var m = $('meta[name="theme-color"]'); if (m) m.setAttribute("content", { jour: "#E9EDE3", nuit: "#0F1512", rouge: "#080000" }[t]);
  }
  function drawer(open) { side.classList.toggle("open", open); var sc = $(".scrim"); if (sc) sc.remove(); if (open) { var d = document.createElement("div"); d.className = "scrim"; d.onclick = function () { drawer(false); }; document.body.appendChild(d); } $("#menu").setAttribute("aria-expanded", open ? "true" : "false"); }

  /* ---------- contours du bandeau d'accueil (marching squares) ---------- */
  function contours() {
    var W = 1200, H = 520, res = 12, nz = MT.noise(7), nx = Math.ceil(W / res) + 1, ny = Math.ceil(H / res) + 1, V = [], i, j;
    for (j = 0; j < ny; j++) for (i = 0; i < nx; i++) V.push(nz(i * res / 260 + 3, j * res / 260 + 1));
    var thin = "", thick = "";
    for (var l = 0; l < 22; l++) {
      var L = 0.30 + l * 0.0135, seg = "";
      for (j = 0; j < ny - 1; j++) for (i = 0; i < nx - 1; i++) {
        var x = i * res, y = j * res, a = V[j * nx + i], b = V[j * nx + i + 1], c = V[(j + 1) * nx + i + 1], d = V[(j + 1) * nx + i];
        var idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        var t = function (p, q) { return (L - p) / (q - p); };
        var top = [x + res * t(a, b), y], right = [x + res, y + res * t(b, c)], bot = [x + res * t(d, c), y + res], left = [x, y + res * t(a, d)];
        var s = function (p, q) { seg += "M" + p[0].toFixed(1) + " " + p[1].toFixed(1) + "L" + q[0].toFixed(1) + " " + q[1].toFixed(1); };
        switch (idx) {
          case 1: case 14: s(left, bot); break; case 2: case 13: s(bot, right); break; case 3: case 12: s(left, right); break;
          case 4: case 11: s(top, right); break; case 5: s(top, right); s(left, bot); break; case 6: case 9: s(top, bot); break;
          case 7: case 8: s(left, top); break; case 10: s(left, top); s(bot, right); break;
        }
      }
      if (l % 5 === 0) thick += seg; else thin += seg;
    }
    return '<svg class="contours" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><path d="' + thin + '"/><path class="m" d="' + thick + '"/></svg>';
  }

  /* ---------- index de recherche ---------- */
  var INDEX = null;
  function buildIndex() {
    INDEX = [];
    MT.modules.forEach(function (m) {
      m.chapitres.forEach(function (c) {
        INDEX.push({ kind: "Chapitre", href: "/m/" + m.id + "/" + c.id, titre: c.titre, ctx: m.court, text: c.resume + " " + c.b.map(plain).join(" ") });
      });
    });
    MT.glossary.forEach(function (g) { INDEX.push({ kind: "Glossaire", href: "/glossaire?t=" + encodeURIComponent(g.fr), titre: g.fr + (g.en ? " (" + g.en + ")" : ""), ctx: "Glossaire", text: g.def }); });
    MT.tools.forEach(function (t) { INDEX.push({ kind: "Outil", href: "/outils/" + t.id, titre: t.titre, ctx: "Outils", text: t.desc }); });
    INDEX.forEach(function (d) { d.ft = fold(d.text); d.fti = fold(d.titre); });
  }
  function search(q) {
    if (!INDEX) buildIndex();
    var toks = fold(q).split(/[^a-z0-9]+/).filter(function (t) { return t.length > 1; });
    if (!toks.length) return [];
    function run(all) {
      return INDEX.map(function (d) {
        var sc = 0, hit = 0;
        toks.forEach(function (t) {
          var inT = d.fti.indexOf(t) >= 0, n = 0, p = -1;
          while ((p = d.ft.indexOf(t, p + 1)) >= 0 && n < 6) n++;
          if (inT || n) hit++;
          sc += (inT ? 10 : 0) + n * 2;
        });
        if (d.kind === "Glossaire") sc += 1;
        return { d: d, sc: sc, hit: hit };
      }).filter(function (r) { return all ? r.hit === toks.length : r.hit > 0; }).sort(function (a, b) { return b.sc - a.sc; });
    }
    var r = run(true); if (!r.length) r = run(false);
    return r.slice(0, 40).map(function (x) { return { d: x.d, toks: toks }; });
  }
  function snippet(d, toks) {
    var pos = -1;
    toks.forEach(function (t) { var p = d.ft.indexOf(t); if (p >= 0 && (pos < 0 || p < pos)) pos = p; });
    var st = Math.max(0, (pos < 0 ? 0 : pos) - 70), seg = d.text.slice(st, st + 200), fs = fold(seg), marks = [];
    toks.forEach(function (t) { var p = -1; while ((p = fs.indexOf(t, p + 1)) >= 0) marks.push([p, p + t.length]); });
    marks.sort(function (a, b) { return a[0] - b[0]; });
    var out = "", last = 0;
    marks.forEach(function (m) { if (m[0] < last) return; out += esc(seg.slice(last, m[0])) + "<mark>" + esc(seg.slice(m[0], m[1])) + "</mark>"; last = m[1]; });
    return (st > 0 ? "… " : "") + out + esc(seg.slice(last)) + (st + 200 < d.text.length ? " …" : "");
  }

  /* ---------- vues ---------- */
  function head(title, lede, crumbs, meta) {
    return '<header class="page-h">' + (crumbs ? '<div class="crumbs">' + crumbs + "</div>" : "") + '<h1 tabindex="-1">' + title + "</h1>" + (lede ? '<p class="lede">' + lede + "</p>" : "") + (meta ? '<div class="meta">' + meta + "</div>" : "") + "</header>";
  }
  function vHome() {
    var nCh = 0, nDia = 0; MT.modules.forEach(function (m) { nCh += m.chapitres.length; nDia += modDia(m); });
    var first = MT.modules[0], started = MT.modules.filter(function (m) { return readCount(m) > 0 && readCount(m) < m.chapitres.length; })[0];
    var h = '<section class="hero">' + contours() +
      "<h1 tabindex=\"-1\">Manuel de terrain</h1><p class=\"lede\">Navigation, survie, secours, radio, commandement, froid et montagne : l’essentiel des manuels de terrain publics, réécrit en français, illustré, utilisable hors-ligne.</p>" +
      '<div class="cta"><a class="btn pri" href="#/m/' + (started ? started.id : first.id) + '">' + (started ? "Reprendre : " + esc(started.court) : "Commencer par " + esc(first.court).toLowerCase()) + '</a><a class="btn" href="#/recherche">Rechercher</a><a class="btn" href="#/outils">Ouvrir les outils</a></div>' +
      '<div class="facts"><span><b>' + MT.modules.length + "</b> modules</span><span><b>" + nCh + "</b> chapitres</span><span><b>" + nDia + "</b> schémas</span><span><b>" + MT.tools.length + "</b> outils</span><span><b>" + MT.glossary.length + "</b> termes traduits</span></div></section>";
    h += '<div class="sec-h"><h2>Les modules</h2></div><ul class="toc">';
    MT.modules.forEach(function (m) {
      h += '<li><a href="#/m/' + m.id + '"><span class="t">' + esc(m.titre) + '</span><span class="d">' + esc(m.desc) + '</span><span class="m">' + m.chapitres.length + " chapitres · " + modMinutes(m) + ' min<div class="bar"><i style="width:' + Math.round(prog(m) * 100) + '%"></i></div></span></a></li>';
    });
    h += "</ul>";
    if (MT.parcours.length) {
      h += '<div class="sec-h"><h2>Parcours conseillés</h2></div><div class="paths">';
      MT.parcours.forEach(function (p) {
        h += '<div class="path"><h3>' + esc(p.titre) + "</h3><p>" + esc(p.desc) + "</p><ol>" + p.etapes.map(function (e) { var m = byId(e[0]); return m ? '<li><a href="#/m/' + e[0] + (e[1] ? "/" + e[1] : "") + '">' + esc(e[2] || m.court) + "</a></li>" : ""; }).join("") + "</ol></div>";
      });
      h += "</div>";
    }
    h += '<div class="sec-h"><h2>Outils de terrain</h2><a href="#/outils">Tous les outils</a></div><div class="tools-grid">';
    MT.tools.slice(0, 6).forEach(function (t) { h += '<a class="tool-link" href="#/outils/' + t.id + '"><b>' + esc(t.titre) + "</b><span>" + esc(t.desc) + "</span></a>"; });
    h += '</div><div class="call warn" style="margin-top:40px"><b>À lire</b><p>Ce site est un outil pédagogique indépendant. Il ne remplace ni une formation encadrée (secourisme, montagne, tir), ni la réglementation française en vigueur. <a href="#/a-propos">En savoir plus</a>.</p></div>';
    return { html: h, title: "Manuel de terrain", home: true };
  }

  function vModule(id) {
    var m = byId(id); if (!m) return v404();
    var done = readCount(m), next = m.chapitres.filter(function (c) { return !S.read[m.id + "/" + c.id]; })[0] || m.chapitres[0];
    var h = head(esc(m.titre), esc(m.desc), '<a href="#/">Accueil</a> › Modules', m.chapitres.length + " chapitres · " + modMinutes(m) + " min de lecture · " + modDia(m) + " schémas · " + done + "/" + m.chapitres.length + " lus");
    h += '<div class="cta" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px"><a class="btn pri" href="#/m/' + m.id + "/" + next.id + '">' + (done ? "Continuer" : "Commencer") + '</a><a class="btn" href="#/quiz/' + m.id + '">Quiz du module (' + m.quiz.length + ' questions)</a></div>';
    h += '<div class="sec-h"><h2>Chapitres</h2></div><ul class="toc">';
    m.chapitres.forEach(function (c, i) {
      h += '<li><a href="#/m/' + m.id + "/" + c.id + '"><span class="t">' + (i + 1) + ". " + esc(c.titre) + (S.read[m.id + "/" + c.id] ? ' <span style="color:var(--ok)">✓</span>' : "") + '</span><span class="d">' + esc(c.resume) + '</span><span class="m">' + minutes(c) + " min</span></a></li>";
    });
    h += "</ul>";
    if (m.outils && m.outils.length) {
      h += '<div class="sec-h"><h2>Outils associés</h2></div><div class="tools-grid">';
      m.outils.forEach(function (tid) { var t = MT.tools.filter(function (x) { return x.id === tid; })[0]; if (t) h += '<a class="tool-link" href="#/outils/' + t.id + '"><b>' + esc(t.titre) + "</b><span>" + esc(t.desc) + "</span></a>"; });
      h += "</div>";
    }
    h += '<div class="src-box"><b>Manuels d’origine (en anglais)</b><ul>' + srcLinks(m.sources) + "</ul></div>";
    return { html: h, title: m.titre };
  }

  function vChapter(mid, cid) {
    var m = byId(mid); if (!m) return v404();
    var idx = -1; m.chapitres.forEach(function (c, i) { if (c.id === cid) idx = i; });
    if (idx < 0) return v404();
    var c = m.chapitres[idx], prev = m.chapitres[idx - 1], next = m.chapitres[idx + 1], isRead = !!S.read[mid + "/" + cid];
    var nav = '<aside class="chapnav" aria-label="Chapitres du module"><h2>' + esc(m.court) + "</h2>" + m.chapitres.map(function (x) { return '<a href="#/m/' + mid + "/" + x.id + '"' + (x.id === cid ? ' aria-current="page"' : "") + (S.read[mid + "/" + x.id] ? ' class="done"' : "") + ">" + esc(x.titre) + "</a>"; }).join("") + "</aside>";
    var h = head(esc(c.titre), esc(c.resume), '<a href="#/">Accueil</a> › <a href="#/m/' + mid + '">' + esc(m.court) + "</a>", "Chapitre " + (idx + 1) + " sur " + m.chapitres.length + " · " + minutes(c) + " min");
    h += '<div class="layout"><article class="prose">' + c.b.map(block).join("") + '<div class="done-row"><button class="btn ' + (isRead ? "" : "pri") + '" data-act="read" data-k="' + mid + "/" + cid + '" aria-pressed="' + isRead + '">' + (isRead ? "✓ Chapitre lu (annuler)" : "Marquer comme lu") + "</button></div>";
    h += '<nav class="pager" aria-label="Chapitre précédent ou suivant"><span>' + (prev ? '<a href="#/m/' + mid + "/" + prev.id + '"><small>‹ Précédent</small><b>' + esc(prev.titre) + "</b></a>" : "") + "</span><span>" + (next ? '<a href="#/m/' + mid + "/" + next.id + '" style="text-align:right"><small>Suivant ›</small><b>' + esc(next.titre) + "</b></a>" : '<a href="#/quiz/' + mid + '" style="text-align:right"><small>Pour finir ›</small><b>Quiz du module</b></a>') + "</span></nav>";
    h += '<div class="src-box"><b>Pour aller plus loin (manuels d’origine, en anglais)</b><ul>' + srcLinks(m.sources) + "</ul></div></article>" + nav + "</div>";
    return { html: h, title: c.titre + " — " + m.court };
  }

  function vTools(id) {
    if (id) {
      var t = MT.tools.filter(function (x) { return x.id === id; })[0]; if (!t) return v404();
      return { html: head(esc(t.titre), esc(t.desc), '<a href="#/">Accueil</a> › <a href="#/outils">Outils</a>') + '<div id="toolhost"></div>', title: t.titre, after: function () { t.mount($("#toolhost")); } };
    }
    var h = head("Outils de terrain", "Calculs et générateurs qui fonctionnent hors-ligne. Rien n’est envoyé sur Internet : tout reste dans votre navigateur.", '<a href="#/">Accueil</a>') + '<div class="tools-grid">';
    MT.tools.forEach(function (t) { h += '<a class="tool-link" href="#/outils/' + t.id + '"><b>' + esc(t.titre) + "</b><span>" + esc(t.desc) + "</span></a>"; });
    return { html: h + "</div>", title: "Outils" };
  }

  function vGloss(q) {
    var mods = {}; MT.modules.forEach(function (m) { mods[m.id] = m.court; });
    var sel = q.m || "", term = q.t || "";
    var list = MT.glossary.slice().sort(function (a, b) { return fold(a.fr).localeCompare(fold(b.fr)); });
    var h = head("Glossaire EN → FR", "Le vocabulaire des manuels américains, traduit et expliqué. " + MT.glossary.length + " termes.", '<a href="#/">Accueil</a>');
    h += '<div class="bigsearch"><input id="gq" type="search" placeholder="Filtrer : azimut, garrot, rally point…" aria-label="Filtrer le glossaire" value="' + esc(term) + '"></div><div class="filters" role="group" aria-label="Filtrer par module"><button class="chip" data-m="" aria-pressed="' + (!sel) + '">Tous</button>';
    MT.modules.forEach(function (m) { h += '<button class="chip" data-m="' + m.id + '" aria-pressed="' + (sel === m.id) + '">' + esc(m.court) + "</button>"; });
    h += '</div><dl class="gloss" id="gl"></dl>';
    return {
      html: h, title: "Glossaire", after: function () {
        var cur = sel;
        function draw() {
          var f = fold($("#gq").value.trim()), out = "";
          list.forEach(function (g) {
            if (cur && g.m !== cur) return;
            if (f && fold(g.fr + " " + g.en + " " + g.def).indexOf(f) < 0) return;
            out += "<dt>" + esc(g.fr) + (g.en ? "<small>" + esc(g.en) + "</small>" : "") + "</dt><dd>" + inl(g.def) + (g.m && mods[g.m] ? ' <a href="#/m/' + g.m + '">→ ' + esc(mods[g.m]) + "</a>" : "") + "</dd>";
          });
          $("#gl").innerHTML = out || "<p>Aucun terme ne correspond.</p>";
        }
        $("#gq").addEventListener("input", draw);
        $$(".chip", view).forEach(function (b) { b.onclick = function () { cur = b.dataset.m; $$(".chip", view).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); draw(); }; });
        draw();
      }
    };
  }

  function vSearch(q) {
    var query = q.q || "";
    var h = head("Recherche", "Dans tous les chapitres, le glossaire et les outils. Les accents sont ignorés.", '<a href="#/">Accueil</a>');
    h += '<form class="bigsearch" id="sf" role="search"><input id="sq" type="search" placeholder="ex. garrot, azimut, abri, radio…" aria-label="Rechercher" value="' + esc(query) + '"><button class="btn pri" type="submit">Chercher</button></form><div id="sr"></div>';
    return {
      html: h, title: "Recherche", after: function () {
        function draw(qq) {
          var r = qq ? search(qq) : [], out = "";
          if (qq && !r.length) out = "<p>Aucun résultat pour « " + esc(qq) + " ». Essayez un mot plus court.</p>";
          if (r.length) out = "<p>" + r.length + " résultat" + (r.length > 1 ? "s" : "") + "</p>";
          r.forEach(function (x) { out += '<div class="hit"><a href="#' + x.d.href + '">' + esc(x.d.titre) + "</a><small>" + x.d.kind + " · " + esc(x.d.ctx) + "</small><p>" + snippet(x.d, x.toks) + "</p></div>"; });
          $("#sr").innerHTML = out;
        }
        $("#sf").onsubmit = function (e) { e.preventDefault(); var v = $("#sq").value.trim(); history.replaceState(null, "", "#/recherche?q=" + encodeURIComponent(v)); draw(v); };
        $("#sq").addEventListener("input", function () { draw(this.value.trim()); });
        draw(query); if (!query) $("#sq").focus();
      }
    };
  }

  function vQuizList() {
    var h = head("Quiz", "Testez vos connaissances. Chaque question est suivie d’une explication.", '<a href="#/">Accueil</a>') + '<ul class="quizlist"><li><div><b>Quiz général</b><br><small>10 questions tirées de tous les modules</small></div><a class="btn pri sm" href="#/quiz/tous">Lancer</a></li>';
    MT.modules.forEach(function (m) {
      var q = S.quiz[m.id];
      h += '<li><div><b>' + esc(m.court) + "</b><br><small>" + m.quiz.length + " questions" + (q ? " · meilleur score " + q.best + "/" + q.total : "") + '</small></div><a class="btn sm" href="#/quiz/' + m.id + '">Lancer</a></li>';
    });
    return { html: h + "</ul>", title: "Quiz" };
  }

  function vQuiz(id) {
    var m = id === "tous" ? null : byId(id); if (id !== "tous" && !m) return v404();
    var pool = [];
    if (m) pool = m.quiz.map(function (q) { return { q: q, mod: m }; });
    else MT.modules.forEach(function (mm) { mm.quiz.forEach(function (q) { pool.push({ q: q, mod: mm }); }); });
    var qs = shuffle(pool).slice(0, m ? pool.length : 10), i = 0, score = 0;
    var title = m ? "Quiz : " + m.court : "Quiz général";
    return {
      html: head(esc(title), "", '<a href="#/">Accueil</a> › <a href="#/quiz">Quiz</a>') + '<div id="qh"></div>', title: title, after: function () {
        var host = $("#qh");
        function draw() {
          if (i >= qs.length) {
            var pct = Math.round(100 * score / qs.length);
            if (m) { var old = S.quiz[m.id]; if (!old || score > old.best) { S.quiz[m.id] = { best: score, total: qs.length }; save(); } }
            host.innerHTML = '<div class="qcard"><div class="n">Terminé</div><div class="score">' + score + " / " + qs.length + "</div><p>" + (pct >= 80 ? "Très bien : les bases sont solides." : pct >= 50 ? "Pas mal. Relisez les chapitres où vous avez hésité." : "Reprenez les chapitres avant de retenter le quiz.") + '</p><p><a class="btn pri" href="#/quiz/' + id + '" data-redo="1">Recommencer</a> <a class="btn" href="#/quiz">Autres quiz</a>' + (m ? ' <a class="btn" href="#/m/' + m.id + '">Retour au module</a>' : "") + "</p></div>";
            return;
          }
          var it = qs[i], opts = shuffle(it.q.o.map(function (t, k) { return { t: t, ok: k === it.q.a }; }));
          host.innerHTML = '<div class="qcard"><div class="n">Question ' + (i + 1) + " sur " + qs.length + (m ? "" : " · " + esc(it.mod.court)) + "</div><h3>" + inl(it.q.q) + '</h3><div class="opts">' + opts.map(function (o, k) { return '<button class="opt" data-k="' + k + '">' + inl(o.t) + "</button>"; }).join("") + '</div><div class="explain" aria-live="polite"></div></div>';
          $$(".opt", host).forEach(function (b) {
            b.onclick = function () {
              var o = opts[+b.dataset.k]; if (o.ok) score++;
              $$(".opt", host).forEach(function (x, k) { x.disabled = true; if (opts[k].ok) x.classList.add("ok"); else if (x === b) x.classList.add("ko"); });
              $(".explain", host).innerHTML = "<p><strong>" + (o.ok ? "Bonne réponse." : "Pas tout à fait.") + "</strong> " + inl(it.q.e) + '</p><button class="btn pri sm" id="nx">' + (i + 1 < qs.length ? "Question suivante" : "Voir le résultat") + "</button>";
              $("#nx").onclick = function () { i++; draw(); }; $("#nx").focus();
            };
          });
        }
        draw();
      }
    };
  }

  function vCards(q) {
    var sel = q.m || "";
    var h = head("Cartes mémoire", "Un terme, sa traduction, sa définition. Cliquez sur la carte pour la retourner.", '<a href="#/">Accueil</a>') + '<div class="filters" role="group" aria-label="Choisir un module"><button class="chip" data-m="" aria-pressed="' + (!sel) + '">Tous</button>';
    MT.modules.forEach(function (m) { h += '<button class="chip" data-m="' + m.id + '" aria-pressed="' + (sel === m.id) + '">' + esc(m.court) + "</button>"; });
    h += '</div><div id="fc"></div>';
    return {
      html: h, title: "Cartes mémoire", after: function () {
        var cur = sel, deck, i;
        function build() { deck = shuffle(MT.glossary.filter(function (g) { return !cur || g.m === cur; })); i = 0; draw(); }
        function draw() {
          if (!deck.length) { $("#fc").innerHTML = "<p>Aucune carte pour ce module.</p>"; return; }
          var g = deck[i];
          $("#fc").innerHTML = '<div class="flash"><button class="flip" id="fl" aria-label="Retourner la carte"><div class="face"><small>Terme anglais</small><b>' + esc(g.en || g.fr) + '</b></div><div class="face back"><small>' + esc(g.fr) + "</small><span>" + esc(g.def) + "</span></div></button></div><p>Carte " + (i + 1) + " / " + deck.length + '</p><p><button class="btn sm" id="pv">‹ Précédente</button> <button class="btn pri sm" id="nx">Suivante ›</button> <button class="btn sm" id="sh">Mélanger</button></p>';
          $("#fl").onclick = function () { this.classList.toggle("on"); };
          $("#pv").onclick = function () { i = (i - 1 + deck.length) % deck.length; draw(); };
          $("#nx").onclick = function () { i = (i + 1) % deck.length; draw(); };
          $("#sh").onclick = build;
        }
        $$(".chip", view).forEach(function (b) { b.onclick = function () { cur = b.dataset.m; $$(".chip", view).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); build(); }; });
        build();
      }
    };
  }

  function vFiches() {
    var h = head("Fiches à imprimer", "Les points « À retenir » de chaque module, regroupés. Utilisez Imprimer pour obtenir un PDF ou une version papier.", '<a href="#/">Accueil</a>') + '<p><button class="btn pri" onclick="window.print()">Imprimer ou exporter en PDF</button></p><div class="cols">';
    MT.modules.forEach(function (m) {
      var inner = "";
      m.chapitres.forEach(function (c) { c.b.forEach(function (b) { if (b.t === "kp") inner += "<h4>" + esc(c.titre) + "</h4><ul>" + b.i.map(function (x) { return "<li>" + inl(x) + "</li>"; }).join("") + "</ul>"; }); });
      if (inner) h += '<section class="fiche"><h3>' + esc(m.titre) + "</h3>" + inner + "</section>";
    });
    return { html: h + "</div>", title: "Fiches" };
  }

  function vSources() {
    var h = head("Sources", "Chaque module s’appuie sur des publications militaires américaines du domaine public. Les liens ci-dessous pointent vers les fiches de la bibliothèque (textes originaux en anglais) pour vérification. Ils ont été relevés sur la page de la bibliothèque : si l’un d’eux ne répond plus, cherchez la référence du manuel (par exemple « FM 3-25.26 »).", '<a href="#/">Accueil</a>');
    MT.modules.forEach(function (m) { h += '<div class="sec-h"><h2>' + esc(m.court) + '</h2></div><div class="src-box" style="border:0;margin-top:6px"><ul>' + srcLinks(m.sources) + "</ul></div>"; });
    h += '<div class="call" style="margin-top:30px"><b>Bibliothèque complète</b><p>Les manuels sont consultables et téléchargeables (PDF, EPUB) dans le <a href="https://www.trex-arms.com/field-manual-vault" target="_blank" rel="noopener noreferrer">Field Manual Vault</a>. Ce projet est indépendant : il n’est affilié ni à ce site, ni à une armée.</p></div>';
    return { html: h, title: "Sources" };
  }

  function vAbout() {
    var h = head("À propos", "", '<a href="#/">Accueil</a>') + '<div class="layout one"><article class="prose">' +
      "<p><strong>Manuel de terrain</strong> rend accessible en français les grands principes des manuels de terrain publiés par les forces armées américaines (domaine public) : se repérer, survivre, porter secours, communiquer, décider, se déplacer en sécurité.</p>" +
      "<h3>Ce que c’est</h3><ul><li>Des synthèses pédagogiques <strong>rédigées en français</strong>, accompagnées de schémas et de quiz.</li><li>Des outils de calcul qui fonctionnent <strong>hors-ligne</strong>.</li><li>Des liens vers les manuels d’origine pour vérifier et approfondir.</li></ul>" +
      "<h3>Ce que ce n’est pas</h3><ul><li>Une traduction mot à mot des manuels : ce sont des réécritures et des adaptations (ex. numéros d’urgence français).</li><li>Un substitut à une formation : secourisme (PSC1), montagne, tir sportif, radio et navigation s’apprennent sur le terrain, avec un encadrant.</li><li>Un guide pour des usages offensifs : le périmètre est volontairement limité à l’autonomie, au secours, à l’orientation et à l’organisation.</li></ul>" +
      '<div class="call warn"><b>Responsabilité</b><p>Les informations sont fournies à titre éducatif, sans garantie. En cas d’urgence, appelez le 112 (ou le 15, le 18). Respectez la loi : armes, radio, accès aux espaces naturels et feux sont réglementés en France.</p></div>' +
      "<h3>Contribuer</h3><p>Le projet est ouvert : corrections, nouveaux chapitres, traductions. Voir le fichier <code>CONTRIBUTING.md</code> du dépôt. Le contenu est sous licence CC BY 4.0, le code sous licence MIT.</p>" +
      '<p><button class="btn" id="rst">Réinitialiser ma progression</button></p></article></div>';
    return { html: h, title: "À propos", after: function () { $("#rst").onclick = function () { if (confirm("Effacer la progression de lecture et les scores de quiz ?")) { S.read = {}; S.quiz = {}; S.checks = {}; save(); renderNav(curRoute); alert("Progression effacée."); } }; } };
  }

  function v404() { return { html: head("Page introuvable", "Ce lien ne mène nulle part.", '<a href="#/">Accueil</a>') + '<p><a class="btn pri" href="#/">Retour à l’accueil</a></p>', title: "Introuvable" }; }

  /* ---------- routeur ---------- */
  var curRoute = "";
  function parseQ(s) { var o = {}; (s || "").split("&").forEach(function (p) { if (!p) return; var kv = p.split("="); o[kv[0]] = decodeURIComponent((kv[1] || "").replace(/\+/g, " ")); }); return o; }
  function route() {
    var raw = location.hash.replace(/^#/, "") || "/", parts = raw.split("?"), path = parts[0].replace(/\/+$/, "") || "/", q = parseQ(parts[1]), seg = path.split("/").filter(Boolean), r;
    curRoute = path;
    try {
      if (!seg.length) r = vHome();
      else if (seg[0] === "m") r = seg[2] ? vChapter(seg[1], seg[2]) : vModule(seg[1]);
      else if (seg[0] === "outils") r = vTools(seg[1]);
      else if (seg[0] === "glossaire") r = vGloss(q);
      else if (seg[0] === "recherche") r = vSearch(q);
      else if (seg[0] === "quiz") r = seg[1] ? vQuiz(seg[1]) : vQuizList();
      else if (seg[0] === "cartes") r = vCards(q);
      else if (seg[0] === "fiches") r = vFiches();
      else if (seg[0] === "sources") r = vSources();
      else if (seg[0] === "a-propos") r = vAbout();
      else r = v404();
    } catch (e) { console.error(e); r = { html: head("Erreur", "Un problème est survenu à l’affichage de cette page."), title: "Erreur" }; }
    view.innerHTML = r.html;
    document.title = (r.home ? "" : r.title + " — ") + "Manuel de terrain";
    renderNav(path); drawer(false);
    if (r.after) r.after();
    if (MT.fx) MT.fx.scan(view);
    if (!(q.t && seg[0] === "glossaire")) window.scrollTo(0, 0);
    var h1 = $("h1", view); if (h1) h1.focus({ preventScroll: true });
  }

  /* ---------- événements globaux ---------- */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]");
    if (b && b.dataset.act === "read") {
      var k = b.dataset.k; if (S.read[k]) delete S.read[k]; else S.read[k] = 1; save(); route();
      var again = $("[data-act=read]"); if (again) again.focus();
    }
    var t = e.target.closest(".themes button"); if (t) setTheme(t.dataset.t);
  });
  $("#menu").addEventListener("click", function () { drawer(!side.classList.contains("open")); });
  $("#sidesearch").addEventListener("submit", function (e) { e.preventDefault(); var v = $("#sidesearch input").value.trim(); location.hash = "#/recherche?q=" + encodeURIComponent(v); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") drawer(false);
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); $("#sidesearch input").focus(); drawer(true); }
  });
  window.addEventListener("hashchange", route);
  setTheme(S.theme);
  route();

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register("sw.js").catch(function () {});
})();
