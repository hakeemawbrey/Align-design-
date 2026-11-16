// og-ngne16: social rework of ngne16 "Cancer vs Scorpio: Who, When, Why" (static HOOK outline 0–2.95; no show bug, no GAME NIGHT
// sign, no end card; crazier lines). The set, timeline and sound live in ../gamekit.js (social copy of the ngne01 kit). Story 0–30.6.
// Same story, rounds, points and last line as the original; the answers are pushed to the extreme.
import { makeGame } from '../gamekit.js'

export const HOOK = "\"I can't sleep.\" | Scorpio: *who did it?*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 2.95

const EP = makeGame({
  ...{"id": "og-ngne16", "A": {"sign": "cancer", "prop": "tissue", "propUntil": 3.0, "intro": {"mood": "wide", "look": [0, -0.4]}}, "B": {"sign": "scorpio", "intro": {"mood": "squint", "look": [-1, 0.2]}}, "hook": "\"I can't sleep.\" | Scorpio: *who did it?*", "accent": "#8fb8ff", "welcome": "water night. *three* tissue boxes."},
  rounds: [
    {"prompt": "I can't sleep. ___", "first": "B", "a": {"text": "call me. I'll read you the dullest book I own."}, "b": {"text": "why? since when? who? motive? alibi?", "mood": "squint", "lose": "wide"}, "point": "A", "host": "Scorpio, that's an *interrogation.*"},
    {"prompt": "They ask before they post a photo of you.", "first": "A", "a": {"text": "GREEN. I'd cry about it, happily.", "flag": "G"}, "b": {"text": "GREEN. my photos are classified.", "flag": "G"}, "point": "both", "host": "two greens. *very* respectful."},
    {"prompt": "Your date tells you something really personal.", "first": "B", "a": {"text": "listen. then overshare back. twice."}, "b": {"text": "lock it in a vault. forever. no key."}, "point": "both", "host": "both kind. Pisces needs *more* tissues."},
  ],
  ...{"last": "Soft answers *still* win.", "talk": "card-talk-6.png"},
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const CHECK = EP.CHECK
