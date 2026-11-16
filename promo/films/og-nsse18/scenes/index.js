// og-nsse18: social rework of nsse18 (SIGN × SIGN, Volume 2: "Cancer × Scorpio: the shell and the vault."). Static HOOK (outline) 0–3.6
// replaces the animated cold-open title; no series bug / FIELD GUIDE label / entry number / end card; crazier lines.
// Same notebook page, stars, prop cards and payoff; the look lives in ../ssokit.js (og copy of ../../nsse17/scenes/sskit.js).
// was: nsse18 — SIGN × SIGN, Vol. 2, ep 18: "Cancer × Scorpio: the shell and the vault." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Cancer × Scorpio: | *two people saying “fine.”*"  A: "I'm fine. *(I'm not fine.)*"  B: "also fine. *(also not fine.)*"
//   TIP 1  "Cancer, say | the *real* thing."  A: "honestly? I've felt *a bit lonely.*"
//   TIP 2  "Scorpio, go | *first* sometimes."  B: "me too. I *missed you* all week."
//   TIP 3 ↻  "Make “fine” a | *code word.*"  B: "new rule: 'fine?' means *'tell me.'*"
//   last line  "Fine means | *tell me.*"
import { makeFilm } from '../ssokit.js'

const F = makeFilm({
  "id": "og-nsse18",
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
    "I'm fine. *(I'm making soup about it.)*",
    "also fine. *(it's locked in a vault.)*"
  ],
  "note": null,
  "pis": [
    "(also \"fine\")",
    "(sobbing, \"fine\")",
    "(so relieved)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Cancer, say | the *real* thing.",
      "line": "honestly? *a bit lonely.* I made so much soup.",
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
      "line": "me too. I *missed you.* that was my first secret.",
      "card": {
        "icon": "open",
        "lines": [
          "the vault:",
          "open (one time only)"
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
export const HOOK = "Both said *\"fine.\"* | Neither was."
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.6
export const STORY_END = F.STORY_END
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
