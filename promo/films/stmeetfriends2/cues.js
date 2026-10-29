// stmeetfriends2 score — jazzy, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 4.4: the spotlight snaps on · breakdown 22.7: the frozen panel (crickets) · lift 24.0: the panel melts ·
//   breakdown 27.6: ★ LESSON UNLOCKED · hit 37.2: the gavel · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stmeetfriends2', duration: DURATION, music: { style: 'jazzy', key: 'Eb', seed: 229, sections: { drop: 4.4, breakdown: [22.7, 27.6], lift: [24.0, 32.3], outroAt: DURATION - 4.4 }, hits: [37.2] }, cues: CUES }
