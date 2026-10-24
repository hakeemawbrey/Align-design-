// cityatlanta score — lofi, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as "forest." lands and the canopy grows (1.71); it thins for "So hard to find the one" (7.4);
// the full band lifts as the deck falls from the stars (10.32), and lands under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'cityatlanta', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 117, sections: { drop: 1.71, breakdown: 7.4, lift: 10.32, outroAt: DURATION - 4.4 } }, cues: CUES }
