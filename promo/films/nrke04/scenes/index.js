// nrke04: RANKING THE SIGNS, "Who says “I love you” first" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// dreamy · F). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who says / *“I love you”* first?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Sagittarius slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Aries
//   8.5–9.3    drumroll → #1 Leo: "said it loudly. in public."
//   10.2       THE STARS: "First or last, *mean it* when you say it."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke04',
  hook: "Who says | *“I love you”* first?",
  ranks: [
    ["leo", "said it loudly. in public."],
    ["aries", "blurted it, no regrets"],
    ["pisces", "said it, then sobbed"],
    ["sagittarius", "said it on a road trip"],
    ["libra", "said it by candlelight"],
    ["cancer", "said it with soup"],
    ["gemini", "said it in three accents"],
    ["taurus", "said it after a year"],
    ["aquarius", "said it like a fun fact"],
    ["scorpio", "said it once. meant it."],
    ["virgo", "made a pros-and-cons list"],
    ["capricorn", "scheduled it for spring"],
  ],
  last: "First or last, *mean it* when you say it.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
