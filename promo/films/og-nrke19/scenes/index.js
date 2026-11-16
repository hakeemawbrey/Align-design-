// og-nrke19: the social rework of nrke19, RANKING THE SIGNS, "Who saves you the last bite" (13.6 s story).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (box) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Aries ate the | last bite. *Yours.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 → #4 slam in.   6.8 #3 · 7.7 #2   8.5–9.3 drumroll → #1 Cancer: "saved it, wrapped it, labeled it"
//   10.2       THE STARS: "Saving the last bite is a *tiny* love letter."
import { makeRank } from './rankkit.js'

export const HOOK = 'Aries ate the | last bite. *Yours.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke19',
  hook: '',
  ranks: [
    ["cancer", "saved it, wrapped it, labeled it"],
    ["taurus", "a heroic sacrifice. still grieving."],
    ["libra", "split it perfectly. with a ruler."],
    ["virgo", "saved it on a clean plate"],
    ["pisces", "offered it, sobbing"],
    ["leo", "saved it. made a speech about it."],
    ["capricorn", "scheduled your bite in advance"],
    ["scorpio", "hid it for you. in a safe."],
    ["gemini", "saved it. ate it. forgot."],
    ["aquarius", "invented a sharing system"],
    ["sagittarius", "already finished. sorry!"],
    ["aries", "ate it before you sat down"],
  ],
  last: "Saving the last bite is a *tiny* love letter.",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
