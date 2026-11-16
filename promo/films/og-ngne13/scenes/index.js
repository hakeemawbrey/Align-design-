// og-ngne13: social rework of ngne13 "Aries vs Libra: Tie Breaker" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "Libra buzzed *first.* | Nobody's okay."
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne13", "A": {"sign": "aries", "intro": {"mood": "wide", "look": [0.3, 0.6], "buzz": true}}, "B": {"sign": "libra", "intro": {"mood": "neutral", "look": [-1, 0]}}, "hook": "Libra buzzed *first.* | Nobody's okay.", "accent": "#e163d6", "welcome": "it was a tie. *rematch!*"},
  rounds: [
    {"prompt": "can't wait to see you ___", "first": "B", "a": {"text": "now. I'm in your driveway. honking.", "lose": "happy"}, "b": {"text": "this Friday. you pick the place."}, "point": "B", "host": "Libra buzzed *first!* point, Libra!"},
    {"prompt": "They tell you when something bugs them.", "first": "A", "a": {"text": "GREEN. say it to my face. loudly.", "flag": "G"}, "b": {"text": "…RED?", "flag": "R", "mood": "wide", "then": {"at": 1.1, "text": "no. GREEN. honest is kind.", "flag": "G"}}, "point": "both", "host": "two greens. Libra *decided!*"},
    {"prompt": "Your date wants a night in. You wanted a night out.", "first": "A", "a": {"text": "stay in. I already picked nine movies."}, "b": {"text": "stay in. and plan the night out for Friday."}, "point": "both", "host": "both stayed in. *growth.*"},
  ],
  ...{"last": "Tie broken. *Kindness* stays.", "talk": "card-talk-3.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
