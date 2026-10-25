// citynyc · "Millions of people in New York…" (30 s vertical Align ad). Story 0–25.6 (film.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 30
export const CTA = 'JOIN THE WAITLIST'
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   2.78  on the drop: the skyline is up → the elevated train whooshes in (2.82)
//   5.54  hook line out (5.3) → "…and the apps keep showing you the same five." (5.6)
//   12.17 "Same faces. Every stop." out (11.85) → "Tonight's deck: a new hand…" (12.27) as the train blasts off
//   17.95 "Never the same five." out (17.7) → the centre card lifts and flips to the mystery card / "Chart first." (18.38)
//   22.20 "Someone you've never seen." out (22.05) → "Meet someone actually new." (22.27)
//   (the end card does its own card flip at 25.6)
const CUTS = [{ t: 2.78, kind: 'shuffle' }, { t: 5.54, kind: 'flip' }, { t: 12.17, kind: 'deal' }, { t: 17.95, kind: 'fan' }, { t: 22.2, kind: 'flip', dir: -1 }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END, cta: CTA }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
