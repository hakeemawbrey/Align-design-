// torsubway · "Stuck on the subway, swiping the same faces." (15 s vertical Align ad). Story 0–10.6 (film.js), then the
// shared END CARD with VOTE FOR YOUR CITY.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 10.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   3.60  the hook has left (3.42) and we push into the tunnel → "Tonight's deck…" (3.66)
//   6.30  "…every night." out (6.06) and the side cards fly off → "Card first." (6.40) as the centre card flips
//   8.34  "Card first. Face last." out (8.18), the card spins to a star → "Get off the same loop." (8.42)
//   (the end card does its own card flip at 10.6)
const CUTS = [{ t: 3.6, kind: 'deal' }, { t: 6.3, kind: 'flip' }, { t: 8.34, kind: 'shuffle' }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END, cta: CTA }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
