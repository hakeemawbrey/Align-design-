// ngne23: STAR TALK GAME NIGHT, Ep 23, "Virgo vs Pisces: The Spare Key" (35 s vertical, opposite signs, a rematch, music: lofi · E).
// Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Virgo vs Pisces. | Tissues *restocked.*' Pisces crying at its podium; Virgo with a clipboard (ep 11 was a tie).
//   R1 'I locked myself out. ___': Pisces 'oh no!! I'm crying FOR you!!' / Virgo 'on my way with the spare. and a snack.' → Virgo
//   R2 'They admit they're scared to say “I like you”' both GREEN → both
//   R3 'Your date shows up late, flustered' both kind → both. Final Virgo 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne23", "A": {"sign": "virgo", "prop": "clipboard", "propUntil": 3.0, "intro": {"mood": "neutral", "look": [1, 0]}}, "B": {"sign": "pisces", "cry": [[-1, 2], [3.0, 2], [27.0, 3]], "intro": {"mood": "sparkle", "look": [-1, 0]}}, "hook": "Virgo vs Pisces. | Tissues *restocked.*", "accent": "#8fe3ff", "welcome": "rematch! tissues *restocked.*"},
  rounds: [
    {"prompt": "I locked myself out. ___", "first": "B", "a": {"text": "on my way with the spare. and a snack."}, "b": {"text": "oh no!! I'm crying FOR you!!", "lose": "happy"}, "point": "A", "host": "Virgo brought the *spare.* point!"},
    {"prompt": "They admit they're scared to say “I like you.”", "first": "A", "a": {"text": "GREEN. that's brave.", "flag": "G"}, "b": {"text": "GREEN. (sobbing) me too.", "flag": "G"}, "point": "both", "host": "two greens. *so* many tissues."},
    {"prompt": "Your date shows up late, flustered.", "first": "B", "a": {"text": "“you're here. that's the point.”"}, "b": {"text": "hug them. we're here now."}, "point": "both", "host": "both kind. Virgo *smiled.*"},
  ],
  ...{"last": "Bring tissues. *And* the spare.", "talk": "card-talk-1.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
