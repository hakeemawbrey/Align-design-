// og-nsse19: social rework of nsse19 (SIGN × SIGN, Volume 2: "Gemini × Libra: the invites and the yes-es."). Static HOOK (box) 0–3.6
// replaces the animated cold-open title; no series bug / FIELD GUIDE label / entry number / end card; crazier lines.
// Same notebook page, stars, prop cards and payoff; the look lives in ../ssokit.js (og copy of ../../nsse17/scenes/sskit.js).
// was: nsse19 — SIGN × SIGN, Vol. 2, ep 19: "Gemini × Libra: the invites and the yes-es." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Gemini × Libra: | *four parties, one night.*"  A: "we're at *three parties* tonight!"  B: "four. I said yes to *Leo's* too."
//   TIP 1  "Gemini, | *check in* with them."  A: "having fun? or should we *head out?*"
//   TIP 2  "Libra, it's okay | to say *no.*"  B: "we'd love to. just *not tonight!*"
//   TIP 3 ↻  "Leave early, | *together.*"  A: "best part of a party: *the walk home.*"
//   last line  "Party of *two,* | please."
import { makeFilm } from '../ssokit.js'

const F = makeFilm({
  "id": "og-nsse19",
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
    "we're at *three parties* tonight! at once!",
    "four. I said yes to *Leo's* too. and a brunch."
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
      "line": "having fun? or should we *fake a yawn?*",
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
      "line": "we'd love to! *not tonight!* (that felt amazing)",
      "card": {
        "icon": "envelope",
        "lines": [
          "regretfully",
          "declines (kindly)"
        ]
      }
    },
    {
      "who": "A",
      "head": "Leave early, | *together.*",
      "line": "best party all night: *the walk home.*",
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
export const HOOK = "Gemini said yes to | *four parties.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.6
export const STORY_END = F.STORY_END
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
