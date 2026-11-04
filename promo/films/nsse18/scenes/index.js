// nsse18 — SIGN × SIGN, Vol. 2, ep 18: "Cancer × Scorpio: the shell and the vault." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Cancer × Scorpio: | *two people saying “fine.”*"  A: "I'm fine. *(I'm not fine.)*"  B: "also fine. *(also not fine.)*"
//   TIP 1  "Cancer, say | the *real* thing."  A: "honestly? I've felt *a bit lonely.*"
//   TIP 2  "Scorpio, go | *first* sometimes."  B: "me too. I *missed you* all week."
//   TIP 3 ↻  "Make “fine” a | *code word.*"  B: "new rule: 'fine?' means *'tell me.'*"
//   last line  "Fine means | *tell me.*"
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse18",
  "ep": 18,
  "music": {
    "style": "dreamy",
    "key": "Eb",
    "seed": 1718
  },
  "A": {
    "id": "cancer",
    "wants": "to be asked",
    "mood": "happy",
    "react": "squint"
  },
  "B": {
    "id": "scorpio",
    "wants": "to be trusted",
    "mood": "squint",
    "react": "wide"
  },
  "title": "Cancer × Scorpio: | *two people saying “fine.”*",
  "hook": [
    "I'm fine. *(I'm not fine.)*",
    "also fine. *(also not fine.)*"
  ],
  "note": null,
  "pis": [
    "(also \"fine\")",
    "(not fine)",
    "(so relieved)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Cancer, say | the *real* thing.",
      "line": "honestly? I've felt *a bit lonely.*",
      "card": {
        "icon": "speech",
        "lines": [
          {
            "t": "fine",
            "strike": true
          },
          {
            "t": "a bit lonely",
            "red": true
          }
        ]
      }
    },
    {
      "who": "B",
      "head": "Scorpio, go | *first* sometimes.",
      "line": "me too. I *missed you* all week.",
      "card": {
        "icon": "open",
        "lines": [
          "the vault:",
          "open (for you)"
        ]
      }
    },
    {
      "who": "B",
      "head": "Make “fine” a | *code word.*",
      "line": "new rule: 'fine?' means *'tell me.'*",
      "card": {
        "icon": "list",
        "lines": [
          "\"fine?\" means",
          {
            "t": "\"tell me more\"",
            "circle": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · actually fine",
  "last": "Fine means | *tell me.*"
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
