// ngne24: STAR TALK GAME NIGHT, Ep 24, "Cancer vs Pisces: Finale" (33 s vertical, same element: water, music: dreamy · Ab).
// Story 0–30.6, then the short end card (no card cut). The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Finale night. | *Everyone* is crying.' Cancer and Pisces both mid-sob at their podiums with tissues.
//   R1 'thank you for tonight. ___' both kind · R2 'They tell you how they feel' both GREEN
//   R3 'Your opponent is crying': Cancer 'hand them a tissue. then hug.' / Pisces 'hug them. we both win.' → both. Final 3–3, a tie: everyone wins.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne24", "A": {"sign": "cancer", "prop": "tissue", "propUntil": 3.0, "cry": [[-1, 1], [17.8, 2], [25.2, 3]], "intro": {"mood": "sparkle", "look": [1, 0]}}, "B": {"sign": "pisces", "prop": "tissue", "propUntil": 3.0, "cry": [[-1, 2], [10.4, 3]], "intro": {"mood": "sparkle", "look": [-1, 0]}}, "hook": "Finale night. | *Everyone* is crying.", "accent": "#8fe3ff", "welcome": "finale. *extra* tissues."},
  rounds: [
    {"prompt": "thank you for tonight. ___", "first": "A", "a": {"text": "thank YOU. text me when you're home?"}, "b": {"text": "I'm already crying. thank you."}, "point": "both", "host": "both kind. both *soaked.*"},
    {"prompt": "They tell you how they feel, out loud.", "first": "B", "a": {"text": "GREEN. the biggest green there is.", "flag": "G"}, "b": {"text": "(sobbing) yes. GREEN.", "flag": "G"}, "point": "both", "host": "two greens. the floor is *wet.*"},
    {"prompt": "Last question. Your opponent is crying.", "first": "B", "a": {"text": "hand them a tissue. then hug."}, "b": {"text": "hug them. we both win."}, "point": "both", "host": "we have lost control of the *show.*"},
  ],
  ...{"last": "Kindness wins. *Even* the finale.", "talk": "card-talk-2.png", "fan": "aquarius"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
