// og-ngne17: social rework of ngne17 "Gemini vs Sagittarius: Nice Save" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "Gemini wants *lies.* | Sag wants honesty."
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne17", "A": {"sign": "gemini", "intro": {"mood": "happy", "look": [1, 0]}}, "B": {"sign": "sagittarius", "intro": {"mood": "sparkle", "look": [-1, 0], "buzz": true}}, "hook": "Gemini wants *lies.* | Sag wants honesty.", "accent": "#c88bff", "welcome": "rematch! both buzzers *already* hot."},
  rounds: [
    {"prompt": "my plans just got canceled. ___", "first": "B", "a": {"text": "call me? I'll do six voices till you laugh."}, "b": {"text": "new plan: night market. I'm in the car."}, "point": "both", "host": "two rescues. *very* fast ones."},
    {"prompt": "They tell you the truth, even when it's awkward.", "first": "A", "a": {"text": "RED. lie to me, it's cozier.", "flag": "R", "mood": "happy", "then": {"at": 1.1, "text": "…kidding!! GREEN. GREEN.", "flag": "G"}}, "b": {"text": "GREEN. honest, but gently. like a hug.", "flag": "G"}, "point": "B", "host": "Gemini. *nice* save. point, Sag!"},
    {"prompt": "Your date wants to stay home. You want an adventure.", "first": "B", "a": {"text": "stay in. trade our weirdest stories. all of them."}, "b": {"text": "adventure inside: a blanket fort. three floors."}, "point": "both", "host": "both stayed home. *who are you?*"},
  ],
  ...{"last": "Honest, *and* gentle with it.", "talk": "card-talk-1.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
