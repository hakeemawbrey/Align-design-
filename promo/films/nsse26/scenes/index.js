// nsse26 — SIGN × SIGN, Vol. 2, ep 26: "Gemini × Pisces: the subject change." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Gemini × Pisces: | *anyway! so, unrelated—*"  A: "anyway! so, *unrelated—*"  B: "I was in the middle of *a feeling.*"
//   TIP 1  "Gemini, stay | in the *feeling.*"  A: "wait. go back. *tell me more.*"
//   TIP 2  "Pisces, let them | *lighten* it."  B: "…ok, that joke helped. *a little.*"
//   TIP 3 ↻  "Feel it, | *then* laugh."  A: "ten minutes of feelings, *then snacks.*"
//   last line  "Feel it, | then *laugh.*"
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse26",
  "ep": 26,
  "music": {
    "style": "synthwave",
    "key": "C#m",
    "seed": 1726
  },
  "A": {
    "id": "gemini",
    "wants": "the next topic",
    "mood": "happy",
    "react": "wide"
  },
  "B": {
    "id": "pisces",
    "wants": "to stay in it",
    "mood": "wide",
    "react": "wide"
  },
  "title": "Gemini × Pisces: | *anyway! so, unrelated—*",
  "hook": [
    "anyway! so, *unrelated—*",
    "I was in the middle of *a feeling.*"
  ],
  "note": null,
  "pis": [
    "(for pisces)",
    "(in use)",
    "(happy ones)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Gemini, stay | in the *feeling.*",
      "line": "wait. go back. *tell me more.*",
      "card": {
        "icon": "speech",
        "lines": [
          "…and how did",
          "that feel?"
        ]
      }
    },
    {
      "who": "B",
      "head": "Pisces, let them | *lighten* it.",
      "line": "…ok, that joke helped. *a little.*",
      "card": {
        "icon": "joke",
        "lines": [
          "one small joke",
          "(it helped)"
        ]
      }
    },
    {
      "who": "A",
      "head": "Feel it, | *then* laugh.",
      "line": "ten minutes of feelings, *then snacks.*",
      "card": {
        "icon": "timer",
        "lines": [
          "feelings: 10 min",
          "snacks: 10 min"
        ]
      }
    }
  ],
  "fig4": "fig. 4 · felt & fed",
  "last": "Feel it, | then *laugh.*"
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
