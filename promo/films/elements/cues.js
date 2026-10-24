// elements score — pop, B♭ major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Plucky intro under the title + stopwatch; the verse groove drops on FIRE (2.27); the four-on-the-floor chorus
// lift hits on AIR (7.27); the tonic lands on “Which one are you?” (12.27).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'elements', duration: DURATION, music: { style: 'pop', key: 'Bb', seed: 3, sections: { drop: 2.27, lift: 7.27, outroAt: 12.27 } }, cues: CUES }
