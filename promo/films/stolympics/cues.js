// stolympics score — house, E major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 1.71: the opening fanfare · breakdown 35.04: the bonk and the silence on the mat · lift 41.16: cheering each
//   other · breakdown 44.49: LESSON UNLOCKED · lift 48.93: team stats · outro under the end card. Hit: SAME TEAM.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'stolympics', duration: DURATION, music: { style: 'house', key: 'E', seed: 16, sections: { drop: 1.711, breakdown: [35.044, 44.489], lift: [41.156, 48.933], outroAt: DURATION - 4.4 }, hits: [42.822] }, cues: CUES }
