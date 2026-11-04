// nsse28 — SIGN × SIGN, Vol. 2, ep 28: "Capricorn × Aquarius: two midnights." (28 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Capricorn × Aquarius: | *midnight at 3 PM?*"  A: "midnight is *at midnight.*"  B: "midnight at 3 PM? it's midnight *somewhere!*"
//   TIP 1  "Capricorn, try | *one* weird idea."  A: "fine. one 3 PM toast. *just one.*"
//   TIP 2  "Aquarius, honour | the *classic.*"  B: "and the real midnight. *with you.*"
//   TIP 3 ↻  "Celebrate | *twice.*"  A: "two countdowns? honestly, *efficient.*"
//   last line  "*Twice* | the countdown."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse28",
  "ep": 28,
  "music": {
    "style": "lofi",
    "key": "Ab",
    "seed": 1728
  },
  "A": {
    "id": "capricorn",
    "wants": "the classic countdown",
    "mood": "squint",
    "react": "squint"
  },
  "B": {
    "id": "aquarius",
    "wants": "a new tradition",
    "mood": "sparkle",
    "react": "wide"
  },
  "title": "Capricorn × Aquarius: | *midnight at 3 PM?*",
  "hook": [
    "midnight is *at midnight.*",
    "midnight at 3 PM? it's midnight *somewhere!*"
  ],
  "note": "both have saturn as a traditional ruler",
  "pis": [
    "(confused)",
    "(clock-watching)",
    "(cried twice)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Capricorn, try | *one* weird idea.",
      "line": "fine. one 3 PM toast. *just one.*",
      "card": {
        "icon": "clock",
        "lines": [
          "3:00 pm",
          "\"midnight\"",
          {
            "t": "(somewhere)",
            "red": true
          }
        ]
      }
    },
    {
      "who": "B",
      "head": "Aquarius, honour | the *classic.*",
      "line": "and the real midnight. *with you.*",
      "card": {
        "icon": "calendar",
        "lines": [
          "new year's eve",
          {
            "t": "12:00",
            "circle": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Celebrate | *twice.*",
      "line": "two countdowns? honestly, *efficient.*",
      "card": {
        "icon": "hat",
        "lines": [
          "countdown no. 1",
          "countdown no. 2"
        ],
        "icon2": "hat"
      }
    }
  ],
  "fig4": "fig. 4 · two hats",
  "last": "*Twice* | the countdown."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
