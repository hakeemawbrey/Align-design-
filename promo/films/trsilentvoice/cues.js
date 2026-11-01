// trsilentvoice score: jazzy, Gb (arranged by the style engine in promo/scripts/teaser-sound.mjs).
//   drop 2.1: the first reaction · breakdown 7.9: replay nine (the quiet before the tear) · lift 11.4: the verdict
//   · hit 13.25: the stamped total · outro under the end card.
import { DURATION, CUES } from './scenes/index.js'
export default { id: 'trsilentvoice', duration: DURATION, music: { style: 'jazzy', key: 'Gb', seed: 1604, sections: { drop: 2.1, breakdown: [7.9], lift: [11.4], outroAt: DURATION - 4.4 }, hits: [13.25] }, cues: CUES }
