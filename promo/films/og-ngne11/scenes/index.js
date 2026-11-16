// og-ngne11: social rework of ngne11 "Virgo vs Pisces: Tissues Provided" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
//   0.0    HOOK "Pisces is crying. | Round one: *not yet.*" (the original hook and its kit caption are gone)
//   Pisces mid-sob at its podium; Virgo already holds out a tissue. R1 Pisces, R2 both, R3 Virgo. Final 2–2; Virgo sheds one tear. Cancer cheers in the front row.
//   Rounds: I bombed my presentation today. ___ · They cry at a movie on the first date. · Your date spills sauce on their shirt.
//   Last line (THE STARS): "Tears *and* tissues. Team effort."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'

export const HOOK = "Pisces is crying. | Round one: *not yet.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

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
  "hook": "Pisces is crying. | Round one: *not yet.*",
  "accent": "#7c74f0",
  "welcome": "tissues are *under* the podium.",
  "rounds": [
    {
      "prompt": "I bombed my presentation today. ___",
      "first": "A",
      "a": {
        "text": "here's what went wrong. 14 bullets. color-coded.",
        "lose": "wide"
      },
      "b": {
        "text": "I cried for you. twice. sending a hug."
      },
      "point": "B",
      "host": "hug first. bullets *never.* point, Pisces!"
    },
    {
      "prompt": "They cry at a movie on the first date.",
      "first": "A",
      "a": {
        "text": "…GREEN. I packed tissues. labeled by movie.",
        "flag": "G"
      },
      "b": {
        "text": "GREEN. I cried at the trailer.",
        "flag": "G"
      },
      "point": "both",
      "host": "feelings are *welcome* here. both score!"
    },
    {
      "prompt": "Your date spills sauce on their shirt.",
      "first": "B",
      "a": {
        "text": "stain pen. I carry six. pick a favorite."
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
  "id": "og-ngne11"
},
  draw(x, t) {
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
