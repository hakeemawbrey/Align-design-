// og-nrke21: the social rework of nrke21, RANKING THE SIGNS, "Who sends the most voice notes" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (box) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Gemini voice notes | *for 12 minutes.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Gemini: "a twelve-minute voice note. daily."
//   10.2       THE STARS: "Long or short, *your voice* is the good part."
import { makeRank } from './rankkit.js'

export const HOOK = 'Gemini voice notes | *for 12 minutes.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke21',
  hook: '',
  ranks: [
    ["gemini", "a twelve-minute voice note. daily."],
    ["leo", "voice notes with sound effects"],
    ["sagittarius", "voice notes from a mountain"],
    ["pisces", "voice note, mostly sobbing"],
    ["aries", "voice notes while sprinting"],
    ["cancer", "sang you a lullaby voice note"],
    ["libra", "a polite, perfect 60 seconds"],
    ["aquarius", "a whole podcast. with guests."],
    ["taurus", "one. very calm. very slow."],
    ["scorpio", "a whisper. four seconds. chills."],
    ["capricorn", "“call me.” (as a voice note)"],
    ["virgo", "sent the transcript too"],
  ],
  last: "Long or short, *your voice* is the good part.",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
