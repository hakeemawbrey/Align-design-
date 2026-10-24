// htxbingo score — pop, F, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops on the first daub (2.82); it thins to a breakdown on "…again." (8.93); the chorus lift hits on
// "Align skips the bingo." (11.16); sub hits on BINGO! and the heart stamp. The tonic lands under the end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'htxbingo', duration: DURATION, music: { style: 'pop', key: 'F', seed: 83, sections: { drop: 2.822, breakdown: 8.933, lift: 11.156, outroAt: DURATION - 4.4 }, hits: [7.544, 23.656] }, cues: CUES }
