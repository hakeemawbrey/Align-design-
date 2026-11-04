// ngne09: STAR TALK GAME NIGHT, Ep 9, "Leo vs Aquarius: Center Stage" (33 s vertical, opposite signs,
// music: synthwave · F#m). Story 0–30.6, then the short end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Leo wants the spotlight. | Aquarius *built* a new one."
//   Aquarius tinkers with a homemade spotlight while Leo poses. R1 Leo, R2 Aquarius, R3 Aquarius. Final Aquarius 2–1; Leo bows and applauds.
//   Rounds: I had the worst day ___ · They have a hobby you don't understand. · Your date's friends are a little weird.
//   Last line (THE STARS): "Make room for *their* weird."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../../ngne01/gamekit.js'

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "leo",
    "intro": {
      "mood": "sparkle",
      "look": [
        0,
        0
      ]
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
    "sign": "aquarius",
    "prop": "wrench",
    "propUntil": 3.0,
    "intro": {
      "mood": "squint",
      "look": [
        -0.4,
        0.8
      ]
    }
  },
  "hook": "Leo wants the spotlight. | Aquarius *built* a new one.",
  "accent": "#38c4ec",
  "welcome": "please don't rewire the *set.*",
  "rounds": [
    {
      "prompt": "I had the worst day ___",
      "first": "B",
      "a": {
        "text": "tell me everything. you have the floor."
      },
      "b": {
        "text": "have you tried a hug robot? prototyping.",
        "lose": "happy"
      },
      "point": "A",
      "host": "Leo gave up the *floor!* point, Leo!"
    },
    {
      "prompt": "They have a hobby you don't understand.",
      "first": "A",
      "a": {
        "text": "RED. what if it's more interesting than me?",
        "flag": "R",
        "lose": "wide"
      },
      "b": {
        "text": "GREEN. ask them to explain it for an hour.",
        "flag": "G"
      },
      "point": "B",
      "host": "curiosity is *kind.* point, Aquarius!"
    },
    {
      "prompt": "Your date's friends are a little weird.",
      "first": "A",
      "a": {
        "text": "win them over with a story about me.",
        "lose": "happy"
      },
      "b": {
        "text": "great. weird friends are the best kind."
      },
      "point": "B",
      "host": "'weird' is a *compliment* here. point!"
    }
  ],
  "last": "Make room for *their* weird.",
  "talk": "card-talk-4.png",
  "id": "ngne09"
},
  draw(x, t) {
    // the runner-up applauds the winner
    if (t > 25.6) for (const [i, c] of [25.7, 26.3, 26.9, 27.5].entries()) if (t > c && t < c + 0.6) label(x, 'CLAP!', POD.A + (i % 2 ? 90 : -90), 860 - 40 * prog(t, c, c + 0.6), { size: 40, col: '#ffd23a', font: "Inter, Arial, sans-serif", weight: 800, alpha: 1 - prog(t, c + 0.3, c + 0.6), rot: i % 2 ? 0.15 : -0.15 })
    // Aquarius' homemade spotlight (a lamp on a stick) in the intro
    if (t < 3.0) { const a = 1 - prog(t, 2.6, 3.0); x.save(); x.globalAlpha = a; R(x, '#1b1236', POD.B + 150, 860, 14, 300); box(x, POD.B + 110, 820, 90, 60, '#38c4ec', { b: 6 }); spotlight(x, POD.B + 155, 880, POD.B, 1318, 300, 0.9 * (Math.sin(t * 9) > -0.3 ? 1 : 0.2), '160,230,255'); x.restore() }
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
