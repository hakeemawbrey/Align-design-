// stjealous score — screwed, Bm, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.45: the second buzz, "Every buzz" · lift 12.8: Gerald balloons · breakdown 17.5: Scorpio steps in ·
//   lift 24.1: "Say it out loud" · breakdown 30.6: ★ LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stjealous', duration: DURATION, music: { style: 'screwed', key: 'Bm', seed: 223, sections: { drop: 4.45, breakdown: [17.5, 30.6], lift: [12.8, 24.1], outroAt: DURATION - 4.4 } }, cues: CUES }
