// nsse20 — SIGN × SIGN, Vol. 2, ep 20: "Sagittarius × Capricorn: the season handover." (30 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Sagittarius × Capricorn: | *the handover.*"  A: "my season's over! here, *the keys!*"  B: "I'll need a *receipt* for these keys."
//   TIP 1  "Sag, finish | *one* thing."  A: "I finished the photo album. *ALL of it.*"
//   TIP 2  "Capricorn, keep | one *wild* day."  B: "one day this month: *your pick.*"
//   TIP 3 ↻  "Plan the adventure | *together.*"  B: "you choose where. *I'll choose how.*"
//   last line  "New season. | *Still* us."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse20",
  "ep": 20,
  "music": {
    "style": "cinematic",
    "key": "Dm",
    "seed": 1720
  },
  "A": {
    "id": "sagittarius",
    "wants": "a big adventure",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "capricorn",
    "wants": "a big plan",
    "mood": "neutral",
    "react": "wide"
  },
  "title": "Sagittarius × Capricorn: | *the handover.*",
  "hook": [
    "my season's over! here, *the keys!*",
    "I'll need a *receipt* for these keys."
  ],
  "note": "sag season → capricorn season",
  "pis": [
    "(no keys)",
    "(taking notes)",
    "(so moved)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Sag, finish | *one* thing.",
      "line": "I finished the photo album. *ALL of it.*",
      "card": {
        "icon": "check",
        "lines": [
          "trip photos:",
          {
            "t": "sorted ✓",
            "red": true
          }
        ]
      }
    },
    {
      "who": "B",
      "head": "Capricorn, keep | one *wild* day.",
      "line": "one day this month: *your pick.*",
      "card": {
        "icon": "calendar",
        "lines": [
          "one square:",
          {
            "t": "SAG'S PICK",
            "circle": true
          }
        ]
      }
    },
    {
      "who": "B",
      "head": "Plan the adventure | *together.*",
      "line": "you choose where. *I'll choose how.*",
      "card": {
        "icon": "map",
        "lines": [
          "the route:",
          "up the mountain"
        ]
      }
    }
  ],
  "fig4": "fig. 4 · one team",
  "last": "New season. | *Still* us."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
