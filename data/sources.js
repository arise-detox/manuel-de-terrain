/* Sources : publications militaires américaines du domaine public, consultables dans le Field Manual Vault.
   Les adresses ci-dessous ont été relevées sur la page de la bibliothèque ; elles peuvent changer : en cas de lien mort, cherchez la référence du manuel (ex. « FM 3-25.26 ») dans la bibliothèque. */
(function () {
  var base = "https://www.trex-arms.com/field-manual-vault/";
  function s(slug, titre, org) { return { titre: titre, org: org, url: base + slug }; }
  MT.src({
    "fm-3-25-26": s("fm-3-25-26-2001-07", "FM 3-25.26 — Map Reading and Land Navigation (2001)", "US Army"),
    "tc-3-21-75": s("tc-3-21-75-2013-08", "TC 3-21.75 — The Warrior Ethos and Soldier Combat Skills (2013)", "US Army"),
    "tc-3-21-76": s("tc-3-21-76-2025-09", "TC 3-21.76 — Ranger Handbook (2025)", "US Army"),
    "atp-3-50-21": s("atp-3-50-21-2018-09", "ATP 3-50.21 — Survival (2018)", "US Army"),
    "mcrp-3-02h": s("mcrp-3-02h-1999-06", "MCRP 3-02H — Survival, Evasion and Recovery (1999)", "US Marine Corps"),
    "afh-10-644": s("afh-10-644-2017-03", "AFH 10-644 — Survival, Evasion, Resistance, Escape (SERE) Operations (2017)", "US Air Force"),
    "atp-4-02-11": s("atp-4-02-11-2026-03", "ATP 4-02.11 — Casualty Response, Tactical Combat Casualty Care and First Aid (2026)", "US Army"),
    "fm-4-25-11": s("fm-4-25-11-2002-12-2", "FM 4-25.11 — First Aid (2002)", "US Army"),
    "mcrp-3-40-3b": s("mcrp-3-40-3b", "MCRP 3-40.3B — Radio Operator’s Handbook", "US Marine Corps"),
    "tc-3-21-60": s("tc-3-21-60-2017-03", "TC 3-21.60 — Visual Signals (2017)", "US Army"),
    "atp-3-21-8": s("atp-3-21-8-c1-2024-01", "ATP 3-21.8 — Infantry Rifle Platoon and Squad (2024)", "US Army"),
    "mcrp-3-11-1a": s("mcrp-3-11-1a-1988-07", "MCRP 3-11.1A — Commander’s Tactical Handbook (1988)", "US Marine Corps"),
    "mctp-3-01a": s("mctp-3-01a-2020-07", "MCTP 3-01A — Scouting and Patrolling (2020)", "US Marine Corps"),
    "mcrp-3-10a-4": s("mcrp-3-10a-4-2020-08", "MCRP 3-10A.4 — Marine Rifle Squad (2020)", "US Marine Corps"),
    "mcdp-1": s("mcdp-1-2018-04", "MCDP 1 — Warfighting (2018)", "US Marine Corps"),
    "tc-3-22-9": s("tc-3-22-9-c3-2016-05", "TC 3-22.9 — Rifle and Carbine (2016, change 3)", "US Army"),
    "fm-7-22": s("fm-7-22-c1-2020-10", "FM 7-22 — Holistic Health and Fitness (2020)", "US Army"),
    "tc-21-3": s("tc-21-3-2025-09", "TC 21-3 — Soldier’s Handbook for Individual Operations and Survival in Cold-Weather Areas (2025)", "US Army"),
    "tc-3-97-61": s("tc-3-97-61-2025-11", "TC 3-97.61 — Military Mountaineering (2025)", "US Army")
  });
})();
