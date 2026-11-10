#!/usr/bin/env node
/* Vérifie la syntaxe de tous les scripts JavaScript du dépôt (js/, data/, sw.js, scripts/). */
import { readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = [];
for (const d of ["js", "data", "scripts"]) for (const f of readdirSync(join(root, d))) if (/\.m?js$/.test(f)) files.push(join(root, d, f));
files.push(join(root, "sw.js"));

let bad = 0;
for (const f of files) {
  if (!statSync(f).isFile()) continue;
  const r = spawnSync(process.execPath, ["--check", f], { encoding: "utf8" });
  if (r.status !== 0) { bad++; console.error("✖ " + f + "\n" + r.stderr); }
}
console.log(bad ? `${bad} fichier(s) avec erreur de syntaxe` : `Syntaxe correcte (${files.length} fichiers) ✔`);
process.exit(bad ? 1 : 0);
