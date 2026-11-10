#!/usr/bin/env node
/* Validation du contenu : exécutée en local (npm test) et par l'intégration continue.
   Charge les scripts de index.html (sauf app.js) dans un contexte isolé, puis vérifie la cohérence des données. */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

/* ---------- chargement ---------- */
const html = readFileSync(join(root, "index.html"), "utf8");
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]).filter((s) => s !== "js/app.js");
const sandbox = { console };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const s of scripts) {
  const file = join(root, s);
  if (!existsSync(file)) { err(`index.html référence un fichier absent : ${s}`); continue; }
  try { vm.runInContext(readFileSync(file, "utf8"), sandbox, { filename: s }); }
  catch (e) { err(`${s} : ${e.message}`); }
}
const MT = sandbox.MT;
if (!MT) { console.error("MT non défini : arrêt."); process.exit(1); }

/* ---------- fichiers référencés ---------- */
for (const m of html.matchAll(/(?:href|src)="((?!https?:|#|data:)[^"]+)"/g)) {
  const f = m[1].split("?")[0];
  if (!existsSync(join(root, f))) err(`index.html : fichier référencé introuvable : ${f}`);
}
const manifest = JSON.parse(readFileSync(join(root, "manifest.webmanifest"), "utf8"));
for (const ic of manifest.icons) if (!existsSync(join(root, ic.src))) err(`manifest : icône absente : ${ic.src}`);

/* ---------- service worker : liste de pré-cache ---------- */
const sw = readFileSync(join(root, "sw.js"), "utf8");
const pre = new Set([...(sw.match(/const PRECACHE = \[([\s\S]*?)\];/) || ["", ""])[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]));
for (const m of html.matchAll(/(?:href|src)="((?!https?:|#|data:)[^"]+)"/g)) {
  const f = m[1].split("?")[0];
  if (!pre.has(f)) err(`sw.js : « ${f} » n'est pas dans PRECACHE (indisponible hors-ligne dès la première visite)`);
}
for (const f of pre) if (f !== "./" && !existsSync(join(root, f))) err(`sw.js : PRECACHE référence un fichier absent : ${f}`);

/* ---------- identifiants ---------- */
const toolIds = new Set(MT.tools.map((t) => t.id));
const modIds = new Set();
const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
const glossary = new Set(MT.glossary.map((g) => fold(g.fr)));

const strings = (b) => {
  switch (b.t) {
    case "p": case "h": case "call": return [b.x];
    case "ul": case "ol": case "kp": return b.i;
    case "steps": return b.i.map((s) => s[1]);
    case "table": return b.r.flat();
    case "dia": return b.cap ? [b.cap] : [];
    default: return [];
  }
};

let nChap = 0, nDia = 0, nQ = 0;
const routes = [];

for (const m of MT.modules) {
  const where = `module ${m.id}`;
  for (const k of ["id", "titre", "court", "desc"]) if (!m[k]) err(`${where} : champ « ${k} » manquant`);
  if (modIds.has(m.id)) err(`${where} : identifiant en double`);
  modIds.add(m.id);
  if (!Array.isArray(m.chapitres) || !m.chapitres.length) err(`${where} : aucun chapitre`);
  if (!Array.isArray(m.quiz) || m.quiz.length < 5) err(`${where} : au moins 5 questions de quiz attendues (${(m.quiz || []).length})`);
  for (const t of m.outils || []) if (!toolIds.has(t)) err(`${where} : outil inconnu « ${t} »`);
  for (const s of m.sources || []) if (!MT.sources[s]) err(`${where} : source inconnue « ${s} »`);
  if (!(m.sources || []).length) warn(`${where} : aucune source citée`);

  const chIds = new Set();
  for (const c of m.chapitres || []) {
    nChap++;
    const w = `${where}/${c.id}`;
    if (!c.id || !c.titre || !c.resume) err(`${w} : id, titre ou résumé manquant`);
    if (chIds.has(c.id)) err(`${w} : chapitre en double`);
    chIds.add(c.id);
    if (!c.b || !c.b.length) err(`${w} : contenu vide`);
    if (!(c.b || []).some((b) => b.t === "kp")) warn(`${w} : pas de bloc « À retenir »`);
    for (const b of c.b || []) {
      if (b.t === "dia") {
        nDia++;
        const fn = MT.diagrams[b.id];
        if (!fn) { err(`${w} : schéma introuvable « ${b.id} »`); continue; }
        try {
          const svg = fn();
          if (!/^<svg/.test(svg)) err(`${w} : le schéma ${b.id} ne produit pas de SVG`);
          if (/NaN|undefined|Infinity/.test(svg)) err(`${w} : le schéma ${b.id} contient NaN/undefined`);
          if (!/role="img"/.test(svg) && !/aria-label/.test(svg)) warn(`${w} : schéma ${b.id} sans libellé d'accessibilité`);
        } catch (e) { err(`${w} : le schéma ${b.id} lève une erreur : ${e.message}`); }
      }
      for (const s of strings(b)) {
        if (typeof s !== "string") { err(`${w} : texte invalide dans un bloc ${b.t}`); continue; }
        for (const l of s.matchAll(/\]\((#[^)]+)\)/g)) routes.push([w, l[1]]);
        for (const g of s.matchAll(/\{\{(.+?)\}\}/g)) if (!glossary.has(fold(g[1]))) err(`${w} : terme de glossaire inconnu « ${g[1]} »`);
        if (/\*\*[^*]*$/.test(s.replace(/\*\*[^*]*\*\*/g, ""))) warn(`${w} : « ** » non fermé dans « ${s.slice(0, 50)}… »`);
      }
    }
  }
  for (const [i, q] of (m.quiz || []).entries()) {
    nQ++;
    const w = `${where}/quiz ${i + 1}`;
    if (!q.q || !Array.isArray(q.o) || q.o.length < 2) { err(`${w} : question ou options invalides`); continue; }
    if (!Number.isInteger(q.a) || q.a < 0 || q.a >= q.o.length) err(`${w} : indice de bonne réponse hors limites`);
    if (!q.e) err(`${w} : explication manquante`);
    if (new Set(q.o).size !== q.o.length) err(`${w} : options en double`);
  }
}

/* ---------- liens internes et parcours ---------- */
const chapOf = (mid) => new Set((MT.modules.find((m) => m.id === mid) || { chapitres: [] }).chapitres.map((c) => c.id));
const okRoute = (r) => {
  const p = r.replace(/^#\/?/, "").split("?")[0].split("/");
  if (r === "#/" || p[0] === "") return true;
  switch (p[0]) {
    case "m": return modIds.has(p[1]) && (!p[2] || chapOf(p[1]).has(p[2]));
    case "outils": return !p[1] || toolIds.has(p[1]);
    case "quiz": return !p[1] || p[1] === "tous" || modIds.has(p[1]);
    case "glossaire": case "recherche": case "cartes": case "fiches": case "sources": case "a-propos": return true;
    default: return false;
  }
};
for (const [w, r] of routes) if (!okRoute(r)) err(`${w} : lien interne invalide ${r}`);
for (const p of MT.parcours) for (const e of p.etapes) {
  if (!modIds.has(e[0])) err(`parcours « ${p.titre} » : module inconnu ${e[0]}`);
  else if (e[1] && !chapOf(e[0]).has(e[1])) err(`parcours « ${p.titre} » : chapitre inconnu ${e[0]}/${e[1]}`);
}

/* ---------- sources ---------- */
for (const [k, s] of Object.entries(MT.sources)) {
  if (!s.titre || !s.org || !/^https:\/\//.test(s.url)) err(`source ${k} : titre, organisme ou URL invalide`);
}
const used = new Set(MT.modules.flatMap((m) => m.sources || []));
for (const k of Object.keys(MT.sources)) if (!used.has(k)) warn(`source ${k} jamais citée par un module`);

/* ---------- glossaire ---------- */
const seen = new Set();
for (const g of MT.glossary) {
  if (!g.fr || !g.en || !g.def) err(`glossaire : entrée incomplète (${g.fr || g.en})`);
  if (!modIds.has(g.m)) err(`glossaire : module inconnu « ${g.m} » pour ${g.fr}`);
  const k = fold(g.fr);
  if (seen.has(k)) warn(`glossaire : terme en double « ${g.fr} »`);
  seen.add(k);
}

/* ---------- bilan ---------- */
for (const w of warnings) console.warn("⚠ " + w);
for (const e of errors) console.error("✖ " + e);
console.log(`\n${MT.modules.length} modules · ${nChap} chapitres · ${nDia} schémas affichés (${Object.keys(MT.diagrams).length} définis) · ${nQ} questions · ${MT.glossary.length} termes · ${MT.tools.length} outils · ${Object.keys(MT.sources).length} sources · ${MT.parcours.length} parcours`);
console.log(errors.length ? `${errors.length} erreur(s)` : "Validation réussie ✔", warnings.length ? `(${warnings.length} avertissement(s))` : "");
process.exit(errors.length ? 1 : 0);
