// staunties score — lofi, Eb, 108 bpm (arranged by the style engine in promo/scripts/teaser-sound.mjs). Warm and swung.
//   drop 4.49: the camera pulls back onto the doily · breakdown 35.6: the long silent beat after "Align: you laugh at the
//   same things" · lift 46.71: ★ LESSON UNLOCKED · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'staunties', duration: DURATION, music: { style: 'lofi', key: 'Eb', seed: 41, sections: { drop: 4.489, breakdown: 35.6, lift: 46.71, outroAt: DURATION - 4.4 } }, cues: CUES }
