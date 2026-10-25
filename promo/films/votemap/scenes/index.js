// votemap · "Align starts in Houston." (30 s vertical Align ad). Story 0–25.6 (film.js), then the shared END CARD.
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { build, CUES as FILM_CUES } from './film.js'
export const DURATION = 30
export const CTA = 'VOTE FOR YOUR CITY'
const END = DURATION - ENDCARD_LEN          // 25.6
// card-motif cuts: each lands where one beat has cleared and the next is about to pop in
//   5.35  hook out (5.2) → "Then the stars pick a second city." (5.45)
//   11.55 the vote out (11.3), map dimmed → "Tonight's deck, dealt." (11.65)
//   14.75 "A new hand" out (14.6) → "Card first." (14.85) as the centre card lifts
//   17.68 "Card first" out (17.5), mystery card gone → "Talk cards, not small talk." (17.8)
//   20.55 talk cards out (20.4) → the map comes back, "Which city lights up next?" (20.65)
//   22.78 "Which city" out (22.7) → "Vote your city into the sky." (22.85)
//   (the end card does its own card flip at 25.6)
const CUTS = [5.35, { t: 11.55, kind: 'deal' }, 14.75, 17.68, { t: 20.55, kind: 'flip', dir: -1 }, 22.78]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS), ...endcardCues(END)]
export const SCENES = [
  build,
  (stage) => buildEndcard(stage, { start: END, cta: CTA }),
  cardFrame({ start: 0, end: END }),
  cardCuts(CUTS),
]
