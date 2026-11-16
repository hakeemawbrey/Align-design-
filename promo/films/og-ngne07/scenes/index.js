// og-ngne07: social rework of ngne07 "Cancer vs Capricorn: Soup or Steps" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
//   0.0    HOOK "Cancer: *soup.* | Capricorn: *a plan.*" (the original hook and its kit caption are gone)
//   Cancer carrying soup, Capricorn with a planner. R1 Cancer, R2 Capricorn, R3 Capricorn (blushes). Final Capricorn 2–1.
//   Rounds: rough day? ___ · They say 'I need a quiet night alone.' · Your date cancels because work ran late.
//   Last line (THE STARS): "Plans and soup. *Both* are love."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'

export const HOOK = "Cancer: *soup.* | Capricorn: *a plan.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

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
  "hook": "Cancer: *soup.* | Capricorn: *a plan.*",
  "accent": "#3fb6f0",
  "welcome": "is that a *whole pot* of soup?",
  "rounds": [
    {
      "prompt": "rough day? ___",
      "first": "B",
      "a": {
        "text": "I'm already outside. the soup is in the car."
      },
      "b": {
        "text": "here's a 12-step plan. step 1: hydrate.",
        "lose": "wide"
      },
      "point": "A",
      "host": "soup first, steps later. *point,* Cancer!"
    },
    {
      "prompt": "They say 'I need a quiet night alone.'",
      "first": "A",
      "a": {
        "text": "RED. alone?? I'll leave soup at their door.",
        "flag": "R",
        "lose": "wide"
      },
      "b": {
        "text": "GREEN. I book my alone nights. in ink.",
        "flag": "G"
      },
      "point": "B",
      "host": "rest isn't *rejection.* point, Capricorn!"
    },
    {
      "prompt": "Your date cancels because work ran late.",
      "first": "A",
      "a": {
        "text": "a 'proud of you' text. and soup. by courier.",
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
  "id": "og-ngne07"
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
