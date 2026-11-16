// og-nsse23: social rework of nsse23 (SIGN × SIGN, Volume 2: "Scorpio × Capricorn: who says it first."). Static HOOK (box) 0–3.6
// replaces the animated cold-open title; no series bug / FIELD GUIDE label / entry number / end card; crazier lines.
// Same notebook page, stars, prop cards and payoff; the look lives in ../ssokit.js (og copy of ../../nsse17/scenes/sskit.js).
// was: nsse23 — SIGN × SIGN, Vol. 2, ep 23: "Scorpio × Capricorn: who says it first." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Scorpio × Capricorn: | *who says it first?*"  A: "I'll say it *when they say it.*"  B: "I'll say it *next quarter.*"
//   TIP 1  "Capricorn, feelings | aren't a *deadline.*"  B: "no deadline. I just… *like you. a lot.*"
//   TIP 2  "Scorpio, risk | the *soft* thing."  A: "I like you too. *a scary amount.*"
//   TIP 3 ↻  "Say it at | the *same* time."  A: "on three? one… two… *three.*"
//   last line  "*Same* time. | Same words."
import { makeFilm } from '../ssokit.js'

const F = makeFilm({
  "id": "og-nsse23",
  "ep": 23,
  "music": {
    "style": "screwed",
    "key": "Gm",
    "seed": 1723
  },
  "A": {
    "id": "scorpio",
    "wants": "to hear it first",
    "mood": "squint",
    "react": "squint"
  },
  "B": {
    "id": "capricorn",
    "wants": "the right moment",
    "mood": "neutral",
    "react": "squint"
  },
  "title": "Scorpio × Capricorn: | *who says it first?*",
  "hook": [
    "I'll say it *when they say it.* I can wait years.",
    "I'll say it *next quarter.* it's in the plan."
  ],
  "note": null,
  "pis": [
    "(says it to everyone)",
    "(waiting…)",
    "(sobbing)"
  ],
  "tips": [
    {
      "who": "B",
      "head": "Capricorn, feelings | aren't a *deadline.*",
      "line": "no deadline. I just… *like you. a lot.* unplanned.",
      "card": {
        "icon": "calendar",
        "lines": [
          {
            "t": "Q1: say it?",
            "strike": true
          },
          {
            "t": "now",
            "red": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Scorpio, risk | the *soft* thing.",
      "line": "I like you too. *a terrifying amount.*",
      "card": {
        "icon": "heart",
        "lines": [
          "unlocked:",
          "one heart"
        ]
      }
    },
    {
      "who": "A",
      "head": "Say it at | the *same* time.",
      "line": "on three? one… two… *three.*",
      "card": {
        "icon": "count",
        "lines": [
          "3 · 2 · 1",
          {
            "t": "together",
            "circle": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · said it",
  "last": "*Same* time. | Same words."
})
export const HOOK = "Who says it first? | *Not these two.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.6
export const STORY_END = F.STORY_END
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
