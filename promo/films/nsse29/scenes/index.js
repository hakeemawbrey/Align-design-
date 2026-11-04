// nsse29 — SIGN × SIGN, Vol. 2, ep 29: "Aries × Gemini: the snow-day race." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Aries × Gemini: | *first one outside wins!*"  A: "first one *outside* wins!"  B: "wait, I'm texting *everyone we know.*"
//   TIP 1  "Aries, *wait* | for them."  A: "…I'll hold the door. *tap. tap. tap.*"
//   TIP 2  "Gemini, phone down, | *eyes up.*"  B: "ok. phone down. look, *it's snowing!*"
//   TIP 3 ↻  "Race… | *together.*"  A: "tied for first. *best result ever.*"
//   last line  "*Tied* | for first."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse29",
  "ep": 29,
  "music": {
    "style": "funk",
    "key": "Bb",
    "seed": 1729
  },
  "A": {
    "id": "aries",
    "wants": "to be first",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "gemini",
    "wants": "everyone to know",
    "mood": "happy",
    "react": "wide"
  },
  "title": "Aries × Gemini: | *first one outside wins!*",
  "hook": [
    "first one *outside* wins!",
    "wait, I'm texting *everyone we know.*"
  ],
  "note": null,
  "pis": [
    "(still inside)",
    "(at the window)",
    "(snow tears)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Aries, *wait* | for them.",
      "line": "…I'll hold the door. *tap. tap. tap.*",
      "card": {
        "icon": "boot",
        "lines": [
          "by the door:",
          "one pair waiting"
        ]
      }
    },
    {
      "who": "B",
      "head": "Gemini, phone down, | *eyes up.*",
      "line": "ok. phone down. look, *it's snowing!*",
      "card": {
        "icon": "phone",
        "lines": [
          "face down",
          {
            "t": "eyes up",
            "circle": true
          }
        ],
        "icon2": "snow"
      }
    },
    {
      "who": "A",
      "head": "Race… | *together.*",
      "line": "tied for first. *best result ever.*",
      "card": {
        "icon": "prints",
        "lines": [
          "two sets",
          "side by side"
        ]
      }
    }
  ],
  "fig4": "fig. 4 · photo finish",
  "last": "*Tied* | for first."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
