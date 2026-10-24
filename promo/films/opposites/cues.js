// opposites score — chiptune, C major, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
// 8-bit seesaw: the chip groove drops with the first plank slam (1.16); it drops to arps + bass for the coin toss
// (6.71), kicks back in as the coin lands (8.93); the tonic jingle lands on the bonk (12.27).
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'opposites', duration: DURATION, music: { style: 'chiptune', key: 'C', seed: 7, sections: { drop: 1.16, breakdown: 6.71, lift: 8.93, outroAt: 12.27 } }, cues: CUES }
