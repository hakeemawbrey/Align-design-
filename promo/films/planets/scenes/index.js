// planets (30 s, vertical): "Every planet in 30 seconds." See film.js for the beat sheet.
import build, { DURATION, cues } from './film.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export { DURATION }
// card-motif cuts between every planet: each planet lands on beat(4 + 4i) (2.82 + 2.222·i); its name pops at land-0.22 and the
// outgoing copy leaves at land-0.36, so the cut sits 0.32 s before each landing (the new name pops ~0.1 s into the reveal).
// Hook → Sun at 2.50 (hook out 2.42), Pluto → "Ten planets." 0.08 s before the end line (26.16).
const beat = n => 0.6 + n * 0.5556
const KINDS = ['flip', 'deal', 'fan', 'shuffle', { kind: 'deal', from: 'left' }, { kind: 'flip', dir: -1 }, 'shuffle', { kind: 'fan', dir: -1 },
  { kind: 'deal', from: 'right' }, 'flip', 'fan']
const CUTS = [2.50, ...Array.from({ length: 9 }, (_, i) => beat(4 + 4 * (i + 1)) - 0.32), beat(46) - 0.08]
  .map((t, i) => ({ ...(typeof KINDS[i] === 'string' ? { kind: KINDS[i] } : KINDS[i]), t: +t.toFixed(3) }))
export const SCENES = [build, cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 }), cardCuts(CUTS)]
export const CUES = [...cues, ...cardCutCues(CUTS)]
