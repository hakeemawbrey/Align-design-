// og-nrke10: the social rework of nrke10 (RANKING THE SIGNS, star_advice). Same board, cast, order and payoff; static HOOK
// caption (outline) from frame 0 instead of the animated question title, every tag pushed to the extreme, no series bug.
// The kit is this folder's own copy (scenes/rankkit.js) of nrke01's rankkit.js, laid out for the full-frame safe zones.
// Original notes:
// nrke10: RANKING THE SIGNS, "Who overthinks the text" (16 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// lofi · Em). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who *overthinks* / the text?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Scorpio
//   8.5–9.3    drumroll → #1 Virgo: "edited “hi” for an hour"
//   10.2       THE STARS: "Overthinking it? *Ask them.* It's faster."
import { makeRank } from './rankkit.js'

const EP = makeRank({
  id: 'og-nrke10',
  hook: '',   // og: the film's own title is gone; the static HOOK below owns the top
  ranks: [
    ["virgo", "edited “hi” for three hours"],
    ["scorpio", "decoded the period. at 2 AM."],
    ["pisces", "cried over one emoji"],
    ["cancer", "reread the thread from 2021"],
    ["libra", "polled the entire group chat"],
    ["capricorn", "drafted it in a spreadsheet"],
    ["gemini", "wrote nine versions, sent two"],
    ["aquarius", "overthought the font size"],
    ["taurus", "thought once. sent. napped."],
    ["leo", "sent it. reread it. proud."],
    ["aries", "sent it before typing it"],
    ["sagittarius", "sent it from a mountaintop"],
  ],
  last: "Overthinking it? *Ask them.* It's faster.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES

// social hook: static caption from frame 0
export const HOOK = "Virgo edited “hi” | *for three hours.*"
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.5
