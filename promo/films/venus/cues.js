// venus score — lofi, D♭ major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// Rhodes + vinyl under the hook; the boom-bap drops on FIRE VENUS (3.93) and carries the four elements; it floats
// for the fun fact (19.49), lifts back for the sign strip (23.38) and lands on “Go look up your Venus.” (26.71).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'venus', duration: DURATION, music: { style: 'lofi', key: 'Db', seed: 37, sections: { drop: 3.93, breakdown: 19.49, lift: 23.38, outroAt: 26.71 } }, cues: CUES }
