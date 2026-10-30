// srcityseattle score — lofi, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Rhodes + vinyl under the rain; the groove drops as THE STARS shove the clouds apart and the chart blooms (7.82); it thins
// for "The stars are still up there" (22.7) and lifts as the stars pop through (23.38); hit on the cloud covering THE STARS.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcityseattle', duration: DURATION, music: { style: 'lofi', key: 'E', seed: 2612, sections: { drop: T.bloom, breakdown: T.fin, lift: T.finLast, outroAt: DURATION - 4.4 }, hits: [T.cover[1]] }, cues: CUES }
