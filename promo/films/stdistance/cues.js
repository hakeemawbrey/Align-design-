// stdistance score — dreamy, Db, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.45: the first call · breakdown 17.0: the long-distance league · lift 23.4: "Make a plan" · hit 40.1: they
//   meet in the middle · breakdown 43.4: ★ LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stdistance', duration: DURATION, music: { style: 'dreamy', key: 'Db', seed: 227, sections: { drop: 4.45, breakdown: [17.0, 43.4], lift: [23.4, 48.15], outroAt: DURATION - 4.4 }, hits: [40.1] }, cues: CUES }
