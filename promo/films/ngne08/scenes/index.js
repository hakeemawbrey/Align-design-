// ngne08: STAR TALK GAME NIGHT, Ep 8, "Taurus vs Virgo: Snack Diplomacy" (33 s vertical, earth signs,
// music: lofi · Ab). Story 0–30.6, then the short end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Round one hasn't started. | Taurus is *eating.*"
//   Taurus mid-bite of a sandwich. R1 Virgo, R2 Taurus, R3 Virgo (holds back from cleaning). Final Virgo 2–1.
//   Rounds: at the store! want anything? ___ · They offer you the first bite. · Your date's apartment is a mess.
//   Last line (THE STARS): "Snacks are a *love* language."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../../ngne01/gamekit.js'

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "taurus",
    "prop": "sandwich",
    "propUntil": 3.0,
    "intro": {
      "mood": "happy",
      "look": [
        0,
        0
      ],
      "squash": 0.08
    },
    "finale": {
      "mood": "happy",
      "look": [
        1,
        0
      ]
    }
  },
  "B": {
    "sign": "virgo",
    "intro": {
      "mood": "wide",
      "look": [
        -1,
        0.2
      ]
    }
  },
  "hook": "Round one hasn't started. | Taurus is *eating.*",
  "accent": "#e9b24a",
  "welcome": "no snacks on set. …*fine.*",
  "rounds": [
    {
      "prompt": "at the store! want anything? ___",
      "first": "A",
      "a": {
        "text": "chips. the good ones. and you, come back.",
        "lose": "happy"
      },
      "b": {
        "text": "no thanks! text me when you're home safe."
      },
      "point": "B",
      "host": "'text when you're home'? *point,* Virgo!"
    },
    {
      "prompt": "They offer you the first bite.",
      "first": "A",
      "a": {
        "text": "…GREEN. that's love.",
        "flag": "G",
        "mood": "sparkle"
      },
      "b": {
        "text": "GREEN. if they also wipe the table.",
        "flag": "G",
        "lose": "happy"
      },
      "point": "A",
      "host": "the first bite is *sacred.* point, Taurus!"
    },
    {
      "prompt": "Your date's apartment is a mess.",
      "first": "B",
      "a": {
        "text": "compliment the couch. sit on the couch.",
        "lose": "happy"
      },
      "b": {
        "text": "…don't clean it. don't clean it.",
        "mood": "squint"
      },
      "point": "B",
      "host": "Virgo *held back.* growth! point!"
    }
  ],
  "last": "Snacks are a *love* language.",
  "talk": "card-talk-3.png",
  "id": "ngne08"
},
  draw(x, t) {
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
