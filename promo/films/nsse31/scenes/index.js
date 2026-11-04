// nsse31 — SIGN × SIGN, Vol. 2, ep 31: "Aquarius × Virgo: Snow Tuesday." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Aquarius × Virgo: | *I invented a holiday.*"  A: "I invented a holiday: *Snow Tuesday!*"  B: "it has *twelve typos* and no rules."
//   TIP 1  "Virgo, cheer | the *first draft.*"  B: "…it's charming. *the typo stays.*"
//   TIP 2  "Aquarius, take | the *one* good note."  A: "fine. snacks are now *mandatory.*"
//   TIP 3 ↻  "Invent it | *together.*"  B: "rule two: *we both show up.*"
//   last line  "Snow Tuesday, | *est.* by two."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse31",
  "ep": 31,
  "music": {
    "style": "synthwave",
    "key": "Gm",
    "seed": 1731
  },
  "A": {
    "id": "aquarius",
    "wants": "a brand-new holiday",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "virgo",
    "wants": "clear rules",
    "mood": "squint",
    "react": "squint"
  },
  "title": "Aquarius × Virgo: | *I invented a holiday.*",
  "hook": [
    "I invented a holiday: *Snow Tuesday!*",
    "it has *twelve typos* and no rules."
  ],
  "note": null,
  "pis": [
    "(celebrating)",
    "(already)",
    "(every tuesday)"
  ],
  "tips": [
    {
      "who": "B",
      "head": "Virgo, cheer | the *first draft.*",
      "line": "…it's charming. *the typo stays.*",
      "card": {
        "icon": "banner",
        "lines": [
          "SNOW TUSEDAY",
          {
            "t": "(stays)",
            "red": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Aquarius, take | the *one* good note.",
      "line": "fine. snacks are now *mandatory.*",
      "card": {
        "icon": "list",
        "lines": [
          "rule 1:",
          {
            "t": "snacks",
            "circle": true
          }
        ]
      }
    },
    {
      "who": "B",
      "head": "Invent it | *together.*",
      "line": "rule two: *we both show up.*",
      "card": {
        "icon": "calendar",
        "lines": [
          "SNOW TUESDAY",
          "est. by two"
        ]
      }
    }
  ],
  "fig4": "fig. 4 · founders",
  "last": "Snow Tuesday, | *est.* by two."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
