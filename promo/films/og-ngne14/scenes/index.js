// og-ngne14: social rework of ngne14 "Gemini vs Libra: Two Replies" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "Gemini vs Libra: | pick *one* answer."
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne14", "A": {"sign": "gemini", "intro": {"mood": "wide", "look": [0.4, 0.5], "buzz": true}}, "B": {"sign": "libra", "intro": {"mood": "neutral", "look": [-0.6, 0]}}, "hook": "Gemini vs Libra: | pick *one* answer.", "accent": "#ffe27a", "welcome": "air night. one answer *each.*"},
  rounds: [
    {"prompt": "“can we talk later?” you: ___", "first": "A", "a": {"text": "sure! wait. WHAT? also hi. also WHAT??", "mood": "wide", "lose": "happy"}, "b": {"text": "of course. I'm free after six."}, "point": "B", "host": "Gemini, that was *four* texts."},
    {"prompt": "They remember a tiny thing you said weeks ago.", "first": "A", "a": {"text": "GREEN!", "flag": "G", "then": {"at": 1.0, "text": "RED? no. GREEN. final. final final.", "flag": "G"}}, "b": {"text": "GREEN. that's feeling heard.", "flag": "G"}, "point": "both", "host": "two greens. Gemini picked *one!*"},
    {"prompt": "Your friend can't choose between two dates.", "first": "B", "a": {"text": "ask what they really want. then listen."}, "b": {"text": "make a pros and cons list. and a list of lists.", "mood": "wide", "lose": "happy"}, "point": "A", "host": "Libra, the list has a *list.*"},
  ],
  ...{"last": "One answer is *plenty.*", "talk": "card-talk-4.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
