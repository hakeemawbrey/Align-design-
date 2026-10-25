import * as A from './a/index.js'
import * as B from './b/index.js'
import * as C from './c/index.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 60
// card-motif cuts, just before each beat's headline pops (the old one is out underneath):
// a: "Meet the charts" 4.08 · "Now stack them" 10.78 | a→b hand-off 19.95 ("measure the angles" 20.04) · PULL 28.30 · PUSH 33.30 |
// b→c 40.25 (BONUS ROUND) · "Push. Pull. Align." 47.0
const CUTS = [
  { t: 4.08, kind: 'flip' }, { t: 10.78, kind: 'deal' }, { t: 19.95, kind: 'fan' },
  { t: 28.3, kind: 'shuffle' }, { t: 33.3, kind: 'flip', dir: -1 }, { t: 40.25, kind: 'deal', from: 'left' },
  { t: 47.0, kind: 'fan', dir: -1 },
]
export const SCENES = [...A.SCENES, ...B.SCENES, ...C.SCENES, cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 }), cardCuts(CUTS)]
export const CUES = [...(A.CUES || []), ...(B.CUES || []), ...(C.CUES || []), ...cardCutCues(CUTS)]
