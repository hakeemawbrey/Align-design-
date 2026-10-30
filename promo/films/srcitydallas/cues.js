// srcitydallas score — funk, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The drop lands as THE STARS rise behind everything, giant (2.82); it breaks down as the truck peels off and the giant
// star shrinks into the chart centre (5.88); it lifts as the two charts lock round it (6.71); hit on EXPECTATIONS: MET.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'srcitydallas', duration: DURATION, music: { style: 'funk', key: 'Eb', seed: 2613, sections: { drop: T.drop, breakdown: T.wipe, lift: T.lock, outroAt: DURATION - 4.4 }, hits: [T.met] }, cues: CUES }
