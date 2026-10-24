// htxbrunch score — pop, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the hook's quote lands (1.16); it thins to a breakdown for "The big questions show up… late."
// (5.04); the chorus lift hits on "dealbreakers come first" (11.71); sub hits on the TOO LATE stamp, the last chip and
// the clink. The tonic lands under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxbrunch', duration: DURATION, music: { style: 'pop', key: 'C', seed: 9, sections: { drop: 1.156, breakdown: 5.044, lift: 11.711, outroAt: DURATION - 4.4 }, hits: [9.767, 14.489, 23.656] }, cues: CUES }
