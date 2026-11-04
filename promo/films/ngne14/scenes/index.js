// ngne14: STAR TALK GAME NIGHT, Ep 14, "Gemini vs Libra: Two Replies" (33 s vertical, same element: air, music: pop · F).
// Story 0–30.6, then the short end card (no card cut). The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Gemini vs Libra. | Who picks *one* answer?' Gemini mid-buzz; Libra weighing it up.
//   R1 '“can we talk later?” you: ___': Gemini 'sure! wait. talk about WHAT??' / Libra 'of course. I'm free after six.' → Libra
//   R2 'They remember a tiny thing you said': Gemini GREEN… RED? GREEN, final / Libra GREEN → both
//   R3 'friend can't choose between two dates': Gemini 'ask what they want, then listen' / Libra's list of lists → Gemini. Final 2–2, a tie.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne14", "A": {"sign": "gemini", "intro": {"mood": "wide", "look": [0.4, 0.5], "buzz": true}}, "B": {"sign": "libra", "intro": {"mood": "neutral", "look": [-0.6, 0]}}, "hook": "Gemini vs Libra. | Who picks *one* answer?", "accent": "#ffe27a", "welcome": "air night. one answer *each.*"},
  rounds: [
    {"prompt": "“can we talk later?” you: ___", "first": "A", "a": {"text": "sure! wait. talk about WHAT??", "mood": "wide", "lose": "happy"}, "b": {"text": "of course. I'm free after six."}, "point": "B", "host": "Gemini, that was *two* texts."},
    {"prompt": "They remember a tiny thing you said weeks ago.", "first": "A", "a": {"text": "GREEN!", "flag": "G", "then": {"at": 1.0, "text": "RED? no. GREEN. final.", "flag": "G"}}, "b": {"text": "GREEN. that's feeling heard.", "flag": "G"}, "point": "both", "host": "two greens. Gemini picked *one!*"},
    {"prompt": "Your friend can't choose between two dates.", "first": "B", "a": {"text": "ask what they really want. then listen."}, "b": {"text": "make a pros and cons list. and a list of lists.", "mood": "wide", "lose": "happy"}, "point": "A", "host": "Libra, the list has a *list.*"},
  ],
  ...{"last": "One answer is *plenty.*", "talk": "card-talk-4.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
