// og-ngne18: social rework of ngne18 "Libra vs Aquarius: A Theory of Missing" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "\"I miss you.\" | Aquarius: *a theory.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne18", "A": {"sign": "libra", "intro": {"mood": "happy", "look": [0.6, -0.6]}}, "B": {"sign": "aquarius", "prop": "wrench", "propUntil": 3.0, "intro": {"mood": "sparkle", "look": [0, -1]}}, "hook": "\"I miss you.\" | Aquarius: *a theory.*", "accent": "#7fd0ff", "welcome": "air night. *please* bring feelings."},
  rounds: [
    {"prompt": "“I miss you.” you: ___", "first": "B", "a": {"text": "miss you too. call tonight? and tomorrow?"}, "b": {"text": "missing is distance with feelings. I made a chart.", "mood": "sparkle", "lose": "wide"}, "point": "A", "host": "Aquarius, say it *back.*"},
    {"prompt": "They give you space when you ask for it.", "first": "A", "a": {"text": "GREEN. then they check in. with a snack.", "flag": "G"}, "b": {"text": "GREEN. space is my home planet.", "flag": "G"}, "point": "both", "host": "two greens. one *in orbit.*"},
    {"prompt": "Your date disagrees with you.", "first": "A", "a": {"text": "agree. agree twice. apologise for agreeing.", "lose": "wide"}, "b": {"text": "get curious. ask for their whole theory."}, "point": "B", "host": "Libra, you can disagree *kindly.*"},
  ],
  ...{"last": "Different minds. *Both* kind.", "talk": "card-talk-2.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
