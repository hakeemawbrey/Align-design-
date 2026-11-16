// og-nsse22: social rework of nsse22 (SIGN × SIGN, Volume 2: "Libra × Pisces: the hike neither of them wanted."). Static HOOK (outline) 0–3.6
// replaces the animated cold-open title; no series bug / FIELD GUIDE label / entry number / end card; crazier lines.
// Same notebook page, stars, prop cards and payoff; the look lives in ../ssokit.js (og copy of ../../nsse17/scenes/sskit.js).
// was: nsse22 — SIGN × SIGN, Vol. 2, ep 22: "Libra × Pisces: the hike neither of them wanted." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Libra × Pisces: | *we both love hiking!*"  A: "I love hiking! *(my feet don't.)*"  B: "me too!! *(I want a nap.)*"
//   TIP 1  "Pisces, be honest, | *gently.*"  A: "honestly? *my toes* are crying too."
//   TIP 2  "Libra, honesty | *is* harmony."  B: "phew. I hate it too. *cocoa?*"
//   TIP 3 ↻  "Pick the date | you *both* love."  A: "watching the snow is *the best part.*"
//   last line  "*Honest* | is romantic."
import { makeFilm } from '../ssokit.js'

const F = makeFilm({
  "id": "og-nsse22",
  "ep": 22,
  "music": {
    "style": "jazzy",
    "key": "Bb",
    "seed": 1722
  },
  "A": {
    "id": "pisces",
    "wants": "a love story",
    "mood": "wide",
    "react": "happy"
  },
  "B": {
    "id": "libra",
    "wants": "no arguments",
    "mood": "happy",
    "react": "happy"
  },
  "title": "Libra × Pisces: | *we both love hiking!*",
  "hook": [
    "I love hiking! *(my feet are sobbing.)*",
    "me too!! *(I want a nap so badly.)*"
  ],
  "note": null,
  "pis": [
    "(for pisces)",
    "(for the toes)",
    "(happy tears)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Pisces, be honest, | *gently.*",
      "line": "honestly? *my toes* are writing a sad poem.",
      "card": {
        "icon": "boot",
        "lines": [
          "honest feet:",
          "\"ouch\""
        ]
      }
    },
    {
      "who": "B",
      "head": "Libra, honesty | *is* harmony.",
      "line": "phew. I hate it SO much. *cocoa?*",
      "card": {
        "icon": "scale",
        "lines": [
          "truth + heart",
          {
            "t": "balanced",
            "circle": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Pick the date | you *both* love.",
      "line": "snow from a bench: *peak hiking.*",
      "card": {
        "icon": "mug",
        "lines": [
          "trailhead bench",
          "two cocoas"
        ],
        "icon2": "snow"
      }
    }
  ],
  "fig4": "fig. 4 · honest & cozy",
  "last": "*Honest* | is romantic."
})
export const HOOK = "We both hate hiking. | *Neither said so.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.6
export const STORY_END = F.STORY_END
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
