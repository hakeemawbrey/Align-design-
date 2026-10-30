// srhtxgameday score — house, G, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// The groove drops as the paint wave turns the whole stand teal (1.156); it breaks down as the teal drains (5.9);
// the full band lifts as Leo and Sag's chart rings spin up and link (9.5); the end card lands at 15.6.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srhtxgameday', duration: DURATION, music: { style: 'house', key: 'G', seed: 21103, sections: { drop: 1.156, breakdown: 5.9, lift: 9.5, outroAt: DURATION - 4.4 } }, cues: CUES }
