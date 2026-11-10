/* Parcours conseillés : suites de chapitres selon l’objectif.
   etapes : [identifiant du module, identifiant du chapitre, libellé] */
(function () {
  MT.parcours.push(
    {
      titre: "Randonneur autonome",
      desc: "Savoir où l’on est, rester en sécurité, alerter. Le socle pour marcher en terrain isolé.",
      etapes: [
        ["navigation", "lire-la-carte", "Lire une carte"],
        ["navigation", "boussole", "Boussole et azimuts"],
        ["navigation", "se-localiser", "Se localiser"],
        ["survie", "priorites", "Mental et priorités"],
        ["secours", "principes", "Protéger, alerter, secourir"],
        ["transmissions", "pace", "Le plan PACE"]
      ]
    },
    {
      titre: "Hiver et montagne",
      desc: "Se vêtir, reconnaître les dangers du froid, comprendre le risque d’avalanche.",
      etapes: [
        ["froid", "cold", "La règle COLD"],
        ["froid", "couches", "Trois couches"],
        ["froid", "hypothermie", "Hypothermie"],
        ["froid", "avalanche", "Neige et avalanche"],
        ["froid", "altitude-orage", "Altitude et orages"],
        ["survie", "abri", "Abri et protection thermique"]
      ]
    },
    {
      titre: "Premiers secours en terrain isolé",
      desc: "Les gestes qui sauvent, dans l’ordre où l’on meurt, puis l’évacuation.",
      etapes: [
        ["secours", "principes", "MARCH : la logique"],
        ["secours", "hemorragie", "Hémorragie et garrot"],
        ["secours", "voies-respiration", "Voies aériennes et PLS"],
        ["secours", "circulation-froid", "Choc et hypothermie"],
        ["secours", "arret-cardiaque", "Arrêt cardiaque"],
        ["secours", "evacuation", "Évacuer et transmettre"]
      ]
    },
    {
      titre: "Responsable de sortie ou chef d’équipe",
      desc: "Analyser, planifier, briefer, conduire un groupe, tirer les leçons.",
      etapes: [
        ["commandement", "chef", "Le rôle du chef"],
        ["commandement", "mett", "Analyser : METT-TC"],
        ["commandement", "ordre", "L’ordre en cinq paragraphes"],
        ["deplacement", "formations", "Formations de déplacement"],
        ["deplacement", "halte", "Haltes et ralliement"],
        ["commandement", "retex", "Retour d’expérience"]
      ]
    },
    {
      titre: "Culture militaire et stratégique",
      desc: "Comprendre comment les armées pensent la décision, le commandement et le droit.",
      etapes: [
        ["doctrine", "nature", "La nature de la guerre"],
        ["doctrine", "attrition-manoeuvre", "Attrition contre manœuvre"],
        ["doctrine", "principes", "Principes de la guerre"],
        ["commandement", "ooda", "La boucle OODA"],
        ["doctrine", "droit", "Le droit des conflits armés"]
      ]
    },
    {
      titre: "Préparation physique",
      desc: "S’entraîner de façon progressive, bien dormir, bien manger, tenir sur la durée.",
      etapes: [
        ["forme", "piliers", "Cinq piliers"],
        ["forme", "entrainement", "Principes d’entraînement"],
        ["forme", "exercices", "Exercices au poids du corps"],
        ["forme", "marche-chargee", "Marcher avec un sac"],
        ["forme", "nutrition-sommeil", "Nutrition et sommeil"]
      ]
    }
  );
})();
