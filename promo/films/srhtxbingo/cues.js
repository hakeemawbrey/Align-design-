// srhtxbingo score — lofi, C minor, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops on the first daub (2.82); it thins to a breakdown on "BINGO. …again." (8.93); the lift hits as the
// caller bonks the card and the squares fly (12.27); sub hits on BINGO! and the heart daub. The tonic lands under the
// end card (25.6).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxbingo', duration: DURATION, music: { style: 'lofi', key: 'Cm', seed: 23101, sections: { drop: 2.822, breakdown: 8.933, lift: 12.267, outroAt: DURATION - 4.4 }, hits: [7.544, 22.544] }, cues: CUES }
