// og-ngne23: social rework of ngne23 "Virgo vs Pisces: The Spare Key" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "Locked out at night. | Who *actually* helps?"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne23", "A": {"sign": "virgo", "prop": "clipboard", "propUntil": 3.0, "intro": {"mood": "neutral", "look": [1, 0]}}, "B": {"sign": "pisces", "cry": [[-1, 2], [3.0, 2], [27.0, 3]], "intro": {"mood": "sparkle", "look": [-1, 0]}}, "hook": "Locked out at night. | Who *actually* helps?", "accent": "#8fe3ff", "welcome": "rematch! tissues restocked *by* Virgo."},
  rounds: [
    {"prompt": "I locked myself out. ___", "first": "B", "a": {"text": "on my way. the spare, a snack, a backup spare."}, "b": {"text": "oh no!! I'm crying FOR you!! from home!!", "lose": "happy"}, "point": "A", "host": "Virgo brought the *spare.* point!"},
    {"prompt": "They admit they're scared to say “I like you.”", "first": "A", "a": {"text": "GREEN. that's brave. writing it down.", "flag": "G"}, "b": {"text": "GREEN. (sobbing) me too. me TOO.", "flag": "G"}, "point": "both", "host": "two greens. *so* many tissues."},
    {"prompt": "Your date shows up late, flustered.", "first": "B", "a": {"text": "\"you're here. that's the point.\" I saved you a seat."}, "b": {"text": "hug them. cry a bit. we're here now."}, "point": "both", "host": "both kind. Virgo *smiled.*"},
  ],
  ...{"last": "Bring tissues. *And* the spare.", "talk": "card-talk-1.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
