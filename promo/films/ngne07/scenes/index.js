// ngne07: STAR TALK GAME NIGHT, Ep 7, "Cancer vs Capricorn: Soup or Steps" (35 s vertical, opposite signs,
// music: dreamy · Eb). Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js.
//   0.0    hook "One brought *soup.* | One brought a planner."
//   Cancer carrying soup, Capricorn with a planner. R1 Cancer, R2 Capricorn, R3 Capricorn (blushes). Final Capricorn 2–1.
//   Rounds: rough day? ___ · They say 'I need a quiet night alone.' · Your date cancels because work ran late.
//   Last line (THE STARS): "Plans and soup. *Both* are love."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../../ngne01/gamekit.js'

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "cancer",
    "prop": "soup",
    "propUntil": 3.0,
    "intro": {
      "mood": "happy",
      "look": [
        1,
        0
      ]
    }
  },
  "B": {
    "sign": "capricorn",
    "prop": "planner",
    "propUntil": 3.0,
    "intro": {
      "mood": "neutral",
      "look": [
        -0.5,
        0.6
      ]
    }
  },
  "hook": "One brought *soup.* | One brought a planner.",
  "accent": "#3fb6f0",
  "welcome": "welcome! is that *soup?*",
  "rounds": [
    {
      "prompt": "rough day? ___",
      "first": "B",
      "a": {
        "text": "I'm coming over. soup's already warm."
      },
      "b": {
        "text": "here's a 5-step plan to fix it.",
        "lose": "wide"
      },
      "point": "A",
      "host": "soup first, steps later. *point,* Cancer!"
    },
    {
      "prompt": "They say 'I need a quiet night alone.'",
      "first": "A",
      "a": {
        "text": "RED. why would they want to be alone??",
        "flag": "R",
        "lose": "wide"
      },
      "b": {
        "text": "GREEN. rest is not rejection.",
        "flag": "G"
      },
      "point": "B",
      "host": "rest isn't *rejection.* point, Capricorn!"
    },
    {
      "prompt": "Your date cancels because work ran late.",
      "first": "A",
      "a": {
        "text": "send a 'proud of you' text. and soup.",
        "lose": "happy"
      },
      "b": {
        "text": "reschedule. and actually say 'I missed you.'"
      },
      "point": "B",
      "host": "Capricorn said a *feeling!* point!"
    }
  ],
  "last": "Plans and soup. *Both* are love.",
  "talk": "card-talk-2.png",
  "id": "ngne07"
},
  draw(x, t) {
    // Capricorn said a feeling out loud: blushing hearts
    hearts(x, t, 22.2, POD.B + 60, 1080, { n: 6 })
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
