// srhtxrodeo score — synthwave, C, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands with the first hat (1.43) and claps under the line dance; the stomp sends the hats flying (5.04); it
// breaks down for the mystery card (8.71) and lifts as Sag spins the lasso (12.82); a hit on the cinch (13.86); outro
// under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxrodeo', duration: DURATION, music: { style: 'synthwave', key: 'C', seed: 19202, sections: { drop: 1.433, breakdown: 8.712, lift: 12.823, outroAt: DURATION - 4.4 }, hits: [13.86] }, cues: CUES }
