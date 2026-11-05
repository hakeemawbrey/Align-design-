// kpvee10 score: house, C (style engine in promo/scripts/teaser-sound.mjs). Hard cut at 28.4.
//   drop 0.4: Venus smashes in · breakdown 12.8: the spreadsheet · lift 15.6: six o'clock · hit 26.0: the last line.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'kpvee10', duration: DURATION, music: { style: 'house', key: 'C', seed: 4110, sections: { drop: 0.4, breakdown: [12.8], lift: [15.6], outroAt: DURATION - 0.6 }, hits: [17.4, 26.0] }, cues: CUES }
