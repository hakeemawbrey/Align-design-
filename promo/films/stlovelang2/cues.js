// stlovelang2 score — funk, Em, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.65: event one, the surprise · breakdown 18.15: Leo didn't notice (womp, crickets) · lift 22.1: the replay
//   · lift 38.85: THEY GET IT · breakdown 41.5: ★ LESSON UNLOCKED · hit 51.6: the medals · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stlovelang2', duration: DURATION, music: { style: 'funk', key: 'Em', seed: 4848, sections: { drop: 4.65, breakdown: [18.15, 41.5], lift: [22.1, 38.85], outroAt: DURATION - 4.4 }, hits: [51.6] }, cues: CUES }
