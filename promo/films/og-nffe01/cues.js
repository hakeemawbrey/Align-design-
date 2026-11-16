// og-nffe01 score (social: no end card, the score runs to the last line): lofi, Am (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 7.0: the hard cut into THE STARS · lift 13.6: Capricorn's bedroom · hit 15.0: the ping · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'og-nffe01', duration: DURATION, music: { style: 'lofi', key: 'Am', seed: 3401, sections: { drop: 7.0, lift: [13.6], outroAt: DURATION - 2.4 }, hits: [15.0] }, cues: CUES }
