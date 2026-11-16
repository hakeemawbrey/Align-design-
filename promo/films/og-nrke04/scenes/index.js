// og-nrke04: the social rework of nrke04 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (outline) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke04: RANKING THE SIGNS, "Who says “I love you” first" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// dreamy · F). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who says / *“I love you”* first?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Sagittarius slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Aries
//   8.5–9.3    drumroll → #1 Leo: "said it loudly. in public."
//   10.2       THE STARS: "First or last, *mean it* when you say it."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke04',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["leo", "said it into a microphone"],
    ["aries", "said it on the first date"],
    ["pisces", "said it, sobbed for an hour"],
    ["sagittarius", "yelled it out a car window"],
    ["libra", "by candlelight, rehearsed"],
    ["cancer", "said it with homemade soup"],
    ["gemini", "said it in five accents"],
    ["taurus", "said it after a year. firmly."],
    ["aquarius", "said it like a weather fact"],
    ["scorpio", "said it once. ever. meant it."],
    ["virgo", "presented a pros-and-cons deck"],
    ["capricorn", "scheduled it for next spring"],
  ],
  last: "First or last, *mean it* when you say it.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Capricorn scheduled | *“I love you.”*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
