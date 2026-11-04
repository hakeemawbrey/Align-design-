// nrke07: RANKING THE SIGNS, "Who sends the good-morning text" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// pop · D). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who sends the / *good-morning* text?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Aries slam in.   6.3 card cut.   6.8 #3 Leo · 7.7 #2 Capricorn
//   8.5–9.3    drumroll → #1 Cancer: "at sunrise, with a poem"
//   10.2       THE STARS: "Say *good morning* back. It's a small yes."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke07',
  hook: "Who sends the | *good-morning* text?",
  ranks: [
    ["cancer", "at sunrise, with a poem"],
    ["capricorn", "at 5 AM, after a run"],
    ["leo", "a good-morning selfie"],
    ["aries", "“MORNING!!!” all caps"],
    ["virgo", "plus your weather report"],
    ["libra", "with a cute little sticker"],
    ["taurus", "after breakfast, obviously"],
    ["pisces", "a dream recap. teary."],
    ["gemini", "good morning ×7"],
    ["aquarius", "sent at 3 AM. it counts."],
    ["scorpio", "one word. it means a lot."],
    ["sagittarius", "“good morning” at 4 PM"],
  ],
  last: "Say *good morning* back. It's a small yes.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
