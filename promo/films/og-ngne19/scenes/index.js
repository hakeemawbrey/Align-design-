// og-ngne19: social rework of ngne19 "Cancer vs Capricorn: Soup, Again" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "You need a hug. | Capricorn: *5 steps.*"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne19", "A": {"sign": "cancer", "prop": "soup", "propUntil": 3.0, "intro": {"mood": "happy", "look": [1, 0]}}, "B": {"sign": "capricorn", "prop": "planner", "propUntil": 3.0, "intro": {"mood": "neutral", "look": [-1, 0]}}, "hook": "You need a hug. | Capricorn: *5 steps.*", "accent": "#9fd8f6", "welcome": "rematch! soup *off* the podium."},
  rounds: [
    {"prompt": "I'm really proud of you. ___", "first": "B", "a": {"text": "I'M CRYING. you're proud of ME??"}, "b": {"text": "thank you. that means... a lot. noted.", "mood": "happy"}, "point": "both", "host": "Capricorn said a *feeling!*"},
    {"prompt": "They make time for you in a busy week.", "first": "A", "a": {"text": "GREEN. I'd bring them soup. a whole pot.", "flag": "G"}, "b": {"text": "GREEN. I'd put them in my calendar. in ink.", "flag": "G"}, "point": "both", "host": "two greens. *warm* in here."},
    {"prompt": "Your date is stressed about work.", "first": "B", "a": {"text": "ask what they need. the soup can wait. barely."}, "b": {"text": "a plan. 5 steps. color-coded. laminated.", "lose": "wide"}, "point": "A", "host": "Cancer asked *first.* point!"},
  ],
  ...{"last": "Love asks *what you need.*", "talk": "card-talk-3.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
