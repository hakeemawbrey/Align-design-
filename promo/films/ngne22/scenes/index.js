// ngne22: STAR TALK GAME NIGHT, Ep 22, "Gemini vs Aquarius: Silence Is Allowed" (35 s vertical, same element: air, music: funk · Bb).
// Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Gemini vs Aquarius. | *Focus*, please.' Gemini mid-buzz; Aquarius tinkering, already off topic.
//   R1 'I got you something small. ___' both kind → both · R2 'They laugh at your weird jokes' both GREEN → both
//   R3 'Your date is quiet tonight': Gemini 'fun facts. all of them.' / Aquarius 'ask if they're okay. then just sit.' → Aquarius. Final Aquarius 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne22", "A": {"sign": "gemini", "intro": {"mood": "sparkle", "look": [0.5, -0.5], "buzz": true}}, "B": {"sign": "aquarius", "prop": "wrench", "propUntil": 3.0, "intro": {"mood": "sparkle", "look": [0, -1]}}, "hook": "Gemini vs Aquarius. | *Focus*, please.", "accent": "#8fd3ff", "welcome": "air night. stay on *topic.*"},
  rounds: [
    {"prompt": "I got you something small. ___", "first": "A", "a": {"text": "WHAT is it?? no wait, surprise me!!"}, "b": {"text": "you thought of me? that's the gift."}, "point": "both", "host": "two sweet replies. *zero* focus."},
    {"prompt": "They laugh at your weird jokes.", "first": "B", "a": {"text": "GREEN. keep them forever.", "flag": "G"}, "b": {"text": "GREEN. weird is the point.", "flag": "G"}, "point": "both", "host": "two greens. very *weird.*"},
    {"prompt": "Your date is quiet tonight.", "first": "A", "a": {"text": "fill the silence. fun facts. all of them.", "mood": "wide", "lose": "happy"}, "b": {"text": "ask if they're okay. then just sit."}, "point": "B", "host": "Gemini, silence is *allowed.*"},
  ],
  ...{"last": "Quiet company counts *too.*", "talk": "card-talk-6.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
