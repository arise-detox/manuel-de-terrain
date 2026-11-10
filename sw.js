/* Service worker : fonctionnement hors-ligne.
   - À l'installation, tous les fichiers de l'application sont mis en cache (liste PRECACHE).
   - Pages : réseau d'abord, cache en secours. Autres fichiers : cache d'abord, mise à jour en arrière-plan.
   - Changer VERSION à chaque publication purge l'ancien cache (le workflow GitHub Pages le fait automatiquement).
   Le script scripts/validate.mjs vérifie que PRECACHE couvre tous les fichiers référencés par index.html. */
const VERSION = "mdt-v1";
const PRECACHE = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/icon.svg",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/fonts/barlow-condensed-latin-600-normal.woff2",
  "assets/fonts/barlow-condensed-latin-700-normal.woff2",
  "assets/fonts/source-serif-4-latin-wght-normal.woff2",
  "assets/fonts/source-serif-4-latin-wght-italic.woff2",
  "css/style.css",
  "css/diagrams.css",
  "js/core.js",
  "js/diagrams-a.js",
  "js/diagrams-b.js",
  "js/diagrams-c.js",
  "data/sources.js",
  "data/glossaire.js",
  "data/mod-navigation.js",
  "data/mod-survie.js",
  "data/mod-secours.js",
  "data/mod-transmissions.js",
  "data/mod-commandement.js",
  "data/mod-deplacement.js",
  "data/mod-doctrine.js",
  "data/mod-tir.js",
  "data/mod-forme.js",
  "data/mod-froid.js",
  "data/parcours.js",
  "js/tools.js",
  "js/plateau.js",
  "js/fx.js",
  "js/app.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  const isPage = req.mode === "navigate";
  e.respondWith(
    isPage
      ? fetch(req).then((r) => { const c = r.clone(); caches.open(VERSION).then((x) => x.put(req, c)); return r; }).catch(() => caches.match(req, { ignoreSearch: true }).then((m) => m || caches.match("index.html")))
      : caches.match(req).then((hit) => {
          const net = fetch(req).then((r) => { if (r.ok) { const c = r.clone(); caches.open(VERSION).then((x) => x.put(req, c)); } return r; }).catch(() => hit);
          return hit || net;
        })
  );
});
