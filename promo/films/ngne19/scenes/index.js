// ngne19: STAR TALK GAME NIGHT, Ep 19, "Cancer vs Capricorn: Soup, Again" (33 s vertical, opposite signs, a rematch, music: lofi · Bb).
// Story 0–30.6, then the short end card (no card cut). The set, timeline and sound live in ../../ngne01/gamekit.js (promo/films/next30/b07.md, b08.md).
//   0.0 hook 'Soup vs planner. | *Rematch.*' Cancer holding soup, Capricorn a planner (ep 7 went to Capricorn).
//   R1 'I'm really proud of you. ___': both kind (Capricorn says a feeling) → both
//   R2 'They make time for you in a busy week' both GREEN → both
//   R3 'Your date is stressed about work': Capricorn 'a 5-step plan' / Cancer 'ask what they need. soup can wait.' → Cancer. Final Cancer 3–2.
import { makeGame } from '../../ngne01/gamekit.js'

const EP = makeGame({
  ...{"id": "ngne19", "A": {"sign": "cancer", "prop": "soup", "propUntil": 3.0, "intro": {"mood": "happy", "look": [1, 0]}}, "B": {"sign": "capricorn", "prop": "planner", "propUntil": 3.0, "intro": {"mood": "neutral", "look": [-1, 0]}}, "hook": "Soup vs planner. | *Rematch.*", "accent": "#9fd8f6", "welcome": "rematch! soup *down.*"},
  rounds: [
    {"prompt": "I'm really proud of you. ___", "first": "B", "a": {"text": "I'M CRYING. you're proud of me??"}, "b": {"text": "thank you. that means a lot.", "mood": "happy"}, "point": "both", "host": "Capricorn said a *feeling!*"},
    {"prompt": "They make time for you in a busy week.", "first": "A", "a": {"text": "GREEN. I'd bring them soup.", "flag": "G"}, "b": {"text": "GREEN. time is the real gift.", "flag": "G"}, "point": "both", "host": "two greens. *warm* in here."},
    {"prompt": "Your date is stressed about work.", "first": "B", "a": {"text": "ask what they need. soup can wait."}, "b": {"text": "make them a plan. 5 steps. color-coded.", "lose": "wide"}, "point": "A", "host": "Cancer asked *first.* point!"},
  ],
  ...{"last": "Love asks *what you need.*", "talk": "card-talk-3.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
