// hxmosquito score — synthwave, F#m, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). A horror
// synth score: intro pad + arp under the moon · drop 5.04: the dive · breakdown 21.71: the screen door slams, safe on
// the porch, they finally talk · lift 26.16: hearts · breakdown 28.93: ★ LESSON UNLOCKED · lift 38.38: "Fine. Indoors."
import { DURATION, CUES, BEAT } from './scenes/index.js'
export default { id: 'hxmosquito', duration: DURATION, music: { style: 'synthwave', key: 'F#m', seed: 113, sections: { drop: BEAT(8), breakdown: [BEAT(38), BEAT(51)], lift: [BEAT(46), BEAT(68)], outroAt: DURATION - 4.4 }, hits: [BEAT(46)] }, cues: CUES }
