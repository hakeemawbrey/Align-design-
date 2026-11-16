// og-nsse25: social rework of nsse25 (static HOOK box 0–3.5 instead of the animated title; no show bug, notebook
// header or entry number; no stamp shake; ends on the last line; a Taurus who has had that spot since birth, a main-character Leo).
// Kit: ./sskit.js (og copy of ../../nsse17/scenes/sskit.js).
// Was: nsse25 — SIGN × SIGN, Vol. 2, ep 25: "Taurus × Leo: two fixed signs, one couch." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Taurus × Leo: | *this is MY spot.*"  A: "this is *my spot.*"  B: "every spot is *my spot.*"
//   TIP 1  "Leo, share | the *blanket.*"  B: "half the blanket. ok… *sixty-forty.*"
//   TIP 2  "Taurus, move | over a *little.*"  A: "fine. you can have *the good cushion.*"
//   TIP 3 ↻  "Take turns | *choosing.*"  B: "and on sundays, *the snacks decide.*"
//   last line  "*Sundays,* | the snacks win."
import { makeFilm } from './sskit.js'

const F = makeFilm({
  "id": "og-nsse25",
  "ep": 25,
  "music": {
    "style": "house",
    "key": "A",
    "seed": 1725
  },
  "A": {
    "id": "taurus",
    "wants": "the comfy end",
    "mood": "squint",
    "react": "squint"
  },
  "B": {
    "id": "leo",
    "wants": "all of it",
    "mood": "sparkle",
    "react": "squint"
  },
  "title": "Taurus × Leo: | *this is MY spot.*",
  "hook": [
    "this is *my spot.* I've had it since birth.",
    "every spot is *my spot.* I'm the main character."
  ],
  "note": null,
  "pis": [
    "(on the floor)",
    "(still on the floor)",
    "(invited up!)"
  ],
  "tips": [
    {
      "who": "B",
      "head": "Leo, share | the *blanket.*",
      "line": "half the blanket. ok… *seventy-thirty.* final offer.",
      "card": {
        "icon": "blanket",
        "lines": [
          "50 / 50",
          {
            "t": "(70 / 30)",
            "red": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Taurus, move | over a *little.*",
      "line": "fine. you can have *the good cushion.* I'll grieve.",
      "card": {
        "icon": "cushion",
        "lines": [
          "the good one",
          "→ leo"
        ]
      }
    },
    {
      "who": "B",
      "head": "Take turns | *choosing.*",
      "line": "sundays? *the snacks decide.* I bribed the snacks.",
      "card": {
        "icon": "calendar",
        "lines": [
          "M W F: taurus",
          "T T S: leo",
          {
            "t": "sun: snacks",
            "red": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · one couch",
  "last": "*Sundays,* | the snacks win."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const HOOK = 'Taurus has a spot. | Leo has *every spot.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
