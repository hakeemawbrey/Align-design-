// ngne02: STAR TALK GAME NIGHT, Ep 2, "Leo vs Sagittarius: Zero Inside Voices" (35 s vertical, fire signs,
// music: pop · G). Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Two fire signs. | *Zero* inside voices."
//   Leo poses, Sag already buzzing. R1 Leo, R2 Sag, R3 Sag. Final Sag 2–1; Leo leads the applause (CLAP! CLAP!).
//   Rounds: your friend just got dumped. you text: ___ · They say 'I don't know' when they don't know. · Your date's joke totally flops.
//   Last line (THE STARS): "Good losers clap *loudest.*"
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
    }
  },
  "B": {
    "sign": "sagittarius",
    "intro": {
      "mood": "wide",
      "look": [
        -0.4,
        0.6
      ],
      "buzz": true
    }
  },
  "hook": "Two fire signs. | *Zero* inside voices.",
  "accent": "#a35cf0",
  "welcome": "indoor voices, *please.*",
  "rounds": [
    {
      "prompt": "your friend just got dumped. you text: ___",
      "first": "B",
      "a": {
        "text": "on my way with snacks and a speech about you."
      },
      "b": {
        "text": "ROAD TRIP. leaving in 10. bring nothing.",
        "lose": "happy"
      },
      "point": "A",
      "host": "Leo shows *up.* point, Leo!"
    },
    {
      "prompt": "They say 'I don't know' when they don't know.",
      "first": "A",
      "a": {
        "text": "RED. always have an answer!",
        "flag": "R",
        "lose": "wide"
      },
      "b": {
        "text": "GREEN. honest beats impressive.",
        "flag": "G"
      },
      "point": "B",
      "host": "honest is *cute.* point, Sag!"
    },
    {
      "prompt": "Your date's joke totally flops.",
      "first": "A",
      "a": {
        "text": "laugh louder than everyone. loyalty.",
        "lose": "happy"
      },
      "b": {
        "text": "tell them it flopped. then laugh WITH them."
      },
      "point": "B",
      "host": "kind *and* honest. point, Sag!"
    }
  ],
  "last": "Good losers clap *loudest.*",
  "talk": "card-talk-1.png",
  "id": "ngne02"
},
  draw(x, t) {
    // the runner-up applauds the winner
    if (t > 25.6) for (const [i, c] of [25.7, 26.3, 26.9, 27.5].entries()) if (t > c && t < c + 0.6) label(x, 'CLAP!', POD.A + (i % 2 ? 90 : -90), 860 - 40 * prog(t, c, c + 0.6), { size: 40, col: '#ffd23a', font: "Inter, Arial, sans-serif", weight: 800, alpha: 1 - prog(t, c + 0.3, c + 0.6), rot: i % 2 ? 0.15 : -0.15 })
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
