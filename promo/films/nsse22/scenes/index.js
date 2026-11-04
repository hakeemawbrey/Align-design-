// nsse22 — SIGN × SIGN, Vol. 2, ep 22: "Libra × Pisces: the hike neither of them wanted." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Libra × Pisces: | *we both love hiking!*"  A: "I love hiking! *(my feet don't.)*"  B: "me too!! *(I want a nap.)*"
//   TIP 1  "Pisces, be honest, | *gently.*"  A: "honestly? *my toes* are crying too."
//   TIP 2  "Libra, honesty | *is* harmony."  B: "phew. I hate it too. *cocoa?*"
//   TIP 3 ↻  "Pick the date | you *both* love."  A: "watching the snow is *the best part.*"
//   last line  "*Honest* | is romantic."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse22",
  "ep": 22,
  "music": {
    "style": "jazzy",
    "key": "Bb",
    "seed": 1722
  },
  "A": {
    "id": "pisces",
    "wants": "a love story",
    "mood": "wide",
    "react": "happy"
  },
  "B": {
    "id": "libra",
    "wants": "no arguments",
    "mood": "happy",
    "react": "happy"
  },
  "title": "Libra × Pisces: | *we both love hiking!*",
  "hook": [
    "I love hiking! *(my feet don't.)*",
    "me too!! *(I want a nap.)*"
  ],
  "note": null,
  "pis": [
    "(for pisces)",
    "(for the toes)",
    "(happy tears)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Pisces, be honest, | *gently.*",
      "line": "honestly? *my toes* are crying too.",
      "card": {
        "icon": "boot",
        "lines": [
          "honest feet:",
          "\"ouch\""
        ]
      }
    },
    {
      "who": "B",
      "head": "Libra, honesty | *is* harmony.",
      "line": "phew. I hate it too. *cocoa?*",
      "card": {
        "icon": "scale",
        "lines": [
          "truth ⚖ heart",
          {
            "t": "balanced",
            "circle": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Pick the date | you *both* love.",
      "line": "watching the snow is *the best part.*",
      "card": {
        "icon": "mug",
        "lines": [
          "trailhead bench",
          "two cocoas"
        ],
        "icon2": "snow"
      }
    }
  ],
  "fig4": "fig. 4 · honest & cozy",
  "last": "*Honest* | is romantic."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
