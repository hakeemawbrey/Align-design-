// hxslab score — screwed, C#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A slow-rolling
// music video: the pad and the 808 under the boulevard · drop 5.04: the trunk pops · breakdown 21.71: "tell me." ·
// lift 26.16: TALK TO ME · breakdown 28.93: ★ LESSON UNLOCKED · lift 38.38: "Candy paint. Real talk." · outro.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxslab', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 29, sections: { drop: BEAT(8), breakdown: [BEAT(38), BEAT(51)], lift: [BEAT(46), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(46)] }, cues: CUES }
