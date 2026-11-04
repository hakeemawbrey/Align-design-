// ngne17: STAR TALK GAME NIGHT, Ep 17, "Gemini vs Sagittarius: Nice Save" (35 s vertical, opposite signs, a rematch, music: house · A).
// Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Gemini vs Sagittarius. | Round *two.*' Sag already buzzing (ep 5 went to Gemini).
//   R1 'my plans just got canceled. ___': both kind → both
//   R2 'They tell you the truth, even when awkward': Gemini 'RED. lie to me, it's cozier.' …kidding, GREEN / Sag 'GREEN. honest, but gently.' → Sag
//   R3 'stay home vs adventure': both kind → both. Final Sag 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne17", "A": {"sign": "gemini", "intro": {"mood": "happy", "look": [1, 0]}}, "B": {"sign": "sagittarius", "intro": {"mood": "sparkle", "look": [-1, 0], "buzz": true}}, "hook": "Gemini vs Sagittarius. | Round *two.*", "accent": "#c88bff", "welcome": "rematch! breathe, *both.*"},
  rounds: [
    {"prompt": "my plans just got canceled. ___", "first": "B", "a": {"text": "call me? I'll talk until you laugh."}, "b": {"text": "new plan: you, me, the night market."}, "point": "both", "host": "two rescues. *very* fast ones."},
    {"prompt": "They tell you the truth, even when it's awkward.", "first": "A", "a": {"text": "RED. lie to me, it's cozier.", "flag": "R", "mood": "happy", "then": {"at": 1.1, "text": "…kidding. GREEN.", "flag": "G"}}, "b": {"text": "GREEN. honest, but gently.", "flag": "G"}, "point": "B", "host": "Gemini. *nice* save. point, Sag!"},
    {"prompt": "Your date wants to stay home. You want an adventure.", "first": "B", "a": {"text": "stay in. trade our weirdest stories."}, "b": {"text": "adventure inside: blanket fort."}, "point": "both", "host": "both stayed home. *who are you?*"},
  ],
  ...{"last": "Honest, *and* gentle with it.", "talk": "card-talk-1.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
