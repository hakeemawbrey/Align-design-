import * as A from './a/index.js'
import * as B from './b/index.js'
import * as C from './c/index.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export const DURATION = 60
// card-motif cuts, ~0.1 s before each question's headline pops (the old beat is popping out underneath):
// a: Q1 3.53 · Q2 8.97 · "not one sign" 14.57 | a→b hand-off 20.2 (Q3) · Q4 26.47 · Q5 33.38 | b→c 40.5 (Q6) · Q7 47.72 · Congrats 53.84
const CUTS = [
  { t: 3.53, kind: 'flip' }, { t: 8.97, kind: 'deal' }, { t: 14.57, kind: 'fan' },
  { t: 20.2, kind: 'shuffle' }, { t: 26.47, kind: 'flip', dir: -1 }, { t: 33.38, kind: 'deal', from: 'left' },
  { t: 40.5, kind: 'fan', dir: -1 }, { t: 47.72, kind: 'shuffle' }, { t: 53.84, kind: 'flip' },
]
export const SCENES = [...A.SCENES, ...B.SCENES, ...C.SCENES, cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 }), cardCuts(CUTS)]
export const CUES = [...(A.CUES || []), ...(B.CUES || []), ...(C.CUES || []), ...cardCutCues(CUTS)]
