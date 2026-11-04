// nrke01: RANKING THE SIGNS, "Who texts back first" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// chiptune · A). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who texts back / *first?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Taurus → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Leo · 7.7 #2 Gemini
//   8.5–9.3    drumroll → #1 Aries: "replied before you sent it"
//   10.2       THE STARS: "Speed isn't *interest.* Kindness is."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'nrke01',
  hook: "Who texts back | *first?*",
  ranks: [
    ["aries", "replied before you sent it"],
    ["gemini", "typing… still typing…"],
    ["leo", "fast, with a selfie"],
    ["cancer", "fast, with three hearts"],
    ["sagittarius", "replies from a ski lift"],
    ["libra", "fast, then a polite essay"],
    ["aquarius", "replies with a theory"],
    ["virgo", "once, typo-free"],
    ["pisces", "replied, then cried a bit"],
    ["capricorn", "between two meetings"],
    ["scorpio", "read it. replies at 2 AM"],
    ["taurus", "drafting the perfect reply"],
  ],
  last: "Speed isn't *interest.* Kindness is.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
