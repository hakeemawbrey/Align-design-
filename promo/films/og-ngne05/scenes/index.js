// og-ngne05: social rework of ngne05 (static HOOK, no animated hook / GAME NIGHT title / bug / flashes / end card via ../gamekit.js copy, wilder signs). Was:
// ngne05: STAR TALK GAME NIGHT, Ep 5, "Gemini vs Sagittarius: Yes or Yes" (33 s vertical, opposite signs,
// music: chiptune · D). Story 0–30.6, then the short end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "The buzzer *can't* | keep up with these two."
//   Both talking over each other. R1 Gemini, R2 both, R3 Gemini. Final Gemini 3–1; Sag asks for a rematch.
//   Rounds: hey! random, but ___ · They put their phone away at dinner. · Your date says they're a homebody.
//   Last line (THE STARS): "Ask first. *Then* the adventure."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'   // og: this film's own copy

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "gemini",
    "intro": {
      "mood": "happy",
      "look": [
        1,
        0
      ],
      "buzz": true
    }
  },
  "B": {
    "sign": "sagittarius",
    "intro": {
      "mood": "happy",
      "look": [
        -1,
        0
      ],
      "buzz": true
    },
    "finale": {
      "mood": "happy",
      "look": [
        -1,
        0
      ]
    }
  },
  "hook": "The buzzer *can't* | keep up with these two.",
  "accent": "#f2cf4a",
  "welcome": "one at a time! *please!*",
  "rounds": [
    {
      "prompt": "hey! random, but ___",
      "first": "B",
      "a": {
        "text": "walked past your bakery. thought of you. twice."
      },
      "b": {
        "text": "you, me, a mountain, 5 a.m. yes or yes?",
        "lose": "wide"
      },
      "point": "A",
      "host": "'yes or yes' isn't a *question.* point, Gemini!"
    },
    {
      "prompt": "They put their phone away at dinner.",
      "first": "B",
      "a": {
        "text": "GREEN. and I'll put mine away too. mostly.",
        "flag": "G"
      },
      "b": {
        "text": "GREEN! more eye contact! I'll stare SO hard.",
        "flag": "G"
      },
      "point": "both",
      "host": "both green. *both* score!"
    },
    {
      "prompt": "Your date says they're a homebody.",
      "first": "B",
      "a": {
        "text": "ask about their favorite night in. then join it."
      },
      "b": {
        "text": "convert them. backpack. one-way ticket. day one.",
        "lose": "happy"
      },
      "point": "A",
      "host": "meet them *where they are.* point, Gemini!"
    }
  ],
  "last": "Ask first. *Then* the adventure.",
  "talk": "card-talk-5.png",
  "id": "og-ngne05"
},
  draw(x, t) {
    // both talking over each other before the host can finish
    if (t < 2.9) { const a = 1 - prog(t, 2.6, 2.9); for (const [i, s] of ['so—', 'wait—', 'ok but—', 'LISTEN—'].entries()) { const c = 0.1 + i * 0.6; if (t > c) label(x, s, (i % 2 ? POD.B : POD.A) + (i % 2 ? -30 : 30), 840 - (i > 1 ? 40 : 0), { size: 38, col: '#efe6d6', font: "Inter, Arial, sans-serif", weight: 800, alpha: a * Math.min(1, (t - c) * 5), rot: i % 2 ? 0.1 : -0.1 }) } }
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK

// og (social): static TikTok-style hook, on screen from frame 1 while both talk over each other
export const HOOK = '*\'Yes or yes?\'* | is not a question.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
