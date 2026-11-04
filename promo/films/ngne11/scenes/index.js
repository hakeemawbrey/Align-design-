// ngne11: STAR TALK GAME NIGHT, Ep 11, "Virgo vs Pisces: Tissues Provided" (35 s vertical, opposite signs,
// music: dreamy · Db). Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Pisces is crying. | The game *hasn’t started.*"
//   Pisces mid-sob at its podium; Virgo already holds out a tissue. R1 Pisces, R2 both, R3 Virgo. Final 2–2; Virgo sheds one tear. Cancer cheers in the front row.
//   Rounds: I bombed my presentation today. ___ · They cry at a movie on the first date. · Your date spills sauce on their shirt.
//   Last line (THE STARS): "Tears *and* tissues. Team effort."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../../ngne01/gamekit.js'

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "virgo",
    "prop": "tissue",
    "propUntil": 3.0,
    "intro": {
      "mood": "neutral",
      "look": [
        1,
        0
      ]
    },
    "oneTear": 25.9
  },
  "B": {
    "sign": "pisces",
    "intro": {
      "mood": "sparkle",
      "look": [
        -0.6,
        0
      ]
    },
    "cry": [
      [
        0,
        3
      ],
      [
        3.0,
        2
      ],
      [
        25.2,
        3
      ]
    ]
  },
  "hook": "Pisces is crying. | The game *hasn’t started.*",
  "accent": "#7c74f0",
  "welcome": "tissues are *under* the podium.",
  "rounds": [
    {
      "prompt": "I bombed my presentation today. ___",
      "first": "A",
      "a": {
        "text": "here's what went wrong, in 3 bullets.",
        "lose": "wide"
      },
      "b": {
        "text": "so proud you tried. sending the biggest hug."
      },
      "point": "B",
      "host": "hug first. bullets *never.* point, Pisces!"
    },
    {
      "prompt": "They cry at a movie on the first date.",
      "first": "A",
      "a": {
        "text": "…GREEN. I packed tissues just in case.",
        "flag": "G"
      },
      "b": {
        "text": "GREEN. I'll cry too. we'll take turns.",
        "flag": "G"
      },
      "point": "both",
      "host": "feelings are *welcome* here. both score!"
    },
    {
      "prompt": "Your date spills sauce on their shirt.",
      "first": "B",
      "a": {
        "text": "stain pen. I carry three. keep one."
      },
      "b": {
        "text": "spill mine too. now we match.",
        "lose": "happy"
      },
      "point": "A",
      "host": "Virgo came *prepared.* point, Virgo!"
    }
  ],
  "last": "Tears *and* tissues. Team effort.",
  "talk": "card-talk-1.png",
  "id": "ngne11"
},
  draw(x, t) {
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
