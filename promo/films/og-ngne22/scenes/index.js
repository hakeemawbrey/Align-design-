// og-ngne22: social rework of ngne22 "Gemini vs Aquarius: Silence Is Allowed" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "Date goes quiet. | Gemini: *fun facts.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne22", "A": {"sign": "gemini", "intro": {"mood": "sparkle", "look": [0.5, -0.5], "buzz": true}}, "B": {"sign": "aquarius", "prop": "wrench", "propUntil": 3.0, "intro": {"mood": "sparkle", "look": [0, -1]}}, "hook": "Date goes quiet. | Gemini: *fun facts.*", "accent": "#8fd3ff", "welcome": "air night. topic: *any* of them."},
  rounds: [
    {"prompt": "I got you something small. ___", "first": "A", "a": {"text": "WHAT is it?? no wait! tell me! no!!"}, "b": {"text": "you thought of me? that's the whole gift."}, "point": "both", "host": "two sweet replies. *zero* focus."},
    {"prompt": "They laugh at your weird jokes.", "first": "B", "a": {"text": "GREEN. keep them forever. frame them.", "flag": "G"}, "b": {"text": "GREEN. weird is my first language.", "flag": "G"}, "point": "both", "host": "two greens. very *weird.*"},
    {"prompt": "Your date is quiet tonight.", "first": "A", "a": {"text": "fill the silence. fun facts. all of them. alphabetical.", "mood": "wide", "lose": "happy"}, "b": {"text": "ask if they're okay. then just sit."}, "point": "B", "host": "Gemini, silence is *allowed.*"},
  ],
  ...{"last": "Quiet company counts *too.*", "talk": "card-talk-6.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
