// og-ngne10: social rework of ngne10 "Taurus vs Capricorn: No Rush" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
//   0.0    HOOK "The *slowest* round | of all time." (the original hook and its kit caption are gone)
//   THE STARS tap a wristwatch; Taurus and Capricorn sip tea, buzzers untouched. R1 Capricorn, R2 Taurus, R3 Capricorn. Final Capricorn 2–1.
//   Rounds: can we talk about where this is going? ___ · They bring a five-year plan to date two. · Your date wants takeout, not the fancy dinner.
//   Last line (THE STARS): "No rush. *Still* sure."
import { makeGame, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp } from '../gamekit.js'

export const HOOK = "The *slowest* round | of all time."
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const POD = { A: 250, B: 830 }
const EP = makeGame({
  ...{
  "A": {
    "sign": "taurus",
    "prop": "tea",
    "propUntil": 3.0,
    "intro": {
      "mood": "sleepy",
      "look": [
        0,
        0
      ]
    }
  },
  "B": {
    "sign": "capricorn",
    "prop": "tea",
    "propUntil": 3.0,
    "intro": {
      "mood": "sleepy",
      "look": [
        0,
        0
      ]
    }
  },
  "hook": "The *slowest* round | of all time.",
  "accent": "#2fc79a",
  "welcome": "any time now. *any* time.",
  "rounds": [
    {
      "prompt": "can we talk about where this is going? ___",
      "first": "A",
      "buzzAt": 1.5,
      "a": {
        "text": "yes. after dessert. and a nap.",
        "lose": "happy"
      },
      "b": {
        "text": "yes. and no rush. we have time."
      },
      "point": "B",
      "host": "'no rush' from *Capricorn?!* point!"
    },
    {
      "prompt": "They bring a five-year plan to date two.",
      "first": "B",
      "a": {
        "text": "cute. my plan is dessert. forever.",
        "flag": "G"
      },
      "b": {
        "text": "GREEN. mine is ten years. laminated.",
        "flag": "G",
        "lose": "happy"
      },
      "point": "A",
      "host": "slow is *allowed.* point, Taurus!"
    },
    {
      "prompt": "Your date wants takeout, not the fancy dinner.",
      "first": "A",
      "a": {
        "text": "say yes. takeout in pajamas is love.",
        "lose": "happy"
      },
      "b": {
        "text": "say yes. and still wear the tie."
      },
      "point": "B",
      "host": "Capricorn *let go of the plan!* point!"
    }
  ],
  "last": "No rush. *Still* sure.",
  "talk": "card-talk-5.png",
  "id": "og-ngne10"
},
  draw(x, t) {
    // THE STARS tap a wristwatch while nobody buzzes
    if (t < 3.0) { const a = 1 - prog(t, 2.6, 3.0); drawProp(x, t, 'watch', 470, 1150 + 6 * Math.sin(t * 10), a); label(x, 'tap tap', 440, 1080, { size: 26, col: '#efe6d6', alpha: a * (Math.sin(t * 6) > 0 ? 1 : 0.4) }) }
    void [x, t, label, prog, lerp, ease, R, box, spotlight, hearts, drawProp, POD]
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
