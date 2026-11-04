// nrke18: RANKING THE SIGNS, "Who takes the cutest couple photos" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// pop · G). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who takes the / cutest *couple photos?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Capricorn → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Gemini · 7.7 #2 Libra
//   8.5–9.3    drumroll → #1 Leo: "knows every good angle"
//   10.2       THE STARS: "Cutest photo? The one where you're *laughing.*"
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke18',
  hook: "Who takes the | cutest *couple photos?*",
  ranks: [
    ["leo", "knows every good angle"],
    ["libra", "found the golden hour"],
    ["gemini", "took 300, posted one"],
    ["cancer", "printed them for the fridge"],
    ["pisces", "crying in every single one"],
    ["sagittarius", "took it mid-jump"],
    ["aries", "photobombed their own photo"],
    ["taurus", "photos of the food, mostly"],
    ["virgo", "framed it perfectly. once."],
    ["aquarius", "a weird art angle"],
    ["scorpio", "no photos. mysterious."],
    ["capricorn", "one photo per year"],
  ],
  last: "Cutest photo? The one where you're *laughing.*",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
