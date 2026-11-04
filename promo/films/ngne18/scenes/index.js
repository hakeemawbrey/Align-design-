// ngne18: STAR TALK GAME NIGHT, Ep 18, "Libra vs Aquarius: A Theory of Missing" (35 s vertical, same element: air, music: synthwave · Bm).
// Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Libra vs Aquarius. | Big *feelings*, bigger ideas.' Aquarius tinkering with a wrench.
//   R1 '“I miss you.” you: ___': Aquarius 'missing is just distance with feelings.' / Libra 'miss you too. call tonight?' → Libra
//   R2 'They give you space when you ask' both GREEN → both
//   R3 'Your date disagrees with you': Libra 'agree, keep the peace' / Aquarius 'get curious' → Aquarius. Final 2–2, a tie.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne18", "A": {"sign": "libra", "intro": {"mood": "happy", "look": [0.6, -0.6]}}, "B": {"sign": "aquarius", "prop": "wrench", "propUntil": 3.0, "intro": {"mood": "sparkle", "look": [0, -1]}}, "hook": "Libra vs Aquarius. | Big *feelings*, bigger ideas.", "accent": "#7fd0ff", "welcome": "air night. bring *feelings.*"},
  rounds: [
    {"prompt": "“I miss you.” you: ___", "first": "B", "a": {"text": "miss you too. call tonight?"}, "b": {"text": "missing is just distance with feelings.", "mood": "sparkle", "lose": "wide"}, "point": "A", "host": "Aquarius, say it *back.*"},
    {"prompt": "They give you space when you ask for it.", "first": "A", "a": {"text": "GREEN. and they check in after.", "flag": "G"}, "b": {"text": "GREEN. space is my favorite place.", "flag": "G"}, "point": "both", "host": "two greens. one *in orbit.*"},
    {"prompt": "Your date disagrees with you.", "first": "A", "a": {"text": "agree with them. keep the peace.", "lose": "wide"}, "b": {"text": "get curious. ask how they got there."}, "point": "B", "host": "Libra, you can disagree *kindly.*"},
  ],
  ...{"last": "Different minds. *Both* kind.", "talk": "card-talk-2.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
