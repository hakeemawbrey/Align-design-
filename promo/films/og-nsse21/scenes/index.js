// og-nsse21: social rework of nsse21 (SIGN × SIGN, Volume 2: "Cancer × Leo: the photo and the family."). Static HOOK (box) 0–3.6
// replaces the animated cold-open title; no series bug / FIELD GUIDE label / entry number / end card; crazier lines.
// Same notebook page, stars, prop cards and payoff; the look lives in ../ssokit.js (og copy of ../../nsse17/scenes/sskit.js).
// was: nsse21 — SIGN × SIGN, Vol. 2, ep 21: "Cancer × Leo: the photo and the family." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Cancer × Leo: | *one more photo!*"  A: "can we get *grandma* in one?"  B: "one more! from my *good side!*"
//   TIP 1  "Leo, share | the *frame.*"  B: "everybody in! grandma, *front row!*"
//   TIP 2  "Cancer, ask for | *your* photo too."  A: "can we have one *of just us?*"
//   TIP 3 ↻  "Keep the | *blurry* one."  B: "the blurry one is *the best one.*"
//   last line  "Out of focus. | *In love.*"
import { makeFilm } from '../ssokit.js'

const F = makeFilm({
  "id": "og-nsse21",
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
    "can we get *grandma* in one? and the dog?",
    "one more! from my *good side!* (all of them)"
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
      "line": "everyone in! grandma, *front row!* next to me.",
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
      "line": "can we have one *of just us?* I'll cry.",
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
      "line": "the blurry one. *I look amazing anyway.*",
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
export const HOOK = "Leo needs one more | *from the good side.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.6
export const STORY_END = F.STORY_END
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
