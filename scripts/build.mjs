#!/usr/bin/env node
/* Construit la version publiée dans _site/ : un seul fichier JavaScript et une seule feuille de style
   (2 requêtes au lieu de 21), espaces superflus retirés du CSS, cache hors-ligne versionné par le contenu.
   Le dépôt reste utilisable tel quel sans cette étape (ouvrir index.html suffit). */
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "_site");
const read = (f) => readFileSync(join(root, f), "utf8");
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "css"), { recursive: true });

let html = read("index.html");
const scripts = [...html.matchAll(/^\s*<script src="([^"]+)"><\/script>\n/gm)];
const js = scripts.map((m) => `/* ${m[1]} */\n${read(m[1])}`).join("\n;\n");
const styles = [...html.matchAll(/^\s*<link rel="stylesheet" href="([^"]+)">\n/gm)];
const css = styles.map((m) => read(m[1])).join("\n")
  .replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "").replace(/\s*([{};,])\s*/g, "$1").replace(/;}/g, "}");

scripts.forEach((m, i) => { html = html.replace(m[0], i === 0 ? '  <script src="app.js"></script>\n' : ""); });
styles.forEach((m, i) => { html = html.replace(m[0], i === 0 ? '  <link rel="stylesheet" href="css/style.css">\n' : ""); });

const version = "mdt-" + createHash("sha1").update(html + js + css).digest("hex").slice(0, 10);
const drop = new Set([...scripts.map((m) => m[1]), ...styles.map((m) => m[1])]);
let sw = read("sw.js").replace(/const VERSION = "[^"]+";/, `const VERSION = "${version}";`);
sw = sw.replace(/const PRECACHE = \[([\s\S]*?)\];/, (all, body) => {
  const keep = [...body.matchAll(/"([^"]+)"/g)].map((m) => m[1]).filter((f) => !drop.has(f));
  return "const PRECACHE = " + JSON.stringify([...keep, "app.js", "css/style.css"]) + ";";
});

writeFileSync(join(out, "index.html"), html);
writeFileSync(join(out, "app.js"), js);
writeFileSync(join(out, "css/style.css"), css);
writeFileSync(join(out, "sw.js"), sw);
writeFileSync(join(out, ".nojekyll"), "");
cpSync(join(root, "manifest.webmanifest"), join(out, "manifest.webmanifest"));
cpSync(join(root, "assets"), join(out, "assets"), { recursive: true });
console.log(`_site prêt : ${scripts.length} scripts → app.js (${(js.length / 1024).toFixed(0)} Ko), ${styles.length} feuilles → style.css (${(css.length / 1024).toFixed(0)} Ko), cache ${version}`);
