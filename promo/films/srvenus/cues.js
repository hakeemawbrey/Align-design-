// srvenus score — jazzy, C major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Keys + brushes while Venus introduces herself; the groove drops on FIRE (3.93) and swings through the four elements;
// it floats for the Sun-and-leash fun fact (17.27) and lands on "Go look up your Venus." (23.38).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'srvenus', duration: DURATION, music: { style: 'jazzy', key: 'C', seed: 153, sections: { drop: 3.93, breakdown: 17.27, lift: 23.38, outroAt: DURATION - 4.4 } }, cues: CUES }
