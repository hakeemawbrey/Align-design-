// nsse27 — SIGN × SIGN, Vol. 2, ep 27: "Virgo × Libra: the gift-wrap summit." (28 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Virgo × Libra: | *the corners are crooked.*"  A: "the corners are *crooked.*"  B: "but the bow is *so pretty!*"
//   TIP 1  "Virgo, praise | before you *polish.*"  A: "the bow is gorgeous. *corners later.*"
//   TIP 2  "Libra, it's okay | to *disagree.*"  B: "honestly? I like *the crooked ones.*"
//   TIP 3 ↻  "Wrap it badly, | *together.*"  A: "this is the worst one. *I love it.*"
//   last line  "Crooked bow, | *perfect* gift."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse27",
  "ep": 27,
  "music": {
    "style": "pop",
    "key": "F",
    "seed": 1727
  },
  "A": {
    "id": "virgo",
    "wants": "straight corners",
    "mood": "squint",
    "react": "squint"
  },
  "B": {
    "id": "libra",
    "wants": "a pretty bow",
    "mood": "sparkle",
    "react": "wide"
  },
  "title": "Virgo × Libra: | *the corners are crooked.*",
  "hook": [
    "the corners are *crooked.*",
    "but the bow is *so pretty!*"
  ],
  "note": null,
  "pis": [
    "(cried at the bow)",
    "(wrapping too)",
    "(so moved)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Virgo, praise | before you *polish.*",
      "line": "the bow is gorgeous. *corners later.*",
      "card": {
        "icon": "gift",
        "lines": [
          "bow: 10/10",
          "corners: later"
        ]
      }
    },
    {
      "who": "B",
      "head": "Libra, it's okay | to *disagree.*",
      "line": "honestly? I like *the crooked ones.*",
      "card": {
        "icon": "ruler",
        "lines": [
          "\"I like crooked\"",
          {
            "t": "(noted)",
            "red": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Wrap it badly, | *together.*",
      "line": "this is the worst one. *I love it.*",
      "card": {
        "icon": "lumpy",
        "lines": [
          "present no. 1",
          {
            "t": "lumpy",
            "circle": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · wrapped",
  "last": "Crooked bow, | *perfect* gift."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
