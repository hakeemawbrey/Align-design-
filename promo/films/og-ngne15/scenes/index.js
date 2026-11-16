// og-ngne15: social rework of ngne15 "Taurus vs Scorpio: Staring, Round Two" (static HOOK box 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "Nobody has *blinked.* | For three rounds."
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne15", "A": {"sign": "taurus", "intro": {"mood": "squint", "look": [1, 0]}}, "B": {"sign": "scorpio", "intro": {"mood": "squint", "look": [-1, 0]}}, "hook": "Nobody has *blinked.* | For three rounds.", "accent": "#e05b75", "welcome": "rematch. *no* staring."},
  rounds: [
    {"prompt": "I'm so nervous about tomorrow. ___", "first": "B", "a": {"text": "come over. I'm already cooking. 4 courses."}, "b": {"text": "you've got this. tell me the scary part. all of it."}, "point": "both", "host": "both kind. still *staring*, though."},
    {"prompt": "They ask to take things a little slower.", "first": "A", "a": {"text": "GREEN. slow is my only speed.", "flag": "G"}, "b": {"text": "GREEN. they're serious. noted. forever.", "flag": "G"}, "point": "both", "host": "two greens. *nobody* blinked."},
    {"prompt": "Your date forgot your birthday.", "first": "A", "a": {"text": "tell them it stung. then cake, together."}, "b": {"text": "remember it. forever. quietly.", "mood": "squint", "lose": "wide"}, "point": "A", "host": "Scorpio, *say it*, then let it go."},
  ],
  ...{"last": "Say the hurt. *Then* the cake.", "talk": "card-talk-5.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
