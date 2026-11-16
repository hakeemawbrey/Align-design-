// og-ngne24: social rework of ngne24 "Cancer vs Pisces: Finale" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "The finale. | *Everyone* is crying."
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne24", "A": {"sign": "cancer", "prop": "tissue", "propUntil": 3.0, "cry": [[-1, 1], [17.8, 2], [25.2, 3]], "intro": {"mood": "sparkle", "look": [1, 0]}}, "B": {"sign": "pisces", "prop": "tissue", "propUntil": 3.0, "cry": [[-1, 2], [10.4, 3]], "intro": {"mood": "sparkle", "look": [-1, 0]}}, "hook": "The finale. | *Everyone* is crying.", "accent": "#8fe3ff", "welcome": "finale. tissues by the *crate.*"},
  rounds: [
    {"prompt": "thank you for tonight. ___", "first": "A", "a": {"text": "thank YOU. text me when home. and when asleep."}, "b": {"text": "I'm already crying. thank you. sorry. thank you."}, "point": "both", "host": "both kind. both *soaked.*"},
    {"prompt": "They tell you how they feel, out loud.", "first": "B", "a": {"text": "GREEN. the biggest green that has ever existed.", "flag": "G"}, "b": {"text": "(sobbing) yes. GREEN. a very wet green.", "flag": "G"}, "point": "both", "host": "two greens. the floor is *wet.*"},
    {"prompt": "Last question. Your opponent is crying.", "first": "B", "a": {"text": "hand them a tissue. then all the tissues. then hug."}, "b": {"text": "hug them. we both win. we're both soaked."}, "point": "both", "host": "we have lost control of the *show.*"},
  ],
  ...{"last": "Kindness wins. *Even* the finale.", "talk": "card-talk-2.png", "fan": "aquarius"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
