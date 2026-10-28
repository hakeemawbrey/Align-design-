// sthey score — chiptune, E, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.82: the rapid fire starts (Aries) · breakdown 25.04: the drums drop out under Pisces' silent stare
//   (record scratch + tape stop at the freeze 27.27) · lift 31.71: twelve typing bubbles at once · hit 33.38: LESSON · outro under the end card.
import { DURATION, CUES, T } from './scenes/index.js'
export default { id: 'sthey', duration: DURATION, music: { style: 'chiptune', key: 'E', seed: 8, sections: { drop: T.drop, breakdown: T.brk, lift: T.burst, outroAt: DURATION - 4.4 }, hits: [T.lesson] }, cues: CUES }
