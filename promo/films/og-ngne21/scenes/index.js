// og-ngne21: social rework of ngne21 "Leo vs Aquarius: Same Story Twice" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "Same story twice. | Leo: *my turn.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne21", "A": {"sign": "leo", "intro": {"mood": "sparkle", "look": [0, 0]}}, "B": {"sign": "aquarius", "prop": "wrench", "propUntil": 3.0, "intro": {"mood": "happy", "look": [-1, 0]}}, "hook": "Same story twice. | Leo: *my turn.*", "accent": "#f39a3a", "welcome": "rematch! Leo *brought* a spotlight."},
  rounds: [
    {"prompt": "I'm nervous to meet your friends. ___", "first": "A", "a": {"text": "don't be. I'll introduce you with a drumroll."}, "b": {"text": "they're weird. one collects rocks. you'll love them."}, "point": "both", "host": "two warm welcomes. *aww.*"},
    {"prompt": "They cheer for your wins, even tiny ones.", "first": "B", "a": {"text": "GREEN. then I cheer back louder. with a speech.", "flag": "G"}, "b": {"text": "GREEN. even the weird wins. especially those.", "flag": "G"}, "point": "both", "host": "two greens. so much *cheering.*"},
    {"prompt": "Your date tells the same story twice.", "first": "A", "a": {"text": "tell a better one. about me. with a costume change.", "mood": "sparkle", "lose": "wide"}, "b": {"text": "laugh again. it got funnier."}, "point": "B", "host": "Leo, they weren't *finished.*"},
  ],
  ...{"last": "Let them *finish* the story.", "talk": "card-talk-5.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
