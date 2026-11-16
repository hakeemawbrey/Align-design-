// og-nsse24: social rework of nsse24 (static HOOK outline 0–3.5 instead of the animated title; no show bug, notebook
// header or entry number; no stamp shake; ends on the last line; an even faster Aries, a Wi-Fi-snowman Aquarius).
// Kit: ./sskit.js (og copy of ../../nsse17/scenes/sskit.js).
// Was: nsse24 — SIGN × SIGN, Vol. 2, ep 24: "Aries × Aquarius: the snowman and the snow-bot." (28 s vertical, star_advice post; short end card, no card transition)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Aries × Aquarius: | *snowman, or snow-bot?*"  A: "snowman! *done!* next!"  B: "it needs *solar panels.*"
//   TIP 1  "Aries, ask their | idea *first.*"  A: "ok. show me the blueprint. *slowly.*"
//   TIP 2  "Aquarius, join in | before it's *perfect.*"  B: "fine. the carrot can *just be a carrot.*"
//   TIP 3 ↻  "Build it weird, | *together.*"  A: "best snow-bot *on the block.*"
//   last line  "One snowman. | *Two* inventors."
import { makeFilm } from './sskit.js'

const F = makeFilm({
  "id": "og-nsse24",
  "ep": 24,
  "music": {
    "style": "chiptune",
    "key": "F",
    "seed": 1724
  },
  "A": {
    "id": "aries",
    "wants": "done, 9 sec ago",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "aquarius",
    "wants": "Wi-Fi in it",
    "mood": "happy",
    "react": "squint"
  },
  "title": "Aries × Aquarius: | *snowman, or snow-bot?*",
  "hook": [
    "snowman! built! *nine seconds!* next!",
    "it needs solar panels. *and Wi-Fi.*"
  ],
  "note": null,
  "pis": [
    "(cold)",
    "(very cold)",
    "(proud & frozen)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Aries, ask their | idea *first.*",
      "line": "ok. show me the blueprint. *all forty pages.*",
      "card": {
        "icon": "blueprint",
        "lines": [
          "SNOW-BOT v7",
          "(40 pages)"
        ]
      }
    },
    {
      "who": "B",
      "head": "Aquarius, join in | before it's *perfect.*",
      "line": "fine. the carrot doesn't need *a software update.*",
      "card": {
        "icon": "carrot",
        "lines": [
          "the nose:",
          "a carrot.",
          {
            "t": "(no updates)",
            "red": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Build it weird, | *together.*",
      "line": "best snow-bot *in the solar system.*",
      "card": {
        "icon": "snowbot",
        "lines": [
          "antenna: yes",
          "scarf: yes",
          {
            "t": "wi-fi: pending",
            "red": true
          }
        ]
      }
    }
  ],
  "fig4": "fig. 4 · co-inventors",
  "last": "One snowman. | *Two* inventors."
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const HOOK = 'Aries: done! next! | Aquarius: *v2 please.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
