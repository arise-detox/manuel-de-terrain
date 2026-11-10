/* Manuel de terrain — noyau : registre des données, constructeurs de blocs, kit de dessin SVG. */
(function () {
  "use strict";
  var MT = (window.MT = { modules: [], glossary: [], parcours: [], sources: {}, diagrams: {}, tools: [] });

  /* ---------- constructeurs de blocs de contenu ---------- */
  MT.b = {
    p: function (x) { return { t: "p", x: x }; },
    h: function (x) { return { t: "h", x: x }; },
    ul: function () { return { t: "ul", i: [].slice.call(arguments) }; },
    ol: function () { return { t: "ol", i: [].slice.call(arguments) }; },
    steps: function () { return { t: "steps", i: [].slice.call(arguments) }; },   // chaque item : [titre, texte]
    note: function (x, titre) { return { t: "call", k: "info", x: x, titre: titre || "Note" }; },
    tip: function (x, titre) { return { t: "call", k: "tip", x: x, titre: titre || "Astuce" }; },
    warn: function (x, titre) { return { t: "call", k: "warn", x: x, titre: titre || "Attention" }; },
    danger: function (x, titre) { return { t: "call", k: "danger", x: x, titre: titre || "Danger" }; },
    table: function (h) { return { t: "table", h: h, r: [].slice.call(arguments, 1) }; },
    dia: function (id, cap) { return { t: "dia", id: id, cap: cap }; },
    kp: function () { return { t: "kp", i: [].slice.call(arguments) }; }
  };

  MT.mod = function (m) { MT.modules.push(m); };
  MT.gl = function (arr) { MT.glossary.push.apply(MT.glossary, arr); };
  MT.src = function (obj) { for (var k in obj) MT.sources[k] = obj[k]; };

  /* ---------- kit de dessin SVG ---------- */
  var D = (MT.d = {});
  D.svg = function (w, h, body, label) {
    return '<svg viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="' + (label || "").replace(/"/g, "&quot;") + '" xmlns="http://www.w3.org/2000/svg">' +
      "<defs>" +
      '<marker id="ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-ahf"/></marker>' +
      '<marker id="aha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-aha"/></marker>' +
      '<marker id="ahd" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="d-ahd"/></marker>' +
      "</defs>" + body + "</svg>";
  };
  D.T = function (x, y, s, c) { return '<text x="' + x + '" y="' + y + '" class="d-t ' + (c || "") + '">' + s + "</text>"; };
  D.TL = function (x, y, lines, lh, c) {
    var o = '<text x="' + x + '" y="' + y + '" class="d-t ' + (c || "") + '">';
    lines.forEach(function (l, i) { o += '<tspan x="' + x + '" dy="' + (i ? lh : 0) + '">' + l + "</tspan>"; });
    return o + "</text>";
  };
  D.L = function (x1, y1, x2, y2, c) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="d-ln ' + (c || "") + '"/>'; };
  D.P = function (d, c) { return '<path d="' + d + '" class="d-ln ' + (c || "") + '"/>'; };
  D.R = function (x, y, w, h, c, r) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 6 : r) + '" class="d-ln ' + (c || "f-p") + '"/>'; };
  D.C = function (x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="d-ln ' + (c || "f-p") + '"/>'; };
  D.E = function (x, y, rx, ry, c) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" class="d-ln ' + (c || "") + '"/>'; };
  D.A = function (x1, y1, x2, y2, k, c) {   // flèche ; k : '' encre, 'a' accent, 'd' danger
    var m = k === "a" ? "aha" : k === "d" ? "ahd" : "ah";
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" class="d-ln ' + (k === "a" ? "d-ac " : k === "d" ? "d-dg " : "") + (c || "") + '" marker-end="url(#' + m + ')"/>';
  };
  D.PA = function (d, k, c) {
    var m = k === "a" ? "aha" : k === "d" ? "ahd" : "ah";
    return '<path d="' + d + '" class="d-ln ' + (k === "a" ? "d-ac " : k === "d" ? "d-dg " : "") + (c || "") + '" marker-end="url(#' + m + ')"/>';
  };
  D.G = function (x, y, inner) { return '<g transform="translate(' + x + "," + y + ')">' + inner + "</g>"; };
  D.pol = function (cx, cy, r, deg) {            // point sur un cercle ; 0° = haut, sens horaire
    var a = deg * Math.PI / 180; return [cx + r * Math.sin(a), cy - r * Math.cos(a)];
  };
  D.f = function (n) { return Math.round(n * 10) / 10; };

  /* Pile de lignes avec pastille (séquences : MARCH, PACE, priorités, TLP…) */
  D.rows = function (items, o) {
    o = o || {}; var w = o.w || 600, h = o.h || 58, gap = o.gap || 10, chip = o.chip || 21, x0 = o.x0 || 0, body = "", y = 4;
    items.forEach(function (it, i) {
      var iw = o.funnel ? w - i * (o.funnel) : w, ix = x0 + (w - iw) / 2;
      body += D.R(ix, y, iw - 2, h, it.f || "f-p", 8);
      body += D.C(ix + chip + 12, y + h / 2, chip, it.cf || "f-ac d-nos");
      body += D.T(ix + chip + 12, y + h / 2 + 7, it.k, "d-m d-b d-on");
      body += D.T(ix + chip * 2 + 30, y + (it.d ? h / 2 - 5 : h / 2 + 6), it.t, "d-b");
      if (it.d) body += D.T(ix + chip * 2 + 30, y + h / 2 + 15, it.d, "d-s d-g");
      if (i < items.length - 1 && gap >= 10) body += D.A(x0 + w / 2, y + h + 1, x0 + w / 2, y + h + gap - 1, "", "d-l2 d-fine");
      y += h + gap;
    });
    return { body: body, height: y };
  };

  /* Bruit de valeur (relief du bandeau d'accueil) */
  MT.noise = function (seed) {
    var s = seed >>> 0;
    function rnd() { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
    var G = {}; function g(i, j) { var k = i + "," + j; if (!(k in G)) G[k] = rnd(); return G[k]; }
    function sm(t) { return t * t * (3 - 2 * t); }
    function v(x, y) { var i = Math.floor(x), j = Math.floor(y), fx = sm(x - i), fy = sm(y - j);
      var a = g(i, j), b = g(i + 1, j), c = g(i, j + 1), d = g(i + 1, j + 1);
      return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy; }
    return function (x, y) { return v(x, y) * 0.6 + v(x * 2.1, y * 2.1) * 0.28 + v(x * 4.3, y * 4.3) * 0.12; };
  };
})();
