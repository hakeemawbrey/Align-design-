// og-nrke07: the social rework of nrke07 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (box) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke07: RANKING THE SIGNS, "Who sends the good-morning text" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// pop · D). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who sends the / *good-morning* text?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Aries slam in.   6.3 card cut.   6.8 #3 Leo · 7.7 #2 Capricorn
//   8.5–9.3    drumroll → #1 Cancer: "at sunrise, with a poem"
//   10.2       THE STARS: "Say *good morning* back. It's a small yes."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke07',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["cancer", "at sunrise, with a 4-page poem"],
    ["capricorn", "at 5 AM, after two meetings"],
    ["leo", "a good-morning photoshoot"],
    ["aries", "“MORNING!!!!!!!” all caps"],
    ["virgo", "plus your weather and schedule"],
    ["libra", "with a coordinated sticker"],
    ["taurus", "after second breakfast"],
    ["pisces", "a dream recap. three tears."],
    ["gemini", "good morning ×14"],
    ["aquarius", "sent at 3 AM. still counts."],
    ["scorpio", "one word: “morning.” chills."],
    ["sagittarius", "“good morning!” at 4 PM"],
  ],
  last: "Say *good morning* back. It's a small yes.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Good morning text | at *4 PM* counts?"
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5
