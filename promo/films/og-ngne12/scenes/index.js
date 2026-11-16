// og-ngne12: social rework of ngne12 "Aries vs Sagittarius: Before the Host" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
//   0.0    HOOK "Both buzzed. | No host *yet.*" (the original hook and its kit caption are gone)
//   Both slam buzzers before the host arrives; the host's mic stand is empty, THE STARS dash in late. R1 Sag, R2 Sag, R3 Aries. Final Sag 2–1.
//   Rounds: hey, I'm free this weekend ___ · They need a day to think before answering. · Your date walks slower than you.
//   Last line (THE STARS): "Fast is fun. *Patient* wins."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'

export const HOOK = "Both buzzed. | No host *yet.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "aries",
    "intro": {
      "mood": "wide",
      "look": [
        0,
        0
      ],
      "buzz": true
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
    "sign": "sagittarius",
    "intro": {
      "mood": "wide",
      "look": [
        0,
        0
      ],
      "buzz": true
    }
  },
  "hook": "Both buzzed. | No host *yet.*",
  "accent": "#a35cf0",
  "welcome": "sorry! *I'm here!*",
  "hostIn": 1.3,
  "welcomeAt": 1.45,
  "welcomeClose": 3.9,
  "rounds": [
    {
      "prompt": "hey, I'm free this weekend ___",
      "first": "A",
      "a": {
        "text": "RACE YOU TO THE PARK. I ALREADY LEFT.",
        "lose": "wide"
      },
      "b": {
        "text": "already packed. road trip? you pick where."
      },
      "point": "B",
      "host": "'you pick' is the *magic* word. point, Sag!"
    },
    {
      "prompt": "They need a day to think before answering.",
      "first": "A",
      "a": {
        "text": "RED. a DAY?? I aged a year.",
        "flag": "R",
        "lose": "squint"
      },
      "b": {
        "text": "GREEN. good things take a minute.",
        "flag": "G"
      },
      "point": "B",
      "host": "patience is a *flex.* point, Sag!"
    },
    {
      "prompt": "Your date walks slower than you.",
      "first": "B",
      "a": {
        "text": "slow down. hold their hand. walk."
      },
      "b": {
        "text": "walk slower. befriend every dog.",
        "lose": "happy"
      },
      "point": "A",
      "host": "Aries *slowed down!* point, Aries!"
    }
  ],
  "last": "Fast is fun. *Patient* wins.",
  "talk": "card-talk-6.png",
  "id": "og-ngne12"
},
  draw(x, t) {
    // the host's spot is empty: a lone mic stand, then THE STARS dash in from the wings
    if (t < 1.4) { const a = 1 - prog(t, 1.1, 1.4); x.save(); x.globalAlpha = a; R(x, '#1b1236', 532, 1150, 16, 110); box(x, 520, 1120, 40, 34, '#cfd3e6', { b: 5 }); x.restore(); label(x, 'HOST: ON THE WAY', 540, 1090, { size: 24, col: '#ffd23a', alpha: a }) }
    if (t > 1.0 && t < 1.5) for (let i = 0; i < 4; i++) R(x, 'rgba(247,207,104,0.6)', 1040 - (t - 1.0) * 1000 + i * 40, 1180 + i * 14, 60, 6)
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
