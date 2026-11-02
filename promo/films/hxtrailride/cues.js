// hxtrailride score — lofi, Am (the preset is major, so it plays in the relative C major; the whistle is written in
// A minor), 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   intro: keys under the whistle and the clip-clop · drop 5.04: "The swap." · breakdown 21.71: the rooftop view ·
//   lift 26.16: two worlds, one sky · breakdown 28.93: ★ LESSON UNLOCKED · lift 38.38: "See you on the trail." · outro.
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxtrailride', duration: DURATION, music: { style: 'lofi', key: 'Am', seed: 52, sections: { drop: BEAT(8), breakdown: [BEAT(38), BEAT(51)], lift: [BEAT(46), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(46)] }, cues: CUES }
