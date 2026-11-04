// nsse24 — SIGN × SIGN, Vol. 2, ep 24: "Aries × Aquarius: the snowman and the snow-bot." (28 s vertical, star_advice post)
// The shared look + timeline live in ../../nsse17/scenes/sskit.js (see its header for the timing).
//   cold open  "Aries × Aquarius: | *snowman, or snow-bot?*"  A: "snowman! *done!* next!"  B: "it needs *solar panels.*"
//   TIP 1  "Aries, ask their | idea *first.*"  A: "ok. show me the blueprint. *slowly.*"
//   TIP 2  "Aquarius, join in | before it's *perfect.*"  B: "fine. the carrot can *just be a carrot.*"
//   TIP 3 ↻  "Build it weird, | *together.*"  A: "best snow-bot *on the block.*"
//   last line  "One snowman. | *Two* inventors."
import { makeFilm } from '../../nsse17/scenes/sskit.js'

const F = makeFilm({
  "id": "nsse24",
  "ep": 24,
  "music": {
    "style": "chiptune",
    "key": "F",
    "seed": 1724
  },
  "A": {
    "id": "aries",
    "wants": "done, now",
    "mood": "sparkle",
    "react": "wide"
  },
  "B": {
    "id": "aquarius",
    "wants": "done differently",
    "mood": "happy",
    "react": "squint"
  },
  "title": "Aries × Aquarius: | *snowman, or snow-bot?*",
  "hook": [
    "snowman! *done!* next!",
    "it needs *solar panels.*"
  ],
  "note": null,
  "pis": [
    "(cold)",
    "(very cold)",
    "(proud & cold)"
  ],
  "tips": [
    {
      "who": "A",
      "head": "Aries, ask their | idea *first.*",
      "line": "ok. show me the blueprint. *slowly.*",
      "card": {
        "icon": "blueprint",
        "lines": [
          "SNOW-BOT v2",
          "(read slowly)"
        ]
      }
    },
    {
      "who": "B",
      "head": "Aquarius, join in | before it's *perfect.*",
      "line": "fine. the carrot can *just be a carrot.*",
      "card": {
        "icon": "carrot",
        "lines": [
          "the nose:",
          "a carrot.",
          {
            "t": "(final)",
            "red": true
          }
        ]
      }
    },
    {
      "who": "A",
      "head": "Build it weird, | *together.*",
      "line": "best snow-bot *on the block.*",
      "card": {
        "icon": "snowbot",
        "lines": [
          "antenna ✓",
          "scarf ✓"
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
