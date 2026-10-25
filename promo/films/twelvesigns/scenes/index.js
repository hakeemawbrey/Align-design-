// twelvesigns (60 s, vertical): "All 12 signs in 60 seconds." One scene; see film.js for the beat map.
import film, { cues, DURATION } from './film.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
export { DURATION }
// card-motif cuts layered over the colour-wash wipes: a card cut between EVERY sign. Each sign lands on beat(5 + 8i) with its
// wipe centred on the downbeat (≈±0.2–0.27 s); the cut sits 0.15 s before it, so the wipe runs under the cards and the
// glyph's own entrance (u -0.05 … 0.4) plays out as they clear. Last: Pisces → "Tag your sign." (56.72, spin wipe).
const beat = n => 0.6 + n * 0.5556
const KINDS = ['flip', 'deal', 'fan', 'shuffle', { kind: 'flip', dir: -1 }, { kind: 'deal', from: 'left' }, { kind: 'fan', dir: -1 }, 'shuffle',
  'flip', { kind: 'deal', from: 'right' }, 'fan', 'shuffle', { kind: 'flip', dir: -1 }]
const CUTS = [...Array.from({ length: 12 }, (_, i) => beat(5 + 8 * i) - 0.15), beat(101) - 0.12]
  .map((t, i) => ({ ...(typeof KINDS[i] === 'string' ? { kind: KINDS[i] } : KINDS[i]), t: +t.toFixed(3) }))
export const SCENES = [film, cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 }), cardCuts(CUTS)]
export const CUES = [...cues, ...cardCutCues(CUTS)]
