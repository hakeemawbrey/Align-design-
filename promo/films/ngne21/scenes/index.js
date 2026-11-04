// ngne21: STAR TALK GAME NIGHT, Ep 21, "Leo vs Aquarius: Same Story Twice" (33 s vertical, opposite signs, a rematch, music: pop · B).
// Story 0–30.6, then the short end card (no card cut). The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Leo vs Aquarius. | The spotlight *rematch.*' Leo posing, Aquarius with a wrench (ep 9 went to Aquarius).
//   R1 'I'm nervous to meet your friends. ___' both kind → both · R2 'They cheer for your tiny wins' both GREEN → both
//   R3 'Your date tells the same story twice': Leo 'tell a better one. about me.' / Aquarius 'laugh again. it's still good.' → Aquarius. Final Aquarius 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne21", "A": {"sign": "leo", "intro": {"mood": "sparkle", "look": [0, 0]}}, "B": {"sign": "aquarius", "prop": "wrench", "propUntil": 3.0, "intro": {"mood": "happy", "look": [-1, 0]}}, "hook": "Leo vs Aquarius. | The spotlight *rematch.*", "accent": "#f39a3a", "welcome": "rematch! *one* spotlight."},
  rounds: [
    {"prompt": "I'm nervous to meet your friends. ___", "first": "A", "a": {"text": "don't be. I'll introduce you like a star."}, "b": {"text": "they're weird. you'll love them."}, "point": "both", "host": "two warm welcomes. *aww.*"},
    {"prompt": "They cheer for your wins, even tiny ones.", "first": "B", "a": {"text": "GREEN. and I cheer back louder.", "flag": "G"}, "b": {"text": "GREEN. even the weird wins.", "flag": "G"}, "point": "both", "host": "two greens. so much *cheering.*"},
    {"prompt": "Your date tells the same story twice.", "first": "A", "a": {"text": "tell a better one. about me.", "mood": "sparkle", "lose": "wide"}, "b": {"text": "laugh again. it's still good."}, "point": "B", "host": "Leo, they weren't *finished.*"},
  ],
  ...{"last": "Let them *finish* the story.", "talk": "card-talk-5.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
