// og-nrke12: the social rework of nrke12, RANKING THE SIGNS, "Who buys holiday gifts earliest" (13.6 s story, chiptune · B).
// Same board, cast and story (kit copy: ./rankkit.js); a static HOOK (outline) from frame 0 instead of the question
// title, no series bug, crazier tags, and the film ends on THE STARS' last line.
//   0.0        HOOK: "Capricorn wrapped | your gift *in July.*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Taurus slam in.   6.8 #3 Cancer · 7.7 #2 Virgo
//   8.5–9.3    drumroll → #1 Capricorn: "wrapped your gift in July"
//   10.2       THE STARS: "The best gifts say *I listened.*"
import { makeRank } from './rankkit.js'

export const HOOK = 'Capricorn wrapped | your gift *in July.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5

const EP = makeRank({
  id: 'og-nrke12',
  hook: '',
  ranks: [
    ["capricorn", "wrapped your gift in July"],
    ["virgo", "color-coded gift spreadsheet"],
    ["cancer", "knitting it since May"],
    ["taurus", "bought socks. for everyone."],
    ["libra", "the bow alone took 3 hours"],
    ["scorpio", "knew your wish before you"],
    ["leo", "bought themself a bigger one"],
    ["aquarius", "invented your gift. literally."],
    ["pisces", "cried onto the wrapping paper"],
    ["gemini", "bought two, lost both"],
    ["aries", "Dec 24, 11:58, sprinting"],
    ["sagittarius", "gift: a surprise trip, leaving now"],
  ],
  last: "The best gifts say *I listened.*",
})

export const DURATION = EP.DURATION
export const STORY_END = 13.6
export const SCENES = EP.SCENES
export const CUES = EP.CUES
