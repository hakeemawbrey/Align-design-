// nsse19 — SIGN × SIGN, Vol. 2, ep 19: "Gemini × Libra: the invites and the yes-es." (30 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Gemini × Libra: | *four parties, one night.*"  A: "we're at *three parties* tonight!"  B: "four. I said yes to *Leo's* too."
//   TIP 1  "Gemini, | *check in* with them."  A: "having fun? or should we *head out?*"
//   TIP 2  "Libra, it's okay | to say *no.*"  B: "we'd love to. just *not tonight!*"
//   TIP 3 ↻  "Leave early, | *together.*"  A: "best part of a party: *the walk home.*"
//   last line  "Party of *two,* | please."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse19",
  "ep": 19,
  "music": {
    "style": "pop",
    "key": "E",
    "seed": 1719
  },
  "A": {
    "id": "gemini",
    "wants": "every party",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "libra",
    "wants": "nobody left out",
    "mood": "happy",
    "react": "wide"
  },
  "title": "Gemini × Libra: | *four parties, one night.*",
  "hook": [
    "we're at *three parties* tonight!",
    "four. I said yes to *Leo's* too."
  ],
  "note": null,
  "pis": [
    "(invited to 6)",
    "(went home)",
    "(so happy)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Gemini, | *check in* with them.",
      "line": "having fun? or should we *head out?*",
      "card": {
        "icon": "phone",
        "lines": [
          "having fun?",
          "want to go?"
        ]
      }
    },
    {
      "who": "B",
      "head": "Libra, it's okay | to say *no.*",
      "line": "we'd love to. just *not tonight!*",
      "card": {
        "icon": "envelope",
        "lines": [
          "regretfully",
          "declines ♥"
        ]
      }
    },
    {
      "who": "A",
      "head": "Leave early, | *together.*",
      "line": "best part of a party: *the walk home.*",
      "card": {
        "icon": "clock",
        "lines": [
          "9:30 pm",
          "walk home",
          {
            "t": "(snowing)",
            "red": true
          }
        ],
        "icon2": "snow"
      }
    }
  ],
  "fig4": "fig. 4 · the walk home",
  "last": "Party of *two,* | please."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
