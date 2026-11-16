// og-ngne20: social rework of ngne20 "Scorpio vs Pisces: The Bigger Half" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "One last slice. | Who *gives* it up?"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne20", "A": {"sign": "scorpio", "prop": "tissue", "propUntil": 3.0, "intro": {"mood": "neutral", "look": [1, 0]}}, "B": {"sign": "pisces", "cry": [[-1, 2], [3.0, 2], [27.0, 3]], "intro": {"mood": "sparkle", "look": [-1, 0]}}, "hook": "One last slice. | Who *gives* it up?", "accent": "#8fe3ff", "welcome": "water night. *two* mops ready."},
  rounds: [
    {"prompt": "I got the apartment!! ___", "first": "B", "a": {"text": "proud of you. I already measured the walls."}, "b": {"text": "I'M SOBBING. I'm so happy for you!!"}, "point": "both", "host": "both kind. one is *damp.*"},
    {"prompt": "They text “home safe” after every date.", "first": "A", "a": {"text": "GREEN. I wait up for it. every time.", "flag": "G"}, "b": {"text": "GREEN. (crying again, sorry)", "flag": "G"}, "point": "both", "host": "two greens. mop the *podium.*"},
    {"prompt": "You both want the last slice.", "first": "B", "a": {"text": "split it. they get the bigger half. no debate."}, "b": {"text": "give it away. cry about it for a week.", "lose": "wide"}, "point": "A", "host": "Pisces, kindness *includes* you."},
  ],
  ...{"last": "Kind to them. Kind to *you*, too.", "talk": "card-talk-4.png", "fan": "libra"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
