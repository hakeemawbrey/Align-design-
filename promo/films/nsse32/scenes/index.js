// nsse32 — SIGN × SIGN, Vol. 2, ep 32: "Aries × Leo: two fires, one tree." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Aries × Leo: | *who's on top of the tree?*"  A: "I'll hang the lights *first!*"  B: "and I'll be *the star on top!*"
//   TIP 1  "Aries, let | Leo *shine.*"  A: "you're right. you *light up the room.*"
//   TIP 2  "Leo, cheer | Aries' *firsts.*"  B: "first to finish? *my hero!*"
//   TIP 3 ↻  "Share the top | of the *tree.*"  B: "two stars on top. *obviously.*"
//   last line  "Two stars, | *one* tree."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse32",
  "ep": 32,
  "music": {
    "style": "cinematic",
    "key": "G",
    "seed": 1732
  },
  "A": {
    "id": "aries",
    "wants": "to go first",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "leo",
    "wants": "to go big",
    "mood": "sparkle",
    "react": "wide"
  },
  "title": "Aries × Leo: | *who's on top of the tree?*",
  "hook": [
    "I'll hang the lights *first!*",
    "and I'll be *the star on top!*"
  ],
  "note": null,
  "pis": [
    "(tangled in lights)",
    "(still tangled)",
    "(glowing)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Aries, let | Leo *shine.*",
      "line": "you're right. you *light up the room.*",
      "card": {
        "icon": "lights",
        "lines": [
          "lights: up",
          "leo: glowing"
        ]
      }
    },
    {
      "who": "B",
      "head": "Leo, cheer | Aries' *firsts.*",
      "line": "first to finish? *my hero!*",
      "card": {
        "icon": "trophy",
        "lines": [
          "#1",
          "light-hanger"
        ]
      }
    },
    {
      "who": "B",
      "head": "Share the top | of the *tree.*",
      "line": "two stars on top. *obviously.*",
      "card": {
        "icon": "tree2",
        "lines": [
          "the top:",
          {
            "t": "two stars",
            "circle": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · both on top",
  "last": "Two stars, | *one* tree."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
