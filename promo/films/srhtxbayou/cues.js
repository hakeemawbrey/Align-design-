// srhtxbayou score — lofi, A, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops in under the sunset walk (1.16, Libra hopping on the eighths); it thins out for "Who with?" (4.49)
// as night falls; the full band lifts as we tilt up into the stars and the deck deals (8.71); a hit as the partner
// star lands on the trail (13.15); outro under the end card (15.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxbayou', duration: DURATION, music: { style: 'lofi', key: 'A', seed: 19303, sections: { drop: 1.156, breakdown: 4.489, lift: 8.712, outroAt: DURATION - 4.4 }, hits: [13.15] }, cues: CUES }
