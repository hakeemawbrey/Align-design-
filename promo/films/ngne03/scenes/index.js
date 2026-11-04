// ngne03: STAR TALK GAME NIGHT, Ep 3, "Taurus vs Scorpio: The Staring Round" (33 s vertical, opposite signs,
// music: jazzy · Bb). Story 0–30.6, then the short end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Taurus vs Scorpio. | The *staring* round."
//   Both glare, nobody buzzes; Taurus finally buzzes late. R1 Scorpio, R2 Taurus, R3 Scorpio. Final Scorpio 2–1.
//   Rounds: I can't make dinner tonight, ___ · They ask what your middle name is. · They tell you a secret on date three.
//   Last line (THE STARS): "Even the vault has a *door.*"
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../../ngne01/gamekit.js'

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "taurus",
    "intro": {
      "mood": "squint",
      "look": [
        1,
        0
      ]
    }
  },
  "B": {
    "sign": "scorpio",
    "intro": {
      "mood": "squint",
      "look": [
        -1,
        0
      ]
    }
  },
  "hook": "Taurus vs Scorpio. | The *staring* round.",
  "accent": "#e23d66",
  "welcome": "buzzers? *anyone?*",
  "rounds": [
    {
      "prompt": "I can't make dinner tonight, ___",
      "first": "A",
      "buzzAt": 1.6,
      "a": {
        "text": "but I'm saving you the last slice."
      },
      "b": {
        "text": "honestly I'm wiped. Sunday, my treat?"
      },
      "point": "B",
      "host": "honest *and* a plan. point, Scorpio!"
    },
    {
      "prompt": "They ask what your middle name is.",
      "first": "B",
      "a": {
        "text": "GREEN. they want to say it right.",
        "flag": "G"
      },
      "b": {
        "text": "RED. why do they need it.",
        "flag": "R",
        "lose": "wide"
      },
      "point": "A",
      "host": "curiosity isn't a *trap.* point, Taurus!"
    },
    {
      "prompt": "They tell you a secret on date three.",
      "first": "A",
      "a": {
        "text": "keep it. and bring them soup? unrelated.",
        "lose": "happy"
      },
      "b": {
        "text": "keep it. and trust them with one back."
      },
      "point": "B",
      "host": "trust goes *both* ways. point, Scorpio!"
    }
  ],
  "last": "Even the vault has a *door.*",
  "talk": "card-talk-3.png",
  "id": "ngne03"
},
  draw(x, t) {
    // the staring contest: a crackle of tension between them, nobody buzzes
    if (t < 3.0) for (let i = 0; i < 6; i++) { const p = ((t * 2.2 + i / 6) % 1); label(x, '·', 420 + p * 240, 1010 + 14 * Math.sin(p * 20 + i), { size: 46, col: '#ffd23a', alpha: (1 - prog(t, 2.6, 2.95)) * Math.sin(Math.PI * p) }) }
    if (t < 3.0) label(x, 'NOBODY HAS BLINKED', 540, 880, { size: 26, col: '#efe6d6', alpha: 1 - prog(t, 2.6, 2.95) })
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
