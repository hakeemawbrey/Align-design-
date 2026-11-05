// kmte01 score: funk, E (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.1: the phone thread · breakdown 6.2: the reflection's question · lift 15.9: phone face down · hit 16.95: the buzz.
//   No end card: the music runs to the hard cut.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kmte01', duration: DURATION, music: { style: 'funk', key: 'E', seed: 2101, sections: { drop: 1.1, breakdown: [6.2], lift: [15.9], outroAt: DURATION - 1.2 }, hits: [16.95] }, cues: CUES }
