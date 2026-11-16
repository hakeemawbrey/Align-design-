// og-ngne02: social rework of ngne02 (static HOOK, no animated hook / GAME NIGHT title / bug / flashes / end card via ../gamekit.js copy, wilder signs). Was:
// ngne02: STAR TALK GAME NIGHT, Ep 2, "Leo vs Sagittarius: Zero Inside Voices" (33 s vertical, fire signs,
// music: pop · G). Story 0–30.6, then the short end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Two fire signs. | *Zero* inside voices."
//   Leo poses, Sag already buzzing. R1 Leo, R2 Sag, R3 Sag. Final Sag 2–1; Leo leads the applause (CLAP! CLAP!).
//   Rounds: your friend just got dumped. you text: ___ · They say 'I don't know' when they don't know. · Your date's joke totally flops.
//   Last line (THE STARS): "Good losers clap *loudest.*"
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'   // og: this film's own copy

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
        "text": "on my way. snacks, a cape, and a speech about YOU."
      },
      "b": {
        "text": "ROAD TRIP. leaving in 10. bring a passport.",
        "lose": "happy"
      },
      "point": "A",
      "host": "Leo shows *up.* point, Leo!"
    },
    {
      "prompt": "They say 'I don't know' when they don't know.",
      "first": "A",
      "a": {
        "text": "RED. I always know. I'm Leo.",
        "flag": "R",
        "lose": "wide"
      },
      "b": {
        "text": "GREEN. honesty is my whole personality.",
        "flag": "G"
      },
      "point": "B",
      "host": "honest is *cute.* point, Sag!"
    },
    {
      "prompt": "Your date's joke totally flops.",
      "first": "A",
      "a": {
        "text": "standing ovation. encore. loyalty.",
        "lose": "happy"
      },
      "b": {
        "text": "say it flopped. LOUDLY. then laugh WITH them."
      },
      "point": "B",
      "host": "kind *and* honest. point, Sag!"
    }
  ],
  "last": "Good losers clap *loudest.*",
  "talk": "card-talk-1.png",
  "id": "og-ngne02"
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

// og (social): static TikTok-style hook, on screen from frame 1 while the two fire signs face off
export const HOOK = 'Leo vs Sagittarius: | *nobody* whispers.'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
