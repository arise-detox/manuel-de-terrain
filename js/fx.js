/* Manuel de terrain — animations pédagogiques.
   - Les schémas se construisent élément par élément quand ils entrent à l'écran (bouton « Rejouer »).
   - Les suites d'étapes (classe .sq dans un schéma) s'allument l'une après l'autre.
   - Étapes, encadrés et tableaux apparaissent au défilement ; une barre indique l'avancée de la lecture.
   Tout est désactivé si l'utilisateur a demandé moins d'animations (prefers-reduced-motion). */
(function () {
  "use strict";
  var MT = window.MT, still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ok = !still && "IntersectionObserver" in window, io = null, timers = [], bar = null;
  if (ok) document.documentElement.classList.add("fx");

  function cycle(fig) { // allume les éléments .sq à tour de rôle tant que le schéma est visible
    var els = fig.querySelectorAll(".sq"); if (els.length < 2 || fig._sq) return;
    var i = -1;
    fig._sq = setInterval(function () {
      if (!document.body.contains(fig)) { clearInterval(fig._sq); return; }
      if (!fig.classList.contains("in")) return;
      if (els[i]) els[i].classList.remove("hot");
      i = (i + 1) % els.length; els[i].classList.add("hot");
    }, 1300);
    timers.push(fig._sq);
  }
  function show(el) {
    el.classList.add("in");
    if (el.classList.contains("fig")) cycle(el);
  }
  function scan(root) {
    timers.forEach(clearInterval); timers = [];
    if (io) io.disconnect();
    if (!ok) return;
    io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); if (!e.target.classList.contains("fig")) io.unobserve(e.target); } else if (e.target.classList.contains("fig")) e.target.classList.remove("live"); if (e.isIntersecting && e.target.classList.contains("fig")) e.target.classList.add("live"); });
    }, { threshold: 0.18 });
    root.querySelectorAll("figure.fig").forEach(function (fig) {
      var svg = fig.querySelector("svg"); if (!svg) return;
      var kids = [].filter.call(svg.children, function (c) { return c.tagName.toLowerCase() !== "defs"; }), step = Math.min(70, 1400 / Math.max(1, kids.length));
      kids.forEach(function (c, i) { c.style.setProperty("--d", Math.round(i * step) + "ms"); });
      var b = document.createElement("button");
      b.className = "replay"; b.type = "button"; b.textContent = "↻ Rejouer l’animation";
      b.onclick = function () { fig.classList.remove("in"); void fig.offsetWidth; setTimeout(function () { fig.classList.add("in"); }, 60); };
      fig.appendChild(b);
      io.observe(fig);
    });
    root.querySelectorAll(".prose .steps > li, .prose .kp, .prose .call, .prose .tw, .toc > li, .tools-grid > a, .path, .qcard").forEach(function (el, i) {
      el.classList.add("rv");
      var sib = el.parentNode ? [].indexOf.call(el.parentNode.children, el) : 0;
      el.style.setProperty("--d", Math.min(sib, 8) * 70 + "ms");
      io.observe(el);
    });
    progress(!!root.querySelector(".prose"));
  }
  function progress(on) {
    if (!bar) { bar = document.createElement("div"); bar.className = "readbar"; bar.setAttribute("aria-hidden", "true"); bar.innerHTML = "<i></i>"; document.body.appendChild(bar); window.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); }
    bar.hidden = !on; upd();
  }
  function upd() {
    if (!bar || bar.hidden) return;
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    bar.firstChild.style.transform = "scaleX(" + (max > 0 ? Math.min(1, h.scrollTop / max) : 0) + ")";
  }
  MT.fx = { scan: scan };
})();
