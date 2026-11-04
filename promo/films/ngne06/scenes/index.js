// ngne06: STAR TALK GAME NIGHT, Ep 6, "Aries vs Leo: The Main Event" (35 s vertical, fire signs,
// music: house · C). Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "Aries *and* Leo. | Somebody get a bigger stage."
//   Leo bows under its own spotlight, Aries hammering the buzzer. R1 Leo, R2 Aries (changes its mind), R3 both. Final 2–2.
//   Rounds: congrats on the new job! ___ · They admit they were wrong, mid-argument. · Your date gets more compliments at the party.
//   Last line (THE STARS): "The spotlight fits *two.*"
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../../ngne01/gamekit.js'

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "aries",
    "intro": {
      "mood": "wide",
      "look": [
        0.4,
        0.5
      ],
      "buzz": true
    }
  },
  "B": {
    "sign": "leo",
    "intro": {
      "mood": "sparkle",
      "look": [
        0,
        0
      ],
      "squash": 0.1
    }
  },
  "hook": "Aries *and* Leo. | Somebody get a bigger stage.",
  "accent": "#f39a3a",
  "welcome": "two stars. one *stage.*",
  "rounds": [
    {
      "prompt": "congrats on the new job! ___",
      "first": "A",
      "a": {
        "text": "now race me to the next one.",
        "lose": "squint"
      },
      "b": {
        "text": "I'm throwing you a party. you're the star."
      },
      "point": "B",
      "host": "hyping *them,* not you. point, Leo!"
    },
    {
      "prompt": "They admit they were wrong, mid-argument.",
      "first": "A",
      "a": {
        "text": "RED. never stop mid-argument!",
        "flag": "R",
        "then": {
          "at": 3.0,
          "text": "…wait. GREEN. that's rare.",
          "flag": "G",
          "mood": "sparkle"
        }
      },
      "b": {
        "text": "GREEN. iconic behavior.",
        "flag": "G",
        "lose": "happy"
      },
      "point": "A",
      "host": "you *changed your mind!* point, Aries!"
    },
    {
      "prompt": "Your date gets more compliments at the party.",
      "first": "B",
      "a": {
        "text": "be proud. then go get us snacks."
      },
      "b": {
        "text": "compliment them louder than everyone."
      },
      "point": "both",
      "host": "both *proud.* both score!"
    }
  ],
  "last": "The spotlight fits *two.*",
  "talk": "card-talk-6.png",
  "id": "ngne06"
},
  draw(x, t) {
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
