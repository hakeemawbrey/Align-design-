// nrke17: RANKING THE SIGNS, "Who gives the best compliments" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// jazzy · Bb). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who gives the / best *compliments?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Scorpio → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Leo
//   8.5–9.3    drumroll → #1 Libra: "noticed your new haircut"
//   10.2       THE STARS: "Thought something nice? *Say it out loud.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke17',
  hook: "Who gives the | best *compliments?*",
  ranks: [
    ["libra", "noticed your new haircut"],
    ["leo", "compliments like a fan club"],
    ["pisces", "complimented you, cried"],
    ["cancer", "“you're so thoughtful”"],
    ["gemini", "five compliments a minute"],
    ["sagittarius", "honest and hilarious"],
    ["taurus", "“you smell amazing”"],
    ["aquarius", "“your brain is cool”"],
    ["virgo", "a compliment with notes"],
    ["aries", "“you're fast. I like that.”"],
    ["capricorn", "“good work today.”"],
    ["scorpio", "one. you'll never forget it."],
  ],
  last: "Thought something nice? *Say it out loud.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
