// ngne04: STAR TALK GAME NIGHT, Ep 4, "Virgo vs Capricorn: Clipboards Out" (33 s vertical, earth signs,
// music: lofi · F). Story 0–30.6, then the short end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Two earth signs. | One *clipboard* each."
//   Both scribbling on clipboards. R1 both, R2 Virgo, R3 Virgo. Final Virgo 3–1; Capricorn hands Virgo a gold star sticker.
//   Rounds: it's our 1-month! I made you ___ · They're 10 minutes late but texted ahead. · They forgot your coffee order.
//   Last line (THE STARS): "Perfect *loses.* Patient wins."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../../ngne01/gamekit.js'

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "virgo",
    "prop": "clipboard",
    "propUntil": 3.0,
    "intro": {
      "mood": "neutral",
      "look": [
        -0.6,
        0.4
      ]
    }
  },
  "B": {
    "sign": "capricorn",
    "prop": "clipboard",
    "propUntil": 3.0,
    "intro": {
      "mood": "neutral",
      "look": [
        0.6,
        0.4
      ]
    },
    "finale": {
      "mood": "happy",
      "look": [
        -1,
        0
      ]
    }
  },
  "hook": "Two earth signs. | One *clipboard* each.",
  "accent": "#2fc79a",
  "welcome": "pens down. *hearts* up.",
  "rounds": [
    {
      "prompt": "it's our 1-month! I made you ___",
      "first": "A",
      "a": {
        "text": "a color-coded list of things you like."
      },
      "b": {
        "text": "a calendar with our next 12 dates."
      },
      "point": "both",
      "host": "both *paid attention.* both score!"
    },
    {
      "prompt": "They're 10 minutes late but texted ahead.",
      "first": "B",
      "a": {
        "text": "GREEN. they kept you posted.",
        "flag": "G"
      },
      "b": {
        "text": "RED. on time is a love language.",
        "flag": "R",
        "lose": "eyeroll"
      },
      "point": "A",
      "host": "a heads-up *counts.* point, Virgo!"
    },
    {
      "prompt": "They forgot your coffee order.",
      "first": "B",
      "a": {
        "text": "laugh. nobody remembers 'oat, half sweet.'"
      },
      "b": {
        "text": "write it on a sticky note. for next time.",
        "lose": "happy"
      },
      "point": "A",
      "host": "grace over *perfect.* point, Virgo!"
    }
  ],
  "last": "Perfect *loses.* Patient wins.",
  "talk": "card-talk-4.png",
  "id": "ngne04"
},
  draw(x, t) {
    // Capricorn hands Virgo a gold star sticker
    if (t > 26.9) { const k = prog(t, 26.9, 27.5); drawProp(x, t, 'sticker', lerp(POD.B - 60, POD.A + 80, ease.inOutCubic(k)), lerp(1000, 960, k) - 60 * Math.sin(Math.PI * k), Math.min(1, k * 4) * (1 - prog(t, 30.1, 30.4))) }
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
