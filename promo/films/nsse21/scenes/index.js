// nsse21 — SIGN × SIGN, Vol. 2, ep 21: "Cancer × Leo: the photo and the family." (28 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Cancer × Leo: | *one more photo!*"  A: "can we get *grandma* in one?"  B: "one more! from my *good side!*"
//   TIP 1  "Leo, share | the *frame.*"  B: "everybody in! grandma, *front row!*"
//   TIP 2  "Cancer, ask for | *your* photo too."  A: "can we have one *of just us?*"
//   TIP 3 ↻  "Keep the | *blurry* one."  B: "the blurry one is *the best one.*"
//   last line  "Out of focus. | *In love.*"
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse21",
  "ep": 21,
  "music": {
    "style": "funk",
    "key": "G",
    "seed": 1721
  },
  "A": {
    "id": "cancer",
    "wants": "everyone included",
    "mood": "happy",
    "react": "wide"
  },
  "B": {
    "id": "leo",
    "wants": "the perfect photo",
    "mood": "sparkle",
    "react": "wide"
  },
  "title": "Cancer × Leo: | *one more photo!*",
  "hook": [
    "can we get *grandma* in one?",
    "one more! from my *good side!*"
  ],
  "note": null,
  "pis": [
    "(blinked)",
    "(in the photo)",
    "(framing it)"
  ],
  "tips": [
    {
      "who": "B",
      "head": "Leo, share | the *frame.*",
      "line": "everybody in! grandma, *front row!*",
      "card": {
        "icon": "camera",
        "lines": [
          "everyone in",
          "grandma: front"
        ]
      }
    },
    {
      "who": "A",
      "head": "Cancer, ask for | *your* photo too.",
      "line": "can we have one *of just us?*",
      "card": {
        "icon": "photo",
        "lines": [
          "just us two",
          {
            "t": "(keeping this)",
            "red": true
          }
        ]
      }
    },
    {
      "who": "B",
      "head": "Keep the | *blurry* one.",
      "line": "the blurry one is *the best one.*",
      "card": {
        "icon": "blur",
        "lines": [
          "everyone laughing",
          {
            "t": "keeper",
            "circle": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · out of focus",
  "last": "Out of focus. | *In love.*"
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
