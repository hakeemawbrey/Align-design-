// htxbayou score — lofi, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops in under the sunset walk (0.6); it thins out for "Who with?" (3.1); the full band lifts as we tilt up
// into the stars and the deck deals (4.95), and lands under the end card (10.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxbayou', duration: DURATION, music: { style: 'lofi', key: 'F', seed: 8, sections: { drop: 0.6, breakdown: 3.1, lift: 4.95, outroAt: DURATION - 4.4 } }, cues: CUES }
