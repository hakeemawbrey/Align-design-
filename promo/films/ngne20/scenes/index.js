// ngne20: STAR TALK GAME NIGHT, Ep 20, "Scorpio vs Pisces: The Bigger Half" (33 s vertical, same element: water, music: jazzy · Eb).
// Story 0–30.6, then the short end card (no card cut). The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'One last slice. | *Two* soft hearts.' Pisces crying at its podium; Scorpio holding out a tissue.
//   R1 'I got the apartment!! ___' both kind → both · R2 'They text “home safe”' both GREEN → both
//   R3 'You both want the last slice': Scorpio 'split it. they get the bigger half.' / Pisces 'give it away. cry about it later.' → Scorpio. Final Scorpio 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne20", "A": {"sign": "scorpio", "prop": "tissue", "propUntil": 3.0, "intro": {"mood": "neutral", "look": [1, 0]}}, "B": {"sign": "pisces", "cry": [[-1, 2], [3.0, 2], [27.0, 3]], "intro": {"mood": "sparkle", "look": [-1, 0]}}, "hook": "One last slice. | *Two* soft hearts.", "accent": "#8fe3ff", "welcome": "water night. mop *ready.*"},
  rounds: [
    {"prompt": "I got the apartment!! ___", "first": "B", "a": {"text": "proud of you. what color are the walls?"}, "b": {"text": "I'M CRYING. so happy for you!!"}, "point": "both", "host": "both kind. one is *damp.*"},
    {"prompt": "They text “home safe” after every date.", "first": "A", "a": {"text": "GREEN. quietly my favorite.", "flag": "G"}, "b": {"text": "GREEN. (crying again, sorry)", "flag": "G"}, "point": "both", "host": "two greens. mop the *podium.*"},
    {"prompt": "You both want the last slice.", "first": "B", "a": {"text": "split it. they get the bigger half."}, "b": {"text": "give it away. cry about it later.", "lose": "wide"}, "point": "A", "host": "Pisces, kindness *includes* you."},
  ],
  ...{"last": "Kind to them. Kind to *you*, too.", "talk": "card-talk-4.png", "fan": "libra"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
