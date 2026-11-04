// nsse30 — SIGN × SIGN, Vol. 2, ep 30: "Scorpio × Sagittarius: the haircut review." (28 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Scorpio × Sagittarius: | *“bold haircut.”*"  A: "new haircut? bold. *very bold.*"  B: "…*(adding that to the list.)*"
//   TIP 1  "Sag, honest | *and* kind."  A: "bold, and it *really suits you.*"
//   TIP 2  "Scorpio, say it, | don't *store* it."  B: "'bold' stung. *what did you mean?*"
//   TIP 3 ↻  "Trade one | compliment *a day.*"  A: "today's: your eyes. *intense. nicely.*"
//   last line  "Sharp eyes, | *soft* heart."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse30",
  "ep": 30,
  "music": {
    "style": "screwed",
    "key": "Ebm",
    "seed": 1730
  },
  "A": {
    "id": "sagittarius",
    "wants": "to say it straight",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "scorpio",
    "wants": "to be understood",
    "mood": "squint",
    "react": "squint"
  },
  "title": "Scorpio × Sagittarius: | *“bold haircut.”*",
  "hook": [
    "new haircut? bold. *very bold.*",
    "…*(adding that to the list.)*"
  ],
  "note": null,
  "pis": [
    "(loves the fringe)",
    "(nervous)",
    "(so proud)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Sag, honest | *and* kind.",
      "line": "bold, and it *really suits you.*",
      "card": {
        "icon": "speech",
        "lines": [
          "truth",
          "+ kindness",
          {
            "t": "= ♥",
            "red": true
          }
        ]
      }
    },
    {
      "who": "B",
      "head": "Scorpio, say it, | don't *store* it.",
      "line": "'bold' stung. *what did you mean?*",
      "card": {
        "icon": "box",
        "lines": [
          "\"grudges\"",
          {
            "t": "empty",
            "circle": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Trade one | compliment *a day.*",
      "line": "today's: your eyes. *intense. nicely.*",
      "card": {
        "icon": "jar",
        "lines": [
          "compliments",
          "one a day"
        ]
      }
    }
  ],
  "fig4": "fig. 4 · both seen",
  "last": "Sharp eyes, | *soft* heart."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
