// nrke12: RANKING THE SIGNS, "Who buys holiday gifts earliest" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// chiptune · B). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who buys holiday / gifts *earliest?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Taurus slam in.   6.3 card cut.   6.8 #3 Cancer · 7.7 #2 Virgo
//   8.5–9.3    drumroll → #1 Capricorn: "done in July"
//   10.2       THE STARS: "The best gifts say *I listened.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke12',
  hook: "Who buys holiday | gifts *earliest?*",
  ranks: [
    ["capricorn", "done in July"],
    ["virgo", "gift list since June"],
    ["cancer", "handmade, started in May"],
    ["taurus", "bought cozy socks early"],
    ["libra", "wrapped it beautifully"],
    ["scorpio", "knew what you wanted"],
    ["leo", "bought themselves one too"],
    ["aquarius", "invented your gift"],
    ["pisces", "cried while wrapping"],
    ["gemini", "bought two, forgot one"],
    ["aries", "Dec 24, sprinting"],
    ["sagittarius", "gift: a spontaneous trip"],
  ],
  last: "The best gifts say *I listened.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
