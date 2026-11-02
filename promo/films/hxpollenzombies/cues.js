// hxpollenzombies score — screwed, C#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Slow,
// heavy, Houston: the pad and the dark Rhodes under the yellow street · drop 5.04: the whole horde sneezes · breakdown
// 21.71: "you're having a bad day. I'm here." · lift 26.16: two survivors · breakdown 28.93: ★ LESSON UNLOCKED · lift
// 38.38: "Bless you." · outro under the end card.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxpollenzombies', duration: DURATION, music: { style: 'screwed', key: 'C#m', seed: 77, sections: { drop: BEAT(8), breakdown: [BEAT(38), BEAT(51)], lift: [BEAT(46), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(46)] }, cues: CUES }
