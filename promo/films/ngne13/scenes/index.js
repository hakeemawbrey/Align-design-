// ngne13: STAR TALK GAME NIGHT, Ep 13, "Aries vs Libra: Tie Breaker" (35 s vertical, opposite signs, a rematch, music: funk · A).
// Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Aries vs Libra. | The *rematch.*' Aries already hammering its buzzer; Libra deciding where to look.
//   R1 'can't wait to see you ___': Libra buzzes FIRST this time, 'this Friday. you pick the place.' / Aries 'in 5 min. I'm already in the car.' → Libra
//   R2 'They tell you when something bugs them.': Aries GREEN / Libra RED… then GREEN 'honest is kind.' → both
//   R3 'a night in vs a night out': both stay in → both. Final Libra 3–2: the ep 1 tie is broken.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne13", "A": {"sign": "aries", "intro": {"mood": "wide", "look": [0.3, 0.6], "buzz": true}}, "B": {"sign": "libra", "intro": {"mood": "neutral", "look": [-1, 0]}}, "hook": "Aries vs Libra. | The *rematch.*", "accent": "#e163d6", "welcome": "it was a tie. *rematch!*"},
  rounds: [
    {"prompt": "can't wait to see you ___", "first": "B", "a": {"text": "in 5 min. I'm already in the car.", "lose": "happy"}, "b": {"text": "this Friday. you pick the place."}, "point": "B", "host": "Libra buzzed *first!* point, Libra!"},
    {"prompt": "They tell you when something bugs them.", "first": "A", "a": {"text": "GREEN. say it to my face!", "flag": "G"}, "b": {"text": "…RED?", "flag": "R", "mood": "wide", "then": {"at": 1.1, "text": "no. GREEN. honest is kind.", "flag": "G"}}, "point": "both", "host": "two greens. Libra *decided!*"},
    {"prompt": "Your date wants a night in. You wanted a night out.", "first": "A", "a": {"text": "stay in. we pick the movie together."}, "b": {"text": "stay in. and plan the night out for Friday."}, "point": "both", "host": "both stayed in. *growth.*"},
  ],
  ...{"last": "Tie broken. *Kindness* stays.", "talk": "card-talk-3.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
