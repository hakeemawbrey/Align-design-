// trsignswedding score: pop, C, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the roll call starts (Aries) · lift 17.27: the card cut into Libra · breakdown 31.71: the group photo
//   · hit 37.95: "Plus-one energy." · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trsignswedding', duration: DURATION, music: { style: 'pop', key: 'C', seed: 1301, sections: { drop: 2.82, lift: [17.27], breakdown: [31.71], outroAt: DURATION - 4.4 }, hits: [37.95] }, cues: CUES }
