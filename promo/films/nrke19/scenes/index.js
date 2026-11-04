// nrke19: RANKING THE SIGNS, "Who saves you the last bite" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// funk · C). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who saves you / the *last bite?*" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Aries → #4 Virgo slam in.   6.3 card cut.   6.8 #3 Libra · 7.7 #2 Taurus
//   8.5–9.3    drumroll → #1 Cancer: "saved it, and wrapped it"
//   10.2       THE STARS: "Saving the last bite is a *tiny* love letter."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke19',
  hook: "Who saves you | the *last bite?*",
  ranks: [
    ["cancer", "saved it, and wrapped it"],
    ["taurus", "a heroic sacrifice"],
    ["libra", "split it perfectly even"],
    ["virgo", "saved it on a clean plate"],
    ["pisces", "offered it, with tears"],
    ["leo", "saved you the best one"],
    ["capricorn", "budgeted a bite for you"],
    ["scorpio", "hid it for you. secretly."],
    ["gemini", "saved it, then forgot"],
    ["aquarius", "invented a sharing system"],
    ["sagittarius", "already finished. sorry!"],
    ["aries", "ate it before you asked"],
  ],
  last: "Saving the last bite is a *tiny* love letter.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
