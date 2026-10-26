// torworld · "In Toronto, everyone's from somewhere." (15 s vertical Align ad). Story 0–10.6 (film.js), then the shared
// END CARD with the VOTE FOR YOUR CITY line.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 15
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 10.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   3.80  hook line out (3.62–3.84) → "Your person could be from anywhere." (3.90) as the bubbles start to rise
//   7.34  "anywhere." out (7.08–7.30) → "Find them under one sky." (7.42) as the crowd sinks
//   (the end card does its own card flip at 10.6)
const CUTS = [{ t: 3.8, kind: 'deal' }, { t: 7.34, kind: 'flip' }]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END, cta: CTA }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
