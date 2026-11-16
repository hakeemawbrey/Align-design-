// og-ngne08: social rework of ngne08 "Taurus vs Virgo: Snack Diplomacy" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
//   0.0    HOOK "Game hasn't started. | Taurus is *eating.*" (the original hook and its kit caption are gone)
//   Taurus mid-bite of a sandwich. R1 Virgo, R2 Taurus, R3 Virgo (holds back from cleaning). Final Virgo 2–1.
//   Rounds: at the store! want anything? ___ · They offer you the first bite. · Your date's apartment is a mess.
//   Last line (THE STARS): "Snacks are a *love* language."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'

export const HOOK = "Game hasn't started. | Taurus is *eating.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

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
  "hook": "Game hasn't started. | Taurus is *eating.*",
  "accent": "#e9b24a",
  "welcome": "no snacks on set. *Taurus.*",
  "rounds": [
    {
      "prompt": "at the store! want anything? ___",
      "first": "A",
      "a": {
        "text": "chips. the good ones. all of them.",
        "lose": "happy"
      },
      "b": {
        "text": "nothing! text me when you're home. and hydrated."
      },
      "point": "B",
      "host": "'text when you're home'? *point,* Virgo!"
    },
    {
      "prompt": "They offer you the first bite.",
      "first": "A",
      "a": {
        "text": "…GREEN. nobody gets my first bite. ever.",
        "flag": "G",
        "mood": "sparkle"
      },
      "b": {
        "text": "GREEN. after I sanitize the fork.",
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
        "text": "compliment the couch. nap on the couch.",
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
  "id": "og-ngne08"
},
  draw(x, t) {
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
