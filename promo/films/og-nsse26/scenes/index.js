// og-nsse26: social rework of nsse26 (static HOOK outline 0–3.5 instead of the animated title; no show bug, notebook
// header or entry number; no stamp shake; ends on the last line; a Gemini on topic no. 47, a Pisces mid-feeling).
// Kit: ./sskit.js (og copy of ../../nsse17/scenes/sskit.js).
// Was: nsse26 — SIGN × SIGN, Vol. 2, ep 26: "Gemini × Pisces: the subject change." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Gemini × Pisces: | *anyway! so, unrelated—*"  A: "anyway! so, *unrelated—*"  B: "I was in the middle of *a feeling.*"
//   TIP 1  "Gemini, stay | in the *feeling.*"  A: "wait. go back. *tell me more.*"
//   TIP 2  "Pisces, let them | *lighten* it."  B: "…ok, that joke helped. *a little.*"
//   TIP 3 ↻  "Feel it, | *then* laugh."  A: "ten minutes of feelings, *then snacks.*"
//   last line  "Feel it, | then *laugh.*"
import { makeFilm } from './sskit.js'

const F = makeFilm({
  "id": "og-nsse26",
  "ep": 26,
  "music": {
    "style": "synthwave",
    "key": "C#m",
    "seed": 1726
  },
  "A": {
    "id": "gemini",
    "wants": "topic no. 47",
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
    "anyway! so! *unrelated!* have you seen ducks?",
    "I was in the middle of *a feeling.* a big one."
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
      "line": "wait. go back. *tell me more.* (I'm sweating.)",
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
      "line": "…ok, the duck joke helped. *a little.*",
      "card": {
        "icon": "joke",
        "lines": [
          "one duck joke",
          "(it helped)"
        ]
      }
    },
    {
      "who": "A",
      "head": "Feel it, | *then* laugh.",
      "line": "ten whole minutes of feelings. *then snacks.*",
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
export const HOOK = 'Pisces: crying. | Gemini: *anyway, so—*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
