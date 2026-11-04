// ngne16: STAR TALK GAME NIGHT, Ep 16, "Cancer vs Scorpio: Who, When, Why" (35 s vertical, same element: water, music: dreamy · E).
// Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Cancer vs Scorpio. | The *feelings* round.' Cancer mid-sniff with a tissue; Scorpio leaning in.
//   R1 'I can't sleep. ___': Scorpio 'why? since when? who? what happened?' / Cancer 'call me. I'll read you something boring.' → Cancer
//   R2 'They ask before posting a photo of you': both GREEN → both
//   R3 'Your date tells you something personal': both kind → both. Final Cancer 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne16", "A": {"sign": "cancer", "prop": "tissue", "propUntil": 3.0, "intro": {"mood": "wide", "look": [0, -0.4]}}, "B": {"sign": "scorpio", "intro": {"mood": "squint", "look": [-1, 0.2]}}, "hook": "Cancer vs Scorpio. | The *feelings* round.", "accent": "#8fb8ff", "welcome": "water night. tissues *ready.*"},
  rounds: [
    {"prompt": "I can't sleep. ___", "first": "B", "a": {"text": "call me. I'll read you something boring."}, "b": {"text": "why? since when? who? what happened?", "mood": "squint", "lose": "wide"}, "point": "A", "host": "Scorpio, that's an *interview.*"},
    {"prompt": "They ask before they post a photo of you.", "first": "A", "a": {"text": "GREEN. so thoughtful.", "flag": "G"}, "b": {"text": "GREEN. privacy is romantic.", "flag": "G"}, "point": "both", "host": "two greens. *very* respectful."},
    {"prompt": "Your date tells you something really personal.", "first": "B", "a": {"text": "listen. then share something back."}, "b": {"text": "keep it safe. never use it in a fight."}, "point": "both", "host": "both kind. Pisces needs *more* tissues."},
  ],
  ...{"last": "Soft answers *still* win.", "talk": "card-talk-6.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
