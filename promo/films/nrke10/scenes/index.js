// nrke10: RANKING THE SIGNS, "Who overthinks the text" (18 s vertical star_advice trial reel, promo/films/next30/b39.md, music:
// lofi · Em). Story 0–13.6, then the shared end card. The format lives in ../../nrke01/scenes/rankkit.js.
//   0.0        hook: "Who *overthinks* / the text?" over the empty board; THE STARS scribble, Pisces sniffles.
//   1.8–5.64   #12 Sagittarius → #4 Cancer slam in.   6.3 card cut.   6.8 #3 Pisces · 7.7 #2 Scorpio
//   8.5–9.3    drumroll → #1 Virgo: "edited “hi” for an hour"
//   10.2       THE STARS: "Overthinking it? *Ask them.* It's faster."
import { makeRank } from '../../nrke01/scenes/rankkit.js'

const EP = makeRank({
  id: 'nrke10',
  hook: "Who *overthinks* | the text?",
  ranks: [
    ["virgo", "edited “hi” for an hour"],
    ["scorpio", "decoded the punctuation"],
    ["pisces", "cried over an emoji"],
    ["cancer", "reread the whole thread"],
    ["libra", "polled the group chat"],
    ["capricorn", "drafted it in a document"],
    ["gemini", "wrote nine versions"],
    ["aquarius", "overthought the font"],
    ["taurus", "thought once. sent."],
    ["leo", "sent it, admired it"],
    ["aries", "sent it before thinking"],
    ["sagittarius", "sent it mid-hike"],
  ],
  last: "Overthinking it? *Ask them.* It's faster.",
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
