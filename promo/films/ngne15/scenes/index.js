// ngne15: STAR TALK GAME NIGHT, Ep 15, "Taurus vs Scorpio: Staring, Round Two" (35 s vertical, opposite signs, a rematch, music: lofi · Dm).
// Story 0–30.6, then the shared end card. The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Taurus vs Scorpio. | The staring *rematch.*' Both locked in a squint across the stage (ep 3 went to Scorpio).
//   R1 'I'm so nervous about tomorrow. ___': both kind → both
//   R2 'They ask to take things slower': both GREEN → both
//   R3 'Your date forgot your birthday': Taurus 'tell them it stung. then cake, together.' / Scorpio 'remember it. forever. quietly.' → Taurus. Final Taurus 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne15", "A": {"sign": "taurus", "intro": {"mood": "squint", "look": [1, 0]}}, "B": {"sign": "scorpio", "intro": {"mood": "squint", "look": [-1, 0]}}, "hook": "Taurus vs Scorpio. | The staring *rematch.*", "accent": "#e05b75", "welcome": "rematch. *no* staring."},
  rounds: [
    {"prompt": "I'm so nervous about tomorrow. ___", "first": "B", "a": {"text": "come over. I'll make your favorite."}, "b": {"text": "you've got this. tell me the scary part."}, "point": "both", "host": "both kind. still *staring*, though."},
    {"prompt": "They ask to take things a little slower.", "first": "A", "a": {"text": "GREEN. slow is my speed.", "flag": "G"}, "b": {"text": "GREEN. means they're serious.", "flag": "G"}, "point": "both", "host": "two greens. *nobody* blinked."},
    {"prompt": "Your date forgot your birthday.", "first": "A", "a": {"text": "tell them it stung. then cake, together."}, "b": {"text": "remember it. forever. quietly.", "mood": "squint", "lose": "wide"}, "point": "A", "host": "Scorpio, *say it*, then let it go."},
  ],
  ...{"last": "Say the hurt. *Then* the cake.", "talk": "card-talk-5.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
