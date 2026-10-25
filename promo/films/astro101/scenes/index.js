import * as A from './a/index.js'
import * as B from './b/index.js'
import * as C from './c/index.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 60
// card-motif cuts, ~0.1 s before each new headline pops (the old one is out underneath):
// a: "same loop" 3.53 · "on the road" 8.53 · "Slice it" 13.02 | a→b hand-off 20.05 (plain H; elements headline 20.32) · characters 26.96 · chart 33.36 |
// b→c 40.5 (Big Three) · "That's you." 51.06 · "Now you speak astrology." 53.84
const CUTS = [
  { t: 3.53, kind: 'flip' }, { t: 8.53, kind: 'deal' }, { t: 13.02, kind: 'fan' },
  { t: 20.05, kind: 'shuffle' }, { t: 26.96, kind: 'flip', dir: -1 }, { t: 33.36, kind: 'deal', from: 'right' },
  { t: 40.5, kind: 'fan', dir: -1 }, { t: 51.06, kind: 'shuffle' }, { t: 53.84, kind: 'deal', from: 'left' },
]
export const SCENES = [...A.SCENES, ...B.SCENES, ...C.SCENES, cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 }), cardCuts(CUTS)]
export const CUES = [...(A.CUES || []), ...(B.CUES || []), ...(C.CUES || []), ...cardCutCues(CUTS)]
