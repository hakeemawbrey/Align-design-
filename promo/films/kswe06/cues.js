// kswe06 score: cinematic, Eb (style engine in promo/scripts/teaser-sound.mjs). Loops: music runs to the end.
//   drop 2.6: the crying montage · breakdown 7.6: the jars · lift 11.2: the real Pisces.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kswe06', duration: DURATION, music: { style: 'cinematic', key: 'Eb', seed: 1106, sections: { drop: 2.6, breakdown: [7.6], lift: [11.2], outroAt: DURATION - 0.5 } }, cues: CUES }
