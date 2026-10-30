// srhtxbrunch score — funk, F minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the hook's quote lands (1.71); it thins to a breakdown for "The big questions show up… late."
// (5.04); the lift hits with the dealbreakers card (11.3); sub hits on the TOO LATE stamp, the last chip and the clink.
// The tonic lands under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxbrunch', duration: DURATION, music: { style: 'funk', key: 'Fm', seed: 20201, sections: { drop: 1.711, breakdown: 5.044, lift: 11.3, outroAt: DURATION - 4.4 }, hits: [9.767, 14.489, 23.378] }, cues: CUES }
