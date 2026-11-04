// nsse23 — SIGN × SIGN, Vol. 2, ep 23: "Scorpio × Capricorn: who says it first." (28 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Scorpio × Capricorn: | *who says it first?*"  A: "I'll say it *when they say it.*"  B: "I'll say it *next quarter.*"
//   TIP 1  "Capricorn, feelings | aren't a *deadline.*"  B: "no deadline. I just… *like you. a lot.*"
//   TIP 2  "Scorpio, risk | the *soft* thing."  A: "I like you too. *a scary amount.*"
//   TIP 3 ↻  "Say it at | the *same* time."  A: "on three? one… two… *three.*"
//   last line  "*Same* time. | Same words."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse23",
  "ep": 23,
  "music": {
    "style": "screwed",
    "key": "Gm",
    "seed": 1723
  },
  "A": {
    "id": "scorpio",
    "wants": "to hear it first",
    "mood": "squint",
    "react": "squint"
  },
  "B": {
    "id": "capricorn",
    "wants": "the right moment",
    "mood": "neutral",
    "react": "squint"
  },
  "title": "Scorpio × Capricorn: | *who says it first?*",
  "hook": [
    "I'll say it *when they say it.*",
    "I'll say it *next quarter.*"
  ],
  "note": null,
  "pis": [
    "(says it to everyone)",
    "(waiting…)",
    "(sobbing)"
  ],
  "tips": [
    {
      "who": "B",
      "head": "Capricorn, feelings | aren't a *deadline.*",
      "line": "no deadline. I just… *like you. a lot.*",
      "card": {
        "icon": "calendar",
        "lines": [
          {
            "t": "Q1: say it?",
            "strike": true
          },
          {
            "t": "now",
            "red": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Scorpio, risk | the *soft* thing.",
      "line": "I like you too. *a scary amount.*",
      "card": {
        "icon": "heart",
        "lines": [
          "unlocked:",
          "one heart"
        ]
      }
    },
    {
      "who": "A",
      "head": "Say it at | the *same* time.",
      "line": "on three? one… two… *three.*",
      "card": {
        "icon": "count",
        "lines": [
          "3 · 2 · 1",
          {
            "t": "together",
            "circle": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · said it",
  "last": "*Same* time. | Same words."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
