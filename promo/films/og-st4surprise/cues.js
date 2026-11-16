// st4surprise score — funk, A, 108 bpm grid (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: Aquarius walks into the big show · breakdown 8.65: the show comes down · lift 10.52: the rooftop's last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'st4surprise', duration: DURATION, music: { style: 'funk', key: 'A', seed: 84, sections: { drop: 2.82, breakdown: 8.65, lift: 10.52, outroAt: DURATION - 4.4 } }, cues: CUES }
